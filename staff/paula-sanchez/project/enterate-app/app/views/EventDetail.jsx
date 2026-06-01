import { useState, useEffect } from 'react'

import { useParams } from 'react-router'

import { Anchor } from './components/commons/Anchor'
import { Button } from './components/commons/Button'
import { Spinner } from './components/Spinner'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'

export function EventDetail({ onGoToHome, onGoToModifyEvent }) {
    logger.debug('EventDetail -> call')

    const { onError } = useContext()

    const [event, setEvent] = useState(null)

    const { eventId } = useParams()

    useEffect(() => {
        try {
            logic.getEvent(eventId)
                .then(event => setEvent(event))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    const handleBackClick = e => {
        e.preventDefault()

        onGoToHome()
    }

    const handleGoToModifyEvent = () => onGoToModifyEvent(eventId)

    logger.debug('EventDetail -> render')

    return <div className="p-4">
        <h1 className="font-bold text-xl">MyPet</h1>

        <div className="flex justify-between">
            <h2 className="font-bold">Event</h2>

            <Anchor onClick={handleBackClick}>&lt; Back</Anchor>
        </div>

        {event ? (() => {
            const localDateString = new Date(event.date).toLocaleDateString()

            return <div className="flex flex-col items-center gap-4">
                <img src={event.image} className="w-full max-w-md object-cover" />

                <h3 className="font-bold text-lg">{event.title}</h3>

                <p>{event.description}</p>

                <p>{localDateString} · {event.time}</p>

                <p>{event.location}{event.district ? ` — ${event.district}` : ''}</p>

                {event.address && <p>{event.address}</p>}

                <p>Category: {event.category}</p>

                <p>Tags: {(event.tags || []).join(', ')}</p>

                <p>Price: {event.priceType}{event.price ? ` (${event.price})` : ''}</p>

                <p>Source: {event.sourceType}{event.sourceUrl ? ` · ${event.sourceUrl}` : ''}</p>

                <Button onClick={handleGoToModifyEvent}>Modify</Button>
            </div>
        })() : <Spinner />}
    </div>
}
