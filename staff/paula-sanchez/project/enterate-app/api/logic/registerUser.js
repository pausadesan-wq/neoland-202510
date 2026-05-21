import bcrypt from 'bcryptjs'
import { DuplicityError, SystemError, validate } from 'com'
import { data, UserData } from '../data/index.js'

export function registerUser(name, email, username, password, passwordRepeat) {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.password(passwordRepeat, 'passwordRepeat')
    validate.match(password, passwordRepeat, 'password', 'passwordRepeat')

    return data.findUserByEmail(email)
        .then(userData => {
            if (userData !== null) throw new DuplicityError('user email already exists')

            return data.findUserByUsername(username)
        })
        .then(userData => {
            if (userData !== null) throw new DuplicityError('user username already exists')

            return bcrypt.hash(password, 10)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(hash => {
            const userData = new UserData(null, name, email, username, hash, null, 'regular')

            return data.insertUser(userData)
        })
}