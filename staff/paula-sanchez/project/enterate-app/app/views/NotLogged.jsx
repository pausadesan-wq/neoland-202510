import { Link, useNavigate } from 'react-router'

// === NOT LOGGED ===
// Vista compartida para invitados que intentan entrar a una sección protegida.
// Conserva la ruta destino en `redirect` para volver tras autenticarse.

export function NotLogged({
    redirect = '/',
    title = 'Entra para acceder a esta sección',
    description = 'Guarda planes, crea eventos y accede a tu perfil.'
}) {
    const navigate = useNavigate()

    const encoded = encodeURIComponent(redirect)

    const keepExploring = () => navigate('/')

    return <main className="mx-auto flex min-h-[70vh] max-w-sm flex-col items-center justify-center px-5 pb-16 pt-12 text-center">
        <div className="mb-4 grid h-16 w-16 place-items-center rounded-3xl border-2 border-[color:var(--foreground)] bg-[color:var(--brand-yellow)] shadow-[3px_3px_0_0_var(--foreground)]">
            <span className="text-3xl" role="img" aria-label="lock">🔒</span>
        </div>

        <h1 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">{description}</p>

        <div className="mt-6 flex w-full flex-col gap-2.5">
            <Link
                to={`/login?redirect=${encoded}`}
                className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[color:var(--foreground)] text-sm font-semibold text-[color:var(--background)] active:translate-y-0.5"
            >
                Iniciar sesión
            </Link>
            <Link
                to={`/register?redirect=${encoded}`}
                className="inline-flex h-11 w-full items-center justify-center rounded-full border-2 border-[color:var(--foreground)] bg-[color:var(--card)] text-sm font-semibold text-[color:var(--foreground)] active:translate-y-0.5"
            >
                Crear cuenta
            </Link>
            <button
                type="button"
                onClick={keepExploring}
                className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-bold text-[color:var(--foreground)] underline decoration-2 underline-offset-4 opacity-90 hover:opacity-100"
            >
                Seguir explorando
            </button>
        </div>
    </main>
}
