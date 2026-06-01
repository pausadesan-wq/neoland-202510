import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData, EventData } from '../data/index.js'
import { logic, Event } from './index.js'
import { ExistenceError } from 'com'

function sampleEventData(ownerId) {
    return new EventData(
        null,
        ownerId,
        'Concierto en la Carbonería',
        'Concierto acústico en la sala Carbonería del Realejo.',
        new Date('2026-03-15'),
        '21:00',
        'Sala Carbonería',
        'Calle Cardenal Parrado 8',
        'Realejo',
        'Música',
        ['Interior', 'Noche', 'Adultos'],
        'De pago',
        '10',
        'https://images.unsplash.com/photo-1',
        'Instagram',
        'https://instagram.com/carboneria'
    )
}

describe('getEvents', () => {
    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null

    beforeEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllEvents(),
        bcrypt.hash('123123123', 10).then(hash => hashed = hash)
    ]))

    it('succeeds on existing user and event', () => {
        return data.insertUser(new UserData(null, 'Mi Ke', 'mi@ke.com', 'mike', hashed, null, 'regular'))
            .then(() => data.findUserByEmail('mi@ke.com'))
            .then(userData => {
                return data.insertEvent(sampleEventData(userData.id))
                    .then(() => logic.getEvents(userData.id))
                    .then(events => {
                        expect(events).to.have.lengthOf(1)

                        const [event] = events
                        expect(event).instanceOf(Event)
                        expect(event.ownerId).to.equal(userData.id)
                        expect(event.title).to.equal('Concierto en la Carbonería')
                        expect(event.category).to.equal('Música')
                        expect(event.priceType).to.equal('De pago')
                    })
            })
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.getEvents('012345678901234567890123')
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('user not found')
            })
    })

    afterEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllEvents()
    ]))

    after(() => disconnect())
})
