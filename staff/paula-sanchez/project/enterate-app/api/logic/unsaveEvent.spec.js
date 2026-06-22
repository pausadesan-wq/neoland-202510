import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData, EventData } from '../data/index.js'
import { logic } from './index.js'
import { ExistenceError } from 'com'

function sampleEventData(ownerId) {
    return new EventData(null, ownerId, 'Concierto', 'Descripción larga suficiente para pasar validación mínima.', new Date('2026-08-25'), '21:00', 'Sala', null, null, 'Música', ['Interior'], 'Gratis', null, 'https://images.unsplash.com/x', 'Boca a boca', null)
}

describe('unsaveEvent', () => {
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

    it('removes a previously saved event', () => {
        return logic.saveEvent(userId, eventId)
            .then(() => logic.unsaveEvent(userId, eventId))
            .then(() => data.findUserById(userId))
            .then(userData => expect(userData.savedEvents).to.have.lengthOf(0))
    })

    it('does not fail when unsaving a non-saved event (idempotent)', () => {
        return logic.unsaveEvent(userId, eventId)
            .then(() => data.findUserById(userId))
            .then(userData => expect(userData.savedEvents).to.have.lengthOf(0))
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.unsaveEvent('012345678901234567890123', eventId)
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('user not found')
            })
    })

    afterEach(() => Promise.all([data.deleteAllUsers(), data.deleteAllEvents()]))

    after(() => disconnect())
})
