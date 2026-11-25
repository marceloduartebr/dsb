import { ApiError, json, readBody } from './http.js';
import { authenticate } from './auth.js';
import { getPost, listPosts, checkDedup, createPost, addKeys, editPost, changeStatus, reorder, channelQueue } from './posts.js';
import { claim, complete } from './publications.js';
import { list, summary, update, record, recordRejection, markNotified, sweep } from './issues.js';
import { createRequest, listRequests, claimRequest, finishRequest } from './intake.js';
import { metrics } from './metrics.js';
import { startJob, finishJob } from './jobs.js';
import { listCompetitors } from './competitors.js';
import { getPlan, savePlan, planRound, planUpcoming, staleList, readPlan, publishNow } from './plan.js';
import { listSchedule, saveSlot, runNow, claimRun, tick, linkJob, closeFireOfJob } from './schedule.js';
import { flush, goingStalePush } from './push.js';

/**
 * Routes (all require authentication except /health; see auth.js):
 *  GET   /health
 *  GET   /dedup?url=…&cve=CVE-…&related=…&story_key=…  read-only dedup check (match exact | story_recent; warnings)
 *  GET   /competitors[?text=…]             BigID competitor list and editorial rule
 *  GET   /posts?status=&type=&since=&limit=
 *  POST  /posts                            creates a new post (dedup by key; follow_up_of, related_urls, story_key)
 *  GET   /posts/:id
 *  PATCH /posts/:id                        edits allowed fields
 *  POST  /posts/:id/status                 {to, notes, reason, star}; to=removed only via the internal token
 *  POST  /posts/:id/keys                   {cves, url, urls, story_key} → {id, keys} (append-only)
 *  POST  /posts/reorder                    {status, ids}
 *  GET   /queue/:channel                   blog | linkedin | x | translations | removals (pending takedowns)
 *  POST  /publications                     claim {post_id, channel, lang}
 *  POST  /publications/:id/result          {status: published|failed|skipped, url, error, external_id, body, published_at}
 *                                          on a removal_pending row: {status: removed|removal_failed, error}
 *  GET   /metrics?weeks=8                 read-only weekly throughput for the admin Metrics tab
 *  GET   /plan                             publishing plan (caps per type and round, burst, stale days) + change log
 *  PATCH /plan                             {plan, note} DSB Admin only (internal token)
 *  GET   /plan/round?round=blog_morning    the posts this round publishes, in order, plus held and stale ones
 *  GET   /plan/upcoming                    the next run of every round, in time order, each without the posts earlier ones take
 *  GET   /plan/stale                       approved posts past the plan's business-day limit
 *  POST  /plan/publish-now                 {post_id} DSB Admin only: marks the post high priority
 *  POST  /intake/requests                  {url, note} ad hoc link for the next intake run (X-23)
 *  GET   /intake/requests?status=open,claimed
 *  POST  /intake/requests/:id/claim        → claimed (a claim older than 2 h is taken over)
 *  POST  /intake/requests/:id/result       {status: done, post_id} | {status: refused, reason}
 *  GET   /issues?status=&severity=&stage=&source=&kind=&post_id=&limit=
 *  GET   /issues/summary
 *  POST  /issues                           agent report {fingerprint, kind, severity, stage, summary, …}
 *  PATCH /issues/:id                       {status, resolution}
 *  POST  /issues/notified                  {ids}
 *  POST  /sweep                            runs the health checks
 *  POST  /jobs                             {job} → id
 *  PATCH /jobs/:id                         {status: ok|error|skipped, notes, items_read, items_written} (+ sweep)
 *  GET   /schedule                         slots, last fires, change log, mode (log | live)
 *  PATCH /schedule/:slot                   {time, days, mode} DSB Admin only
 *  POST  /schedule/run                     {slot} DSB Admin only: Run now
 *  POST  /schedule/claim                   {job, run_key?} the run's first call → {slot, round, run_key}; 409 = stop
 *  POST  /schedule/tick                    one timer pass (STG has no cron; DSB Admin and Claude only)
 *  POST  /jobs also takes run_key: the job run is linked to its fire and closes it.
 *
 * Every rejected write becomes an issue (source = api) and the response carries its id in "issue".
 */
export async function handle(request, env, ctx) {
  const url = new URL(request.url);
  const method = request.method;
  const parts = url.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  const route = `${method} /${parts.map((p) => (/^\d+$/.test(p) ? ':id' : p)).join('/')}`;

  if (route === 'GET /health') return json({ ok: true, service: 'dsb-api' });

  const session = await authenticate(request, env);
  if (!session.ok) return json({ ok: false, error: session.error }, session.status);

  const db = env.DB;
  if (!db) return json({ ok: false, error: 'no_database' }, 503);

  let body = null;
  const postId = parts[0] === 'posts' && /^\d+$/.test(parts[1] || '') ? Number(parts[1]) : null;
  try {
    if (method === 'POST' || method === 'PATCH') body = await readBody(request);
    const id = parts[1] && /^\d+$/.test(parts[1]) ? Number(parts[1]) : null;
    const result = await dispatch({ route, db, url, body, id, session, env, parts });
    // Pushes queued by this write (new issue, new post, link answer) go out now when due.
    if (method !== 'GET' && ctx && typeof ctx.waitUntil === 'function') ctx.waitUntil(flush(env).catch(() => null));
    return json({ ok: true, ...result.body }, result.status || 200);
  } catch (e) {
    if (e instanceof ApiError) {
      let issue = null;
      if (method !== 'GET' && e.status !== 404) {
        const pid = postId ?? (await postOfRequest(db, parts, body));
        issue = await recordRejection(db, { error: e, route, session, body, postId: pid });
      }
      return json({ ok: false, error: e.code, message: e.message, ...e.extra, issue }, e.status);
    }
    const msg = String((e && e.message) || e).slice(0, 300);
    const issue = await recordRejection(db, { error: new ApiError(500, 'internal_error', msg), route, session, body, postId: postId ?? (await postOfRequest(db, parts, body)) });
    console.log(JSON.stringify({ event: 'internal_error', route, msg }));
    return json({ ok: false, error: 'internal_error', message: msg, issue }, 500);
  }
}

/** The post a rejected write was about, so its issue groups per post (X-11): /posts/:id from the URL, a claim's
 *  body.post_id, or the post of /publications/:id. Never throws. */
async function postOfRequest(db, parts, body) {
  try {
    const n = body && Number(body.post_id);
    if (Number.isInteger(n) && n > 0) return n;
    if (parts[0] === 'publications' && /^\d+$/.test(parts[1] || '')) {
      const r = await db.prepare('SELECT post_id FROM publications WHERE id = ?1').bind(Number(parts[1])).first();
      return r ? r.post_id : null;
    }
  } catch {
    /* fall through */
  }
  return null;
}

async function dispatch({ route, db, url, body, id, session, env, parts }) {
  const q = url.searchParams;
  if (route.startsWith('PATCH /schedule/') && parts.length === 2) return { body: await saveSlot(db, parts[1], body || {}, session) };
  switch (route) {
    case 'GET /dedup':
      return { body: await checkDedup(db, { sourceUrl: q.get('url'), cves: q.getAll('cve'), related: q.getAll('related'), storyKey: q.get('story_key') }) };
    case 'GET /competitors':
      return { body: await listCompetitors(db, q) };
    case 'GET /posts':
      return { body: { items: await listPosts(db, q) } };
    case 'POST /posts':
      return { body: { post: await createPost(db, body, session) }, status: 201 };
    case 'POST /posts/reorder':
      return { body: await reorder(db, body, session) };
    case 'GET /posts/:id':
      return { body: { post: await getPost(db, id) } };
    case 'PATCH /posts/:id':
      return { body: { post: await editPost(db, id, body, session) } };
    case 'POST /posts/:id/status':
      return { body: { post: await changeStatus(db, id, body, session) } };
    case 'POST /posts/:id/keys':
      return { body: { post: await addKeys(db, id, body) } };
    case 'GET /queue/blog':
    case 'GET /queue/linkedin':
    case 'GET /queue/x':
    case 'GET /queue/translations':
    case 'GET /queue/removals':
      return { body: { items: await channelQueue(db, route.split('/').pop(), q.get('limit')) } };
    case 'POST /publications':
      return { body: { publication: await claim(db, body, session) }, status: 201 };
    case 'POST /publications/:id/result':
      return { body: await complete(db, id, body, session) };
    case 'GET /plan':
      return { body: await getPlan(db) };
    case 'PATCH /plan':
      return { body: await savePlan(db, body, session) };
    case 'GET /plan/round': {
      const at = q.get('at') ? Date.parse(q.get('at')) : Date.now();
      return { body: await planRound(db, q.get('round'), Number.isFinite(at) ? at : Date.now()) };
    }
    case 'GET /plan/upcoming': {
      const at = q.get('at') ? Date.parse(q.get('at')) : Date.now();
      return { body: await planUpcoming(db, Number.isFinite(at) ? at : Date.now()) };
    }
    case 'GET /plan/stale':
      return { body: { items: await staleList(db, (await readPlan(db)).plan) } };
    case 'POST /plan/publish-now':
      return { body: await publishNow(db, body, session) };
    case 'GET /metrics':
      return { body: await metrics(db, q) };
    case 'POST /intake/requests':
      return { body: { request: await createRequest(db, body, session) }, status: 201 };
    case 'GET /intake/requests':
      return { body: { items: await listRequests(db, q) } };
    case 'POST /intake/requests/:id/claim':
      return { body: { request: await claimRequest(db, Number(url.pathname.split('/')[3]), session) } };
    case 'POST /intake/requests/:id/result':
      return { body: { request: await finishRequest(db, Number(url.pathname.split('/')[3]), body, session) } };
    case 'GET /issues':
      return { body: { items: await list(db, q) } };
    case 'GET /issues/summary':
      return { body: { summary: await summary(db) } };
    case 'POST /issues':
      return {
        body: {
          issue: await record(db, {
            ...body,
            source: 'agent',
            check_name: null,
            agent: session.actor,
            fingerprint: body && body.fingerprint ? `agent:${body.fingerprint}` : null
          })
        },
        status: 201
      };
    case 'PATCH /issues/:id':
      return { body: { issue: await update(db, id, body, session) } };
    case 'POST /issues/notified':
      return { body: { marked: await markNotified(db, body.ids) } };
    case 'POST /sweep':
      return { body: { sweep: await sweep(db) } };
    case 'POST /jobs': {
      const job = await startJob(db, body, session);
      await linkJob(db, body && body.run_key, job.id);
      return { body: { job }, status: 201 };
    }
    case 'GET /schedule':
      return { body: await listSchedule(db, env) };
    case 'POST /schedule/run':
      return { body: await runNow(env, db, body, session) };
    case 'POST /schedule/claim':
      return { body: await claimRun(db, body, session) };
    case 'POST /schedule/tick': {
      if (session.via !== 'internal' && session.agent !== 'claude') throw new ApiError(403, 'forbidden', 'Only DSB Admin or Claude runs the timer by hand');
      return { body: await timerPass(env) };
    }
    case 'PATCH /jobs/:id': {
      const job = await finishJob(db, id, body);
      await closeFireOfJob(db, job);
      const s = await sweep(db).catch((e) => ({ error: String(e.message || e).slice(0, 200) }));
      return { body: { job, sweep: s } };
    }
    default:
      throw new ApiError(404, 'not_found', `Unknown route: ${route}`);
  }
}

/** One timer pass: start due slots, the daily going-stale push, then send due pushes. Never throws. */
export async function timerPass(env, now = Date.now(), fetchFn = fetch) {
  const out = {};
  for (const [k, f] of [
    ['schedule', () => tick(env, now, fetchFn)],
    ['going_stale', () => goingStalePush(env.DB, now, { readPlan, staleList })],
    ['push', () => flush(env, now)]
  ]) {
    try {
      out[k] = await f();
    } catch (e) {
      out[k] = { error: String((e && e.message) || e).slice(0, 300) };
    }
  }
  console.log(JSON.stringify({ event: 'timer', ...out }));
  return out;
}

export default {
  fetch(request, env, ctx) {
    return handle(request, env, ctx);
  },
  scheduled(controller, env, ctx) {
    ctx.waitUntil(timerPass(env, controller.scheduledTime || Date.now()));
  }
};
