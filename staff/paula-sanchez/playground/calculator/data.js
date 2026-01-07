class Data {
    constructor() {
        this.value = '0' // Valor inicial del display, empieza en '0'
    }

    getValue() { 
        return this.value // Devuelve el valor actual del display
    }    

    setValue(value) { 
        this.value = value // Actualiza el valor del display
    }
}

// ---------------- INSTANCIA ----------------
const data = new Data() // Instancia única de la clase Data que almacena el valor de la calculadora