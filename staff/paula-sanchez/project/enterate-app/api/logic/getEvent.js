import { ExistenceError, OwnershipError, validate } from 'com'
import { data } from '../data/index.js'
import { Event } from './models/index.js'

export function getEvent(userId, eventId) {
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

            const { id, ownerId, name, birthdate, weight, image } = eventData

            return new Event(id, ownerId, name, birthdate, weight, image)
        })
}
