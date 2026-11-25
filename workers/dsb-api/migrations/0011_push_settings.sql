-- 0011: push settings, edited in DSB Admin (Audit tab). Runs: per job, all | success | failed | off.
-- Other events: on | off. Replaces the PUSH_RUN_OK_UNTIL switch (Marcelo, 2026-11-25).
CREATE TABLE push_settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_by TEXT,
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  CHECK ((key LIKE 'run:%' AND value IN ('all','success','failed','off')) OR (key NOT LIKE 'run:%' AND value IN ('on','off')))
);
INSERT INTO push_settings (key, value) VALUES
  ('run:curation', 'all'), ('run:covers', 'all'), ('run:blog', 'all'), ('run:linkedin', 'all'),
  ('run:x_radar', 'all'), ('run:x_publish', 'all'), ('run:x_takedowns', 'all'),
  ('new_posts', 'on'), ('link_answer', 'on'), ('going_stale', 'on'), ('issues', 'on');
