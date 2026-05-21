import { logic } from '../../logic/index.js'

export const modifyPetHandler = (req, res, next) => {
    try {
        const { userId, params: { petId }, body: { name, birthdate, weight, image } } = req

        logic.modifyPet(userId, petId, name, birthdate, weight, image)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}