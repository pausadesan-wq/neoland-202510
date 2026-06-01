import { data } from '../data'
import { validate, SystemError, AuthError, ValidationError, errorMap, EVENT_CATEGORIES, EVENT_PRICE_TYPES, EVENT_SOURCE_TYPES } from 'com'

export function modifyEvent(eventId, title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl) {
    if (data.getToken() === null) throw new AuthError('user not logged in')

    validate.id(eventId, 'eventId')
    validate.text(title, 'title', 4, 120)
    validate.text(description, 'description', 20, 800)
    validate.date(date, 'date')
    validate.time(time, 'time')
    validate.text(location, 'location', 2, 120)
    if (address !== null && address !== undefined && address !== '') validate.text(address, 'address', 1, 160)
    if (district !== null && district !== undefined && district !== '') validate.text(district, 'district', 1, 80)
    validate.enum(category, EVENT_CATEGORIES, 'category')
    validate.tags(tags, 'tags', 1, 5)
    validate.enum(priceType, EVENT_PRICE_TYPES, 'priceType')

    if (priceType === 'De pago') {
        if (typeof price !== 'string' || price.trim().length === 0) throw new ValidationError('invalid price length')
    }

    validate.url(image, 'image')
    validate.enum(sourceType, EVENT_SOURCE_TYPES, 'sourceType')
    if (sourceUrl !== null && sourceUrl !== undefined && sourceUrl !== '') validate.url(sourceUrl, 'sourceUrl')

    const body = {
        title,
        description,
        date,
        time,
        location,
        address: address || null,
        district: district || null,
        category,
        tags,
        priceType,
        price: priceType === 'De pago' ? price : null,
        image,
        sourceType,
        sourceUrl: sourceUrl || null
    }

    return fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${data.getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .catch(error => { throw new SystemError('connection error') })
        .then(res => {
            const { status } = res

            if (status === 204)
                return

            return res.json()
                .catch(error => { throw new SystemError('json error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errorMap[error] || SystemError

                    throw new constructor(message)
                })
        })
}
