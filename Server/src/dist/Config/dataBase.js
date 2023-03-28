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
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("../environments/env"));
const dbConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connectUrl = yield mongoose_1.default.connect(env_1.default.mongodbLifeUrl);
        console.log("Connected To DataBase");
        console.log("");
        if (mongoose_1.default.connection.host === "local host") {
            console.log("You're Connected to LocalHost");
        }
        console.log("You're Connected To Cloud Host");
    }
    catch (error) {
        console.log("An Error Occured In DataBase", error);
    }
});
exports.default = dbConfig;
