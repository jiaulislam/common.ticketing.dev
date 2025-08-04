import {Request, Response, NextFunction} from "express";
import {validationResult, FieldValidationError, Result} from "express-validator";
import {RequestValidationError} from "../errors";


export const validateRequestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req) as Result<FieldValidationError>;
  if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
  }
  next();
}