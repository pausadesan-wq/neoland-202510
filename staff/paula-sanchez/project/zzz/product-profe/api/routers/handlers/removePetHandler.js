import { logic } from '../../logic/index.js'

export const removePetHandler = (req, res, next) => {
    try {
        const { userId, params: { petId } } = req

        logic.removePet(userId, petId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}