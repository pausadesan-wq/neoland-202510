import { ExistenceError, OwnershipError, validate } from 'com'
import { data } from '../data/index.js'

export function removeEvent(userId, eventId) {
    validate.id(userId, 'userId')
    validate.id(eventId, 'eventId')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            return data.findEventById(eventId)
        })
        .then(eventData => {
            if (!eventData) throw new ExistenceError('event not found')

            if (eventData.ownerId !== userId) throw new OwnershipError('user not owner of event')

            return data.deleteEvent(eventId)
        })
}
