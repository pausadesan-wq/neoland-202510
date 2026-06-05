import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData, EventData } from '../data/index.js'
import { logic, Event } from './index.js'

function sampleEventData(ownerId, title = 'Concierto en la Carbonería') {
    return new EventData(
        null,
        ownerId,
        title,
        'Concierto acústico en la sala Carbonería del Realejo.',
        new Date('2026-03-15'),
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
}

describe('getEvents', () => {
    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null

    beforeEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllEvents(),
        bcrypt.hash('123123123', 10).then(hash => hashed = hash)
    ]))

    it('returns all events (public, no auth needed)', () => {
        return Promise.all([
            data.insertUser(new UserData(null, 'Mi Ke', 'mi@ke.com', 'mike', hashed, null, 'regular')),
            data.insertUser(new UserData(null, 'Mi Ke 2', 'mi@ke2.com', 'mike2', hashed, null, 'regular'))
        ])
            .then(() => Promise.all([
                data.findUserByEmail('mi@ke.com'),
                data.findUserByEmail('mi@ke2.com')
            ]))
            .then(([u1, u2]) => Promise.all([
                data.insertEvent(sampleEventData(u1.id, 'Evento uno')),
                data.insertEvent(sampleEventData(u2.id, 'Evento dos'))
            ]))
            .then(() => logic.getEvents())
            .then(events => {
                expect(events).to.have.lengthOf(2)
                events.forEach(e => expect(e).to.be.instanceOf(Event))
                const titles = events.map(e => e.title).sort()
                expect(titles).to.deep.equal(['Evento dos', 'Evento uno'])
            })
    })

    it('returns empty array when no events exist', () => {
        return logic.getEvents()
            .then(events => expect(events).to.deep.equal([]))
    })

    afterEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllEvents()
    ]))

    after(() => disconnect())
})
