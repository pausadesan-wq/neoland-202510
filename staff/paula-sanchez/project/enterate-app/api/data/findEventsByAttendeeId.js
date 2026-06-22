import { SystemError } from 'com'
import { EventModel } from '../mongoose/index.js'
import { EventData } from './models/index.js'

// Todos los eventos donde el usuario aparece como asistente.
export function findEventsByAttendeeId(userId) {
    return EventModel.find({ attendees: userId })
        .catch(error => { throw new SystemError(error.message) })
        .then(eventModels => eventModels.map(eventModel => {
            const { id, owner, title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl, attendees } = eventModel

            return new EventData(id, owner.toString(), title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl, attendees.map(a => a.toString()))
        }))
}
