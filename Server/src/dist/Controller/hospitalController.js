"use strict";
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
exports.findUsers = exports.getOneHospital = exports.SignInHospital = exports.createHospital = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const walletModel_1 = __importDefault(require("../Model/walletModel"));
const asyncHander_1 = require("../error/asyncHander");
const errorSpellOut_1 = require("../error/errorSpellOut");
const hospitalModel_1 = __importDefault(require("../Model/hospitalModel"));
const userModel_1 = __importDefault(require("../Model/userModel"));
exports.createHospital = (0, asyncHander_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phoneNumber, profession, lience } = req.body;
    const salt = yield bcrypt_1.default.genSalt(10);
    const hash = yield bcrypt_1.default.hash(password, salt);
    const generateNumber = `${Math.floor(Math.random() * 10000000000)}`; // generating random numbers
    const num = 234; // country code
    const register = yield hospitalModel_1.default.create({
        name,
        email,
        password: hash,
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
    register.save(); // saveing all
    if (!register) {
        next(new errorSpellOut_1.AppError({
            message: "User Not Created",
            httpCode: errorSpellOut_1.HttpCode.BAD_REQUEST,
        }));
    }
    return res.status(errorSpellOut_1.HttpCode.CREATED).json({
        message: "created",
        data: register,
    });
}));
exports.SignInHospital = (0, asyncHander_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const login = yield hospitalModel_1.default.findOne({ email });
    if (!login) {
        next(new errorSpellOut_1.AppError({
            message: "user not found",
            httpCode: errorSpellOut_1.HttpCode.NOT_FOUND,
        }));
    }
    return res.status(errorSpellOut_1.HttpCode.OK).json({
        message: "Successfully Login",
        data: login,
    }); // signin
}));
exports.getOneHospital = (0, asyncHander_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getHospital = yield hospitalModel_1.default
        .findById(req.params.hospitalId)
        .populate("wallet")
        .populate("history");
    if (!getHospital) {
        next(new errorSpellOut_1.AppError({
            message: "hospital not found",
            httpCode: errorSpellOut_1.HttpCode.NOT_FOUND,
        }));
    }
    return res.status(errorSpellOut_1.HttpCode.OK).json({
        message: "successfully gotten one hospital",
        data: getHospital,
    });
}));
exports.findUsers = (0, asyncHander_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const getUser = yield userModel_1.default.find(query);
    if (!getUser) {
        next(new errorSpellOut_1.AppError({
            message: "user not found",
            httpCode: errorSpellOut_1.HttpCode.NOT_FOUND,
        }));
    }
    return res.status(errorSpellOut_1.HttpCode.OK).json({
        message: "successfully gotten user",
        data: getUser,
    });
}));
