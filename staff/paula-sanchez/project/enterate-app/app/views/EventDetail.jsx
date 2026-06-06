import { useState, useEffect } from 'react'

import { useParams } from 'react-router'

import { Button } from './components/commons/Button'
import { Spinner } from './components/Spinner'
import { Icon } from './components/Icon'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'

// Detalle mínimo — el rediseño (hero, mapa, relacionados…) llega en Fase 6.

export function EventDetail({ onGoToHome, onGoToModifyEvent }) {
    logger.debug('EventDetail -> call')

    const { onError } = useContext()

    const [event, setEvent] = useState(null)

    const { eventId } = useParams()

    const loggedIn = logic.isUserLoggedIn()

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

        onGoToHome()
    }

    const handleGoToModifyEvent = () => onGoToModifyEvent(eventId)

    logger.debug('EventDetail -> render')

    if (!event) return <Spinner />

    const localDateString = new Date(event.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })

    return <article className="mx-auto max-w-3xl py-4">
        <button
            onClick={handleBackClick}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
        >
            <Icon name="back" className="h-4 w-4" /> Volver
        </button>

        <img
            src={event.image}
            alt={event.title}
            className="mt-4 w-full rounded-2xl object-cover"
        />

        <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[color:var(--muted-foreground)]">
            {event.category} · {localDateString} · {event.time}
        </p>

        <h1 className="mt-1 text-3xl font-extrabold">{event.title}</h1>

        <p className="mt-3 text-[color:var(--foreground)]">{event.description}</p>

        <div className="mt-4 text-sm text-[color:var(--muted-foreground)]">
            <p><span className="font-semibold text-[color:var(--foreground)]">Dónde:</span> {event.location}{event.district ? ` — ${event.district}` : ''}</p>
            {event.address && <p><span className="font-semibold text-[color:var(--foreground)]">Dirección:</span> {event.address}</p>}
            <p><span className="font-semibold text-[color:var(--foreground)]">Precio:</span> {event.priceType}{event.price ? ` (${event.price})` : ''}</p>
            {event.tags?.length > 0 && <p><span className="font-semibold text-[color:var(--foreground)]">Tags:</span> {event.tags.join(', ')}</p>}
            <p><span className="font-semibold text-[color:var(--foreground)]">Fuente:</span> {event.sourceType}{event.sourceUrl ? ` · ${event.sourceUrl}` : ''}</p>
        </div>

        {loggedIn && <div className="mt-6">
            <Button onClick={handleGoToModifyEvent}>Editar</Button>
        </div>}
    </article>
}
