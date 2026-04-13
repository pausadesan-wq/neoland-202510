const { useState } = React

function Login({ onGoToHome, onGoToRegister }) {
    console.log('Login -> call')

    const [message, setMessage] = useState('')
    const [passwordType, setPasswordType] = useState('password')

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginUser(username, password)

            form.reset()

            setMessage('')
            setPasswordType('password')

            onGoToHome()
        } catch (error) {
            setMessage(error.message)
        }
    }

    const handleTogglePasswordClick = event => {
        event.preventDefault()

        setPasswordType(passwordType === 'password' ? 'text' : 'password')
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        onGoToRegister()
    }

    console.log('Login -> render')

    return <div className="p-4">
        <h1 className="font-bold text-xl">MyPet</h1>

        <h2 className="font-bold">Login</h2>

        <form className="flex flex-col" onSubmit={handleLoginSubmit}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" autoComplete="username" type="text" className="border px-1" />

            <label htmlFor="password">Password</label>
            <input id="password" name="password" autoComplete="off" type={passwordType} className={passwordType === 'password' ? 'border px-1' : 'border px-1 bg-[gold]'} />
            <button className="self-end" type="button" onClick={handleTogglePasswordClick}>{passwordType === 'password' ? 'Show' : 'Hide'}</button>

            <Button className="self-center" type="submit">Login</Button>
        </form>

        <a className="cursor-pointer underline font-bold" onClick={handleRegisterClick}>Register</a>

        <p>{message}</p>
    </div>
}