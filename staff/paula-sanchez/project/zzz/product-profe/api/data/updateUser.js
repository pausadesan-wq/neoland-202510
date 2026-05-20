import { SystemError } from 'com'
import { UserModel } from '../mongoose/index.js'

export function updateUser(userData) {
    return UserModel.updateOne({ _id: userData.id }, { $set: userData })
        .catch(error => { throw new SystemError(error.message) })
        .then(userModel => { })
}