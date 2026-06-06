
import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { PasswordField } from './components/commons/PasswordField'
import { Button } from './components/commons/Button'
import { Anchor } from './components/commons/Anchor'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'

export function Register({ onGoToLogin }) {
    logger.debug('Register -> call')

    const { onError } = useContext()

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

                    onGoToLogin()
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        onGoToLogin()
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
            ¿Ya tienes cuenta? <Anchor onClick={handleLoginClick}>Entrar</Anchor>
        </p>
    </div>
}
