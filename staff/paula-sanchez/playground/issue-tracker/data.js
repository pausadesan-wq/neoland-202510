class Data {
    constructor() {
        this.issues = [] // array de issues: { id, date, subject, body, status ('open' | 'closed') }
        this.issuesCount = 0 // contador para generar IDs únicas
    }

    insertIssue(issue) {
        this.issues.push(issue) // añade un nuevo issue al array
        this.issuesCount++ // incrementa el contador de issues
    }

    getIssues() {
        return this.issues // devuelve todos los issues
    }

    findIssueById(issueId) {
        for (const issue of this.issues) // recorre los issues
            if (issue.id === issueId) // compara el ID
                return issue // devuelve el issue si coincide

        return null // devuelve null si no encuentra ningún issue con ese ID
    }
}

// instance

const data = new Data() // crea la instancia de Data