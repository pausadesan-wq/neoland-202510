import { SystemError } from 'com'
import { UserModel } from '../mongoose/index.js'

export function insertUser(userData) {
    const userModel = new UserModel(userData)

    return userModel.save()
        .catch(error => { throw new SystemError(error.message) })
        .then(userModel => { })
}