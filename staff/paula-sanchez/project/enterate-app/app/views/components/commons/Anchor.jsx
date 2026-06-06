export function Anchor({ children, className = '', onClick }) {
    return <a
        href=""
        onClick={onClick}
        className={`cursor-pointer text-sm font-semibold text-[color:var(--foreground)] underline underline-offset-4 hover:text-[color:var(--brand-blue)] ${className}`}
    >
        {children}
    </a>
}
