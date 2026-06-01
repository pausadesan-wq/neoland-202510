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
                return logic.addEvent(
                    userData.id,
                    'Concierto en la Carbonería',
                    'Concierto acústico en la sala Carbonería del Realejo.',
                    '2026-03-15',
                    '21:00',
                    'Sala Carbonería',
                    'Calle Cardenal Parrado 8',
                    'Realejo',
                    'Música',
                    ['Interior', 'Noche', 'Adultos'],
                    'De pago',
                    '10',
                    'https://images.unsplash.com/photo-1',
                    'Instagram',
                    'https://instagram.com/carboneria'
                )
                    .then(() => data.findEventsByUserId(userData.id))
                    .then(events => {
                        expect(events).to.have.lengthOf(1)

                        const [event] = events
                        expect(event.title).to.equal('Concierto en la Carbonería')
                        expect(event.description).to.equal('Concierto acústico en la sala Carbonería del Realejo.')
                        expect(event.date).to.be.an.instanceOf(Date)
                        expect(event.time).to.equal('21:00')
                        expect(event.location).to.equal('Sala Carbonería')
                        expect(event.address).to.equal('Calle Cardenal Parrado 8')
                        expect(event.district).to.equal('Realejo')
                        expect(event.category).to.equal('Música')
                        expect(event.tags).to.deep.equal(['Interior', 'Noche', 'Adultos'])
                        expect(event.priceType).to.equal('De pago')
                        expect(event.price).to.equal('10')
                        expect(event.image).to.equal('https://images.unsplash.com/photo-1')
                        expect(event.sourceType).to.equal('Instagram')
                        expect(event.sourceUrl).to.equal('https://instagram.com/carboneria')
                    })
            })
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.addEvent(
            '012345678901234567890123',
            'Concierto en la Carbonería',
            'Concierto acústico en la sala Carbonería del Realejo.',
            '2026-03-15',
            '21:00',
            'Sala Carbonería',
            null,
            null,
            'Música',
            ['Interior'],
            'Gratis',
            null,
            'https://images.unsplash.com/photo-1',
            'Boca a boca',
            null
        )
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
