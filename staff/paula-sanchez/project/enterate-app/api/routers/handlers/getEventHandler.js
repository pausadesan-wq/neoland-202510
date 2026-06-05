import { logic } from '../../logic/index.js'

export const getEventHandler = (req, res, next) => {
    try {
        const { params: { eventId } } = req

        logic.getEvent(eventId)
            .then(event => res.json(event))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}
