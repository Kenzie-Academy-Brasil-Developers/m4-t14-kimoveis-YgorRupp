import { Request, Response } from "express";
import { iSchedule } from "../interfaces/schedule.interfaces";
import createScheduleService from "../services/schedule/createSchedule.service";
import listScheduleService from "../services/schedule/listSchedule.service";

const createScheduleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const scheduleData: iSchedule = req.body;
  const idUser: number = req.user.id;

  await createScheduleService(scheduleData, idUser);

  return res.status(201).json({
    message: "Schedule created",
  });
};

const listScheduleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateId: number = parseInt(req.params.id);

  const schedule = await listScheduleService(realEstateId);

  return res.status(200).json(schedule);
};

export { createScheduleController, listScheduleController };
