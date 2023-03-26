/** @format */

import { Request, Response, NextFunction } from "express";
import appointment from "../Model/appointment";
import specialistModel from "../Model/specialistModel";
import userModel from "../Model/userModel";
import { AppError, HttpCode } from "../src/error/errorSpellOut";
import { asyncHandler } from "../src/error/asyncHander";
import mongoose from "mongoose";

export const bookAppointment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { date, complaintBrief, specialist } = req.body;
    const getUser = await userModel.findById(req.params.userId);
    const getSpecialist = await specialistModel.findById(
      req.params.specialistId,
    );
    // req.params.userId

    const bookAppointment = await appointment.create({
      email: getUser?.email,
      date,
      confirm: false,
      complaintBrief,
      specialist,
      specialistEmail: getSpecialist?.email,
    });

    if (!getUser && !getSpecialist) {
      next(
        new AppError({
          message: "Unser Not Found",
          httpCode: HttpCode.BAD_REQUEST,
        }),
      );
    }

    if (specialist !== getSpecialist?.name) {
      return res.status(HttpCode.NOT_FOUND).json({
        message: "Specialist not found",
      });
    }
    getUser?.appointment?.push(
      new mongoose.Types.ObjectId(bookAppointment?._id),
    );
    getUser?.save();
    getSpecialist?.appointment?.push(
      new mongoose.Types.ObjectId(bookAppointment?._id),
    );
    getSpecialist?.save();

    return res.status(HttpCode.CREATED).json({
      mesage: "Message Sent",
      data: bookAppointment,
    });
  },
);
