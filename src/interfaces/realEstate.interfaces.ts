import { z } from "zod";
import {
  createRealEstateSchema,
  realEstateSchema,
} from "../schemas/realEstate.schemas";

type iRealEstate = z.infer<typeof realEstateSchema>;
type iCreateRealEstate = z.infer<typeof createRealEstateSchema>;
type iRealEstates = z.infer<typeof createRealEstateSchema>;

export { iRealEstate, iCreateRealEstate, iRealEstates };
