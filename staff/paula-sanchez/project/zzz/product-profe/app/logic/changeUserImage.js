import { data } from '../data'
import { validate, SystemError, AuthError, errorMap } from 'com'

export function changeUserImage(image) {
    if (data.getToken() === null) throw new AuthError('user not logged in')

    validate.url(image, 'image')

    return fetch(`${import.meta.env.VITE_API_URL}/users/me/image`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${data.getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image })
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