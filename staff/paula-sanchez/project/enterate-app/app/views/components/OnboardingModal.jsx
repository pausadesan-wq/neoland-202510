import { useEffect, useState } from 'react'
import { Link } from 'react-router'

import { Logo } from './Logo'

import { logic } from '../../logic'

// === ONBOARDING ===
// Modal fullscreen para invitados. Se cierra con las 3 acciones y guarda el dismiss en localStorage
// (solo estado visual — no autenticación, no datos de negocio).

const DISMISS_KEY = 'enterate:onboarding-dismissed'

export function OnboardingModal() {
    const [open, setOpen] = useState(false)

    const loggedIn = logic.isUserLoggedIn()

    useEffect(() => {
        if (loggedIn) {
            setOpen(false)
            return
        }

        try {
            const dismissed = localStorage.getItem(DISMISS_KEY)
            if (!dismissed) setOpen(true)
        } catch {
            setOpen(true)
        }
    }, [loggedIn])

    const close = () => {
        try {
            localStorage.setItem(DISMISS_KEY, '1')
        } catch { /* ignore */ }

        setOpen(false)
    }

    if (!open) return null

    return <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
        className="fixed inset-0 z-[100] flex flex-col bg-[color:var(--background)]"
    >
        <header className="px-5 pt-6">
            <Logo />
        </header>

        <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-5 py-8">
            <div className="mx-auto mb-5 grid h-28 w-28 place-items-center rounded-3xl border-2 border-[color:var(--foreground)] bg-[color:var(--brand-yellow)] shadow-[4px_4px_0_0_var(--foreground)]">
                <span className="text-[56px]" role="img" aria-label="saludo">👋</span>
            </div>

            <h1
                id="onboarding-title"
                className="text-center font-display text-2xl font-extrabold leading-tight"
            >
                Bienvenidx a{' '}
                <span className="font-display font-extrabold">
                    EN<span className="mark-yellow">TÉ</span>RATE
                </span>
            </h1>

            <p className="mt-2 text-center text-[13px] text-[color:var(--muted-foreground)]">
                Entérate de los planes de Granada antes que nadie.
            </p>

            <div className="mt-8 flex flex-col gap-2.5">
                <Link
                    to="/login"
                    onClick={close}
                    className="inline-flex h-12 w-full items-center justify-center rounded-full border-2 border-[color:var(--foreground)] bg-[color:var(--foreground)] text-sm font-extrabold text-[color:var(--background)] active:translate-y-0.5"
                >
                    Iniciar sesión
                </Link>
                <Link
                    to="/register"
                    onClick={close}
                    className="inline-flex h-12 w-full items-center justify-center rounded-full border-2 border-[color:var(--foreground)] bg-[color:var(--brand-yellow)] text-sm font-extrabold text-[color:var(--foreground)] active:translate-y-0.5"
                >
                    Crear cuenta
                </Link>
                <button
                    type="button"
                    onClick={close}
                    className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
                >
                    Continuar como invitado
                </button>
            </div>
        </main>

        <footer className="px-5 pb-6 pt-2 text-center text-[11px] text-[color:var(--muted-foreground)]">
            Al continuar aceptas nuestras condiciones de uso.
        </footer>
    </div>
}
