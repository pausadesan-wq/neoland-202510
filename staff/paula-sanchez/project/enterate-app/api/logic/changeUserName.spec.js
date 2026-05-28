import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { logic } from './index.js'
import { ExistenceError } from 'com'

describe('changeUserName', () => {
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
            .then(userData => logic.changeUserName(userData.id, 'Mi Ke 2'))
            .then(() => data.findUserByEmail('mi@ke.com'))
            .then(userData => {
                expect(userData.name).to.equal('Mi Ke 2')
                expect(userData.email).to.equal('mi@ke.com')
                expect(userData.username).to.equal('mike')
                expect(userData.password).to.equal(hashed)
                expect(userData.role).to.equal('regular')
                expect(userData.image).to.be.null
            })
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.changeUserName('012345678901234567890123', 'Mi Ke 2')
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