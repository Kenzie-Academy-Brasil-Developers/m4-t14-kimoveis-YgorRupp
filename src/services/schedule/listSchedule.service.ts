import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { AppError } from "../../errors";

const listScheduleService = async (realEstateId: number) => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstate = await realEstateRepository.findOne({
    where: {
      id: realEstateId,
    },
    relations: {
      address: true,
      category: true,
      schedules: {
        user: true,
      },
    },
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  return realEstate;
};

export default listScheduleService;
