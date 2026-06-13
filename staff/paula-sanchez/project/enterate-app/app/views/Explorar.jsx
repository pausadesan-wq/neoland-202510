import { useEffect, useMemo, useState } from 'react'

import { EventCard } from './components/EventCard'
import { Icon } from './components/Icon'

import { useContext } from '../context'

import { logic } from '../logic'

import {
    CATEGORIES,
    categoryTextColor,
    isFuture,
    matchesCategory,
    matchesDateFilter,
    matchesSearch,
    sortByDate,
    startOfDay
} from './lib/events'

import { logger } from '../logger'

const DATE_FILTERS = [
    { value: 'hoy', label: 'Hoy' },
    { value: 'semana', label: 'Próximos 7 días' },
    { value: 'treinta', label: 'Próximos 30 días' }
]

// Buscador + chips categoría + filtros temporales — todo en cliente sobre GET /events.

export function Explorar() {
    logger.debug('Explorar -> call')

    const { onError } = useContext()

    const [events, setEvents] = useState([])
    const [query, setQuery] = useState('')
    const [submittedQuery, setSubmittedQuery] = useState('')
    const [category, setCategory] = useState('Todos')
    const [dateFilter, setDateFilter] = useState(null)

    useEffect(() => {
        try {
            logic.getEvents()
                .then(events => setEvents(events))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        setSubmittedQuery(query.trim())
    }

    const handleClearQuery = () => {
        setQuery('')
        setSubmittedQuery('')
    }

    const handleClearFilters = () => {
        setQuery('')
        setSubmittedQuery('')
        setCategory('Todos')
        setDateFilter(null)
    }

    const hasActiveFilters = submittedQuery.length > 0 || category !== 'Todos' || dateFilter !== null

    const list = useMemo(() => {
        const today = startOfDay(new Date())

        return sortByDate(events.filter(e =>
            (dateFilter || isFuture(e, today))
            && matchesCategory(e, category)
            && matchesDateFilter(e, dateFilter)
            && matchesSearch(e, submittedQuery)
        ))
    }, [events, category, dateFilter, submittedQuery])

    logger.debug('Explorar -> render')

    return <div className="-mx-4 md:mx-0">
        {/* === CABECERA === */}
        <section className="sticky top-14 z-30 border-b border-[color:var(--border)] bg-[color:var(--background)]/95 px-4 pb-3 pt-3 backdrop-blur md:static md:py-8">
            <h1 className="hidden font-display text-3xl font-extrabold tracking-tight md:block">
                Explora y <span className="mark-yellow">entérate</span>
            </h1>

            <p className="mt-1.5 hidden max-w-xl text-sm text-[color:var(--muted-foreground)] md:block">
                Cotillea qué está pasando por Granada — pa' que te enteres de to' 👀
            </p>

            {/* === BUSCADOR === */}
            <form
                onSubmit={handleSubmit}
                className="mt-3 flex h-10 w-full items-center gap-2 rounded-full border-2 border-[color:var(--foreground)] bg-[color:var(--background)] px-3 shadow-[2px_2px_0_0_var(--foreground)] transition focus-within:-translate-y-0.5 md:mt-6 md:h-auto md:px-5 md:py-2.5"
            >
                <Icon name="search" className="h-4 w-4 shrink-0 text-[color:var(--muted-foreground)]" />
                <input
                    type="search"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Busca planes en Granada"
                    className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-[color:var(--muted-foreground)] md:text-base"
                />
                {query && <button
                    type="button"
                    onClick={handleClearQuery}
                    aria-label="Limpiar búsqueda"
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[color:var(--muted-foreground)] hover:bg-[color:var(--muted)] hover:text-[color:var(--foreground)]"
                >
                    <Icon name="x" className="h-3.5 w-3.5" />
                </button>}
                <button
                    type="submit"
                    className="hidden shrink-0 rounded-full bg-[color:var(--foreground)] px-4 py-1.5 text-sm font-semibold text-[color:var(--background)] md:inline-block"
                >
                    Buscar
                </button>
            </form>

            {/* === CHIPS CATEGORÍA === */}
            <div className="-mx-4 mt-3 flex gap-2.5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-4 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
                {CATEGORIES.map(c => {
                    const active = category === c.name

                    return <button
                        key={c.name}
                        type="button"
                        onClick={() => setCategory(c.name)}
                        aria-pressed={active}
                        className="flex h-8 shrink-0 items-center gap-1 rounded-full border-2 border-[color:var(--foreground)] px-3 text-[12px] font-bold transition active:scale-[0.97] md:h-auto md:gap-1.5 md:px-3.5 md:py-2 md:text-sm"
                        style={{
                            backgroundColor: active ? c.color : 'var(--background)',
                            color: active ? categoryTextColor(c.name) : 'var(--foreground)',
                            boxShadow: active ? '2px 2px 0 var(--foreground)' : `2px 2px 0 ${c.color}`
                        }}
                    >
                        <span>{c.emoji}</span>
                        {c.name}
                    </button>
                })}
            </div>
        </section>

        {/* === FILTROS TEMPORALES + LISTADO === */}
        <section className="px-4 pb-8 pt-4 md:pt-6">
            <div className="mb-4 flex gap-2">
                {DATE_FILTERS.map(f => {
                    const active = dateFilter === f.value

                    return <button
                        key={f.value}
                        type="button"
                        onClick={() => setDateFilter(active ? null : f.value)}
                        aria-pressed={active}
                        className={`flex h-7 shrink-0 items-center rounded-full border px-2.5 text-[11px] font-semibold transition active:scale-[0.97] md:h-8 md:px-3 md:text-xs ${active ? 'border-[color:var(--foreground)] bg-[color:var(--foreground)] text-[color:var(--background)]' : 'border-[color:var(--border)] bg-[color:var(--background)] text-[color:var(--muted-foreground)]'}`}
                    >
                        {f.label}
                    </button>
                })}
            </div>

            <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-[12px] font-semibold text-[color:var(--muted-foreground)] md:text-sm">
                    {list.length} {list.length === 1 ? 'plan' : 'planes'}
                </p>
                {hasActiveFilters && <button
                    type="button"
                    onClick={handleClearFilters}
                    className="inline-flex h-8 items-center rounded-full border-2 border-[color:var(--foreground)] bg-[color:var(--background)] px-3 text-[11px] font-bold text-[color:var(--foreground)] transition active:scale-[0.97]"
                >
                    Limpiar filtros
                </button>}
            </div>

            {list.length > 0 ? <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {list.map(e => <EventCard key={e.id} event={e} />)}
            </div> : <div className="rounded-2xl border-2 border-dashed border-[color:var(--border)] p-6 text-center">
                <p className="text-[color:var(--muted-foreground)]">No hay planes con estos filtros</p>
                {hasActiveFilters && <button
                    type="button"
                    onClick={handleClearFilters}
                    className="mt-4 inline-flex h-9 items-center rounded-full border-2 border-[color:var(--foreground)] bg-[color:var(--background)] px-4 text-sm font-bold text-[color:var(--foreground)] transition active:scale-[0.97]"
                >
                    Limpiar filtros
                </button>}
            </div>}
        </section>
    </div>
}
