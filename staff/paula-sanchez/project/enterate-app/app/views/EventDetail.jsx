import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

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
// Descarga: 1) evento; 2) todos (para relacionados); 3) si logueado: user + saved (para saber si guardado).
// Guardar/apuntarse requiere auth; invitado va a /login con redirect.

export function EventDetail() {
    logger.debug('EventDetail -> call')

    const { onSuccess, onError } = useContext()

    const navigate = useNavigate()

    const { eventId } = useParams()

    const [event, setEvent] = useState(null)
    const [allEvents, setAllEvents] = useState([])
    const [currentUserId, setCurrentUserId] = useState(null)
    const [savedIds, setSavedIds] = useState(new Set())
    const [confirmingDelete, setConfirmingDelete] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [savePending, setSavePending] = useState(false)
    const [joinPending, setJoinPending] = useState(false)

    const loggedIn = logic.isUserLoggedIn()

    useEffect(() => {
        setEvent(null)
        setConfirmingDelete(false)

        try {
            const promises = [logic.getEvent(eventId), logic.getEvents()]

            if (loggedIn) {
                promises.push(logic.getLoggedInUser())
                promises.push(logic.getSavedEvents())
            }

            Promise.all(promises)
                .then(([one, all, user, saved]) => {
                    setEvent(one)
                    setAllEvents(all)
                    if (user) setCurrentUserId(user.id)
                    if (saved) setSavedIds(new Set(saved.map(e => e.id)))
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [eventId])

    const handleBack = e => {
        e.preventDefault()
        navigate('/')
    }

    const handleEdit = () => navigate(`/evento/${eventId}/editar`)

    const handleAskDelete = () => setConfirmingDelete(true)

    const handleCancelDelete = () => setConfirmingDelete(false)

    const handleConfirmDelete = () => {
        setDeleting(true)

        try {
            logic.removeEvent(eventId)
                .then(() => {
                    onSuccess('Plan eliminado')
                    navigate('/')
                })
                .catch(error => onError(error))
                .finally(() => setDeleting(false))
        } catch (error) {
            setDeleting(false)
            onError(error)
        }
    }

    const handleToggleSave = () => {
        if (!loggedIn) return navigate(`/login?redirect=${encodeURIComponent(`/evento/${eventId}`)}`)

        if (savePending) return

        const isSaved = savedIds.has(eventId)

        setSavePending(true)

        try {
            const call = isSaved ? logic.unsaveEvent(eventId) : logic.saveEvent(eventId)

            call
                .then(() => {
                    setSavedIds(prev => {
                        const next = new Set(prev)
                        if (isSaved) next.delete(eventId)
                        else next.add(eventId)
                        return next
                    })
                    onSuccess(isSaved ? 'Quitado de guardados' : 'Guardado ✓')
                })
                .catch(error => onError(error))
                .finally(() => setSavePending(false))
        } catch (error) {
            setSavePending(false)
            onError(error)
        }
    }

    const handleToggleJoin = () => {
        if (!loggedIn) return navigate(`/login?redirect=${encodeURIComponent(`/evento/${eventId}`)}`)

        if (joinPending) return

        const isJoined = event.attendees.includes(currentUserId)

        setJoinPending(true)

        try {
            const call = isJoined ? logic.leaveEvent(eventId) : logic.joinEvent(eventId)

            call
                .then(() => {
                    setEvent(prev => ({
                        ...prev,
                        attendees: isJoined
                            ? prev.attendees.filter(id => id !== currentUserId)
                            : [...prev.attendees, currentUserId]
                    }))
                    onSuccess(isJoined ? 'Ya no vas a este plan' : 'Te has apuntado ✓')
                })
                .catch(error => onError(error))
                .finally(() => setJoinPending(false))
        } catch (error) {
            setJoinPending(false)
            onError(error)
        }
    }

    logger.debug('EventDetail -> render')

    if (!event) return <Spinner />

    const meta = categoryMeta(event.category)
    const price = priceLabel(event)
    const related = relatedEvents(allEvents, event)
    const isOwner = loggedIn && currentUserId && currentUserId === event.ownerId
    const isSaved = savedIds.has(eventId)
    const isJoined = currentUserId && event.attendees.includes(currentUserId)
    const attendeesCount = event.attendees.length

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
                onClick={handleBack}
                aria-label="Volver"
                className="absolute left-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-[color:var(--background)]/95 text-[color:var(--foreground)] backdrop-blur transition active:scale-95"
            >
                <Icon name="back" className="h-4 w-4" />
            </button>

            <button
                onClick={handleToggleSave}
                aria-label={isSaved ? 'Quitar de guardados' : 'Guardar'}
                aria-pressed={isSaved}
                disabled={savePending}
                className="absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-[color:var(--background)]/95 text-[color:var(--foreground)] backdrop-blur transition active:scale-95 disabled:opacity-60"
            >
                <Icon
                    name="bookmark"
                    className="h-4 w-4"
                    strokeWidth={isSaved ? 3 : 2}
                />
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
                <span className="inline-flex items-center gap-1.5">
                    <Icon name="users" className="h-4 w-4 text-[color:var(--brand-blue)]" />
                    <span className="font-bold text-[color:var(--foreground)]">{attendeesCount}</span>
                    <span>{attendeesCount === 1 ? 'persona va' : 'personas van'}</span>
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

            {/* === ACCIONES (Guardar + Apuntarme) === */}
            <div className="mt-6 flex flex-wrap gap-2">
                <button
                    onClick={handleToggleJoin}
                    disabled={joinPending}
                    aria-pressed={isJoined}
                    className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold transition hover:-translate-y-0.5 disabled:opacity-60 ${isJoined
                        ? 'bg-[color:var(--foreground)] text-[color:var(--background)]'
                        : 'bg-[color:var(--brand-blue)] text-white'}`}
                >
                    {isJoined ? 'Cancelar asistencia' : 'Apuntarme'}
                </button>

                <button
                    onClick={handleToggleSave}
                    disabled={savePending}
                    aria-pressed={isSaved}
                    className={`inline-flex items-center gap-1.5 rounded-full border-2 border-[color:var(--foreground)] px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 disabled:opacity-60 ${isSaved
                        ? 'bg-[color:var(--foreground)] text-[color:var(--background)]'
                        : 'bg-[color:var(--background)] text-[color:var(--foreground)]'}`}
                >
                    <Icon name="bookmark" className="h-4 w-4" strokeWidth={isSaved ? 3 : 2} />
                    {isSaved ? 'Guardado' : 'Guardar'}
                </button>
            </div>

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

            {/* === OWNER ACTIONS === */}
            {isOwner && <div className="mt-8 border-t border-[color:var(--border)] pt-6">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[color:var(--muted-foreground)]">
                    Este plan es tuyo
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                    <button
                        onClick={handleEdit}
                        className="inline-flex items-center gap-1.5 rounded-full border-2 border-[color:var(--foreground)] bg-[color:var(--background)] px-4 py-2 text-sm font-bold text-[color:var(--foreground)] transition hover:-translate-y-0.5"
                    >
                        Editar plan
                    </button>

                    {!confirmingDelete && <button
                        onClick={handleAskDelete}
                        className="inline-flex items-center gap-1.5 rounded-full border-2 border-[color:var(--destructive)] bg-[color:var(--background)] px-4 py-2 text-sm font-bold text-[color:var(--destructive)] transition hover:bg-[color:var(--destructive)] hover:text-white"
                    >
                        Eliminar
                    </button>}
                </div>

                {confirmingDelete && <div className="mt-3 rounded-xl border border-[color:var(--destructive)] bg-[color:var(--card)] p-3">
                    <p className="text-sm font-semibold">¿Seguro que quieres eliminar este plan?</p>
                    <p className="mt-1 text-xs text-[color:var(--muted-foreground)]">Esta acción no se puede deshacer.</p>
                    <div className="mt-3 flex gap-2">
                        <button
                            onClick={handleConfirmDelete}
                            disabled={deleting}
                            className="inline-flex items-center rounded-full bg-[color:var(--destructive)] px-4 py-2 text-xs font-bold text-white disabled:opacity-60"
                        >
                            {deleting ? 'Eliminando…' : 'Sí, eliminar'}
                        </button>
                        <button
                            onClick={handleCancelDelete}
                            disabled={deleting}
                            className="inline-flex items-center rounded-full border-2 border-[color:var(--border)] bg-[color:var(--background)] px-4 py-2 text-xs font-semibold disabled:opacity-60"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>}
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
