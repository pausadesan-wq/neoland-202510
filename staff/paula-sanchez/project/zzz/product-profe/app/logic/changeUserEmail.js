import { data } from '../data'
import { validate, SystemError, AuthError, errorMap } from 'com'

export function changeUserEmail(email, newEmail, newEmailRepeat) {
    if (data.getToken() === null) throw new AuthError('user not logged in')

    validate.email(email)
    validate.email(newEmail, 'newEmail')
    validate.email(newEmailRepeat, 'newEmailRepeat')
    validate.match(newEmail, newEmailRepeat, 'newEmail', 'newEmailRepeat')

    return fetch(`${import.meta.env.VITE_API_URL}/users/me/email`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${data.getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, newEmail, newEmailRepeat })
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