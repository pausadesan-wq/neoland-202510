import { useState } from 'react'

import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { Button } from './components/commons/Button'
import { Anchor } from './components/commons/Anchor'

import { logic } from '../logic'

export function AddPet({ onGoToHome }) {
    console.log('AddPet -> call')

    const [message, setMessage] = useState('')

    const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()   
    }

    const handleAddPetSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const birthdate = form.birthdate.value
        const weight = Number(form.weight.value)
        const image = form.image.value

        try {
            logic.addPet(name, birthdate, weight, image)

            form.reset()

            onGoToHome()
        } catch (error) {
            setMessage(error.message)
        }
    }

    console.log('AddPet -> render')

    return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <div className="flex justify-between">
                <h2 className="font-bold">Add Pet</h2>

                <Anchor onClick={handleBackClick}>&lt; Back</Anchor>
            </div>

            <Form onSubmit={handleAddPetSubmit}>
                <Field alias="name" type="text">Name</Field>

                <Field alias="birthdate" type="date">Birthdate</Field>

                <Field alias="weight" type="number">Weight (kg)</Field>

                <Field alias="image" type="url">Image</Field>

                <Button className="self-center mt-4" type="submit">Add Pet</Button>
            </Form>

            <p>{message}</p>
        </div>
}