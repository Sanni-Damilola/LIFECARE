/** @format */

import { Request, Response, NextFunction } from "express";
import appointment from "../Model/appointment";
import specialistModel from "../Model/specialistModel";
import userModel from "../Model/userModel";
import { asyncHandler } from "../error/asyncHander";
import mongoose from "mongoose";
import { AppError, HttpCode } from "../error/errorSpellOut";

export const bookAppointment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { date, complaintBrief, specialist } = req.body;
    const getUser = await userModel.findById(req.params.userId); // getting user
    const getSpecialist = await specialistModel.findById(
      req.params.specialistId,
    ); // getting speciallist

    const bookAppointment = await appointment.create({
      email: getUser?.email,
      date,
      confirm: false,
      complaintBrief,
      specialist,
      specialistEmail: getSpecialist?.email,
    });

    if (!getUser && !getSpecialist ) {
      next(
        new AppError({
          message: "User Not Found",
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
