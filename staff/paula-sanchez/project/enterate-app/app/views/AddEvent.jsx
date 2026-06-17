import { useNavigate } from 'react-router'

import { EventForm } from './components/EventForm'
import { Icon } from './components/Icon'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'

// === CREAR EVENTO ===
// Envuelve EventForm en modo "create". Al éxito navega a /evento/:id (id que devuelve POST /events).

export function AddEvent() {
    logger.debug('AddEvent -> call')

    const { onSuccess, onError } = useContext()

    const navigate = useNavigate()

    const handleBackClick = e => {
        e.preventDefault()
        navigate(-1)
    }

    const handleSubmit = payload => {
        try {
            return logic.addEvent(
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
                .then(eventId => {
                    onSuccess('¡Plan publicado!')
                    navigate(`/evento/${eventId}`)
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    logger.debug('AddEvent -> render')

    return <div className="mx-auto max-w-2xl py-4 md:py-8">
        <button
            onClick={handleBackClick}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
        >
            <Icon name="back" className="h-4 w-4" /> Volver
        </button>

        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Sube tu <span className="mark-yellow">plan</span>
        </h1>

        <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
            Comparte lo que está pasando en Granada.
        </p>

        <div className="mt-6">
            <EventForm mode="create" onSubmit={handleSubmit} />
        </div>
    </div>
}
