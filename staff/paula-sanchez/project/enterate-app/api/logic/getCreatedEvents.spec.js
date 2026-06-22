import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData, EventData } from '../data/index.js'
import { logic, Event } from './index.js'
import { ExistenceError } from 'com'

function sampleEventData(ownerId, title) {
    return new EventData(null, ownerId, title, 'Descripción larga suficiente para pasar validación mínima.', new Date('2026-08-25'), '21:00', 'Sala', null, null, 'Música', ['Interior'], 'Gratis', null, 'https://images.unsplash.com/x', 'Boca a boca', null)
}

describe('getCreatedEvents', () => {
    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null
    let userId = null
    let otherUserId = null

    beforeEach(() => Promise.all([data.deleteAllUsers(), data.deleteAllEvents()])
        .then(() => bcrypt.hash('123123123', 10))
        .then(hash => {
            hashed = hash
            return Promise.all([
                data.insertUser(new UserData(null, 'Mi Ke', 'mi@ke.com', 'mike', hashed, null, 'regular')),
                data.insertUser(new UserData(null, 'Otro', 'otro@ke.com', 'otro', hashed, null, 'regular'))
            ])
        })
        .then(() => Promise.all([
            data.findUserByEmail('mi@ke.com'),
            data.findUserByEmail('otro@ke.com')
        ]))
        .then(([mike, otro]) => {
            userId = mike.id
            otherUserId = otro.id
        })
    )

    it('returns only the events created by the user (reusing owner)', () => {
        return Promise.all([
            data.insertEvent(sampleEventData(userId, 'Plan mío 1')),
            data.insertEvent(sampleEventData(userId, 'Plan mío 2')),
            data.insertEvent(sampleEventData(otherUserId, 'Plan ajeno'))
        ])
            .then(() => logic.getCreatedEvents(userId))
            .then(events => {
                expect(events).to.have.lengthOf(2)
                events.forEach(e => expect(e).to.be.instanceOf(Event))
                const titles = events.map(e => e.title).sort()
                expect(titles).to.deep.equal(['Plan mío 1', 'Plan mío 2'])
            })
    })

    it('returns empty when the user has created nothing', () => {
        return logic.getCreatedEvents(userId)
            .then(events => expect(events).to.deep.equal([]))
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.getCreatedEvents('012345678901234567890123')
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('user not found')
            })
    })

    afterEach(() => Promise.all([data.deleteAllUsers(), data.deleteAllEvents()]))

    after(() => disconnect())
})
