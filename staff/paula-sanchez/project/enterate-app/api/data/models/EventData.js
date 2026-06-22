export class EventData {
    constructor(id, ownerId, title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl, attendees = []) {
        this.id = id
        this.ownerId = ownerId
        this.title = title
        this.description = description
        this.date = date
        this.time = time
        this.location = location
        this.address = address
        this.district = district
        this.category = category
        this.tags = tags
        this.priceType = priceType
        this.price = price
        this.image = image
        this.sourceType = sourceType
        this.sourceUrl = sourceUrl
        this.attendees = attendees
    }
}
