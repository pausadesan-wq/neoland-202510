const root = ReactDOM.createRoot(document.getElementById('root')) // crea el punto donde React montará la app dentro del div#root
root.render(<App />) // renderiza el componente App dentro del root

const useState = React.useState // alias para usar useState sin escribir React.useState

function App() { // componente principal de React que devuelve JSX
    console.log('App -> call') // se ejecuta cada vez que React llama al componente

    const messagesState = useState([]) // crea estado con valor inicial array vacío -> devuelve [valorEstado, funcionActualizar]
    const messages = messagesState[0] // valor actual del estado (array de mensajes)
    const setMessages = messagesState[1] // función para actualizar el estado y re-renderizar el componente

    const handleTitleClick = event => { // función que se ejecuta cuando se hace click en el título
        event.preventDefault() // evita comportamiento por defecto del navegador

        console.log('title clicked') // muestra en consola que se hizo click
    }

    const handleMessageSubmit = event => { // función que se ejecuta al enviar el formulario
        event.preventDefault() // evita recargar la página

        const form = event.target // obtiene el formulario que lanzó el evento

        const message = form.message.value // obtiene el valor del input message
        const name = form.name.value // obtiene el valor del input name

        const date = new Date() // crea fecha actual
        const newMessage = message + ' (' + name + ', ' + date.toLocaleDateString() + ')' // construye el mensaje final con nombre y fecha

        // WARN! this is not the way in react
        // messages.push(newMessage) // modificar el estado directamente no es buena práctica en React

        const newMessages = [] // crea nuevo array para mantener inmutabilidad

        for (let i = 0; i < messages.length; i++) { // recorre los mensajes existentes
            const message = messages[i] // obtiene cada mensaje

            newMessages.push(message) // copia el mensaje al nuevo array
        }

        newMessages.push(newMessage) // añade el nuevo mensaje

        setMessages(newMessages) // actualiza el estado -> React vuelve a renderizar el componente

        form.reset() // limpia los inputs del formulario
    }

    console.log('App -> render') // se ejecuta cuando React renderiza el componente

    const listItems = [] // array donde se guardarán los elementos <li>

    for (let i = 0; i < messages.length; i++) { // recorre los mensajes del estado
        const message = messages[i] // obtiene cada mensaje

        const listItem = <li> // crea elemento JSX para la lista
            <p>{message}</p> // muestra el texto del mensaje
        </li>

        listItems.push(listItem) // añade el li al array
    }

    return <div className="flex flex-col gap-2 p-2"> {/* contenedor principal con estilos tailwind */}
        <h1 className="text-3xl cursor-pointer" onClick={handleTitleClick}>Wall</h1> {/* título que ejecuta handleTitleClick al hacer click */}

        <ul className="p-2">
            {listItems} {/* React renderiza aquí la lista de mensajes */}
        </ul>

        <form className="flex flex-col gap-2 border p-2" onSubmit={handleMessageSubmit}> {/* formulario que ejecuta handleMessageSubmit */}
            <h2>Leave your message on the wall!</h2>

            <label htmlFor="message">Message</label>
            <input className="border" type="text" id="message" placeholder="message" /> {/* input del mensaje */}

            <label htmlFor="name">Name</label>
            <input className="border" type="text" id="name" placeholder="name" /> {/* input del nombre */}

            <button className="border bg-black text-white cursor-pointer" type="submit">Send</button> {/* botón que envía el formulario */}
        </form>
    </div>
}