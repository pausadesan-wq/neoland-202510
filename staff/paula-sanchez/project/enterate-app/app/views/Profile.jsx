import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'

import { Spinner } from './components/Spinner'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'

// === PERFIL ===
// Página final: header con avatar + identidad, editar perfil (3 mini-forms),
// ajustes de cuenta (email + password), accesos a Mis planes y logout.

export function Profile() {
    logger.debug('Profile -> call')

    const { onSuccess, onError } = useContext()

    const navigate = useNavigate()

    const [user, setUser] = useState(null)

    const load = () => {
        try {
            logic.getLoggedInUser()
                .then(u => setUser(u))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    useEffect(() => { load() }, [])

    const handleLogout = () => {
        try {
            logic.logoutUser()
        } catch { /* noop */ }

        // Marca el onboarding como visto: al cerrar sesión no queremos volver a mostrarlo.
        try { localStorage.setItem('enterate:onboarding-dismissed', '1') } catch { /* ignore */ }

        navigate('/', { replace: true })
    }

    logger.debug('Profile -> render')

    if (!user) return <Spinner />

    const initials = (user.name || user.username || '?').slice(0, 2).toUpperCase()

    return <div className="mx-auto max-w-2xl py-4 md:py-8">
        <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Mi perfil</h1>
        <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">Tu actividad, tus ajustes y tu cuenta.</p>

        {/* === IDENTIDAD + EDITAR PERFIL === */}
        <section className="mt-6 rounded-2xl border-2 border-[color:var(--foreground)] bg-[color:var(--card)] p-4 shadow-[4px_4px_0_0_var(--foreground)] md:p-6">
            <div className="flex items-start gap-3">
                <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl border-2 border-[color:var(--foreground)] bg-[color:var(--brand-yellow)] font-display text-lg font-extrabold">
                    {user.image
                        ? <img src={user.image} alt="Avatar" className="h-full w-full object-cover" />
                        : initials}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-lg font-extrabold leading-tight">{user.name}</p>
                    <p className="truncate text-sm font-bold text-[color:var(--brand-blue)]">@{user.username}</p>
                    <p className="truncate text-xs text-[color:var(--muted-foreground)]">{user.email}</p>
                </div>
            </div>

            <div className="my-4 h-px bg-[color:var(--border)]" />

            <NameForm current={user.name} onSaved={() => { onSuccess('Nombre actualizado'); load() }} onError={onError} />

            <div className="mt-4">
                <UsernameForm current={user.username} onSaved={() => { onSuccess('Usuario actualizado'); load() }} onError={onError} />
            </div>

            <div className="mt-4">
                <AvatarForm current={user.image || ''} onSaved={() => { onSuccess('Avatar actualizado'); load() }} onError={onError} />
            </div>
        </section>

        {/* === AJUSTES DE CUENTA === */}
        <SectionTitle>Ajustes de cuenta</SectionTitle>

        <section className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-4 md:p-6">
            <EmailForm current={user.email} onSaved={() => { onSuccess('Email actualizado'); load() }} onError={onError} />

            <div className="my-4 h-px bg-[color:var(--border)]" />

            <PasswordForm onSaved={() => onSuccess('Contraseña actualizada')} onError={onError} />
        </section>

        {/* === ACTIVIDAD === */}
        <SectionTitle>Tu actividad</SectionTitle>

        <nav className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)]">
            <ActivityRow to="/guardados?tab=guardados" title="Guardados" desc="Los planes que te interesan." />
            <Divider />
            <ActivityRow to="/guardados?tab=voy" title="Voy a ir" desc="Los planes a los que te has apuntado." />
            <Divider />
            <ActivityRow to="/guardados?tab=creados" title="Mis eventos" desc="Los planes que has subido tú." />
        </nav>

        {/* === CUENTA === */}
        <SectionTitle muted>Cuenta</SectionTitle>

        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-2">
            <button
                onClick={handleLogout}
                className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[color:var(--muted-foreground)] hover:bg-[color:var(--muted)] hover:text-[color:var(--foreground)]"
            >
                Cerrar sesión
            </button>
        </div>
    </div>
}

// === Subcomponentes locales ===

function SectionTitle({ children, muted }) {
    return <h2 className={`mb-1 mt-6 px-1 text-[11px] font-bold uppercase tracking-wider ${muted ? 'text-[color:var(--muted-foreground)]/70' : 'text-[color:var(--muted-foreground)]'}`}>
        {children}
    </h2>
}

function Divider() {
    return <div className="h-px bg-[color:var(--border)]" />
}

function ActivityRow({ to, title, desc }) {
    return <Link
        to={to}
        className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-[color:var(--muted)]/60"
    >
        <span className="min-w-0">
            <span className="block text-sm font-bold">{title}</span>
            <span className="mt-0.5 block text-xs text-[color:var(--muted-foreground)]">{desc}</span>
        </span>
        <span className="text-lg text-[color:var(--muted-foreground)]">›</span>
    </Link>
}

function FieldRow({ label, children, hint }) {
    return <div>
        <label className="mb-1 block text-xs font-semibold text-[color:var(--muted-foreground)]">{label}</label>
        {children}
        {hint && <p className="mt-1 text-[11px] text-[color:var(--muted-foreground)]">{hint}</p>}
    </div>
}

const inputCls = 'w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-sm outline-none transition focus:border-[color:var(--foreground)]'
const saveBtnCls = 'inline-flex h-9 items-center justify-center rounded-full border-2 border-[color:var(--foreground)] bg-[color:var(--background)] px-4 text-xs font-bold text-[color:var(--foreground)] transition active:translate-y-0.5 disabled:opacity-60'

function NameForm({ current, onSaved, onError }) {
    const [name, setName] = useState(current)
    const [saving, setSaving] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        if (name === current) return
        setSaving(true)
        try {
            logic.changeUserName(name)
                .then(() => onSaved())
                .catch(error => onError(error))
                .finally(() => setSaving(false))
        } catch (error) {
            setSaving(false)
            onError(error)
        }
    }

    return <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="flex-1">
            <FieldRow label="Nombre">
                <input type="text" value={name} onChange={e => setName(e.target.value)} className={inputCls} />
            </FieldRow>
        </div>
        <button type="submit" disabled={saving || name === current} className={saveBtnCls}>
            {saving ? 'Guardando…' : 'Guardar'}
        </button>
    </form>
}

function UsernameForm({ current, onSaved, onError }) {
    const [username, setUsername] = useState(current)
    const [saving, setSaving] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        if (username === current) return
        setSaving(true)
        try {
            logic.changeUserUsername(username)
                .then(() => onSaved())
                .catch(error => onError(error))
                .finally(() => setSaving(false))
        } catch (error) {
            setSaving(false)
            onError(error)
        }
    }

    return <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="flex-1">
            <FieldRow label="Nombre de usuario">
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} className={inputCls} />
            </FieldRow>
        </div>
        <button type="submit" disabled={saving || username === current} className={saveBtnCls}>
            {saving ? 'Guardando…' : 'Guardar'}
        </button>
    </form>
}

function AvatarForm({ current, onSaved, onError }) {
    const [image, setImage] = useState(current)
    const [saving, setSaving] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        if (image === current) return
        setSaving(true)
        try {
            logic.changeUserImage(image)
                .then(() => onSaved())
                .catch(error => onError(error))
                .finally(() => setSaving(false))
        } catch (error) {
            setSaving(false)
            onError(error)
        }
    }

    return <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="flex-1">
            <FieldRow label="Avatar (URL)" hint="Pega el enlace directo a una imagen.">
                <input type="url" value={image} onChange={e => setImage(e.target.value)} placeholder="https://…" className={inputCls} />
            </FieldRow>
        </div>
        <button type="submit" disabled={saving || image === current} className={saveBtnCls}>
            {saving ? 'Guardando…' : 'Guardar'}
        </button>
    </form>
}

function EmailForm({ current, onSaved, onError }) {
    const [email, setEmail] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newEmailRepeat, setNewEmailRepeat] = useState('')
    const [saving, setSaving] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        setSaving(true)
        try {
            logic.changeUserEmail(email, newEmail, newEmailRepeat)
                .then(() => {
                    setEmail(''); setNewEmail(''); setNewEmailRepeat('')
                    onSaved()
                })
                .catch(error => onError(error))
                .finally(() => setSaving(false))
        } catch (error) {
            setSaving(false)
            onError(error)
        }
    }

    return <form onSubmit={handleSubmit} className="grid gap-3">
        <FieldRow label="Email actual" hint={current}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={current} className={inputCls} />
        </FieldRow>
        <FieldRow label="Nuevo email">
            <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} className={inputCls} />
        </FieldRow>
        <FieldRow label="Repite el nuevo email">
            <input type="email" value={newEmailRepeat} onChange={e => setNewEmailRepeat(e.target.value)} className={inputCls} />
        </FieldRow>
        <div>
            <button type="submit" disabled={saving} className={saveBtnCls}>
                {saving ? 'Guardando…' : 'Cambiar email'}
            </button>
        </div>
    </form>
}

function PasswordForm({ onSaved, onError }) {
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('')
    const [saving, setSaving] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        setSaving(true)
        try {
            logic.changeUserPassword(password, newPassword, newPasswordRepeat)
                .then(() => {
                    setPassword(''); setNewPassword(''); setNewPasswordRepeat('')
                    onSaved()
                })
                .catch(error => onError(error))
                .finally(() => setSaving(false))
        } catch (error) {
            setSaving(false)
            onError(error)
        }
    }

    return <form onSubmit={handleSubmit} className="grid gap-3">
        <FieldRow label="Contraseña actual">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" className={inputCls} />
        </FieldRow>
        <FieldRow label="Nueva contraseña">
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} autoComplete="new-password" className={inputCls} />
        </FieldRow>
        <FieldRow label="Repite la nueva contraseña">
            <input type="password" value={newPasswordRepeat} onChange={e => setNewPasswordRepeat(e.target.value)} autoComplete="new-password" className={inputCls} />
        </FieldRow>
        <div>
            <button type="submit" disabled={saving} className={saveBtnCls}>
                {saving ? 'Guardando…' : 'Cambiar contraseña'}
            </button>
        </div>
    </form>
}
