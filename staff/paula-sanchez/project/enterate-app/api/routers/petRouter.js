import { Router } from 'express'

import { authMiddleware } from '../middlewares/index.js'

import {
    addPetHandler,
    getPetsHandler,
    removePetHandler,
    getPetHandler,
    modifyPetHandler
} from './handlers/index.js'

export const petRouter = new Router()

petRouter.post('', authMiddleware, addPetHandler)
petRouter.get('', authMiddleware, getPetsHandler)
petRouter.delete('/:petId', authMiddleware, removePetHandler)
petRouter.get('/:petId', authMiddleware, getPetHandler)
petRouter.put('/:petId', authMiddleware, modifyPetHandler)