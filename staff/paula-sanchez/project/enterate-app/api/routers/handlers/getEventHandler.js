import { logic } from '../../logic/index.js'

export const getEventHandler = (req, res, next) => {
    try {
        const { userId, params: { eventId } } = req

        logic.getEvent(userId, eventId)
            .then(event => res.json(event))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}
