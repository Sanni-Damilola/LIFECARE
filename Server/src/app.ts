/** @format */

import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { AppError, HttpCode } from "./error/errorSpellOut";

export const ApplicationCofig = (app: Application) => {
  app.use(express.json()).use(cors()).use(morgan("dev")); // middleware Configuration

  app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
      message: "Server is up an Runing 😊😊❗✔🚴‍♀️🚴‍♀️",
    }); // landing route
  });
  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(
      new AppError({
        message: `Opps!! Are You Lost??...This Route ${req.originalUrl} is Not Round`,
        httpCode: HttpCode.NOT_FOUND,
      }),
    ); // 404 Routes
  });
};
