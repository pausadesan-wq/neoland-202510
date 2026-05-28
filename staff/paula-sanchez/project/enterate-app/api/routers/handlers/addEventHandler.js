import { logic } from '../../logic/index.js'

export const addEventHandler = (req, res, next) => {
    try {
        const { userId, body: { name, birthdate, weight, image } } = req

        logic.addEvent(userId, name, birthdate, weight, image)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}
