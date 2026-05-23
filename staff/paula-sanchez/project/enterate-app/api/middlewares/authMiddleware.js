import jwt from 'jsonwebtoken'

import { CredentialError } from 'com'

export const authMiddleware = (req, res, next) => {
    try {
        const authorization = req.headers.authorization

        if (!authorization) throw new CredentialError('missing authorization header')

        if (!authorization.startsWith('Bearer ')) throw new CredentialError('invalid authorization scheme')

        const token = authorization.slice(7).trim()

        if (!token) throw new CredentialError('missing token')

        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = userId

        next()
    } catch (error) {
        next(error)
    }
}
