import { Router } from "express";
import {
  createScheduleController,
  listScheduleController,
} from "../controllers/schedule.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdminMiddleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import { scheduleSchema } from "../schemas/schedule.schemas";

const scheduleRoutes: Router = Router();

scheduleRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddleware(scheduleSchema),
  createScheduleController
);
scheduleRoutes.get(
  "/realEstate/:id",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  listScheduleController
);

export default scheduleRoutes;
