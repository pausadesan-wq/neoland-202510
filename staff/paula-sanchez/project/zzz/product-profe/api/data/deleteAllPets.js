import { SystemError } from 'com'
import { PetModel } from '../mongoose/index.js'

export function deleteAllPets() {
    return PetModel.deleteMany()
        .catch(error => { throw new SystemError(error.message) })
        .then(result => { })
}