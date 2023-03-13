import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUserUpdate } from "../../interfaces/users.interfaces";
import { createUserSchema } from "../../schemas/users.schemas";

const updateUserService = async (
  userData: any,
  idUser: number
): Promise<iUserUpdate> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData = await userRepository.findOneBy({
    id: idUser,
  });

  const user = userRepository.create({
    ...oldUserData,
    ...userData,
  });

  await userRepository.save(user);

  const updatedUser = createUserSchema.parse(user);

  return updatedUser;
};

export default updateUserService;
