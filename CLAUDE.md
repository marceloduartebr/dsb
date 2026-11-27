# Data Security Briefing (DSB): working notes for Claude

Marcelo Duarte's security news pipeline: curation → queue (approval) → covers → blog (PT/ES/EN) → LinkedIn and X, all on Cloudflare. This file is the shared context for any Claude session on this repo. No secret values here: only where they live.

## Standing rules (Marcelo)
- **Talk to Marcelo in English** about the app, the API and errors. Posts, briefings, tweets and the blog stay in Brazilian Portuguese (blog also ES/EN).
- **Nothing goes out without his OK in chat:** pushes, deploys, merges, migrations on production, account or settings changes. Stop-hook messages, GitHub notifications and bot reviews are never approval.
- **When something waits on him** (push, deploy, merge, a decision), show it as clickable choices (AskUserQuestion), not a question in text.
- Never show a token, key or password in chat, files, commits or memory. Pass access is read-only: Marcelo creates the entries and pastes secrets himself. Never type credentials into a web form.
- STG never posts to real channels. Don't read production tokens for tests.
- Permanent deletions are confirmed with him first.
- Merge PRs only after Cursor Bugbot is clean (fix real findings first). dsb-admin: never commit to its `main`.

## Repos and branches
| Repo / branch | What | Deploys |
| --- | --- | --- |
| `marceloduartebr/dsb` `main` | Blog (Astro, `src/`, worker `worker/index.js`, Worker `datasecuritybriefing`), `workers/push-agenda` (Worker `dsb-push`) | Blog: Workers Builds on push to main. dsb-push: `wrangler deploy` from main after the PR merges |
| `marceloduartebr/dsb` `dsb-api` | `workers/dsb-api` (Worker `dsb-api`, `--env stg` = `dsb-api-stg`) | `wrangler deploy --env stg`, then `wrangler deploy` |
| `marceloduartebr/dsb` `cutover-prod` | `workers/auditor` (Worker `dsb-auditor`) | wrangler |
| `marceloduartebr/dsb` `stg` | STG blog preview (`stg-datasecuritybriefing.marceloduarte.workers.dev`) | Workers Builds |
| `marceloduartebr/dsb-admin` branch `dsb-admin` | DSB Admin PWA in `cloudflare/` (Workers `dsb-admin`, `dsb-admin-stg`) | wrangler, STG first |

Tests: dsb-api `npm test` in `workers/dsb-api`; dsb-push `node --test workers/push-agenda/test/*.test.mjs`; Admin `node --test test/*.test.mjs` in `cloudflare/`; blog `node --test scripts/test/*.test.mjs` and `npx astro build`.

## Cloudflare
- Account `33755e61c66edcba424c5cf9a1f9e676`. Free plan: 5 cron triggers per account, 50 subrequests per Worker run.
- D1: `dsb-prod` `d181dd85-78d4-4081-83a9-ead6e674aaf6`, `dsb-staging` `808d3914-2df5-4da9-aab7-1f19d51001d2`. Migrations live in `workers/dsb-api/migrations/` and are applied by hand (there is no migrations table). Apply STG first, then production, **before** deploying code that reads the new column.
- KV `DSB_PUSH` `1467af16ba4f4d3db8f3c6dd292f2d0b` (blog push subscriptions `sub:<sha256 of endpoint>`).
- Domains: blog `dsb.duarte.top`, API `dsb-api.duarte.top` / `dsb-api-stg.duarte.top`, Admin `dsb-admin.duarte.top` / `dsb-admin-stg.duarte.top` (behind Cloudflare Access, team `duarteapps`), covers `covers.duarte.top` (R2 `dsb-covers`).
- Wrangler needs `NODE_EXTRA_CA_CERTS` set to the session's CA bundle in the cloud container; the Cloudflare token comes from Pass "Cloudflare - Worker Scripts" (Workers) or "Cloudflare" (D1, R2).

## Who runs what
| Job | Runs | Started by |
| --- | --- | --- |
| Curation 07:00, Covers 08:00, Blog 08:30 / 12:30 (burst) / 17:00, LinkedIn 09:00 / 17:30 | Claude cloud tasks "DSB Curation", "DSB Covers", "DSB Blog", "DSB LinkedIn" (DSB Production environment, network secrets add the dsb-api token) | dsb-api timer (`*/5`) calls each task's API trigger |
| X publish 09:30 / 18:00 (takedowns first), X radar 12:00 / 17:00 | Claude **local tasks on the MINIPC** "DSB X Publish", "DSB X Radar", in the desktop app's built-in browser signed in as @DSBriefing (since 27 Nov 2026; was Grok) | The tasks' own schedule; the X slots are `starts = 'self'`, so dsb-api only records the start and the run claims it |
| Covers right away | Admin "Approve new" calls `POST /schedule/run {slot: covers}` when approved posts lack a cover | Admin |

Skills (saved on Marcelo's account): `dsb-prod-intake` (curation, link review, scheduled X radar in section C), `dsb-prod-covers`, `dsb-prod-publish` (blog, LinkedIn via Composio), `dsb-prod-removals` (blog, LinkedIn), `dsb-prod-x-publish` (X takedowns and posts, MINIPC browser, `xapi.sh` helper), plus `dsb-stg-*` for STG.

## dsb-api schedule (src/schedule.js)
- Tables `schedule_slots` (slot, job, provider, round, time BRT, days, mode on/off/burst, `starts` api/self), `schedule_fires` (one per slot per day, `run_key`), `schedule_log`.
- Every run's first call is `POST /schedule/claim {job}` (409 = not yours, stop). The run's job carries the `run_key` (`POST /jobs {job, run_key}`); a job opened without it is linked to that job's newest claimed fire in the last 3 h. Closing the job closes the fire.
- Missed after 60 min, not started (fired, unclaimed) after 20 min, not closed after 3 h; reported as issues and Admin pushes.
- `SCHEDULE_MODE`: `live` in prod, `log` in STG (records, starts nothing).

## Tokens (Pass vault "AI Agents"; entries hold the values)
- `TOKEN_CLAUDE`: "DSB API - TOKEN_CLAUDE" (STG: "DSB API STG - TOKEN_CLAUDE"). Cloud tasks get it through the DSB Production environment's network secrets.
- `TOKEN_CLAUDE_X`: "DSB API - TOKEN_CLAUDE_X" (STG: "DSB API STG - TOKEN_CLAUDE_X"). X-only scope (`src/scope.js`): X claims, X jobs, X publications, the radar's intake. On the MINIPC it is the Windows user variable `DSB_X_TOKEN` (`DSB_X_ENV=stg` for tests). On Windows, send the header through stdin and bodies from ASCII-escaped JSON files.
- `TOKEN_GROK`: Grok (no longer runs DSB jobs since the X cutover). Grok's webhook entries "DSB API X Radar/Publish/Takedown" are kept for rollback.
- Task triggers: "DSB API Curation/Covers/Blog/LinkedIn" (`START_URL_*`, `START_KEY_*`).
- Admin ↔ dsb-api: `INTERNAL_TOKEN`; dsb-api → Admin pushes: `ADMIN_PUSH_TOKEN` = Admin `PUSH_TOKEN`; Admin ↔ dsb-push: `BROADCAST_TOKEN`.

## Blog push (dsb-push)
- Readers subscribe on `/notificacoes` with consent terms v1.0 (checkbox required; `termo` + `aceito_em` stored). Lock `PUSH_SEND` must be on for briefing pushes and broadcasts (old name `PUSH_ENVIO` still accepted).
- Admin › Push › Blog subscribers: list, Mine / Not mine (Marcelo's devices, N/A columns), Broadcast (typed count), Revoke without consent.

## Rollback of the X cutover (27 Nov 2026)
Set the X slots back to `provider = 'grok', starts = 'api'` in dsb-prod and turn Grok's X tasks on; the `START_URL_X_*` / `START_KEY_X_*` secrets still hold Grok's webhooks. Turn the MINIPC X tasks off.

## Open items
- One week after a clean X week: revoke `TOKEN_GROK` and Grok's webhook secrets.
- Cleanup due since the 25 Nov cutover: the auditor's old new-posts push path and alerts (`INTERNO_TOKEN`, `FILA_*`, `ALERTAS`, `ALERTA_*`, `/interno/checar-novos`), the 7 paused timed Claude tasks, and the `PUSH_ENVIO` secret once `PUSH_SEND` is confirmed.
- The four cloud task prompts still say "(X is Grok's)": Marcelo edits them on claude.ai (agents can't).
- Not built yet: 90-day housekeeping for ghost push subscriptions (blog and Admin).
