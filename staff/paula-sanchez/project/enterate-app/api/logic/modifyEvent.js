import { ExistenceError, OwnershipError, validate } from 'com'
import { data, EventData } from '../data/index.js'

export function modifyEvent(userId, eventId, name, birthdate, weight, image) {
    validate.id(userId, 'userId')
    validate.id(eventId, 'eventId')
    validate.name(name)
    validate.date(birthdate, 'birthdate')
    validate.number(weight, 'weight')
    validate.url(image, 'image')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            return data.findEventById(eventId)
        })
        .then(eventData => {
            if (!eventData) throw new ExistenceError('event not found')

            if (eventData.ownerId !== userId) throw new OwnershipError('user not owner of event')

            return data.updateEvent(new EventData(eventId, userId, name, birthdate, weight, image))
        })
}
