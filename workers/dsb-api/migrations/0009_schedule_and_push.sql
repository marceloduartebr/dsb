-- 0009: schedule run by dsb-api (X-30) and push on events (X-31).
--
-- schedule_slots  one line per slot; the dsb-api timer starts the slot's task (Claude scheduled task or Grok
--                 webhook) when it is due. Times are Brasília; days are digits 0 (Sun) to 6 (Sat).
-- schedule_fires  one line per start. A scheduled slot starts at most once per Brasília day (partial unique
--                 index); Run now adds manual lines. The run claims its line first (POST /schedule/claim).
-- schedule_log    who changed a slot, when.
-- push_outbox     pushes waiting to be sent through DSB Admin (grouping, quiet hours, retries).

CREATE TABLE schedule_slots (
  slot        TEXT PRIMARY KEY CHECK (slot GLOB '[a-z]*' AND length(slot) <= 40),
  job         TEXT NOT NULL CHECK (job IN ('curation','covers','blog','linkedin','x_radar','x_publish','x_takedowns')),
  provider    TEXT NOT NULL CHECK (provider IN ('claude','grok')),
  round       TEXT,                                   -- plan round for blog and LinkedIn slots
  time        TEXT NOT NULL CHECK (time GLOB '[0-2][0-9]:[0-5][0-9]'),
  days        TEXT NOT NULL DEFAULT '0123456' CHECK (days GLOB '[0-6]*' AND length(days) BETWEEN 1 AND 7),
  mode        TEXT NOT NULL DEFAULT 'on' CHECK (mode IN ('on','off','burst')),
  label       TEXT NOT NULL,
  updated_by  TEXT,
  updated_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE TABLE schedule_fires (
  id           INTEGER PRIMARY KEY,
  slot         TEXT NOT NULL,
  job          TEXT NOT NULL,
  provider     TEXT NOT NULL,
  round        TEXT,
  run_date     TEXT NOT NULL,                         -- Brasília day, YYYY-MM-DD
  run_key      TEXT NOT NULL UNIQUE,                  -- e.g. 2026-11-25-0830-blog_morning (sent to Grok)
  manual       INTEGER NOT NULL DEFAULT 0 CHECK (manual IN (0,1)),
  requested_by TEXT,
  status       TEXT NOT NULL CHECK (status IN ('logged','fired','failed','claimed','done','error','skipped','missed')),
  attempts     INTEGER NOT NULL DEFAULT 0,
  next_try_at  TEXT,
  http_status  INTEGER,
  session_url  TEXT,
  error        TEXT,
  created_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  fired_at     TEXT,
  claimed_at   TEXT,
  claimed_by   TEXT,
  finished_at  TEXT,
  job_run_id   INTEGER
);
CREATE UNIQUE INDEX ux_fires_slot_day ON schedule_fires(slot, run_date) WHERE manual = 0;
CREATE INDEX ix_fires_job ON schedule_fires(job, created_at);

CREATE TABLE schedule_log (
  id         INTEGER PRIMARY KEY,
  slot       TEXT NOT NULL,
  changed_by TEXT,
  changed_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  before     TEXT,
  after      TEXT
);

-- Today's times (the scheduled tasks as of 25 Nov 2026). Grok slots start off: they are switched on at cutover,
-- when Grok turns its own timed runs off.
INSERT INTO schedule_slots (slot, job, provider, round, time, mode, label) VALUES
  ('curation',           'curation',    'claude', NULL,                 '07:00', 'on',    'Curation'),
  ('covers',             'covers',      'claude', NULL,                 '08:00', 'on',    'Covers'),
  ('blog_morning',       'blog',        'claude', 'blog_morning',       '08:30', 'on',    'Blog morning'),
  ('linkedin_morning',   'linkedin',    'claude', 'linkedin_morning',   '09:00', 'on',    'LinkedIn morning'),
  ('blog_midday',        'blog',        'claude', 'blog_midday',        '12:30', 'burst', 'Blog midday'),
  ('blog_afternoon',     'blog',        'claude', 'blog_afternoon',     '17:00', 'on',    'Blog afternoon'),
  ('linkedin_afternoon', 'linkedin',    'claude', 'linkedin_afternoon', '17:30', 'on',    'LinkedIn afternoon'),
  ('x_radar',            'x_radar',     'grok',   NULL,                 '12:00', 'off',   'X Radar'),
  ('x_publish',          'x_publish',   'grok',   NULL,                 '18:00', 'off',   'X Publish');

CREATE TABLE push_outbox (
  id          INTEGER PRIMARY KEY,
  kind        TEXT NOT NULL,                          -- new_posts | job_error | issue | slot | link_answer | going_stale
  dedup_key   TEXT NOT NULL UNIQUE,                   -- one push per thing (issue fingerprint, post id, fire id…)
  severity    TEXT NOT NULL DEFAULT 'info' CHECK (severity IN ('info','error','critical')),
  title       TEXT NOT NULL,
  body        TEXT NOT NULL,
  url         TEXT NOT NULL,                          -- path in DSB Admin the push opens
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  send_after  TEXT NOT NULL,                          -- grouping delay / quiet hours
  sent_at     TEXT,
  attempts    INTEGER NOT NULL DEFAULT 0,
  error       TEXT
);
CREATE INDEX ix_push_pending ON push_outbox(sent_at, send_after);
