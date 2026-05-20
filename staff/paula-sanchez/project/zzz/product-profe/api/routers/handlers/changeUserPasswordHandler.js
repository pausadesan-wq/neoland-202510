import { logic } from '../../logic/index.js'

export const changeUserPasswordHandler = (req, res, next) => {
    try {
        const { userId, body: { password, newPassword, newPasswordRepeat } } = req

        logic.changeUserPassword(userId, password, newPassword, newPasswordRepeat)

        res.status(204).send()
    } catch (error) {
        next(error)
    }
}