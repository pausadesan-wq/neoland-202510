import { useState } from 'react'

import { Label } from './Label'
import { Input } from './Input'

export function PasswordField({ alias, children }) {
    const [type, setType] = useState('password')

    const handleTogglePasswordClick = event => {
        event.preventDefault()

        setType(type === 'password' ? 'text' : 'password')
    }

    return <div>
        <Label alias={alias}>{children}</Label>
        <Input alias={alias} type={type} autoComplete="off" />
        <button
            type="button"
            onClick={handleTogglePasswordClick}
            className="mt-1 text-xs font-semibold text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
        >
            {type === 'password' ? 'Mostrar' : 'Ocultar'}
        </button>
    </div>
}
