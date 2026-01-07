class Logic {
    constructor() { } // constructor vacío

    createIssue(subject, body) {
        if (typeof subject !== 'string') throw new Error('invalid subject type') // valida tipo de subject
        if (subject.length < 1) throw new Error('invalid subject length') // valida longitud mínima
        if (typeof body !== 'string') throw new Error('invalid body type') // valida tipo de body
        
        const issue = {
            id: 'issue-' + data.issuesCount, // genera ID única usando el contador
            subject: subject, // asunto del issue
            body: body, // descripción del issue
            status: 'open', // estado inicial
            date: new Date().toISOString() // fecha de creación en formato ISO
        }

        data.insertIssue(issue) // inserta el issue en data
    } 

    getAllIssues() {
        return data.getIssues() // devuelve todos los issues
    }

    closeIssue(issueId) {
        const issue = data.findIssueById(issueId) // busca issue por ID

        if (!issue) throw new Error('issue not found') // lanza error si no existe

        issue.status = 'closed' // cambia el estado a cerrado
    }
}

// instance

const logic = new Logic() // crea instancia de Logic