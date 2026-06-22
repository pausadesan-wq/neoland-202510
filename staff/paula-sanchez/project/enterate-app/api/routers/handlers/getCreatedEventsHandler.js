import { logic } from '../../logic/index.js'

export const getCreatedEventsHandler = (req, res, next) => {
    try {
        const { userId } = req

        logic.getCreatedEvents(userId)
            .then(events => res.json(events))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}
