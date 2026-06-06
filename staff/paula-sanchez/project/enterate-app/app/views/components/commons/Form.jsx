export function Form({ children, onSubmit }) {
    return <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        {children}
    </form>
}
