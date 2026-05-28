import { ExistenceError, validate } from 'com'
import { data, EventData } from '../data/index.js'

export function addEvent(userId, name, birthdate, weight, image) {
    validate.id(userId, 'userId')
    validate.name(name)
    validate.date(birthdate, 'birthdate')
    validate.number(weight, 'weight')
    validate.url(image, 'image')

    return data.findUserById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            const event = new EventData(null, userId, name, birthdate, weight, image)

            return data.insertEvent(event)
        })
}
