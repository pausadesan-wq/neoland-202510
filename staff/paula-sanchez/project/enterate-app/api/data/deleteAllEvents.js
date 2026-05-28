import { SystemError } from 'com'
import { EventModel } from '../mongoose/index.js'

export function deleteAllEvents() {
    return EventModel.deleteMany()
        .catch(error => { throw new SystemError(error.message) })
        .then(result => { })
}
