import { SystemError } from 'com'
import { PetModel } from '../mongoose/index.js'
import { PetData } from './models/index.js'

export function findPetById(petId) {
    return PetModel.findById(petId)
        .catch(error => { throw new SystemError(error.message) })
        .then(petModel => {
            if (!petModel) return null

            const { id, owner, name, birthdate, weight, image } = petModel

            return new PetData(id, owner.toString(), name, birthdate, weight, image)
        })
}