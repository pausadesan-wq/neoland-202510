import { useState, useEffect } from 'react'

import { useParams } from 'react-router'

import { Anchor } from './components/commons/Anchor'
import { Button } from './components/commons/Button'
import { Spinner } from './components/Spinner'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'

export function PetDetail({ onGoToHome, onGoToModifyPet }) {
    logger.debug('PetDetail -> call')

    const { onError } = useContext()

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

        onGoToHome()
    }

    const handleGoToModifyPet = () => onGoToModifyPet(petId)

    logger.debug('PetDetail -> render')

    return <div className="p-4">
        <h1 className="font-bold text-xl">MyPet</h1>

        <div className="flex justify-between">
            <h2 className="font-bold">Pet</h2>

            <Anchor onClick={handleBackClick}>&lt; Back</Anchor>
        </div>

        {pet ? (() => {
            const zuluDate = new Date(pet.birthdate)
            const locaDateString = zuluDate.toLocaleDateString()

            return <div className="flex flex-col items-center gap-4">
                <img src={pet.image} className="rounded-full w-40 h-40 object-cover" />

                <p>{pet.name}</p>

                <p>{pet.weight}kg</p>

                <p>{locaDateString}</p>

                <Button onClick={handleGoToModifyPet}>Modify</Button>
            </div>
        })() : <Spinner />}
    </div>
}