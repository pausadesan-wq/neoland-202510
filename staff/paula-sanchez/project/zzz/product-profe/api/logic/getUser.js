import { ExistenceError, validate } from 'com'
import { data } from '../data/index.js'
import { User } from './models/index.js'

export function getUser(userId) {
    validate.id(userId, 'userId')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            const { name, email, username, image, role } = userData

            return new User(userId, name, email, username, image, role)
        })
}