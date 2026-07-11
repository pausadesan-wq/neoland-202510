import { Link, useLocation, useNavigate } from 'react-router'

import { Logo } from './Logo'
import { Icon } from './Icon'

import { logic } from '../../logic'

// === HEADER ===
// Compacto en móvil (logo + icono buscar). Enriquecido en desktop (nav + auth).

export function Header() {
    const location = useLocation()
    const navigate = useNavigate()

    const isAuthScreen = location.pathname === '/login' || location.pathname === '/register'
    const isExplore = location.pathname.startsWith('/explorar')

    const loggedIn = logic.isUserLoggedIn()

    const handleLogout = () => {
        try {
            logic.logoutUser()
        } catch { /* noop */ }

        navigate('/')
    }

    // El padding superior reserva el hueco del notch/Dynamic Island (0 en pantallas sin él),
    // igual que hace MobileTabBar abajo. min-h-9 mantiene el alto del Header estable aunque
    // la lupa no se pinte (en Explorar), para que la cabecera sticky no baile.
    return <header
        className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--background)]/85 backdrop-blur"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
        <div className="mx-auto flex min-h-9 max-w-7xl items-center gap-2 px-4 py-2.5 sm:gap-3 md:gap-5 md:px-8 md:py-3">
            <Logo />

            {/* === NAV DESKTOP === */}
            <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
                <Link
                    to="/explorar"
                    className="rounded-full px-3 py-1.5 text-[color:var(--muted-foreground)] transition hover:bg-[color:var(--muted)] hover:text-[color:var(--foreground)]"
                >
                    Explorar
                </Link>
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Buscar (móvil) */}
            {!isExplore && !isAuthScreen && <Link
                to="/explorar"
                aria-label="Buscar"
                className="grid h-9 w-9 place-items-center rounded-full text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)] md:hidden"
            >
                <Icon name="search" />
            </Link>}

            {/* CTA Subir plan (desktop) */}
            {loggedIn && !isAuthScreen && <Link
                to="/crear"
                className="hidden items-center gap-1.5 rounded-full bg-[color:var(--brand-yellow)] px-3.5 py-2 text-sm font-bold text-[color:var(--foreground)] transition hover:-translate-y-0.5 md:inline-flex"
            >
                <Icon name="plus" className="h-4 w-4" /> Subir plan
            </Link>}

            {/* === AUTH DESKTOP === */}
            <nav className="hidden items-center gap-2 text-sm font-medium md:flex">
                {loggedIn ? <>
                    <Link
                        to="/guardados"
                        aria-label="Mis planes"
                        className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--border)] hover:border-[color:var(--foreground)]"
                    >
                        <Icon name="bookmark" className="h-4 w-4" />
                    </Link>
                    <Link
                        to="/perfil"
                        aria-label="Perfil"
                        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[color:var(--border)] px-3 hover:border-[color:var(--foreground)]"
                    >
                        <Icon name="user" className="h-4 w-4" />
                    </Link>
                    <button
                        onClick={handleLogout}
                        aria-label="Salir"
                        className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--border)] hover:border-[color:var(--foreground)]"
                    >
                        <Icon name="logout" className="h-4 w-4" />
                    </button>
                </> : <>
                    <Link
                        to="/login"
                        className="rounded-full px-3 py-2 text-sm hover:bg-[color:var(--muted)]"
                    >
                        Entrar
                    </Link>
                    <Link
                        to="/register"
                        className="rounded-full bg-[color:var(--foreground)] px-4 py-2 text-sm text-[color:var(--background)] transition hover:-translate-y-0.5"
                    >
                        Crear cuenta
                    </Link>
                </>}
            </nav>
        </div>
    </header>
}
