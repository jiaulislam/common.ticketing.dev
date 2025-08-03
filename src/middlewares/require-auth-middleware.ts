import {Request, Response, NextFunction} from "express";
import {NotAuthenticatedError} from "../errors";

export const requireAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        throw new NotAuthenticatedError();
    }
    next();
}