"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const base_error_1 = require("../errors/base-error");
const errorHandlerMiddleware = (err, _req, res, next) => {
    if (err instanceof base_error_1.CustomError) {
        return res.status(err.statusCode).json({
            errors: err.serializeErrors(),
        });
    }
    res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : {},
    });
    next();
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
