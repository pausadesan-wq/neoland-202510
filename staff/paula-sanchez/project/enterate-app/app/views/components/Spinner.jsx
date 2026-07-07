import { logger } from '../../logger'

// Spinner de ENTÉRATE — círculo giratorio con los colores de marca.
// Ocupa el hueco del contenido, no toda la pantalla, para no tapar el Header.

export const Spinner = () => {
    logger.debug('Spinner -> render')

    return <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
        <span
            role="status"
            aria-label="Cargando"
            className="h-10 w-10 animate-spin rounded-full border-4 border-[color:var(--muted)] border-t-[color:var(--brand-blue)]"
        />
        <p className="text-sm font-semibold text-[color:var(--muted-foreground)]">Cargando…</p>
    </div>
}
