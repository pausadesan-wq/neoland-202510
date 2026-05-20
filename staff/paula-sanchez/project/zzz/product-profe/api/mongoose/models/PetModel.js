import { model } from 'mongoose'
import { petSchema } from '../schemas/index.js'

export const PetModel = model('Pet', petSchema)