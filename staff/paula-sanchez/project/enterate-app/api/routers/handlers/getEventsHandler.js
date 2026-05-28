import { logic } from '../../logic/index.js'

export const getEventsHandler = (req, res, next) => {
    try {
        const { userId } = req

        logic.getEvents(userId)
            .then(events => res.json(events))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}
