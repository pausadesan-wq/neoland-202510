import { Link } from 'react-router'

import { Icon } from './Icon'

import { categoryMeta, categoryTextColor, FALLBACK_IMAGE, formatEventDate, handleImageError, priceLabel } from '../lib/events'

// Card visual estilo Lovable. Enlaza a /evento/:eventId, con CTA "Ver plan →".
// El bookmark solo se pinta si la vista pasa onToggleSave (estado en useSavedEvents).

export function EventCard({ event, compact = false, owner = false, saved = false, savePending = false, onToggleSave }) {
    const meta = categoryMeta(event.category)
    const price = priceLabel(event)
    const attendeesCount = (event.attendees || []).length

    // La card entera es un Link: hay que frenar la navegación al pulsar el bookmark.
    const handleSaveClick = e => {
        e.preventDefault()
        e.stopPropagation()

        onToggleSave(event.id)
    }

    // Muestra un tag secundario si no repite categoría ni "Gratis" (que ya sale como price).
    const secondaryTag = (event.tags || []).find(t => t.toLowerCase() !== event.category.toLowerCase() && t.toLowerCase() !== 'gratis') || null

    return <Link
        to={`/evento/${event.id}`}
        className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] transition hover:-translate-y-0.5 hover:shadow-md ${compact || owner ? '' : 'h-full'}`}
    >
        <div className={`relative w-full overflow-hidden bg-[color:var(--muted)] ${compact ? 'h-[132px]' : 'h-[180px]'}`}>
            <img
                src={event.image || FALLBACK_IMAGE}
                alt={event.title}
                loading="lazy"
                onError={handleImageError}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />

            {/* === CATEGORY + TAG PILLS === */}
            <div className="absolute left-2 top-2 flex items-center gap-1.5">
                <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{ backgroundColor: meta.color, color: categoryTextColor(event.category) }}
                >
                    {event.category}
                </span>
                {secondaryTag && <span className="rounded-full border border-[color:var(--foreground)]/10 bg-[color:var(--background)] px-2 py-0.5 text-[10px] font-bold text-[color:var(--foreground)]">
                    {secondaryTag}
                </span>}
            </div>

            {/* === GUARDAR === */}
            {onToggleSave && <button
                type="button"
                onClick={handleSaveClick}
                disabled={savePending}
                aria-label={saved ? 'Quitar de guardados' : 'Guardar'}
                aria-pressed={saved}
                className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-[color:var(--background)]/95 backdrop-blur transition hover:scale-110 active:scale-95 disabled:opacity-60 md:h-10 md:w-10"
            >
                <Icon
                    name="bookmark"
                    className={`h-4 w-4 text-[color:var(--foreground)] md:h-[18px] md:w-[18px] ${saved ? 'fill-[color:var(--foreground)]' : ''}`}
                />
            </button>}
        </div>

        <div className={`flex flex-col ${compact ? 'px-3 pb-3 pt-2.5' : 'flex-1 px-4 pb-3 pt-3'}`}>
            <h3 className="line-clamp-2 font-display text-[15px] font-semibold leading-[1.25] tracking-tight">
                {event.title}
            </h3>

            <div className={`${compact ? 'mt-2' : 'mt-3'} space-y-1.5 text-[12px] font-medium text-[color:var(--foreground)]/80`}>
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <Icon name="clock" className="h-3.5 w-3.5" />
                    {formatEventDate(event.date)} · {event.time}
                </span>
                <span className="flex items-center gap-1.5">
                    <Icon name="map-pin" className="h-3.5 w-3.5" />
                    {event.location}
                </span>
            </div>

            {!compact && <div className="mt-auto flex items-center gap-2.5 pt-2 md:border-t md:border-[color:var(--border)]">
                <span className="flex shrink-0 items-center gap-1.5 text-[12px] font-medium leading-none text-[color:var(--foreground)]/80">
                    <Icon name="users" className="h-4 w-4 text-[color:var(--brand-blue)]" />
                    <span className="font-bold text-[color:var(--foreground)]">{attendeesCount}</span>
                    <span>{attendeesCount === 1 ? 'apuntado' : 'apuntados'}</span>
                </span>

                {event.priceType !== 'Gratis' && <span className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[12px] font-extrabold leading-none ${event.priceType === 'Donativo' ? 'border border-[color:var(--border)] bg-[color:var(--background)] text-[color:var(--foreground)]' : 'bg-[color:var(--foreground)] text-[color:var(--background)]'}`}>
                    {price}
                </span>}

                {event.priceType === 'Gratis' && <span className="inline-flex shrink-0 items-center rounded-full bg-[color:var(--brand-neon)] px-2 py-0.5 text-[12px] font-extrabold leading-none text-[color:var(--foreground)]">
                    Gratis
                </span>}

                <span className="ml-auto shrink-0 text-[12px] font-bold text-[color:var(--brand-blue)] group-hover:underline">
                    Ver plan →
                </span>
            </div>}
        </div>
    </Link>
}
