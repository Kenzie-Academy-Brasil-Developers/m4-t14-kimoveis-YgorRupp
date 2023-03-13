import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const ensureIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const admin: boolean = req.user.admin;

  if (!admin) {
    throw new AppError("Insufficient permission", 403);
  }

  next();
};

export { ensureIsAdminMiddleware };
