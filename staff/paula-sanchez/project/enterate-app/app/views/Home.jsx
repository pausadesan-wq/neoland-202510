import { useState, useEffect } from 'react'

import { EventList } from './components/EventList'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'

// Home mínimo — el rediseño completo (hero, "esta semana", descubrimiento…) llega en la Fase 6.

export function Home({ onGoToEventDetail }) {
    logger.debug('Home -> call')

    const { onError } = useContext()

    const [name, setName] = useState(null)

    useEffect(() => {
        logger.debug('Home -> useEffect')

        try {
            logic.getLoggedInUser()
                .then(user => setName(user.name))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    logger.debug('Home -> render')

    return <div className="py-6">
        <h1 className="text-3xl font-extrabold">
            Hola{name ? `, ${name}` : ''} 👋
        </h1>
        <p className="mt-1 text-[color:var(--muted-foreground)]">Estos son los planes en Granada.</p>

        <div className="mt-6">
            <EventList onGoToEventDetail={onGoToEventDetail} />
        </div>
    </div>
}
