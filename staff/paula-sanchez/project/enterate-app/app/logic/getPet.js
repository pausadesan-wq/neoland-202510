import { data } from '../data'
import { validate, SystemError, AuthError, errorMap } from 'com'

export function getPet(petId) {
    if (data.getToken() === null) throw new AuthError('user not logged in')

    validate.id(petId, 'petId')

    return fetch(`${import.meta.env.VITE_API_URL}/pets/${petId}`, {
        headers: {
            Authorization: `Bearer ${data.getToken()}`
        }
    })
        .catch(error => { throw new SystemError('connection error') })
        .then(res => {
            const { status } = res

            if (status === 200)
                return res.json()
                    .catch(error => { throw new SystemError('json error') })
                    .then(pet => pet)

            return res.json()
                .catch(error => { throw new SystemError('json error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errorMap[error] || SystemError

                    throw new constructor(message)
                })
        })
}