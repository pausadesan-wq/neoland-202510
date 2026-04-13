const { useState } = React

function Register({ onGoToLogin }) {
    console.log('Register -> call')

    const [message, setMessage] = useState('')
    const [passwordType, setPasswordType] = useState('password')
    const [passwordRepeatType, setPasswordRepeatType] = useState('password')

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
            setPasswordType('password')
            setPasswordRepeatType('password')

            onGoToLogin()
        } catch (error) {
            setMessage(error.message)
        }
    }

    const handleTogglePasswordClick = event => {
        event.preventDefault()

        setPasswordType(passwordType === 'password' ? 'text' : 'password')
    }

    const handleTogglePasswordRepeatClick = event => {
        event.preventDefault()

        setPasswordRepeatType(passwordRepeatType === 'password' ? 'text' : 'password')
    }

    const handleLoginClick = event => {
        event.preventDefault()

        onGoToLogin()
    }

    console.log('Register -> render')

    return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <h2 className="font-bold">Register</h2>

            <form className="flex flex-col" onSubmit={handleRegisterSubmit}>
                <Label alias="name">Name</Label>
                <Input alias="name" type="text" />

                <Label alias="email">E-mail</Label>
                <Input alias="email" type="text" />

                <Label alias="username">Username</Label>
                <Input alias="username" type="text" />

                <Label alias="password">Password</Label>
                <Input alias="password" autoComplete="off" type={passwordType} className={passwordType === 'password' ? '' : 'bg-[gold]'} />
                <button className="self-end" type="button" onClick={handleTogglePasswordClick}>{passwordType === 'password' ? 'Show' : 'Hide'}</button>

                <Label alias="passwordRepeat">Repeat Password</Label>
                <Input alias="passwordRepeat" autoComplete="off" type={passwordRepeatType} className={passwordRepeatType === 'password' ? '' : 'bg-[gold]'} />
                <button className="self-end" type="button" onClick={handleTogglePasswordRepeatClick}>{passwordRepeatType === 'password' ? 'Show' : 'Hide'}</button>

                <Button className="self-center" type="submit">Register</Button>
            </form>

            <a className="cursor-pointer underline font-bold" onClick={handleLoginClick}>Login</a>

            <p>{message}</p>
        </div>
}