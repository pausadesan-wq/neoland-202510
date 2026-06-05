import { logic } from '../../logic/index.js'

export const getEventsHandler = (req, res, next) => {
    try {
        logic.getEvents()
            .then(events => res.json(events))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}
