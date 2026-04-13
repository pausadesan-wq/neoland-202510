// function Landing(props) {
function Landing({ onLoginClick, onRegisterClick }) {
    console.log('Landing -> call')

    //const onLoginClick = props.onLoginClick
    //const onRegisterClick = props.onRegisterClick

    // const { onLoginClick, onRegisterClick } = props

    const handleLoginClick = event => {
        event.preventDefault()

        onLoginClick()
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterClick()
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