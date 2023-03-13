import { Router } from "express";
import {
  createCategoryController,
  listCategoryController,
  listCategoryWithRealEstateController,
} from "../controllers/category.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdminMiddleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import { categorySchema } from "../schemas/category.schemas";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  ensureDataIsValidMiddleware(categorySchema),
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  createCategoryController
);
categoriesRoutes.get("", listCategoryController);
categoriesRoutes.get("/:id/realEstate", listCategoryWithRealEstateController);

export default categoriesRoutes;
