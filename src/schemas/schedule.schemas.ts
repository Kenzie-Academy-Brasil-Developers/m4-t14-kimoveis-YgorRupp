import { z } from "zod";

const scheduleSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number().int().positive(),
});

const createScheduleSchema = scheduleSchema.extend({
  id: z.number(),
  userId: z.number(),
});

export { scheduleSchema, createScheduleSchema };
