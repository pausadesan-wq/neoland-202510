import { Button } from './commons/Button'

import { logger } from '../../logger'

export function PetItem({ pet, onGoToPetDetail, onRemovePetClick }) {
    logger.debug('PetItem -> call')

    const handleGoToPetDetailClick = petId => onGoToPetDetail(petId)

    const handleRemovePetClick = petId => onRemovePetClick(petId)

    logger.debug('PetItem -> render')

    return <li className="flex items-center border-2 border-black p-2 justify-between" onClick={() => handleGoToPetDetailClick(pet.id)}>
        <div className="flex items-center gap-4">
            <img src={pet.image} className="rounded-full w-10 h-10 object-cover" />

            <p>{pet.name}</p>
        </div>

        <Button className="justify-self-end" onClick={event => {
            event.stopPropagation()

            handleRemovePetClick(pet.id)
        }}>🗑️</Button>
    </li>
}