import { logic } from '../../logic/index.js'

export const getUserHandler = (req, res, next) => {
    try {
        const { userId } = req

        logic.getUser(userId)
            .then(user => res.json(user))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}