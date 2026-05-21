import { useState, useEffect } from 'react'

import { Form } from './commons/Form'
import { Field } from './commons/Field'
import { Button } from './commons/Button'

import { useContext } from '../../context'

import { logic } from '../../logic'

import { logger } from '../../logger'

export function ChangeUserUsername() {
    logger.debug('ChangeUserUsername -> call')

    const { onSuccess, onError } = useContext()

    const [username, setUsername] = useState('')

    useEffect(() => {
        try {
            logic.getLoggedInUser()
                .then(user => setUsername(user.username))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    const handleChangeNameSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value

        try {
            logic.changeUserUsername(username)
                .then(() => onSuccess('username successfully updated'))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    logger.debug('ChangeUserUsername -> render')

    return <div>
        <Form onSubmit={handleChangeNameSubmit}>
            <Field alias="username" type="text" defaultValue={username}>Username</Field>

            <Button className="self-center mt-4" type="submit">Update username</Button>
        </Form>
    </div>
}