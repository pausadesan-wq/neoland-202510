import { logic } from '../../logic/index.js'

export const modifyEventHandler = (req, res, next) => {
    try {
        const { userId, params: { eventId }, body: { title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl } } = req

        logic.modifyEvent(userId, eventId, title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}
