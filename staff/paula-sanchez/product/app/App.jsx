const { useState } = React

function App() {
    console.log('App -> call')

    const [view, setView] = useState('landing')

    const handleGoToLogin = () => setView('login')

    const handleGoToRegister = () => setView('register')

    const handleGoToHome = () => setView('home')

    const handleGoToAddPet = () => setView('add-pet')

    const handleGoToProfile = () => setView('profile')

    console.log('App -> render')

    return <>
        {view === 'landing' && <Landing onGoToLogin={handleGoToLogin} onGoToRegister={handleGoToRegister} />}

        {view === 'login' && <Login onGoToHome={handleGoToHome} onGoToRegister={handleGoToRegister} />}

        {view === 'register' && <Register onGoToLogin={handleGoToLogin} />}

        {view === 'home' && <Home onGoToAddPet={handleGoToAddPet} onGoToLogin={handleGoToLogin} onGoToProfile={handleGoToProfile} />}

        {view === 'add-pet' && <AddPet onGoToHome={handleGoToHome} />}

        {view === 'profile' && <Profile onGoToHome={handleGoToHome} />}
    </>
}