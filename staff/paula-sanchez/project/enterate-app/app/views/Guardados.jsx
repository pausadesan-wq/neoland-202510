import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router'

import { EventCard } from './components/EventCard'
import { Spinner } from './components/Spinner'

import { useContext } from '../context'

import { logic } from '../logic'

import { eventDate, startOfDay } from './lib/events'

import { logger } from '../logger'

// === MIS PLANES ===
// 4 pestañas: guardados / voy / creados / pasados. Selección en la URL (?tab=).

const TABS = ['guardados', 'voy', 'creados', 'pasados']

export function Guardados() {
    logger.debug('Guardados -> call')

    const { onError } = useContext()

    const [searchParams, setSearchParams] = useSearchParams()
    const rawTab = searchParams.get('tab')
    const tab = TABS.includes(rawTab) ? rawTab : 'guardados'

    const [saved, setSaved] = useState(null)
    const [joined, setJoined] = useState(null)
    const [created, setCreated] = useState(null)

    useEffect(() => {
        try {
            Promise.all([
                logic.getSavedEvents(),
                logic.getJoinedEvents(),
                logic.getCreatedEvents()
            ])
                .then(([s, j, c]) => {
                    setSaved(s)
                    setJoined(j)
                    setCreated(c)
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    const setTab = next => setSearchParams({ tab: next })

    const today = startOfDay(new Date())

    // Guardados solo muestra planes que todavía se pueden hacer, aunque la referencia
    // siga guardada en Mongo. Voy/Pasados parten de los mismos eventos apuntados.
    const savedUpcoming = useMemo(() => (saved || []).filter(e => startOfDay(eventDate(e.date)) >= today), [saved])
    const upcoming = useMemo(() => (joined || []).filter(e => startOfDay(eventDate(e.date)) >= today), [joined])
    const past = useMemo(() => (joined || []).filter(e => startOfDay(eventDate(e.date)) < today), [joined])

    const list = tab === 'guardados' ? savedUpcoming
        : tab === 'voy' ? upcoming
            : tab === 'creados' ? created
                : past

    logger.debug('Guardados -> render')

    if (saved === null || joined === null || created === null) return <Spinner />

    return <div className="py-4 md:py-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
                <h1 className="font-display text-3xl font-extrabold leading-tight md:text-5xl">
                    Mis <span className="mark-yellow">planes</span>
                </h1>
                <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
                    Lo que has guardado, a lo que vas y los pasados.
                </p>
            </div>
            {tab === 'creados' && created.length > 0 && <Link
                to="/crear"
                className="rounded-full bg-[color:var(--foreground)] px-4 py-2 text-sm font-bold text-[color:var(--background)]"
            >
                Crear un plan →
            </Link>}
        </div>

        {/* === TABS === */}
        <div className="mt-4 grid grid-cols-4 gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--muted)]/40 p-1 md:mt-6 md:max-w-2xl md:gap-1.5">
            <TabBtn active={tab === 'guardados'} onClick={() => setTab('guardados')} label="Guardados" count={savedUpcoming.length} />
            <TabBtn active={tab === 'voy'} onClick={() => setTab('voy')} label="Voy" count={upcoming.length} />
            <TabBtn active={tab === 'creados'} onClick={() => setTab('creados')} label="Creados" count={created.length} />
            <TabBtn active={tab === 'pasados'} onClick={() => setTab('pasados')} label="Pasados" count={past.length} />
        </div>

        {/* === LISTADO === */}
        {list.length > 0 ? <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {list.map(e => <EventCard key={e.id} event={e} />)}
        </div> : <EmptyState tab={tab} />}
    </div>
}

// === Subcomponentes locales ===

function TabBtn({ active, onClick, label, count }) {
    return <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`flex w-full items-center justify-center gap-1.5 min-w-0 whitespace-nowrap rounded-full px-1 py-1.5 text-[11.5px] font-bold leading-none transition md:px-3 md:text-[12.5px] ${active
            ? 'bg-[color:var(--foreground)] text-[color:var(--background)] shadow-sm'
            : 'text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]'}`}
    >
        {label}
        <span className="opacity-60">{count}</span>
    </button>
}

function EmptyState({ tab }) {
    const config = {
        guardados: {
            emoji: '🔖',
            title: 'Aún no guardas nada',
            text: 'Cuando veas un plan que te flipe, dale al marcador.',
            cta: true
        },
        voy: {
            emoji: '🎟️',
            title: 'Aún no te has apuntado a nada',
            text: 'Cuando veas un plan que te mole, aquí aparecerá.',
            cta: true
        },
        creados: {
            emoji: '✍️',
            title: 'Todavía no has creado ningún plan',
            text: 'Comparte lo que está pasando en Granada.',
            createCta: true
        },
        pasados: {
            emoji: '🕓',
            title: 'Aún no hay planes anteriores',
            text: 'Cuando vayas a eventos, los verás aquí.'
        }
    }[tab]

    return <div className="mt-6 rounded-2xl border-2 border-dashed border-[color:var(--border)] p-8 text-center md:p-12">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border-2 border-[color:var(--foreground)] bg-[color:var(--brand-yellow)] text-xl shadow-[3px_3px_0_var(--foreground)]">
            {config.emoji}
        </div>
        <p className="mt-3 font-display text-lg font-extrabold">{config.title}</p>
        <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">{config.text}</p>
        {config.cta && <Link
            to="/explorar"
            className="mt-4 inline-block rounded-full bg-[color:var(--brand-blue)] px-4 py-2 text-sm font-bold text-white"
        >
            Explorar planes →
        </Link>}
        {config.createCta && <Link
            to="/crear"
            className="mt-4 inline-block rounded-full bg-[color:var(--foreground)] px-4 py-2 text-sm font-bold text-[color:var(--background)]"
        >
            Crear un plan →
        </Link>}
    </div>
}
