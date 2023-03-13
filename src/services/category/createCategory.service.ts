import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";
import {
  iCategory,
  iCreateCategory,
} from "../../interfaces/category.interfaces";
import { createCategorySchema } from "../../schemas/category.schemas";

const createCategoryService = async (
  categoryData: iCategory
): Promise<iCreateCategory> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory = await categoryRepository.findOneBy({
    name: categoryData.name,
  });

  if (findCategory) {
    throw new AppError("Category already exists", 409);
  }

  const category = categoryRepository.create(categoryData);

  await categoryRepository.save(category);

  const newCategory = createCategorySchema.parse(category);

  return newCategory;
};

export default createCategoryService;
