import { DuplicityError, ExistenceError, validate } from 'com'
import { data, UserData } from '../data/index.js'

export function changeUserUsername(userId, username) {
    validate.id(userId, 'userId')
    validate.username(username)

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            if (userData.username === username) return

            return data.findUserByUsername(username)
                .then(otherUserData => {
                    if (otherUserData) throw new DuplicityError('username already exists')

                    const { name, email, password, image, role } = userData

                    return data.updateUser(new UserData(userId, name, email, username, password, image, role))
                })
        })
}