import { CustomError } from './base-error';
import status from 'http-status-codes';

export class NotFoundError extends CustomError {
  public statusCode: number = status.NOT_FOUND;
  reason = 'Resource not found';

  constructor(reason: string = 'Resource not found') {
    super(reason);
    // Set the prototype explicitly.
    this.reason = reason;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
