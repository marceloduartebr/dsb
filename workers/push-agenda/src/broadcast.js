// Broadcast: a free-text push to every blog subscriber, sent by Marcelo from DSB Admin (Push tab, Blog subscribers).
// Separate from the briefing pushes: its own table, its own token (BROADCAST_TOKEN), never touches the briefing
// dedupe or the envio/fanout keys. It obeys the second send lock: no broadcast while PUSH_SEND is not "on".
// Sending runs in batches on the Durable Object's alarm, sized for the free plan's 50 subrequests per run.

import { pushSendOn } from './logica.js';
import { tokensIguais } from './auth.js';
import { listarTodasChaves } from './kv-lista.js';

export const SITE = 'https://dsb.duarte.top';
export const BATCH = 8; // per pass: 1 list + 8 gets + 8 sends + up to 8 deletes = 25 subrequests
export const PASS_GAP_MS = 15_000;
export const BROADCAST_TAG = 'dsb-broadcast';

export function createBroadcastSchema(db) {
  db.exec(`CREATE TABLE IF NOT EXISTS broadcasts (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    url TEXT NOT NULL,
    sent_by TEXT,
    created_at TEXT NOT NULL,
    state TEXT NOT NULL,
    total INTEGER NOT NULL,
    sent INTEGER NOT NULL DEFAULT 0,
    expired INTEGER NOT NULL DEFAULT 0,
    failed INTEGER NOT NULL DEFAULT 0,
    cursor TEXT,
    note TEXT,
    finished_at TEXT
  )`);
}

export async function authorizeBroadcast(request, env) {
  const expected = env && env.BROADCAST_TOKEN;
  if (typeof expected !== 'string' || expected.length < 24) return { ok: false, status: 503, erro: 'broadcast_not_configured' };
  const m = /^Bearer\s+(\S+)$/.exec(request.headers.get('Authorization') || '');
  if (!m || !(await tokensIguais(m[1], expected))) return { ok: false, status: 401, erro: 'unauthorized' };
  return { ok: true };
}

const clean = (s, max) => {
  if (typeof s !== 'string') return null;
  const t = s.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '').trim();
  return t && t.length <= max ? t : null;
};

/** {title, body, url?} → the reader payload {titulo, texto, url, tag}; the link must stay on dsb.duarte.top. */
export function validateMessage(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { erro: 'body' };
  const title = clean(input.title, 80);
  const body = clean(input.body, 400);
  if (!title) return { erro: 'title' };
  if (!body) return { erro: 'body_text' };
  let url = `${SITE}/`;
  if (input.url !== undefined && input.url !== '') {
    try {
      const u = new URL(String(input.url), SITE);
      if (u.origin !== SITE) return { erro: 'url' };
      url = u.toString();
    } catch {
      return { erro: 'url' };
    }
  }
  return { payload: { titulo: title, texto: body, url, tag: BROADCAST_TAG } };
}

// ---------------------------------------------------------------- subscribers (read only)

export function deviceOf(ua = '') {
  const u = String(ua);
  const os = /iPhone/.test(u) ? 'iPhone' : /iPad/.test(u) ? 'iPad' : /Android/.test(u) ? 'Android' : /Mac OS X|Macintosh/.test(u) ? 'Mac' : /Windows/.test(u) ? 'Windows' : /Linux/.test(u) ? 'Linux' : 'Unknown';
  const br = /Edg\//.test(u) ? 'Edge' : /OPR\//.test(u) ? 'Opera' : /Firefox\//.test(u) ? 'Firefox' : /CriOS|Chrome\//.test(u) ? 'Chrome' : /Safari\//.test(u) ? 'Safari' : '';
  return br ? `${os} · ${br}` : os;
}

export function serviceOf(endpoint = '') {
  let h = '';
  try {
    h = new URL(endpoint).host;
  } catch {
    return 'unknown';
  }
  if (/push\.apple\.com$/.test(h)) return 'Apple';
  if (/fcm\.googleapis\.com$|android\.googleapis\.com$/.test(h)) return 'Google';
  if (/mozilla\.com$|mozaws\.net$/.test(h)) return 'Mozilla';
  if (/notify\.windows\.com$/.test(h)) return 'Microsoft';
  return 'other';
}

/** One subscriber as Admin shows it: never the endpoint or keys. */
export function subscriberView(key, raw) {
  let s = null;
  try {
    s = typeof raw === 'string' ? JSON.parse(raw) : null;
  } catch {
    s = null;
  }
  const id = String(key).slice(4, 12);
  if (!s || typeof s !== 'object') return { id, unreadable: true };
  return {
    id,
    device: deviceOf(s.ua),
    service: serviceOf(s.endpoint),
    created: s.criado || null,
    updated: s.atualizado || null,
    types: Array.isArray(s.tipos) ? s.tipos : null,
    regions: Array.isArray(s.regioes) ? s.regioes : null
  };
}

/** GET /admin/subscribers?cursor=: total count and a page of up to 30 subscribers (31 subrequests at most). */
export async function subscribersPage(kv, cursor = '', limit = 30) {
  const total = (await listarTodasChaves(kv, 'sub:')).length;
  const page = await kv.list({ prefix: 'sub:', cursor: cursor || undefined, limit: Math.min(Math.max(limit, 1), 30) });
  const items = [];
  for (const k of page.keys || []) items.push(subscriberView(k.name, await kv.get(k.name)));
  return { total, items, cursor: page.list_complete ? '' : page.cursor || '' };
}

// ---------------------------------------------------------------- the broadcast job

const row = (db, sql, params = []) => db.exec(sql, params)[0] || null;

export function activeBroadcast(db) {
  return row(db, `SELECT * FROM broadcasts WHERE state = 'sending' ORDER BY id DESC LIMIT 1`);
}

export function recentBroadcasts(db, n = 10) {
  return db.exec(`SELECT id, title, body, url, sent_by, created_at, state, total, sent, expired, failed, note, finished_at FROM broadcasts ORDER BY id DESC LIMIT ?`, [n]);
}

/**
 * Starts a broadcast. Refused when PUSH_SEND is not on, when one is already sending, or when `confirm` is not the
 * current subscriber count (Marcelo types the number he sees in Admin).
 */
export function startBroadcast(db, env, { payload, sentBy, confirm, total, now = new Date() }) {
  if (!pushSendOn(env)) return { ok: false, erro: 'push_send_off', message: 'Reader pushes are locked (PUSH_SEND is not on).' };
  if (activeBroadcast(db)) return { ok: false, erro: 'broadcast_running', message: 'A broadcast is already sending.' };
  if (!Number.isInteger(total) || total < 1) return { ok: false, erro: 'no_subscribers', message: 'There are no subscribers.' };
  if (Number(confirm) !== total) return { ok: false, erro: 'confirm_mismatch', message: `Type the subscriber count (${total}) to confirm.` };
  db.exec(
    `INSERT INTO broadcasts (title, body, url, sent_by, created_at, state, total) VALUES (?, ?, ?, ?, ?, 'sending', ?)`,
    [payload.titulo, payload.texto, payload.url, String(sentBy || '').slice(0, 120) || null, now.toISOString(), total]
  );
  return { ok: true, broadcast: activeBroadcast(db) };
}

export function cancelBroadcast(db, { by = '', now = new Date() } = {}) {
  const b = activeBroadcast(db);
  if (!b) return { ok: false, erro: 'none_sending' };
  db.exec(`UPDATE broadcasts SET state = 'cancelled', note = ?, finished_at = ? WHERE id = ?`, [`cancelled by ${String(by).slice(0, 80) || 'admin'}`, now.toISOString(), b.id]);
  return { ok: true };
}

/**
 * One sending pass: the next BATCH subscribers after the saved cursor. Expired subscriptions (404/410) are deleted,
 * as the briefing sender does; other failures are only counted (no retry: a broadcast goes out once).
 * deps: { kv, send(record, payload) → {classe} }. Returns {continue: boolean}.
 */
export async function broadcastPass(db, env, deps, now = new Date()) {
  const b = activeBroadcast(db);
  if (!b) return { continue: false };
  if (!pushSendOn(env)) {
    db.exec(`UPDATE broadcasts SET state = 'stopped', note = 'PUSH_SEND turned off while sending', finished_at = ? WHERE id = ?`, [now.toISOString(), b.id]);
    return { continue: false };
  }
  const page = await deps.kv.list({ prefix: 'sub:', cursor: b.cursor || undefined, limit: BATCH });
  let sent = 0;
  let expired = 0;
  let failed = 0;
  const payload = { titulo: b.title, texto: b.body, url: b.url, tag: BROADCAST_TAG };
  for (const k of page.keys || []) {
    const raw = await deps.kv.get(k.name);
    let rec = null;
    try {
      rec = typeof raw === 'string' ? JSON.parse(raw) : null;
    } catch {
      rec = null;
    }
    if (!rec || !rec.endpoint) {
      failed++;
      continue;
    }
    let r;
    try {
      r = await deps.send(rec, payload);
    } catch {
      r = { classe: 'transiente' };
    }
    if (r.classe === 'ok') sent++;
    else if (r.classe === 'expirado') {
      expired++;
      await deps.kv.delete(k.name);
    } else failed++;
  }
  const done = Boolean(page.list_complete) || !page.cursor;
  db.exec(
    `UPDATE broadcasts SET sent = sent + ?, expired = expired + ?, failed = failed + ?, cursor = ?, state = ?, finished_at = ? WHERE id = ?`,
    [sent, expired, failed, done ? null : page.cursor, done ? 'done' : 'sending', done ? now.toISOString() : null, b.id]
  );
  return { continue: !done };
}
