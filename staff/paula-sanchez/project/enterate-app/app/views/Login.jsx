
import { Link, useNavigate, useSearchParams } from 'react-router'

import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { PasswordField } from './components/commons/PasswordField'
import { Button } from './components/commons/Button'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'

// Login lee ?redirect= para volver a la ruta original tras autenticarse.

export function Login() {
    logger.debug('Login -> call')

    const { onError } = useContext()

    const navigate = useNavigate()

    const [searchParams] = useSearchParams()
    const redirect = searchParams.get('redirect') || '/'
    const encodedRedirect = encodeURIComponent(redirect)

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const email = form.email.value
        const password = form.password.value

        try {
            logic.loginUser(email, password)
                .then(() => navigate(redirect, { replace: true }))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    logger.debug('Login -> render')

    return <div className="mx-auto max-w-md py-8">
        <h1 className="text-3xl font-extrabold">Entrar</h1>
        <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">Accede con tu email y contraseña.</p>

        <div className="mt-6">
            <Form onSubmit={handleLoginSubmit}>
                <Field alias="email" type="email">Email</Field>

                <PasswordField alias="password">Contraseña</PasswordField>

                <Button className="mt-2" type="submit">Entrar</Button>
            </Form>
        </div>

        <p className="mt-6 text-sm">
            ¿Sin cuenta? <Link to={`/register?redirect=${encodedRedirect}`} className="font-semibold text-[color:var(--foreground)] underline underline-offset-4 hover:text-[color:var(--brand-blue)]">Crear cuenta</Link>
        </p>
    </div>
}
