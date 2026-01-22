const { useState } = React

function Profile({ onGoToHome }) {
    console.log('Profile -> call')

    const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()   
    }

    console.log('Profile -> render')

    return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <div className="flex justify-between">
                <h2 className="font-bold">Profile</h2>

                <Anchor onClick={handleBackClick}>&lt; Back</Anchor>
            </div>

            <ChangeUserEmail />

            <ChangeUserPassword />
        </div>
}