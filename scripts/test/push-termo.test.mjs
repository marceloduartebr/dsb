// Blog subscribe (/api/push/subscribe): nothing is stored without the current consent terms version.
import assert from 'node:assert/strict';
import test from 'node:test';
import worker from '../../worker/index.js';

function kv() {
  const m = new Map();
  return { m, async get(k) { return m.has(k) ? m.get(k) : null; }, async put(k, v) { m.set(k, v); }, async delete(k) { m.delete(k); } };
}
const sub = { endpoint: 'https://fcm.googleapis.com/fcm/send/abc123', keys: { p256dh: 'p'.repeat(87), auth: 'a'.repeat(22) } };
const post = (body) =>
  new Request('https://dsb.duarte.top/api/push/subscribe', {
    method: 'POST',
    headers: { Origin: 'https://dsb.duarte.top', 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0 (Android) Chrome/131.0' },
    body: JSON.stringify(body),
  });

test('subscribe without the accepted terms version is refused and stores nothing', async () => {
  const env = { DSB_PUSH: kv() };
  for (const body of [{ subscription: sub }, { subscription: sub, termo: '0.9' }]) {
    const r = await worker.fetch(post(body), env);
    assert.equal(r.status, 400);
    assert.equal((await r.json()).erro, 'termo');
  }
  assert.equal(env.DSB_PUSH.m.size, 0);
});

test('subscribe with the terms stores the version and the first acceptance date', async () => {
  const env = { DSB_PUSH: kv() };
  const r = await worker.fetch(post({ subscription: sub, termo: '1.0', tipos: ['incidente'], regioes: ['br'] }), env);
  assert.equal(r.status, 200);
  const [rec1] = [...env.DSB_PUSH.m.values()].map((v) => JSON.parse(v));
  assert.equal(rec1.termo, '1.0');
  assert.ok(rec1.aceito_em);
  await new Promise((res) => setTimeout(res, 5));
  await worker.fetch(post({ subscription: sub, termo: '1.0', tipos: ['noticia'], regioes: ['br'] }), env);
  const [rec2] = [...env.DSB_PUSH.m.values()].map((v) => JSON.parse(v));
  assert.equal(rec2.aceito_em, rec1.aceito_em, 'saving preferences keeps the first acceptance');
  assert.deepEqual(rec2.tipos, ['noticia']);
  assert.notEqual(rec2.atualizado, rec1.atualizado);
});
