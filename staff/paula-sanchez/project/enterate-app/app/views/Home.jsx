import { useState, useEffect } from 'react'

import { Anchor } from './components/commons/Anchor'
import { Button } from './components/commons/Button'

import { EventList } from './components/EventList'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'

export function Home({ onGoToAddEvent, onUserLoggedOut, onGoToProfile, onGoToEventDetail }) {
    logger.debug('Home -> call')

    const { onError } = useContext()

    const [name, setName] = useState(null)
    const [image, setImage] = useState('https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dWF6c2VwcTFwaWdtNXRoZm9mZXltaWVnaGZmNnI3NTU5M3hndGNsMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4X0i61SrJIyPe/giphy.gif')

    useEffect(() => {
        logger.debug('Home -> useEffect')

        try {
            logic.getLoggedInUser()
                .then(user => {
                    setName(user.name)
                    setImage(user.image || image)
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    const handleAddEventClick = event => {
        event.preventDefault()

        onGoToAddEvent()
    }

    const handleLogoutClick = event => {
        event.preventDefault()

        try {
            logic.logoutUser()

            onUserLoggedOut()
        } catch (error) {
            setFeedback({ message: 'sorry, there was an error on logout, please, try it later', level: 'error' })
        }
    }

    const handleProfileClick = event => {
        event.preventDefault()

        onGoToProfile()
    }

    const handleGoToEventDetail = eventId => onGoToEventDetail(eventId)

    logger.debug('Home -> render')

    return <div className="p-4">
        <h1 className="font-bold text-xl">MyPet</h1>

        <h2 className="font-bold flex gap-2 items-center">Hello, {name || 'World'}! <img className="rounded-full w-10 h-10 object-cover" src={image} /></h2>

        <div className="flex justify-between">
            <Anchor onClick={handleAddEventClick}>+ Event</Anchor>

            <Anchor onClick={handleProfileClick}>Profile</Anchor>

            <Button type="button" onClick={handleLogoutClick}>Logout</Button>
        </div>

        <EventList onGoToEventDetail={handleGoToEventDetail} />
    </div>
}
