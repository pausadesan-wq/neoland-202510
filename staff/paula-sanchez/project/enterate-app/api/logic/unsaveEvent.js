import { ExistenceError, validate } from 'com'
import { data } from '../data/index.js'

// Idempotente: desguardar algo no guardado no lanza error.
export function unsaveEvent(userId, eventId) {
    validate.id(userId, 'userId')
    validate.id(eventId, 'eventId')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            return data.removeSavedEvent(userId, eventId)
        })
}
