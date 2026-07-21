import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'

import { Spinner } from './components/Spinner'
import { Icon } from './components/Icon'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'

// === PERFIL ===
// Composición de remix-reference: card de identidad con avatar + datos + un único
// formulario, ajustes de cuenta (email y contraseña), accesos a Mis planes y logout.
// La densidad es móvil primero; el aspecto brutalista (borde grueso + sombra) es de desktop.

export function Profile() {
    logger.debug('Profile -> call')

    const { onSuccess, onError } = useContext()

    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [avatarBroken, setAvatarBroken] = useState(false)
    const [loadFailed, setLoadFailed] = useState(false)

    const load = () => {
        try {
            logic.getLoggedInUser()
                .then(u => {
                    setUser(u)
                    setAvatarBroken(false)
                })
                .catch(error => {
                    // Terminamos la carga aunque falle: si no, la vista se queda en el Spinner.
                    setLoadFailed(true)

                    onError(error)
                })
        } catch (error) {
            setLoadFailed(true)

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

    // Si la carga falla ya se ha avisado por el banner (y una sesión inválida redirige a login).
    if (loadFailed) return null

    if (!user) return <Spinner />

    const initials = (user.name || user.username || '?').slice(0, 2).toUpperCase()

    return <div className="mx-auto -mt-2 max-w-3xl py-4 md:mt-0 md:py-16">
        <h1 className="font-display text-xl font-extrabold leading-tight md:text-4xl">Mi perfil</h1>
        <p className="mt-0.5 text-[12px] text-[color:var(--muted-foreground)] md:text-sm">
            Tu actividad, tus ajustes y tu cuenta.
        </p>

        {/* === IDENTIDAD + EDITAR PERFIL === */}
        <section className="mt-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-2.5 md:mt-8 md:rounded-3xl md:border-2 md:border-[color:var(--foreground)] md:p-8 md:shadow-[6px_6px_0_0_var(--foreground)]">
            <IdentityForm
                user={user}
                initials={initials}
                avatarBroken={avatarBroken}
                onAvatarBroken={() => setAvatarBroken(true)}
                onSaved={() => { onSuccess('Perfil actualizado ✦'); load() }}
                onError={onError}
            />
        </section>

        {/* === AJUSTES DE CUENTA === */}
        <SectionTitle>Ajustes de cuenta</SectionTitle>

        <section className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-3 md:rounded-3xl md:border-2 md:p-6">
            <EmailForm current={user.email} onSaved={() => { onSuccess('Email actualizado'); load() }} onError={onError} />

            <div className="my-3 h-px bg-[color:var(--border)]" />

            <PasswordForm onSaved={() => onSuccess('Contraseña actualizada')} onError={onError} />
        </section>

        {/* === ACTIVIDAD === */}
        <SectionTitle>Tu actividad</SectionTitle>

        <nav className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] md:rounded-3xl md:border-2">
            <ActivityRow to="/guardados?tab=guardados" title="Guardados" desc="Los planes que te interesan." />
            <Divider />
            <ActivityRow to="/guardados?tab=voy" title="Voy a ir" desc="Los planes a los que te has apuntado." />
            <Divider />
            <ActivityRow to="/guardados?tab=creados" title="Mis eventos" desc="Los planes que has subido tú." />
        </nav>

        {/* === CUENTA === */}
        <SectionTitle muted>Cuenta</SectionTitle>

        <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-1.5 md:rounded-3xl md:p-3">
            <button
                onClick={handleLogout}
                className="block w-full rounded-lg px-2.5 py-1.5 text-left text-[13px] font-semibold text-[color:var(--muted-foreground)] hover:bg-[color:var(--muted)] hover:text-[color:var(--foreground)] md:rounded-xl md:px-3 md:py-2.5 md:text-sm"
            >
                Cerrar sesión
            </button>
        </div>
    </div>
}

// === Subcomponentes locales ===

function SectionTitle({ children, muted }) {
    return <h2 className={`mb-1 mt-3 px-1 text-[11px] font-bold uppercase tracking-wider md:mt-10 md:text-xs ${muted ? 'text-[color:var(--muted-foreground)]/70' : 'text-[color:var(--muted-foreground)]'}`}>
        {children}
    </h2>
}

function Divider() {
    return <div className="h-px bg-[color:var(--border)]" />
}

function ActivityRow({ to, title, desc }) {
    return <Link
        to={to}
        className="flex items-center justify-between gap-3 px-3 py-2.5 hover:bg-[color:var(--muted)]/60 md:px-5 md:py-4"
    >
        <span className="min-w-0">
            <span className="block text-[14px] font-bold md:text-base">{title}</span>
            <span className="mt-0.5 block text-[12px] leading-tight text-[color:var(--muted-foreground)] md:text-sm">{desc}</span>
        </span>
        <span className="text-[color:var(--muted-foreground)]">›</span>
    </Link>
}

function Field({ label, type = 'text', value, onChange, placeholder, hint }) {
    return <label className="flex flex-col gap-0.5 text-[10px] font-semibold text-[color:var(--muted-foreground)] md:gap-1 md:text-[12px]">
        {label}
        <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="h-7 rounded-lg border-2 border-[color:var(--border)] bg-[color:var(--background)] px-2.5 text-[13px] text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--foreground)] md:h-10 md:px-3 md:text-[14px]"
        />
        {hint && <span className="text-[10px] font-medium text-[color:var(--muted-foreground)]">{hint}</span>}
    </label>
}

function PasswordField({ label, value, onChange, autoComplete, placeholder }) {
    const [visible, setVisible] = useState(false)

    return <label className="flex flex-col gap-0.5 text-[10px] font-semibold text-[color:var(--muted-foreground)] md:gap-1 md:text-[12px]">
        {label}
        <span className="relative block">
            <input
                type={visible ? 'text' : 'password'}
                value={value}
                onChange={e => onChange(e.target.value)}
                autoComplete={autoComplete}
                placeholder={placeholder}
                className="h-7 w-full rounded-lg border-2 border-[color:var(--border)] bg-[color:var(--background)] px-2.5 pr-9 text-[13px] text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--foreground)] md:h-10 md:px-3 md:pr-11 md:text-[14px]"
            />
            <button
                type="button"
                onClick={() => setVisible(v => !v)}
                aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className="absolute right-1.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-md text-[color:var(--muted-foreground)] transition hover:text-[color:var(--foreground)] md:right-2 md:h-7 md:w-7"
            >
                <Icon name={visible ? 'eye-off' : 'eye'} className="h-4 w-4" />
            </button>
        </span>
    </label>
}

const saveBtnCls = 'inline-flex h-[30px] items-center justify-center rounded-full bg-[color:var(--foreground)] px-4 text-[12px] font-extrabold text-[color:var(--background)] transition active:translate-y-0.5 disabled:opacity-60 md:h-10 md:text-sm'
const altBtnCls = 'inline-flex items-center justify-center rounded-full border-2 border-[color:var(--foreground)] bg-[color:var(--background)] px-3.5 py-1.5 text-[12px] font-bold text-[color:var(--foreground)] transition active:translate-y-0.5 disabled:opacity-60'

// Nombre, usuario y avatar en un único formulario con un solo botón, como en la referencia.
// La acción del avatar va arriba, junto a la foto y los datos. Cada campo sigue usando su
// propio endpoint; solo se envían los que han cambiado. El avatar sigue siendo por URL.
function IdentityForm({ user, initials, avatarBroken, onAvatarBroken, onSaved, onError }) {
    const [name, setName] = useState(user.name)
    const [username, setUsername] = useState(user.username)
    const [image, setImage] = useState(user.image || '')
    const [saving, setSaving] = useState(false)

    const currentImage = user.image || ''
    const dirty = name !== user.name || username !== user.username || image !== currentImage

    const handleSubmit = e => {
        e.preventDefault()

        if (!dirty) return

        setSaving(true)

        try {
            const calls = []

            if (name !== user.name) calls.push(logic.changeUserName(name))
            if (username !== user.username) calls.push(logic.changeUserUsername(username))
            if (image !== currentImage) calls.push(logic.changeUserImage(image))

            Promise.all(calls)
                .then(() => onSaved())
                .catch(error => onError(error))
                .finally(() => setSaving(false))
        } catch (error) {
            setSaving(false)

            onError(error)
        }
    }

    return <form onSubmit={handleSubmit}>
        {/* === CABECERA: avatar + datos + URL del avatar === */}
        <div className="flex items-start gap-2.5 md:gap-3">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[color:var(--border)] bg-[color:var(--brand-yellow)] font-display text-[15px] font-extrabold md:h-20 md:w-20 md:rounded-2xl md:border-2 md:border-[color:var(--foreground)] md:text-2xl">
                {user.image && !avatarBroken
                    ? <img
                        src={user.image}
                        alt="Avatar"
                        onError={onAvatarBroken}
                        className="h-full w-full object-cover"
                    />
                    : initials}
            </div>

            <div className="min-w-0 flex-1 pt-0.5 md:pt-0">
                <p className="truncate font-display text-[14px] font-extrabold leading-tight md:text-xl">{user.name}</p>
                <p className="truncate text-[12px] font-bold leading-tight text-[color:var(--brand-blue)] md:text-sm md:font-extrabold">
                    @{user.username}
                </p>
                <p className="truncate pt-0.5 text-[11px] leading-tight text-[color:var(--muted-foreground)] md:pt-0 md:text-xs">
                    {user.email}
                </p>

                <div className="mt-1.5">
                    <Field label="Avatar (URL)" type="url" value={image} onChange={setImage} placeholder="https://…" />
                </div>
            </div>
        </div>

        <div className="my-2.5 h-px bg-[color:var(--border)] md:my-5" />

        {/* === NOMBRE Y USUARIO === */}
        <div className="grid gap-1 md:gap-2">
            <Field label="Nombre visible" value={name} onChange={setName} placeholder="Cómo quieres que te vean" />
            <Field label="Nombre de usuario" value={username} onChange={setUsername} placeholder="tu_usuario" />

            <div className="pt-0.5 md:pt-1">
                <button type="submit" disabled={saving || !dirty} className={saveBtnCls}>
                    {saving ? 'Guardando…' : 'Guardar cambios'}
                </button>
            </div>
        </div>
    </form>
}

// Sin campo de repetición, como en la referencia. La lógica sigue recibiendo
// newEmailRepeat porque valida que coincidan; le pasamos el mismo valor.
function EmailForm({ current, onSaved, onError }) {
    const [email, setEmail] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [saving, setSaving] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()

        setSaving(true)

        try {
            logic.changeUserEmail(email, newEmail, newEmail)
                .then(() => {
                    setEmail(''); setNewEmail('')
                    onSaved()
                })
                .catch(error => onError(error))
                .finally(() => setSaving(false))
        } catch (error) {
            setSaving(false)
            onError(error)
        }
    }

    return <form onSubmit={handleSubmit} className="grid gap-1 md:gap-2">
        <Field label="Email actual" type="email" value={email} onChange={setEmail} placeholder={current} />
        <Field label="Nuevo email" type="email" value={newEmail} onChange={setNewEmail} placeholder="tu@email.com" />

        <div className="pt-0.5">
            <button type="submit" disabled={saving} className={altBtnCls}>
                {saving ? 'Enviando…' : 'Cambiar email'}
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

    return <form onSubmit={handleSubmit} className="grid gap-1 md:gap-2">
        {/* La contraseña actual la exige la API (bcrypt.compare) para autorizar el cambio. */}
        <PasswordField label="Contraseña actual" value={password} onChange={setPassword} autoComplete="current-password" placeholder="Tu contraseña" />
        <PasswordField label="Nueva contraseña" value={newPassword} onChange={setNewPassword} autoComplete="new-password" placeholder="Mínimo 8 caracteres, con letras y números" />
        <PasswordField label="Repite la nueva contraseña" value={newPasswordRepeat} onChange={setNewPasswordRepeat} autoComplete="new-password" placeholder="Mínimo 8 caracteres, con letras y números" />

        <div className="pt-0.5">
            <button type="submit" disabled={saving} className={altBtnCls}>
                {saving ? 'Guardando…' : 'Cambiar contraseña'}
            </button>
        </div>
    </form>
}
