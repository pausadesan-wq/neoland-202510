// =========================
// LOGIC LAYER (CLASE PRINCIPAL)
// =========================

// Clase que contiene toda la lógica de negocio de la aplicación
class Logic {
    constructor() {
        // Constructor vacío: no inicializa estado interno
    }

    // -------------------------
    // REGISTRO DE USUARIO
    // -------------------------
    registerUser(name, email, username, password, passwordRepeat) {

        // Validación de tipo y contenido del nombre
        if (typeof name !== 'string') throw new Error('invalid name type')
        if (name.length < 1) throw new Error('invalid name length')

        // Validación de email
        if (typeof email !== 'string') throw new Error('invalid email type')
        if (email.length < 6) throw new Error('invalid email length')

        // Validación de username
        if (typeof username !== 'string') throw new Error('invalid username type')
        if (username.length < 3) throw new Error('invalid username length')

        // Validación de password
        if (typeof password !== 'string') throw new Error('invalid password type')
        if (password.length < 8) throw new Error('invalid password length')

        // Validación de repetición de password
        if (typeof passwordRepeat !== 'string') throw new Error('invalid passwordRepeat type')
        if (passwordRepeat.length < 8) throw new Error('invalid passwordRepeat length')

        // Comprobación de coincidencia de contraseñas
        if (password !== passwordRepeat) throw new Error('passwords do not match')

        // Comprobar si el email ya existe
        let user = data.findUserByEmail(email)
        if (user !== null) throw new Error('user email already exists')

        // Comprobar si el username ya existe
        user = data.findUserByUsername(username)
        if (user !== null) throw new Error('user username already exists')

        // Crear nuevo usuario
        user = new User(
            'user-' + data.usersCount,
            name,
            email,
            username,
            password,
            'regular'
        )

        // Guardar usuario en la base de datos
        data.insertUser(user)
    }


    // -------------------------
    // LOGIN DE USUARIO
    // -------------------------
    loginUser(username, password) {

        // Validación username
        if (typeof username !== 'string') throw new Error('invalid username type')
        if (username.length < 3) throw new Error('invalid username length')

        // Validación password
        if (typeof password !== 'string') throw new Error('invalid password type')
        if (password.length < 8) throw new Error('invalid password length')

        // Buscar usuario en base de datos
        const user = data.findUserByUsername(username)

        // Usuario no existe
        if (user === null) throw new Error('user not found')

        // Password incorrecta
        if (user.password !== password) throw new Error('incorrect password')

        // Guardar sesión del usuario
        data.setLoggedInUserId(user.id)
    }


    // -------------------------
    // LOGOUT
    // -------------------------
    logoutUser() {

        // Se elimina el usuario logueado
        data.setLoggedInUserId(null)
    }


    // -------------------------
    // AÑADIR MASCOTA
    // -------------------------
    addPet(name, birthdate, weight, image) {

        // Seguridad: comprobar usuario logueado
        if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

        // Obtener usuario actual
        const user = data.findUserById(data.getLoggedInUserId())
        if (user === null) throw new Error('user not found')

        // Validación nombre
        if (typeof name !== 'string') throw new Error('invalid name type')
        if (name.length < 1) throw new Error('invalid name length')

        // Validación fecha
        if (typeof birthdate !== 'string') throw new Error('invalid birthdate type')

        // Formato ISO YYYY-MM-DD
        const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/
        if (!isoDateRegex.test(birthdate)) throw new Error('invalid birthdate format')

        // Validación peso
        if (typeof weight !== 'number' || isNaN(weight)) throw new Error('invalid weight type')

        // Validación imagen
        if (typeof image !== 'string') throw new Error('invalid image type')

        // Validación URL básica
        const urlRegex = /(www|http:|https:)+[^\s]+[\w]/
        if (!urlRegex.test(image)) throw new Error('invalid image format')

        // Crear objeto Pet
        const pet = new Pet(
            'pet-' + data.petsCount,
            data.getLoggedInUserId(),
            name,
            birthdate,
            weight,
            image
        )

        // Guardar mascota
        data.insertPet(pet)
    }


    // -------------------------
    // OBTENER MASCOTAS
    // -------------------------
    getPets() {

        // Usuario debe estar logueado
        if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

        // Validar existencia del usuario
        const user = data.findUserById(data.getLoggedInUserId())
        if (user === null) throw new Error('user not found')

        // Obtener mascotas del usuario
        const pets = data.findPetsByUserId(data.getLoggedInUserId())

        return pets
    }


    // -------------------------
    // ELIMINAR MASCOTA
    // -------------------------
    deletePet(petId) {

        // Usuario debe estar logueado
        if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

        // Validar usuario
        const user = data.findUserById(data.getLoggedInUserId())
        if (user === null) throw new Error('user not found')

        // Validación tipo id
        if (typeof petId !== 'string') throw new Error('invalid pet-id type')

        // Validación formato id
        const petIdRegex = /^\pet-[0-9]+$/
        if (!petIdRegex.test(petId)) throw new Error('invalid pet-id format')

        // Buscar mascota
        const pet = data.findPetById(petId)

        if (pet === null) throw new Error('pet not found')

        // Comprobar propiedad del usuario
        if (pet.userId !== data.getLoggedInUserId())
            throw new Error('user not owner of pet')

        // Eliminar del array
        const petIndex = data.pets.indexOf(pet)
        data.pets.splice(petIndex, 1)
    }
}


// =========================
// INSTANCE (INSTANCIA GLOBAL)
// =========================

// Instancia única de la lógica para toda la app
const logic = new Logic()