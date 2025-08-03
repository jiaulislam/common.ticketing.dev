"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const base_error_1 = require("./base-error");
class RequestValidationError extends base_error_1.CustomError {
    constructor(errors) {
        super('Invalid request parameters');
        this.errors = errors;
        this.statusCode = http_status_codes_1.default.BAD_REQUEST;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map((error) => {
            return {
                message: error.msg,
                field: error.path,
            };
        });
    }
}
exports.RequestValidationError = RequestValidationError;
