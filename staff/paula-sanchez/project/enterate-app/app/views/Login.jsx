
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
        <span className="inline-block rotate-[-2deg] rounded-full bg-[color:var(--brand-yellow)] px-3 py-1 text-[11px] font-extrabold uppercase">
            de vuelta
        </span>

        <h1 className="mt-2 font-display text-[23px] font-extrabold leading-tight md:text-4xl">
            Bienvenidx a <span className="mark-yellow">ENTÉRATE</span>
        </h1>

        <p className="mt-1 text-[13px] text-[color:var(--muted-foreground)] md:text-sm">
            Entra para guardar planes y subir los tuyos.
        </p>

        <div className="mt-6">
            <Form onSubmit={handleLoginSubmit}>
                <Field alias="email" type="email">Email</Field>

                <PasswordField alias="password">Contraseña</PasswordField>

                <Button className="mt-2" type="submit">Entrar</Button>
            </Form>
        </div>

        <p className="mt-6 text-center text-[13px] text-[color:var(--muted-foreground)] md:text-sm">
            ¿Aún no tienes cuenta? <Link to={`/register?redirect=${encodedRedirect}`} className="font-semibold text-[color:var(--foreground)] underline-offset-4 hover:underline">Crear cuenta</Link>
        </p>
    </div>
}
