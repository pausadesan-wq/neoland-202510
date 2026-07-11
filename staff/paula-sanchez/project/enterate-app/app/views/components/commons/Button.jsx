// `default` es el botón oscuro de siempre y no cambia.
// `brand` es el CTA azul a ancho completo de Login/Register (paridad con remix-reference).
const VARIANTS = {
    default: 'rounded-full bg-[color:var(--foreground)] px-4 py-2 text-sm font-bold text-[color:var(--background)]',
    brand: 'h-10 w-full rounded-2xl bg-[color:var(--brand-blue)] px-6 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(47,107,255,0.6)] md:h-12 md:rounded-full md:text-base'
}

export function Button({ children, type, className = '', onClick, id, variant = 'default', ...props }) {
    return <button
        id={id}
        type={type}
        onClick={onClick}
        className={`inline-flex items-center justify-center gap-1.5 transition hover:-translate-y-0.5 disabled:opacity-60 ${VARIANTS[variant]} ${className}`}
        {...props}
    >
        {children}
    </button>
}
