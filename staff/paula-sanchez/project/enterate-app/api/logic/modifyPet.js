import { ExistenceError, OwnershipError, validate } from 'com'
import { data, PetData } from '../data/index.js'

export function modifyPet(userId, petId, name, birthdate, weight, image) {
    validate.id(userId, 'userId')
    validate.id(petId, 'petId')
    validate.name(name)
    validate.date(birthdate, 'birthdate')
    validate.number(weight, 'weight')
    validate.url(image, 'image')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            return data.findPetById(petId)
        })
        .then(petData => {
            if (!petData) throw new ExistenceError('pet not found')

            if (petData.ownerId !== userId) throw new OwnershipError('user not owner of pet')

            return data.updatePet(new PetData(petId, userId, name, birthdate, weight, image))
        })
}