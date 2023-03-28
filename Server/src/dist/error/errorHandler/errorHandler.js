"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorSpellOut_1 = require("../errorSpellOut");
const devError = (err, res) => {
    return res.status(errorSpellOut_1.HttpCode.INTERNAL_SERVER_ERROR).json({
        err: err.message,
        status: err.httpCode,
        stack: err.stack,
        error: err,
    });
};
const errorHandler = (err, req, res, next) => {
    devError(err, res);
};
exports.errorHandler = errorHandler;
