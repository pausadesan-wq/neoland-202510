
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
        <h1 className="text-3xl font-extrabold">Crear cuenta</h1>
        <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">Únete a ENTÉRATE y comparte planes en Granada.</p>

        <div className="mt-6">
            <Form onSubmit={handleRegisterSubmit}>
                <Field alias="name" type="text">Nombre</Field>

                <Field alias="email" type="email">Email</Field>

                <Field alias="username" type="text">Usuario</Field>

                <PasswordField alias="password">Contraseña</PasswordField>

                <PasswordField alias="passwordRepeat">Repite la contraseña</PasswordField>

                <Button className="mt-2" type="submit">Crear cuenta</Button>
            </Form>
        </div>

        <p className="mt-6 text-sm">
            ¿Ya tienes cuenta? <Link to={`/login?redirect=${encodedRedirect}`} className="font-semibold text-[color:var(--foreground)] underline underline-offset-4 hover:text-[color:var(--brand-blue)]">Entrar</Link>
        </p>
    </div>
}
