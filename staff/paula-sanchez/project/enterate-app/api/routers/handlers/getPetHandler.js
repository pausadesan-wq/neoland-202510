import { logic } from '../../logic/index.js'

export const getPetHandler = (req, res, next) => {
    try {
        const { userId, params: { petId } } = req

        logic.getPet(userId, petId)
            .then(pet => res.json(pet))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}