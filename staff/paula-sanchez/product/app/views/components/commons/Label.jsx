function Label({ alias, children }) {
    return <label htmlFor={alias} className="font-bold">{children}</label>
}