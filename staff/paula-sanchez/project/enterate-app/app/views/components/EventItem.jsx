import { Button } from './commons/Button'

import { logger } from '../../logger'

export function EventItem({ event, onGoToEventDetail, onRemoveEventClick }) {
    logger.debug('EventItem -> call')

    const handleGoToEventDetailClick = eventId => onGoToEventDetail(eventId)

    const handleRemoveEventClick = eventId => onRemoveEventClick(eventId)

    logger.debug('EventItem -> render')

    const localDateString = new Date(event.date).toLocaleDateString()

    return <li className="flex items-center border-2 border-black p-2 justify-between" onClick={() => handleGoToEventDetailClick(event.id)}>
        <div className="flex items-center gap-4">
            <img src={event.image} className="rounded w-16 h-16 object-cover" />

            <div>
                <p className="font-bold">{event.title}</p>
                <p className="text-sm">{event.category} · {localDateString} {event.time}</p>
                <p className="text-sm">{event.location}</p>
            </div>
        </div>

        <Button className="justify-self-end" onClick={e => {
            e.stopPropagation()

            handleRemoveEventClick(event.id)
        }}>🗑️</Button>
    </li>
}
