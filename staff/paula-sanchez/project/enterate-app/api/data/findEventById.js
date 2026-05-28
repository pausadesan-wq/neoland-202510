import { SystemError } from 'com'
import { EventModel } from '../mongoose/index.js'
import { EventData } from './models/index.js'

export function findEventById(eventId) {
    return EventModel.findById(eventId)
        .catch(error => { throw new SystemError(error.message) })
        .then(eventModel => {
            if (!eventModel) return null

            const { id, owner, name, birthdate, weight, image } = eventModel

            return new EventData(id, owner.toString(), name, birthdate, weight, image)
        })
}
