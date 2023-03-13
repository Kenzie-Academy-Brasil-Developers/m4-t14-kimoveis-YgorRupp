import { Request, Response } from "express";
import { iCategory, iCreateCategory } from "../interfaces/category.interfaces";
import createCategoryService from "../services/category/createCategory.service";
import listCategoryService from "../services/category/listCategory.service";
import listCategoriesWithRealEstateService from "../services/category/listCategoryWithRealEstate.service";

const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: iCategory = req.body;

  const newCategory = await createCategoryService(categoryData);

  return res.status(201).json(newCategory);
};

const listCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const listCategories: iCreateCategory[] = await listCategoryService();

  return res.status(200).json(listCategories);
};

const listCategoryWithRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idCategory = parseInt(req.params.id);

  const categoriesWithRealEstate = await listCategoriesWithRealEstateService(
    idCategory
  );

  return res.status(200).json(categoriesWithRealEstate);
};

export {
  createCategoryController,
  listCategoryController,
  listCategoryWithRealEstateController,
};
