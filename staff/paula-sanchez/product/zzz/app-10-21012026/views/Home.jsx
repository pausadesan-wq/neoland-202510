const { useState } = React

function Home({ onGoToAddPet, onGoToLogin, onGoToProfile }) {
    console.log('Home -> call')

    const [message, setMessage] = useState('')

    const handleAddPetClick = event => {
        event.preventDefault()

        onGoToAddPet()
    }

    const handleLogoutClick = event => {
        event.preventDefault()

        try {
            logic.logoutUser()

            setMessage('')

            onGoToLogin()
        } catch (error) {
            setMessage('sorry, there was an error on logout, please, try it later')
        }
    }

    const handleProfileClick = event => {
        event.preventDefault()

        onGoToProfile()
    }

    console.log('Home -> render')

    return <div className="p-4">
        <h1 className="font-bold text-xl">MyPet</h1>

        <h2 className="font-bold">Welcome Home!</h2>

        <div className="flex justify-between">
            <Anchor onClick={handleAddPetClick}>+ Pet</Anchor>

            <Anchor onClick={handleProfileClick}>Profile</Anchor>

            <Button type="button" onClick={handleLogoutClick}>Logout</Button>
        </div>

        <PetList />

        <p>{message}</p>
    </div>
} 