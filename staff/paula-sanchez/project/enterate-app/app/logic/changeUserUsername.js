import { data } from '../data'
import { validate, SystemError, AuthError, errorMap } from 'com'

export function changeUserUsername(username) {
    if (data.getToken() === null) throw new AuthError('user not logged in')

    validate.username(username)

    return fetch(`${import.meta.env.VITE_API_URL}/users/me/username`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${data.getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    })
        .catch(error => { throw new SystemError('connection error') })
        .then(res => {
            const { status } = res

            if (status === 204)
                return

            return res.json()
                .catch(error => { throw new SystemError('json error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errorMap[error] || SystemError

                    throw new constructor(message)
                })
        })
}