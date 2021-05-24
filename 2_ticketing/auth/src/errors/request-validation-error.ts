import { BaseError } from './base-error'
import { ValidationError } from 'express-validator'

export class RequestValidationError extends BaseError {
    statusCode = 400

    constructor(private errors: ValidationError[]) {
        super('Validation failed!')

        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors() {
        return this.errors.map(err => {
            return {
                message: err.msg,
                field: err.param
            }
        })
    }
}
