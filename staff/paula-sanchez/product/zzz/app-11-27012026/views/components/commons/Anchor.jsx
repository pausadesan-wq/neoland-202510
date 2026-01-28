function Anchor({ children, className, onClick }) {
    return <a className={`cursor-pointer underline font-bold text-sm decoration-double ${className}`} href="" onClick={onClick}>{children}</a>
}