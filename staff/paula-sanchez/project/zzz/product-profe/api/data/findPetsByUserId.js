import { SystemError } from 'com'
import { PetModel } from '../mongoose/index.js'
import { PetData } from './models/index.js'

export function findPetsByUserId(userId) {
    return PetModel.find({ owner: userId })
        .catch(error => { throw new SystemError(error.message) })
        .then(petModels => petModels.map(petModel => {
            const { id, owner, name, birthdate, weight, image } = petModel

            return new PetData(id, owner.toString(), name, birthdate, weight, image)
        }))
}