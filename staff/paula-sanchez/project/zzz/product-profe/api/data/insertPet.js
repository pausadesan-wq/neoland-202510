import { SystemError } from 'com'
import { PetModel } from '../mongoose/index.js'

export function insertPet(petData) {
    const { ownerId, name, birthdate, weight, image } = petData

    const petModel = new PetModel({ owner: ownerId, name, birthdate, weight, image })

    return petModel.save()
        .catch(error => { throw new SystemError(error.message) })
        .then(petModel => { })
}