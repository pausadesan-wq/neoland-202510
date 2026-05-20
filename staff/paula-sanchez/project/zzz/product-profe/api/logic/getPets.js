import { ExistenceError, validate } from 'com'
import { data } from '../data/index.js'
import { Pet } from './models/index.js'

export function getPets(userId) {
    validate.id(userId, 'userId')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            return data.findPetsByUserId(userId)
        })
        .then(petDatas => petDatas.map(petData => {
            const { id, ownerId, name, birthdate, weight, image } = petData

            return new Pet(id, ownerId, name, birthdate, weight, image)
        }))
}