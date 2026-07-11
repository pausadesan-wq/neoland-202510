export function Input({ alias, autoComplete, type, className = '', defaultValue, step, placeholder }) {
    return <input
        id={alias}
        name={alias}
        autoComplete={autoComplete || alias}
        type={type}
        defaultValue={defaultValue}
        step={step}
        placeholder={placeholder}
        className={`w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-2 text-sm outline-none transition focus:border-[color:var(--foreground)] ${className}`}
    />
}
