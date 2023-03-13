import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";
import {
  iRealEstate
} from "../../interfaces/realEstate.interfaces";

const createRealEstateService = async (
  realEstateData: iRealEstate
): Promise<RealEstate> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category = await categoryRepository.findOneBy({
    id: realEstateData.categoryId,
  });

  const address = await addressRepository.findOne({
    where: {
      street: realEstateData.address.street,
      zipCode: realEstateData.address.zipCode,
      number: realEstateData.address.number!,
      city: realEstateData.address.city,
      state: realEstateData.address.state,
    },
  });

  if (address) {
    throw new AppError("Address already exists", 409);
  }

  const newAddress = addressRepository.create(realEstateData.address);
  const addressData = await addressRepository.save(newAddress);

  const realEstate = realEstateRepository.create({
    ...realEstateData,
    address: addressData,
    category: category,
  });

  await realEstateRepository.save(realEstate);

  return realEstate;
};

export default createRealEstateService;
