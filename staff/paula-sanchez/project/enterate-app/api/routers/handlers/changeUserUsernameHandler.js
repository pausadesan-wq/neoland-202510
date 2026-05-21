import { logic } from '../../logic/index.js'

export const changeUserUsernameHandler = (req, res, next) => {
    try {
        const { userId, body: { username } } = req

        logic.changeUserUsername(userId, username)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}