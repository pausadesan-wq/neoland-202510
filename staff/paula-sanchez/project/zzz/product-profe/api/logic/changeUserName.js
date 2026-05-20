import { ExistenceError, validate } from 'com'
import { data, UserData } from '../data/index.js'

export function changeUserName(userId, name) {
    validate.id(userId, 'userId')
    validate.name(name)

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            const { email, username, password, image, role } = userData

            return data.updateUser(new UserData(userId, name, email, username, password, image, role))
        })
}