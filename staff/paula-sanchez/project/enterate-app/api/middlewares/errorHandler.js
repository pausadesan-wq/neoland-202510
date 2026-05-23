import jwt from 'jsonwebtoken'

import { DuplicityError, ExistenceError, OwnershipError, SystemError, ValidationError, CredentialError, AuthError } from 'com'

const { JsonWebTokenError } = jwt

export const errorHandler = (error, req, res, next) => {
    let status = 500
    let errorName = error.constructor.name

    let { message } = error

    if (error instanceof ValidationError)
        status = 400
    else if (error instanceof DuplicityError)
        status = 409
    else if (error instanceof ExistenceError)
        status = 404
    else if (error instanceof CredentialError)
        status = 401
    else if (error instanceof OwnershipError)
        status = 403
    else if (error instanceof JsonWebTokenError) {
        status = 401
        errorName = AuthError.name
    } else if (error instanceof SyntaxError && error.message.includes('token')) {
        status = 401
        errorName = AuthError.name
        message = 'invalid json payload in token'
    } else
        errorName = SystemError.name

    res.status(status).json({ error: errorName, message })
}
