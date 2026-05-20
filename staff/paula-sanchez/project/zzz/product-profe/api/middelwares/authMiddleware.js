import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = userId

        next()
    } catch (error) {
        next(error)
    }
}