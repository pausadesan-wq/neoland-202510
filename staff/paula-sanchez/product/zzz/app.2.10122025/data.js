// models

function User(id, name, email, username, password, role) {
    this.id = id
    this.name = name
    this.email = email
    this.username = username
    this.password = password
    this.role = role
}

function Pet(id, userId, /*chip,*/ name, /*gender,*/ birthdate, weight, /*species, race, colors,*/ image) {
    this.id = id
    this.userId = userId
    // this.chip = chip
    this.name = name
    // this.gender = gender
    this.birthdate = birthdate
    this.weight = weight
    // this.species = species
    // this.race = race
    // this.colors = colors
    this.image = image
}

// manager

function Data() {
    this.users = []
    this.usersCount = 0
    this.pets = []
    this.petsCount = 0
    this.loggedInUserId = null
}

Data.prototype.insertUser = function (user) {
    this.users.push(user)
    this.usersCount++
}

Data.prototype.setLoggedInUserId = function (userId) {
    this.loggedInUserId = userId
}

Data.prototype.getLoggedInUserId = function () {
    return this.loggedInUserId
}

Data.prototype.findUserByEmail = function (email) {
    for (let i = 0; i < this.users.length; i++) {
        const user = this.users[i]

        if (user.email === email) return user
    }

    return null
}

Data.prototype.findUserByUsername = function (username) {
    for (let i = 0; i < this.users.length; i++) {
        const user = this.users[i]

        if (user.username === username) return user
    }

    return null
}

Data.prototype.findUserById = function (id) {
    for (let i = 0; i < this.users.length; i++) {
        const user = this.users[i]

        if (user.id === id) return user
    }
    return null
}

Data.prototype.insertPet = function (pet) {
    this.pets.push(pet)
    this.petsCount++
}

Data.prototype.findPetsByUserId = function(userId) {
    const foundPets = []

    for (let i = 0; i < this.pets.length; i++) {
        const pet = this.pets[i]

        if (pet.userId === userId) 
            foundPets.push(pet)
    }

    return foundPets
}
// instance

const data = new Data()
