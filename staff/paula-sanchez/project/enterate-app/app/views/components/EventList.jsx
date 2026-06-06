import { useState, useEffect } from 'react'

import { EventItem } from './EventItem'

import { useContext } from '../../context'

import { logic } from '../../logic'

import { logger } from '../../logger'

// Lista básica de eventos. El Owner-actions (borrar / editar) llega en la Fase 7.

export function EventList({ onGoToEventDetail }) {
    logger.debug('EventList -> call')

    const { onError } = useContext()

    const [events, setEvents] = useState([])

    useEffect(() => {
        logger.debug('EventList -> useEffect')

        try {
            logic.getEvents()
                .then(events => setEvents(events))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    logger.debug('EventList -> render')

    if (events.length === 0) return <p className="text-sm text-[color:var(--muted-foreground)]">Todavía no hay planes.</p>

    return <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {events.map(event => <EventItem key={event.id} event={event} onGoToEventDetail={onGoToEventDetail} />)}
    </ul>
}
