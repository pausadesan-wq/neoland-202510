const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const URL_REGEX = /(www|http:|https:)+[^\s]+[\w]/
const ISODATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const PET_ID_REGEX = /^\pet-[0-9]+$/

class Logic {
    constructor() {
    }

    registerUser(name, email, username, password, passwordRepeat) {
        if (typeof name !== 'string') throw new Error('invalid name type')
        if (name.length < 1) throw new Error('invalid name length')

        if (typeof email !== 'string') throw new Error('invalid email type')
        if (email.length < 6) throw new Error('invalid email length')
        if (!EMAIL_REGEX.test(email)) throw new Error('invalid email format')

        if (typeof username !== 'string') throw new Error('invalid username type')
        if (username.length < 3) throw new Error('invalid username length')

        if (typeof password !== 'string') throw new Error('invalid password type')
        if (password.length < 8) throw new Error('invalid password length')

        if (typeof passwordRepeat !== 'string') throw new Error('invalid passwordRepeat type')
        if (passwordRepeat.length < 8) throw new Error('invalid passwordRepeat length')

        if (password !== passwordRepeat) throw new Error('passwords do not match')

        let user = data.findUserByEmail(email)

        if (user !== null) throw new Error('user email already exists')

        user = data.findUserByUsername(username)

        if (user !== null) throw new Error('user username already exists')

        user = new User('user-' + data.usersCount, name, email, username, password, 'regular')

        data.insertUser(user)
    }

    loginUser(username, password) {
        if (typeof username !== 'string') throw new Error('invalid username type')
        if (username.length < 3) throw new Error('invalid username length')

        if (typeof password !== 'string') throw new Error('invalid password type')
        if (password.length < 8) throw new Error('invalid password length')

        const user = data.findUserByUsername(username)

        if (user === null) throw new Error('user not found')

        if (user.password !== password) throw new Error('incorrect password')

        data.setLoggedInUserId(user.id)
    }

    logoutUser() {
        data.setLoggedInUserId(null)
    }

    changeUserEmail(email, newEmail, newEmailRepeat) {
        if (typeof email !== 'string') throw new Error('invalid email type')
        if (email.length < 6) throw new Error('invalid email length')
        if (!EMAIL_REGEX.test(email)) throw new Error('invalid email format')

        if (typeof newEmail !== 'string') throw new Error('invalid newEmail type')
        if (newEmail.length < 6) throw new Error('invalid newEmail length')
        if (!EMAIL_REGEX.test(newEmail)) throw new Error('invalid newEmail format')

        if (typeof newEmailRepeat !== 'string') throw new Error('invalid newEmailRepeat type')
        if (newEmailRepeat.length < 6) throw new Error('invalid newEmailRepeat length')
        if (!EMAIL_REGEX.test(newEmailRepeat)) throw new Error('invalid newEmailRepeat format')

        if (newEmail !== newEmailRepeat) throw new Error('newEmail and newEmailRepeat do not match')

        const user = data.findUserById(data.getLoggedInUserId())

        if (user.email !== email) throw new Error('email do not belong to user')

        user.email = newEmail
    }

    changeUserPassword(password, newPassword, newPasswordRepeat) {
        if (typeof password !== 'string') throw new Error('invalid password type')
        if (password.length < 8) throw new Error('invalid password length')

        if (typeof newPassword !== 'string') throw new Error('invalid newPassword type')
        if (newPassword.length < 8) throw new Error('invalid newPassword length')

        if (typeof newPasswordRepeat !== 'string') throw new Error('invalid newPasswordRepeat type')
        if (newPasswordRepeat.length < 8) throw new Error('invalid newPasswordRepeat length')

        if (newPassword !== newPasswordRepeat) throw new Error('newPassword and newPasswordRepeat do not match')

        const user = data.findUserById(data.getLoggedInUserId())

        if (user.password !== password) throw new Error('incorrect password')

        user.password = newPassword
    }

    addPet(name, birthdate, weight, image) {
        if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

        const user = data.findUserById(data.getLoggedInUserId())
        if (user === null) throw new Error('user not found')

        if (typeof name !== 'string') throw new Error('invalid name type')
        if (name.length < 1) throw new Error('invalid name length')

        if (typeof birthdate !== 'string') throw new Error('invalid birthdate type')

        if (!ISODATE_REGEX.test(birthdate)) throw new Error('invalid birthdate format')

        if (typeof weight !== 'number' || isNaN(weight)) throw new Error('invalid weight type')

        if (typeof image !== 'string') throw new Error('invalid image type')

        if (!URL_REGEX.test(image)) throw new Error('invalid image format')

        const pet = new Pet('pet-' + data.petsCount, data.getLoggedInUserId(), name, birthdate, weight, image)

        data.insertPet(pet)
    }

    getPets() {
        if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

        const user = data.findUserById(data.getLoggedInUserId())
        if (user === null) throw new Error('user not found')

        const pets = data.findPetsByUserId(data.getLoggedInUserId())

        return pets
    }

    deletePet(petId) {
        if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

        const user = data.findUserById(data.getLoggedInUserId())
        if (user === null) throw new Error('user not found')

        if (typeof petId !== 'string') throw new Error('invalid pet-id type')

        if (!PET_ID_REGEX.test(petId)) throw new Error('invalid pet-id format')

        const pet = data.findPetById(petId)

        if (pet === null) throw new Error('pet not found')

        if (pet.userId !== data.getLoggedInUserId()) throw new Error('user not owner of pet')

        const petIndex = data.pets.indexOf(pet)

        data.pets.splice(petIndex, 1)
    }
}

// instance

const logic = new Logic()