import { logic } from '../../logic/index.js'

export const saveEventHandler = (req, res, next) => {
    try {
        const { userId, params: { eventId } } = req

        logic.saveEvent(userId, eventId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}
