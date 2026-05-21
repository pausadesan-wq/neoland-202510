import { logic } from '../../logic/index.js'

export const changeUserImageHandler = (req, res, next) => {
    try {
        const { userId, body: { image } } = req

        logic.changeUserImage(userId, image)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}