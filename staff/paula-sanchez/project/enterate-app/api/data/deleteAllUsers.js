import { SystemError } from 'com'
import { UserModel } from '../mongoose/index.js'

export function deleteAllUsers() {
    return UserModel.deleteMany()
        .catch(error => { throw new SystemError(error.message) })
        .then(result => { })
}