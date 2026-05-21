import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData, PetData } from '../data/index.js'
import { logic, Pet } from './index.js'
import { ExistenceError, OwnershipError } from 'com'

describe('getPet', () => {
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

                        return logic.getPet(userData.id, petData.id)
                    })
                    .then(pet => {
                        expect(pet).to.be.instanceOf(Pet)
                        expect(pet.name).to.equal('Tor Tuga')
                        expect(pet.birthdate.getFullYear()).to.equal(2026)
                        expect(pet.birthdate.getMonth()).to.equal(0)
                        expect(pet.birthdate.getDate()).to.equal(10)
                        expect(pet.weight).to.equal(2)
                        expect(pet.image).to.equal('https://image.com/123')
                    })
            })
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.getPet('012345678901234567890123', '012345678901234567890123')
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
            .then(userData => logic.getPet(userData.id, '012345678901234567890123'))
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
                            .then(userData => logic.getPet(userData.id, petData.id))
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