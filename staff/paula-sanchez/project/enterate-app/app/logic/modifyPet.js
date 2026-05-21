import { data } from '../data'
import { validate, SystemError, AuthError, errorMap } from 'com'

export function modifyPet(petId, name, birthdate, weight, image) {
    if (data.getToken() === null) throw new AuthError('user not logged in')

    validate.id(petId, 'petId')
    validate.name(name)
    validate.date(birthdate, 'birthdate')
    validate.number(weight, 'weight')
    validate.url(image, 'image')

    return fetch(`${import.meta.env.VITE_API_URL}/pets/${petId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${data.getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, birthdate, weight, image })
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