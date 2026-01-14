// Creamos el root de React donde se renderizará la app
const root = ReactDOM.createRoot(document.getElementById('root'))

// Renderizamos el componente principal App
root.render(<App />)

// Destructuring para usar hooks de React
const { useState, useRef } = React


function App() {
    // Se ejecuta cada vez que la función App se llama
    console.log('App -> call')

    // Estado que controla qué pantalla se muestra
    const [view, setView] = useState('landing')

    // Estado para mostrar mensajes de error o feedback al usuario
    const [message, setMessage] = useState('')

    // Estado para mostrar/ocultar contraseña
    const [passwordType, setPasswordType] = useState('password')

    // Estado para mostrar/ocultar repetir contraseña
    const [passwordRepeatType, setPasswordRepeatType] = useState('password')

    // Estado donde se guardan las mascotas del usuario
    const [pets, setPets] = useState([])

    // Referencia al formulario de login (para poder resetearlo)
    const loginFormRef = useRef()

    // Referencia al formulario de registro
    const registerFormRef = useRef()


    // Cambia a la vista de login
    const handleLoginClick = event => {
        event.preventDefault()

        // Si existe el formulario de registro lo reseteamos
        if (registerFormRef.current)
            registerFormRef.current.reset()

        setView('login')
        setMessage('')
        setPasswordType('password')
        setPasswordRepeatType('password')
    }


    // Cambia a la vista de registro
    const handleRegisterClick = event => {
        event.preventDefault()

        // Si existe el formulario de login lo reseteamos
        if (loginFormRef.current)
            loginFormRef.current.reset()

        setView('register')
        setMessage('')
        setPasswordType('password')
        setPasswordRepeatType('password')
    }


    // Envío del formulario de login
    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        // Obtenemos los valores del formulario
        const username = form.username.value
        const password = form.password.value

        try {
            // Intentamos hacer login
            logic.loginUser(username, password)

            // Limpiamos el formulario
            form.reset()

            // Obtenemos las mascotas del usuario
            const pets = logic.getPets()

            // Cambiamos a la vista home
            setView('home')

            // Reseteamos estados
            setMessage('')
            setPasswordType('password')
            setPasswordRepeatType('password')

            // Guardamos las mascotas en el estado
            setPets(pets)

        } catch (error) {
            // Si hay error mostramos el mensaje
            setMessage(error.message)
        }
    }


    // Envío del formulario de registro
    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        // Obtenemos datos del formulario
        const name = form.name.value
        const email = form.email.value
        const username = form.username.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {
            // Intentamos registrar usuario
            logic.registerUser(name, email, username, password, passwordRepeat)

            // Limpiamos formulario
            form.reset()

            // Después del registro enviamos al login
            setView('login')
            setMessage('')

        } catch (error) {
            setMessage(message)
        }
    }


    // Mostrar / ocultar contraseña
    const handleTogglePasswordClick = event => {
        event.preventDefault()

        // Cambia entre password y text
        setPasswordType(passwordType === 'password' ? 'text' : 'password')
    }


    // Mostrar / ocultar repetir contraseña
    const handleTogglePasswordRepeatClick = event => {
        event.preventDefault()

        setPasswordRepeatType(passwordRepeatType === 'password' ? 'text' : 'password')
    }


    // Logout del usuario
    const handleLogoutClick = event => {
        event.preventDefault()

        try {
            logic.logoutUser()

            // Volvemos al login
            setView('login')

        } catch(error) {
            setMessage('sorry, there was an error on logout, please, try it later')
        }
    }


    // Ir a la pantalla de añadir mascota
    const handleAddPetClick = event => {
        event.preventDefault()

        setView('add-pet')
    }


    // Volver a la pantalla home
    const handleBackClick = event => {
        event.preventDefault()

        setView('home')
    }


    // Envío del formulario para añadir mascota
    const handleAddPetSubmit = event => {
        event.preventDefault()

        const form = event.target

        // Datos de la mascota
        const name = form.name.value
        const birthdate = form.birthdate.value
        const weight = Number(form.weight.value)
        const image = form.image.value

        try {
            // Guardamos mascota
            logic.addPet(name, birthdate, weight, image)

            form.reset()

            // Actualizamos lista de mascotas
            const pets = logic.getPets()

            setView('home')
            setPets(pets)

        } catch(error) {
            setMessage(error.message)
        }
    }


    // Se ejecuta cada vez que React renderiza la interfaz
    console.log('App -> render')


    // -------- LANDING PAGE --------
    // Pantalla inicial de la aplicación
    if (view === 'landing')
        return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>
            <p>Welcome!</p>

            {/* Navegación a login o registro */}
            <nav>
                <a className="cursor-pointer underline font-bold" onClick={handleLoginClick}>Login</a> or <a className="cursor-pointer underline font-bold" onClick={handleRegisterClick}>Register</a>
            </nav>
        </div>


    // -------- LOGIN --------
    // Pantalla de inicio de sesión
    if (view === 'login')
        return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <h2 className="font-bold">Login</h2>

            {/* Formulario de login */}
            <form className="flex flex-col" onSubmit={handleLoginSubmit} ref={loginFormRef}>

                {/* Campo username */}
                <label htmlFor="username">Username</label>
                <input id="username" name="username" autoComplete="username" type="text" className="border px-1" />

                {/* Campo password */}
                <label htmlFor="password">Password</label>
                <input id="password" name="password" autoComplete="off" type={passwordType} className={passwordType === 'password' ? 'border px-1' : 'border px-1 bg-[gold]'} />

                {/* Botón mostrar / ocultar contraseña */}
                <button className="self-end" type="button" onClick={handleTogglePasswordClick}>
                    {passwordType === 'password' ? 'Show' : 'Hide'}
                </button>

                {/* Botón enviar login */}
                <button className="bg-black text-white px-1 self-center" type="submit">Login</button>
            </form>

            {/* Enlace a registro */}
            <a className="cursor-pointer underline font-bold" onClick={handleRegisterClick}>Register</a>

            {/* Mensaje de error */}
            <p>{message}</p>
        </div>


    // -------- REGISTER --------
    // Pantalla de registro de usuario
    if (view === 'register')
        return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <h2 className="font-bold">Register</h2>

            {/* Formulario de registro */}
            <form className="flex flex-col" onSubmit={handleRegisterSubmit} ref={registerFormRef}>

                {/* Nombre */}
                <label htmlFor="name">Name</label>
                <input id="name" name="name" autoComplete="name" type="text" className="border px-1" />

                {/* Email */}
                <label htmlFor="email">Email</label>
                <input id="email" name="email" autoComplete="email" type="email" className="border px-1" />

                {/* Username */}
                <label htmlFor="username">Username</label>
                <input id="username" name="username" autoComplete="username" type="text" className="border px-1" />

                {/* Password */}
                <label htmlFor="password">Password</label>
                <input id="password" name="password" autoComplete="off" type={passwordType} className={passwordType === 'password' ? 'border px-1' : 'border px-1 bg-[gold]'} />

                <button className="self-end" type="button" onClick={handleTogglePasswordClick}>
                    {passwordType === 'password' ? 'Show' : 'Hide'}
                </button>

                {/* Repetir password */}
                <label htmlFor="passwordRepeat">Repeat Password</label>
                <input id="passwordRepeat" name="passwordRepeat" autoComplete="off" type={passwordRepeatType} className={passwordRepeatType === 'password' ? 'border px-1' : 'border px-1 bg-[gold]'} />

                <button className="self-end" type="button" onClick={handleTogglePasswordRepeatClick}>
                    {passwordRepeatType === 'password' ? 'Show' : 'Hide'}
                </button>

                {/* Botón registro */}
                <button className="bg-black text-white px-1 self-center" type="submit">Register</button>
            </form>

            {/* Enlace a login */}
            <a className="cursor-pointer underline font-bold" onClick={handleLoginClick}>Login</a>

            {/* Mensaje */}
            <p>{message}</p>
        </div>


    // -------- HOME --------
    // Pantalla principal con lista de mascotas
    if (view === 'home') {

        // Array para construir los elementos JSX de mascotas
        const petItems = []

        for (const pet of pets) {

            // Representación visual de cada mascota
            const petItem =
                <li className="flex items-center border-2 border-black p-2 justify-between">

                    <div className="flex items-center gap-4">

                        {/* Imagen de la mascota */}
                        <img src={pet.image} className="rounded-full w-10 h-10 object-cover" />

                        {/* Nombre */}
                        <p>{pet.name}</p>

                    </div>

                    {/* Botón borrar mascota */}
                    <button className="bg-black text-white px-1 justify-self-end">🗑️</button>

                </li>

            petItems.push(petItem)
        }

        return <div className="p-4">

            <h1 className="font-bold text-xl">MyPet</h1>

            <h2 className="font-bold">Welcome Home!</h2>

            {/* Botones principales */}
            <div className="flex justify-between">
                <button className="bg-black text-white px-1" type="button" onClick={handleAddPetClick}>+ Pet</button>
                <button className="bg-black text-white px-1" type="button" onClick={handleLogoutClick}>Logout</button>
            </div>

            {/* Lista de mascotas */}
            <ul className="flex flex-col gap-2 mt-2">
                {petItems}
            </ul>

            {/* Modal de confirmación de borrado (no activo aún) */}
            <div className="w-full h-full fixed top-0 left-0 bg-black/75 flex justify-center items-center" style={{ display: 'none' }}>
                <div className="bg-white border-black border-2 p-2">

                    <p className="text-center">Delete Pet?</p>

                    <div className="flex justify-center gap-2">
                        <button className="bg-black text-white px-1">❌</button>
                        <button className="bg-black text-white px-1">✅</button>
                    </div>

                </div>
            </div>

            <p>{message}</p>

        </div>
    }


    // -------- ADD PET --------
    // Pantalla para añadir una nueva mascota
    if (view === 'add-pet')
        return <div className="p-4">

            <h1 className="font-bold text-xl">MyPet</h1>

            {/* Cabecera con botón volver */}
            <div className="flex justify-between">
                <h2 className="font-bold">Add Pet</h2>

                <a className="cursor-pointer underline font-bold" onClick={handleBackClick}>
                    &lt; Back
                </a>
            </div>

            {/* Formulario para añadir mascota */}
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