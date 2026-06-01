import { SystemError } from 'com'
import { EventModel } from '../mongoose/index.js'
import { EventData } from './models/index.js'

export function findEventById(eventId) {
    return EventModel.findById(eventId)
        .catch(error => { throw new SystemError(error.message) })
        .then(eventModel => {
            if (!eventModel) return null

            const { id, owner, title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl } = eventModel

            return new EventData(id, owner.toString(), title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl)
        })
}
