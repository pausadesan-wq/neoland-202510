const { useState } = React

function ChangeUserEmail() {
    console.log('ChangeUserEmail -> call')

    const [message, setMessage] = useState('')

    const handleChangeEmailSubmit = event => {
        event.preventDefault()

        const form = event.target

        const email = form.email.value
        const newEmail = form.newEmail.value
        const newEmailRepeat = form.newEmailRepeat.value

        try {
            logic.changeUserEmail(email, newEmail, newEmailRepeat)

            form.reset()
        } catch (error) {
            setMessage(error.message)
        }
    }

    console.log('ChangeUserEmail -> render')

    return <div>
        <Form onSubmit={handleChangeEmailSubmit}>
            <Field alias="email" type="email">E-mail</Field>

            <Field alias="newEmail" type="email">New e-mail</Field>

            <Field alias="newEmailRepeat" type="email">New e-mail repeat</Field>

            <Button className="self-center mt-4" type="submit">Update e-mail</Button>
        </Form>

        <p>{message}</p>
    </div>
}