"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationCofig = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const errorSpellOut_1 = require("./error/errorSpellOut");
const route_1 = __importDefault(require("./Routes/route"));
const specialistRoute_1 = __importDefault(require("./Routes/specialistRoute"));
const hospitalRoute_1 = __importDefault(require("./Routes/hospitalRoute"));
const ApplicationCofig = (app) => {
    app.use(express_1.default.json()).use((0, cors_1.default)()).use((0, morgan_1.default)("dev")); // middleware Configuration
    app.get("/", (req, res) => {
        return res.status(200).json({
            message: "Server is up an Runing 😊😊❗✔🚴‍♀️🚴‍♀️",
        }); // landing route
    });
    // user route 👇
    app.use("/api", route_1.default);
    // specialistRoutes route 👇
    app.use("/api", specialistRoute_1.default);
    // hospitalRoutes route 👇
    app.use("/api", hospitalRoute_1.default);
    app.all("*", (req, res, next) => {
        next(new errorSpellOut_1.AppError({
            message: `Opps!! Are You Lost??...This Route ${req.originalUrl} is Not Round`,
            httpCode: errorSpellOut_1.HttpCode.NOT_FOUND,
        })); // 404 Routes
    });
};
exports.ApplicationCofig = ApplicationCofig;
