class Data {
    constructor() { // constructor que inicializa el almacenamiento de mensajes
        this.messages = [] // array para guardar los mensajes
    }

    insertMessage(message) { // añade un mensaje al array
        this.messages.push(message) // inserta el mensaje al final del array
    }

    getMessages() { // devuelve todos los mensajes guardados
        return this.messages // retorna el array de mensajes
    }
}

// instance

const data = new Data() // instancia única de la clase Data