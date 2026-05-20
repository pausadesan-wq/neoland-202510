export function Input({ alias, autoComplete, type, className, defaultValue, step }) {
    return <input id={alias} name={alias} autoComplete={autoComplete || alias} type={type} className={`border px-1 ${className}`} defaultValue={defaultValue} step={step} />
}
