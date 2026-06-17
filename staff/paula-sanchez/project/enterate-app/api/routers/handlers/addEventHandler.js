import { logic } from '../../logic/index.js'

export const addEventHandler = (req, res, next) => {
    try {
        const { userId, body: { title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl } } = req

        logic.addEvent(userId, title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl)
            .then(eventId => res.status(201).json({ id: eventId }))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}
