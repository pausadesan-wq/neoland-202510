import { logic } from '../../logic/index.js'

export const getJoinedEventsHandler = (req, res, next) => {
    try {
        const { userId } = req

        logic.getJoinedEvents(userId)
            .then(events => res.json(events))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}
