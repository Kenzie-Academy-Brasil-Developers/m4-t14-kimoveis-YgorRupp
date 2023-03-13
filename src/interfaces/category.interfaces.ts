import { z } from "zod";
import {
  categorySchema,
  createCategorySchema,
} from "../schemas/category.schemas";

type iCategory = z.infer<typeof categorySchema>;
type iCreateCategory = z.infer<typeof createCategorySchema>;

export { iCategory, iCreateCategory };
