import { SystemError } from 'com'
import { EventModel } from '../mongoose/index.js'

export function updateEvent(eventData) {
    return EventModel.updateOne({ _id: eventData.id }, { $set: eventData })
        .catch(error => { throw new SystemError(error.message) })
        .then(result => { })
}
