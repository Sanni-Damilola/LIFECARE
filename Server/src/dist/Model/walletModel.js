"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const walletSchema = new mongoose_1.default.Schema({
    ownerName: {
        type: String,
    },
    balance: {
        type: Number,
    },
    credit: {
        type: Number,
    },
    debit: {
        type: Number,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("wallets", walletSchema);
