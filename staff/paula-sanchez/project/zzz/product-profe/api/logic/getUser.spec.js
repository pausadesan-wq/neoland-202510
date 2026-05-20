import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { logic, User } from './index.js'
import { ExistenceError } from 'com'

describe('getUser', () => {
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
            .then(userData => logic.getUser(userData.id))
            .then(user => {
                expect(user).to.be.instanceOf(User)
                expect(user.name).to.equal('Mi Ke')
                expect(user.email).to.equal('mi@ke.com')
                expect(user.username).to.equal('mike')
                expect(user.image).to.be.null
                expect(user.role).to.equal('regular')
            })
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.getUser('012345678901234567890123')
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('user not found')
            })

    })

    afterEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllPets()
    ]))

    after(() => disconnect())
})