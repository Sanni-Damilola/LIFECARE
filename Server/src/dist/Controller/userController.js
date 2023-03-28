"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOutToBank = exports.deleteAllModels = exports.getAllUser = exports.getOneUser = exports.SignIn = exports.fundWalletFromBank = exports.sendToAnotherHospitalWallet = exports.sendToAnotherSpecialistWallet = exports.sendToAnotherWallet = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../Model/userModel"));
const walletModel_1 = __importDefault(require("../Model/walletModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const historyModel_1 = __importDefault(require("../Model/historyModel"));
const specialistModel_1 = __importDefault(require("../Model/specialistModel"));
const asyncHander_1 = require("../error/asyncHander");
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
const appointment_1 = __importDefault(require("../Model/appointment"));
const hospitalModel_1 = __importDefault(require("../Model/hospitalModel"));
const errorSpellOut_1 = require("../error/errorSpellOut");
const uuidv4_1 = require("uuidv4");
exports.registerUser = (0, asyncHander_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, userName, phoneNumber, genotype, bloodGroup, } = req.body;
    const salt = yield bcrypt_1.default.genSalt(10);
    const hash = yield bcrypt_1.default.hash(password, salt);
    // const getDate = Date.now();
    const generateNumber = `${Math.floor(Math.random() * 10000000000)}`; // generating random numbers
    const num = 234; // country code
    const register = yield userModel_1.default.create({
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
    const createWallet = yield walletModel_1.default.create({
        _id: register === null || register === void 0 ? void 0 : register._id,
        ownerName: name,
        balance: 0,
        credit: 0,
        debit: 0,
    }); // creating a wallet
    register === null || register === void 0 ? void 0 : register.wallet.push(new mongoose_1.default.Types.ObjectId(createWallet === null || createWallet === void 0 ? void 0 : createWallet._id));
    register.save();
    if (!register) {
        next(new errorSpellOut_1.AppError({
            message: "User Not Created",
            httpCode: errorSpellOut_1.HttpCode.BAD_REQUEST,
        }));
    }
    return res.status(errorSpellOut_1.HttpCode.CREATED).json({
        message: "created",
        data: register,
    }); // Creating User
}));
exports.sendToAnotherWallet = (0, asyncHander_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { accountNumber, amount } = req.body;
    const generateReferenceNumber = Math.floor(Math.random() * 34567767) + 234; // generate Refefrence Number
    const getReceiver = yield userModel_1.default.findOne({
        accountNumber,
    }); // getting receiver
    const getReceiverWallet = yield walletModel_1.default.findById(getReceiver === null || getReceiver === void 0 ? void 0 : getReceiver._id); // geting Recevier Wallet {so a Recevier(user) can creidt it}
    const getSender = yield userModel_1.default.findById(req.params.senderId); // getting sender
    const getSenderWallet = yield walletModel_1.default.findById(getSender === null || getSender === void 0 ? void 0 : getSender._id); // geting Sender Wallet {so a sender(user) can debit from it}
    const currentDate = new Date();
    const time = currentDate.toLocaleTimeString(); // getting current time
    const date = currentDate.toDateString(); // getting current time
    if (!getSender && getReceiver) {
        next(new errorSpellOut_1.AppError({
            message: "an error occured in sendToAnotherWallet",
            httpCode: errorSpellOut_1.HttpCode.BAD_REQUEST,
        }));
    }
    if (getSender && getReceiver) {
        if (amount > (getSenderWallet === null || getSenderWallet === void 0 ? void 0 : getSenderWallet.balance)) {
            return res.status(errorSpellOut_1.HttpCode.NOT_FOUND).json({
                message: "Insufficient fund",
            });
        }
        else {
            if ((getSender === null || getSender === void 0 ? void 0 : getSender.accountNumber) === accountNumber) {
                return res.status(errorSpellOut_1.HttpCode.NOT_FOUND).json({
                    message: "transaction fail",
                });
            } // prevent user from crediting ThemSelf
            yield walletModel_1.default.findByIdAndUpdate(getSenderWallet === null || getSenderWallet === void 0 ? void 0 : getSenderWallet._id, {
                balance: (getSenderWallet === null || getSenderWallet === void 0 ? void 0 : getSenderWallet.balance) - amount,
                credit: 0,
                // ownersName: getSender?.email!,
                debit: amount,
            }); // updating sender Wallet
            const createSenderHistory = yield historyModel_1.default.create({
                message: `You Have Succefully sent ${amount} to ${getReceiver === null || getReceiver === void 0 ? void 0 : getReceiver.name}`,
                transactionRefrence: `${generateReferenceNumber}`,
                transactionType: "debit",
                date: `${date}`,
                time: `${time}`,
                amount: amount,
            }); // Sender History
            (_a = getSender === null || getSender === void 0 ? void 0 : getSender.history) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(createSenderHistory === null || createSenderHistory === void 0 ? void 0 : createSenderHistory._id)); //  pushing data to history {in userModel(line 43) }
            getSender === null || getSender === void 0 ? void 0 : getSender.save();
            yield walletModel_1.default.findByIdAndUpdate(getReceiver === null || getReceiver === void 0 ? void 0 : getReceiver._id, {
                balance: (getReceiverWallet === null || getReceiverWallet === void 0 ? void 0 : getReceiverWallet.balance) + amount,
                credit: amount,
                // ownersName: getReceiver?.email!,
                debit: 0,
            }); // updating Receiver Wallet
            const createRecevierHistory = yield historyModel_1.default.create({
                message: `Your Account has been credited with ${amount} from ${getReceiver === null || getReceiver === void 0 ? void 0 : getReceiver.name}`,
                transactionType: "credit",
                date: `${date}`,
                time: `${time}`,
                amount: amount,
                transactionRefrence: `${generateReferenceNumber}`, // generateReferenceNumber {from line 65 👆👆}
            });
            (_b = getReceiver === null || getReceiver === void 0 ? void 0 : getReceiver.history) === null || _b === void 0 ? void 0 : _b.push(new mongoose_1.default.Types.ObjectId(createRecevierHistory === null || createRecevierHistory === void 0 ? void 0 : createRecevierHistory._id)); // pushing data to history {in userModel(line 43) }
            getReceiver === null || getReceiver === void 0 ? void 0 : getReceiver.save();
        }
        return res.status(errorSpellOut_1.HttpCode.CREATED).json({
            message: "transaction successfull",
        });
    }
    else {
        return res.status(errorSpellOut_1.HttpCode.NOT_FOUND).json({
            message: "Account not found",
        });
    }
}));
exports.sendToAnotherSpecialistWallet = (0, asyncHander_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const { accountNumber, amount } = req.body;
    const generateReferenceNumber = Math.floor(Math.random() * 34567767) + 234; // generate Refefrence Number
    const getSpecialist = yield specialistModel_1.default.findOne({
        accountNumber,
    }); // getting getSpecialist
    const getReceiverWallet = yield walletModel_1.default.findById(getSpecialist === null || getSpecialist === void 0 ? void 0 : getSpecialist._id); // geting Recevier Wallet {so a Recevier(user) can creidt it}
    const getSender = yield userModel_1.default.findById(req.params.senderId); // getting sender
    const getSenderWallet = yield walletModel_1.default.findById(req.params.senderWalletId); // geting Sender Wallet {so a sender(user) can debit from it}
    const currentDate = new Date();
    const time = currentDate.toLocaleTimeString(); // getting current time
    const date = currentDate.toDateString(); // getting current time
    if (!getSender && getSpecialist) {
        next(new errorSpellOut_1.AppError({
            message: "bad request in sendToAnotherWallet",
            httpCode: errorSpellOut_1.HttpCode.BAD_REQUEST,
        }));
    }
    if (getSender && getSpecialist) {
        if (amount > (getSenderWallet === null || getSenderWallet === void 0 ? void 0 : getSenderWallet.balance)) {
            return res.status(errorSpellOut_1.HttpCode.OK).json({
                message: "Insufficient fund",
            });
        }
        else {
            if ((getSender === null || getSender === void 0 ? void 0 : getSender.accountNumber) === accountNumber) {
                return res.status(errorSpellOut_1.HttpCode.FORBIDDEN).json({
                    message: "transaction fail",
                });
            } // prevent user from crediting ThemSelf
            yield walletModel_1.default.findByIdAndUpdate(getSenderWallet === null || getSenderWallet === void 0 ? void 0 : getSenderWallet._id, {
                balance: (getSenderWallet === null || getSenderWallet === void 0 ? void 0 : getSenderWallet.balance) - amount,
                credit: 0,
                // ownersName: getSender?.email!,
                debit: amount,
            }); // updating sender Wallet
            const createSenderHistory = yield historyModel_1.default.create({
                message: `You Have Succefully sent ${amount} to ${getSpecialist === null || getSpecialist === void 0 ? void 0 : getSpecialist.name}`,
                time: `${time}`,
                date: `${date}`,
                amount: amount,
                transactionRefrence: `${generateReferenceNumber}`,
                transactionType: "debit",
            }); // Sender History
            (_c = getSender === null || getSender === void 0 ? void 0 : getSender.history) === null || _c === void 0 ? void 0 : _c.push(new mongoose_1.default.Types.ObjectId(createSenderHistory === null || createSenderHistory === void 0 ? void 0 : createSenderHistory._id)); //  pushing data to history {in userModel(line 43) }
            getSender === null || getSender === void 0 ? void 0 : getSender.save();
            yield walletModel_1.default.findByIdAndUpdate(getSpecialist === null || getSpecialist === void 0 ? void 0 : getSpecialist._id, {
                balance: (getReceiverWallet === null || getReceiverWallet === void 0 ? void 0 : getReceiverWallet.balance) + amount,
                credit: amount,
                // ownersName: getReceiver?.email!,
                debit: 0,
            }); // updating Receiver Wallet
            const createRecevierHistory = yield historyModel_1.default.create({
                message: `Your Account has been credited with ${amount} from ${getSender === null || getSender === void 0 ? void 0 : getSender.name}`,
                date: `${date}`,
                amount: amount,
                time: `${time}`,
                transactionRefrence: `${generateReferenceNumber}`,
                transactionType: "credit",
            });
            (_d = getSpecialist === null || getSpecialist === void 0 ? void 0 : getSpecialist.history) === null || _d === void 0 ? void 0 : _d.push(new mongoose_1.default.Types.ObjectId(createRecevierHistory === null || createRecevierHistory === void 0 ? void 0 : createRecevierHistory._id)); // pushing data to history {in userModel(line 43) }
            getSpecialist === null || getSpecialist === void 0 ? void 0 : getSpecialist.save();
        }
        return res.status(errorSpellOut_1.HttpCode.CREATED).json({
            message: "transaction successfull",
        });
    }
    else {
        return res.status(errorSpellOut_1.HttpCode.NOT_FOUND).json({
            message: "Account not found",
        });
    }
}));
exports.sendToAnotherHospitalWallet = (0, asyncHander_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const { accountNumber, amount } = req.body;
    const generateReferenceNumber = Math.floor(Math.random() * 34567767) + 234; // generate Refefrence Number
    const getHospital = yield hospitalModel_1.default.findOne({
        accountNumber,
    }); // getting getSpecialist
    const getReceiverWallet = yield walletModel_1.default.findById(getHospital === null || getHospital === void 0 ? void 0 : getHospital._id); // geting Recevier Wallet {so a Recevier(user) can creidt it}
    const getSender = yield userModel_1.default.findById(req.params.senderId); // getting sender
    const getSenderWallet = yield walletModel_1.default.findById(req.params.senderWalletId); // geting Sender Wallet {so a sender(user) can debit from it}
    const currentDate = new Date();
    const time = currentDate.toLocaleTimeString(); // getting current time
    const date = currentDate.toDateString(); // getting current time
    if (!getSender && getHospital) {
        next(new errorSpellOut_1.AppError({
            message: "bad request in sendToAnotherWallet",
            httpCode: errorSpellOut_1.HttpCode.BAD_REQUEST,
        }));
    }
    if (getSender && getHospital) {
        if (amount > (getSenderWallet === null || getSenderWallet === void 0 ? void 0 : getSenderWallet.balance)) {
            return res.status(errorSpellOut_1.HttpCode.FORBIDDEN).json({
                message: "Insufficient fund",
            });
        }
        else {
            if ((getSender === null || getSender === void 0 ? void 0 : getSender.accountNumber) === accountNumber) {
                return res.status(errorSpellOut_1.HttpCode.FORBIDDEN).json({
                    message: "transaction fail",
                });
            } // prevent user from crediting ThemSelf
            yield walletModel_1.default.findByIdAndUpdate(getSenderWallet === null || getSenderWallet === void 0 ? void 0 : getSenderWallet._id, {
                balance: (getSenderWallet === null || getSenderWallet === void 0 ? void 0 : getSenderWallet.balance) - amount,
                credit: 0,
                // ownersName: getSender?.email!,
                debit: amount,
            }); // updating sender Wallet
            const createSenderHistory = yield historyModel_1.default.create({
                message: `You Have Succefully sent ${amount} to ${getHospital === null || getHospital === void 0 ? void 0 : getHospital.name}`,
                time: `${time}`,
                date: `${date}`,
                amount: amount,
                transactionRefrence: `${generateReferenceNumber}`,
                transactionType: "debit",
            }); // Sender History
            (_e = getSender === null || getSender === void 0 ? void 0 : getSender.history) === null || _e === void 0 ? void 0 : _e.push(new mongoose_1.default.Types.ObjectId(createSenderHistory === null || createSenderHistory === void 0 ? void 0 : createSenderHistory._id)); //  pushing data to history {in userModel(line 43) }
            getSender === null || getSender === void 0 ? void 0 : getSender.save();
            yield walletModel_1.default.findByIdAndUpdate(getHospital === null || getHospital === void 0 ? void 0 : getHospital._id, {
                balance: (getReceiverWallet === null || getReceiverWallet === void 0 ? void 0 : getReceiverWallet.balance) + amount,
                credit: amount,
                // ownersName: getReceiver?.email!,
                debit: 0,
            }); // updating Receiver Wallet
            const createRecevierHistory = yield historyModel_1.default.create({
                message: `Your Account has been credited with ${amount} from ${getHospital === null || getHospital === void 0 ? void 0 : getHospital.name}`,
                date: `${date}`,
                time: `${time}`,
                amount: amount,
                transactionRefrence: `${generateReferenceNumber}`,
                transactionType: "credit",
            });
            (_f = getHospital === null || getHospital === void 0 ? void 0 : getHospital.history) === null || _f === void 0 ? void 0 : _f.push(new mongoose_1.default.Types.ObjectId(createRecevierHistory === null || createRecevierHistory === void 0 ? void 0 : createRecevierHistory._id)); // pushing data to history {in userModel(line 43) }
            getHospital === null || getHospital === void 0 ? void 0 : getHospital.save();
        }
        return res.status(errorSpellOut_1.HttpCode.CREATED).json({
            message: "transaction successfull",
        });
    }
    else {
        return res.status(errorSpellOut_1.HttpCode.NOT_FOUND).json({
            message: "Account not found",
        });
    }
}));
const secret = "sk_test_kAfJyQXUS8WXLFurAs2iavxDqUtXTas591u9VzH6";
const urlData = "https://api.korapay.com/merchant/api/v1/charges/card";
const encrypt = "pXj3cj8zUtut9ifqS4GskkJVauCFMm7Q";
function encryptAES256(encryptionKey, paymentData) {
    const iv = crypto_1.default.randomBytes(16);
    const cipher = crypto_1.default.createCipheriv("aes-256-gcm", encryptionKey, iv);
    const encrypted = cipher.update(paymentData);
    const ivToHex = iv.toString("hex");
    const encryptedToHex = Buffer.concat([encrypted, cipher.final()]).toString("hex");
    return `${ivToHex}:${encryptedToHex}:${cipher.getAuthTag().toString("hex")}`;
}
// fund wallet from bank
const fundWalletFromBank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, name, number, cvv, pin, expiry_year, expiry_month } = req.body;
        const ref = (0, uuidv4_1.uuid)();
        const paymentData = {
            reference: `${ref}`,
            card: {
                name,
                number,
                cvv,
                pin,
                expiry_year,
                expiry_month,
            },
            amount,
            currency: "NGN",
            redirect_url: "https://merchant-redirect-url.com",
            customer: {
                name: "sanni",
                email: "johndoe@korapay.com",
            },
            metadata: {
                internalRef: "JD-12-67",
                age: 15,
                fixed: true,
            },
        };
        const stringData = JSON.stringify(paymentData);
        const bufData = Buffer.from(stringData, "utf-8");
        const encryptedData = encryptAES256(encrypt, bufData);
        var config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${urlData}`,
            headers: {
                Authorization: `Bearer ${secret}`,
            },
            data: {
                charge_data: `${encryptedData}`,
            },
        };
        (0, axios_1.default)(config)
            .then(function (response) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                const getUser = yield userModel_1.default.findById(req.params.userId);
                const getWallet = yield walletModel_1.default.findById(getUser === null || getUser === void 0 ? void 0 : getUser._id);
                const currentDate = new Date();
                const time = currentDate.toLocaleTimeString(); // getting current time
                const date = currentDate.toDateString(); // getting current time
                yield walletModel_1.default.findByIdAndUpdate(getWallet === null || getWallet === void 0 ? void 0 : getWallet._id, {
                    balance: (getWallet === null || getWallet === void 0 ? void 0 : getWallet.balance) + amount,
                });
                const createHisorySender = yield historyModel_1.default.create({
                    message: `an amount of ${amount} has been credited to your wallet`,
                    transactionType: "credit",
                    date: date,
                    time: time,
                    amount: amount,
                    transactionReference: `${ref}`,
                });
                (_a = getUser === null || getUser === void 0 ? void 0 : getUser.history) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(createHisorySender === null || createHisorySender === void 0 ? void 0 : createHisorySender._id));
                return res.status(errorSpellOut_1.HttpCode.CREATED).json({
                    message: "Wallet updated successfully",
                    paymentData: JSON.parse(JSON.stringify(response.data)),
                });
            });
        })
            .catch(function (error) {
            console.log(error);
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.fundWalletFromBank = fundWalletFromBank;
// export const fundWalletFromBank = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const getUser = await userModel.findById(req.params.userId);
//     const getWallet = await walletModel.findById(getUser?._id);
//     const { amount } = req.body;
//     const currentDate: Date = new Date();
//     const time = currentDate.toLocaleTimeString(); // getting current time
//     const date = currentDate.toDateString(); // getting current time
//     await walletModel.findByIdAndUpdate(getWallet?._id, {
//       balance: getWallet?.balance + amount,
//     });
//     if (!amount) {
//       next(
//         new AppError({
//           message: "bad request in fundWalletFromBank",
//           httpCode: HttpCode.BAD_REQUEST,
//         }),
//       );
//     }
//     const transactRef = uuid();
//     const createHisorySender = await historyModel.create({
//       message: `an amount of ${amount} has been credited to your wallet`,
//       transactionType: "credit",
//       date: date,
//       time: time,
//       transactionReference: transactRef,
//     });
//     getUser?.history?.push(
//       new mongoose.Types.ObjectId(createHisorySender?._id),
//     );
//     res.status(200).json({
//       message: "Wallet updated successfully",
//     });
//   },
// );
// export const checkPayment = async (req: Request, res: Response) => {
//   try {
//     // name: "Test Cards",
//     // number: "5188513618552975",
//     // cvv: "123",
//     // expiry_month: "09",
//     // expiry_year: "30",
//     // pin: "1234",
//     const {
//       amount,
//       name,
//       number,
//       cvv,
//       pin,
//       expiry_year,
//       expiry_month,
//       title,
//       description,
//     } = req.body;
//     const paymentData = {
//       reference: uuid(), // must be at least 8 chara
//       card: {
//         name,
//         number,
//         cvv,
//         pin,
//         expiry_year,
//         expiry_month,
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
//         const getUser = await userModel.findById(req.params.id);
//         const createPayment: any = await cardModel.create({
//           amount,
//           title,
//           description,
//           userName: getUser?.name,
//           user: getUser?._id,
//         });
//         getUser?.product?.push(new mongoose.Types.ObjectId(createPayment?._id));
//         getUser!.save();
//         return res.status(200).json({
//           message: "success",
//           data: {
//             paymentInfo: createPayment,
//             paymentData: JSON.parse(JSON.stringify(response.data)),
//           },
//         });
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
// export const payOutToBank = async (req: Request, res: Response) => {
//   try {
//     // const user: any = await userModel.findById(req.params.userId);
//     // // console.log(getWallet);
//     // const wallet = await walletModel.findById(user?._id);
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
//     var data = JSON.stringify({
//       reference: `${Math.random() * 10000}`,
//       destination: {
//         type: "bank_account",
//         amount: "1000",
//         currency: "NGN",
//         narration: "Test Transfer Payment",
//         bank_account: {
//           bank: "033",
//           account: "0000000000",
//         },
//         customer: {
//           name: "John Doe",
//           email: "johndoe@korapay.com",
//         },
//       },
//     });
//     var config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: "https://api.korapay.com/merchant/api/v1/transactions/disburse",
//       headers: {
//         Authorization: `Bearer ${secret}`,
//       },
//       data: data,
//     };
//     axios(config)
//       .then(function (response) {
//         // console.log(JSON.stringify(response.data));
//         return res.status(200).json({
//           message: "successfull",
//           data: JSON.parse(JSON.stringify(response.data)),
//         });
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };
exports.SignIn = (0, asyncHander_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const login = yield userModel_1.default.findOne({ email });
    if (!login) {
        next(new errorSpellOut_1.AppError({
            message: "buser not found",
            httpCode: errorSpellOut_1.HttpCode.NOT_FOUND,
        }));
    }
    return res.status(errorSpellOut_1.HttpCode.OK).json({
        message: "Successfully Login",
        data: login,
    });
}));
exports.getOneUser = (0, asyncHander_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getUser1 = yield userModel_1.default
        .findById(req.params.id)
        .populate("wallet")
        .populate("history")
        .populate("appointment");
    // const getUser1 = await userModel.findById(req.params.id).populate({
    //   path: "history",
    // });
    if (!getUser1) {
        next(new errorSpellOut_1.AppError({
            message: "user nof found",
            httpCode: errorSpellOut_1.HttpCode.BAD_REQUEST,
        }));
    }
    return res.status(errorSpellOut_1.HttpCode.OK).json({
        message: "successfully gotten one user",
        data: getUser1,
    }); // get one User
}));
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getUser = yield userModel_1.default.find();
    return res.status(errorSpellOut_1.HttpCode.OK).json({
        message: "Wallet updated successfully",
        data: getUser,
    });
}); // get all User
exports.getAllUser = getAllUser;
const deleteAllModels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteAllUsers = yield userModel_1.default.deleteMany();
    const deleteAllWallet = yield walletModel_1.default.deleteMany();
    const deleteAllHistorys = yield historyModel_1.default.deleteMany();
    const deleteAllAppointments = yield appointment_1.default.deleteMany();
    const deleteAllSpecialist = yield specialistModel_1.default.deleteMany();
    const deleteAllHospital = yield hospitalModel_1.default.deleteMany();
    return res.status(errorSpellOut_1.HttpCode.OK).json({
        message: "successfully deleted all Models",
    });
}); // deleting all Models
exports.deleteAllModels = deleteAllModels;
const checkOutToBank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, name, number, cvv, pin, expiry_year, expiry_month } = req.body;
        const getUser = userModel_1.default.findById(req.params.userId);
        var data = JSON.stringify({
            reference: (0, uuidv4_1.uuid)(),
            destination: {
                type: "bank_account",
                amount: "1000000",
                currency: "NGN",
                narration: "Test Transfer Payment",
                bank_account: {
                    bank: "033",
                    account: "0000000000",
                },
                customer: {
                    name: "sanni",
                    email: "johndoe@korapay.com",
                },
            },
        });
        var config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://api.korapay.com/merchant/api/v1/transactions/disburse",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${secret}`,
            },
            data: data,
        };
        const currentDate = new Date();
        const time = currentDate.toLocaleTimeString(); // getting current time
        const date = currentDate.toDateString(); // getting current time
        const ref = (0, uuidv4_1.uuid)();
        (0, axios_1.default)(config)
            .then(function (response) {
            return __awaiter(this, void 0, void 0, function* () {
                const createHisorySender = yield historyModel_1.default.create({
                    message: `an amount of ${amount} has been debited from your wallet`,
                    transactionType: "credit",
                    date: date,
                    time: time,
                    amount: amount,
                    transactionReference: `${ref}`,
                });
                return res.status(errorSpellOut_1.HttpCode.OK).json({
                    message: "success",
                    data: JSON.parse(JSON.stringify(response.data)),
                });
            });
        })
            .catch(function (error) {
            console.log(error);
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.checkOutToBank = checkOutToBank;
