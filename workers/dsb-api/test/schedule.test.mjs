import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handle, timerPass } from '../src/index.js';
import { createD1 } from './d1-sqlite.mjs';
import { tick, nextAt, brt, runKey } from '../src/schedule.js';
import { sendAfter, compose, flush } from '../src/push.js';

const TOKENS = { INTERNAL_TOKEN: 'internal-000000000000000000000000', TOKEN_GROK: 'grok-00000000000000000000000000000', TOKEN_CLAUDE: 'claude-0000000000000000000000000000' };
const at = (brtLocal) => Date.parse(`${brtLocal}-03:00`); // '2026-11-25T08:31:00' Brasília → ms

function setup(extra = {}) {
  const sent = [];
  const env = {
    DB: createD1(),
    ...TOKENS,
    ADMIN_PUSH_TOKEN: 'push-0000000000000000000000000000',
    ADMIN: { fetch: async (target, init) => { sent.push({ target, ...JSON.parse(init.body), token: init.headers['x-interno-token'] }); return new Response('{"ok":true}'); } },
    ...extra
  };
  const call = async (method, path, body, { internal = false, token = TOKENS.TOKEN_CLAUDE } = {}) => {
    const headers = { 'content-type': 'application/json' };
    if (internal) Object.assign(headers, { 'x-internal-token': TOKENS.INTERNAL_TOKEN, 'x-actor': 'marcelo@app' });
    else headers.Authorization = `Bearer ${token}`;
    const res = await handle(new Request(`https://dsb-api${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined }), env);
    return { status: res.status, body: await res.json() };
  };
  const fires = async () => (await env.DB.prepare('SELECT * FROM schedule_fires ORDER BY id').all()).results;
  const issues = async () => (await env.DB.prepare('SELECT * FROM issues ORDER BY id').all()).results;
  const outbox = async () => (await env.DB.prepare('SELECT * FROM push_outbox ORDER BY id').all()).results;
  return { env, call, fires, issues, outbox, sent };
}

/** A fetch stand-in that records calls and answers from a list (last answer repeats). */
function fakeFetch(...answers) {
  const calls = [];
  const fn = async (url, init) => {
    calls.push({ url, headers: init.headers, body: JSON.parse(init.body) });
    const a = answers[Math.min(calls.length - 1, answers.length - 1)];
    return new Response(JSON.stringify(a.body || {}), { status: a.status || 200, headers: a.headers || {} });
  };
  fn.calls = calls;
  return fn;
}

test('schedule: seeded with today\'s times; Grok slots start off; Brasília calendar helpers', async () => {
  const { call } = setup();
  const r = await call('GET', '/schedule');
  assert.equal(r.status, 200);
  assert.equal(r.body.mode, 'log');
  const by = Object.fromEntries(r.body.slots.map((s) => [s.slot, s]));
  assert.deepEqual(Object.keys(by).sort(), ['blog_afternoon', 'blog_midday', 'blog_morning', 'covers', 'curation', 'linkedin_afternoon', 'linkedin_morning', 'x_afternoon', 'x_morning', 'x_radar', 'x_radar_afternoon', 'x_takedowns']);
  assert.deepEqual([by.x_radar_afternoon.job, by.x_radar_afternoon.time, by.x_radar_afternoon.provider, by.x_radar_afternoon.label, by.x_radar.label], ['x_radar', '17:00', 'grok', 'X Radar afternoon', 'X Radar noon']);
  assert.equal(by.blog_morning.time, '08:30');
  assert.equal(by.blog_midday.mode, 'burst');
  assert.equal(by.x_afternoon.mode, 'off');
  assert.equal(by.x_afternoon.next_at, null);
  assert.equal(by.x_morning.time, '09:30');
  assert.equal(by.x_afternoon.round, 'x_afternoon');
  assert.deepEqual(brt(at('2026-11-25T08:31:00')), { date: '2026-11-25', minutes: 511, dow: 3, hhmm: '0831' });
  assert.equal(runKey('2026-11-25', '08:30', 'blog_morning'), '2026-11-25-0830-blog_morning');
  // next start skips days the slot does not run
  assert.equal(nextAt({ time: '08:00', days: '12345', mode: 'on' }, at('2026-11-27T09:00:00'), false), '2026-11-30T11:00:00.000Z'); // Fri → Mon
});

test('tick (log mode): due slots recorded once a day; over 60 min late = missed, not reported; nothing started', async () => {
  const { env, fires, issues, outbox } = setup();
  const fetchFn = fakeFetch({ status: 200 });
  const r = await tick(env, at('2026-11-25T08:31:00'), fetchFn);
  assert.equal(fetchFn.calls.length, 0, 'log mode starts nothing');
  const f = await fires();
  assert.deepEqual(f.map((x) => [x.slot, x.status]), [['curation', 'missed'], ['covers', 'logged'], ['blog_morning', 'logged']]);
  assert.equal(f.at(-1).run_key, '2026-11-25-0830-blog_morning');
  assert.ok(r.done.find((d) => d.slot === 'curation' && d.action === 'missed'));
  assert.equal((await issues()).filter((i) => i.kind === 'slot_missed').length, 0, 'log-only mode: recorded, not reported');
  assert.equal((await outbox()).filter((o) => o.kind === 'issue').length, 0);
  await tick(env, at('2026-11-25T08:36:00'), fetchFn);
  assert.equal((await fires()).length, 3, 'a second pass the same day adds nothing');
  // next day, before 07:00, nothing is due
  await tick(env, at('2026-11-26T06:55:00'), fetchFn);
  assert.equal((await fires()).length, 3);
});

test('claim (Claude, no run_key): oldest open fire of the job; one run per job; job links and closes the fire', async () => {
  const { env, call, fires } = setup();
  await tick(env, Date.now() - 1000, fakeFetch({}));
  // make a blog fire exist regardless of the real clock
  await env.DB.prepare(`INSERT INTO schedule_fires (slot, job, provider, round, run_date, run_key, status, fired_at) VALUES ('blog_afternoon','blog','claude','blog_afternoon','2099-01-01','2099-01-01-1700-blog_afternoon','logged', ?1)`).bind(new Date().toISOString()).run();
  const c = await call('POST', '/schedule/claim', { job: 'blog' });
  assert.equal(c.status, 200, JSON.stringify(c.body));
  assert.equal(c.body.job, 'blog');
  assert.ok(['blog_morning', 'blog_midday', 'blog_afternoon'].includes(c.body.round));
  const again = await call('POST', '/schedule/claim', { job: 'blog' });
  assert.equal(again.status, 409);
  assert.equal(again.body.error, 'job_running');
  const j = await call('POST', '/jobs', { job: 'blog-publish', run_key: c.body.run_key });
  await call('PATCH', `/jobs/${j.body.job.id}`, { status: 'ok', notes: 'done' });
  const f = (await fires()).find((x) => x.run_key === c.body.run_key);
  assert.equal(f.status, 'done');
  assert.equal(f.job_run_id, j.body.job.id);
  // with the run closed, the next claim goes through
  assert.equal((await call('POST', '/schedule/claim', { job: 'blog' })).status, 200);
});

test('claim with nothing started (Run now in claude.ai): a manual fire of the latest slot of the day', async () => {
  const { call, fires } = setup();
  const c = await call('POST', '/schedule/claim', { job: 'covers' });
  assert.equal(c.status, 200, JSON.stringify(c.body));
  assert.equal(c.body.slot, 'covers');
  assert.equal(c.body.manual, true);
  assert.equal((await fires())[0].requested_by, 'claude');
  assert.equal((await call('POST', '/schedule/claim', { job: 'nope' })).status, 422);
});

test('Grok (live): webhook gets run_key + env and Bearer key; claim needs that exact run_key, once', async () => {
  const { env, call, fires } = setup({ SCHEDULE_MODE: 'live', DSB_ENV: 'prod', START_URL_X_PUBLISH: 'https://hooks.example/x-publish', START_KEY_X_PUBLISH: 'xkey-123' });
  assert.equal((await call('PATCH', '/schedule/x_afternoon', { mode: 'on' }, { internal: true })).status, 200);
  const fetchFn = fakeFetch({ status: 202, body: { accepted: true } });
  await tick(env, at('2026-11-25T18:02:00'), fetchFn);
  const call0 = fetchFn.calls.find((c) => c.url === 'https://hooks.example/x-publish');
  assert.ok(call0, 'webhook called');
  assert.equal(call0.headers.Authorization, 'Bearer xkey-123');
  assert.deepEqual(call0.body, { run_key: '2026-11-25-1800-x_afternoon', env: 'prod' });
  const f = (await fires()).find((x) => x.slot === 'x_afternoon');
  assert.equal(f.status, 'fired');
  const grok = { token: TOKENS.TOKEN_GROK };
  assert.equal((await call('POST', '/schedule/claim', { job: 'x_publish', run_key: 'made-up' }, grok)).body.error, 'no_slot');
  assert.equal((await call('POST', '/schedule/claim', { job: 'x_radar', run_key: f.run_key }, grok)).body.error, 'no_slot', 'job must match');
  const ok = await call('POST', '/schedule/claim', { job: 'x_publish', run_key: f.run_key }, grok);
  assert.equal(ok.status, 200, JSON.stringify(ok.body));
  assert.equal(ok.body.slot, 'x_afternoon');
  assert.equal(ok.body.round, 'x_afternoon', 'the run asks /plan/round with this');
  const twice = await call('POST', '/schedule/claim', { job: 'x_publish', run_key: f.run_key }, grok);
  assert.equal(twice.status, 409, 'a repeated run_key is refused');
});

test('Grok jobs without run_key link to the claimed run; a duplicate job does not fail the run; x-removals is not linked', async () => {
  const { env, call, fires } = setup({ SCHEDULE_MODE: 'live', DSB_ENV: 'prod', START_URL_X_PUBLISH: 'https://hooks.example/x-publish', START_KEY_X_PUBLISH: 'xkey-123' });
  await call('PATCH', '/schedule/x_afternoon', { mode: 'on' }, { internal: true });
  await tick(env, Date.now(), fakeFetch({ status: 200 }));
  const grok = { token: TOKENS.TOKEN_GROK };
  let f = (await fires()).find((x) => x.slot === 'x_afternoon');
  if (!f) {
    // Outside 18:00 the tick fires nothing: use Run now, as Admin does.
    await call('POST', '/schedule/run', { slot: 'x_afternoon' }, { internal: true });
    f = (await fires()).find((x) => x.slot === 'x_afternoon');
  }
  assert.equal((await call('POST', '/schedule/claim', { job: 'x_publish', run_key: f.run_key }, grok)).status, 200);
  const rem = await call('POST', '/jobs', { job: 'x-removals' }, grok);
  const j1 = await call('POST', '/jobs', { job: 'x-publish' }, grok);
  const j2 = await call('POST', '/jobs', { job: 'x-publish' }, grok);
  await call('PATCH', `/jobs/${rem.body.job.id}`, { status: 'skipped', notes: 'no X rows' }, grok);
  assert.equal((await fires()).find((x) => x.id === f.id).status, 'claimed', 'x-removals does not close the run');
  await call('PATCH', `/jobs/${j1.body.job.id}`, { status: 'error', notes: 'duplicate opening' }, grok);
  assert.equal((await fires()).find((x) => x.id === f.id).status, 'claimed', 'the stray duplicate does not fail the run');
  await call('PATCH', `/jobs/${j2.body.job.id}`, { status: 'ok', notes: '2 tweets' }, grok);
  const done = (await fires()).find((x) => x.id === f.id);
  assert.equal(done.status, 'done');
  assert.equal(done.job_run_id, j2.body.job.id);
});

test('fireJobOf: job-run names to schedule jobs', async () => {
  const { fireJobOf } = await import('../src/schedule.js');
  assert.deepEqual(['x-publish', 'x-radar', 'blog-publish', 'linkedin-publish-stg', 'covers', 'curation', 'x-removals', 'removals', ''].map(fireJobOf), ['x_publish', 'x_radar', 'blog', 'linkedin', 'covers', 'curation', null, null, null]);
});

test('Claude (live): task URL with anthropic-version, no text; 401 = failed + fire_failed issue; 503 retried once', async () => {
  const { env, fires, issues } = setup({ SCHEDULE_MODE: 'live', START_URL_COVERS: 'https://api.anthropic.com/v1/claude_code/routines/trig_X/fire', START_KEY_COVERS: 'sk-ant-oat01-x' });
  const ok = fakeFetch({ status: 503 }, { status: 200, body: { type: 'routine_fire', claude_code_session_url: 'https://claude.ai/code/session_1' } });
  await tick(env, at('2026-11-25T08:31:00'), ok);
  const covers = ok.calls.filter((c) => c.url.includes('trig_X'));
  assert.equal(covers.length, 2, '503 then retry');
  assert.equal(covers[0].headers['anthropic-version'], '2026-10-21');
  assert.deepEqual(covers[0].body, {});
  const f = (await fires()).find((x) => x.slot === 'covers');
  assert.equal(f.status, 'fired');
  assert.equal(f.session_url, 'https://claude.ai/code/session_1');
  // blog has no secrets set: failed, reported, not retried
  const cur = (await fires()).find((x) => x.slot === 'blog_morning');
  assert.equal(cur.status, 'failed');
  assert.equal(cur.next_try_at, null);
  // a refused token
  await env.DB.prepare('DELETE FROM schedule_fires').run();
  const bad = fakeFetch({ status: 401, body: { type: 'error', error: { type: 'authentication_error', message: 'token does not match' } } });
  await tick(env, at('2026-11-25T08:03:00'), bad);
  const fi = (await issues()).find((i) => i.kind === 'fire_failed' && /Covers|covers/.test(i.summary));
  assert.ok(fi, 'fire_failed issue');
  assert.match(fi.suggested_action, /Pass/);
});

test('429: kept for a retry after Retry-After; a retry that works marks the fire fired', async () => {
  const { env, fires } = setup({ SCHEDULE_MODE: 'live', START_URL_COVERS: 'https://u/fire', START_KEY_COVERS: 'k' });
  const t0 = at('2026-11-25T08:02:00');
  await tick(env, t0, fakeFetch({ status: 429, headers: { 'retry-after': '120' } }));
  let f = (await fires()).find((x) => x.slot === 'covers');
  assert.equal(f.status, 'failed');
  assert.equal(f.next_try_at, new Date(t0 + 120000).toISOString());
  await tick(env, t0 + 60000, fakeFetch({ status: 200 }));
  assert.equal((await fires()).find((x) => x.slot === 'covers').status, 'failed', 'not before Retry-After');
  await tick(env, t0 + 180000, fakeFetch({ status: 200 }));
  f = (await fires()).find((x) => x.slot === 'covers');
  assert.equal(f.status, 'fired');
  assert.equal(f.attempts, 2);
});

test('order: X Publish waits while a blog run is open; a run that never claims is reported after 20 min', async () => {
  const { env, call, fires, issues } = setup({ SCHEDULE_MODE: 'live', START_URL_X_PUBLISH: 'https://h/x', START_KEY_X_PUBLISH: 'k', START_URL_BLOG: 'https://h/b', START_KEY_BLOG: 'k' });
  await call('PATCH', '/schedule/x_afternoon', { mode: 'on', time: '17:05' }, { internal: true });
  const f = fakeFetch({ status: 200 });
  await tick(env, at('2026-11-25T17:01:00'), f);
  assert.equal((await fires()).find((x) => x.slot === 'blog_afternoon').status, 'fired');
  const r = await tick(env, at('2026-11-25T17:06:00'), f);
  assert.ok(r.done.find((d) => d.slot === 'x_afternoon' && d.action === 'waiting'));
  assert.equal((await fires()).find((x) => x.slot === 'x_afternoon'), undefined);
  // 25 min later the blog run never claimed: reported and released, so X Publish starts
  await tick(env, at('2026-11-25T17:26:00'), f);
  assert.equal((await fires()).find((x) => x.slot === 'blog_afternoon').status, 'error');
  assert.ok((await issues()).find((i) => i.kind === 'slot_not_started'));
  assert.equal((await fires()).find((x) => x.slot === 'x_afternoon').status, 'fired');
});

test('PATCH /schedule/:slot: Admin only, validated, logged; blog midday mode sets the plan\'s midday runs', async () => {
  const { call } = setup();
  assert.equal((await call('PATCH', '/schedule/covers', { time: '08:15' })).status, 403);
  assert.equal((await call('PATCH', '/schedule/covers', { time: '25:00' }, { internal: true })).status, 422);
  assert.equal((await call('PATCH', '/schedule/covers', { days: '' }, { internal: true })).status, 422);
  assert.equal((await call('PATCH', '/schedule/nope', { time: '08:15' }, { internal: true })).status, 404);
  const r = await call('PATCH', '/schedule/covers', { time: '08:15', days: '123456' }, { internal: true });
  assert.equal(r.body.slot.time, '08:15');
  assert.equal(r.body.slot.days, '123456');
  assert.equal(r.body.slot.updated_by, 'marcelo@app');
  await call('PATCH', '/schedule/blog_midday', { mode: 'on' }, { internal: true });
  assert.equal((await call('GET', '/plan')).body.plan.rounds.blog_midday.runs, 'always');
  const s = await call('GET', '/schedule');
  assert.equal(s.body.log[0].slot, 'blog_midday');
  assert.equal(s.body.slots.find((x) => x.slot === 'covers').next_at !== undefined, true);
});

test('Run now: Admin only; refused while the job runs; log mode records a claimable manual fire', async () => {
  const { call } = setup();
  assert.equal((await call('POST', '/schedule/run', { slot: 'covers' })).status, 403);
  const r = await call('POST', '/schedule/run', { slot: 'covers' }, { internal: true });
  assert.equal(r.status, 200, JSON.stringify(r.body));
  assert.equal(r.body.fire.status, 'logged');
  assert.equal(r.body.fire.manual, 1);
  assert.match(r.body.fire.run_key, /-covers-now$/);
  const c = await call('POST', '/schedule/claim', { job: 'covers' });
  assert.equal(c.body.run_key, r.body.fire.run_key);
  assert.equal((await call('POST', '/schedule/run', { slot: 'covers' }, { internal: true })).body.error, 'job_running');
});

test('push: quiet hours hold until 07:00 except critical; new posts wait 10 min and merge into one message', () => {
  assert.equal(sendAfter('issue', 'error', at('2026-11-25T23:10:00')), '2026-11-26T10:00:00.000Z');
  assert.equal(sendAfter('issue', 'critical', at('2026-11-25T23:10:00')), new Date(at('2026-11-25T23:10:00')).toISOString());
  assert.equal(sendAfter('issue', 'error', at('2026-11-26T05:00:00')), '2026-11-26T10:00:00.000Z');
  assert.equal(sendAfter('new_posts', 'info', at('2026-11-25T10:00:00')), new Date(at('2026-11-25T10:10:00')).toISOString());
  const msgs = compose([
    { id: 1, kind: 'new_posts', body: 'incident' }, { id: 2, kind: 'new_posts', body: 'incident' }, { id: 3, kind: 'new_posts', body: 'news' },
    { id: 4, kind: 'issue', severity: 'error', dedup_key: 'issue:9', title: 'Problem #9 (blog)', body: 'x', url: '/audit' }
  ]);
  assert.deepEqual(msgs[0], { ids: [1, 2, 3], severity: 'info', tag: 'dsb-new-posts', title: '3 new to approve', body: '2 incidents, 1 news', url: '/?f=new' });
  assert.equal(msgs[1].title, 'Problem #9 (blog)');
});

test('push events: error issue (first time only), new post, link answer to Marcelo; flushed through DSB Admin, STG marked', async () => {
  const { env, call, outbox, sent } = setup({ DSB_ENV: 'stg' });
  const a = await call('POST', '/issues', { fingerprint: 'f1', kind: 'k', severity: 'error', stage: 'blog', summary: 'cover gate failed' });
  await call('POST', '/issues', { fingerprint: 'f1', kind: 'k', severity: 'error', stage: 'blog', summary: 'cover gate failed' });
  await call('POST', '/issues', { fingerprint: 'f2', kind: 'k', severity: 'warning', stage: 'blog', summary: 'just a warning' });
  const issuesQueued = (await outbox()).filter((o) => o.kind === 'issue');
  assert.equal(issuesQueued.length, 1, 'repeat and warning do not push');
  assert.equal(issuesQueued[0].url, '/audit');
  const p = await call('POST', '/posts', { topic: 't', type: 'incident', country: 'BR', source_name: 'S', source_url: 'https://e.com/a', slug: 'a', briefing_md: '# b', post_text: 't' });
  assert.ok((await outbox()).find((o) => o.dedup_key === `post:${p.body.post.id}`));
  const mine = await call('POST', '/intake/requests', { url: 'https://e.com/mine' }, { internal: true });
  const agent = await call('POST', '/intake/requests', { url: 'https://e.com/agent' });
  for (const r of [mine, agent]) {
    await call('POST', `/intake/requests/${r.body.request.id}/claim`, {});
    await call('POST', `/intake/requests/${r.body.request.id}/result`, { status: 'refused', reason: 'competitor' });
  }
  const links = (await outbox()).filter((o) => o.kind === 'link_answer');
  assert.equal(links.length, 1, 'only Marcelo\'s request');
  // flush at a daytime instant after the 10-min grouping
  const res = await flush(env, Date.now() + 11 * 60000);
  assert.equal(res.failed, 0);
  assert.ok(sent.find((m) => m.title === 'STG · 1 new to approve'));
  assert.ok(sent.every((m) => m.token === env.ADMIN_PUSH_TOKEN && m.target === 'https://dsb-admin/internal/push'));
  assert.equal((await outbox()).filter((o) => !o.sent_at && Date.parse(o.send_after) <= Date.now() + 11 * 60000).length, 0);
});

test('push: a failed send stays queued and is retried; no binding = skipped', async () => {
  let fail = true;
  const { env, call, outbox } = setup();
  env.ADMIN = { fetch: async () => (fail ? new Response('down', { status: 502 }) : new Response('{}')) };
  await call('POST', '/issues', { fingerprint: 'f9', kind: 'k', severity: 'critical', stage: 'job', summary: 's' });
  let r = await flush(env);
  assert.equal(r.failed, 1);
  assert.equal((await outbox())[0].attempts, 1);
  fail = false;
  r = await flush(env);
  assert.equal(r.sent, 1);
  assert.equal((await flush({ DB: env.DB })).skipped, 'no_admin_binding');
});

test('going stale: one push a day from 09:00 when posts turn stale the next business day', async () => {
  const { env, call, outbox } = setup();
  // incidents go stale after 3 business days: added Mon 23 Nov → stale Thu 26 Nov
  const r = await call('POST', '/posts', { topic: 't', type: 'incident', country: 'BR', source_name: 'S', source_url: 'https://e.com/s', slug: 's', briefing_md: '# b', post_text: 't', image_source: 'generated', image_url: 'https://covers.duarte.top/covers/x.jpg' });
  const id = r.body.post.id;
  await env.DB.prepare('UPDATE posts SET added_at = ?1 WHERE id = ?2').bind('2026-11-23T12:00:00Z', id).run();
  await call('POST', `/posts/${id}/status`, { to: 'approved' }, { internal: true });
  await timerPass(env, at('2026-11-25T08:55:00'), fakeFetch({}));
  assert.equal((await outbox()).filter((o) => o.kind === 'going_stale').length, 0, 'not before 09:00');
  await timerPass(env, at('2026-11-25T09:01:00'), fakeFetch({}));
  await timerPass(env, at('2026-11-25T09:06:00'), fakeFetch({}));
  const st = (await outbox()).filter((o) => o.kind === 'going_stale');
  assert.equal(st.length, 1);
  assert.equal(st[0].title, '1 post goes stale tomorrow');
  assert.equal(st[0].body, `#${id}`);
});

test('timer route: STG runs it by hand (Admin or Claude); Grok cannot', async () => {
  const { call } = setup();
  assert.equal((await call('POST', '/schedule/tick', {}, { token: TOKENS.TOKEN_GROK })).status, 403);
  const r = await call('POST', '/schedule/tick', {}, { internal: true });
  assert.equal(r.status, 200);
  assert.ok(r.body.schedule);
});

test('Next rounds preview follows the schedule: moved time, skipped days, off slot', async () => {
  const { call } = setup();
  await call('PATCH', '/schedule/blog_morning', { time: '09:15', days: '12345' }, { internal: true }); // weekdays only
  await call('PATCH', '/schedule/linkedin_afternoon', { mode: 'off' }, { internal: true });
  // Friday 27 Nov 2026, 10:00 Brasília: the next blog morning is Monday 09:15
  const u = (await call('GET', '/plan/upcoming?at=2026-11-27T13:00:00Z')).body.rounds;
  const bm = u.find((r) => r.round === 'blog_morning');
  assert.equal(bm.at, '2026-11-30T12:15:00.000Z');
  assert.equal(u.find((r) => r.round === 'linkedin_afternoon').inactive, 'Off in the schedule');
  assert.ok(u.findIndex((r) => r.round === 'blog_morning') > u.findIndex((r) => r.round === 'blog_afternoon'));
});

test('claim (Claude): the real start wins over a log-only record left from before the timer went live', async () => {
  const { env, call, fires } = setup();
  const now = new Date().toISOString();
  await env.DB.prepare(`INSERT INTO schedule_fires (slot, job, provider, run_date, run_key, status, fired_at) VALUES ('covers','covers','claude','2099-01-01','2099-01-01-0800-covers','logged', ?1)`).bind(now).run();
  await env.DB.prepare(`INSERT INTO schedule_fires (slot, job, provider, run_date, run_key, manual, status, fired_at) VALUES ('covers','covers','claude','2099-01-01','2099-01-01-0907-covers-now',1,'fired', ?1)`).bind(now).run();
  const c = await call('POST', '/schedule/claim', { job: 'covers' });
  assert.equal(c.body.run_key, '2099-01-01-0907-covers-now');
  assert.equal((await fires()).find((f) => f.run_key === '2099-01-01-0800-covers').status, 'logged', 'the log-only record is left alone');
});

test('live mode: a slot over 60 min late is missed, reported and pushed', async () => {
  const { env, issues, outbox, fires } = setup({ SCHEDULE_MODE: 'live' });
  await tick(env, at('2026-11-25T08:31:00'), fakeFetch({ status: 200 }));
  assert.equal((await fires()).find((f) => f.slot === 'curation').status, 'missed');
  const miss = (await issues()).find((i) => i.kind === 'slot_missed');
  assert.match(miss.summary, /Curation 07:00 did not start \(found 91 min late\)/);
  assert.ok((await outbox()).find((o) => o.kind === 'issue' && o.dedup_key === `issue:${miss.id}`));
});

test('live: a log-only record left from before go-live does not hold X back', async () => {
  const { env, call, fires } = setup({ SCHEDULE_MODE: 'live', START_URL_X_PUBLISH: 'https://h/x', START_KEY_X_PUBLISH: 'k' });
  await call('PATCH', '/schedule/x_morning', { mode: 'on' }, { internal: true });
  await env.DB.prepare(`INSERT INTO schedule_fires (slot, job, provider, round, run_date, run_key, status, fired_at) VALUES ('blog_morning','blog','claude','blog_morning','2026-11-25','2026-11-25-0830-blog_morning','logged', ?1)`).bind(new Date(at('2026-11-25T09:31:00')).toISOString()).run();
  const f = fakeFetch({ status: 200 });
  const r = await tick(env, at('2026-11-25T09:40:00'), f);
  assert.equal((await fires()).find((x) => x.slot === 'x_morning').status, 'fired', JSON.stringify(r.done));
});

test('push settings: Admin only; per job all/success/failed/off decides run pushes; events on/off; a failed run pushes once', async () => {
  const { env, call, outbox } = setup();
  const g = await call('GET', '/push/settings');
  assert.equal(g.body.settings['run:blog'], 'all');
  assert.equal(g.body.settings.new_posts, 'on');
  assert.equal((await call('PATCH', '/push/settings', { settings: { 'run:blog': 'failed' } })).status, 403);
  assert.equal((await call('PATCH', '/push/settings', { settings: { 'run:blog': 'sometimes' } }, { internal: true })).status, 422);
  assert.equal((await call('PATCH', '/push/settings', { settings: { nope: 'on' } }, { internal: true })).status, 422);
  const r = await call('PATCH', '/push/settings', { settings: { 'run:covers': 'failed', 'run:linkedin': 'failed', 'run:curation': 'success', 'run:blog': 'off', new_posts: 'off' } }, { internal: true });
  assert.deepEqual(r.body.changed_keys.sort(), ['new_posts', 'run:blog', 'run:covers', 'run:curation', 'run:linkedin']);
  assert.equal(r.body.changed.updated_by, 'marcelo@app');
  const run = async (job, status, notes) => {
    const c = await call('POST', '/schedule/claim', { job });
    const j = await call('POST', '/jobs', { job: `${job}-x`, run_key: c.body.run_key });
    await call('PATCH', `/jobs/${j.body.job.id}`, { status, notes, items_written: 2 });
    return c.body.run_key;
  };
  const ok = await run('covers', 'ok', 'fine');                // failed only → no push
  const bad = await run('linkedin', 'error', 'cover gate');    // failed → push, once (one manual start per job per minute)
  const cur = await run('curation', 'ok', '2 posts added');    // success → push
  await run('blog', 'error', 'build failed');                   // off → nothing
  const ob = await outbox();
  assert.equal(ob.find((o) => o.dedup_key === `run:${ok}`), undefined);
  const f = ob.find((o) => o.dedup_key === `run:${bad}`);
  assert.equal(f.kind, 'run_failed');
  assert.equal(f.severity, 'error');
  assert.equal(f.title, 'LinkedIn morning (Run now) failed');
  assert.equal(f.body, 'cover gate');
  assert.equal(ob.find((o) => o.dedup_key === `run:${cur}`).title, 'Covers (Run now) done'.replace('Covers', 'Curation'));
  assert.equal(ob.filter((o) => o.kind === 'issue').length, 0, 'job_failed of a scheduled run is not pushed again as an issue');
  // new posts off
  await call('POST', '/posts', { topic: 't', type: 'incident', country: 'BR', source_name: 'S', source_url: 'https://e.com/np', slug: 'np', briefing_md: '# b', post_text: 't' });
  assert.equal((await outbox()).filter((o) => o.kind === 'new_posts').length, 0);
  // other problems: off silences them, critical still pushes
  await call('PATCH', '/push/settings', { settings: { issues: 'off' } }, { internal: true });
  await call('POST', '/issues', { fingerprint: 'e1', kind: 'k', severity: 'error', stage: 'blog', summary: 'x' });
  await call('POST', '/issues', { fingerprint: 'c1', kind: 'k', severity: 'critical', stage: 'blog', summary: 'y' });
  assert.deepEqual((await outbox()).filter((o) => o.kind === 'issue').map((o) => o.severity), ['critical']);
});

test('push settings: a scheduler failure follows its job (missed slot with the job off: recorded, not pushed)', async () => {
  const { env, call, issues, outbox } = setup({ SCHEDULE_MODE: 'live' });
  await call('PATCH', '/push/settings', { settings: { 'run:curation': 'success' } }, { internal: true });
  await tick(env, at('2026-11-25T08:31:00'), fakeFetch({ status: 200 }));
  assert.ok((await issues()).find((i) => i.kind === 'slot_missed'), 'still an issue in Audit');
  assert.equal((await outbox()).filter((o) => o.kind === 'issue' && /Curation/.test(o.body)).length, 0, 'curation failures muted');
  assert.ok((await outbox()).find((o) => o.kind === 'issue' && /covers/i.test(o.body)), 'covers still on all');
});
