import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUserController,
  updateUserController,
} from "../controllers/users.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { ensureEmailExistsMiddleware } from "../middlewares/ensureEmailExists.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdminMiddleware";
import ensureIsUserIdMiddleware from "../middlewares/ensureIsUserIdMiddleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExistsMiddleware";
import { updateUserSchema, userSchema } from "../schemas/users.schemas";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchema),
  ensureEmailExistsMiddleware,
  createUserController
);
userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  listUserController
);
userRoutes.patch(
  "/:id",
  ensureUserExistsMiddleware,
  ensureDataIsValidMiddleware(updateUserSchema),
  ensureTokenIsValidMiddleware,
  ensureIsUserIdMiddleware,
  updateUserController
);
userRoutes.delete(
  "/:id",
  ensureUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  deleteUserController
);

export default userRoutes;
