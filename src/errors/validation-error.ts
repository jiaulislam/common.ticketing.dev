import { CustomError } from './base-error';
import status from 'http-status-codes';

export class ValidationError extends CustomError {
    public statusCode: number = status.NOT_FOUND;
    reason = 'Validation error';

    constructor() {
        super('Validation error');
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}
