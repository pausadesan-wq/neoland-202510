import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router'

import { EventForm } from './components/EventForm'
import { Spinner } from './components/Spinner'
import { Icon } from './components/Icon'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'

// === EDITAR EVENTO ===
// Precarga con GET /events/:id, edita con EventForm mode="edit", envía PUT.
// El backend valida ownership (403 si no es del usuario).

export function ModifyEvent() {
    logger.debug('ModifyEvent -> call')

    const { onSuccess, onError } = useContext()

    const navigate = useNavigate()

    const { eventId } = useParams()

    const [event, setEvent] = useState(null)

    useEffect(() => {
        try {
            logic.getEvent(eventId)
                .then(event => setEvent(event))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [eventId])

    const handleBackClick = e => {
        e.preventDefault()
        navigate(`/evento/${eventId}`)
    }

    const handleSubmit = payload => {
        try {
            return logic.modifyEvent(
                eventId,
                payload.title,
                payload.description,
                payload.date,
                payload.time,
                payload.location,
                payload.address,
                payload.district,
                payload.category,
                payload.tags,
                payload.priceType,
                payload.price,
                payload.image,
                payload.sourceType,
                payload.sourceUrl
            )
                .then(() => {
                    onSuccess('Cambios guardados')
                    navigate(`/evento/${eventId}`)
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    logger.debug('ModifyEvent -> render')

    return <div className="mx-auto max-w-2xl py-4 md:py-8">
        <button
            onClick={handleBackClick}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
        >
            <Icon name="back" className="h-4 w-4" /> Volver
        </button>

        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Editar plan
        </h1>

        <div className="mt-6">
            {event
                ? <EventForm mode="edit" initialEvent={event} onSubmit={handleSubmit} />
                : <Spinner />}
        </div>
    </div>
}
