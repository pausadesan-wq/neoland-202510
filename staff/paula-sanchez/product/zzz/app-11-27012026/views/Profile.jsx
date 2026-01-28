const { useState } = React

function Profile({ onGoToHome }) {
    console.log('Profile -> call')

    const [view, setView] = useState(null)

    const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()   
    }

    const handleChangeEmailClick = event => {
        event.preventDefault()

        setView('change-email')
    }

    const handlePasswordClick = event => {
        event.preventDefault()

        setView('change-password')
    }

    console.log('Profile -> render')

    return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <div className="flex justify-between">
                <h2 className="font-bold">Profile</h2>

                <Anchor onClick={handleBackClick}>&lt; Back</Anchor>
            </div>

            <ul>
                <li><Anchor onClick={handleChangeEmailClick}>Change e-mail</Anchor></li>
                <li><Anchor onClick={handlePasswordClick}>Change password</Anchor></li>
            </ul>

            {view === 'change-email' && <ChangeUserEmail />}

            {view === 'change-password' && <ChangeUserPassword />}
        </div>
}