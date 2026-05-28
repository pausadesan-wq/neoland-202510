import { useState, useEffect } from 'react'

import { useParams } from 'react-router'

import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { Button } from './components/commons/Button'
import { Anchor } from './components/commons/Anchor'
import { Spinner } from './components/Spinner'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'

export function ModifyEvent({ onGoBack }) {
    logger.debug('ModifyEvent -> call')

    const { onSuccess, onError } = useContext()

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

    const handleBackClick = event => {
        event.preventDefault()

        onGoBack(eventId)
    }

    const handleModifyEventSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const birthdate = form.birthdate.value
        const weight = Number(form.weight.value)
        const image = form.image.value

        try {
            logic.modifyEvent(eventId, name, birthdate, weight, image)
                .then(() => onSuccess('event successfully modified'))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    logger.debug('ModifyEvent -> render')

    return <div className="p-4">
        <h1 className="font-bold text-xl">MyPet</h1>

        <div className="flex justify-between">
            <h2 className="font-bold">Modify Event</h2>

            <Anchor onClick={handleBackClick}>&lt; Back</Anchor>
        </div>

        {event ? (() => {
            const zuluDate = new Date(event.birthdate)
            const offsetMillis = zuluDate.getTimezoneOffset() * 60 * 1000
            const localDate = new Date(zuluDate.getTime() - offsetMillis)
            const locaDateString = localDate.toISOString().split('T')[0]

            return <Form onSubmit={handleModifyEventSubmit}>
                <Field alias="name" type="text" defaultValue={event.name}>Name</Field>

                <Field alias="birthdate" type="date" defaultValue={locaDateString}>Birthdate</Field>

                <Field alias="weight" type="number" defaultValue={event.weight} step="0.1">Weight (kg)</Field>

                <Field alias="image" type="url" defaultValue={event.image}>Image</Field>

                <Button className="self-center mt-4" type="submit">Modify Event</Button>
            </Form>
        })() : <Spinner />}
    </div>
}
