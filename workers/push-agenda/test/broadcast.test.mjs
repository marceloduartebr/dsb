import assert from 'node:assert/strict';
import test from 'node:test';
import { banco } from './util-banco.mjs';
import {
  BATCH, BROADCAST_TAG, activeBroadcast, broadcastPass, cancelBroadcast, createBroadcastSchema, deviceOf, recentBroadcasts,
  serviceOf, startBroadcast, subscriberView, subscribersPage, validateMessage
} from '../src/broadcast.js';
import { tratarPedido } from '../src/pedido.js';

const ON = { PUSH_SEND: 'on' };
const TOKEN = 'broadcast-token-with-at-least-24-chars';

function kv(n) {
  const m = new Map();
  for (let i = 0; i < n; i++) {
    m.set(`sub:${String(i).padStart(64, '0')}`, JSON.stringify({ endpoint: i % 2 ? `https://fcm.googleapis.com/fcm/send/${i}` : `https://web.push.apple.com/Q${i}`, keys: { p256dh: 'p', auth: 'a' }, topicos: ['edicao'], tipos: ['incidente'], regioes: ['br'], criado: '2026-11-0' + ((i % 9) + 1) + 'T10:00:00.000Z', ua: i % 2 ? 'Mozilla/5.0 (Windows NT 10.0) Chrome/131.0 Safari/537.36' : 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) Safari/604.1' }));
  }
  const keys = () => [...m.keys()].sort();
  return {
    m,
    async get(k) { return m.has(k) ? m.get(k) : null; },
    async delete(k) { m.delete(k); },
    async list({ prefix = '', cursor, limit = 1000 } = {}) {
      const all = keys().filter((k) => k.startsWith(prefix));
      // Opaque cursor like KV's: resumes after the last key returned, so deletes do not skip anyone.
      const rest = cursor ? all.filter((x) => x > cursor) : all;
      const slice = rest.slice(0, limit);
      const complete = slice.length >= rest.length;
      return { keys: slice.map((name) => ({ name })), list_complete: complete, cursor: complete ? '' : slice.at(-1) };
    }
  };
}

function db() {
  const d = banco();
  createBroadcastSchema(d);
  return d;
}

test('message: title 80, text 400, link only on dsb.duarte.top, broadcast tag', () => {
  assert.deepEqual(validateMessage({ title: 'Urgent', body: 'Read this', url: '/briefings/x' }).payload, { titulo: 'Urgent', texto: 'Read this', url: 'https://dsb.duarte.top/briefings/x', tag: BROADCAST_TAG });
  assert.equal(validateMessage({ title: 'x'.repeat(81), body: 'b' }).erro, 'title');
  assert.equal(validateMessage({ title: 't', body: '' }).erro, 'body_text');
  assert.equal(validateMessage({ title: 't', body: 'b', url: 'https://evil.example/' }).erro, 'url');
  assert.equal(validateMessage({ title: 't', body: 'b' }).payload.url, 'https://dsb.duarte.top/');
});

test('subscribers: total, a page without endpoints or keys, device and service in plain words', async () => {
  const k = kv(35);
  const p = await subscribersPage(k, '');
  assert.equal(p.total, 35);
  assert.equal(p.items.length, 30);
  assert.ok(p.cursor);
  const first = p.items[0];
  assert.deepEqual(Object.keys(first).sort(), ['created', 'device', 'id', 'regions', 'service', 'types', 'updated']);
  assert.equal(first.id, '00000000');
  assert.equal(first.device, 'iPhone · Safari');
  assert.equal(first.service, 'Apple');
  assert.ok(!JSON.stringify(p).includes('fcm.googleapis.com/fcm/send'));
  assert.equal((await subscribersPage(k, p.cursor)).items.length, 5);
  assert.equal(deviceOf(''), 'Unknown');
  assert.equal(serviceOf('nope'), 'unknown');
  assert.deepEqual(subscriberView('sub:abcdef1234', '{bad'), { id: 'abcdef12', unreadable: true });
});

test('start: refused without PUSH_SEND, with a wrong count, or while another is sending', () => {
  const d = db();
  const payload = validateMessage({ title: 't', body: 'b' }).payload;
  assert.equal(startBroadcast(d, {}, { payload, confirm: 3, total: 3 }).erro, 'push_send_off');
  assert.equal(startBroadcast(d, { PUSH_ENVIO: 'on' }, { payload, confirm: 3, total: 3 }).ok, true, 'the old lock name still counts');
  assert.equal(startBroadcast(d, ON, { payload, confirm: 3, total: 3 }).erro, 'broadcast_running');
  cancelBroadcast(d, { by: 'm' });
  assert.equal(startBroadcast(d, ON, { payload, confirm: 2, total: 3 }).erro, 'confirm_mismatch');
  assert.equal(startBroadcast(d, ON, { payload, confirm: 0, total: 0 }).erro, 'no_subscribers');
  assert.equal(recentBroadcasts(d)[0].state, 'cancelled');
});

test('passes: batches of 8 through every subscriber; expired deleted; failures counted; done at the end', async () => {
  const d = db();
  const k = kv(20);
  const payload = validateMessage({ title: 'Urgent', body: 'Read this' }).payload;
  startBroadcast(d, ON, { payload, sentBy: 'marcelo@x', confirm: 20, total: 20 });
  const seen = [];
  const send = async (rec, p) => {
    seen.push(p);
    if (rec.endpoint === 'https://web.push.apple.com/Q4') return { classe: 'expirado', status: 410 };
    if (rec.endpoint.endsWith('/7')) return { classe: 'transiente', status: 503 };
    return { classe: 'ok', status: 201 };
  };
  let passes = 0;
  let r;
  do { r = await broadcastPass(d, ON, { kv: k, send }); passes++; } while (r.continue && passes < 10);
  assert.equal(passes, Math.ceil(20 / BATCH));
  const b = recentBroadcasts(d)[0];
  assert.equal(b.state, 'done');
  assert.equal(b.sent, 18);
  assert.equal(b.expired, 1);
  assert.equal(b.failed, 1);
  assert.equal(k.m.size, 19, 'the expired subscription is deleted');
  assert.deepEqual(seen[0], { titulo: 'Urgent', texto: 'Read this', url: 'https://dsb.duarte.top/', tag: BROADCAST_TAG });
  assert.equal(activeBroadcast(d), null);
});

test('PUSH_SEND turned off mid-way stops the broadcast', async () => {
  const d = db();
  startBroadcast(d, ON, { payload: validateMessage({ title: 't', body: 'b' }).payload, confirm: 20, total: 20 });
  await broadcastPass(d, ON, { kv: kv(20), send: async () => ({ classe: 'ok' }) });
  const r = await broadcastPass(d, {}, { kv: kv(20), send: async () => ({ classe: 'ok' }) });
  assert.equal(r.continue, false);
  assert.equal(recentBroadcasts(d)[0].state, 'stopped');
  assert.equal(recentBroadcasts(d)[0].sent, 8);
});

test('routes: own token only; validation; test goes through the allowlist path; start and status reach the agenda', async () => {
  const req = (path, opts = {}) => new Request(`https://p.test${path}`, opts);
  const calls = [];
  const agenda = {
    subscribers: async (c) => { calls.push(['subscribers', c]); return { total: 2, items: [], cursor: '' }; },
    broadcastStatus: async () => ({ sending: null, recent: [], pushSend: true }),
    broadcastStart: async (x) => { calls.push(['start', x]); return { ok: true }; },
    broadcastCancel: async (by) => { calls.push(['cancel', by]); return { ok: true }; }
  };
  const env = { BROADCAST_TOKEN: TOKEN, ADMIN_TOKEN: 'admin-token-xxxxxxxxxxxxxxxxxxxxxx' };
  const auth = { Authorization: `Bearer ${TOKEN}`, 'content-type': 'application/json' };
  assert.equal((await tratarPedido(req('/admin/subscribers'), {}, agenda)).status, 503);
  assert.equal((await tratarPedido(req('/admin/subscribers', { headers: { Authorization: `Bearer ${env.ADMIN_TOKEN}` } }), env, agenda)).status, 401, 'the admin token does not open broadcasts');
  assert.equal((await tratarPedido(req('/admin/subscribers?cursor=9', { headers: auth }), env, agenda)).status, 200);
  assert.deepEqual(calls.at(-1), ['subscribers', '9']);
  assert.equal((await tratarPedido(req('/admin/broadcast', { method: 'POST', headers: auth, body: JSON.stringify({ title: '', body: 'b' }) }), env, agenda)).status, 400);
  let alerted = null;
  const t = await tratarPedido(req('/admin/broadcast/test', { method: 'POST', headers: auth, body: JSON.stringify({ title: 'T', body: 'B' }) }), env, agenda, { enviarAlerta: async (_e, p) => { alerted = p; return { ok: true, destinos: [] }; } });
  assert.equal(t.status, 200);
  assert.equal(alerted.tag, BROADCAST_TAG);
  const s = await tratarPedido(req('/admin/broadcast', { method: 'POST', headers: auth, body: JSON.stringify({ title: 'T', body: 'B', confirm: 2, by: 'marcelo@x' }) }), env, agenda);
  assert.equal(s.status, 200);
  assert.deepEqual(calls.at(-1)[1].confirm, 2);
  assert.equal((await tratarPedido(req('/admin/broadcast', { headers: auth }), env, agenda)).status, 200);
  await tratarPedido(req('/admin/broadcast/cancel', { method: 'POST', headers: auth, body: JSON.stringify({ by: 'm' }) }), env, agenda);
  assert.deepEqual(calls.at(-1), ['cancel', 'm']);
});

test('a cancel that lands while a pass is sending is kept: the pass counts its sends but does not resume the row', async () => {
  const d = db();
  startBroadcast(d, ON, { payload: validateMessage({ title: 't', body: 'b' }).payload, confirm: 20, total: 20 });
  let first = true;
  const send = async () => {
    if (first) {
      first = false;
      cancelBroadcast(d, { by: 'm' });
    }
    return { classe: 'ok' };
  };
  const r = await broadcastPass(d, ON, { kv: kv(20), send });
  assert.equal(r.continue, false);
  const b = recentBroadcasts(d)[0];
  assert.equal(b.state, 'cancelled');
  assert.equal(b.sent, 8);
  assert.equal(activeBroadcast(d), null);
  assert.equal(startBroadcast(d, ON, { payload: validateMessage({ title: 't', body: 'b' }).payload, confirm: 20, total: 20 }).ok, true);
  assert.equal(d.exec(`SELECT COUNT(*) AS n FROM broadcasts WHERE state = 'sending'`)[0].n, 1);
});
