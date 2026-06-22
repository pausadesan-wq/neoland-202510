import { logic } from '../../logic/index.js'

export const getSavedEventsHandler = (req, res, next) => {
    try {
        const { userId } = req

        logic.getSavedEvents(userId)
            .then(events => res.json(events))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}
