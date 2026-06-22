import { SystemError } from 'com'
import { UserModel } from '../mongoose/index.js'
import { EventData } from './models/index.js'

// Devuelve los eventos guardados por el usuario (populate).
export function findSavedEventsByUserId(userId) {
    return UserModel.findById(userId).populate('savedEvents')
        .catch(error => { throw new SystemError(error.message) })
        .then(userModel => {
            if (!userModel) return null

            return userModel.savedEvents
                .filter(eventModel => eventModel)
                .map(eventModel => {
                    const { id, owner, title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl, attendees } = eventModel

                    return new EventData(id, owner.toString(), title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl, attendees.map(a => a.toString()))
                })
        })
}
