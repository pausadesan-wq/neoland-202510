import { useState } from 'react'

import { Anchor } from './components/commons/Anchor'
import { ChangeUserEmail } from './components/ChangeUserEmail'
import { ChangeUserPassword } from './components/ChangeUserPassword'
import { ChangeUserImage } from './components/ChangeUserImage'
import { ChangeUserName } from './components/ChangeUserName'
import { ChangeUserUsername } from './components/ChangeUserUsername'

import { useContext } from '../context'

import { logger } from '../logger'

export function Profile({ onGoToHome }) {
    logger.debug('Profile -> call')

    const { onClear } = useContext()

    const [view, setView] = useState(null)

    const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()
    }

    const handleChangeNameClick = event => {
        event.preventDefault()

        onClear()
        setView('change-name')
    }

    const handleChangeEmailClick = event => {
        event.preventDefault()

        onClear()
        setView('change-email')
    }

    const handleChangeUsernameClick = event => {
        event.preventDefault()

        onClear()
        setView('change-username')
    }

    const handlePasswordClick = event => {
        event.preventDefault()

        onClear()
        setView('change-password')
    }

    const handleImageClick = event => {
        event.preventDefault()

        onClear()
        setView('change-image')
    }

    logger.debug('Profile -> render')

    return <div className="mx-auto max-w-2xl py-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold">Perfil</h1>

            <Anchor onClick={handleBackClick}>&lt; Volver</Anchor>
        </div>

        <ul className="mt-6 flex flex-col gap-2">
            <li><Anchor onClick={handleChangeNameClick}>Cambiar nombre</Anchor></li>
            <li><Anchor onClick={handleChangeEmailClick}>Cambiar email</Anchor></li>
            <li><Anchor onClick={handleChangeUsernameClick}>Cambiar usuario</Anchor></li>
            <li><Anchor onClick={handlePasswordClick}>Cambiar contraseña</Anchor></li>
            <li><Anchor onClick={handleImageClick}>Cambiar imagen</Anchor></li>
        </ul>

        {view === 'change-name' && <ChangeUserName />}

        {view === 'change-email' && <ChangeUserEmail />}

        {view === 'change-username' && <ChangeUserUsername />}

        {view === 'change-password' && <ChangeUserPassword />}

        {view === 'change-image' && <ChangeUserImage />}
    </div>
}