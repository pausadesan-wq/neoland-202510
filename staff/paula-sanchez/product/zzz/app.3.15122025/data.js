// ==== MODELS ====

// Constructor de usuarios

// cambiar a clase 15/12

function User(id, name, email, username, password, role) {
    this.id = id               // Identificador único
    this.name = name           // Nombre real
    this.email = email         // Email (login)
    this.username = username  // Username visible
    this.password = password  // Password (OJO, luego debería cifrarse)
    this.role = role           // Rol del usuario (admin, user, etc.)
}

// Constructor de mascotas

function Pet(id, userId, /* chip, */ name, /* gender, */ birthdate, weight, /* species, race, colors, */ image) {
    this.id = id                // Id único de la mascota
    this.userId = userId        // Id del dueño
    this.name = name            // Nombre de la mascota
    this.birthdate = birthdate  // Fecha de nacimiento
    this.weight = weight        // Peso
    this.image = image          // Imagen o URL
}

// ==== DATA MANAGER ====

// Gestor de datos (simulación de una base de datos)

function Data() {
    this.users = []             // Lista de usuarios
    this.usersCount = 0         // Contador de usuarios
    this.pets = []              // Lista de mascotas
    this.petsCount = 0          // Contador de mascotas
    this.loggedInUserId = null  // Usuario que está actualmente logueado
}

// Añade un usuario 

Data.prototype.insertUser = function (user) {
    this.users.push(user)       // Guarda en array
    this.usersCount++           // Incrementa contador
}


// Guarda el id del usuario que está logueado

Data.prototype.setLoggedInUserId = function (userId) {
    this.loggedInUserId = userId
}

// Obtiene el id del usuario logueado

Data.prototype.getLoggedInUserId = function () {
    return this.loggedInUserId
}

// Buscar un usuario por el email

Data.prototype.findUserByEmail = function (email) {
    for (let i = 0; i < this.users.length; i++) {
        const user = this.users[i]

        if (user.email === email) return user
    }

    return null
}

// Buscar un usuario por su username en la app

Data.prototype.findUserByUsername = function (username) {
    for (let i = 0; i < this.users.length; i++) {
        const user = this.users[i]

        if (user.username === username) return user
    }

    return null
}

// Buscar un usuario por id

Data.prototype.findUserById = function (id) {
    for (let i = 0; i < this.users.length; i++) {
        const user = this.users[i]

        if (user.id === id) return user
    }
    return null
}

// Añadir una mascota

Data.prototype.insertPet = function (pet) {
    this.pets.push(pet)
    this.petsCount++
}

// Obtiene todas las mascotas de un usuario

Data.prototype.findPetsByUserId = function (userId) {
    const foundPets = []           // Array para resultados
    for (let i = 0; i < this.pets.length; i++) {
        const pet = this.pets[i]
        if (pet.userId === userId)
            foundPets.push(pet)
    }

    return foundPets
}

// Busca una mascota por id
Data.prototype.findPetById = function (petId) {
    for (let i = 0; i < this.pets.length; i++) {
        const pet = this.pets[i]

        if (pet.id === petId)
            return pet
    }

    return null
}

// ==== INSTANCE ====

// Instancia única del gestor de datos

const data = new Data()
