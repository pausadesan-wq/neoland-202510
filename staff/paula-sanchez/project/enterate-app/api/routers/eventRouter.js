import { Router } from 'express'

import { authMiddleware } from '../middlewares/index.js'

import {
    addEventHandler,
    getEventsHandler,
    removeEventHandler,
    getEventHandler,
    modifyEventHandler
} from './handlers/index.js'

export const eventRouter = new Router()

eventRouter.post('', authMiddleware, addEventHandler)
eventRouter.get('', authMiddleware, getEventsHandler)
eventRouter.delete('/:eventId', authMiddleware, removeEventHandler)
eventRouter.get('/:eventId', authMiddleware, getEventHandler)
eventRouter.put('/:eventId', authMiddleware, modifyEventHandler)
