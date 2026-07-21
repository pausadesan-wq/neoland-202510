import { ExistenceError, OwnershipError, ValidationError, validate, EVENT_CATEGORIES, EVENT_PRICE_TYPES, EVENT_SOURCE_TYPES } from 'com'
import { data, EventData } from '../data/index.js'

export function modifyEvent(userId, eventId, title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl) {
    validate.id(userId, 'userId')
    validate.id(eventId, 'eventId')
    validate.text(title, 'title', 4, 120)
    validate.text(description, 'description', 20, 800)
    validate.date(date, 'date')
    validate.time(time, 'time')
    validate.text(location, 'location', 2, 120)
    if (address !== null && address !== undefined) validate.text(address, 'address', 1, 160)
    if (district !== null && district !== undefined) validate.text(district, 'district', 1, 80)
    validate.enum(category, EVENT_CATEGORIES, 'category')
    validate.tags(tags, 'tags', 1, 5)
    validate.enum(priceType, EVENT_PRICE_TYPES, 'priceType')

    if (priceType === 'De pago') {
        if (typeof price !== 'string' || price.trim().length === 0) throw new ValidationError('invalid price length')
    }

    // La imagen es opcional: solo validamos el formato si el usuario escribe algo.
    if (image !== null && image !== undefined && image !== '') validate.url(image, 'image')
    validate.enum(sourceType, EVENT_SOURCE_TYPES, 'sourceType')
    if (sourceUrl !== null && sourceUrl !== undefined && sourceUrl !== '') validate.url(sourceUrl, 'sourceUrl')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            return data.findEventById(eventId)
        })
        .then(eventData => {
            if (!eventData) throw new ExistenceError('event not found')

            if (eventData.ownerId !== userId) throw new OwnershipError('user not owner of event')

            return data.updateEvent(new EventData(
                eventId,
                userId,
                title,
                description,
                date,
                time,
                location,
                address ?? null,
                district ?? null,
                category,
                tags,
                priceType,
                priceType === 'De pago' ? price : null,
                image,
                sourceType,
                sourceUrl || null
            ))
        })
}
