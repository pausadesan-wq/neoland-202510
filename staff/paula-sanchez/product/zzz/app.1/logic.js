function Logic() {
    // Constructor vacío: aquí podrías inicializar dependencias o estado; por ejemplo: this.data = dataService
}

// registerUser: función que valida y registra un nuevo usuario

Logic.prototype.registerUser = function (name, email, username, password, passwordRepeat) {
    // reglas del protitpo registeruser, ponemos la longitud de cada parámetro

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

    // comparación de contraseñas. Si la contraseña no coincide, devolver un error

    if (password !== passwordRepeat) throw new Error('passwords do not match')

    // búsqueda del usuario vía email, donde lo buscaremos en la capa de datos (objeto global "data")

    let user = data.findUserByEmail(email)

    if (user !== null) throw new Error('user email already exists')

    // búsqueda del usuario por su username en nuestra capa de datos

    user = data.findUserByUsername(username)

    if (user !== null) throw new Error('user username already exists')

    // creación de un nuevo objeto User. 'user-' + data.usersCount y contador

    user = new User('user-' + data.usersCount, name, email, username, password, 'regular')

    // insertar nuevo usuario en la base de datos

    data.insertUser(user)
}

//función que valida y autentica un usuario

Logic.prototype.loginUser = function (username, password) {
    //reglas y validaciones

    if (typeof username !== 'string') throw new Error('invalid username type')
    if (username.length < 3) throw new Error('invalid username length')

    if (typeof password !== 'string') throw new Error('invalid password type')
    if (password.length < 8) throw new Error('invalid password length')

    //buscar un usuario por username

    const user = data.findUserByUsername(username)

    if (user === null) throw new Error('user not found')
    //comparar password

    if (user.password !== password) throw new Error('incorrect password')

    data.setLoggedInUserId(user.id)
}

Logic.prototype.logoutUser = function () {
    data.setLoggedInUserId(null)
}

Logic.prototype.addPet = function (name, birthdate, weight, image) {
    // TODO add pet related to logged-in user id

    if (typeof name !== 'string') throw new Error('invalid name type')
    if (name.length < 1) throw new Error('invalid name length')

    if (typeof birthdate !== 'string') throw new Error('invalid birthdate type')
    // if (birthdate.length !== 10) throw new Error('invalid birthdate length')
    // if (birthdate[4] !== '-' || birthdate[7] !== '-') throw new Error('invalid birthdate format')

    // const year = parseInt(birthdate.slice(0, 4))
    // if (typeof year !== 'number' || isNaN(year)) throw new Error('invalid birthdate format')
    // const month = parseInt(birthdate.slice(5, 7))
    // if (typeof month !== 'number' || isNaN(month)) throw new Error('invalid birthdate format')
    // const day = parseInt(birthdate.slice(8, 10))
    // if (typeof day !== 'number' || isNaN(day)) throw new Error('invalid birthdate format')

    // const isoDateRegex = new RegExp('^\\d{4}-\\d{2}-\\d{2}$')
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/ // new RegExp
    if (!isoDateRegex.test(birthdate)) throw new Error('invalid birthdate format')

    if (typeof weight !== 'number' || isNaN(weight)) throw new Error('invalid weight type')

    if (typeof image !== 'string') throw new Error('invalid image type')
    
    const urlRegex = /(www|http:|https:)+[^\s]+[\w]/
    if (!urlRegex.test(image)) throw new Error('invalid image format')

    const pet = new Pet('pet-' + data.petsCount, data.getLoggedInUserId(), name, birthdate, weight, image)

    data.insertPet(pet)
}

// instance

const logic = new Logic()