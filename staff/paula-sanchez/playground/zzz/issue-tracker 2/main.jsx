const root = ReactDOM.createRoot(document.getElementById('root')) // punto donde React montará la app
root.render(<App />) // renderiza el componente App dentro del root

const useState = React.useState // alias para usar useState sin escribir React.useState

function App() { // componente principal de React
    const issuesState = useState([]) // estado para guardar los issues
    const issues = issuesState[0] // valor actual del estado (array de issues)
    const setIssues = issuesState[1] // función para actualizar el estado

    const handleIssueSubmit = event => { // se ejecuta al enviar el formulario
        event.preventDefault() // evita recargar la página

        const form = event.target // obtiene el formulario que envió el evento

        const subject = form.subject.value // obtiene el valor del input subject
        const body = form.body.value // obtiene el valor del input body

        try {
            logic.createIssue(subject, body) // crea un nuevo issue usando Logic

            form.reset() // limpia los inputs del formulario

            const issues = logic.getAllIssues() // obtiene todos los issues actuales

            const newIssues = [] // nuevo array para mantener inmutabilidad

            // copia cada issue al nuevo array
            for (const issue of issues)
                newIssues.push(issue)

            setIssues(newIssues) // actualiza el estado -> React vuelve a renderizar
        } catch(error) {
            // se podría mostrar error en consola o UI
        }
    } 

    const listItems = [] // array para guardar elementos JSX <li> de la lista

    for (const issue of issues) // recorre los issues del estado
        listItems.push(<li className="border"> 
            <h3 className="text-sm font-bold">{issue.subject} ({issue.status})</h3> {/* muestra asunto y estado */}
            <p>{issue.body}</p> {/* muestra el cuerpo del issue */}
            <time className="text-xs" datetime="">{issue.date}</time> {/* muestra la fecha */}
        </li>)

    return <div className="p-2"> {/* contenedor principal */}
        <h1 className="font-bold text-lg">Issue Tracker 📋</h1>

        <div>
            <h2>Create Issue 📝</h2>

            <form className="flex flex-col gap-2" onSubmit={handleIssueSubmit}> {/* formulario que ejecuta handleIssueSubmit */}
                <div className="flex flex-col">
                    <label className="text-sm" htmlFor="subject">Subject</label>
                    <input className="border" id="subject" /> {/* input para asunto */}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm" htmlFor="body">Body</label>
                    <input className="border" id="body" /> {/* input para cuerpo */}
                </div>

                <button className="border border-black bg-black text-white text-sm" type="submit">Create</button> {/* botón que envía el formulario */}
            </form>
        </div>

        <div>
            <h2>Issue List</h2>

            <ul className="flex flex-col gap-2">{listItems}</ul> {/* lista de issues */}
        </div>
    </div>
}