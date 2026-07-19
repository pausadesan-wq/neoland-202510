import { useEffect, useState } from 'react'
import { Link } from 'react-router'

import { EventCard } from './components/EventCard'
import { Spinner } from './components/Spinner'

import { useContext } from '../context'

import { logic } from '../logic'

import {
    startOfDay,
    eventDate,
    isFuture,
    thisWeekEvents,
    hiddenGems
} from './lib/events'

import { useSavedEvents } from './lib/useSavedEvents'

import { logger } from '../logger'

// Home pública — funciona con y sin login. Datos reales vía GET /events.

export function Home() {
    logger.debug('Home -> call')

    const { onError } = useContext()

    const { savedIds, toggleSave, pendingId } = useSavedEvents()

    // null = todavía cargando. [] = la API ha respondido y no hay eventos.
    // Distinguirlos evita pintar contadores a 0 y estados vacíos antes de tener datos.
    const [events, setEvents] = useState(null)

    useEffect(() => {
        try {
            logic.getEvents()
                .then(events => setEvents(events))
                .catch(error => {
                    setEvents([])

                    onError(error)
                })
        } catch (error) {
            setEvents([])

            onError(error)
        }
    }, [])

    logger.debug('Home -> render')

    if (!events) return <Spinner />

    // === Stats derivadas ===
    const today = startOfDay(new Date())
    const dayMs = 24 * 60 * 60 * 1000
    const weekEnd = new Date(today.getTime() + 7 * dayMs)
    const monthEnd = new Date(today.getTime() + 30 * dayMs)

    const future = events.filter(e => isFuture(e, today))

    const stats = {
        totalActive: future.length,
        todayCount: future.filter(e => startOfDay(eventDate(e.date)).getTime() === today.getTime()).length,
        thisWeekCount: future.filter(e => startOfDay(eventDate(e.date)) <= weekEnd).length,
        thisMonthCount: future.filter(e => startOfDay(eventDate(e.date)) <= monthEnd).length,
        freeCount: future.filter(e => e.priceType === 'Gratis').length,
        paidCount: future.filter(e => e.priceType !== 'Gratis').length
    }

    const weekList = thisWeekEvents(events, today).slice(0, 3)
    const weekIds = new Set(weekList.map(e => e.id))
    const gemsList = hiddenGems(events, today).filter(e => !weekIds.has(e.id)).slice(0, 2)

    // -mt-6 cancela el py-6 de <main> en móvil: en remix-reference el hero arranca pegado
    // al Header, sin ese hueco extra. En desktop se mantiene el espaciado actual.
    return <div className="-mx-4 -mt-6 md:mx-0 md:mt-0">
        {/* === HERO === */}
        <section className="px-4 pb-3 pt-3">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--muted)]/60 px-2 py-0.5 text-[10.5px] font-medium text-[color:var(--foreground)]/70">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--brand-neon)]" />
                granada ahora · <span className="font-semibold text-[color:var(--foreground)]/80">{stats.totalActive}</span> planes activos
            </p>

            <h1 className="mt-2 font-display text-[28px] font-extrabold leading-[0.95] tracking-tight md:text-4xl">
                ¿No te has <span className="mark-yellow">enterao</span>?
            </h1>

            <p className="mt-1.5 text-[13px] leading-snug text-[color:var(--muted-foreground)] md:text-base">
                Planes y eventos actuales en Granada — pa' que te enteres de to'! 👀
            </p>

            <div className="mt-4 flex items-center gap-2.5">
                <Link
                    to="/explorar"
                    className="inline-flex min-h-9 flex-[1.5] items-center justify-center rounded-full bg-[color:var(--brand-blue)] px-3 py-1 text-[13px] font-extrabold text-white transition active:scale-[0.98]"
                >
                    Cotillea qué pasa →
                </Link>
                <Link
                    to="/crear"
                    className="inline-flex min-h-9 flex-1 items-center justify-center rounded-full border-[3px] border-[color:var(--foreground)] bg-[color:var(--background)] px-3 py-1 text-[13px] font-extrabold shadow-[3px_3px_0_var(--foreground)] active:scale-[0.98]"
                >
                    Subir plan
                </Link>
            </div>
        </section>

        {/* === STATS STRIP === */}
        <section className="border-b border-[color:var(--border)] px-4 pb-3 pt-1">
            <div className="flex gap-2.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <StatChip n={stats.totalActive} label="activos" />
                <StatChip n={stats.thisMonthCount} label="este mes" accent="var(--brand-pink)" />
                <StatChip n={stats.thisWeekCount} label="esta semana" accent="var(--brand-purple)" />
                <StatChip n={stats.todayCount} label="hoy" accent="var(--brand-coral)" />
                <StatChip n={stats.freeCount} label="gratis" accent="var(--brand-green)" />
                <StatChip n={stats.paidCount} label="de pago" accent="var(--brand-blue)" />
            </div>
        </section>

        {/* === ESTA SEMANA === */}
        <section className="px-4 pb-5 pt-5">
            <div className="mb-2.5 flex items-baseline justify-between">
                <h2 className="font-display text-[18px] font-extrabold leading-tight md:text-2xl">
                    Esta <span className="mark-yellow">semana</span>
                </h2>
                <Link to="/explorar" className="text-[12px] font-bold text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]">
                    Toda la agenda →
                </Link>
            </div>

            {weekList.length === 0
                ? <p className="text-sm text-[color:var(--muted-foreground)]">No hay planes esta semana. <Link to="/explorar" className="font-semibold underline">Explora la agenda completa</Link>.</p>
                : <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {weekList.map(e => <EventCard key={e.id} event={e} saved={savedIds.has(e.id)} savePending={pendingId === e.id} onToggleSave={toggleSave} />)}
                </div>
            }
        </section>

        {/* === COSITAS OCULTAS === */}
        <section className="border-t border-[color:var(--border)] bg-[color:var(--muted)]/40 px-4 pb-6 pt-5">
            <div className="mb-2.5">
                <span
                    className="inline-flex h-5 items-center rounded-md bg-[color:var(--brand-coral)] px-2 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm"
                    style={{ transform: 'rotate(-3deg)', transformOrigin: 'center' }}
                >
                    cositas ocultas
                </span>
                <div className="mt-2 flex items-start justify-between gap-3">
                    <h2 className="font-display text-[18px] font-extrabold leading-tight md:text-2xl">
                        ¿No te has enterao de{' '}
                        <span className="italic underline decoration-[color:var(--brand-coral)] decoration-2 underline-offset-4">
                            esto
                        </span>
                        ?
                    </h2>
                    <Link to="/explorar" className="shrink-0 pt-0.5 text-[12px] font-bold text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]">
                        Ver todos →
                    </Link>
                </div>
                <p className="mt-1 text-[12.5px] text-[color:var(--muted-foreground)]">
                    Eventos más adelante o con menos gente.
                </p>
            </div>

            {gemsList.length === 0
                ? <p className="text-sm text-[color:var(--muted-foreground)]">Nada oculto por descubrir por ahora.</p>
                : <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {gemsList.map(e => <EventCard key={e.id} event={e} saved={savedIds.has(e.id)} savePending={pendingId === e.id} onToggleSave={toggleSave} />)}
                </div>
            }
        </section>

        {/* === CÓMO FUNCIONA === */}
        {/* El ::after prolonga el fondo blanco sobre el hueco que el Layout reserva abajo,
            para que la sección llegue hasta el borde de la MobileTabBar sin franja crema. */}
        <section className="relative border-t border-[color:var(--border)] bg-[color:var(--surface-warm)] px-4 py-6 after:absolute after:inset-x-0 after:top-full after:h-[var(--content-bottom)] after:bg-[color:var(--surface-warm)] after:content-['']">
            <span
                className="inline-flex h-5 items-center rounded-md bg-[color:var(--brand-yellow)] px-2 text-[10px] font-extrabold uppercase tracking-wider text-[color:var(--foreground)] shadow-sm"
                style={{ transform: 'rotate(-3deg)', transformOrigin: 'center' }}
            >
                cómo va la cosa
            </span>

            <h2 className="mt-2.5 font-display text-[20px] font-extrabold leading-[1.05] md:text-2xl">
                Cómo funciona EN<span className="mark-yellow">TÉ</span>RATE
            </h2>

            <div className="mt-6 space-y-3">
                <HowStep n="01" color="var(--brand-blue)" title="Planes que no salen en motores de búsqueda" emoji="👀" />
                <HowStep n="02" color="var(--brand-coral)" title="Lo que ves en redes o de boca en boca, todo aquí." emoji="📡" />
                <HowStep n="03" color="var(--brand-purple)" title="¿Te has enterao de algo? Compártelo con el resto." emoji="✍️" />
            </div>
        </section>
    </div>
}

// === Subcomponentes locales ===

function StatChip({ n, label, accent }) {
    return <div className="inline-flex min-h-7 shrink-0 items-center gap-1.5 rounded-full border border-[color:var(--border)] bg-[color:var(--muted)]/50 px-2.5 text-[11.5px] font-medium leading-none text-[color:var(--foreground)]/70">
        <span
            className="font-display text-[13.5px] font-extrabold tabular-nums"
            style={{ color: accent || 'var(--foreground)' }}
        >
            {n}
        </span>
        <span>{label}</span>
    </div>
}

function HowStep({ n, color, title, emoji }) {
    return <div className="relative overflow-hidden rounded-2xl border-2 border-[color:var(--foreground)] bg-[color:var(--card)] px-4 py-3.5 shadow-[2px_2px_0_0_var(--foreground)]">
        <div className="flex items-start gap-3">
            <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-[13px] font-extrabold text-white"
                style={{ backgroundColor: color }}
            >
                {n}
            </span>
            <div className="min-w-0 flex-1">
                <p className="font-display text-[15px] font-extrabold leading-tight">
                    {title} <span className="ml-0.5">{emoji}</span>
                </p>
            </div>
        </div>
    </div>
}
