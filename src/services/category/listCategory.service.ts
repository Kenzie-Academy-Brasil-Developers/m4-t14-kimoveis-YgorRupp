import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { iCreateCategory } from "../../interfaces/category.interfaces";
import { returnMultipleCategorySchema } from "../../schemas/category.schemas";

const listCategoryService = async (): Promise<Array<iCreateCategory>> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categories: Array<Category> = await categoryRepository.find();

  const listCategories = returnMultipleCategorySchema.parse(categories);

  return listCategories;
};

export default listCategoryService;
