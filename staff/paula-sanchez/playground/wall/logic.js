class Logic {
    constructor() { } // constructor vacío, no necesita inicializar nada

    addMessage(author, text) { // añade un mensaje validando datos
        if (typeof author !== 'string') throw new Error('invalid author type') // valida tipo de author
        if (author.length < 1) throw new Error('invalid author length') // valida longitud de author
        if (typeof text !== 'string') throw new Error('invalid text type') // valida tipo de text
        if (text.length < 1) throw new Error('invalid text length') // valida longitud de text

        const date = new Date().toISOString() // obtiene la fecha actual en formato ISO

        const message = { // crea objeto mensaje
            author: author, // nombre del autor
            text: text, // texto del mensaje
            date: date // fecha del mensaje
        }

        data.insertMessage(message) // inserta el mensaje en la clase Data
    }

    getAllMessages() { // devuelve todos los mensajes
        return data.getMessages() // obtiene mensajes desde Data
    }
}

// instance

const logic = new Logic() // instancia única de la clase Logic