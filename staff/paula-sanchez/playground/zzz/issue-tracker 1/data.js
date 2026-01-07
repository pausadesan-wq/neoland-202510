class Data {
    constructor() { // constructor que inicializa el almacenamiento de issues
        this.issues = [] // array para guardar los issues [{date, subject, body, status}]
        this.issuesCount = 0 // contador de issues totales
    }

    insertIssue(issue) { // añade un nuevo issue
        this.issues.push(issue) // inserta el issue en el array
        data.issuesCount++ // incrementa el contador de issues
    }

    getIssues() { // devuelve todos los issues guardados
        return data.issues // retorna el array de issues
    }
}

// instance

const data = new Data() // instancia única de la clase Data