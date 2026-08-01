// === Helpers puros para eventos ===
// Basado en el diseño de referencia. Sin dependencias externas.

const WEEKDAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const MONTHS_SHORT = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
const MONTHS_LONG = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

// === Fechas ===
// Internamente todo trabaja con Date. Solo se formatea a string para mostrarlo al usuario.

export function eventDate(value) {
    return value instanceof Date ? value : new Date(value)
}

export function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

// Formato corto para cards y meta: "Sáb 2 ago"
export function formatEventDate(value) {
    const d = eventDate(value)
    return `${WEEKDAYS[d.getDay()]} ${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`
}

// Formato largo para el detalle: "2 de agosto de 2026"
export function formatLongEventDate(value) {
    const d = eventDate(value)
    return `${d.getDate()} de ${MONTHS_LONG[d.getMonth()]} de ${d.getFullYear()}`
}

// === Imagen ===
// Respaldo local (app/public/) para cuando una imagen ya guardada no carga.
// La imagen sigue siendo obligatoria por URL al crear o editar un evento.
export const FALLBACK_IMAGE = '/event-fallback.svg'

// Manejador de <img onError>. Comprobamos con endsWith porque img.src devuelve
// la URL absoluta ya resuelta, así el respaldo no vuelve a dispararse a sí mismo.
export function handleImageError(event) {
    const img = event.currentTarget

    if (!img.src.endsWith(FALLBACK_IMAGE)) img.src = FALLBACK_IMAGE
}

// === Precio ===

export function priceLabel(event) {
    if (event.priceType === 'Gratis') return 'Gratis'
    if (event.priceType === 'Donativo') return 'Donativo'

    const raw = (event.price || '').trim()

    if (!raw) return 'De pago'

    const match = raw.match(/\d+(?:[.,]\d+)?/)

    return match ? `${match[0]} €` : raw
}

// === Categorías ===
// Fuente única de metadatos visuales. Los nombres coinciden con EVENT_CATEGORIES en com/.

export const CATEGORIES = [
    { name: 'Todos', emoji: '✨', color: 'var(--foreground)', slug: 'todos' },
    { name: 'Deporte', emoji: '🏃', color: 'var(--brand-blue)', slug: 'deporte' },
    { name: 'Cultura', emoji: '🎭', color: 'var(--brand-purple)', slug: 'cultura' },
    { name: 'Comida', emoji: '🍷', color: 'var(--brand-orange)', slug: 'comida' },
    { name: 'Música', emoji: '🎵', color: 'var(--brand-red)', slug: 'musica' },
    { name: 'Ocio', emoji: '🎮', color: 'var(--brand-pink)', slug: 'ocio' },
    { name: 'Artesanía', emoji: '🧵', color: 'var(--brand-green)', slug: 'artesania' },
    { name: 'Mercadillos', emoji: '🛍️', color: 'var(--brand-yellow)', slug: 'mercadillos' }
]

export function categoryMeta(name) {
    return CATEGORIES.find(c => c.name === name) || CATEGORIES[0]
}

// Tags curados que sugerimos en el formulario. Se usan para el chip picker.
// El usuario puede añadir tags libres (validación 1-5 con regex simple).
export const TAG_SUGGESTIONS = [
    'Aire libre',
    'Interior',
    'Familiar',
    'Adultos',
    'Tranquilo',
    'Conocer gente',
    'Accesible',
    'Local',
    'En grupo',
    'Noche',
    'Popular',
    'Nuevo'
]

// Regex sencilla para tags: letras, números, espacios y guiones. 2-30 caracteres.
export const TAG_REGEX = /^[\p{L}\p{N} '\-]{2,30}$/u

// La categoría Mercadillos usa un amarillo claro que necesita texto oscuro; el resto texto blanco.
export function categoryTextColor(name) {
    return name === 'Mercadillos' ? 'var(--foreground)' : 'white'
}

// === Filtros ===

export function isFuture(event, today = startOfDay(new Date())) {
    return startOfDay(eventDate(event.date)) >= today
}

// Último día del mes natural en curso.
function endOfMonth(today) {
    return new Date(today.getFullYear(), today.getMonth() + 1, 0)
}

export function matchesDateFilter(event, filter) {
    if (!filter) return true

    const today = startOfDay(new Date())
    const d = startOfDay(eventDate(event.date))

    if (filter === 'hoy') return d.getTime() === today.getTime()

    // Esta semana: los próximos 7 días.
    if (filter === 'semana') {
        const end = new Date(today)
        end.setDate(today.getDate() + 7)
        return d >= today && d <= end
    }

    // Este mes: desde hoy hasta el último día del mes natural.
    if (filter === 'mes') return d >= today && d <= endOfMonth(today)

    // Más adelante: a partir del mes que viene.
    if (filter === 'adelante') return d > endOfMonth(today)

    return true
}

function norm(s) {
    // Case + accent insensitive (Música → musica).
    return String(s || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
}

export function matchesSearch(event, query) {
    const q = norm(query).trim()

    if (!q) return true

    return norm(event.title).includes(q)
        || norm(event.description).includes(q)
        || norm(event.location).includes(q)
        || norm(event.category).includes(q)
        || (event.tags || []).some(t => norm(t).includes(q))
}

export function matchesCategory(event, category) {
    if (!category || category === 'Todos') return true
    return event.category === category
}

// === Secciones ===

export function sortByDate(events) {
    return [...events].sort((a, b) => eventDate(a.date) - eventDate(b.date))
}

export function thisWeekEvents(events, today = startOfDay(new Date())) {
    const end = new Date(today)
    end.setDate(today.getDate() + 7)

    return sortByDate(events.filter(e => {
        const d = startOfDay(eventDate(e.date))
        return d >= today && d <= end
    }))
}

// "Cositas ocultas": eventos futuros con menos gente apuntada. Los ordenamos por asistencia
// ascendente para destacar los que menos gente conoce, como en el diseño de referencia.
export function hiddenGems(events, today = startOfDay(new Date())) {
    const future = events.filter(e => startOfDay(eventDate(e.date)) >= today)

    return [...future].sort((a, b) => {
        const countA = (a.attendees || []).length
        const countB = (b.attendees || []).length
        if (countA !== countB) return countA - countB
        return eventDate(a.date) - eventDate(b.date)
    })
}

// Eventos relacionados. Misma regla que el diseño de referencia: comparten al menos un tag
// con el evento actual y no son él mismo. Añadimos solo el descarte de los ya pasados,
// porque nuestro dataset sí tiene eventos antiguos y no sirven como sugerencia.
export function relatedEvents(events, current, today = startOfDay(new Date())) {
    const tags = current.tags || []

    return events.filter(e =>
        e.id !== current.id
        && startOfDay(eventDate(e.date)) >= today
        && (e.tags || []).some(tag => tags.includes(tag))
    ).slice(0, 3)
}
