import { SystemError } from 'com'
import { EventModel } from '../mongoose/index.js'

// Idempotente: $addToSet evita duplicados.
export function addAttendee(eventId, userId) {
    return EventModel.updateOne({ _id: eventId }, { $addToSet: { attendees: userId } })
        .catch(error => { throw new SystemError(error.message) })
        .then(result => { })
}
