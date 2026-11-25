-- 0010: X publishing follows the plan (Marcelo, 2026-11-25): two X Publish slots, X morning after the blog and
-- LinkedIn mornings and X afternoon at 18:00 (Grok's time today). Each run takes the plan's X total (3; times the
-- burst factor while burst is on). Slots stay off until the cutover, when Grok turns its own timed runs off.
UPDATE schedule_slots SET slot = 'x_afternoon', round = 'x_afternoon', label = 'X afternoon' WHERE slot = 'x_publish';
UPDATE schedule_fires SET slot = 'x_afternoon', round = 'x_afternoon' WHERE slot = 'x_publish';
INSERT INTO schedule_slots (slot, job, provider, round, time, mode, label)
VALUES ('x_morning', 'x_publish', 'grok', 'x_morning', '09:30', 'off', 'X morning');
