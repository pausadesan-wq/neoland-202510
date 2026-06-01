import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { Button } from './components/commons/Button'
import { Anchor } from './components/commons/Anchor'

import { useContext } from '../context'

import { logic } from '../logic'

import { EVENT_CATEGORIES, EVENT_PRICE_TYPES, EVENT_SOURCE_TYPES } from 'com'

import { logger } from '../logger'

export function AddEvent({ onGoToHome }) {
    logger.debug('AddEvent -> call')

    const { onError } = useContext()

    const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()
    }

    const handleAddEventSubmit = event => {
        event.preventDefault()

        const form = event.target

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
            logic.addEvent(title, description, date, time, location, address, district, category, tags, priceType, price, image, sourceType, sourceUrl)
                .then(() => {
                    form.reset()

                    onGoToHome()
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    logger.debug('AddEvent -> render')

    return <div className="p-4">
        <h1 className="font-bold text-xl">MyPet</h1>

        <div className="flex justify-between">
            <h2 className="font-bold">Add Event</h2>

            <Anchor onClick={handleBackClick}>&lt; Back</Anchor>
        </div>

        <Form onSubmit={handleAddEventSubmit}>
            <Field alias="title" type="text">Title</Field>

            <Field alias="description" type="text">Description</Field>

            <Field alias="date" type="date">Date</Field>

            <Field alias="time" type="time">Time</Field>

            <Field alias="location" type="text">Location</Field>

            <Field alias="address" type="text">Address (optional)</Field>

            <Field alias="district" type="text">District (optional)</Field>

            <label className="flex flex-col">
                Category
                <select name="category" defaultValue={EVENT_CATEGORIES[0]}>
                    {EVENT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </label>

            <Field alias="tags" type="text">Tags (comma separated)</Field>

            <label className="flex flex-col">
                Price type
                <select name="priceType" defaultValue={EVENT_PRICE_TYPES[0]}>
                    {EVENT_PRICE_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
            </label>

            <Field alias="price" type="text">Price (only if "De pago")</Field>

            <Field alias="image" type="url">Image URL</Field>

            <label className="flex flex-col">
                Source type
                <select name="sourceType" defaultValue={EVENT_SOURCE_TYPES[0]}>
                    {EVENT_SOURCE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </label>

            <Field alias="sourceUrl" type="url">Source URL (optional)</Field>

            <Button className="self-center mt-4" type="submit">Add Event</Button>
        </Form>
    </div>
}
