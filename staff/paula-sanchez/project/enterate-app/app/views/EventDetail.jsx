import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

import { Spinner } from './components/Spinner'
import { Icon } from './components/Icon'
import { EventCard } from './components/EventCard'

import { useContext } from '../context'

import { logic } from '../logic'

import {
    categoryMeta,
    categoryTextColor,
    formatLongEventDate,
    priceLabel,
    relatedEvents
} from './lib/events'

import { logger } from '../logger'

// Detalle real de evento. Público — funciona sin login.
// Descarga: 1) evento actual con GET /events/:id; 2) todos con GET /events para relacionados.

export function EventDetail({ onGoToHome, onGoToModifyEvent }) {
    logger.debug('EventDetail -> call')

    const { onError } = useContext()

    const { eventId } = useParams()

    const [event, setEvent] = useState(null)
    const [allEvents, setAllEvents] = useState([])

    const loggedIn = logic.isUserLoggedIn()

    useEffect(() => {
        setEvent(null)

        try {
            Promise.all([logic.getEvent(eventId), logic.getEvents()])
                .then(([one, all]) => {
                    setEvent(one)
                    setAllEvents(all)
                })
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

    const meta = categoryMeta(event.category)
    const price = priceLabel(event)
    const related = relatedEvents(allEvents, event)

    // Chips secundarios: quitar los que ya salen (categoría, precio o priceType)
    const excluded = new Set([event.category.toLowerCase(), event.priceType.toLowerCase(), price.toLowerCase()])
    const secondaryTags = (event.tags || []).filter(t => !excluded.has(t.toLowerCase()))

    return <article className="-mx-4 md:mx-0">
        {/* === HERO === */}
        <div className="relative aspect-[12/5] w-full overflow-hidden bg-[color:var(--muted)] md:aspect-[16/9] md:rounded-2xl">
            <img
                src={event.image}
                alt={event.title}
                className="h-full w-full object-cover"
            />

            <button
                onClick={handleBackClick}
                aria-label="Volver"
                className="absolute left-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-[color:var(--background)]/95 text-[color:var(--foreground)] backdrop-blur transition active:scale-95"
            >
                <Icon name="back" className="h-4 w-4" />
            </button>
        </div>

        <div className="px-4 pb-8 pt-4 md:px-0 md:pt-8">
            {/* === PILLS === */}
            <div className="flex flex-wrap gap-1.5">
                <span
                    className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{ backgroundColor: meta.color, color: categoryTextColor(event.category) }}
                >
                    {event.category}
                </span>
                <span
                    className="inline-block rounded-full border border-[color:var(--foreground)]/10 px-2 py-0.5 text-[10px] font-bold"
                    style={{
                        backgroundColor: event.priceType === 'Gratis' ? 'var(--brand-neon)' : 'var(--background)',
                        color: 'var(--foreground)'
                    }}
                >
                    {price}
                </span>
            </div>

            {/* === TÍTULO === */}
            <h1 className="mt-2 font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
                {event.title}
            </h1>

            {/* === META === */}
            <div className="mt-3 flex flex-col gap-1 text-[13px] text-[color:var(--muted-foreground)] md:text-sm">
                <span className="inline-flex items-center gap-1.5">
                    <Icon name="clock" className="h-4 w-4" />
                    <span className="font-semibold text-[color:var(--foreground)]">{formatLongEventDate(event.date)}</span> · {event.time}
                </span>
                <span className="inline-flex items-start gap-1.5">
                    <Icon name="map-pin" className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                        <span className="font-semibold text-[color:var(--foreground)]">{event.location}</span>
                        {event.address && <> · {event.address}</>}
                        {event.district && <> · {event.district}</>}
                    </span>
                </span>
            </div>

            {/* === TAGS SECUNDARIOS === */}
            {secondaryTags.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">
                {secondaryTags.map(t => <span
                    key={t}
                    className="rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2.5 py-0.5 text-[11px] font-semibold text-[color:var(--muted-foreground)]"
                >
                    {t}
                </span>)}
            </div>}

            {/* === DESCRIPCIÓN === */}
            <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-[color:var(--foreground)] md:text-base">
                {event.description}
            </p>

            {/* === FUENTE === */}
            <div className="mt-6">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[color:var(--muted-foreground)]">Fuente</p>
                <p className="mt-1 text-sm font-semibold text-[color:var(--foreground)]">
                    {event.sourceUrl
                        ? <a
                            href={event.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[color:var(--brand-blue)] hover:underline"
                        >
                            {event.sourceType} <Icon name="external" className="h-3.5 w-3.5" />
                        </a>
                        : event.sourceType
                    }
                </p>
            </div>

            {/* === EDITAR (solo logueados; el backend valida ownership) === */}
            {loggedIn && <div className="mt-6">
                <button
                    onClick={handleGoToModifyEvent}
                    className="inline-flex items-center gap-1.5 rounded-full border-2 border-[color:var(--foreground)] bg-[color:var(--background)] px-4 py-2 text-sm font-bold text-[color:var(--foreground)] transition hover:-translate-y-0.5"
                >
                    Editar plan
                </button>
            </div>}
        </div>

        {/* === EVENTOS RELACIONADOS === */}
        {related.length > 0 && <section className="border-t border-[color:var(--border)] bg-[color:var(--muted)]/40 px-4 py-6 md:mx-0 md:mt-8 md:rounded-2xl md:px-8">
            <h2 className="mb-4 font-display text-lg font-extrabold tracking-tight md:text-2xl">
                Planes <span className="mark-yellow">parecidos</span>
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {related.map(e => <EventCard key={e.id} event={e} compact />)}
            </div>
        </section>}
    </article>
}
