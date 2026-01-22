const { useState } = React

function App() {
    console.log('App -> call')

    const [view, setView] = useState('landing')

    const handleGoToLogin = () => setView('login')

    const handleGoToRegister = () => setView('register')

    const handleGoToHome = () => setView('home')

    const handleGoToAddPet = () => setView('add-pet')

    console.log('App -> render')

    if (view === 'landing')
        return <Landing onGoToLogin={handleGoToLogin} onGoToRegister={handleGoToRegister} />

    if (view === 'login')
        return <Login onGoToHome={handleGoToHome} onGoToRegister={handleGoToRegister} />

    if (view === 'register')
        return <Register onGoToLogin={handleGoToLogin} />

    if (view === 'home')
        return <Home onGoToAddPet={handleGoToAddPet} onGoToLogin={handleGoToLogin} />

    if (view === 'add-pet')
        return <AddPet onGoToHome={handleGoToHome} />
}