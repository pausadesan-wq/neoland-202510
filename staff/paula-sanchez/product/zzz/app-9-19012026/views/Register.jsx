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
                <label htmlFor="name">Name</label>
                <input id="name" name="name" autoComplete="name" type="text" className="border px-1" />

                <label htmlFor="email">Email</label>
                <input id="email" name="email" autoComplete="email" type="email" className="border px-1" />

                <label htmlFor="username">Username</label>
                <input id="username" name="username" autoComplete="username" type="text" className="border px-1" />

                <label htmlFor="password">Password</label>
                <input id="password" name="password" autoComplete="off" type={passwordType} className={passwordType === 'password' ? 'border px-1' : 'border px-1 bg-[gold]'} />
                <button className="self-end" type="button" onClick={handleTogglePasswordClick}>{passwordType === 'password' ? 'Show' : 'Hide'}</button>

                <label htmlFor="passwordRepeat">Repeat Password</label>
                <input id="passwordRepeat" name="passwordRepeat" autoComplete="off" type={passwordRepeatType} className={passwordRepeatType === 'password' ? 'border px-1' : 'border px-1 bg-[gold]'} />
                <button className="self-end" type="button" onClick={handleTogglePasswordRepeatClick}>{passwordRepeatType === 'password' ? 'Show' : 'Hide'}</button>

                <Button className="self-center" type="submit">Register</Button>
            </form>

            <a className="cursor-pointer underline font-bold" onClick={handleLoginClick}>Login</a>

            <p>{message}</p>
        </div>
}