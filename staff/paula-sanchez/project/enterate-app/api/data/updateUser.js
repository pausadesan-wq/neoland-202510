import { SystemError } from 'com'
import { UserModel } from '../mongoose/index.js'

// $set explícito con solo los campos editables de perfil. NO toca savedEvents ni role.
export function updateUser(userData) {
    const { id, name, email, username, password, image } = userData

    return UserModel.updateOne(
        { _id: id },
        { $set: { name, email, username, password, image } }
    )
        .catch(error => { throw new SystemError(error.message) })
        .then(userModel => { })
}
