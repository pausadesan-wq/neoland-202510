import { SystemError } from 'com'
import { PetModel } from '../mongoose/index.js'

export function deletePet(petId) {
    return PetModel.deleteOne({ _id: petId })
        .catch(error => { throw new SystemError(error.message) })
        .then(result => { })
}