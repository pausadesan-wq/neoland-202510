import { Link } from 'react-router'

export function Logo({ className = '' }) {
    return <Link
        to="/"
        aria-label="ENTÉRATE — Inicio"
        className={`font-display font-extrabold tracking-tight text-2xl md:text-3xl transition hover:opacity-90 ${className}`}
    >
        EN<span className="mark-yellow">TÉ</span>RATE
    </Link>
}
