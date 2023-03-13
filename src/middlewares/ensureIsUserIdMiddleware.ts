import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const ensureIsUserIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = parseInt(req.params.id);
  const userAdmin: boolean = req.user.admin;

  if (userId !== req.user.id && userAdmin === false) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default ensureIsUserIdMiddleware;
