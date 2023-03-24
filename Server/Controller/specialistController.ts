/** @format */

import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import specialistModel from "../Model/specialistModel";
import bcrypt from "bcrypt";
import walletModel from "../Model/walletModel";
import { asyncHandler } from "../src/error/asyncHander";
import { AppError, HttpCode } from "../src/error/errorSpellOut";

export const createSpecialist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, phoneNumber, profession, lience } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const getDate = Date.now();
    const generateNumber = Math.floor(Math.random() * 7000) * getDate; // generating random numbers
    const num = 234; // country code

    const register = await specialistModel.create({
      name,
      email,
      password: hash,
      profession,
      lience,
      phoneNumber: num + phoneNumber,
      verified: true,
      accountNumber: generateNumber,
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

    return res.status(201).json({
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

    return res.status(200).json({
      message: "Successfully Login",
      data: login,
    }); // signin
  },
);

export const getOneSpecialist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const getSpecialist = await specialistModel
      .findById(req.params.idspecialist)
      .populate({
        path: "wallet",
      });

    if (!getSpecialist) {
      next(
        new AppError({
          message: "user not found",
          httpCode: HttpCode.NOT_FOUND,
        }),
      );
    }

    return res.status(200).json({
      message: "successfully one Specialist",
      data: getSpecialist,
    });
  }, // get one User
);
