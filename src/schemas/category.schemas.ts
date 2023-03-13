import { z } from "zod";

const categorySchema = z.object({
  name: z.string().max(45),
});

const createCategorySchema = categorySchema.extend({
  id: z.number(),
});

const returnMultipleCategorySchema = createCategorySchema.array();

export { categorySchema, createCategorySchema, returnMultipleCategorySchema };
