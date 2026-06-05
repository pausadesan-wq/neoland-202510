import { data } from '../data'
import { validate, SystemError, errorMap } from 'com'

export function getEvent(eventId) {
    validate.id(eventId, 'eventId')

    const token = data.getToken()
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    return fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}`, {
        headers
    })
        .catch(error => { throw new SystemError('connection error') })
        .then(res => {
            const { status } = res

            if (status === 200)
                return res.json()
                    .catch(error => { throw new SystemError('json error') })
                    .then(event => event)

            return res.json()
                .catch(error => { throw new SystemError('json error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errorMap[error] || SystemError

                    throw new constructor(message)
                })
        })
}
