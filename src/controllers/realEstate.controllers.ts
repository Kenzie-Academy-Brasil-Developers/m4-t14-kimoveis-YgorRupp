import { Request, Response } from "express";
import createRealEstateService from "../services/realEstate/createRealEstate.service";
import listRealEstateService from "../services/realEstate/listRealEstate.service";

const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstate = await createRealEstateService(req.body);

  return res.status(201).json(realEstate);
};

const listRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstate = await listRealEstateService();

  return res.status(200).json(realEstate);
};

export { createRealEstateController, listRealEstateController };
