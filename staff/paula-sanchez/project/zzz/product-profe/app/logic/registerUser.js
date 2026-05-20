import { validate, SystemError, errorMap } from 'com'

export function registerUser(name, email, username, password, passwordRepeat) {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.password(passwordRepeat, 'passwordRepeat')
    validate.match(password, passwordRepeat, 'password', 'passwordRepeat')

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, username, password, passwordRepeat })
    })
        .catch(error => { throw new SystemError('connection error') })
        .then(res => {
            const { status } = res

            if (status === 201)
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