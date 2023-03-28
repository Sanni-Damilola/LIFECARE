"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const specialistModel = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [isEmail_1.default, "Please provide a valid  email"],
    },
    password: {
        type: String,
        required: true,
    },
    lience: {
        type: String,
    },
    profession: {
        type: String,
        required: [true, "profession is Required"],
    },
    accountNumber: {
        type: Number,
        min: 10,
    },
    history: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "histories",
        },
    ],
    wallet: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "wallets",
        },
    ],
    appointment: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "appointment",
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("specialist", specialistModel);
