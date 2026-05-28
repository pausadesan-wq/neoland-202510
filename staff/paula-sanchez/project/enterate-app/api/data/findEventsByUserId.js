import { SystemError } from 'com'
import { EventModel } from '../mongoose/index.js'
import { EventData } from './models/index.js'

export function findEventsByUserId(userId) {
    return EventModel.find({ owner: userId })
        .catch(error => { throw new SystemError(error.message) })
        .then(eventModels => eventModels.map(eventModel => {
            const { id, owner, name, birthdate, weight, image } = eventModel

            return new EventData(id, owner.toString(), name, birthdate, weight, image)
        }))
}
