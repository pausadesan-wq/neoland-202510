import { useMemo, useState } from 'react'

import { EVENT_CATEGORIES, EVENT_PRICE_TYPES, EVENT_SOURCE_TYPES } from 'com'

import {
    CATEGORIES,
    categoryTextColor,
    TAG_SUGGESTIONS,
    TAG_REGEX
} from '../lib/events'

import { Icon } from './Icon'

// === EVENT FORM ===
// Componente compartido usado por AddEvent (mode="create") y ModifyEvent (mode="edit").
// Validaciones sencillas en cliente para dar feedback por campo; el backend valida como fuente de verdad.

const MAX_TAGS = 5
const MIN_TAGS = 1

// Fecha por defecto: hoy en formato YYYY-MM-DD (exigido por <input type="date">).
function todayInputValue() {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

// Fecha del initialEvent → YYYY-MM-DD sin desfase por timezone.
function toInputDate(value) {
    if (!value) return ''
    const d = value instanceof Date ? value : new Date(value)
    const offsetMs = d.getTimezoneOffset() * 60 * 1000
    return new Date(d.getTime() - offsetMs).toISOString().split('T')[0]
}

export function EventForm({ mode, initialEvent = null, onSubmit }) {
    const [title, setTitle] = useState(initialEvent?.title ?? '')
    const [description, setDescription] = useState(initialEvent?.description ?? '')
    const [date, setDate] = useState(initialEvent ? toInputDate(initialEvent.date) : todayInputValue())
    const [time, setTime] = useState(initialEvent?.time ?? '20:00')
    const [location, setLocation] = useState(initialEvent?.location ?? '')
    const [address, setAddress] = useState(initialEvent?.address ?? '')
    const [district, setDistrict] = useState(initialEvent?.district ?? '')
    const [category, setCategory] = useState(initialEvent?.category ?? EVENT_CATEGORIES[0])
    const [tags, setTags] = useState(initialEvent?.tags ? initialEvent.tags.slice(0, MAX_TAGS) : [])
    const [tagInput, setTagInput] = useState('')
    const [priceType, setPriceType] = useState(initialEvent?.priceType ?? 'Gratis')
    const [price, setPrice] = useState(initialEvent?.price ?? '')
    const [image, setImage] = useState(initialEvent?.image ?? '')
    const [sourceType, setSourceType] = useState(initialEvent?.sourceType ?? 'Boca a boca')
    const [sourceUrl, setSourceUrl] = useState(initialEvent?.sourceUrl ?? '')
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    // === Categorías: filtrar el meta "Todos" para el <select> (no es una categoría real de Event).
    const categoryList = CATEGORIES.filter(c => c.name !== 'Todos')

    const availableSuggestions = useMemo(() => {
        const taken = new Set(tags.map(t => t.toLowerCase()))
        return TAG_SUGGESTIONS.filter(s => !taken.has(s.toLowerCase())).slice(0, 8)
    }, [tags])

    const addTag = raw => {
        const clean = raw.trim().replace(/\s+/g, ' ')

        if (!clean) return

        if (!TAG_REGEX.test(clean)) {
            setErrors(prev => ({ ...prev, tags: 'Tag no válido (2-30 caracteres, letras y números)' }))
            return
        }

        setTags(prev => {
            if (prev.length >= MAX_TAGS) return prev
            const exists = prev.some(t => t.toLowerCase() === clean.toLowerCase())
            return exists ? prev : [...prev, clean]
        })

        setTagInput('')
        setErrors(prev => ({ ...prev, tags: undefined }))
    }

    const removeTag = t => setTags(prev => prev.filter(x => x !== t))

    const validate = () => {
        const next = {}

        if (title.trim().length < 4 || title.trim().length > 120) next.title = 'Entre 4 y 120 caracteres'
        if (description.trim().length < 20 || description.trim().length > 800) next.description = 'Entre 20 y 800 caracteres'
        if (!date) next.date = 'Elige una fecha'
        if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) next.time = 'Formato HH:MM'
        if (location.trim().length < 2 || location.trim().length > 120) next.location = 'Entre 2 y 120 caracteres'
        if (address && address.length > 160) next.address = 'Máximo 160 caracteres'
        if (district && district.length > 80) next.district = 'Máximo 80 caracteres'
        if (!EVENT_CATEGORIES.includes(category)) next.category = 'Categoría no válida'
        if (tags.length < MIN_TAGS || tags.length > MAX_TAGS) next.tags = `Entre ${MIN_TAGS} y ${MAX_TAGS} tags`
        if (!EVENT_PRICE_TYPES.includes(priceType)) next.priceType = 'Tipo de precio no válido'
        if (priceType === 'De pago' && !price.trim()) next.price = 'Indica el precio'
        if (!/^(https?:|www\.)/.test(image.trim())) next.image = 'URL de imagen no válida'
        if (!EVENT_SOURCE_TYPES.includes(sourceType)) next.sourceType = 'Fuente no válida'
        if (sourceUrl && !/^(https?:|www\.)/.test(sourceUrl.trim())) next.sourceUrl = 'URL no válida'

        return next
    }

    const handleSubmit = e => {
        e.preventDefault()

        const found = validate()

        setErrors(found)

        if (Object.keys(found).length > 0) return

        const payload = {
            title: title.trim(),
            description: description.trim(),
            date,
            time,
            location: location.trim(),
            address: address.trim() || null,
            district: district.trim() || null,
            category,
            tags,
            priceType,
            price: priceType === 'De pago' ? price.trim() : null,
            image: image.trim(),
            sourceType,
            sourceUrl: sourceUrl.trim() || null
        }

        setSubmitting(true)

        Promise.resolve(onSubmit(payload))
            .finally(() => setSubmitting(false))
    }

    return <form onSubmit={handleSubmit} className="space-y-6 pb-16 md:pb-0">
        {/* === INFORMACIÓN BÁSICA === */}
        <Section title="Información básica">
            <Field label="Título" error={errors.title}>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Ej.: Concierto en la Carbonería"
                    className={inputCls(!!errors.title)}
                />
            </Field>

            <Field label="Descripción" error={errors.description}>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={3}
                    placeholder="¿Qué es? ¿Por qué merece la pena?"
                    className={inputCls(!!errors.description)}
                />
            </Field>
        </Section>

        {/* === FECHA Y HORA === */}
        <Section title="Fecha y hora">
            <div className="grid grid-cols-2 gap-3">
                <Field label="Fecha" error={errors.date}>
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className={inputCls(!!errors.date)}
                    />
                </Field>
                <Field label="Hora" error={errors.time}>
                    <input
                        type="time"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        className={inputCls(!!errors.time)}
                    />
                </Field>
            </div>
        </Section>

        {/* === UBICACIÓN === */}
        <Section title="Ubicación">
            <Field label="Nombre del lugar o punto de encuentro" error={errors.location}>
                <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="Ej.: Bar La Tertulia o Sendero de Los Cahorros"
                    className={inputCls(!!errors.location)}
                />
            </Field>

            <Field label="Dirección o indicaciones (opcional)" error={errors.address}>
                <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Ej.: C. Pintor López Mezquita, 3"
                    className={inputCls(!!errors.address)}
                />
            </Field>

            <Field label="Zona o municipio (opcional)" error={errors.district}>
                <input
                    type="text"
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    placeholder="Ej.: Realejo, Monachil"
                    className={inputCls(!!errors.district)}
                />
            </Field>
        </Section>

        {/* === CATEGORÍA Y TAGS === */}
        <Section title="Categoría y tags" subtitle="Una categoría principal + tags libres.">
            <Field label="Categoría principal" error={errors.category}>
                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className={inputCls(false)}
                >
                    {categoryList.map(c => <option key={c.name} value={c.name}>{c.emoji} {c.name}</option>)}
                </select>
            </Field>

            <Field label={`Características del plan (${MIN_TAGS}-${MAX_TAGS})`} hint="Escribe y pulsa Enter o coma." error={errors.tags}>
                {tags.length > 0 && <div className="mb-2 flex flex-wrap gap-1.5">
                    {tags.map(t => <span
                        key={t}
                        className="inline-flex items-center gap-1 rounded-full border-2 border-[color:var(--foreground)] bg-[color:var(--foreground)] px-2.5 py-1 text-[11px] font-semibold text-[color:var(--background)]"
                    >
                        {t}
                        <button
                            type="button"
                            onClick={() => removeTag(t)}
                            aria-label={`Quitar ${t}`}
                            className="-mr-1 ml-0.5 grid h-4 w-4 place-items-center rounded-full text-[color:var(--background)]/80 hover:text-[color:var(--background)]"
                        >
                            ×
                        </button>
                    </span>)}
                </div>}

                <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ',') {
                            e.preventDefault()
                            addTag(tagInput)
                        } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
                            removeTag(tags[tags.length - 1])
                        }
                    }}
                    placeholder={tags.length >= MAX_TAGS ? 'Máximo alcanzado' : 'Añade una característica…'}
                    disabled={tags.length >= MAX_TAGS}
                    className={inputCls(false)}
                />

                {availableSuggestions.length > 0 && tags.length < MAX_TAGS && <div className="mt-2 flex flex-wrap gap-1.5">
                    {availableSuggestions.map(s => <button
                        type="button"
                        key={s}
                        onClick={() => addTag(s)}
                        className="rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2.5 py-1 text-[11px] font-medium text-[color:var(--muted-foreground)] transition hover:border-[color:var(--foreground)] hover:text-[color:var(--foreground)]"
                    >
                        + {s}
                    </button>)}
                </div>}
            </Field>
        </Section>

        {/* === PRECIO === */}
        <Section title="Precio">
            <Field label="¿Cuánto cuesta?" error={errors.priceType}>
                <div className="flex flex-wrap gap-1.5">
                    {EVENT_PRICE_TYPES.map(p => {
                        const active = priceType === p
                        return <button
                            type="button"
                            key={p}
                            onClick={() => setPriceType(p)}
                            aria-pressed={active}
                            className={`rounded-full border-2 px-3 py-1 text-[12px] font-bold transition ${active ? 'border-[color:var(--foreground)] bg-[color:var(--foreground)] text-[color:var(--background)]' : 'border-[color:var(--border)] bg-[color:var(--background)] text-[color:var(--muted-foreground)] hover:border-[color:var(--foreground)] hover:text-[color:var(--foreground)]'}`}
                        >
                            {p}
                        </button>
                    })}
                </div>
            </Field>

            {priceType === 'De pago' && <Field label="Precio (€)" hint="Ej.: 15, 22, 5 + consumición" error={errors.price}>
                <input
                    type="text"
                    inputMode="decimal"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="15"
                    className={inputCls(!!errors.price)}
                />
            </Field>}
        </Section>

        {/* === EXTRAS === */}
        <Section title="Extras">
            <Field label="¿De dónde lo has sacado?" error={errors.sourceType}>
                <div className="flex flex-wrap gap-1.5">
                    {EVENT_SOURCE_TYPES.map(s => {
                        const active = sourceType === s
                        return <button
                            type="button"
                            key={s}
                            onClick={() => setSourceType(s)}
                            aria-pressed={active}
                            className={`rounded-full border-2 px-3 py-1 text-[12px] font-bold transition ${active ? 'border-[color:var(--foreground)] bg-[color:var(--foreground)] text-[color:var(--background)]' : 'border-[color:var(--border)] bg-[color:var(--background)] text-[color:var(--muted-foreground)] hover:border-[color:var(--foreground)] hover:text-[color:var(--foreground)]'}`}
                        >
                            {s}
                        </button>
                    })}
                </div>
            </Field>

            <Field label="Enlace de la fuente (opcional)" hint="Vacío si la fuente no tiene URL (cartel, boca a boca…)" error={errors.sourceUrl}>
                <input
                    type="url"
                    value={sourceUrl}
                    onChange={e => setSourceUrl(e.target.value)}
                    placeholder="https://instagram.com/…"
                    className={inputCls(!!errors.sourceUrl)}
                />
            </Field>

            <Field label="URL de la imagen" hint="Pega el enlace directo a una imagen (obligatorio)." error={errors.image}>
                <input
                    type="url"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/…"
                    className={inputCls(!!errors.image)}
                />
            </Field>
        </Section>

        {/* === SUBMIT === */}
        <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[color:var(--foreground)] px-4 text-base font-extrabold text-[color:var(--background)] transition active:scale-[0.98] disabled:opacity-60"
        >
            {submitting ? 'Guardando…' : mode === 'edit' ? 'Guardar cambios' : 'Publicar plan'}
        </button>
    </form>
}

// === Subcomponentes locales ===

function Section({ title, subtitle, children }) {
    return <section className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-4 md:p-6">
        <header className="mb-4">
            <h2 className="font-display text-base font-extrabold text-[color:var(--foreground)]">
                {title}
            </h2>
            {subtitle && <p className="mt-1 text-xs text-[color:var(--muted-foreground)]">{subtitle}</p>}
        </header>
        <div className="space-y-4">{children}</div>
    </section>
}

function Field({ label, hint, error, children }) {
    return <label className="block">
        <span className="mb-1 block text-sm font-semibold">{label}</span>
        {children}
        {error
            ? <span className="mt-1 block text-xs font-medium text-[color:var(--destructive)]">{error}</span>
            : hint
                ? <span className="mt-1 block text-xs text-[color:var(--muted-foreground)]">{hint}</span>
                : null}
    </label>
}

function inputCls(hasError) {
    return `w-full rounded-lg border bg-[color:var(--background)] px-3 py-2 text-sm outline-none transition focus:border-[color:var(--foreground)] ${hasError ? 'border-[color:var(--destructive)]' : 'border-[color:var(--border)]'}`
}
