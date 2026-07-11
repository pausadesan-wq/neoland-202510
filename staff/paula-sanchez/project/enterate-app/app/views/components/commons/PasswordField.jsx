import { useState } from 'react'

import { Label } from './Label'
import { Input } from './Input'
import { Icon } from '../Icon'

// El botón de mostrar/ocultar va dentro del input, a la derecha (igual que en remix-reference).
// El input reserva sitio con pr-10 para que el texto no quede debajo del icono.

export function PasswordField({ alias, children, placeholder }) {
    const [type, setType] = useState('password')

    const handleTogglePasswordClick = event => {
        event.preventDefault()

        setType(type === 'password' ? 'text' : 'password')
    }

    const visible = type === 'text'

    return <div className="flex flex-col">
        <Label alias={alias}>{children}</Label>

        <div className="relative">
            <Input alias={alias} type={type} autoComplete="off" placeholder={placeholder} className="pr-10" />

            <button
                type="button"
                onClick={handleTogglePasswordClick}
                aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-[color:var(--muted-foreground)] outline-none transition hover:text-[color:var(--foreground)] focus-visible:text-[color:var(--foreground)]"
            >
                <Icon name={visible ? 'eye-off' : 'eye'} className="h-[18px] w-[18px]" />
            </button>
        </div>
    </div>
}
