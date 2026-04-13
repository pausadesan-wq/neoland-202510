function Landing({ onGoToLogin, onGoToRegister }) {
    console.log('Landing -> call')

    const handleLoginClick = event => {
        event.preventDefault()

        onGoToLogin()
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        onGoToRegister()
    }

    console.log('Landing -> render')

    return <div className="p-4">
        <h1 className="font-bold text-xl">MyPet</h1>
        <p>Welcome!</p>

        <nav>
            <a className="cursor-pointer underline font-bold" onClick={handleLoginClick}>Login</a> or <a className="cursor-pointer underline font-bold" onClick={handleRegisterClick}>Register</a>
        </nav>
    </div>
}