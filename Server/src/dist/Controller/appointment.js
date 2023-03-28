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
exports.bookAppointment = void 0;
const appointment_1 = __importDefault(require("../Model/appointment"));
const specialistModel_1 = __importDefault(require("../Model/specialistModel"));
const userModel_1 = __importDefault(require("../Model/userModel"));
const asyncHander_1 = require("../error/asyncHander");
const mongoose_1 = __importDefault(require("mongoose"));
const errorSpellOut_1 = require("../error/errorSpellOut");
exports.bookAppointment = (0, asyncHander_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { date, complaintBrief, specialist } = req.body;
    const getUser = yield userModel_1.default.findById(req.params.userId); // getting user
    const getSpecialist = yield specialistModel_1.default.findById(req.params.specialistId); // getting speciallist
    const bookAppointment = yield appointment_1.default.create({
        email: getUser === null || getUser === void 0 ? void 0 : getUser.email,
        date,
        confirm: false,
        complaintBrief,
        specialist,
        specialistEmail: getSpecialist === null || getSpecialist === void 0 ? void 0 : getSpecialist.email,
    });
    if (!getUser && !getSpecialist) {
        next(new errorSpellOut_1.AppError({
            message: "User Not Found",
            httpCode: errorSpellOut_1.HttpCode.BAD_REQUEST,
        }));
    }
    if (specialist !== (getSpecialist === null || getSpecialist === void 0 ? void 0 : getSpecialist.name)) {
        return res.status(errorSpellOut_1.HttpCode.NOT_FOUND).json({
            message: "Specialist not found",
        });
    }
    (_a = getUser === null || getUser === void 0 ? void 0 : getUser.appointment) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(bookAppointment === null || bookAppointment === void 0 ? void 0 : bookAppointment._id));
    getUser === null || getUser === void 0 ? void 0 : getUser.save();
    (_b = getSpecialist === null || getSpecialist === void 0 ? void 0 : getSpecialist.appointment) === null || _b === void 0 ? void 0 : _b.push(new mongoose_1.default.Types.ObjectId(bookAppointment === null || bookAppointment === void 0 ? void 0 : bookAppointment._id));
    getSpecialist === null || getSpecialist === void 0 ? void 0 : getSpecialist.save();
    return res.status(errorSpellOut_1.HttpCode.CREATED).json({
        mesage: "Message Sent",
        data: bookAppointment,
    });
}));
