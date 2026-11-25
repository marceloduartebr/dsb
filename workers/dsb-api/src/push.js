import { ApiError, nowIso } from './http.js';

export const RUN_JOBS = ['curation', 'covers', 'blog', 'linkedin', 'x_radar', 'x_publish', 'x_takedowns'];
export const RUN_CHOICES = ['all', 'success', 'failed', 'off'];
export const EVENT_KEYS = ['new_posts', 'link_answer', 'going_stale', 'issues'];
const DEFAULTS = { ...Object.fromEntries(RUN_JOBS.map((j) => [`run:${j}`, 'all'])), ...Object.fromEntries(EVENT_KEYS.map((k) => [k, 'on'])) };

/** Push settings (DSB Admin, Audit tab), defaults filled in. Never throws: a missing table means the defaults. */
export async function pushSettings(db) {
  const out = { ...DEFAULTS };
  try {
    for (const r of (await db.prepare('SELECT key, value FROM push_settings').all()).results || []) if (r.key in out) out[r.key] = r.value;
  } catch {
    /* before migration 0011 */
  }
  return out;
}

/** Whether a run of `job` that ended `outcome` (success | failed) pushes. */
export async function runPushAllowed(db, job, outcome) {
  const v = (await pushSettings(db))[`run:${job}`] || 'all';
  return v === 'all' || v === outcome;
}

/** GET /push/settings */
export async function getPushSettings(db) {
  const rows = (await db.prepare('SELECT key, updated_by, updated_at FROM push_settings').all().catch(() => ({ results: [] }))).results || [];
  return { settings: await pushSettings(db), changed: rows.filter((r) => r.updated_by).sort((a, b) => String(b.updated_at).localeCompare(String(a.updated_at)))[0] || null, jobs: RUN_JOBS, events: EVENT_KEYS };
}

/** PATCH /push/settings {settings: {key: value}} — DSB Admin only. */
export async function savePushSettings(db, body, session) {
  if (session.via !== 'internal') throw new ApiError(403, 'push_settings_admin_only', 'Only DSB Admin changes the push settings');
  const want = (body && body.settings) || {};
  const current = await pushSettings(db);
  const changes = [];
  for (const [k, v] of Object.entries(want)) {
    if (!(k in DEFAULTS)) throw new ApiError(422, 'invalid_value', `Unknown push setting: ${k}`);
    const ok = k.startsWith('run:') ? RUN_CHOICES.includes(v) : ['on', 'off'].includes(v);
    if (!ok) throw new ApiError(422, 'invalid_value', `${k} must be ${k.startsWith('run:') ? RUN_CHOICES.join(', ') : 'on or off'}`);
    if (current[k] !== v) changes.push([k, v]);
  }
  for (const [k, v] of changes) {
    await db
      .prepare(`INSERT INTO push_settings (key, value, updated_by, updated_at) VALUES (?1, ?2, ?3, ?4)
                ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_by = excluded.updated_by, updated_at = excluded.updated_at`)
      .bind(k, v, session.actor, nowIso())
      .run();
  }
  return { ...(await getPushSettings(db)), changed_keys: changes.map(([k]) => k) };
}

/**
 * Push on events (X-31). Writes go to push_outbox first; flush() sends what is due through DSB Admin
 * (service binding ADMIN → POST /internal/push, header x-interno-token = ADMIN_PUSH_TOKEN), which pushes to every
 * subscribed device. A failed send stays in the outbox and is retried on the next flush.
 *
 * Rules: one push per thing (dedup_key); new posts wait 10 min so a curation run gives one push; quiet hours
 * 22:00–07:00 Brasília hold everything for a 07:00 summary, except critical issues (they wake you).
 */

const BRT = -3 * 3600 * 1000;
const GROUP_MIN = { new_posts: 10, link_answer: 1, going_stale: 0, issue: 0 };
const MAX_ATTEMPTS = 5;

/** When a push may go out: after its grouping delay, and outside quiet hours unless critical. */
export function sendAfter(kind, severity, now = Date.now()) {
  const t = now + (GROUP_MIN[kind] ?? 0) * 60000;
  if (severity === 'critical') return new Date(t).toISOString();
  const local = new Date(t + BRT);
  const h = local.getUTCHours();
  if (h >= 7 && h < 22) return new Date(t).toISOString();
  const seven = new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate(), 7, 0, 0) - BRT);
  return new Date(h >= 22 ? seven.getTime() + 86400000 : seven.getTime()).toISOString();
}

/** Queues a push. Never throws (a push must never break the write that caused it). */
export async function enqueue(db, { kind, dedup_key, severity = 'info', title, body, url }, now = Date.now()) {
  try {
    await db
      .prepare(
        `INSERT INTO push_outbox (kind, dedup_key, severity, title, body, url, send_after) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
         ON CONFLICT(dedup_key) DO NOTHING`
      )
      .bind(kind, String(dedup_key).slice(0, 300), severity, String(title).slice(0, 120), String(body).slice(0, 300), url || '/', sendAfter(kind, severity, now))
      .run();
  } catch (e) {
    console.log(JSON.stringify({ event: 'push_enqueue_failed', kind, msg: String((e && e.message) || e).slice(0, 200) }));
  }
}

const TYPE_WORD = { incident: ['incident', 'incidents'], vulnerability: ['vulnerability', 'vulnerabilities'], news: ['news', 'news'] };

/**
 * Turns the due rows into the messages to send: new posts merged into one; going stale merged; every issue its
 * own (up to 3, then one "and N more"); link answers each their own. Pure: no I/O.
 */
export function compose(rows) {
  const out = [];
  const posts = rows.filter((r) => r.kind === 'new_posts');
  if (posts.length) {
    const by = {};
    for (const r of posts) by[r.body] = (by[r.body] || 0) + 1; // body holds the post type
    const parts = Object.entries(by).map(([t, n]) => `${n} ${(TYPE_WORD[t] || [t, t])[n === 1 ? 0 : 1]}`);
    out.push({ ids: posts.map((r) => r.id), severity: 'info', tag: 'dsb-new-posts', title: `${posts.length} new to approve`, body: parts.join(', '), url: '/?f=new' });
  }
  const stale = rows.filter((r) => r.kind === 'going_stale');
  if (stale.length) out.push({ ids: stale.map((r) => r.id), severity: 'info', tag: 'dsb-going-stale', title: stale.at(-1).title, body: stale.at(-1).body, url: '/flow#stale' });
  const issues = rows.filter((r) => r.kind === 'issue').sort((a, b) => (a.severity === 'critical' ? -1 : 0) - (b.severity === 'critical' ? -1 : 0));
  for (const r of issues.slice(0, 3)) out.push({ ids: [r.id], severity: r.severity, tag: `dsb-${r.dedup_key}`, title: r.title, body: r.body, url: r.url });
  if (issues.length > 3) out.push({ ids: issues.slice(3).map((r) => r.id), severity: 'error', tag: 'dsb-issues-more', title: `${issues.length - 3} more problems`, body: 'Open Audit for the list', url: '/audit' });
  for (const r of rows.filter((x) => x.kind === 'run_done' || x.kind === 'run_failed')) out.push({ ids: [r.id], severity: r.severity || 'info', tag: `dsb-${r.dedup_key}`, title: r.title, body: r.body, url: r.url });
  for (const r of rows.filter((x) => x.kind === 'link_answer')) out.push({ ids: [r.id], severity: 'info', tag: `dsb-${r.dedup_key}`, title: r.title, body: r.body, url: r.url });
  return out;
}

/** Sends every due push. Returns {sent, failed, pending}. */
export async function flush(env, now = Date.now()) {
  const db = env.DB;
  if (!env.ADMIN || typeof env.ADMIN.fetch !== 'function' || !env.ADMIN_PUSH_TOKEN) return { skipped: 'no_admin_binding' };
  const rows = (await db
    .prepare(`SELECT * FROM push_outbox WHERE sent_at IS NULL AND attempts < ?2 AND send_after <= ?1 ORDER BY id LIMIT 50`)
    .bind(new Date(now).toISOString(), MAX_ATTEMPTS)
    .all()).results || [];
  if (!rows.length) return { sent: 0, failed: 0 };
  const stg = String(env.DSB_ENV || '') === 'stg';
  let sent = 0;
  let failed = 0;
  for (const m of compose(rows)) {
    const payload = { title: stg ? `STG · ${m.title}` : m.title, body: m.body, url: m.url, tag: m.tag, severity: m.severity };
    let ok = false;
    let err = null;
    try {
      const r = await env.ADMIN.fetch('https://dsb-admin/internal/push', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-interno-token': String(env.ADMIN_PUSH_TOKEN) },
        body: JSON.stringify(payload)
      });
      ok = r.ok;
      if (!ok) err = `HTTP ${r.status} ${(await r.text().catch(() => '')).slice(0, 150)}`;
    } catch (e) {
      err = String((e && e.message) || e).slice(0, 200);
    }
    const marks = m.ids.map((_, i) => `?${i + 2}`).join(',');
    if (ok) {
      sent++;
      await db.prepare(`UPDATE push_outbox SET sent_at = ?1, error = NULL WHERE id IN (${marks})`).bind(nowIso(), ...m.ids).run();
    } else {
      failed++;
      await db.prepare(`UPDATE push_outbox SET attempts = attempts + 1, error = ?1 WHERE id IN (${marks})`).bind(err, ...m.ids).run();
    }
  }
  return { sent, failed };
}

// ---------------------------------------------------------------- the events

/** A new issue (first occurrence) with severity error or critical. */
export async function issuePush(db, issue, p, now) {
  if (!issue || issue.occurrences !== 1 || !['error', 'critical'].includes(p.severity)) return;
  try {
    if (p.agent === 'scheduler' && p.job) {
      if (!(await runPushAllowed(db, p.job, 'failed'))) return;
    } else if (p.kind === 'job_failed') {
      // A scheduled run's failure is pushed when its start closes (run_failed), under that job's setting.
      const jobRunId = Number(String(p.fingerprint || '').split(':')[1]);
      const fire = jobRunId ? await db.prepare('SELECT id FROM schedule_fires WHERE job_run_id = ?1').bind(jobRunId).first() : null;
      if (fire) return;
      if ((await pushSettings(db)).issues === 'off') return;
    } else if ((await pushSettings(db)).issues === 'off' && p.severity !== 'critical') return;
  } catch {
    /* settings unreadable: push as before */
  }
  return enqueue(db, {
    kind: 'issue',
    dedup_key: `issue:${issue.id}`,
    severity: p.severity,
    title: `${p.severity === 'critical' ? 'Critical' : 'Problem'} #${issue.id} (${p.stage})`,
    body: String(p.summary || '').slice(0, 200),
    url: '/audit'
  }, now);
}

/** A post created as new (waiting for approval). */
export async function newPostPush(db, post, now) {
  if (!post || post.status !== 'new') return;
  if ((await pushSettings(db)).new_posts === 'off') return;
  return enqueue(db, { kind: 'new_posts', dedup_key: `post:${post.id}`, title: 'New to approve', body: post.type, url: `/?f=new#p-${post.id}` }, now);
}

/** A link request Marcelo sent was answered (done → the post; refused → the reason). Agents' requests: no push. */
export async function linkAnswerPush(db, req, now) {
  if (!req || ['grok', 'claude'].includes(String(req.requested_by || '').toLowerCase())) return;
  if ((await pushSettings(db)).link_answer === 'off') return;
  if (req.status === 'done') {
    return enqueue(db, { kind: 'link_answer', dedup_key: `link:${req.id}`, title: `Your link became #${req.post_id}`, body: String(req.url || '').slice(0, 150), url: `/?f=new#p-${req.post_id}` }, now);
  }
  if (req.status === 'refused') {
    return enqueue(db, { kind: 'link_answer', dedup_key: `link:${req.id}`, title: 'Your link was refused', body: String(req.reason || req.url || '').slice(0, 200), url: '/#pedidos' }, now);
  }
}

/**
 * Once a day from 09:00 Brasília: approved posts that become stale on the next business day (none → no push).
 * dedup_key = the day, so later ticks of the same day do nothing.
 */
export async function goingStalePush(db, now, { readPlan, staleList }) {
  const local = new Date(now + BRT);
  if (local.getUTCHours() < 9) return null;
  if ((await pushSettings(db)).going_stale === 'off') return null;
  const day = local.toISOString().slice(0, 10);
  const seen = await db.prepare('SELECT id FROM push_outbox WHERE dedup_key = ?1').bind(`stale:${day}`).first();
  if (seen) return null;
  let next = now + 86400000;
  while ([0, 6].includes(new Date(next + BRT).getUTCDay())) next += 86400000;
  const { plan } = await readPlan(db);
  const already = new Set((await staleList(db, plan, now)).map((p) => p.id));
  const soon = (await staleList(db, plan, next)).filter((p) => !already.has(p.id));
  if (!soon.length) return 0;
  const when = new Date(next + BRT).getUTCDay() === new Date(now + BRT + 86400000).getUTCDay() ? 'tomorrow' : 'next business day';
  await enqueue(db, {
    kind: 'going_stale',
    dedup_key: `stale:${day}`,
    title: `${soon.length} ${soon.length === 1 ? 'post goes' : 'posts go'} stale ${when}`,
    body: 'Open Flow to see them',
    url: '/flow#stale'
  }, now);
  return soon.length;
}
