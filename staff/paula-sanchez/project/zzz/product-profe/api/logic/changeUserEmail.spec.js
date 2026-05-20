import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { logic } from './index.js'
import { ExistenceError, OwnershipError } from 'com'

describe('changeUserEmail', () => {
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
            .then(userData => logic.changeUserEmail(userData.id, 'mi@ke.com', 'mi@ke2.com', 'mi@ke2.com'))
            .then(() => data.findUserByEmail('mi@ke2.com'))
            .then(userData => {
                expect(userData.name).to.equal('Mi Ke')
                expect(userData.email).to.equal('mi@ke2.com')
                expect(userData.username).to.equal('mike')
                expect(userData.password).to.equal(hashed)
                expect(userData.role).to.equal('regular')
                expect(userData.image).to.be.null
            })
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.changeUserEmail('012345678901234567890123', 'mi@ke.com', 'mi@ke2.com', 'mi@ke2.com')
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('user not found')
            })
    })

    it('fails on wrong email', () => {
        let caught = null

        return data.insertUser(new UserData(null, 'Mi Ke', 'mi@ke.com', 'mike', hashed, null, 'regular'))
            .then(() => data.findUserByEmail('mi@ke.com'))
            .then(userData => logic.changeUserEmail(userData.id, 'mi@ke3.com', 'mi@ke2.com', 'mi@ke2.com'))
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(OwnershipError)
                expect(caught.message).to.equal('email does not belong to user')
            })
    })

    it('fails on newEmail belonging to another user', () => {
        let caught = null

        return Promise.all([
            data.insertUser(new UserData(null, 'Mi Ke', 'mi@ke.com', 'mike', hashed, null, 'regular')),
            data.insertUser(new UserData(null, 'Mi Ke 2', 'mi@ke2.com', 'mike2', hashed, null, 'regular'))
        ])
            .then(() => data.findUserByEmail('mi@ke.com'))
            .then(userData => logic.changeUserEmail(userData.id, 'mi@ke.com', 'mi@ke2.com', 'mi@ke2.com'))
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(OwnershipError)
                expect(caught.message).to.equal('newEmail belongs to another user')
            })
    })

    afterEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllPets()
    ]))

    after(() => disconnect())
})