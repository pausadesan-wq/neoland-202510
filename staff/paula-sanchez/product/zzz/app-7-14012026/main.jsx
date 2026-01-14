// Se crea la raíz de React en el elemento HTML con id "root"
const root = ReactDOM.createRoot(document.getElementById('root'))

// Se renderiza el componente principal de la app
root.render(<App />)

// Se extraen hooks de React para usarlos directamente
const { useState, useRef } = React

function App() {
    // Log para ver cuándo se renderiza el componente
    console.log('App -> call')

    // Vista actual de la aplicación (landing, login, register, home, add-pet)
    const [view, setView] = useState('landing')

    // Mensajes de error o feedback para el usuario
    const [message, setMessage] = useState('')

    // Controla si la contraseña se muestra o se oculta en login/register
    const [passwordType, setPasswordType] = useState('password')

    // Controla si repetir contraseña se muestra o se oculta
    const [passwordRepeatType, setPasswordRepeatType] = useState('password')

    // Lista de mascotas del usuario
    const [pets, setPets] = useState([])

    // ID de la mascota seleccionada para borrar (modal confirmación)
    const [petId, setPetId] = useState(null)

    // Referencia al formulario de login
    const loginFormRef = useRef()

    // Referencia al formulario de registro
    const registerFormRef = useRef()


    // -------------------------
    // NAVEGACIÓN ENTRE VISTAS
    // -------------------------

    // Ir a login
    const handleLoginClick = event => {
        event.preventDefault()

        // Resetea el formulario de registro si existe
        if (registerFormRef.current)
            registerFormRef.current.reset()

        // Cambia a vista login
        setView('login')

        // Limpia mensajes y estados de contraseña
        setMessage('')
        setPasswordType('password')
        setPasswordRepeatType('password')
    }

    // Ir a registro
    const handleRegisterClick = event => {
        event.preventDefault()

        // Resetea el formulario de login si existe
        if (loginFormRef.current)
            loginFormRef.current.reset()

        // Cambia a vista register
        setView('register')

        // Limpia mensajes y estados de contraseña
        setMessage('')
        setPasswordType('password')
        setPasswordRepeatType('password')
    }


    // -------------------------
    // LOGIN
    // -------------------------

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        // Se obtienen datos del formulario
        const username = form.username.value
        const password = form.password.value

        try {
            // Intento de login
            logic.loginUser(username, password)

            // Limpia formulario
            form.reset()

            // Obtiene mascotas del usuario
            const pets = logic.getPets()

            // Cambia a home
            setView('home')

            // Limpia mensajes
            setMessage('')

            // Resetea visibilidad de password
            setPasswordType('password')
            setPasswordRepeatType('password')

            // Guarda mascotas en estado
            setPets(pets)
        } catch (error) {
            // Muestra error si login falla
            setMessage(error.message)
        }
    }


    // -------------------------
    // REGISTER
    // -------------------------

    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        // Datos del formulario de registro
        const name = form.name.value
        const email = form.email.value
        const username = form.username.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {
            // Registro de usuario
            logic.registerUser(name, email, username, password, passwordRepeat)

            // Limpia formulario
            form.reset()

            // Redirige a login
            setView('login')
            setMessage('')
        } catch (error) {
            setMessage(message)
        }
    }


    // -------------------------
    // TOGGLE PASSWORD
    // -------------------------

    // Mostrar/ocultar password login
    const handleTogglePasswordClick = event => {
        event.preventDefault()

        setPasswordType(passwordType === 'password' ? 'text' : 'password')
    }

    // Mostrar/ocultar repeat password
    const handleTogglePasswordRepeatClick = event => {
        event.preventDefault()

        setPasswordRepeatType(passwordRepeatType === 'password' ? 'text' : 'password')
    }


    // -------------------------
    // LOGOUT
    // -------------------------

    const handleLogoutClick = event => {
        event.preventDefault()

        try {
            logic.logoutUser()

            setView('login')
        } catch(error) {
            setMessage('sorry, there was an error on logout, please, try it later')
        }
    }


    // -------------------------
    // NAVEGACIÓN PETS
    // -------------------------

    // Ir a añadir mascota
    const handleAddPetClick = event => {
        event.preventDefault()

        setView('add-pet')
    }

    // Volver a home
    const handleBackClick = event => {
        event.preventDefault()

        setView('home')
    }


    // -------------------------
    // ADD PET
    // -------------------------

    const handleAddPetSubmit = event => {
        event.preventDefault()

        const form = event.target

        // Datos de la mascota
        const name = form.name.value
        const birthdate = form.birthdate.value
        const weight = Number(form.weight.value)
        const image = form.image.value

        try {
            // Crear mascota
            logic.addPet(name, birthdate, weight, image)

            form.reset()

            // Recargar mascotas
            const pets = logic.getPets()

            setView('home')
            setPets(pets)
        } catch(error) {
            setMessage(error.message)
        }
    }


    // -------------------------
    // DELETE PET
    // -------------------------

    const handleDeletePetClick = event => {
        event.preventDefault()

        const button = event.target

        // Se obtiene id de la mascota
        const petId = button.id

        setPetId(petId)
    }

    // Cancelar eliminación
    const handleCancelDeletePetClick = event => {
        event.preventDefault()

        setPetId(null)
    }

    // Confirmar eliminación
    const handleConfirmDeletePetClick = event => {
        event.preventDefault()

        try {
            logic.deletePet(petId)

            const pets = logic.getPets()

            setPetId(null)
            setPets(pets)
        } catch(error) {
            setMessage(error.message)
        }
    }

    console.log('App -> render')


    // -------------------------
    // LANDING (pantalla inicial)
    // -------------------------
    if (view === 'landing')
        return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>
            <p>Welcome!</p>

            {/* Navegación a login o register */}
            <nav>
                <a className="cursor-pointer underline font-bold" onClick={handleLoginClick}>Login</a> or <a className="cursor-pointer underline font-bold" onClick={handleRegisterClick}>Register</a>
            </nav>
        </div>


    // -------------------------
    // LOGIN SCREEN
    // -------------------------
    if (view === 'login')
        return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <h2 className="font-bold">Login</h2>

            {/* Formulario login */}
            <form className="flex flex-col" onSubmit={handleLoginSubmit} ref={loginFormRef}>

                <label htmlFor="username">Username</label>
                <input id="username" name="username" autoComplete="username" type="text" className="border px-1" />

                <label htmlFor="password">Password</label>
                <input id="password" name="password" autoComplete="off" type={passwordType} className={passwordType === 'password' ? 'border px-1' : 'border px-1 bg-[gold]'} />

                {/* Toggle password */}
                <button className="self-end" type="button" onClick={handleTogglePasswordClick}>
                    {passwordType === 'password' ? 'Show' : 'Hide'}
                </button>

                <button className="bg-black text-white px-1 self-center" type="submit">Login</button>
            </form>

            <a className="cursor-pointer underline font-bold" onClick={handleRegisterClick}>Register</a>

            <p>{message}</p>
        </div>


    // -------------------------
    // REGISTER SCREEN
    // -------------------------
    if (view === 'register')
        return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <h2 className="font-bold">Register</h2>

            {/* Formulario registro */}
            <form className="flex flex-col" onSubmit={handleRegisterSubmit} ref={registerFormRef}>

                <label htmlFor="name">Name</label>
                <input id="name" name="name" autoComplete="name" type="text" className="border px-1" />

                <label htmlFor="email">Email</label>
                <input id="email" name="email" autoComplete="email" type="email" className="border px-1" />

                <label htmlFor="username">Username</label>
                <input id="username" name="username" autoComplete="username" type="text" className="border px-1" />

                <label htmlFor="password">Password</label>
                <input id="password" name="password" autoComplete="off" type={passwordType} className={passwordType === 'password' ? 'border px-1' : 'border px-1 bg-[gold]'} />

                <button className="self-end" type="button" onClick={handleTogglePasswordClick}>
                    {passwordType === 'password' ? 'Show' : 'Hide'}
                </button>

                <label htmlFor="passwordRepeat">Repeat Password</label>
                <input id="passwordRepeat" name="passwordRepeat" autoComplete="off" type={passwordRepeatType} className={passwordRepeatType === 'password' ? 'border px-1' : 'border px-1 bg-[gold]'} />

                <button className="self-end" type="button" onClick={handleTogglePasswordRepeatClick}>
                    {passwordRepeatType === 'password' ? 'Show' : 'Hide'}
                </button>

                <button className="bg-black text-white px-1 self-center" type="submit">Register</button>
            </form>

            <a className="cursor-pointer underline font-bold" onClick={handleLoginClick}>Login</a>

            <p>{message}</p>
        </div>


    // -------------------------
    // HOME SCREEN
    // -------------------------
    if (view === 'home') {
        const petItems = []

        // Render de lista de mascotas
        for (const pet of pets) {
            const petItem = <li className="flex items-center border-2 border-black p-2 justify-between">

                <div className="flex items-center gap-4">
                    <img src={pet.image} className="rounded-full w-10 h-10 object-cover" />
                    <p>{pet.name}</p>
                </div>

                {/* Botón eliminar mascota */}
                <button id={pet.id} className="bg-black text-white px-1 justify-self-end" onClick={handleDeletePetClick}>
                    🗑️
                </button>
            </li>

            petItems.push(petItem)
        }

        return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <h2 className="font-bold">Welcome Home!</h2>

            {/* Acciones principales */}
            <div className="flex justify-between">
                <button className="bg-black text-white px-1" type="button" onClick={handleAddPetClick}>
                    + Pet
                </button>

                <button className="bg-black text-white px-1" type="button" onClick={handleLogoutClick}>
                    Logout
                </button>
            </div>

            {/* Lista de mascotas */}
            <ul className="flex flex-col gap-2 mt-2">
                {petItems}
            </ul>

            {/* Modal confirmación eliminar */}
            {petId && <div className="w-full h-full fixed top-0 left-0 bg-black/75 flex justify-center items-center">

                <div className="bg-white border-black border-2 p-2">
                    <p className="text-center">Delete Pet?</p>

                    <div className="flex justify-center gap-2">

                        {/* Cancelar */}
                        <button className="bg-black text-white px-1" onClick={handleCancelDeletePetClick}>❌</button>

                        {/* Confirmar */}
                        <button className="bg-black text-white px-1" onClick={handleConfirmDeletePetClick}>✅</button>

                    </div>
                </div>
            </div>}

            <p>{message}</p>
        </div>
    }


    // -------------------------
    // ADD PET SCREEN
    // -------------------------
    if (view === 'add-pet')
        return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <div className="flex justify-between">
                <h2 className="font-bold">Add Pet</h2>

                <a className="cursor-pointer underline font-bold" onClick={handleBackClick}>
                    &lt; Back
                </a>
            </div>

            {/* Formulario añadir mascota */}
            <form className="flex flex-col" onSubmit={handleAddPetSubmit}>

                <label htmlFor="name">Name</label>
                <input id="name" name="name" autoComplete="off" type="text" className="border px-1" />

                <label htmlFor="date">Date of Birth</label>
                <input id="birthdate" name="birthdate" autoComplete="off" type="date" className="border px-1" />

                <label htmlFor="weight">Weight (kg)</label>
                <input id="weight" name="weight" autoComplete="off" type="number" step="0.01" className="border px-1" />

                <label htmlFor="image">Image</label>
                <input id="image" name="image" autoComplete="off" type="url" className="border px-1" />

                <button className="bg-black text-white px-1 self-center mt-4" type="submit">
                    Add Pet
                </button>
            </form>

            <p>{message}</p>
        </div>
}