import { CustomError } from './base-error';
import status from 'http-status-codes';

export class ValidationError extends CustomError {
    public statusCode: number = status.BAD_REQUEST;
    reason = 'Validation error';

    constructor(reason: string = 'Validation error') {
        super(reason);
        this.reason = reason;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}
