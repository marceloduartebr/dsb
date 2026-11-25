import { ApiError, nowIso } from './http.js';
import { readPlan, effective } from './plan.js';
import { record } from './issues.js';

/**
 * Schedule run by dsb-api (X-30). The timer (cron every 5 min in production; on demand in STG) starts each slot's
 * task when it is due: a Claude scheduled task through its API trigger, or a Grok webhook. The run's first call is
 * POST /schedule/claim, which hands it its slot (round) or stops it.
 *
 * Secrets per job (wrangler secrets, copied from Pass at deploy): START_URL_<JOB> and START_KEY_<JOB>
 * (JOB = CURATION, COVERS, BLOG, LINKEDIN, X_RADAR, X_PUBLISH, X_TAKEDOWNS). SCHEDULE_MODE = live | log (default
 * log: fires are recorded and can be claimed, nothing is started). DSB_ENV = prod | stg (sent to Grok).
 */

export const JOBS = ['curation', 'covers', 'blog', 'linkedin', 'x_radar', 'x_publish', 'x_takedowns'];
export const MODES = ['on', 'off', 'burst'];
const LATE_LIMIT_MIN = 60;       // a slot found later than this is missed, not started
const NOT_STARTED_MIN = 20;      // a started run that has not claimed by then is reported
const RUN_LIMIT_MIN = 180;       // a claimed run that has not closed its job by then is reported and released
const OPEN_FIRE_MIN = 30;        // an unclaimed fire younger than this still blocks the next slot of its job
const MAX_ATTEMPTS = 3;
const BRT = -3 * 3600 * 1000;

/** Brasília calendar facts of an instant. */
export function brt(ms) {
  const d = new Date(ms + BRT);
  return { date: d.toISOString().slice(0, 10), minutes: d.getUTCHours() * 60 + d.getUTCMinutes(), dow: d.getUTCDay(), hhmm: d.toISOString().slice(11, 16).replace(':', '') };
}
const toMin = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
const minutesSince = (iso, now) => (now - Date.parse(iso)) / 60000;

export const runKey = (date, time, slot, manualAt = null) =>
  manualAt ? `${date}-${manualAt}-${slot}-now` : `${date}-${time.replace(':', '')}-${slot}`;

export function scheduleMode(env) {
  return String((env && env.SCHEDULE_MODE) || '').toLowerCase() === 'live' ? 'live' : 'log';
}

// ---------------------------------------------------------------- reading and editing slots

export async function listSchedule(db, env, now = Date.now()) {
  const slots = (await db.prepare('SELECT * FROM schedule_slots ORDER BY time, slot').all()).results || [];
  const fires = (await db.prepare('SELECT * FROM schedule_fires ORDER BY id DESC LIMIT 60').all()).results || [];
  const last = {};
  for (const f of fires) if (!last[f.slot]) last[f.slot] = f;
  const log = (await db.prepare('SELECT * FROM schedule_log ORDER BY id DESC LIMIT 20').all()).results || [];
  const { plan } = await readPlan(db);
  const burst = effective(plan, now).burst_active;
  return {
    mode: scheduleMode(env),
    burst_active: burst,
    slots: slots.map((s) => ({ ...s, days: s.days, last_fire: last[s.slot] || null, next_at: nextAt(s, now, burst) })),
    fires,
    log
  };
}

/** Next start of a slot after now (ISO), or null when it is off. Burst-only slots count only while burst is on. */
export function nextAt(s, now, burstActive) {
  if (s.mode === 'off' || (s.mode === 'burst' && !burstActive)) return null;
  const today = brt(now);
  for (let i = 0; i < 8; i++) {
    const day = brt(now + i * 86400000);
    if (!s.days.includes(String(day.dow))) continue;
    if (i === 0 && toMin(s.time) <= today.minutes) continue;
    return new Date(Date.parse(`${day.date}T${s.time}:00.000Z`) - BRT).toISOString();
  }
  return null;
}

/** PATCH /schedule/:slot {time, days, mode} — DSB Admin only. Blog midday's mode also sets the plan's midday runs. */
export async function saveSlot(db, slot, body, session) {
  if (session.via !== 'internal') throw new ApiError(403, 'schedule_admin_only', 'Only DSB Admin changes the schedule');
  const cur = await db.prepare('SELECT * FROM schedule_slots WHERE slot = ?1').bind(slot).first();
  if (!cur) throw new ApiError(404, 'not_found', `Unknown slot: ${slot}`);
  const next = { time: cur.time, days: cur.days, mode: cur.mode };
  if (body.time != null) {
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(body.time))) throw new ApiError(422, 'invalid_value', 'time must be HH:MM (00:00–23:59)');
    next.time = String(body.time);
  }
  if (body.days != null) {
    const d = [...new Set(String(body.days).replace(/[^0-6]/g, ''))].sort().join('');
    if (!d) throw new ApiError(422, 'invalid_value', 'days needs at least one day (0 = Sunday … 6 = Saturday)');
    next.days = d;
  }
  if (body.mode != null) {
    if (!MODES.includes(body.mode)) throw new ApiError(422, 'invalid_value', `mode must be one of ${MODES.join(', ')}`);
    next.mode = body.mode;
  }
  if (next.time === cur.time && next.days === cur.days && next.mode === cur.mode) return { slot: cur, changed: false };
  const row = await db
    .prepare('UPDATE schedule_slots SET time = ?2, days = ?3, mode = ?4, updated_by = ?5, updated_at = ?6 WHERE slot = ?1 RETURNING *')
    .bind(slot, next.time, next.days, next.mode, session.actor, nowIso())
    .first();
  await db
    .prepare('INSERT INTO schedule_log (slot, changed_by, before, after) VALUES (?1, ?2, ?3, ?4)')
    .bind(slot, session.actor, JSON.stringify({ time: cur.time, days: cur.days, mode: cur.mode }), JSON.stringify(next))
    .run();
  if (slot === 'blog_midday' && next.mode !== cur.mode) await syncMiddayRuns(db, next.mode, session);
  return { slot: row, changed: true };
}

async function syncMiddayRuns(db, mode, session) {
  const { plan } = await readPlan(db); // normalized: has the midday round even if the stored plan predates it
  plan.rounds.blog_midday.runs = mode === 'on' ? 'always' : mode;
  const text = JSON.stringify(plan);
  await db.prepare('UPDATE publish_plan SET plan = ?1, updated_by = ?2, updated_at = ?3 WHERE id = 1').bind(text, session.actor, nowIso()).run();
  await db.prepare('INSERT INTO publish_plan_log (plan, changed_by, note) VALUES (?1, ?2, ?3)').bind(text, session.actor, `Schedule: blog midday ${mode}`).run();
}

// ---------------------------------------------------------------- starting a task

const envKey = (job) => job.toUpperCase();

/** Calls the job's start endpoint. Never throws: returns {ok, status, session_url, error, retry_after}. */
export async function startTask(env, fire, fetchFn = fetch) {
  const url = env[`START_URL_${envKey(fire.job)}`];
  const key = env[`START_KEY_${envKey(fire.job)}`];
  if (!url || !key) return { ok: false, status: 0, error: `START_URL_${envKey(fire.job)} / START_KEY_${envKey(fire.job)} not set` };
  const headers = { Authorization: `Bearer ${key}`, 'content-type': 'application/json' };
  let body;
  if (fire.provider === 'claude') {
    headers['anthropic-version'] = '2026-10-21';
    body = {}; // the run asks dsb-api for its slot; no fire text
  } else {
    body = { run_key: fire.run_key, env: String(env.DSB_ENV || 'prod') === 'stg' ? 'stg' : 'prod' };
  }
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const r = await fetchFn(url, { method: 'POST', headers, body: JSON.stringify(body) });
      const text = await r.text().catch(() => '');
      let data = null;
      try { data = JSON.parse(text); } catch { /* not JSON */ }
      if (r.ok) return { ok: true, status: r.status, session_url: (data && (data.claude_code_session_url || data.url || data.run_url)) || null };
      const out = { ok: false, status: r.status, error: (data && data.error && (data.error.message || data.error.type)) || text.slice(0, 200) || `HTTP ${r.status}` };
      if (r.status === 429) out.retry_after = Number(r.headers.get('retry-after')) || 600;
      if (r.status >= 500 && attempt === 0) continue;
      return out;
    } catch (e) {
      if (attempt === 0) continue;
      return { ok: false, status: 0, error: String((e && e.message) || e).slice(0, 200) };
    }
  }
  return { ok: false, status: 0, error: 'unreachable' };
}

async function insertFire(db, s, now, { manual = false, by = null, status }) {
  const day = brt(now);
  const key = runKey(day.date, s.time, s.slot, manual ? day.hhmm : null);
  return db
    .prepare(
      `INSERT INTO schedule_fires (slot, job, provider, round, run_date, run_key, manual, requested_by, status)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9) ON CONFLICT DO NOTHING RETURNING *`
    )
    .bind(s.slot, s.job, s.provider, s.round, day.date, key, manual ? 1 : 0, by, status)
    .first();
}

/** Starts (or, in log mode, only records) one fire and stores the outcome. */
async function launch(env, db, fire, now, fetchFn) {
  if (scheduleMode(env) !== 'live') {
    return db.prepare(`UPDATE schedule_fires SET status = 'logged', fired_at = ?2 WHERE id = ?1 RETURNING *`).bind(fire.id, new Date(now).toISOString()).first();
  }
  const r = await startTask(env, fire, fetchFn);
  const attempts = (fire.attempts || 0) + 1;
  if (r.ok) {
    return db
      .prepare(`UPDATE schedule_fires SET status = 'fired', fired_at = ?2, attempts = ?3, http_status = ?4, session_url = ?5, error = NULL, next_try_at = NULL WHERE id = ?1 RETURNING *`)
      .bind(fire.id, new Date(now).toISOString(), attempts, r.status, r.session_url)
      .first();
  }
  const retry = attempts < MAX_ATTEMPTS && (r.status === 429 || r.status >= 500 || r.status === 0) && r.error.indexOf('not set') < 0;
  const nextTry = retry ? new Date(now + (r.retry_after || 300) * 1000).toISOString() : null;
  const row = await db
    .prepare(`UPDATE schedule_fires SET status = 'failed', attempts = ?2, http_status = ?3, error = ?4, next_try_at = ?5 WHERE id = ?1 RETURNING *`)
    .bind(fire.id, attempts, r.status, r.error, nextTry)
    .first();
  if (!retry) {
    await report(db, {
      fingerprint: `schedule:fire_failed:${fire.job}`,
      kind: 'fire_failed',
      severity: 'error',
      summary: `${labelOf(fire)} did not start: ${r.status ? `HTTP ${r.status} ` : ''}${r.error}`.slice(0, 300),
      detail: { run_key: fire.run_key, status: r.status, error: r.error },
      suggested_action: r.status === 401 ? 'The start token was refused: generate a new one, update Pass and ask Claude to resync the dsb-api secret.' : r.status === 400 ? 'The task may be paused in claude.ai: resume it, then use Run now in DSB Admin.' : 'Use Run now in DSB Admin once the cause is fixed.'
    });
  }
  return row;
}

const labelOf = (f) => `${f.slot.replace(/_/g, ' ')} (${f.run_key})`;

async function report(db, p) {
  try {
    await record(db, { source: 'api', stage: 'job', agent: 'scheduler', check_name: null, ...p });
  } catch (e) {
    console.log(JSON.stringify({ event: 'schedule_report_failed', msg: String(e.message || e).slice(0, 200) }));
  }
}

// ---------------------------------------------------------------- the timer

/** Open (blocking) fire of a job: claimed and not closed within RUN_LIMIT_MIN, or started and not yet claimed. */
async function openFire(db, jobs, now) {
  const rows = (await db
    .prepare(`SELECT * FROM schedule_fires WHERE job IN (${jobs.map((_, i) => `?${i + 1}`).join(',')}) AND status IN ('logged','fired','claimed') ORDER BY id DESC LIMIT 10`)
    .bind(...jobs)
    .all()).results || [];
  return rows.find((f) => (f.status === 'claimed' ? minutesSince(f.claimed_at, now) < RUN_LIMIT_MIN : minutesSince(f.fired_at || f.created_at, now) < OPEN_FIRE_MIN)) || null;
}

/**
 * One timer pass. Returns what it did (for logs and tests). fetchFn is injected in tests.
 * Order: housekeeping (not started, overdue runs, retries), then due slots in time order.
 */
export async function tick(env, now = Date.now(), fetchFn = fetch) {
  const db = env.DB;
  const day = brt(now);
  const done = [];
  const { plan } = await readPlan(db);
  const burst = effective(plan, now).burst_active;

  // 1. Started but never claimed.
  const unclaimed = (await db.prepare(`SELECT * FROM schedule_fires WHERE status = 'fired' AND claimed_at IS NULL`).all()).results || [];
  for (const f of unclaimed) {
    if (minutesSince(f.fired_at, now) < NOT_STARTED_MIN) continue;
    await db.prepare(`UPDATE schedule_fires SET status = 'error', error = 'started, but the run never claimed its slot', finished_at = ?2 WHERE id = ?1`).bind(f.id, new Date(now).toISOString()).run();
    await report(db, { fingerprint: `schedule:not_started:${f.run_key}`, kind: 'slot_not_started', severity: 'error', summary: `${labelOf(f)} was started but the run never claimed its slot`, detail: { session_url: f.session_url }, suggested_action: 'Open the session link in DSB Admin (Flow, Schedule) to see why, then use Run now.' });
    done.push({ slot: f.slot, action: 'not_started' });
  }
  // 2. Claimed and never closed.
  const overdue = (await db.prepare(`SELECT * FROM schedule_fires WHERE status = 'claimed'`).all()).results || [];
  for (const f of overdue) {
    if (minutesSince(f.claimed_at, now) < RUN_LIMIT_MIN) continue;
    await db.prepare(`UPDATE schedule_fires SET status = 'error', error = 'the run did not close its job', finished_at = ?2 WHERE id = ?1`).bind(f.id, new Date(now).toISOString()).run();
    await report(db, { fingerprint: `schedule:not_closed:${f.run_key}`, kind: 'run_not_closed', severity: 'warning', summary: `${labelOf(f)} claimed its slot but did not close its job within 3 h`, detail: { session_url: f.session_url }, suggested_action: 'Check the run session; the next slot of this job is no longer blocked.' });
    done.push({ slot: f.slot, action: 'not_closed' });
  }
  // 3. Retries.
  const retries = (await db.prepare(`SELECT * FROM schedule_fires WHERE status = 'failed' AND next_try_at IS NOT NULL AND next_try_at <= ?1`).bind(new Date(now).toISOString()).all()).results || [];
  for (const f of retries) {
    const r = await launch(env, db, f, now, fetchFn);
    done.push({ slot: f.slot, action: `retry:${r.status}` });
  }
  // 4. Due slots.
  const slots = (await db.prepare(`SELECT * FROM schedule_slots WHERE mode <> 'off' ORDER BY time, slot`).all()).results || [];
  for (const s of slots) {
    if (s.mode === 'burst' && !burst) continue;
    if (!s.days.includes(String(day.dow))) continue;
    const late = day.minutes - toMin(s.time);
    if (late < 0) continue;
    const exists = await db.prepare(`SELECT id FROM schedule_fires WHERE slot = ?1 AND run_date = ?2 AND manual = 0`).bind(s.slot, day.date).first();
    if (exists) continue;
    if (late > LATE_LIMIT_MIN) {
      const f = await insertFire(db, s, now, { status: 'missed' });
      if (f) {
        await report(db, { fingerprint: `schedule:missed:${f.run_key}`, kind: 'slot_missed', severity: 'error', summary: `${s.label} ${s.time} did not start (found ${late} min late)`, suggested_action: 'Use Run now in DSB Admin (Flow, Schedule) if the round is still needed.' });
        done.push({ slot: s.slot, action: 'missed' });
      }
      continue;
    }
    // Order: one run per job at a time; X Publish waits for any blog run.
    const blockers = s.job === 'x_publish' ? ['x_publish', 'x_takedowns', 'blog'] : s.job === 'x_takedowns' ? ['x_publish', 'x_takedowns'] : [s.job];
    if (await openFire(db, blockers, now)) {
      done.push({ slot: s.slot, action: 'waiting' });
      continue;
    }
    const f = await insertFire(db, s, now, { status: 'logged' });
    if (!f) continue;
    const r = await launch(env, db, f, now, fetchFn);
    done.push({ slot: s.slot, action: r.status, run_key: r.run_key });
  }
  return { at: new Date(now).toISOString(), mode: scheduleMode(env), done };
}

// ---------------------------------------------------------------- Run now and claim

/** POST /schedule/run {slot} — DSB Admin only. Starts the slot's task now (manual fire), whatever its mode. */
export async function runNow(env, db, body, session, now = Date.now(), fetchFn = fetch) {
  if (session.via !== 'internal') throw new ApiError(403, 'schedule_admin_only', 'Only DSB Admin uses Run now');
  const s = await db.prepare('SELECT * FROM schedule_slots WHERE slot = ?1').bind(String((body && body.slot) || '')).first();
  if (!s) throw new ApiError(404, 'not_found', 'Unknown slot');
  const blockers = s.job === 'x_publish' ? ['x_publish', 'x_takedowns'] : [s.job];
  const open = await openFire(db, blockers, now);
  if (open) throw new ApiError(409, 'job_running', `${open.slot} is still running (${open.run_key})`, { run_key: open.run_key });
  const f = await insertFire(db, s, now, { manual: true, by: session.actor, status: 'logged' });
  if (!f) throw new ApiError(409, 'already_started', 'This slot was started this minute already');
  return { fire: await launch(env, db, f, now, fetchFn) };
}

/**
 * POST /schedule/claim {job, run_key?} — the run's first call (Claude tasks and Grok webhooks).
 * - run_key given (Grok): that fire, if it exists, is of this job and is not claimed yet.
 * - no run_key (Claude): the oldest unclaimed fire of the job started in the last 2 h; with none (Run now in
 *   claude.ai), a manual fire of the job's latest slot of the day.
 * Refused (409): unknown or repeated run_key, or the job already has a claimed run. With no claim, the run stops.
 */
export async function claimRun(db, body, session, now = Date.now()) {
  const job = String((body && body.job) || '').replace(/-/g, '_');
  if (!JOBS.includes(job)) throw new ApiError(422, 'invalid_value', `job must be one of ${JOBS.join(', ')}`);
  const key = body && body.run_key ? String(body.run_key) : null;
  const running = await db.prepare(`SELECT * FROM schedule_fires WHERE job = ?1 AND status = 'claimed' ORDER BY id DESC LIMIT 1`).bind(job).first();
  if (running && minutesSince(running.claimed_at, now) < RUN_LIMIT_MIN && running.run_key !== key) {
    throw new ApiError(409, 'job_running', `${job} already has a run in progress (${running.run_key})`, { run_key: running.run_key });
  }
  let fire;
  if (key) {
    fire = await db.prepare('SELECT * FROM schedule_fires WHERE run_key = ?1').bind(key).first();
    if (!fire || fire.job !== job) throw new ApiError(409, 'no_slot', 'No scheduled start matches this run_key: stop the run');
    if (!['logged', 'fired', 'failed'].includes(fire.status)) throw new ApiError(409, 'no_slot', `This run_key is already ${fire.status}: stop the run`);
  } else {
    const since = new Date(now - 120 * 60000).toISOString();
    fire = await db
      .prepare(`SELECT * FROM schedule_fires WHERE job = ?1 AND status IN ('logged','fired') AND created_at >= ?2 ORDER BY id LIMIT 1`)
      .bind(job, since)
      .first();
    if (!fire) {
      const slots = (await db.prepare('SELECT * FROM schedule_slots WHERE job = ?1 ORDER BY time').bind(job).all()).results || [];
      if (!slots.length) throw new ApiError(409, 'no_slot', `No slot for ${job}`);
      const nowMin = brt(now).minutes;
      const s = [...slots].reverse().find((x) => toMin(x.time) <= nowMin) || slots[0];
      fire = await insertFire(db, s, now, { manual: true, by: session.actor, status: 'logged' });
      if (!fire) throw new ApiError(409, 'already_started', 'A run of this slot started this minute already');
    }
  }
  const row = await db
    .prepare(`UPDATE schedule_fires SET status = 'claimed', claimed_at = ?2, claimed_by = ?3 WHERE id = ?1 AND status IN ('logged','fired','failed') RETURNING *`)
    .bind(fire.id, new Date(now).toISOString(), session.actor)
    .first();
  if (!row) throw new ApiError(409, 'no_slot', 'This start was claimed by another run: stop the run');
  return { slot: row.slot, job: row.job, round: row.round, run_key: row.run_key, manual: !!row.manual };
}

/** POST /jobs {job, run_key}: links the job run to its fire. */
export async function linkJob(db, runKeyValue, jobRunId) {
  if (!runKeyValue) return;
  await db.prepare(`UPDATE schedule_fires SET job_run_id = ?2 WHERE run_key = ?1 AND status = 'claimed'`).bind(String(runKeyValue), jobRunId).run();
}

/** PATCH /jobs/:id: closes the fire linked to the job (done | error | skipped). */
export async function closeFireOfJob(db, job) {
  if (!job) return;
  const status = job.status === 'ok' ? 'done' : job.status;
  await db
    .prepare(`UPDATE schedule_fires SET status = ?2, finished_at = ?3, error = CASE WHEN ?2 = 'error' THEN ?4 ELSE error END WHERE job_run_id = ?1 AND status = 'claimed'`)
    .bind(job.id, status, job.finished_at || nowIso(), job.notes || null)
    .run();
}
