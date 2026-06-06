import { useState, useEffect } from 'react'

import { useParams } from 'react-router'

import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { Button } from './components/commons/Button'
import { Anchor } from './components/commons/Anchor'
import { Spinner } from './components/Spinner'

import { useContext } from '../context'

import { logic } from '../logic'

import { EVENT_CATEGORIES, EVENT_PRICE_TYPES, EVENT_SOURCE_TYPES } from 'com'

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

    const handleBackClick = e => {
        e.preventDefault()

        onGoBack(eventId)
    }

    const handleModifyEventSubmit = e => {
        e.preventDefault()

        const form = e.target

        const title = form.title.value
        const description = form.description.value
        const date = form.date.value
        const time = form.time.value
        const location = form.location.value
        const address = form.address.value
        const district = form.district.value
        const category = form.category.value
        const tags = form.tags.value.split(',').map(t => t.trim()).filter(t => t.length > 0)
        const priceType = form.priceType.value
        const price = form.price.value
        const image = form.image.value
        const sourceType = form.sourceType.value
        const sourceUrl = form.sourceUrl.value

        try {
            logic.modifyEvent(eventId, title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl)
                .then(() => onSuccess('event successfully modified'))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    logger.debug('ModifyEvent -> render')

    return <div className="mx-auto max-w-2xl py-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold">Editar plan</h1>

            <Anchor onClick={handleBackClick}>&lt; Volver</Anchor>
        </div>

        {event ? (() => {
            const zuluDate = new Date(event.date)
            const offsetMillis = zuluDate.getTimezoneOffset() * 60 * 1000
            const localDate = new Date(zuluDate.getTime() - offsetMillis)
            const localDateString = localDate.toISOString().split('T')[0]

            return <Form onSubmit={handleModifyEventSubmit}>
                <Field alias="title" type="text" defaultValue={event.title}>Title</Field>

                <Field alias="description" type="text" defaultValue={event.description}>Description</Field>

                <Field alias="date" type="date" defaultValue={localDateString}>Date</Field>

                <Field alias="time" type="time" defaultValue={event.time}>Time</Field>

                <Field alias="location" type="text" defaultValue={event.location}>Location</Field>

                <Field alias="address" type="text" defaultValue={event.address ?? ''}>Address (optional)</Field>

                <Field alias="district" type="text" defaultValue={event.district ?? ''}>District (optional)</Field>

                <label className="flex flex-col">
                    Category
                    <select name="category" defaultValue={event.category}>
                        {EVENT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </label>

                <Field alias="tags" type="text" defaultValue={(event.tags || []).join(', ')}>Tags (comma separated)</Field>

                <label className="flex flex-col">
                    Price type
                    <select name="priceType" defaultValue={event.priceType}>
                        {EVENT_PRICE_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </label>

                <Field alias="price" type="text" defaultValue={event.price ?? ''}>Price (only if "De pago")</Field>

                <Field alias="image" type="url" defaultValue={event.image}>Image URL</Field>

                <label className="flex flex-col">
                    Source type
                    <select name="sourceType" defaultValue={event.sourceType}>
                        {EVENT_SOURCE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </label>

                <Field alias="sourceUrl" type="url" defaultValue={event.sourceUrl ?? ''}>Source URL (optional)</Field>

                <Button className="mt-4" type="submit">Guardar cambios</Button>
            </Form>
        })() : <Spinner />}
    </div>
}
