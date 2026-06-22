import { ExistenceError, validate } from 'com'
import { data } from '../data/index.js'
import { Event } from './models/index.js'

export function getEvent(eventId) {
    validate.id(eventId, 'eventId')

    return data.findEventById(eventId)
        .then(eventData => {
            if (!eventData) throw new ExistenceError('event not found')

            const { id, ownerId, title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl, attendees } = eventData

            return new Event(id, ownerId, title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl, attendees)
        })
}
