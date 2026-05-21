import { logic } from '../../logic/index.js'

export const getPetsHandler = (req, res, next) => {
    try {
        const { userId } = req

        logic.getPets(userId)
            .then(pets => res.json(pets))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}