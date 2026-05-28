import { model } from 'mongoose'
import { eventSchema } from '../schemas/index.js'

export const EventModel = model('Event', eventSchema)
