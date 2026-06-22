import { SystemError } from 'com'
import { UserModel } from '../mongoose/index.js'

// Idempotente: $addToSet evita duplicados.
export function addSavedEvent(userId, eventId) {
    return UserModel.updateOne({ _id: userId }, { $addToSet: { savedEvents: eventId } })
        .catch(error => { throw new SystemError(error.message) })
        .then(result => { })
}
