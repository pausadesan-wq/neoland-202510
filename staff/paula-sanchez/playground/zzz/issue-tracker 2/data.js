class Data {
    constructor() {
        this.issues = [] // array que guarda todos los issues: cada uno tiene {date, subject, body, status}
        this.issuesCount = 0 // contador de issues creados
    }

    insertIssue(issue) {
        this.issues.push(issue) // añade el issue al array
        this.issuesCount++ // incrementa el contador
    }

    getIssues() {
        return this.issues // devuelve todos los issues
    }
}

// instance

const data = new Data() // crea la instancia de Data para usar en el proyecto