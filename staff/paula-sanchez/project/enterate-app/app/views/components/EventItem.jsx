import { Button } from './commons/Button'

import { logger } from '../../logger'

export function EventItem({ event, onGoToEventDetail, onRemoveEventClick }) {
    logger.debug('EventItem -> call')

    const handleGoToEventDetailClick = eventId => onGoToEventDetail(eventId)

    const handleRemoveEventClick = eventId => onRemoveEventClick(eventId)

    logger.debug('EventItem -> render')

    return <li className="flex items-center border-2 border-black p-2 justify-between" onClick={() => handleGoToEventDetailClick(event.id)}>
        <div className="flex items-center gap-4">
            <img src={event.image} className="rounded-full w-10 h-10 object-cover" />

            <p>{event.name}</p>
        </div>

        <Button className="justify-self-end" onClick={e => {
            e.stopPropagation()

            handleRemoveEventClick(event.id)
        }}>🗑️</Button>
    </li>
}
