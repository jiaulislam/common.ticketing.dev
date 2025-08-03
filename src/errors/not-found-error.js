"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const base_error_1 = require("./base-error");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class NotFoundError extends base_error_1.CustomError {
    constructor() {
        super('Resource not found');
        this.statusCode = http_status_codes_1.default.NOT_FOUND;
        this.reason = 'Resource not found';
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}
exports.NotFoundError = NotFoundError;
