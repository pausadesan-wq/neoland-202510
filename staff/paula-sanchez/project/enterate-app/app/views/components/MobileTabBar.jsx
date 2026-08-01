import { NavLink, useLocation, useNavigate } from 'react-router'

import { Icon } from './Icon'

// === MOBILE TAB BAR ===
// Barra inferior fija (solo móvil). Oculta en /login y /register.
// La pestaña activa lleva pastilla amarilla detrás del icono, como en el diseño de referencia.

export function MobileTabBar() {
    const location = useLocation()
    const navigate = useNavigate()

    const isAuthScreen = location.pathname === '/login' || location.pathname === '/register'

    if (isAuthScreen) return null

    return <nav
        aria-label="Navegación principal"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-[color:var(--border)] bg-[color:var(--background)]/95 backdrop-blur md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
        <ul className="mx-auto flex h-16 max-w-md items-stretch">
            <Tab to="/" end icon="home" label="Inicio" />

            <Tab to="/explorar" icon="compass" label="Explorar" />

            {/* Botón central Subir plan */}
            <li className="flex flex-1 items-center justify-center">
                <button
                    type="button"
                    aria-label="Subir plan"
                    onClick={() => navigate('/crear')}
                    className="-mt-3 grid h-11 w-11 place-items-center rounded-full bg-[color:var(--brand-yellow)] text-[color:var(--foreground)] shadow-md ring-4 ring-[color:var(--background)] transition active:scale-95"
                >
                    <Icon name="plus" className="h-5 w-5" strokeWidth={2.75} />
                </button>
            </li>

            <Tab to="/guardados" icon="calendar" label="Mis planes" />

            <Tab to="/perfil" icon="user" label="Perfil" />
        </ul>
    </nav>
}

// === Subcomponente local ===

function Tab({ to, end, icon, label }) {
    const linkClass = ({ isActive }) => `flex h-full flex-1 flex-col items-center justify-center gap-0.5 text-[10px] transition ${isActive
        ? 'font-extrabold text-[color:var(--foreground)]'
        : 'font-semibold text-[color:var(--muted-foreground)]'}`

    return <li className="flex flex-1">
        <NavLink to={to} end={end} className={linkClass}>
            {({ isActive }) => <>
                <span className={`grid h-7 w-12 place-items-center rounded-full transition-colors ${isActive ? 'bg-[color:var(--brand-yellow)]/25' : ''}`}>
                    <Icon
                        name={icon}
                        strokeWidth={2.25}
                        className={`h-[19px] w-[19px] transition-all ${isActive ? 'scale-110 fill-[color:var(--brand-yellow)] [stroke:oklch(0.45_0.16_85)]' : ''}`}
                    />
                </span>
                <span className="leading-none">{label}</span>
            </>}
        </NavLink>
    </li>
}
