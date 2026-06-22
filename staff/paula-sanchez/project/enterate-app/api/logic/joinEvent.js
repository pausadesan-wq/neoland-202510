import { ExistenceError, validate } from 'com'
import { data } from '../data/index.js'

// Idempotente: apuntarse dos veces no duplica ni falla.
export function joinEvent(userId, eventId) {
    validate.id(userId, 'userId')
    validate.id(eventId, 'eventId')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            return data.findEventById(eventId)
        })
        .then(eventData => {
            if (!eventData) throw new ExistenceError('event not found')

            return data.addAttendee(eventId, userId)
        })
}
