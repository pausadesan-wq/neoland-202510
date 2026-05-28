import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { logic } from './index.js'
import { ExistenceError } from 'com'

describe('addEvent', () => {
    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null

    beforeEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllEvents(),
        bcrypt.hash('123123123', 10).then(hash => hashed = hash)
    ]))


    it('succeeds on existing user', () => {
        return data.insertUser(new UserData(null, 'Mi Ke', 'mi@ke.com', 'mike', hashed, null, 'regular'))
            .then(() => data.findUserByEmail('mi@ke.com'))
            .then(userData => {
                return logic.addEvent(userData.id, 'Tor Tuga', '2026-01-10', 2, 'https://image.com/123')
                    .then(() => data.findEventsByUserId(userData.id))
                    .then(events => {
                        expect(events).to.have.lengthOf(1)

                        const [event] = events
                        expect(event.name).to.equal('Tor Tuga')
                        expect(event.birthdate.getFullYear()).to.equal(2026)
                        expect(event.birthdate.getMonth()).to.equal(0)
                        expect(event.birthdate.getDate()).to.equal(10)
                        expect(event.weight).to.equal(2)
                        expect(event.image).to.equal('https://image.com/123')
                    })
            })
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.addEvent('012345678901234567890123', 'Tor Tuga', '2026-01-10', 2, 'https://image.com/123')
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
