import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors";
import {
  iSchedule
} from "../../interfaces/schedule.interfaces";

const createScheduleService = async (
  scheduleData: iSchedule,
  idUser: number
): Promise<Schedule> => {
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const realEstateId = await realEstateRepository.findOneBy({
    id: scheduleData.realEstateId,
  });

  if (!realEstateId) {
    throw new AppError("RealEstate not found", 404);
  }

  const queryScheduleDateAndHour = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.realEstateId = :realEstateId", {
      realEstateId: scheduleData.realEstateId,
    })
    .andWhere("schedule.hour = :hour", { hour: scheduleData.hour })
    .andWhere("schedule.date = :date", { date: scheduleData.date })
    .getOne();

  if (queryScheduleDateAndHour) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const date = new Date(scheduleData.date);

  const day = date.getDay();

  if (day === 0 || day === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const queryScheduleDataAndHourUser = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.user = :user", { user: idUser })
    .andWhere("schedule.date = :date", { date: scheduleData.date })
    .andWhere("schedule.hour = :hour", { hour: scheduleData.hour })
    .getOne();

  if (queryScheduleDataAndHourUser) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const user: User | null = await userRepository.findOneBy({
    id: idUser,
  });

  if (!user) {
    throw new AppError("User not found", 400);
  }

  if (scheduleData.hour > "18:00" || scheduleData.hour < "08:00") {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const newSchedule = scheduleRepository.create({
    ...scheduleData,
    realEstate: realEstateId,
    user: user,
  });

  await scheduleRepository.save(newSchedule);

  return newSchedule;
};

export default createScheduleService;
