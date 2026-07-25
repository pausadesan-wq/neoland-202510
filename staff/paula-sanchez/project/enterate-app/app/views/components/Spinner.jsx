import { useEffect, useState } from 'react'

import { logger } from '../../logger'

// Spinner de ENTÉRATE — círculo giratorio con los colores de marca.
// Ocupa el hueco del contenido, no toda la pantalla, para no tapar el Header.
//
// No se pinta hasta pasados unos milisegundos: las vistas montan con estado null
// y devuelven <Spinner /> en el primer render, así que una carga de 20 ms provocaba
// un parpadeo. Si la carga es realmente lenta, el spinner aparece con normalidad.

const DELAY_MS = 250

export const Spinner = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => setVisible(true), DELAY_MS)

        return () => clearTimeout(timeout)
    }, [])

    logger.debug('Spinner -> render')

    if (!visible) return null

    return <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
        <span
            role="status"
            aria-label="Cargando"
            className="h-10 w-10 animate-spin rounded-full border-4 border-[color:var(--muted)] border-t-[color:var(--brand-blue)]"
        />
        <p className="text-sm font-semibold text-[color:var(--muted-foreground)]">Cargando…</p>
    </div>
}
