import { Router } from 'express'

import { authMiddleware } from '../middelwares/index.js'

import {
    registerUserHandler,
    authenticateUserHandler,
    changeUserEmailHandler,
    changeUserPasswordHandler,
    getUserHandler,
    changeUserImageHandler,
    changeUserNameHandler,
    changeUserUsernameHandler
} from './handlers/index.js'

export const userRouter = new Router()

userRouter.post('', registerUserHandler)
userRouter.post('/auth', authenticateUserHandler)
userRouter.patch('/me/email', authMiddleware, changeUserEmailHandler)
userRouter.patch('/me/password', authMiddleware, changeUserPasswordHandler)
userRouter.get('/me', authMiddleware, getUserHandler)
userRouter.patch('/me/image', authMiddleware, changeUserImageHandler)
userRouter.patch('/me/name', authMiddleware, changeUserNameHandler)
userRouter.patch('/me/username', authMiddleware, changeUserUsernameHandler)