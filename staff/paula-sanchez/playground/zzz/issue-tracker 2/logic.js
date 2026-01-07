class Logic {
    constructor() {} // constructor vacío, no necesita inicializar nada

    createIssue(subject, body) { // crea un nuevo issue validando datos
        if (typeof subject !== 'string') throw new Error('invalid subject type') // valida tipo de subject
        if (subject.length < 1) throw new Error('invalid subject length') // valida longitud de subject
        if (typeof body !== 'string') throw new Error('invalid body type') // valida tipo de body
        
        const issue = { // crea objeto issue
            id: 'issue-' + data.issuesCount, // id único basado en el contador de issues
            subject: subject, // asunto del issue
            body: body, // descripción del issue
            status: 'open', // estado inicial
            date: new Date().toISOString() // fecha de creación en formato ISO
        }

        data.insertIssue(issue) // inserta el issue en la clase Data
    } 

    getAllIssues() { // devuelve todos los issues
        return data.getIssues() // obtiene los issues desde Data
    }
}

// instance

const logic = new Logic() // instancia única de la clase Logic