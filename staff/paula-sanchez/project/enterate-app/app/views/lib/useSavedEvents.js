import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { useContext } from '../../context'

import { logic } from '../../logic'

// === GUARDADOS ===
// Estado compartido por las vistas que pintan EventCard, para que el bookmark
// refleje y actualice el mismo dato. Espeja useSavedEvents de remix-reference
// pero sobre la arquitectura actual: savedEvents del usuario vía API.
//
// Cada vista lo llama una vez y se lo pasa a sus cards por props.

export function useSavedEvents() {
    const { onSuccess, onError } = useContext()

    const navigate = useNavigate()
    const location = useLocation()

    const [savedIds, setSavedIds] = useState(new Set())
    const [loaded, setLoaded] = useState(false)
    const [pendingId, setPendingId] = useState(null)

    const loggedIn = logic.isUserLoggedIn()

    useEffect(() => {
        // El invitado no tiene guardados: no hay nada que pedir.
        if (!loggedIn) {
            setLoaded(true)
            return
        }

        try {
            logic.getSavedEvents()
                .then(events => setSavedIds(new Set(events.map(event => event.id))))
                .catch(error => onError(error))
                .finally(() => setLoaded(true))
        } catch (error) {
            setLoaded(true)

            onError(error)
        }
    }, [])

    const toggleSave = eventId => {
        // Invitado: al login, y de vuelta a donde estaba.
        if (!loggedIn) {
            const redirect = `${location.pathname}${location.search}`

            return navigate(`/login?redirect=${encodeURIComponent(redirect)}`)
        }

        if (pendingId) return

        const isSaved = savedIds.has(eventId)

        setPendingId(eventId)

        try {
            const call = isSaved ? logic.unsaveEvent(eventId) : logic.saveEvent(eventId)

            call
                .then(() => {
                    setSavedIds(prev => {
                        const next = new Set(prev)

                        if (isSaved) next.delete(eventId)
                        else next.add(eventId)

                        return next
                    })

                    onSuccess(isSaved ? 'Quitado de guardados' : 'Guardado ✓')
                })
                .catch(error => onError(error))
                .finally(() => setPendingId(null))
        } catch (error) {
            setPendingId(null)

            onError(error)
        }
    }

    return { savedIds, toggleSave, pendingId, loaded }
}
