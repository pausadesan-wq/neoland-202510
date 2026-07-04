import { useEffect } from 'react'

// Banner de feedback. Se cierra solo a los pocos segundos para no quedarse
// pegado en pantalla; los avisos duran algo más que los mensajes de éxito.

export function Feedback({ feedback, onClose }) {
    const styles = {
        success: 'bg-[color:var(--brand-green)] text-white',
        warn: 'bg-[color:var(--brand-yellow)] text-[color:var(--foreground)]',
        danger: 'bg-[color:var(--brand-orange)] text-white',
        error: 'bg-[color:var(--destructive)] text-white'
    }

    const style = styles[feedback.level] || 'bg-[color:var(--muted)] text-[color:var(--foreground)]'

    useEffect(() => {
        const delay = feedback.level === 'success' ? 2500 : 4500

        const timeout = setTimeout(onClose, delay)

        return () => clearTimeout(timeout)
    }, [feedback])

    return <p
        role="status"
        onClick={onClose}
        className={`fixed inset-x-0 top-0 z-[60] cursor-pointer py-2 text-center text-sm font-semibold ${style}`}
    >
        {feedback.message}
    </p>
}
