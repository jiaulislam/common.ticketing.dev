"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyExistsError = void 0;
const base_error_1 = require("./base-error");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class AlreadyExistsError extends base_error_1.CustomError {
    constructor(message) {
        super('Object already exists');
        this.statusCode = http_status_codes_1.default.BAD_REQUEST;
        this.reason = 'Object already exists';
        // Set the prototype explicitly.
        if (message) {
            this.reason = message;
        }
        Object.setPrototypeOf(this, AlreadyExistsError.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}
exports.AlreadyExistsError = AlreadyExistsError;
