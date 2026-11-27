-- 0013: slots whose task starts itself on its own schedule (Marcelo, 2026-11-27). Tasks that need a computer
-- (the X tasks on the MINIPC) cannot have an API trigger, so at the slot time dsb-api only records the start
-- ('fired', no call) and the run claims it as usual; an unclaimed start still raises slot_not_started.
ALTER TABLE schedule_slots ADD COLUMN starts TEXT NOT NULL DEFAULT 'api' CHECK (starts IN ('api', 'self'));
