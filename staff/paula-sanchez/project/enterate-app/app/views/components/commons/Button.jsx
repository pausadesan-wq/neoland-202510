export function Button({ children, type, className, onClick, id, ...props }) {
    return <button id={id} className={`bg-black text-white px-1 ${className}`} type={type} onClick={onClick} {...props}>{children}</button>
}