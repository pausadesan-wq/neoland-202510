// ==== MODELS ====

// Clase que representa un usuario del sistema
class User {
    constructor(id, name, email, username, password, role) {
        this.id = id               // Identificador único del usuario
        this.name = name           // Nombre real
        this.email = email         // Email (usado para login)
        this.username = username    // Username visible en la app
        this.password = password    // Password (sin cifrar en este ejemplo)
        this.role = role           // Rol del usuario (admin, user, etc.)
    }
}

// Clase que representa una mascota
class Pet {
    constructor(id, userId, /*chip,*/ name, /*gender,*/ birthdate, weight, /*species, race, colors,*/ image) {
        this.id = id               // Id único de la mascota
        this.userId = userId       // Id del usuario propietario
        // this.chip = chip        // (campo futuro)
        this.name = name           // Nombre de la mascota
        // this.gender = gender    // (campo futuro)
        this.birthdate = birthdate // Fecha de nacimiento
        this.weight = weight       // Peso de la mascota
        // this.species = species  // (campo futuro)
        // this.race = race        // (campo futuro)
        // this.colors = colors    // (campo futuro)
        this.image = image         // Imagen o URL de la mascota
    }
}


// ==== DATA MANAGER ====

// Clase que simula una base de datos en memoria
class Data {
    constructor() {
        this.users = []             // Lista de usuarios
        this.usersCount = 0         // Contador de usuarios creados
        this.pets = []              // Lista de mascotas
        this.petsCount = 0          // Contador de mascotas creadas
        this.loggedInUserId = null  // Id del usuario logueado actualmente
    }

    // Añadir usuario a la base de datos
    insertUser(user) {
        this.users.push(user)       // Guarda usuario en array
        this.usersCount++           // Incrementa contador de usuarios
    }

    // Buscar usuario por email
    findUserByEmail(email) {
        for (let i = 0; i < this.users.length; i++) {
            const user = this.users[i]

            if (user.email === email) return user
        }

        return null // Si no existe
    }

    // Buscar usuario por username
    findUserByUsername(username) {
        for (let i = 0; i < this.users.length; i++) {
            const user = this.users[i]

            if (user.username === username) return user
        }

        return null // Si no existe
    }

    // Buscar usuario por id
    findUserById(id) {
        for (let i = 0; i < this.users.length; i++) {
            const user = this.users[i]

            if (user.id === id) return user
        }

        return null // Si no existe
    }

    // Guardar usuario logueado
    setLoggedInUserId(userId) {
        this.loggedInUserId = userId
    }

    // Obtener usuario logueado
    getLoggedInUserId() {
        return this.loggedInUserId
    }

    // Insertar mascota en la base de datos
    insertPet(pet) {
        this.pets.push(pet)       // Añade mascota al array
        this.petsCount++          // Incrementa contador de mascotas
    }

    // Obtener mascotas de un usuario concreto
    findPetsByUserId(userId) {
        const foundPets = []      // Array de resultados

        for (let i = 0; i < this.pets.length; i++) {
            const pet = this.pets[i]

            if (pet.userId === userId)
                foundPets.push(pet)
        }

        return foundPets
    }

    // Buscar mascota por id
    findPetById(petId) {
        for (let i = 0; i < this.pets.length; i++) {
            const pet = this.pets[i]

            if (pet.id === petId)
                return pet
        }

        return null // Si no existe
    }
}


// ==== INSTANCE ====

// Instancia única del gestor de datos (simula base de datos global)
const data = new Data()