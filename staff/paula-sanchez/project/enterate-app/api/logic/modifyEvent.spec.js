import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData, EventData } from '../data/index.js'
import { logic } from './index.js'
import { ExistenceError, OwnershipError } from 'com'

describe('modifyEvent', () => {
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
                return data.insertEvent(new EventData(null, userData.id, 'Tor Tuga', '2026-01-10', 2, 'https://image.com/123'))
                    .then(() => data.findEventsByUserId(userData.id))
                    .then(eventsData => {
                        const [eventData] = eventsData

                        return logic.modifyEvent(userData.id, eventData.id, 'Tor Tuga 2', '2026-01-11', 3, 'https://image.com/1234')
                            .then(() => data.findEventById(eventData.id))
                    })
                    .then(eventData => {
                        expect(eventData.name).to.equal('Tor Tuga 2')
                        expect(eventData.birthdate.getFullYear()).to.equal(2026)
                        expect(eventData.birthdate.getMonth()).to.equal(0)
                        expect(eventData.birthdate.getDate()).to.equal(11)
                        expect(eventData.weight).to.equal(3)
                        expect(eventData.image).to.equal('https://image.com/1234')
                    })
            })
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.modifyEvent('012345678901234567890123', '012345678901234567890123', 'Tor Tuga 2', '2026-01-11', 3, 'https://image.com/1234')
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
            .then(userData => logic.modifyEvent(userData.id, '012345678901234567890123', 'Tor Tuga 2', '2026-01-11', 3, 'https://image.com/1234'))
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
                return data.insertEvent(new EventData(null, userData2.id, 'Tor Tuga', '2026-01-10', 2, 'https://image.com/123'))
                    .then(() => data.findEventsByUserId(userData2.id))
                    .then(eventsData => {
                        const [eventData] = eventsData

                        return data.findUserByEmail('mi@ke.com')
                            .then(userData => logic.modifyEvent(userData.id, eventData.id, 'Tor Tuga 2', '2026-01-11', 3, 'https://image.com/1234'))
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
