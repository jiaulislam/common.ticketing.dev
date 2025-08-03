"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequestMiddleware = void 0;
const express_validator_1 = require("express-validator");
const errors_1 = require("../errors");
const validateRequestMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new errors_1.RequestValidationError(errors.array().filter((err) => err.type === 'field'));
    }
    next();
};
exports.validateRequestMiddleware = validateRequestMiddleware;
