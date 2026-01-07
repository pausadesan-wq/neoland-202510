const root = ReactDOM.createRoot(document.getElementById('root')) // crea el root donde React montará la app

root.render(<App />) // renderiza el componente App dentro del root

const useState = React.useState // alias para usar useState sin escribir React.useState

function App() {
    const [issues, setIssues] = useState([]) // estado para almacenar los issues

    const handleIssueSubmit = event => { // se ejecuta al enviar el formulario de creación
        event.preventDefault() // evita recargar la página

        const form = event.target // obtiene el formulario

        const subject = form.subject.value // obtiene el valor del input subject
        const body = form.body.value // obtiene el valor del input body

        try {
            logic.createIssue(subject, body) // crea un nuevo issue

            form.reset() // limpia el formulario

            const issues = logic.getAllIssues() // obtiene todos los issues

            const newIssues = [] // nuevo array para mantener inmutabilidad

            for (const issue of issues) // recorre los issues existentes
                newIssues.push(issue) // copia cada issue al nuevo array

            setIssues(newIssues) // actualiza el estado y re-renderiza la lista
        } catch (error) {
            console.error(error) // muestra errores en consola
        }
    }

    const handleCloseClick = event => { // se ejecuta al hacer click en el botón Close
        event.preventDefault() // evita comportamiento por defecto

        const button = event.target // obtiene el botón clicado
        const issueId = button.id // obtiene el ID del issue

        try {
            logic.closeIssue(issueId) // cambia el estado del issue a 'closed'

            const issues = logic.getAllIssues() // obtiene todos los issues actualizados

            const newIssues = [] // nuevo array para mantener inmutabilidad

            for (const issue of issues)
                newIssues.push(issue) // copia cada issue al nuevo array

            setIssues(newIssues) // actualiza el estado y re-renderiza la lista
        } catch(error) {
            console.error(error) // muestra errores en consola
        }
    }

    const listItems = [] // array para almacenar elementos <li> de la lista

    for (const issue of issues) // recorre los issues del estado
        listItems.push(<li className="border p-2 flex flex-col items-start">
            <h3 className="text-sm font-bold">{issue.subject} ({issue.status})</h3> {/* muestra asunto y estado */}
            <p className="text-xs">{issue.body}</p> {/* muestra cuerpo del issue */}
            <time className="text-xs" datetime="">{issue.date}</time> {/* muestra fecha */}
            {issue.status === 'open' && <button id={issue.id} className="border-black bg-black text-white px-2 self-end" onClick={handleCloseClick}>Close</button>} {/* botón para cerrar solo si está abierto */}
        </li>)

    return <div className="p-2">
        <h1 className="font-bold text-lg">Issue Tracker 📋</h1> {/* título principal */}

        <div>
            <h2>Create Issue 📝</h2> {/* subtítulo sección crear issue */}

            <form className="flex flex-col gap-2" onSubmit={handleIssueSubmit}> {/* formulario de creación */}
                <div className="flex flex-col">
                    <label className="text-sm" htmlFor="subject">Subject</label>
                    <input className="border" id="subject" /> {/* input del asunto */}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm" htmlFor="body">Body</label>
                    <input className="border" id="body" /> {/* input del cuerpo */}
                </div>

                <button className="border border-black bg-black text-white text-sm" type="submit">Create</button> {/* botón enviar */}
            </form>
        </div>

        <div>
            <h2>Issue List</h2> {/* subtítulo sección lista */}
            <ul className="flex flex-col gap-2">{listItems}</ul> {/* renderiza la lista de issues */}
        </div>
    </div>
}