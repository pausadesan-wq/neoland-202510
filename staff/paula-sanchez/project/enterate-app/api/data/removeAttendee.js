import { SystemError } from 'com'
import { EventModel } from '../mongoose/index.js'

// Idempotente: $pull no falla si no existe.
export function removeAttendee(eventId, userId) {
    return EventModel.updateOne({ _id: eventId }, { $pull: { attendees: userId } })
        .catch(error => { throw new SystemError(error.message) })
        .then(result => { })
}
