/** @format */

import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import specialistModel from "../Model/specialistModel";
import bcrypt from "bcrypt";
import walletModel from "../Model/walletModel";
import { asyncHandler } from "../error/asyncHander";
import { AppError, HttpCode } from "../error/errorSpellOut";
import appointment from "../Model/appointment";

export const createSpecialist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, profession, lience } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const generateNumber = `${Math.floor(Math.random() * 10000000000)}`; // generating random numbers
    const num = 234; // country code

    const register = await specialistModel.create({
      name,
      email,
      password: hash,
      profession,
      lience,
      verified: true,
    }); //

    const createWallet = await walletModel.create({
      _id: register?._id,
      ownerName: name,
      balance: 0,
      credit: 0,
      debit: 0,
    }); // creating a wallet
    register?.wallet.push(new mongoose.Types.ObjectId(createWallet?._id));
    register.save(); // saveing all

    if (!register) {
      next(
        new AppError({
          message: "User Not Created",
          httpCode: HttpCode.CREATED,
        }),
      );
    }

    return res.status(HttpCode.OK).json({
      message: "created",
      data: register,
    });
  },
);

export const SignInSpecialist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const login = await specialistModel.findOne({ email });

    if (!login) {
      next(
        new AppError({
          message: "user not found",
          httpCode: HttpCode.NOT_FOUND,
        }),
      );
    }

    return res.status(HttpCode.OK).json({
      message: "Successfully Login",
      data: login,
    }); // signin
  },
);

export const getOneSpecialist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const getSpecialist = await specialistModel
      .findById(req.params.idspecialist)
      .populate("wallet")
      .populate("history")
      .populate("appointment");

    if (!getSpecialist) {
      next(
        new AppError({
          message: "Specialist not found",
          httpCode: HttpCode.NOT_FOUND,
        }),
      );
    }

    return res.status(HttpCode.OK).json({
      message: "successfully gotten one Specialist",
      data: getSpecialist,
    });
  }, // get one User
);

export const acceptOrDeclineAppointment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { confirm } = req.body;

    const getSpecialList = await specialistModel.findById(
      req.params.specialistId,
    );
    const accepted = await appointment.findByIdAndUpdate(
      req.params.appointmentId,
      {
        confirm: true,
      },
      { new: true },
    );

    if (!getSpecialList) {
      next(
        new AppError({
          message: "Specialist Not Found",
          httpCode: HttpCode.NOT_FOUND,
        }),
      );
    }

    return res.status(HttpCode.OK).json({
      message: "Accepted",
      data: accepted,
    });
  },
);
