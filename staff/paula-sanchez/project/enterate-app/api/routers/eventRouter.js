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

// === PÚBLICAS ===
eventRouter.get('', getEventsHandler)
eventRouter.get('/:eventId', getEventHandler)

// === PROTEGIDAS ===
eventRouter.post('', authMiddleware, addEventHandler)
eventRouter.put('/:eventId', authMiddleware, modifyEventHandler)
eventRouter.delete('/:eventId', authMiddleware, removeEventHandler)
