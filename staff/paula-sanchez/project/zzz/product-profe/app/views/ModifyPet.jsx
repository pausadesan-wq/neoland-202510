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

export function ModifyPet({ onGoBack }) {
    logger.debug('ModifyPet -> call')

    const { onSuccess, onError } = useContext()

    const [pet, setPet] = useState(null)

    const { petId } = useParams()

    useEffect(() => {
        try {
            logic.getPet(petId)
                .then(pet => setPet(pet))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    const handleBackClick = event => {
        event.preventDefault()

        onGoBack(petId)
    }

    const handleModifyPetSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const birthdate = form.birthdate.value
        const weight = Number(form.weight.value)
        const image = form.image.value

        try {
            logic.modifyPet(petId, name, birthdate, weight, image)
                .then(() => onSuccess('pet successfully modified'))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    logger.debug('ModifyPet -> render')

    return <div className="p-4">
        <h1 className="font-bold text-xl">MyPet</h1>

        <div className="flex justify-between">
            <h2 className="font-bold">Modify Pet</h2>

            <Anchor onClick={handleBackClick}>&lt; Back</Anchor>
        </div>

        {pet ? (() => {
            const zuluDate = new Date(pet.birthdate)
            const offsetMillis = zuluDate.getTimezoneOffset() * 60 * 1000
            const localDate = new Date(zuluDate.getTime() - offsetMillis)
            const locaDateString = localDate.toISOString().split('T')[0]

            return <Form onSubmit={handleModifyPetSubmit}>
                <Field alias="name" type="text" defaultValue={pet.name}>Name</Field>

                <Field alias="birthdate" type="date" defaultValue={locaDateString}>Birthdate</Field>

                <Field alias="weight" type="number" defaultValue={pet.weight} step="0.1">Weight (kg)</Field>

                <Field alias="image" type="url" defaultValue={pet.image}>Image</Field>

                <Button className="self-center mt-4" type="submit">Modify Pet</Button>
            </Form>
        })() : <Spinner />}
    </div>
}