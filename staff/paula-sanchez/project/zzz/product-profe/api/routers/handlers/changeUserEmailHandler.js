import { logic } from '../../logic/index.js'

export const changeUserEmailHandler = (req, res, next) => {
    try {
        const { userId, body: { email, newEmail, newEmailRepeat } } = req

        logic.changeUserEmail(userId, email, newEmail, newEmailRepeat)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}