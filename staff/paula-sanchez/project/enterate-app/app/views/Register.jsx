
import { Link, useNavigate, useSearchParams } from 'react-router'

import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { PasswordField } from './components/commons/PasswordField'
import { Button } from './components/commons/Button'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'

// Register conserva ?redirect= y lo propaga al login tras crear la cuenta.

export function Register() {
    logger.debug('Register -> call')

    const { onError } = useContext()

    const navigate = useNavigate()

    const [searchParams] = useSearchParams()
    const redirect = searchParams.get('redirect') || '/'
    const encodedRedirect = encodeURIComponent(redirect)

    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const email = form.email.value
        const username = form.username.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {
            logic.registerUser(name, email, username, password, passwordRepeat)
                .then(() => {
                    form.reset()
                    navigate(`/login?redirect=${encodedRedirect}`, { replace: true })
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    logger.debug('Register -> render')

    return <div className="mx-auto max-w-md py-8">
        <span className="inline-block rotate-[-2deg] rounded-full bg-[color:var(--brand-yellow)] px-3 py-1 text-[11px] font-extrabold uppercase">
            nuevx por aquí
        </span>

        <h1 className="mt-2 font-display text-[23px] font-extrabold leading-tight md:text-4xl">
            Crea tu <span className="mark-yellow">cuenta</span>
        </h1>

        <p className="mt-1 text-[13px] text-[color:var(--muted-foreground)] md:text-sm">
            Guarda planes, sube los tuyos, entérate antes que nadie.
        </p>

        <div className="mt-6">
            <Form onSubmit={handleRegisterSubmit}>
                <Field alias="name" type="text" placeholder="Cómo quieres que te llamen">Nombre</Field>

                <Field alias="email" type="email" placeholder="tu@email.com">Email</Field>

                <Field alias="username" type="text" placeholder="tu_usuario">Usuario</Field>

                <PasswordField alias="password" placeholder="Mínimo 8 caracteres, con letras y números">Contraseña</PasswordField>

                <PasswordField alias="passwordRepeat" placeholder="Repite la contraseña">Repite la contraseña</PasswordField>

                <Button variant="brand" className="mt-1" type="submit">Crear cuenta</Button>
            </Form>
        </div>

        <p className="mt-6 text-center text-[13px] text-[color:var(--muted-foreground)] md:text-sm">
            ¿Ya tienes cuenta? <Link to={`/login?redirect=${encodedRedirect}`} className="font-semibold text-[color:var(--foreground)] underline-offset-4 hover:underline">Entrar</Link>
        </p>
    </div>
}
