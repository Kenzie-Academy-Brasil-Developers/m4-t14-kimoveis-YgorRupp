import { z } from "zod";
import {
  createScheduleSchema,
  scheduleSchema,
} from "../schemas/schedule.schemas";

type iSchedule = z.infer<typeof scheduleSchema>;
type iCreateSchedule = z.infer<typeof createScheduleSchema>;

export { iSchedule, iCreateSchedule };
