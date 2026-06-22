import { Router } from 'express'

import { authMiddleware } from '../middlewares/index.js'

import {
    registerUserHandler,
    authenticateUserHandler,
    changeUserEmailHandler,
    changeUserPasswordHandler,
    getUserHandler,
    changeUserImageHandler,
    changeUserNameHandler,
    changeUserUsernameHandler,
    saveEventHandler,
    unsaveEventHandler,
    getSavedEventsHandler,
    getJoinedEventsHandler,
    getCreatedEventsHandler
} from './handlers/index.js'

export const userRouter = new Router()

userRouter.post('', registerUserHandler)
userRouter.post('/auth', authenticateUserHandler)

userRouter.get('/me', authMiddleware, getUserHandler)
userRouter.patch('/me/email', authMiddleware, changeUserEmailHandler)
userRouter.patch('/me/password', authMiddleware, changeUserPasswordHandler)
userRouter.patch('/me/image', authMiddleware, changeUserImageHandler)
userRouter.patch('/me/name', authMiddleware, changeUserNameHandler)
userRouter.patch('/me/username', authMiddleware, changeUserUsernameHandler)

// === MIS PLANES ===
userRouter.get('/me/saved-events', authMiddleware, getSavedEventsHandler)
userRouter.post('/me/saved-events/:eventId', authMiddleware, saveEventHandler)
userRouter.delete('/me/saved-events/:eventId', authMiddleware, unsaveEventHandler)
userRouter.get('/me/joined-events', authMiddleware, getJoinedEventsHandler)
userRouter.get('/me/created-events', authMiddleware, getCreatedEventsHandler)
