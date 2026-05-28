import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { Button } from './components/commons/Button'
import { Anchor } from './components/commons/Anchor'

import { useContext } from '../context'

import { logic } from '../logic'

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

        const name = form.name.value
        const birthdate = form.birthdate.value
        const weight = Number(form.weight.value)
        const image = form.image.value

        try {
            logic.addEvent(name, birthdate, weight, image)
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
            <Field alias="name" type="text">Name</Field>

            <Field alias="birthdate" type="date">Birthdate</Field>

            <Field alias="weight" type="number" step="0.1">Weight (kg)</Field>

            <Field alias="image" type="url">Image</Field>

            <Button className="self-center mt-4" type="submit">Add Event</Button>
        </Form>
    </div>
}
