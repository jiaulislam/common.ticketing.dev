import { CustomError } from './base-error';
import status from 'http-status-codes';

export class AlreadyExistsError extends CustomError {
  public statusCode: number = status.BAD_REQUEST;
  reason = 'Object already exists';

  constructor(reason: string = "Object already exists") {
    super(reason);
    // Set the prototype explicitly.
    this.reason = reason;
    Object.setPrototypeOf(this, AlreadyExistsError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
