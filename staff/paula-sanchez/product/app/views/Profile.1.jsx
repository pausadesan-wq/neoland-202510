const { useState } = React

function Profile({ onGoToHome }) {
    console.log('Profile -> call')

    const [message, setMessage] = useState('')

    const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()   
    }

    const handleChangeEmailSubmit = event => {
        event.preventDefault()

        const form = event.target

        const email = form.email.value
        const newEmail = form.newEmail.value
        const newEmailRepeat = form.newEmailRepeat.value

        try {
            logic.changeUserEmail(email, newEmail, newEmailRepeat)

            form.reset()

            onGoToHome()
        } catch (error) {
            setMessage(error.message)
        }
    }

    const handleChangePasswordSubmit = event => {
        event.preventDefault()

        const form = event.target

        const password = form.password.value
        const newPassword = form.newPassword.value
        const newPasswordRepeat = form.newPasswordRepeat.value

        try {
            logic.changeUserPassword(password, newPassword, newPasswordRepeat)

            form.reset()

            onGoToHome()
        } catch (error) {
            setMessage(error.message)
        }
    }

    console.log('Profile -> render')

    return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <div className="flex justify-between">
                <h2 className="font-bold">Profile</h2>

                <Anchor onClick={handleBackClick}>&lt; Back</Anchor>
            </div>

            <Form onSubmit={handleChangeEmailSubmit}>
                <Field alias="email" type="email">E-mail</Field>

                <Field alias="newEmail" type="email">New e-mail</Field>

                <Field alias="newEmailRepeat" type="email">New e-mail repeat</Field>

                <Button className="self-center mt-4" type="submit">Update e-mail</Button>
            </Form>

            <Form onSubmit={handleChangePasswordSubmit}>
                <PasswordField alias="password">Password</PasswordField>

                <PasswordField alias="newPassword">New password</PasswordField>

                <PasswordField alias="newPasswordRepeat">New password repeat</PasswordField>

                <Button className="self-center mt-4" type="submit">Update password</Button>
            </Form>

            <p>{message}</p>
        </div>
}