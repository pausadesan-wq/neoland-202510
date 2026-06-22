import { SystemError } from 'com'
import { UserModel } from '../mongoose/index.js'

// Idempotente: $pull no falla si no existe.
export function removeSavedEvent(userId, eventId) {
    return UserModel.updateOne({ _id: userId }, { $pull: { savedEvents: eventId } })
        .catch(error => { throw new SystemError(error.message) })
        .then(result => { })
}
