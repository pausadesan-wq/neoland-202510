import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { logic } from './index.js'
import { ExistenceError, CredentialError } from 'com'

describe('changeUserPassword', () => {
    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null

    beforeEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllPets(),
        bcrypt.hash('123123123', 10).then(hash => hashed = hash)
    ]))

    it('succeeds on existing user', () => {
        return data.insertUser(new UserData(null, 'Mi Ke', 'mi@ke.com', 'mike', hashed, null, 'regular'))
            .then(() => data.findUserByEmail('mi@ke.com'))
            .then(userData => logic.changeUserPassword(userData.id, '123123123', '234234234', '234234234'))
            .then(() => data.findUserByEmail('mi@ke.com'))
            .then(userData => {
                expect(userData.name).to.equal('Mi Ke')
                expect(userData.email).to.equal('mi@ke.com')
                expect(userData.username).to.equal('mike')
                expect(userData.role).to.equal('regular')
                expect(userData.image).to.be.null

                return bcrypt.compare('234234234', userData.password)
            })
            .then(match => expect(match).to.be.true)
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.changeUserPassword('012345678901234567890123', '123123123', '234234234', '234234234')
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('user not found')
            })
    })

    it('fails on wrong password', () => {
        let caught = null

        return data.insertUser(new UserData(null, 'Mi Ke', 'mi@ke.com', 'mike', hashed, null, 'regular'))
            .then(() => data.findUserByEmail('mi@ke.com'))
            .then(userData => logic.changeUserPassword(userData.id, '123123123_', '234234234', '234234234'))
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(CredentialError)
                expect(caught.message).to.equal('incorrect password')
            })
    })

    afterEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllPets()
    ]))

    after(() => disconnect())
})