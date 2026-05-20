import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { logic } from './index.js'
import { DuplicityError } from 'com'

describe('registerUser', () => {
    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null

    beforeEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllPets(),
        bcrypt.hash('123123123', 10).then(hash => hashed = hash)
    ]))

    it('succeeds on a new user', () => {
        return logic.registerUser('Mi Ke', 'mi@ke.com', 'mike', '123123123', '123123123')
            .then(() => data.findUserByEmail('mi@ke.com'))
            .then(userData => {
                expect(userData).to.exist
                expect(userData.name).to.equal('Mi Ke')
                expect(userData.email).to.equal('mi@ke.com')
                expect(userData.username).to.equal('mike')

                return bcrypt.compare('123123123', userData.password)
            })
            .then(match => expect(match).to.be.true)
    })


    it('fails on existing user with same email', () => {
        let caught = null

        return data.insertUser(new UserData(null, 'Mi Ke', 'mi@ke.com', 'mike2', hashed, null, 'regular'))
            .then(() => logic.registerUser('Mi Ke', 'mi@ke.com', 'mike', '123123123', '123123123'))
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(DuplicityError)
                expect(caught.message).to.equal('user email already exists')
            })
    })

    it('fails on existing user with same username', () => {
        let caught = null

        return data.insertUser(new UserData(null, 'Mi Ke', 'mi@k2.com', 'mike', hashed, null, 'regular'))
            .then(() => logic.registerUser('Mi Ke', 'mi@ke.com', 'mike', '123123123', '123123123'))
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(DuplicityError)
                expect(caught.message).to.equal('user username already exists')
            })
    })

    afterEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllPets()
    ]))

    after(() => disconnect())
})