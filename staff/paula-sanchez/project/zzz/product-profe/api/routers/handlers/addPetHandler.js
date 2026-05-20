import { logic } from '../../logic/index.js'

export const addPetHandler = (req, res, next) => {
    try {
        const { userId, body: { name, birthdate, weight, image } } = req

        logic.addPet(userId, name, birthdate, weight, image)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}