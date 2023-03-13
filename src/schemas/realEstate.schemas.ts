import { z } from "zod";
import { addressSchema, createAddressSchema } from "./address.schemas";

const realEstateSchema = z.object({
  value: z.number().or(z.string()),
  size: z.number().int().positive(),
  address: addressSchema,
  categoryId: z.number(),
});

const createRealEstateSchema = z.object({
  id: z.number(),
  sold: z.boolean().default(false),
  value: z.number().or(z.string()),
  size: z.number().int(),
  addressSchema: createAddressSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export { realEstateSchema, createRealEstateSchema };
