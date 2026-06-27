import { data } from '../data'
import { validate, SystemError, AuthError, errorMap } from 'com'

export function leaveEvent(eventId) {
    if (data.getToken() === null) throw new AuthError('user not logged in')

    validate.id(eventId, 'eventId')

    return fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}/attendees/me`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${data.getToken()}`
        }
    })
        .catch(error => { throw new SystemError('connection error') })
        .then(res => {
            if (res.status === 204) return

            return res.json()
                .catch(error => { throw new SystemError('json error') })
                .then(body => {
                    const constructor = errorMap[body.error] || SystemError
                    throw new constructor(body.message)
                })
        })
}
