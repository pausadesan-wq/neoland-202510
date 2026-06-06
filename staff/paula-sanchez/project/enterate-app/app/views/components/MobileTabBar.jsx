import { Link, NavLink, useLocation, useNavigate } from 'react-router'

import { Icon } from './Icon'

// === MOBILE TAB BAR ===
// Barra inferior fija (solo móvil). Oculta en /login y /register.

export function MobileTabBar() {
    const location = useLocation()
    const navigate = useNavigate()

    const isAuthScreen = location.pathname === '/login' || location.pathname === '/register'

    if (isAuthScreen) return null

    const linkClass = ({ isActive }) => `group flex h-full flex-1 flex-col items-center justify-center gap-0.5 text-[10px] transition ${isActive ? 'font-extrabold text-[color:var(--foreground)]' : 'font-semibold text-[color:var(--muted-foreground)]'}`

    return <nav
        aria-label="Navegación principal"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-[color:var(--border)] bg-[color:var(--background)]/95 backdrop-blur md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
        <ul className="mx-auto flex h-16 max-w-md items-stretch">
            <li className="flex flex-1">
                <NavLink to="/" end className={linkClass}>
                    <Icon name="home" className="h-5 w-5" />
                    <span className="leading-none">Inicio</span>
                </NavLink>
            </li>

            <li className="flex flex-1">
                <NavLink to="/explorar" className={linkClass}>
                    <Icon name="compass" className="h-5 w-5" />
                    <span className="leading-none">Explorar</span>
                </NavLink>
            </li>

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

            <li className="flex flex-1">
                <NavLink to="/guardados" className={linkClass}>
                    <Icon name="calendar" className="h-5 w-5" />
                    <span className="leading-none">Mis planes</span>
                </NavLink>
            </li>

            <li className="flex flex-1">
                <NavLink to="/perfil" className={linkClass}>
                    <Icon name="user" className="h-5 w-5" />
                    <span className="leading-none">Perfil</span>
                </NavLink>
            </li>
        </ul>
    </nav>
}
