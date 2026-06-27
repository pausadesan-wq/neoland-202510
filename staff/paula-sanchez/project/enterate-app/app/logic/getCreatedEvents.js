import { data } from '../data'
import { SystemError, AuthError, errorMap } from 'com'

export function getCreatedEvents() {
    if (data.getToken() === null) throw new AuthError('user not logged in')

    return fetch(`${import.meta.env.VITE_API_URL}/users/me/created-events`, {
        headers: {
            Authorization: `Bearer ${data.getToken()}`
        }
    })
        .catch(error => { throw new SystemError('connection error') })
        .then(res => {
            if (res.status === 200)
                return res.json()
                    .catch(error => { throw new SystemError('json error') })

            return res.json()
                .catch(error => { throw new SystemError('json error') })
                .then(body => {
                    const constructor = errorMap[body.error] || SystemError
                    throw new constructor(body.message)
                })
        })
}
