const root = ReactDOM.createRoot(document.getElementById('root')) // crea el punto donde React montará la app dentro del div#root
root.render(<App />) // renderiza el componente App dentro del root

const useState = React.useState // alias para usar useState sin escribir React.useState

function App() { // componente principal de React que devuelve JSX
    console.log('App -> call') // se ejecuta cada vez que React llama al componente

    const messagesState = useState([]) // crea estado con valor inicial array vacío -> devuelve [valorEstado, funcionActualizar]
    const messages = messagesState[0] // valor actual del estado (array de mensajes)
    const setMessages = messagesState[1] // función para actualizar el estado y re-renderizar el componente

    const handleMessageSubmit = event => { // función que se ejecuta al enviar el formulario
        event.preventDefault() // evita recargar la página

        const form = event.target // obtiene el formulario que lanzó el evento

        const name = form.name.value // obtiene el valor del input name
        const message = form.message.value // obtiene el valor del input message

        try {
            logic.addMessage(name, message) // llama a la lógica para añadir el mensaje

            form.reset() // limpia los inputs del formulario

            const messages = logic.getAllMessages() // obtiene todos los mensajes desde la lógica

            const newMessages = [] // crea nuevo array para mantener inmutabilidad

            for (let i = 0; i < messages.length; i++) { // recorre todos los mensajes
                const message = messages[i] // obtiene cada mensaje

                newMessages.push(message) // añade el mensaje al nuevo array
            } 

            setMessages(newMessages) // actualiza el estado con el array completo de mensajes
        } catch(error) {
            console.error(error) // muestra errores en consola si ocurre alguno
        }
    }

    console.log('App -> render') // se ejecuta cuando React renderiza el componente

    const listItems = [] // array donde se guardarán los elementos <li> para mostrar los mensajes

    for (let i = 0; i < messages.length; i++) { // recorre los mensajes del estado
        const message = messages[i] // obtiene cada mensaje

        const messageString = message.text + '(' + message.author + ', ' + message.date + ')' // crea string con texto, autor y fecha

        const listItem = <li> {/* JSX para cada mensaje */}
            <p>{messageString}</p> {/* muestra el mensaje en un párrafo */}
        </li>

        listItems.push(listItem) // añade el <li> al array de elementos
    }

    return <div className="flex flex-col gap-2 p-2"> {/* contenedor principal con estilos Tailwind */}
        <h1 className="text-3xl cursor-pointer">Wall</h1> {/* título principal */}

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