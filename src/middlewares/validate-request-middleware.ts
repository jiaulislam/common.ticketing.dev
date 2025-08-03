import {Request, Response, NextFunction} from "express";
import {validationResult, FieldValidationError, ValidationError} from "express-validator";
import {RequestValidationError} from "../errors";


export const validateRequestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array().filter((err: ValidationError): err is FieldValidationError => err.type === 'field'));
  }
  next();
}