export function Button({ children, type, className = '', onClick, id, ...props }) {
    return <button
        id={id}
        type={type}
        onClick={onClick}
        className={`inline-flex items-center justify-center gap-1.5 rounded-full bg-[color:var(--foreground)] px-4 py-2 text-sm font-bold text-[color:var(--background)] transition hover:-translate-y-0.5 disabled:opacity-60 ${className}`}
        {...props}
    >
        {children}
    </button>
}
