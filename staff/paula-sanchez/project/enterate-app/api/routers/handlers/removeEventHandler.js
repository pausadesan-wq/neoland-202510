import { logic } from '../../logic/index.js'

export const removeEventHandler = (req, res, next) => {
    try {
        const { userId, params: { eventId } } = req

        logic.removeEvent(userId, eventId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}
