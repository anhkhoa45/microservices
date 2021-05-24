import { BaseError } from './base-error'

export class NotFoundError extends BaseError {
    statusCode = 404

    constructor() {
        super('404 not found')

        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors() {
        return [{
            message: '404 not found'
        }]
    }
}
