/** @format */

import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

export const ApplicationCofig = (app: Application) => {
  app.use(express.json()).use(cors()).use(morgan("dev")); // middleware Configuration

  app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
      message: "Server is up an Runing 😊😊❗✔🚴‍♀️🚴‍♀️",
    });
  }); // landing route
};
