import { useState, useEffect } from 'react'

import { Button } from './commons/Button'

import { PetItem } from './PetItem'

import { useContext } from '../../context'

import { logic } from '../../logic'

import { logger } from '../../logger'

export function PetList({ onGoToPetDetail }) {
    logger.debug('PetList -> call')

    const { onError } = useContext()

    const [pets, setPets] = useState([])
    const [petId, setPetId] = useState(null)

    useEffect(() => {
        logger.debug('PetList -> useEffect')

        try {
            logic.getPets()
                .then(pets => {
                    setPets(pets)
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    const handleRemovePetClick = petId => setPetId(petId)

    const handleCancelRemovePetClick = event => {
        event.preventDefault()

        setPetId(null)
    }

    const handleConfirmRemovePetClick = event => {
        event.preventDefault()

        try {
            logic.removePet(petId)
                .then(() => {
                    return logic.getPets()
                })
                .then(pets => {
                    setPetId(null)
                    setPets(pets)
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    const handleGoToDetail = () => onGoToPetDetail()

    logger.debug('PetList -> render')

    return <div>
        <ul className="flex flex-col gap-2 mt-2">
            {pets.map(pet => <PetItem key={pet.id} pet={pet} onGoToPetDetail={handleGoToDetail} onRemovePetClick={handleRemovePetClick} />)}
        </ul>

        {petId && <div className="w-full h-full fixed top-0 left-0 bg-black/75 flex justify-center items-center">
            <div className="bg-white border-black border-2 p-2">
                <p className="text-center">Delete Pet?</p>

                <div className="flex justify-center gap-2">
                    <Button onClick={handleCancelRemovePetClick}>❌</Button>
                    <Button onClick={handleConfirmRemovePetClick}>✅</Button>
                </div>
            </div>
        </div>}
    </div>
}