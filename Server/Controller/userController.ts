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
import axios from "axios";
import crypto from "crypto";

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      email,
      password,
      userName,
      phoneNumber,
      genotype,
      bloodGroup,
    } = req.body;
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
      genotype,
      bloodGroup,
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
    const getSenderWallet = await walletModel.findById(getSender?._id); // geting Sender Wallet {so a sender(user) can debit from it}

    const currentDate: Date = new Date();
    const time = currentDate.toLocaleTimeString(); // getting current time
    const date = currentDate.toDateString(); // getting current time

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
          date: `${date}`,
          time: `${time}`,
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
          date: `${date}`,
          time: `${time}`,
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
    const currentDate: Date = new Date();
    const time = currentDate.toLocaleTimeString(); // getting current time
    const date = currentDate.toDateString(); // getting current time

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
          time: `${time}`,
          date: `${date}`,
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
          date: `${date}`,
          time: `${time}`,
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

// fund wallet from bank
export const fundWalletFromBank = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const getUser = await userModel.findById(req.params.userId);
    const getWallet = await walletModel.findById(getUser?._id);

    const { amount, transactinRef } = req.body;
    const currentDate: Date = new Date();
    const time = currentDate.toLocaleTimeString(); // getting current time
    const date = currentDate.toDateString(); // getting current time
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
      date: date,
      time: time,
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

const secret = "sk_test_kAfJyQXUS8WXLFurAs2iavxDqUtXTas591u9VzH6";
const urlData = "https://api.korapay.com/merchant/api/v1/charges/card";
const encrypt = "pXj3cj8zUtut9ifqS4GskkJVauCFMm7Q";

function encryptAES256(encryptionKey: string, paymentData: any) {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey, iv);
  const encrypted = cipher.update(paymentData);

  const ivToHex = iv.toString("hex");
  const encryptedToHex = Buffer.concat([encrypted, cipher.final()]).toString(
    "hex",
  );

  return `${ivToHex}:${encryptedToHex}:${cipher.getAuthTag().toString("hex")}`;
}

// export const fundWalletFromBank = async (req: Request, res: Response) => {
//   try {
//     // name: "Test Cards",
//     // number: "5188513618552975",
//     // cvv: "123",
//     // expiry_month: "09",
//     // expiry_year: "30",
//     // pin: "1234",
//     // const user: any = await userModel.findById(req.params.id);
//     // console.log(getWallet);
//     const getUser = await userModel.findById(req.params.userId);
//     // const getWallet = await walletModel.findById(req.params.walletId);
//     const getWallet = await walletModel.findById(getUser?._id);
//     const currentDate: Date = new Date();
//     const time = currentDate.toLocaleTimeString(); // getting current time
//     const date = currentDate.toDateString(); // getting current time

//     const wallet = await walletModel.findById(req.params.id);
//     // console.log(wallet)
//     interface IData {
//       amount: number;
//     }

//     const {
//       amount,
//       // transactinRef,
//       name,
//       number,
//       cvv,
//       pin,
//       expiry_year,
//       expiry_month,
//     } = req.body;

//     // const { amount, transactinRef } = req.body;
//     await walletModel.findByIdAndUpdate(getWallet?._id, {
//       balance: getWallet?.balance + amount,
//     });
//     const createHisorySender = await historyModel.create({
//       message: `an amount of ${amount} has been credited to your wallet`,
//       transactionType: "credit",
//       date: `${date}`,
//       time: `${time}`,
//       // transactionReference: transactinRef,
//     });

//     getUser?.history?.push(
//       new mongoose.Types.ObjectId(createHisorySender?._id),
//     );

//     const paymentData = {
//       reference: Math.random() * 100000, // must be at least 8 chara
//       card: {
//         name: "Test Cards",
//         number: "5188513618552975",
//         cvv: "123",
//         expiry_month: "09",
//         expiry_year: "30",
//         pin: "1234",
//       },
//       amount,
//       currency: "NGN",
//       redirect_url: "https://merchant-redirect-url.com",
//       customer: {
//         name: "John Doe",
//         email: "johndoe@korapay.com",
//       },
//       metadata: {
//         internalRef: "JD-12-67",
//         age: 15,
//         fixed: true,
//       },
//     };

//     const stringData = JSON.stringify(paymentData);
//     const bufData = Buffer.from(stringData, "utf-8");
//     const encryptedData = encryptAES256(encrypt, bufData);

//     var config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: urlData,
//       headers: {
//         Authorization: `Bearer ${secret}`,
//       },
//       data: {
//         charge_data: `${encryptedData}`,
//       },
//     };

//     await axios(config)
//       .then(async function (response) {
//         // console.log(response);

//         if (response?.data?.status === true) {
//           await walletModel.findByIdAndUpdate(getWallet?._id, {
//             balance: Number(amount + getWallet?.balance),
//           });
//           return res.status(200).json({
//             message: `an amount of ${amount} has been added`,
//             data: {
//               paymentInfo: amount,
//               paymentData: JSON.parse(JSON.stringify(response.data)),
//             },
//           });
//         } else {
//           return res.status(404).json({
//             message: "failed transaction",
//           });
//         }
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const checkPayment = async (req: Request, res: Response) => {
//   try {
//     // name: "Test Cards",
//     // number: "5188513618552975",
//     // cvv: "123",
//     // expiry_month: "09",
//     // expiry_year: "30",
//     // pin: "1234",
//     const user: any = await userModel.findById(req.params.userId);
//     // console.log(getWallet);
//     const wallet = await walletModel.findById(user?._id);
//     // console.log(wallet)
//     interface IData {
//       amount: number;
//     }

//     const {
//       amount,
//       description,
//       name,
//       number,
//       cvv,
//       pin,
//       expiry_year,
//       expiry_month,
//     } = req.body;

//     const paymentData = {
//       reference: Math.random() * 10000, // must be at least 8 chara
//       card: {
//         name: "Test Cards",
//         number: "5188513618552975",
//         cvv: "123",
//         expiry_month: "09",
//         expiry_year: "30",
//         pin: "1234",
//       },
//       amount,
//       currency: "NGN",
//       redirect_url: "https://merchant-redirect-url.com",
//       customer: {
//         name: "John Doe",
//         email: "johndoe@korapay.com",
//       },
//       metadata: {
//         internalRef: "JD-12-67",
//         age: 15,
//         fixed: true,
//       },
//     };

//     const stringData = JSON.stringify(paymentData);
//     const bufData = Buffer.from(stringData, "utf-8");
//     const encryptedData = encryptAES256(encrypt, bufData);

//     var config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: urlData,
//       headers: {
//         Authorization: `Bearer ${secret}`,
//       },
//       data: {
//         charge_data: `${encryptedData}`,
//       },
//     };

//     axios(config)
//       .then(async function (response) {
//         console.log(response);

//         if (response?.data?.status === true) {
//           await walletModel.findByIdAndUpdate(wallet?._id, {
//             balance: Number(amount + wallet?.balance),
//           });
//           const getHistory = await historyModel.create({
//             message: `Dear ${user?.name} your account has been credited by ${amount}`,
//             transactionRefrence: response?.data?.reference,
//             Date: new Date().toLocaleDateString(),
//             description,
//           });
//           user?.history?.push(new mongoose.Types.ObjectId(getHistory?._id));
//           user?.save();
//           return res.status(200).json({
//             message: `an amount of ${amount} has been added`,
//             data: {
//               paymentInfo: amount,
//               paymentData: JSON.parse(JSON.stringify(response.data)),
//             },
//           });
//         } else {
//           return res.status(404).json({
//             message: "failed transaction",
//           });
//         }

//         // return res.status(201).json({
//         //   message: "done",
//         //   data: JSON.parse(JSON.stringify(response.data)),
//         // });
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const payOutToBank = async (req: Request, res: Response) => {
  try {
    // const user: any = await userModel.findById(req.params.userId);
    // // console.log(getWallet);
    // const wallet = await walletModel.findById(user?._id);

    const {
      amount,
      description,
      name,
      number,
      cvv,
      pin,
      expiry_year,
      expiry_month,
    } = req.body;

    var data = JSON.stringify({
      reference: `${Math.random() * 10000}`,
      destination: {
        type: "bank_account",
        amount: "1000",
        currency: "NGN",
        narration: "Test Transfer Payment",
        bank_account: {
          bank: "033",
          account: "0000000000",
        },
        customer: {
          name: "John Doe",
          email: "johndoe@korapay.com",
        },
      },
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.korapay.com/merchant/api/v1/transactions/disburse",
      headers: {
        Authorization: `Bearer ${secret}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        return res.status(200).json({
          message: "successfull",
          data: JSON.parse(JSON.stringify(response.data)),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

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
    const getUser1 = await userModel
      .findById(req.params.id)
      .populate("wallet")
      .populate("history");

    // const getUser1 = await userModel.findById(req.params.id).populate({
    //   path: "history",
    // });

    if (!getUser1) {
      next(
        new AppError({
          message: "user nof found",
          httpCode: HttpCode.BAD_REQUEST,
        }),
      );
    }

    return res.status(200).json({
      message: "successfully gotten one user",
      data: getUser1,
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

export const deleteAllModels = async (req: Request, res: Response) => {
  const deleteAllUsers = await userModel.deleteMany();
  const deleteAllWallet = await walletModel.deleteMany();
  const deleteAllHistorys = await historyModel.deleteMany();
  return res.status(200).json({
    message: "successfully deleted all Models",
  });
}; // deleting all Models
