import { SystemError } from 'com'
import { EventModel } from '../mongoose/index.js'

// $set explícito con solo los campos editables. NO toca owner ni attendees.
export function updateEvent(eventData) {
    const { id, title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl } = eventData

    return EventModel.updateOne(
        { _id: id },
        { $set: { title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl } }
    )
        .catch(error => { throw new SystemError(error.message) })
        .then(result => { })
}
