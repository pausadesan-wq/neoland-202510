import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect, UserModel } from '../mongoose/index.js'
import { data, UserData, EventData } from '../data/index.js'
import { logic } from './index.js'
import { ExistenceError } from 'com'

function sampleEventData(ownerId) {
    return new EventData(
        null,
        ownerId,
        'Concierto en la Carbonería',
        'Concierto acústico en la sala Carbonería del Realejo.',
        new Date('2026-08-25'),
        '21:00',
        'Sala Carbonería',
        null,
        'Realejo',
        'Música',
        ['Interior', 'Noche'],
        'Gratis',
        null,
        'https://images.unsplash.com/photo-1',
        'Boca a boca',
        null
    )
}

describe('saveEvent', () => {
    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null
    let userId = null
    let eventId = null

    beforeEach(() => Promise.all([data.deleteAllUsers(), data.deleteAllEvents()])
        .then(() => bcrypt.hash('123123123', 10))
        .then(hash => {
            hashed = hash
            return data.insertUser(new UserData(null, 'Mi Ke', 'mi@ke.com', 'mike', hashed, null, 'regular'))
        })
        .then(() => data.findUserByEmail('mi@ke.com'))
        .then(userData => {
            userId = userData.id
            return data.insertEvent(sampleEventData(userId))
        })
        .then(id => { eventId = id })
    )

    it('saves an event for the user', () => {
        return logic.saveEvent(userId, eventId)
            .then(() => data.findUserById(userId))
            .then(userData => {
                expect(userData.savedEvents).to.have.lengthOf(1)
                expect(userData.savedEvents[0]).to.equal(eventId)
            })
    })

    it('does not duplicate when saving twice', () => {
        return logic.saveEvent(userId, eventId)
            .then(() => logic.saveEvent(userId, eventId))
            .then(() => data.findUserById(userId))
            .then(userData => expect(userData.savedEvents).to.have.lengthOf(1))
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.saveEvent('012345678901234567890123', eventId)
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('user not found')
            })
    })

    it('fails on non-existing event', () => {
        let caught = null

        return logic.saveEvent(userId, '012345678901234567890123')
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('event not found')
            })
    })

    afterEach(() => Promise.all([data.deleteAllUsers(), data.deleteAllEvents()]))

    after(() => disconnect())
})
