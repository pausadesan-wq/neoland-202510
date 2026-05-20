import { ExistenceError, OwnershipError, validate } from 'com'
import { data } from '../data/index.js'

export function removePet(userId, petId) {
    validate.id(userId, 'userId')
    validate.id(petId, 'petId')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            return data.findPetById(petId)
        })
        .then(petData => {
            if (!petData) throw new ExistenceError('pet not found')

            if (petData.ownerId !== userId) throw new OwnershipError('user not owner of pet')

            return data.deletePet(petId)
        })
}