import { SystemError } from 'com'
import { EventModel } from '../mongoose/index.js'

export function deleteEvent(eventId) {
    return EventModel.deleteOne({ _id: eventId })
        .catch(error => { throw new SystemError(error.message) })
        .then(result => { })
}
