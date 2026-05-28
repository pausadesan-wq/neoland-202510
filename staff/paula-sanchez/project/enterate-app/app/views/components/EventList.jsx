import { useState, useEffect } from 'react'

import { Button } from './commons/Button'

import { EventItem } from './EventItem'

import { useContext } from '../../context'

import { logic } from '../../logic'

import { logger } from '../../logger'

export function EventList({ onGoToEventDetail }) {
    logger.debug('EventList -> call')

    const { onError } = useContext()

    const [events, setEvents] = useState([])
    const [eventId, setEventId] = useState(null)

    useEffect(() => {
        logger.debug('EventList -> useEffect')

        try {
            logic.getEvents()
                .then(events => {
                    setEvents(events)
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    const handleRemoveEventClick = eventId => setEventId(eventId)

    const handleCancelRemoveEventClick = event => {
        event.preventDefault()

        setEventId(null)
    }

    const handleConfirmRemoveEventClick = event => {
        event.preventDefault()

        try {
            logic.removeEvent(eventId)
                .then(() => {
                    return logic.getEvents()
                })
                .then(events => {
                    setEventId(null)
                    setEvents(events)
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    const handleGoToDetail = () => onGoToEventDetail()

    logger.debug('EventList -> render')

    return <div>
        <ul className="flex flex-col gap-2 mt-2">
            {events.map(event => <EventItem key={event.id} event={event} onGoToEventDetail={handleGoToDetail} onRemoveEventClick={handleRemoveEventClick} />)}
        </ul>

        {eventId && <div className="w-full h-full fixed top-0 left-0 bg-black/75 flex justify-center items-center">
            <div className="bg-white border-black border-2 p-2">
                <p className="text-center">Delete Event?</p>

                <div className="flex justify-center gap-2">
                    <Button onClick={handleCancelRemoveEventClick}>❌</Button>
                    <Button onClick={handleConfirmRemoveEventClick}>✅</Button>
                </div>
            </div>
        </div>}
    </div>
}
