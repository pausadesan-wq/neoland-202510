import { logic } from '../../logic/index.js'

export const changeUserNameHandler = (req, res, next) => {
    try {
        const { userId, body: { name } } = req

        logic.changeUserName(userId, name)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}