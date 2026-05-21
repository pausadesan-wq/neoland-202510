import bcrypt from 'bcryptjs'
import { ExistenceError, CredentialError, SystemError, validate } from 'com'
import { data } from '../data/index.js'

export function authenticateUser(username, password) {
    validate.username(username)
    validate.password(password)

    return data.findUserByUsername(username)
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