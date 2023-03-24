/** @format */

import { Request, Response, NextFunction } from "express";
import { AppError, HttpCode } from "../errorSpellOut";

const devError = (err: AppError, res: Response) => {
  return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    err: err.message,
    status: err.httpCode,
    stack: err.stack,
    error: err,
  });
};

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  devError(err, res);
};
