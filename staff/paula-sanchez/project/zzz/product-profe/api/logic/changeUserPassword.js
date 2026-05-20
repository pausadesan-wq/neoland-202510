import bcrypt from 'bcryptjs'
import { ExistenceError, CredentialError, SystemError, validate } from 'com'
import { data, UserData } from '../data/index.js'

export function changeUserPassword(userId, password, newPassword, newPasswordRepeat) {
    validate.id(userId, 'userId')
    validate.password(password)
    validate.password(newPassword, 'newPassword')
    validate.password(newPasswordRepeat, 'newPasswordRepeat')
    validate.match(newPassword, newPasswordRepeat, 'newPassword', 'newPasswordRepeat')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            return bcrypt.compare(password, userData.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match) throw new CredentialError('incorrect password')

                    return bcrypt.hash(newPassword, 10)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(newHash => {
                            const { name, email, username, image, role } = userData

                            return data.updateUser(new UserData(userId, name, email, username, newHash, image, role))
                        })
                })
        })
}