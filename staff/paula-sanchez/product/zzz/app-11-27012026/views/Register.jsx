const { useState } = React

function Register({ onGoToLogin }) {
    console.log('Register -> call')

    const [message, setMessage] = useState('')

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

            form.reset()

            setMessage('')

            onGoToLogin()
        } catch (error) {
            setMessage(error.message)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        onGoToLogin()
    }

    console.log('Register -> render')

    return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <h2 className="font-bold">Register</h2>

            <Form onSubmit={handleRegisterSubmit}>
                <Field alias="name" type="text">Name</Field>

                <Field alias="email" type="email">E-mail</Field>

                <Field alias="username" type="text">Username</Field>

                <PasswordField alias="password">Password</PasswordField>

                <PasswordField alias="passwordRepeat">Repeat Password</PasswordField>

                <Button className="self-center" type="submit">Register</Button>
            </Form>

            <Anchor onClick={handleLoginClick}>Login</Anchor>

            <p>{message}</p>
        </div>
}