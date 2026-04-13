const root = ReactDOM.createRoot(document.getElementById('root')) // crea la raíz de React en el div con id "root"

root.render(<App />) // renderiza el componente App dentro de la raíz

const useState = React.useState // alias para usar useState más fácilmente

function App() {
    console.log('App -> call') // se ejecuta cada vez que se llama al componente
    
    const [view, setView] = useState('landing') // estado que controla qué pantalla se muestra
    const [message, setMessage] = useState('') // estado para mostrar mensajes de error o información
    const [passwordType, setPasswordType] = useState('password') // controla si la contraseña se ve o está oculta
    const [passwordRepeatType, setPasswordRepeatType] = useState('password') // controla si la repetición de contraseña se ve o está oculta

    const handleLoginClick = event => { // función que se ejecuta al hacer click en "Login"
        event.preventDefault() // evita el comportamiento por defecto del enlace

        setView('login') // cambia la vista a la pantalla de login
    }

    const handleRegisterClick = event => { // función que se ejecuta al hacer click en "Register"
        event.preventDefault() // evita comportamiento por defecto

        setView('register') // cambia la vista a la pantalla de registro
    }

    const handleLoginSubmit = event => { // función que se ejecuta al enviar el formulario de login
        event.preventDefault() // evita recargar la página

        const form = event.target // obtiene el formulario

        const username = form.username.value // obtiene el valor del username
        const password = form.password.value // obtiene el valor del password

        try {
            logic.loginUser(username, password) // intenta iniciar sesión con la lógica externa

            form.reset() // limpia el formulario

            setView('home') // cambia a la pantalla principal (home)
            setMessage('') // limpia el mensaje
        } catch(error) {
            setMessage(error.message) // muestra el error si falla el login
        }
    }

    const handleRegisterSubmit = event => { // función que se ejecuta al enviar el formulario de registro
        event.preventDefault() // evita recargar la página
    
        const form = event.target // obtiene el formulario

        const name = form.name.value // obtiene el nombre
        const email = form.email.value // obtiene el email
        const username = form.username.value // obtiene el username
        const password = form.password.value // obtiene el password
        const passwordRepeat = form.passwordRepeat.value // obtiene la repetición del password
        
        try {
            logic.registerUser(name, email, username, password, passwordRepeat) // intenta registrar el usuario

            form.reset() // limpia el formulario

            setView('login') // vuelve a la pantalla de login
            setMessage('') // limpia mensajes
        } catch(error) {
            setMessage(message) // muestra mensaje si ocurre un error
        }
    }

    const handleTogglePasswordClick = event => { // muestra u oculta la contraseña
        event.preventDefault() // evita comportamiento por defecto

        setPasswordType(passwordType === 'password'? 'text' : 'password') // alterna entre ocultar o mostrar contraseña        
    }

    const handleTogglePasswordRepeatClick = event => { // muestra u oculta la repetición de contraseña
        event.preventDefault() // evita comportamiento por defecto

        setPasswordRepeatType(passwordRepeatType === 'password'? 'text' : 'password') // alterna entre ocultar o mostrar contraseña
    }

    console.log('App -> render') // indica cuándo React renderiza la interfaz

    // landing (pantalla inicial de bienvenida)
    if (view === 'landing')
        return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1> {/* título de la aplicación */}
            <p>Welcome!</p> {/* mensaje de bienvenida */}

            <nav>
                <a className="cursor-pointer underline font-bold" onClick={handleLoginClick}>Login</a> or <a className="cursor-pointer underline font-bold" onClick={handleRegisterClick}>Register</a> {/* enlaces para navegar a login o registro */}
            </nav>
        </div>

    // login (pantalla de inicio de sesión)
    if (view === 'login')
        return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <h2 className="font-bold">Login</h2> {/* título de la sección de login */}

            <form className="flex flex-col" onSubmit={handleLoginSubmit}> {/* formulario de inicio de sesión */}
                <label htmlFor="username">Username</label>
                <input id="username" type="text" className="border px-1" /> {/* campo para introducir el username */}

                <label htmlFor="password">Password</label>
                <input id="password" type={passwordType} className={passwordType === 'password'? 'border px-1' : 'border px-1 bg-[gold]'} /> {/* campo de contraseña */}
                <button className="self-end" type="button" onClick={handleTogglePasswordClick}>{passwordType === 'password'? 'Show' : 'Hide'}</button> {/* botón para mostrar u ocultar contraseña */}

                <button className="bg-black text-white px-1 self-center" type="submit">Login</button> {/* botón para enviar el formulario de login */}
            </form>

            <a className="cursor-pointer underline font-bold" onClick={handleRegisterClick}>Register</a> {/* enlace para ir a la pantalla de registro */}

            <p>{message}</p> {/* muestra mensajes de error o información */}
        </div>

    // register (pantalla de registro de usuario)
    if (view === 'register')
        return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <h2 className="font-bold">Register</h2> {/* título de la sección de registro */}

            <form className="flex flex-col" onSubmit={handleRegisterSubmit}> {/* formulario para crear un nuevo usuario */}
                <label htmlFor="name">Name</label>
                <input id="name" type="text" className="border px-1" /> {/* campo nombre */}

                <label htmlFor="email">Email</label>
                <input id="email" type="email" className="border px-1" /> {/* campo email */}

                <label htmlFor="username">Username</label>
                <input id="username" type="text" className="border px-1" /> {/* campo username */}

                <label htmlFor="password">Password</label>
                <input id="password" type={passwordType} className={passwordType === 'password'? 'border px-1' : 'border px-1 bg-[gold]'} /> {/* campo contraseña */}
                <button className="self-end" type="button" onClick={handleTogglePasswordClick}>{passwordType === 'password'? 'Show' : 'Hide'}</button> {/* botón para mostrar u ocultar contraseña */}

                <label htmlFor="passwordRepeat">Repeat Password</label>
                <input id="passwordRepeat" type={passwordRepeatType} className={passwordRepeatType === 'password'? 'border px-1' : 'border px-1 bg-[gold]'} /> {/* campo repetir contraseña */}
                <button className="self-end" type="button" onClick={handleTogglePasswordRepeatClick}>{passwordRepeatType === 'password'? 'Show' : 'Hide'}</button> {/* botón para mostrar u ocultar contraseña repetida */}

                <button className="bg-black text-white px-1 self-center" type="submit">Register</button> {/* botón para enviar el formulario de registro */}
            </form>

            <a className="cursor-pointer underline font-bold" onClick={handleLoginClick}>Login</a> {/* enlace para volver al login */}

            <p>{message}</p> {/* muestra mensajes de error */}
        </div>

    // home (pantalla principal después de iniciar sesión)
    if (view === 'home')
        return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <h2 className="font-bold">Welcome Home!</h2> {/* mensaje de bienvenida al usuario */}

            <div className="flex justify-between">
                <button className="bg-black text-white px-1" type="button">+ Pet</button> {/* botón para añadir una nueva mascota */}
                <button className="bg-black text-white px-1" type="button">Logout</button> {/* botón para cerrar sesión */}
            </div>

            <ul className="flex flex-col gap-2 mt-2"> {/* lista de mascotas del usuario */}
                <li className="flex items-center border-2 border-black p-2 justify-between">
                    <div className="flex items-center gap-4">
                        <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHQ3b2NjNDE3aW1rZGUwYTJsaXI4dzV6aGI5cGk0NmE4aGJ2cmhoMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/lNLqexL939DTyR0uH2/giphy.gif" className="rounded-full w-10 h-10 object-cover" /> {/* imagen de la mascota */}

                        <p>Osito</p> {/* nombre de la mascota */}
                    </div>
                    <button className="bg-black text-white px-1 justify-self-end">🗑️</button> {/* botón para eliminar mascota */}
                </li>
            </ul>

            <div className="w-full h-full fixed top-0 left-0 bg-black/75 flex justify-center items-center" style={{ display: 'none' }}> {/* modal de confirmación para borrar mascota */}
                <div className="bg-white border-black border-2 p-2">
                    <p className="text-center">Delete Pet?</p> {/* mensaje de confirmación */}

                    <div className="flex justify-center gap-2">
                        <button className="bg-black text-white px-1">❌</button> <button className="bg-black text-white px-1">✅</button> {/* cancelar o confirmar borrado */}
                    </div>
                </div>
            </div>

            <p></p>
        </div>

    // add pet (pantalla para añadir una nueva mascota)
    if (view === 'add-pet')
        return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <div className="flex justify-between">
                <h2 className="font-bold">Add Pet</h2> {/* título de la pantalla para añadir mascota */}

                <a className="cursor-pointer underline font-bold">&lt; Back</a> {/* enlace para volver a la pantalla anterior */}
            </div>

            <form className="flex flex-col"> {/* formulario para crear una nueva mascota */}
                <label htmlFor="name">Name</label>
                <input id="name" type="text" className="border px-1" /> {/* nombre de la mascota */}

                <label htmlFor="date">Date of Birth</label>
                <input id="date" type="date" className="border px-1" /> {/* fecha de nacimiento */}

                <label htmlFor="weight">Weight (kg)</label>
                <input id="weight" type="number" step="0.01" className="border px-1" /> {/* peso de la mascota */}

                <label htmlFor="image">Image</label>
                <input id="image" type="url" className="border px-1" /> {/* URL de la imagen de la mascota */}

                <button className="bg-black text-white px-1 self-center mt-4" type="submit">Add Pet</button> {/* botón para añadir la mascota */}
            </form>

            <p></p>
        </div>
}