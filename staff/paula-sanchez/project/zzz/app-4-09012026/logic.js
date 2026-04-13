// ==== LOGIC ====
// 
function Logic() {
}
// Constructor de la capa de lógica. No necesita parámetros

// Registro de usuario

Logic.prototype.registerUser = function (name, email, username, password, passwordRepeat) {

    // Validaciones de tipo y longitud

    if (typeof name !== 'string') throw new Error('invalid name type')
    if (name.length < 1) throw new Error('invalid name length')

    if (typeof email !== 'string') throw new Error('invalid email type')
    if (email.length < 6) throw new Error('invalid email length')

    if (typeof username !== 'string') throw new Error('invalid username type')
    if (username.length < 3) throw new Error('invalid username length')

    if (typeof password !== 'string') throw new Error('invalid password type')
    if (password.length < 8) throw new Error('invalid password length')

    if (typeof passwordRepeat !== 'string') throw new Error('invalid passwordRepeat type')
    if (passwordRepeat.length < 8) throw new Error('invalid passwordRepeat length')

    if (password !== passwordRepeat) throw new Error('passwords do not match')

        // Comprobar duplicados

    let user = data.findUserByEmail(email)

    if (user !== null) throw new Error('user email already exists')

    user = data.findUserByUsername(username)

    if (user !== null) throw new Error('user username already exists')

        // Crear usuario y añadir a data

    user = new User('user-' + data.usersCount, name, email, username, password, 'regular')

    data.insertUser(user)
}

// Login de usuario

Logic.prototype.loginUser = function (username, password) {
    if (typeof username !== 'string') throw new Error('invalid username type')
    if (username.length < 3) throw new Error('invalid username length')

    if (typeof password !== 'string') throw new Error('invalid password type')
    if (password.length < 8) throw new Error('invalid password length')

    const user = data.findUserByUsername(username)

    if (user === null) throw new Error('user not found')

    if (user.password !== password) throw new Error('incorrect password')

    data.setLoggedInUserId(user.id)
}

// Logout

Logic.prototype.logoutUser = function () {
    data.setLoggedInUserId(null)
}

// Añadir mascota

Logic.prototype.addPet = function (name, birthdate, weight, image) {

    // para que no se guarden datos corruptos

    if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

    const user = data.findUserById(data.getLoggedInUserId())

    if (user === null) throw new Error('user not found')

    // Validaciones

    if (typeof name !== 'string') throw new Error('invalid name type')
    if (name.length < 1) throw new Error('invalid name length')

    if (typeof birthdate !== 'string') throw new Error('invalid birthdate type')

    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!isoDateRegex.test(birthdate)) throw new Error('invalid birthdate format')

    if (typeof weight !== 'number' || isNaN(weight)) throw new Error('invalid weight type')

    if (typeof image !== 'string') throw new Error('invalid image type')

    const urlRegex = /(www|http:|https:)+[^\s]+[\w]/
    if (!urlRegex.test(image)) throw new Error('invalid image format')

    const pet = new Pet('pet-' + data.petsCount, data.getLoggedInUserId(), name, birthdate, weight, image)

    data.insertPet(pet)
}

// Obtener mascotas del usuario logueado

Logic.prototype.getPets = function () {
    if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

    const user = data.findUserById(data.getLoggedInUserId())
    if (user === null) throw new Error('user not found')

    // buscar los pets que pertenecen a un usuario

    const pets = data.findPetsByUserId(data.getLoggedInUserId())

    return pets
}

// Eliminar mascota

Logic.prototype.deletePet = function(petId) {
    if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

    const user = data.findUserById(data.getLoggedInUserId())
    if (user === null) throw new Error('user not found')

    if (typeof petId !== 'string') throw new Error('invalid pet-id type')

    const petIdRegex = /^pet-[0-9]+$/

    if (!petIdRegex.test(petId)) throw new Error('invalid pet-id format')

    const pet = data.findPetById(petId)

    if (pet === null) throw new Error('pet not found')

    if (pet.userId !== data.getLoggedInUserId()) throw new Error('user not owner of pet')

    const petIndex = data.pets.indexOf(pet)

    data.pets.splice(petIndex, 1)
}


// ==== INSTANCE ====

const logic = new Logic()