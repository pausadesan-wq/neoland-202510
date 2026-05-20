import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData, PetData } from '../data/index.js'
import { logic, Pet } from './index.js'
import { ExistenceError } from 'com'

describe('getPets', () => {
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
                    .then(() => logic.getPets(userData.id))
                    .then(pets => {
                        expect(pets).to.have.lengthOf(1)

                        const [pet] = pets
                        expect(pet).instanceOf(Pet)
                        expect(pet.ownerId).to.equal(userData.id)
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

        return logic.getPets('012345678901234567890123')
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