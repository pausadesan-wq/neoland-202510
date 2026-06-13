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

    const clearFeedbackAndNavigate = path => {
        setFeedback(null)
        navigate(path)
    }

    const handleGoToLogin = () => clearFeedbackAndNavigate('/login')
    const handleGoToRegister = () => clearFeedbackAndNavigate('/register')
    const handleGoToHome = () => clearFeedbackAndNavigate('/')
    const handleGoToAddEvent = () => clearFeedbackAndNavigate('/crear')
    const handleGoToProfile = () => clearFeedbackAndNavigate('/perfil')
    const handleGoToEventDetail = eventId => clearFeedbackAndNavigate(`/evento/${eventId}`)
    const handleGoToModifyEvent = eventId => clearFeedbackAndNavigate(`/evento/${eventId}/editar`)

    const handleError = error => {
        if (error instanceof AuthError) {
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
        {feedback && <Feedback feedback={feedback} />}

        <Routes>
            <Route element={<Layout />}>
                {/* === RUTAS PÚBLICAS === */}
                <Route path="/" element={<Home />} />
                <Route path="/explorar" element={<Explorar />} />
                <Route path="/evento/:eventId" element={<EventDetail onGoToHome={handleGoToHome} onGoToModifyEvent={handleGoToModifyEvent} />} />

                {/* === RUTAS PROTEGIDAS === */}
                <Route path="/crear" element={loggedIn ? <AddEvent onGoToHome={handleGoToHome} /> : <Navigate to="/login" />} />
                <Route path="/evento/:eventId/editar" element={loggedIn ? <ModifyEvent onGoBack={handleGoToEventDetail} /> : <Navigate to="/login" />} />
                <Route path="/guardados" element={loggedIn ? <Guardados /> : <Navigate to="/login" />} />
                <Route path="/perfil" element={loggedIn ? <Profile onGoToHome={handleGoToHome} /> : <Navigate to="/login" />} />

                {/* === AUTH === */}
                <Route path="/login" element={!loggedIn ? <Login onUserLoggedIn={handleGoToHome} onGoToRegister={handleGoToRegister} /> : <Navigate to="/" />} />
                <Route path="/register" element={!loggedIn ? <Register onGoToLogin={handleGoToLogin} /> : <Navigate to="/" />} />
            </Route>
        </Routes>
    </Context.Provider>
}
