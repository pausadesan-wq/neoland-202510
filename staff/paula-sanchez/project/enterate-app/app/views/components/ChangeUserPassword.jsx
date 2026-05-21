import { Form } from './commons/Form'
import { PasswordField } from './commons/PasswordField'
import { Button } from './commons/Button'

import { useContext } from '../../context'

import { logic } from '../../logic'

import { logger } from '../../logger'

export function ChangeUserPassword() {
    logger.debug('ChangeUserPassword -> call')

    const { onSuccess, onError } = useContext()

    const handleChangePasswordSubmit = event => {
        event.preventDefault()

        const form = event.target

        const password = form.password.value
        const newPassword = form.newPassword.value
        const newPasswordRepeat = form.newPasswordRepeat.value

        try {
            logic.changeUserPassword(password, newPassword, newPasswordRepeat)
                .then(() => {
                    form.reset()

                    onSuccess('user password successfully updated')
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    logger.debug('ChangeUserPassword -> render')

    return <div>
        <Form onSubmit={handleChangePasswordSubmit}>
            <PasswordField alias="password" type="password">Password</PasswordField>

            <PasswordField alias="newPassword" type="password">New password</PasswordField>

            <PasswordField alias="newPasswordRepeat" type="password">New password repeat</PasswordField>

            <Button className="self-center mt-4" type="submit">Update password</Button>
        </Form>
    </div>
}