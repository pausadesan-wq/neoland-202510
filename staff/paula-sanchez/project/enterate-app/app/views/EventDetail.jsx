import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'

import { Spinner } from './components/Spinner'
import { Icon } from './components/Icon'
import { EventCard } from './components/EventCard'
import { OwnerActions } from './components/OwnerActions'

import { useContext } from '../context'

import { logic } from '../logic'

import {
    categoryMeta,
    categoryTextColor,
    FALLBACK_IMAGE,
    formatLongEventDate,
    handleImageError,
    priceLabel,
    relatedEvents
} from './lib/events'

import { useSavedEvents } from './lib/useSavedEvents'

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
    const [deleting, setDeleting] = useState(false)
    const [joinPending, setJoinPending] = useState(false)
    const [loadFailed, setLoadFailed] = useState(false)

    // Mismo estado de guardados para el botón de este evento y para las cards de relacionados.
    const { savedIds, toggleSave, pendingId } = useSavedEvents()

    const loggedIn = logic.isUserLoggedIn()

    useEffect(() => {
        setEvent(null)
        setLoadFailed(false)

        try {
            const promises = [logic.getEvent(eventId), logic.getEvents()]

            if (loggedIn) promises.push(logic.getLoggedInUser())

            Promise.all(promises)
                .then(([one, all, user]) => {
                    setEvent(one)
                    setAllEvents(all)
                    if (user) setCurrentUserId(user.id)
                })
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

    // Vuelve a la pantalla anterior (explorar, mis planes…) y cae a Home si se entró por enlace directo.
    const handleBack = e => {
        e.preventDefault()

        if (window.history.length > 1) navigate(-1)
        else navigate('/')
    }

    const handleDelete = () => {
        setDeleting(true)

        try {
            logic.removeEvent(eventId)
                .then(() => {
                    onSuccess('Plan eliminado')
                    // Volvemos a Mis planes > Creados, como remix-reference. Nunca a Inicio.
                    navigate('/guardados?tab=creados')
                })
                .catch(error => onError(error))
                .finally(() => setDeleting(false))
        } catch (error) {
            setDeleting(false)
            onError(error)
        }
    }

    const handleToggleSave = () => toggleSave(eventId)

    // Copiar el enlace al portapapeles, como en remix-reference (sin share sheet nativo).
    const handleShare = () => {
        try {
            navigator.clipboard.writeText(window.location.href)
                .then(() => onSuccess('Enlace copiado!'))
                .catch(error => onError(error))
        } catch (error) {
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

    if (loadFailed) return <div className="py-16 text-center">
        <h1 className="font-display text-2xl font-extrabold md:text-4xl">Evento no encontrado</h1>
        <Link to="/explorar" className="mt-6 inline-block font-semibold text-[color:var(--brand-blue)] underline underline-offset-4">
            Ver otros planes
        </Link>
    </div>

    if (!event) return <Spinner />

    const meta = categoryMeta(event.category)
    const price = priceLabel(event)
    const related = relatedEvents(allEvents, event)
    const isOwner = loggedIn && currentUserId && currentUserId === event.ownerId
    const isSaved = savedIds.has(eventId)
    const isJoined = currentUserId && event.attendees.includes(currentUserId)
    const attendeesCount = event.attendees.length

    const joinLabel = isJoined ? 'Cancelar asistencia' : 'Apuntarme'
    const joinStyle = isJoined
        ? 'bg-[color:var(--foreground)] text-[color:var(--background)]'
        : 'bg-[color:var(--brand-blue)] text-white'

    // Chips secundarios: quitar los que ya salen (categoría, precio o priceType)
    const excluded = new Set([event.category.toLowerCase(), event.priceType.toLowerCase(), price.toLowerCase()])
    const secondaryTags = (event.tags || []).filter(t => !excluded.has(t.toLowerCase()))

    // -mt-6 cancela el py-6 de <main>: en remix-reference el hero arranca pegado al Header.
    // pb-14 en móvil deja hueco para la barra sticky de asistencia.
    return <article className="-mx-4 -mt-6 pb-14 md:mx-0 md:mt-0 md:pb-0">
        {/* === HERO === */}
        <div className="relative aspect-[12/5] w-full overflow-hidden bg-[color:var(--muted)] md:aspect-[16/9] md:rounded-2xl">
            <img
                src={event.image || FALLBACK_IMAGE}
                alt={event.title}
                onError={handleImageError}
                className="h-full w-full object-cover"
            />

            <button
                onClick={handleBack}
                aria-label="Volver"
                className="absolute left-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-[color:var(--background)]/95 text-[color:var(--foreground)] backdrop-blur transition active:scale-95"
            >
                <Icon name="back" className="h-4 w-4" />
            </button>

            {/* Único control de guardar del detalle, como en remix-reference. */}
            <button
                onClick={handleToggleSave}
                aria-label={isSaved ? 'Quitar de guardados' : 'Guardar'}
                aria-pressed={isSaved}
                disabled={pendingId === eventId}
                className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-[color:var(--background)]/95 backdrop-blur transition active:scale-95 disabled:opacity-60"
            >
                <Icon
                    name="bookmark"
                    className={`h-4 w-4 text-[color:var(--foreground)] ${isSaved ? 'fill-[color:var(--foreground)]' : ''}`}
                />
            </button>
        </div>

        <div className="px-4 pb-3 pt-2 md:px-0 md:pt-8">
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
            <h1 className="mt-1 font-display text-lg font-extrabold leading-[1.08] tracking-tight md:mt-0 md:text-5xl">
                {event.title}
            </h1>

            {/* === META === */}
            <div className="mt-1.5 flex flex-col gap-0.5 text-[11px] text-[color:var(--muted-foreground)] md:mt-5 md:gap-1.5 md:text-sm">
                <span className="inline-flex items-center gap-1.5">
                    <Icon name="clock" className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="font-semibold text-[color:var(--foreground)]">{formatLongEventDate(event.date)}</span> · {event.time}
                </span>
                <span className="inline-flex items-start gap-1.5">
                    <Icon name="map-pin" className="mt-[2px] h-3 w-3 shrink-0 md:h-4 md:w-4" />
                    <span>
                        <span className="font-semibold text-[color:var(--foreground)]">{event.location}</span>
                        {event.address && <> · {event.address}</>}
                        {event.district && <> · {event.district}</>}
                    </span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <Icon name="users" className="h-3 w-3 text-[color:var(--brand-blue)] md:h-4 md:w-4" />
                    <span className="font-bold text-[color:var(--foreground)]">{attendeesCount}</span>
                    <span>{attendeesCount === 1 ? 'apuntado' : 'apuntados'}</span>
                </span>
            </div>

            {/* === TAGS SECUNDARIOS === */}
            {secondaryTags.length > 0 && <div className="mt-1.5 flex flex-wrap gap-1.5 md:mt-5 md:gap-2">
                {secondaryTags.map(t => <span
                    key={t}
                    className="rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2.5 py-0.5 text-[11px] font-semibold text-[color:var(--muted-foreground)] md:px-3 md:py-1 md:text-xs"
                >
                    {t}
                </span>)}
            </div>}

            {/* === DESCRIPCIÓN === */}
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[color:var(--foreground)] md:mt-6 md:text-base">
                {event.description}
            </p>

            {/* === ACCIONES DEL PROPIETARIO === */}
            {isOwner && <div className="mt-3 md:mt-6 md:max-w-sm">
                <OwnerActions eventId={eventId} onDelete={handleDelete} deleting={deleting} />
            </div>}

            {/* === INFO (desktop) === */}
            <div className="mt-5 hidden grid-cols-1 gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] p-4 sm:grid-cols-3 md:mt-6 md:grid">
                <Info label="Precio" value={price} />
                <Info label="Fuente" value={event.sourceType} />
                <Info label="Distrito" value={event.district || '—'} />
            </div>

            {/* === APUNTARME (desktop) === */}
            <div className="mt-6 hidden flex-wrap justify-end gap-3 md:mt-8 md:flex">
                {event.sourceUrl && <a
                    href={event.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-5 py-3 text-sm font-semibold text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
                >
                    <Icon name="external" className="h-4 w-4" /> Fuente
                </a>}
                <button
                    onClick={handleToggleJoin}
                    disabled={joinPending}
                    aria-pressed={isJoined}
                    className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 disabled:opacity-60 ${joinStyle}`}
                >
                    {joinLabel}
                </button>
            </div>

            {/* === FUENTE (móvil) === */}
            {/* Misma escala que los botones Editar / Eliminar de OwnerActions. */}
            {event.sourceUrl && <div className="mt-2.5 flex flex-wrap gap-2 md:hidden">
                <a
                    href={event.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[color:var(--border)] px-4 text-xs font-bold text-[color:var(--muted-foreground)]"
                >
                    <Icon name="external" className="h-3.5 w-3.5" /> Fuente
                </a>
            </div>}
        </div>

        {/* === EVENTOS RELACIONADOS === */}
        {related.length > 0 && <section className="border-t border-[color:var(--border)] bg-[color:var(--surface-warm)] py-5 md:py-16">
            <div className="px-4 md:px-0">
                <h2 className="mb-2.5 font-display text-lg font-extrabold tracking-tight md:mb-8 md:text-3xl">
                    Planes <span className="mark-yellow">parecidos</span>
                </h2>

                {/* Móvil: carrusel horizontal con snap. Desktop: rejilla. */}
                <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-2 pr-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden">
                    {related.map(e => <div key={e.id} className="w-[82%] max-w-[340px] shrink-0 snap-start">
                        <EventCard event={e} compact saved={savedIds.has(e.id)} savePending={pendingId === e.id} onToggleSave={toggleSave} />
                    </div>)}
                </div>

                <div className="hidden grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 md:grid">
                    {related.map(e => <EventCard key={e.id} event={e} compact saved={savedIds.has(e.id)} savePending={pendingId === e.id} onToggleSave={toggleSave} />)}
                </div>
            </div>
        </section>}

        {/* === BARRA STICKY DE ASISTENCIA (móvil) === */}
        {/* Se apoya justo encima de la MobileTabBar, como en remix-reference. */}
        <div
            className="fixed inset-x-0 z-40 border-t border-[color:var(--border)] bg-[color:var(--background)]/95 backdrop-blur md:hidden"
            style={{ bottom: 'calc(4rem + env(safe-area-inset-bottom))' }}
        >
            <div className="flex w-full items-center gap-2.5 px-4 py-1.5">
                <button
                    onClick={handleToggleJoin}
                    disabled={joinPending}
                    aria-pressed={isJoined}
                    className={`inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-full px-4 text-[12.5px] font-semibold transition active:scale-[0.98] disabled:opacity-60 ${joinStyle}`}
                >
                    {joinLabel}
                </button>

                <button
                    onClick={handleShare}
                    aria-label="Compartir"
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[color:var(--border)] bg-[color:var(--background)] transition active:scale-95"
                >
                    <Icon name="share" className="h-3 w-3" />
                </button>
            </div>
        </div>
    </article>
}

// === Subcomponente local ===

function Info({ label, value }) {
    return <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-[color:var(--muted-foreground)]">{label}</p>
        <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
}
