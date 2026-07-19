import { useState } from 'react'
import { Link } from 'react-router'

import { Icon } from './Icon'

// === ACCIONES DEL PROPIETARIO ===
// Fila compacta Editar / Eliminar con confirmación en dos pasos.
// Se reutiliza en el detalle del plan y en las cards de Mis planes > Creados,
// igual que OwnerActions en remix-reference.

export function OwnerActions({ eventId, onDelete, deleting = false }) {
    const [confirming, setConfirming] = useState(false)

    // Dentro de una card (que es un Link) hay que frenar la navegación.
    const stop = event => {
        event.preventDefault()
        event.stopPropagation()
    }

    return <div className="space-y-2">
        <div className="flex items-center gap-2">
            <Link
                to={`/evento/${eventId}/editar`}
                onClick={event => event.stopPropagation()}
                className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full border-2 border-[color:var(--foreground)] bg-[color:var(--background)] px-4 text-xs font-bold transition hover:bg-[color:var(--foreground)] hover:text-[color:var(--background)]"
            >
                <Icon name="pencil" className="h-3.5 w-3.5" /> Editar
            </Link>

            <button
                type="button"
                onClick={event => {
                    stop(event)
                    setConfirming(true)
                }}
                aria-label="Eliminar plan"
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border-2 border-[color:var(--destructive)] px-4 text-xs font-bold text-[color:var(--destructive)] transition hover:bg-[color:var(--destructive)] hover:text-white"
            >
                <Icon name="trash" className="h-3.5 w-3.5" /> Eliminar
            </button>
        </div>

        {confirming && <div className="flex flex-wrap items-center justify-center gap-2">
            <button
                type="button"
                disabled={deleting}
                onClick={event => {
                    stop(event)
                    setConfirming(false)
                    onDelete(eventId)
                }}
                className="inline-flex h-9 items-center justify-center rounded-full bg-[color:var(--destructive)] px-4 text-xs font-bold text-white disabled:opacity-60"
            >
                {deleting ? 'Eliminando…' : 'Sí, eliminar'}
            </button>
            <button
                type="button"
                disabled={deleting}
                onClick={event => {
                    stop(event)
                    setConfirming(false)
                }}
                className="inline-flex h-9 items-center justify-center rounded-full border-2 border-[color:var(--border)] bg-[color:var(--background)] px-4 text-xs font-semibold disabled:opacity-60"
            >
                Cancelar
            </button>
        </div>}
    </div>
}
