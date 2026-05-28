import { SystemError } from 'com'
import { EventModel } from '../mongoose/index.js'

export function insertEvent(eventData) {
    const { ownerId, name, birthdate, weight, image } = eventData

    const eventModel = new EventModel({ owner: ownerId, name, birthdate, weight, image })

    return eventModel.save()
        .catch(error => { throw new SystemError(error.message) })
        .then(eventModel => { })
}
