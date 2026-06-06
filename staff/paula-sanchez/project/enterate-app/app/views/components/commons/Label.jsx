export function Label({ alias, children }) {
    return <label htmlFor={alias} className="mb-1 block text-sm font-semibold text-[color:var(--foreground)]">
        {children}
    </label>
}
