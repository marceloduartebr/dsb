-- 0012: a second X Radar slot at 17:00 (Marcelo, 2026-11-25: the radar ran at noon and at 17:00 before the
-- cutover). Same job and Grok webhook as the noon slot; days and mode copied from it. Labels by part of day.
UPDATE schedule_slots SET label = 'X Radar noon' WHERE slot = 'x_radar';
INSERT INTO schedule_slots (slot, job, provider, round, time, days, mode, label)
SELECT 'x_radar_afternoon', job, provider, round, '17:00', days, mode, 'X Radar afternoon' FROM schedule_slots WHERE slot = 'x_radar';
