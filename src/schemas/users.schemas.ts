import { z } from "zod";

const userSchema = z.object({
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().min(4).max(120),
  admin: z.boolean().optional().default(false),
});

const createUserSchema = userSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .omit({
    password: true,
  });

const returnMultipleUsers = createUserSchema.array();

const updateUserSchema = createUserSchema
  .omit({
    admin: true,
    id: true,
  })
  .partial();

export { userSchema, createUserSchema, returnMultipleUsers, updateUserSchema };
