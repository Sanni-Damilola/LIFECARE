/** @format */
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import walletModel from "../Model/walletModel";
import { asyncHandler } from "../error/asyncHander";
import { AppError, HttpCode } from "../error/errorSpellOut";
import hospitalModel from "../Model/hospitalModel";
import userModel from "../Model/userModel";

export const createHospital = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, phoneNumber, profession, lience } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const generateNumber = `${Math.floor(Math.random() * 10000000000)}`; // generating random numbers
    const num = 234; // country code

    const register = await hospitalModel.create({
      name,
      email,
      password: hash,
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
          httpCode: HttpCode.BAD_REQUEST,
        }),
      );
    }

    return res.status(HttpCode.CREATED).json({
      message: "created",
      data: register,
    });
  },
);

export const SignInHospital = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const login = await hospitalModel.findOne({ email });

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

export const getOneHospital = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const getHospital = await hospitalModel
      .findById(req.params.hospitalId)
      .populate("wallet")
      .populate("history");

    if (!getHospital) {
      next(
        new AppError({
          message: "hospital not found",
          httpCode: HttpCode.NOT_FOUND,
        }),
      );
    }

    return res.status(HttpCode.OK).json({
      message: "successfully gotten one hospital",
      data: getHospital,
    });
  }, // get one User
);

export const findUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const getUser = await userModel.find(query);

    if (!getUser) {
      next(
        new AppError({
          message: "user not found",
          httpCode: HttpCode.NOT_FOUND,
        }),
      );
    }

    return res.status(HttpCode.OK).json({
      message: "successfully gotten user",
      data: getUser,
    });
  }, // get one User
);
