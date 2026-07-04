// === Helpers puros para eventos ===
// Inspirado en remix-reference/src/lib/events-data.ts. Sin dependencias externas.

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

// Formato numérico español: "02/08/2026"
export function formatShortDate(value) {
    const d = eventDate(value)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    return `${day}/${month}/${d.getFullYear()}`
}

// === Imagen ===
// Respaldo cuando la URL que puso el usuario no carga.
export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80'

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

export function matchesDateFilter(event, filter) {
    if (!filter) return true

    const today = startOfDay(new Date())
    const d = startOfDay(eventDate(event.date))

    if (filter === 'hoy') return d.getTime() === today.getTime()

    if (filter === 'semana') {
        const end = new Date(today)
        end.setDate(today.getDate() + 7)
        return d >= today && d <= end
    }

    if (filter === 'treinta') {
        const end = new Date(today)
        end.setDate(today.getDate() + 30)
        return d >= today && d <= end
    }

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
// ascendente para destacar los que menos gente conoce. Inspirado en getDiscoveryEvents de Lovable.
export function hiddenGems(events, today = startOfDay(new Date())) {
    const future = events.filter(e => startOfDay(eventDate(e.date)) >= today)

    return [...future].sort((a, b) => {
        const countA = (a.attendees || []).length
        const countB = (b.attendees || []).length
        if (countA !== countB) return countA - countB
        return eventDate(a.date) - eventDate(b.date)
    })
}

// Eventos relacionados: misma categoría, futuros, distinto id. Máx 3.
export function relatedEvents(events, current, today = startOfDay(new Date())) {
    return sortByDate(events.filter(e =>
        e.id !== current.id
        && e.category === current.category
        && startOfDay(eventDate(e.date)) >= today
    )).slice(0, 3)
}
