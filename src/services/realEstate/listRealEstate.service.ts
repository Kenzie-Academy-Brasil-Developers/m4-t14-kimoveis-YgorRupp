import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";

const listRealEstateService = async (): Promise<any> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstate: RealEstate[] = await realEstateRepository.find({
    relations: {
      address: true,
    },
  });

  return realEstate;
};

export default listRealEstateService;
