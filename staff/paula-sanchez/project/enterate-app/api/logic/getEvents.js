import { data } from '../data/index.js'
import { Event } from './models/index.js'

export function getEvents() {
    return data.findEvents()
        .then(eventDatas => eventDatas.map(eventData => {
            const { id, ownerId, title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl } = eventData

            return new Event(id, ownerId, title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl)
        }))
}
