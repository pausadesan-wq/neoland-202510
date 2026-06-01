import { SystemError } from 'com'
import { EventModel } from '../mongoose/index.js'

export function insertEvent(eventData) {
    const { ownerId, title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl } = eventData

    const eventModel = new EventModel({
        owner: ownerId,
        title,
        description,
        date,
        time,
        location,
        address,
        district,
        category,
        tags,
        priceType,
        price,
        image,
        sourceType,
        sourceUrl
    })

    return eventModel.save()
        .catch(error => { throw new SystemError(error.message) })
        .then(eventModel => { })
}
