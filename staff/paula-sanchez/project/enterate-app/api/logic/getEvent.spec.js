import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData, EventData } from '../data/index.js'
import { logic, Event } from './index.js'
import { ExistenceError, OwnershipError } from 'com'

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

describe('getEvent', () => {
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
                    .then(() => data.findEventsByUserId(userData.id))
                    .then(eventsData => {
                        const [eventData] = eventsData

                        return logic.getEvent(userData.id, eventData.id)
                    })
                    .then(event => {
                        expect(event).to.be.instanceOf(Event)
                        expect(event.title).to.equal('Concierto en la Carbonería')
                        expect(event.category).to.equal('Música')
                        expect(event.priceType).to.equal('De pago')
                        expect(event.price).to.equal('10')
                        expect(event.tags).to.deep.equal(['Interior', 'Noche', 'Adultos'])
                        expect(event.sourceType).to.equal('Instagram')
                    })
            })
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.getEvent('012345678901234567890123', '012345678901234567890123')
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing event', () => {
        let caught = null

        return data.insertUser(new UserData(null, 'Mi Ke', 'mi@ke.com', 'mike', hashed, null, 'regular'))
            .then(() => data.findUserByEmail('mi@ke.com'))
            .then(userData => logic.getEvent(userData.id, '012345678901234567890123'))
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('event not found')
            })
    })

    it('fails on existing user and existing event from another user', () => {
        let caught = null

        return Promise.all([
            data.insertUser(new UserData(null, 'Mi Ke', 'mi@ke.com', 'mike', hashed, null, 'regular')),
            data.insertUser(new UserData(null, 'Mi Ke 2', 'mi@ke2.com', 'mike2', hashed, null, 'regular'))
        ])
            .then(() => data.findUserByEmail('mi@ke2.com'))
            .then(userData2 => {
                return data.insertEvent(sampleEventData(userData2.id))
                    .then(() => data.findEventsByUserId(userData2.id))
                    .then(eventsData => {
                        const [eventData] = eventsData

                        return data.findUserByEmail('mi@ke.com')
                            .then(userData => logic.getEvent(userData.id, eventData.id))
                    })
            })
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(OwnershipError)
                expect(caught.message).to.equal('user not owner of event')
            })
    })

    afterEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllEvents()
    ]))

    after(() => disconnect())
})
