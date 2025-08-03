"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const base_error_1 = require("./base-error");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class ValidationError extends base_error_1.CustomError {
    constructor() {
        super('Validation error');
        this.statusCode = http_status_codes_1.default.NOT_FOUND;
        this.reason = 'Validation error';
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}
exports.ValidationError = ValidationError;
