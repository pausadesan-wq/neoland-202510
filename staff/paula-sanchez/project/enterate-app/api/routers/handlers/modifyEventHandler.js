import { logic } from '../../logic/index.js'

export const modifyEventHandler = (req, res, next) => {
    try {
        const { userId, params: { eventId }, body: { name, birthdate, weight, image } } = req

        logic.modifyEvent(userId, eventId, name, birthdate, weight, image)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}
