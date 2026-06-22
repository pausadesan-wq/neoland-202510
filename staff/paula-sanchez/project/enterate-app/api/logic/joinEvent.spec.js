import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData, EventData } from '../data/index.js'
import { logic } from './index.js'
import { ExistenceError } from 'com'

function sampleEventData(ownerId) {
    return new EventData(null, ownerId, 'Concierto', 'Descripción larga suficiente para pasar validación mínima.', new Date('2026-08-25'), '21:00', 'Sala', null, null, 'Música', ['Interior'], 'Gratis', null, 'https://images.unsplash.com/x', 'Boca a boca', null)
}

describe('joinEvent', () => {
    before(() => connect(process.env.TEST_DB_URL))

    let hashed = null
    let ownerId = null
    let attendeeId = null
    let eventId = null

    beforeEach(() => Promise.all([data.deleteAllUsers(), data.deleteAllEvents()])
        .then(() => bcrypt.hash('123123123', 10))
        .then(hash => {
            hashed = hash
            return Promise.all([
                data.insertUser(new UserData(null, 'Owner', 'owner@ke.com', 'owner', hashed, null, 'regular')),
                data.insertUser(new UserData(null, 'Att', 'att@ke.com', 'attuser', hashed, null, 'regular'))
            ])
        })
        .then(() => Promise.all([
            data.findUserByEmail('owner@ke.com'),
            data.findUserByEmail('att@ke.com')
        ]))
        .then(([owner, attendee]) => {
            ownerId = owner.id
            attendeeId = attendee.id
            return data.insertEvent(sampleEventData(ownerId))
        })
        .then(id => { eventId = id })
    )

    it('adds the user to attendees', () => {
        return logic.joinEvent(attendeeId, eventId)
            .then(() => data.findEventById(eventId))
            .then(eventData => {
                expect(eventData.attendees).to.have.lengthOf(1)
                expect(eventData.attendees[0]).to.equal(attendeeId)
            })
    })

    it('does not duplicate when joining twice', () => {
        return logic.joinEvent(attendeeId, eventId)
            .then(() => logic.joinEvent(attendeeId, eventId))
            .then(() => data.findEventById(eventId))
            .then(eventData => expect(eventData.attendees).to.have.lengthOf(1))
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.joinEvent('012345678901234567890123', eventId)
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('user not found')
            })
    })

    it('fails on non-existing event', () => {
        let caught = null

        return logic.joinEvent(attendeeId, '012345678901234567890123')
            .catch(error => caught = error)
            .finally(() => {
                expect(caught).to.be.instanceOf(ExistenceError)
                expect(caught.message).to.equal('event not found')
            })
    })

    afterEach(() => Promise.all([data.deleteAllUsers(), data.deleteAllEvents()]))

    after(() => disconnect())
})
