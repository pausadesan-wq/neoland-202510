import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData, PetData } from '../data/index.js'
import { logic } from './index.js'
import { ExistenceError, OwnershipError } from 'com'

describe('removePet', () => {
    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null

    beforeEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllPets(),
        bcrypt.hash('123123123', 10).then(hash => hashed = hash)
    ]))

    it('succeeds on existing user and pet', () => {
        return data.insertUser(new UserData(null, 'Mi Ke', 'mi@ke.com', 'mike', hashed, null, 'regular'))
            .then(() => data.findUserByEmail('mi@ke.com'))
            .then(userData => {
                return data.insertPet(new PetData(null, userData.id, 'Tor Tuga', '2026-01-10', 2, 'https://image.com/123'))
                    .then(() => data.findPetsByUserId(userData.id))
                    .then(petsData => {
                        const [petData] = petsData

                        return logic.removePet(userData.id, petData.id)
                    })
                    .then(() => data.findPetsByUserId(userData.id))
                    .then(petsData => expect(petsData).to.have.lengthOf(0))
            })
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.removePet('012345678901234567890123', '012345678901234567890123')
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing pet', () => {
        let caught = null

        return data.insertUser(new UserData(null, 'Mi Ke', 'mi@ke.com', 'mike', hashed, null, 'regular'))
            .then(() => data.findUserByEmail('mi@ke.com'))
            .then(userData => logic.removePet(userData.id, '012345678901234567890123'))
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('pet not found')
            })
    })

    it('fails on existing user and existing pet from another user', () => {
        let caught = null

        return Promise.all([
            data.insertUser(new UserData(null, 'Mi Ke', 'mi@ke.com', 'mike', hashed, null, 'regular')),
            data.insertUser(new UserData(null, 'Mi Ke 2', 'mi@ke2.com', 'mike2', hashed, null, 'regular'))
        ])
            .then(() => data.findUserByEmail('mi@ke2.com'))
            .then(userData2 => {
                return data.insertPet(new PetData(null, userData2.id, 'Tor Tuga', '2026-01-10', 2, 'https://image.com/123'))
                    .then(() => data.findPetsByUserId(userData2.id))
                    .then(petsData => {
                        const [petData] = petsData

                        return data.findUserByEmail('mi@ke.com')
                            .then(userData => logic.removePet(userData.id, petData.id))
                    })
            })
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(OwnershipError)
                expect(caught.message).to.equal('user not owner of pet')
            })
    })

    afterEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllPets()
    ]))

    after(() => disconnect())
})