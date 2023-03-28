"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const appointment = new mongoose_1.default.Schema({
    email: {
        type: String,
    },
    date: {
        type: String,
    },
    confirm: {
        type: Boolean,
    },
    complaintBrief: {
        type: String,
    },
    specialist: {
        type: String,
    },
    specialistEmail: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("appointment", appointment);
