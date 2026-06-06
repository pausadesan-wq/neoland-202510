import { Anchor } from './components/commons/Anchor'

import { logger } from '../logger'

export function Landing({ onGoToLogin, onGoToRegister }) {
    logger.debug('Landing -> call')

    const handleLoginClick = event => {
        event.preventDefault()

        onGoToLogin()
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        onGoToRegister()
    }

    logger.debug('Landing -> render')

    return <div className="py-8">
        <h1 className="text-4xl font-extrabold">Planes y cultura en Granada</h1>
        <p className="mt-3 text-[color:var(--muted-foreground)]">
            ENTÉRATE de todo lo que pasa en Granada. Descubre planes, sube los tuyos y comparte.
        </p>

        <nav className="mt-6 flex gap-3">
            <Anchor onClick={handleLoginClick}>Entrar</Anchor>
            <span className="text-[color:var(--muted-foreground)]">o</span>
            <Anchor onClick={handleRegisterClick}>Crear cuenta</Anchor>
        </nav>
    </div>
}
