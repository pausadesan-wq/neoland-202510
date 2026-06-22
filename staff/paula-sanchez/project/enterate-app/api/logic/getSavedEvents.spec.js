import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData, EventData } from '../data/index.js'
import { logic, Event } from './index.js'
import { ExistenceError } from 'com'

function sampleEventData(ownerId, title) {
    return new EventData(null, ownerId, title, 'Descripción larga suficiente para pasar validación mínima.', new Date('2026-08-25'), '21:00', 'Sala', null, null, 'Música', ['Interior'], 'Gratis', null, 'https://images.unsplash.com/x', 'Boca a boca', null)
}

describe('getSavedEvents', () => {
    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null
    let userId = null

    beforeEach(() => Promise.all([data.deleteAllUsers(), data.deleteAllEvents()])
        .then(() => bcrypt.hash('123123123', 10))
        .then(hash => {
            hashed = hash
            return data.insertUser(new UserData(null, 'Mi Ke', 'mi@ke.com', 'mike', hashed, null, 'regular'))
        })
        .then(() => data.findUserByEmail('mi@ke.com'))
        .then(userData => { userId = userData.id })
    )

    it('returns the events saved by the user', () => {
        return Promise.all([
            data.insertEvent(sampleEventData(userId, 'Plan uno')),
            data.insertEvent(sampleEventData(userId, 'Plan dos'))
        ])
            .then(([id1, id2]) => Promise.all([
                logic.saveEvent(userId, id1),
                logic.saveEvent(userId, id2)
            ]))
            .then(() => logic.getSavedEvents(userId))
            .then(events => {
                expect(events).to.have.lengthOf(2)
                events.forEach(e => expect(e).to.be.instanceOf(Event))
                const titles = events.map(e => e.title).sort()
                expect(titles).to.deep.equal(['Plan dos', 'Plan uno'])
            })
    })

    it('returns empty array when nothing saved', () => {
        return logic.getSavedEvents(userId)
            .then(events => expect(events).to.deep.equal([]))
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.getSavedEvents('012345678901234567890123')
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('user not found')
            })
    })

    afterEach(() => Promise.all([data.deleteAllUsers(), data.deleteAllEvents()]))

    after(() => disconnect())
})
