/** @format */

import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import userModel from "../Model/userModel";
import walletModel from "../Model/walletModel";
import mongoose from "mongoose";
import historyModel from "../Model/historyModel";
import specialistModel from "../Model/specialistModel";
import { asyncHandler } from "../src/error/asyncHander";
import { AppError, HttpCode } from "../src/error/errorSpellOut";

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, userName, phoneNumber } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const getDate = Date.now();
    const generateNumber = Math.floor(Math.random() * 7000) * getDate; // generating random numbers
    const num = 234; // country code

    const register = await userModel.create({
      //
      name,
      email,
      password: hash,
      userName,
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
    register.save();

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
    }); // Creating User
  },
);

export const sendToAnotherWallet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accountNumber, amount } = req.body;
    const generateReferenceNumber = Math.floor(Math.random() * 34567767) + 234; // generate Refefrence Number
    const getReceiver = await userModel.findOne({
      accountNumber,
    }); // getting receiver

    const getReceiverWallet = await walletModel.findById(getReceiver?._id); // geting Recevier Wallet {so a Recevier(user) can creidt it}
    const getSender = await userModel.findById(req.params.senderId); // getting sender
    const getSenderWallet = await walletModel.findById(
      req.params.senderWalletId,
    ); // geting Sender Wallet {so a sender(user) can debit from it}

    if (!getSender && getReceiver) {
      next(
        new AppError({
          message: "an error occured in sendToAnotherWallet",
          httpCode: HttpCode.BAD_REQUEST,
        }),
      );
    }

    if (getSender && getReceiver) {
      if (amount > getSenderWallet?.balance!) {
        return res.status(400).json({
          message: "Insufficient fund",
        });
      } else {
        if (getSender?.accountNumber === accountNumber) {
          return res.status(400).json({
            message: "transaction fail",
          });
        } // prevent user from crediting ThemSelf
        await walletModel.findByIdAndUpdate(getSenderWallet?._id, {
          balance: getSenderWallet?.balance! - amount, // Decreasing Recevier Balance
          credit: 0,
          // ownersName: getSender?.email!,
          debit: amount,
        }); // updating sender Wallet

        const createSenderHistory = await historyModel.create({
          message: `You Have Succefully sent ${amount} to ${getReceiver?.name}`,
          transactionRefrence: "debit",
          transactionType: generateReferenceNumber, // generateReferenceNumber {from line 65 👆👆}
        }); // Sender History
        getSender?.history?.push(
          new mongoose.Types.ObjectId(createSenderHistory?._id),
        ); //  pushing data to history {in userModel(line 43) }
        getSender?.save();

        await walletModel.findByIdAndUpdate(getReceiver?._id, {
          balance: getReceiverWallet?.balance! + amount, // Increasing Recevier Balance
          credit: amount,
          // ownersName: getReceiver?.email!,
          debit: 0,
        }); // updating Receiver Wallet
        const createRecevierHistory = await historyModel.create({
          message: `Your Account has been credited with ${amount} from ${getReceiver?.name}`,
          transactionRefrence: "debit",
          transactionType: generateReferenceNumber, // generateReferenceNumber {from line 65 👆👆}
        });
        getReceiver?.history?.push(
          new mongoose.Types.ObjectId(createRecevierHistory?._id),
        ); // pushing data to history {in userModel(line 43) }
        getReceiver?.save();
      }
      return res.status(200).json({
        message: "transaction successfull",
      });
    } else {
      return res.status(404).json({
        message: "Account not found",
      });
    }
  }, // {wallet transaction} ... Sending to another Wallet
);

export const sendToAnotherSpecialistWallet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accountNumber, amount } = req.body;
    const generateReferenceNumber = Math.floor(Math.random() * 34567767) + 234; // generate Refefrence Number
    const getSpecialist = await specialistModel.findOne({
      accountNumber,
    }); // getting getSpecialist

    const getReceiverWallet = await walletModel.findById(getSpecialist?._id); // geting Recevier Wallet {so a Recevier(user) can creidt it}
    const getSender = await userModel.findById(req.params.senderId); // getting sender
    const getSenderWallet = await walletModel.findById(
      req.params.senderWalletId,
    ); // geting Sender Wallet {so a sender(user) can debit from it}

    if (!getSender && getSpecialist) {
      next(
        new AppError({
          message: "bad request in sendToAnotherWallet",
          httpCode: HttpCode.BAD_REQUEST,
        }),
      );
    }

    if (getSender && getSpecialist) {
      if (amount > getSenderWallet?.balance!) {
        return res.status(400).json({
          message: "Insufficient fund",
        });
      } else {
        if (getSender?.accountNumber === accountNumber) {
          return res.status(400).json({
            message: "transaction fail",
          });
        } // prevent user from crediting ThemSelf
        await walletModel.findByIdAndUpdate(getSenderWallet?._id, {
          balance: getSenderWallet?.balance! - amount, // Decreasing Recevier Balance
          credit: 0,
          // ownersName: getSender?.email!,
          debit: amount,
        }); // updating sender Wallet

        const createSenderHistory = await historyModel.create({
          message: `You Have Succefully sent ${amount} to ${getSpecialist?.name}`,
          transactionRefrence: "debit",
          transactionType: generateReferenceNumber, // generateReferenceNumber {from line 65 👆👆}
        }); // Sender History
        getSender?.history?.push(
          new mongoose.Types.ObjectId(createSenderHistory?._id),
        ); //  pushing data to history {in userModel(line 43) }
        getSender?.save();

        await walletModel.findByIdAndUpdate(getSpecialist?._id, {
          balance: getReceiverWallet?.balance! + amount, // Increasing Recevier Balance
          credit: amount,
          // ownersName: getReceiver?.email!,
          debit: 0,
        }); // updating Receiver Wallet
        const createRecevierHistory = await historyModel.create({
          message: `Your Account has been credited with ${amount} from ${getSpecialist?.name}`,
          transactionRefrence: "debit",
          transactionType: generateReferenceNumber, // generateReferenceNumber {from line 65 👆👆}
        });
        getSpecialist?.history?.push(
          new mongoose.Types.ObjectId(createRecevierHistory?._id),
        ); // pushing data to history {in userModel(line 43) }
        getSpecialist?.save();
      }
      return res.status(200).json({
        message: "transaction successfull",
      });
    } else {
      return res.status(404).json({
        message: "Account not found",
      });
    }
  }, // {wallet transaction} ... Sending to specialist Wallet
);

//fund wallet from bank
export const fundWalletFromBank = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const getUser = await userModel.findById(req.params.userId);
    const getWallet = await walletModel.findById(req.params.walletId);

    const { amount, transactinRef } = req.body;
    await walletModel.findByIdAndUpdate(getWallet?._id, {
      balance: getWallet?.balance + amount,
    });

    

    if (!amount && !transactinRef) {
      next(
        new AppError({
          message: "bad request in fundWalletFromBank",
          httpCode: HttpCode.BAD_REQUEST,
        }),
      );
    }

    const createHisorySender = await historyModel.create({
      message: `an amount of ${amount} has been credited to your wallet`,
      transactionType: "credit",
      transactionReference: transactinRef,
    });

    getUser?.history?.push(
      new mongoose.Types.ObjectId(createHisorySender?._id),
    );

    res.status(200).json({
      message: "Wallet updated successfully",
    });
  },
);

export const SignIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const login = await userModel.findOne({ email });

    if (!login) {
      next(
        new AppError({
          message: "buser not found",
          httpCode: HttpCode.NOT_FOUND,
        }),
      );
    }

    return res.status(200).json({
      message: "Successfully Login",
      data: login,
    });
  }, // signin
);

export const getOneUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const getUser = await userModel.findById(req.params.id).populate({
      path: "wallet",
    });

    if (!getUser) {
      next(
        new AppError({
          message: "user nof found",
          httpCode: HttpCode.BAD_REQUEST,
        }),
      );
    }

    return res.status(200).json({
      message: "successfully gotten one user",
      data: getUser,
    }); // get one User
  },
);

export const getAllUser = async (req: Request, res: Response) => {
  const getUser = await userModel.find();
  return res.status(200).json({
    message: "Wallet updated successfully",
    data: getUser,
  });
}; // get all User
