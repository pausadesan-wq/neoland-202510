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
    const [loadFailed, setLoadFailed] = useState(false)

    useEffect(() => {
        try {
            logic.getEvent(eventId)
                .then(event => setEvent(event))
                .catch(error => {
                    // Terminamos la carga aunque falle: si no, la vista se queda en el Spinner.
                    setLoadFailed(true)

                    onError(error)
                })
        } catch (error) {
            setLoadFailed(true)

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

    return <div className="mx-auto -mt-2 max-w-2xl py-4 md:mt-0 md:py-8">
        <button
            onClick={handleBackClick}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
        >
            <Icon name="back" className="h-4 w-4" /> Volver
        </button>

        <h1 className="mt-3 font-display text-2xl font-extrabold leading-tight md:text-5xl">
            Editar <span className="mark-yellow">plan</span>
        </h1>

        <p className="mt-1 text-[12.5px] text-[color:var(--muted-foreground)] md:text-base">
            Cambia lo que haga falta. Los cambios se guardan al instante.
        </p>

        <div className="mt-6">
            {loadFailed
                ? <p className="text-sm text-[color:var(--muted-foreground)]">No hemos podido cargar este plan.</p>
                : event
                    ? <EventForm mode="edit" initialEvent={event} onSubmit={handleSubmit} />
                    : <Spinner />}
        </div>
    </div>
}
