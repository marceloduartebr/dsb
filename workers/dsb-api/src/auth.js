async function equal(a, b) {
  const enc = new TextEncoder();
  const [x, y] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(a)),
    crypto.subtle.digest('SHA-256', enc.encode(b))
  ]);
  const ux = new Uint8Array(x);
  const uy = new Uint8Array(y);
  let d = 0;
  for (let i = 0; i < ux.length; i++) d |= ux[i] ^ uy[i];
  return d === 0;
}

const usable = (s) => typeof s === 'string' && s.length >= 24;

/**
 * Who is calling:
 * - App service bindings: header x-internal-token = INTERNAL_TOKEN; actor = x-actor (Access e-mail or app name).
 * - Agents: Bearer TOKEN_GROK → grok; Bearer TOKEN_CLAUDE → claude.
 * - Bearer TOKEN_CLAUDE_X → claude with scope 'x': only the X runs' routes (src/scope.js). It is the one stored on the
 *   MINIPC, whose runs get no network secrets, so a leak there reaches X work only.
 * No secret configured: 503 (never open). Tokens in query strings or cookies are not accepted.
 */
export async function authenticate(request, env) {
  const internal = env && env.INTERNAL_TOKEN;
  const grok = env && env.TOKEN_GROK;
  const claude = env && env.TOKEN_CLAUDE;
  const claudeX = env && env.TOKEN_CLAUDE_X;
  if (!usable(internal) && !usable(grok) && !usable(claude) && !usable(claudeX)) {
    return { ok: false, status: 503, error: 'not_configured' };
  }

  const hInternal = request.headers.get('x-internal-token');
  if (hInternal && usable(internal) && (await equal(hInternal, internal))) {
    const actor = (request.headers.get('x-actor') || 'app').slice(0, 120);
    return { ok: true, actor, agent: 'user', via: 'internal' };
  }

  const m = /^Bearer\s+(\S+)$/.exec(request.headers.get('Authorization') || '');
  if (m) {
    if (usable(grok) && (await equal(m[1], grok))) return { ok: true, actor: 'grok', agent: 'grok', via: 'token' };
    if (usable(claude) && (await equal(m[1], claude))) return { ok: true, actor: 'claude', agent: 'claude', via: 'token' };
    if (usable(claudeX) && (await equal(m[1], claudeX))) return { ok: true, actor: 'claude', agent: 'claude', via: 'token', scope: 'x' };
  }
  return { ok: false, status: 401, error: 'unauthorized' };
}
