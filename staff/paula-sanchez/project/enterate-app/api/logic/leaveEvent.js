import { ExistenceError, validate } from 'com'
import { data } from '../data/index.js'

// Idempotente: cancelar asistencia sin estar apuntado no lanza error.
export function leaveEvent(userId, eventId) {
    validate.id(userId, 'userId')
    validate.id(eventId, 'eventId')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            return data.removeAttendee(eventId, userId)
        })
}
