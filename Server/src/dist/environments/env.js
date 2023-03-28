"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const environmentVarabiles = {
    mongodbLocalUrl: process.env.mongodbLocalUrl,
    mongodbLifeUrl: process.env.mongodbLifeUrl,
};
exports.default = environmentVarabiles;
