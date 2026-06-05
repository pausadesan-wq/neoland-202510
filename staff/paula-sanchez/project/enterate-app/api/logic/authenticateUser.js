import bcrypt from 'bcryptjs'
import { ExistenceError, CredentialError, SystemError, validate } from 'com'
import { data } from '../data/index.js'

export function authenticateUser(email, password) {
    validate.email(email)
    validate.password(password)

    return data.findUserByEmail(email)
        .then(userData => {
            if (userData === null) throw new ExistenceError('user not found')

            return bcrypt.compare(password, userData.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match) throw new CredentialError('incorrect password')

                    return userData.id
                })
        })
}
