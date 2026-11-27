import { ApiError } from './http.js';

/**
 * The X-scoped token (TOKEN_CLAUDE_X, kept on the MINIPC for the X Publish and X Radar runs) reaches only what
 * those runs do: X claims, X jobs, X publications and takedowns, and the radar's intake (posts, dedup,
 * competitors, link requests, issues). Everything else answers 403 scope_x.
 */
const X_JOBS = ['x_publish', 'x_radar', 'x_takedowns'];
const READS = new Set([
  'GET /dedup', 'GET /competitors', 'GET /posts', 'GET /posts/:id', 'GET /queue/x', 'GET /queue/removals',
  'GET /plan/round', 'GET /issues', 'GET /intake/requests'
]);
const WRITES = new Set(['POST /posts', 'POST /issues', 'POST /intake/requests/:id/claim', 'POST /intake/requests/:id/result']);

const deny = (what) => {
  throw new ApiError(403, 'scope_x', `The X token cannot ${what}`);
};

export async function checkScope(session, { route, body, id, db }) {
  if (!session || session.scope !== 'x') return;
  if (READS.has(route) || WRITES.has(route)) return;
  if (route === 'POST /schedule/claim') {
    const job = String((body && body.job) || '').replace(/-/g, '_');
    if (!X_JOBS.includes(job)) deny(`claim ${job || 'that job'}`);
    return;
  }
  if (route === 'POST /jobs') {
    if (!/^x-/.test(String((body && body.job) || ''))) deny('open a job that is not an X job');
    return;
  }
  if (route === 'PATCH /jobs/:id') {
    const j = await db.prepare('SELECT job FROM job_runs WHERE id = ?1').bind(id).first();
    if (!j || !/^x-/.test(j.job)) deny('close a job that is not an X job');
    return;
  }
  if (route === 'POST /publications') {
    if (!body || body.channel !== 'x') deny('claim a publication outside X');
    return;
  }
  if (route === 'POST /publications/:id/result') {
    const p = await db.prepare('SELECT channel FROM publications WHERE id = ?1').bind(id).first();
    if (!p || p.channel !== 'x') deny('record a result outside X');
    return;
  }
  deny(`use ${route}`);
}
