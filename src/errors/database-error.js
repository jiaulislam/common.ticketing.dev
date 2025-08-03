"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = void 0;
const base_error_1 = require("./base-error");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class DatabaseError extends base_error_1.CustomError {
    constructor() {
        super('Database connection error');
        this.statusCode = http_status_codes_1.default.INTERNAL_SERVER_ERROR;
        this.reason = 'Database connection error';
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, DatabaseError.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}
exports.DatabaseError = DatabaseError;
