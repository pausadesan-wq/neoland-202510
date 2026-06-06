import { logger } from '../../logger'

// Card básica de evento. Sin acciones de dueño (llegan en Fase 7).

export function EventItem({ event, onGoToEventDetail }) {
    logger.debug('EventItem -> call')

    const handleClick = () => onGoToEventDetail(event.id)

    const localDateString = new Date(event.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })

    return <li
        onClick={handleClick}
        className="cursor-pointer overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] transition hover:-translate-y-0.5 hover:shadow-md"
    >
        <img
            src={event.image}
            alt={event.title}
            className="h-40 w-full object-cover"
        />

        <div className="p-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[color:var(--muted-foreground)]">
                {event.category} · {localDateString} · {event.time}
            </p>
            <p className="mt-1 font-bold leading-tight">{event.title}</p>
            <p className="mt-1 text-xs text-[color:var(--muted-foreground)]">{event.location}</p>
        </div>
    </li>
}
