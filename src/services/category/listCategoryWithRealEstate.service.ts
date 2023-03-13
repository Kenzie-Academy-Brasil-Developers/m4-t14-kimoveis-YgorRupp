import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";

const listCategoriesWithRealEstateService = async (
  idCategory: number
): Promise<any> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category = await categoryRepository.findOneBy({
    id: idCategory,
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const categoryWithRealEstate = categoryRepository.findOne({
    where: {
      id: idCategory,
    },
    relations: {
      realEstate: true,
    },
  });

  return categoryWithRealEstate;
};

export default listCategoriesWithRealEstateService;
