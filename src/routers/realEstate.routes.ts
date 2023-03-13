import { Router } from "express";
import {
  createRealEstateController,
  listRealEstateController,
} from "../controllers/realEstate.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdminMiddleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import { realEstateSchema } from "../schemas/realEstate.schemas";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  ensureDataIsValidMiddleware(realEstateSchema),
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  createRealEstateController
);
realEstateRoutes.get("", listRealEstateController);

export default realEstateRoutes;
