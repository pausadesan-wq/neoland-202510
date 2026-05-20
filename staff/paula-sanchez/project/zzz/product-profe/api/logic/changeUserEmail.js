import { ExistenceError, OwnershipError, validate } from 'com'
import { data, UserData } from '../data/index.js'

export function changeUserEmail(userId, email, newEmail, newEmailRepeat) {
    validate.id(userId, 'userId')
    validate.email(email)
    validate.email(newEmail, 'newEmail')
    validate.email(newEmailRepeat, 'newEmailRepeat')
    validate.match(newEmail, newEmailRepeat, 'newEmail', 'newEmailRepeat')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            if (userData.email !== email) throw new OwnershipError('email does not belong to user')

            return data.findUserByEmail(newEmail)
                .then(otherUserData => {
                    if (otherUserData) throw new OwnershipError('newEmail belongs to another user')

                    const { name, username, password, image, role } = userData

                    return data.updateUser(new UserData(userId, name, newEmail, username, password, image, role))
                })
        })
}