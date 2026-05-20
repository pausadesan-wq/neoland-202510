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

    return <div className="p-4">
        <h1 className="font-bold text-xl">MyPet</h1>
        <p>Welcome!</p>

        <nav>
            <Anchor onClick={handleLoginClick}>Login</Anchor> or <Anchor onClick={handleRegisterClick}>Register</Anchor>
        </nav>
    </div>
}