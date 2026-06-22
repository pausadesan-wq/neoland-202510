import { logic } from '../../logic/index.js'

export const unsaveEventHandler = (req, res, next) => {
    try {
        const { userId, params: { eventId } } = req

        logic.unsaveEvent(userId, eventId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}
