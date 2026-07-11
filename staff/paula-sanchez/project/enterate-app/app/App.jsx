import { useState } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router'

import { Login } from './views/Login'
import { Register } from './views/Register'
import { Home } from './views/Home'
import { AddEvent } from './views/AddEvent'
import { Profile } from './views/Profile'
import { EventDetail } from './views/EventDetail'
import { ModifyEvent } from './views/ModifyEvent'
import { Explorar } from './views/Explorar'
import { Guardados } from './views/Guardados'
import { NotLogged } from './views/NotLogged'

import { Layout } from './views/components/Layout'
import { Feedback } from './views/components/commons/Feedback'
import { Context } from './context'

import { AuthError, ValidationError, ExistenceError, DuplicityError, CredentialError } from 'com'
import { logic } from './logic'

import { logger } from './logger'

export function App() {
    logger.debug('App -> call')

    const [feedback, setFeedback] = useState(null)
    let loggedIn = false

    const navigate = useNavigate()

    try {
        loggedIn = logic.isUserLoggedIn()
    } catch (error) {
        setFeedback({ message: error.message, level: 'error' })
    }

    // Sesión muerta: el token sigue en sessionStorage pero el usuario ya no existe en la base
    // de datos (p. ej. después de ejecutar populate). La API responde 404 'user not found',
    // así que lo tratamos igual que un token inválido: cerrar sesión y volver a login.
    const isDeadSession = error => error instanceof AuthError
        || (error instanceof ExistenceError && error.message === 'user not found')

    const handleError = error => {
        if (isDeadSession(error)) {
            try {
                logic.logoutUser()

                logger.error(error)
                setFeedback({ message: 'sesión inválida, entra de nuevo', level: 'error' })
                navigate('/login')
            } catch (error) {
                logger.fatal(error)
                setFeedback({ message: 'error al cerrar sesión, inténtalo más tarde', level: 'error' })
            }
        } else if (error instanceof ValidationError) {
            logger.warn(error)
            setFeedback({ message: error.message, level: 'warn' })
        } else if (error instanceof ExistenceError || error instanceof CredentialError || error instanceof DuplicityError) {
            logger.error(error)
            setFeedback({ message: error.message, level: 'danger' })
        } else {
            logger.fatal(error)
            setFeedback({ message: 'algo ha fallado, inténtalo más tarde', level: 'error' })
        }
    }

    const handleSuccess = message => setFeedback({ message, level: 'success' })
    const handleClear = () => setFeedback(null)

    logger.debug('App -> render')

    const contextValue = {
        onSuccess: handleSuccess,
        onError: handleError,
        onClear: handleClear
    }

    return <Context.Provider value={contextValue}>
        {feedback && <Feedback feedback={feedback} onClose={handleClear} />}

        <Routes>
            <Route element={<Layout />}>
                {/* === RUTAS PÚBLICAS === */}
                <Route path="/" element={<Home />} />
                <Route path="/explorar" element={<Explorar />} />
                <Route path="/evento/:eventId" element={<EventDetail />} />

                {/* === RUTAS PROTEGIDAS === */}
                {/* Todas comparten la misma pantalla genérica de área privada (NotLogged).
                    Solo cambia `redirect`, para volver a la ruta original tras autenticarse. */}
                <Route path="/crear" element={loggedIn
                    ? <AddEvent />
                    : <NotLogged redirect="/crear" />} />
                <Route path="/evento/:eventId/editar" element={loggedIn
                    ? <ModifyEvent />
                    : <NotLogged />} />
                <Route path="/guardados" element={loggedIn
                    ? <Guardados />
                    : <NotLogged redirect="/guardados" />} />
                <Route path="/perfil" element={loggedIn
                    ? <Profile />
                    : <NotLogged redirect="/perfil" />} />

                {/* === AUTH === */}
                <Route path="/login" element={!loggedIn ? <Login /> : <Navigate to="/" />} />
                <Route path="/register" element={!loggedIn ? <Register /> : <Navigate to="/" />} />
            </Route>
        </Routes>
    </Context.Provider>
}
