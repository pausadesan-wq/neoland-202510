export function Feedback({ feedback }) {
    const styles = {
        success: 'bg-[color:var(--brand-green)] text-white',
        warn: 'bg-[color:var(--brand-yellow)] text-[color:var(--foreground)]',
        danger: 'bg-[color:var(--brand-orange)] text-white',
        error: 'bg-[color:var(--destructive)] text-white'
    }

    const style = styles[feedback.level] || 'bg-[color:var(--muted)] text-[color:var(--foreground)]'

    return <p className={`fixed inset-x-0 top-0 z-[60] py-2 text-center text-sm font-semibold ${style}`}>
        {feedback.message}
    </p>
}
