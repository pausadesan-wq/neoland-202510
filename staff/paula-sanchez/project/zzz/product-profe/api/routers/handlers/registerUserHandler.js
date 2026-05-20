import { logic } from '../../logic/index.js'

export const registerUserHandler = (req, res, next) => {
    try {
        const { name, email, username, password, passwordRepeat } = req.body

        logic.registerUser(name, email, username, password, passwordRepeat)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}