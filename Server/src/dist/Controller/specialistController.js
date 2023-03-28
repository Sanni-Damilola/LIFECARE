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
exports.acceptOrDeclineAppointment = exports.getOneSpecialist = exports.SignInSpecialist = exports.createSpecialist = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const specialistModel_1 = __importDefault(require("../Model/specialistModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const walletModel_1 = __importDefault(require("../Model/walletModel"));
const asyncHander_1 = require("../error/asyncHander");
const errorSpellOut_1 = require("../error/errorSpellOut");
const appointment_1 = __importDefault(require("../Model/appointment"));
exports.createSpecialist = (0, asyncHander_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, profession, lience } = req.body;
    const salt = yield bcrypt_1.default.genSalt(10);
    const hash = yield bcrypt_1.default.hash(password, salt);
    const generateNumber = `${Math.floor(Math.random() * 10000000000)}`; // generating random numbers
    const num = 234; // country code
    const register = yield specialistModel_1.default.create({
        name,
        email,
        password: hash,
        profession,
        lience,
        verified: true,
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
            httpCode: errorSpellOut_1.HttpCode.CREATED,
        }));
    }
    return res.status(errorSpellOut_1.HttpCode.OK).json({
        message: "created",
        data: register,
    });
}));
exports.SignInSpecialist = (0, asyncHander_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const login = yield specialistModel_1.default.findOne({ email });
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
exports.getOneSpecialist = (0, asyncHander_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getSpecialist = yield specialistModel_1.default
        .findById(req.params.idspecialist)
        .populate("wallet")
        .populate("history")
        .populate("appointment");
    if (!getSpecialist) {
        next(new errorSpellOut_1.AppError({
            message: "Specialist not found",
            httpCode: errorSpellOut_1.HttpCode.NOT_FOUND,
        }));
    }
    return res.status(errorSpellOut_1.HttpCode.OK).json({
        message: "successfully gotten one Specialist",
        data: getSpecialist,
    });
}));
exports.acceptOrDeclineAppointment = (0, asyncHander_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { confirm } = req.body;
    const getSpecialList = yield specialistModel_1.default.findById(req.params.specialistId);
    const accepted = yield appointment_1.default.findByIdAndUpdate(req.params.appointmentId, {
        confirm: true,
    }, { new: true });
    if (!getSpecialList) {
        next(new errorSpellOut_1.AppError({
            message: "Specialist Not Found",
            httpCode: errorSpellOut_1.HttpCode.NOT_FOUND,
        }));
    }
    return res.status(errorSpellOut_1.HttpCode.OK).json({
        message: "Accepted",
        data: accepted,
    });
}));
