import { ExistenceError, validate } from 'com'
import { data } from '../data/index.js'
import { Event } from './models/index.js'

export function getEvents(userId) {
    validate.id(userId, 'userId')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            return data.findEventsByUserId(userId)
        })
        .then(eventDatas => eventDatas.map(eventData => {
            const { id, ownerId, title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl } = eventData

            return new Event(id, ownerId, title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl)
        }))
}
