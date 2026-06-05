import { data } from '../data'
import { SystemError, errorMap } from 'com'

export function getEvents() {
    const token = data.getToken()
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    return fetch(`${import.meta.env.VITE_API_URL}/events`, {
        method: 'GET',
        headers
    })
        .catch(error => { throw new SystemError('connection error') })
        .then(res => {
            const { status } = res

            if (status === 200)
                return res.json()
                    .catch(error => { throw new SystemError('json error') })
                    .then(events => events)

            return res.json()
                .catch(error => { throw new SystemError('json error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errorMap[error] || SystemError

                    throw new constructor(message)
                })
        })
}
