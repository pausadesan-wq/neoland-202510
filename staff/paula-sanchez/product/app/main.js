//body

document.body.className = 'p-4 h-screen'

/*
document.body.className = 'p-4 border-4 border-red-500 h-screen'


p-4 -> padding por todos lados, 1rem (16px)
border -> aplica borde de 1px solido con un color de defecto
border-4 -> sobrescribe el grosor del borde a 4px
border-red-500 -> color del borde, rojo de tailwind
h-screen -> altura igual a la altura de la ventana

el primer border se podría eliminar, es redundante parece
*/

// landing

const landingView = document.createElement('div')
// landingView.style.display = 'none'

const landingTitle = document.createElement('h1')
landingTitle.textContent = 'MyPet'
landingTitle.className = 'font-bold text-xl'
landingView.appendChild(landingTitle)

const landingWelcome = document.createElement('p')
landingWelcome.textContent = 'Welcome!'
landingView.appendChild(landingWelcome)

const landingAccess = document.createElement('nav')
const landingLoginLink = document.createElement('a')
landingLoginLink.textContent = 'Login'
landingLoginLink.href = ''
landingLoginLink.className = 'underline font-bold'
landingAccess.appendChild(landingLoginLink)
const landingOrText = document.createTextNode(' or ')
landingAccess.appendChild(landingOrText)
const landingRegisterLink = document.createElement('a')
landingRegisterLink.textContent = 'Register'
landingRegisterLink.href = ''
landingRegisterLink.className = 'underline font-bold'
landingAccess.appendChild(landingRegisterLink)
landingView.appendChild(landingAccess)

landingLoginLink.addEventListener('click', function (event) {
    event.preventDefault()

    landingView.style.display = 'none'
    loginView.style.display = ''
})

landingRegisterLink.addEventListener('click', function (event) {
    event.preventDefault()

    landingView.style.display = 'none'
    registerView.style.display = ''
})

document.body.appendChild(landingView)

// register

const registerView = document.createElement('div')
registerView.style.display = 'none'

const registerTitle = document.createElement('h1')
registerTitle.textContent = 'MyPet'
registerTitle.className = 'font-bold text-xl'
registerView.appendChild(registerTitle)

const registerSubtitle = document.createElement('h2')
registerSubtitle.textContent = 'Register'
registerSubtitle.className = 'font-bold'
registerView.appendChild(registerSubtitle)

const registerForm = document.createElement('form')
registerForm.className = 'flex flex-col'
const registerNameLabel = document.createElement('label')
registerNameLabel.textContent = 'Name'
registerNameLabel.htmlFor = 'name'
registerForm.appendChild(registerNameLabel)
const registerNameInput = document.createElement('input')
registerNameInput.id = 'name'
registerNameInput.type = 'text'
registerNameInput.className = 'border px-1'
registerForm.appendChild(registerNameInput)
const registerEmailLabel = document.createElement('label')
registerEmailLabel.textContent = 'Email'
registerEmailLabel.htmlFor = 'email'
registerForm.appendChild(registerEmailLabel)
const registerEmailInput = document.createElement('input')
registerEmailInput.id = 'email'
registerEmailInput.type = 'email'
registerEmailInput.className = 'border px-1'
registerForm.appendChild(registerEmailInput)
const registerUsernameLabel = document.createElement('label')
registerUsernameLabel.textContent = 'Username'
registerUsernameLabel.htmlFor = 'username'
registerForm.appendChild(registerUsernameLabel)
const registerUsernameInput = document.createElement('input')
registerUsernameInput.id = 'username'
registerUsernameInput.type = 'text'
registerUsernameInput.className = 'border px-1'
registerForm.appendChild(registerUsernameInput)
const registerPasswordLabel = document.createElement('label')
registerPasswordLabel.htmlFor = 'password'
registerPasswordLabel.textContent = 'Password'
registerForm.appendChild(registerPasswordLabel)
const registerPasswordInput = document.createElement('input')
registerPasswordInput.id = 'password'
registerPasswordInput.type = 'password'
registerPasswordInput.className = 'border px-1'
registerForm.appendChild(registerPasswordInput)
const registerShowPasswordButton = document.createElement('button')
registerShowPasswordButton.textContent = 'Show'
registerShowPasswordButton.type = 'button'
registerShowPasswordButton.className = 'self-end'
registerForm.appendChild(registerShowPasswordButton)

registerShowPasswordButton.addEventListener('click', function(event) {
    event.preventDefault()

    if (registerPasswordInput.type === 'password') {
        registerPasswordInput.type = 'text'
        registerShowPasswordButton.textContent = 'Hide'
        registerPasswordInput.className = 'border px-1 bg-[gold]'
    } else {
        registerPasswordInput.type = 'password'
        registerShowPasswordButton.textContent = 'Show'
        registerPasswordInput.className = 'border px-1'
    }
})

const registerPasswordRepeatLabel = document.createElement('label')
registerPasswordRepeatLabel.textContent = 'Repeat Password'
registerPasswordRepeatLabel.htmlFor = 'passwordRepeat'
registerForm.appendChild(registerPasswordRepeatLabel)
const registerPasswordRepeatInput = document.createElement('input')
registerPasswordRepeatInput.id = 'passwordRepeat'
registerPasswordRepeatInput.type = 'password'
registerPasswordRepeatInput.className = 'border px-1'
registerForm.appendChild(registerPasswordRepeatInput)
const registerShowPasswordRepeatButton = document.createElement('button')
registerShowPasswordRepeatButton.textContent = 'Show'
registerShowPasswordRepeatButton.type = 'button'
registerShowPasswordRepeatButton.className = 'self-end'
registerForm.appendChild(registerShowPasswordRepeatButton)

registerShowPasswordRepeatButton.addEventListener('click', function(event) {
    event.preventDefault()

    if (registerPasswordRepeatInput.type === 'password') {
        registerPasswordRepeatInput.type = 'text'
        registerShowPasswordRepeatButton.textContent = 'Hide'
        registerPasswordRepeatInput.className = 'border px-1 bg-[gold]'
    } else {
        registerPasswordRepeatInput.type = 'password'
        registerShowPasswordRepeatButton.textContent = 'Show'
        registerPasswordRepeatInput.className = 'border px-1'
    }
})

const registerSubmitButton = document.createElement('button')
registerSubmitButton.textContent = 'Register'
registerSubmitButton.type = 'submit'
registerSubmitButton.className = 'bg-black text-white self-center px-1'
registerForm.appendChild(registerSubmitButton)
registerView.appendChild(registerForm)

registerForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const name = registerNameInput.value
    const email = registerEmailInput.value
    const username = registerUsernameInput.value
    const password = registerPasswordInput.value
    const passwordRepeat = registerPasswordRepeatInput.value

    try {
        logic.registerUser(name, email, username, password, passwordRepeat)

        registerForm.reset()
        registerFeedback.textContent = ''

        registerView.style.display = 'none'
        loginView.style.display = ''
    } catch (error) {
        registerFeedback.textContent = error.message
    }
})

const registerLoginLink = document.createElement('a')
registerLoginLink.textContent = 'Login'
registerLoginLink.href = ''
registerLoginLink.className = 'underline font-bold'
registerView.appendChild(registerLoginLink)

registerLoginLink.addEventListener('click', function (event) {
    event.preventDefault()

    registerView.style.display = 'none'
    loginView.style.display = ''
})

const registerFeedback = document.createElement('p')
registerView.appendChild(registerFeedback)

document.body.appendChild(registerView)

// login

const loginView = document.createElement('div')
loginView.style.display = 'none'

const loginTitle = document.createElement('h1')
loginTitle.textContent = 'MyPet'
loginTitle.className = 'font-bold text-xl'
loginView.appendChild(loginTitle)

const loginSubtitle = document.createElement('h2')
loginSubtitle.textContent = 'Login'
loginSubtitle.className = 'font-bold'
loginView.appendChild(loginSubtitle)

const loginForm = document.createElement('form')
loginForm.className = 'flex flex-col'
const loginUsernameLabel = document.createElement('label')
loginUsernameLabel.textContent = 'Username'
loginUsernameLabel.htmlFor = 'username'
loginForm.appendChild(loginUsernameLabel)
const loginUsernameInput = document.createElement('input')
loginUsernameInput.id = 'username'
loginUsernameInput.type = 'text'
loginUsernameInput.className = 'border px-1'
loginForm.appendChild(loginUsernameInput)
const loginPasswordLabel = document.createElement('label')
loginPasswordLabel.textContent = 'Password'
loginPasswordLabel.htmlFor = 'password'
loginForm.appendChild(loginPasswordLabel)
const loginPasswordInput = document.createElement('input')
loginPasswordInput.id = 'password'
loginPasswordInput.type = 'password'
loginPasswordInput.className = 'border px-1'
loginForm.appendChild(loginPasswordInput)
const loginShowPasswordButton = document.createElement('button')
loginShowPasswordButton.textContent = 'Show'
loginShowPasswordButton.type = 'button'
loginShowPasswordButton.className = 'self-end'
loginForm.appendChild(loginShowPasswordButton)

loginShowPasswordButton.addEventListener('click', function(event) {
    event.preventDefault()

    if (loginPasswordInput.type === 'password') {
        loginPasswordInput.type = 'text'
        loginShowPasswordButton.textContent = 'Hide'
        loginPasswordInput.className = 'border px-1 bg-[gold]'
    } else {
        loginPasswordInput.type = 'password'
        loginShowPasswordButton.textContent = 'Show'
        loginPasswordInput.className = 'border px-1'
    }
})

const loginSubmitButton = document.createElement('button')
loginSubmitButton.textContent = 'Login'
loginSubmitButton.type = 'submit'
loginSubmitButton.className = 'bg-black text-white px-1 self-center'
loginForm.appendChild(loginSubmitButton)
loginView.appendChild(loginForm)

loginForm.addEventListener('submit', function(event) {
    event.preventDefault()

    const username = loginUsernameInput.value
    const password = loginPasswordInput.value

    try {
        logic.loginUser(username, password)

        loginForm.reset()
        loginFeedback.textContent = ''

        loginView.style.display = 'none'
        homeView.style.display = ''
    } catch(error) {
        loginFeedback.textContent = error.message
    }
})

const loginRegisterLink = document.createElement('a')
loginRegisterLink.textContent = 'Register'
loginRegisterLink.href = ''
loginRegisterLink.className = 'underline font-bold'
loginView.appendChild(loginRegisterLink)

loginRegisterLink.addEventListener('click', function (event) {
    event.preventDefault()

    loginView.style.display = 'none'
    registerView.style.display = ''
})

const loginFeedback = document.createElement('p')
loginView.appendChild(loginFeedback)

document.body.appendChild(loginView)

// home

const homeView = document.createElement('div')
homeView.style.display = 'none'

const homeTitle = document.createElement('h1')
homeTitle.textContent = 'MyPet'
homeTitle.className = 'font-bold text-xl'
homeView.appendChild(homeTitle)

const homeSubtitle = document.createElement('h2')
homeSubtitle.textContent = 'Welcome Home!'
homeView.appendChild(homeSubtitle)

const homeAddPetButton = document.createElement('button')
homeAddPetButton.textContent = '+ Pet'
homeAddPetButton.type = 'button'
homeAddPetButton.className = 'bg-black text-white px-1'
homeView.appendChild(homeAddPetButton)

homeAddPetButton.addEventListener('click', function(event) {
    event.preventDefault()

    homeView.style.display = 'none'
    addPetView.style.display = ''
})

const homeLogoutButton = document.createElement('button')
homeLogoutButton.textContent = 'Logout'
homeLogoutButton.type = 'button'
homeLogoutButton.className = 'bg-black text-white px-1'
homeView.appendChild(homeLogoutButton)

homeLogoutButton.addEventListener('click', function(event) {
    event.preventDefault()

    logic.logoutUser()

    homeView.style.display = 'none'
    loginView.style.display = ''
})

document.body.appendChild(homeView)

// add pet

const addPetView = document.createElement('div')
addPetView.style.display = 'none'

const addPetTitle = document.createElement('h1')
addPetTitle.textContent = 'MyPet'
addPetTitle.className = 'font-bold text-xl'
addPetView.appendChild(addPetTitle)

const addPetTopPanel = document.createElement('div')
addPetTopPanel.className = 'flex justify-between'
addPetView.appendChild(addPetTopPanel)

const addPetSubtitle = document.createElement('h2')
addPetSubtitle.textContent = 'Add Pet'
addPetSubtitle.className = 'font-bold'
addPetTopPanel.appendChild(addPetSubtitle)

const addPetBackLink = document.createElement('a')
addPetBackLink.textContent = '< Back'
addPetBackLink.href = ''
addPetBackLink.className = 'underline font-bold'
addPetTopPanel.appendChild(addPetBackLink)

addPetBackLink.addEventListener('click', function(event) {
    event.preventDefault()

    addPetView.style.display = 'none'
    homeView.style.display = ''
})

const addPetForm = document.createElement('form')
addPetForm.className = 'flex flex-col'
const addPetNameLabel = document.createElement('label')
addPetNameLabel.textContent = 'Name'
addPetNameLabel.htmlFor = 'name'
addPetForm.appendChild(addPetNameLabel)
const addPetNameInput = document.createElement('input')
addPetNameInput.id = 'name'
addPetNameInput.type = 'text'
addPetNameInput.className = 'border px-1'
addPetForm.appendChild(addPetNameInput)
const addPetBirthdateLabel = document.createElement('label')
addPetBirthdateLabel.textContent = 'Date of Birth'
addPetBirthdateLabel.htmlFor = 'date'
addPetForm.appendChild(addPetBirthdateLabel)
const addPetBirthdateInput = document.createElement('input')
addPetBirthdateInput.id = 'date'
addPetBirthdateInput.type = 'date'
addPetBirthdateInput.className = 'border px-1'
addPetForm.appendChild(addPetBirthdateInput)
const addPetWeightLabel = document.createElement('label')
addPetWeightLabel.textContent = 'Weight (kg)'
addPetWeightLabel.htmlFor = 'weight'
addPetForm.appendChild(addPetWeightLabel)
const addPetWeightInput = document.createElement('input')
addPetWeightInput.id = 'weight'
addPetWeightInput.type = 'number'
addPetWeightInput.step = '0.01'
addPetWeightInput.className = 'border px-1'
addPetForm.appendChild(addPetWeightInput)
const addPetImageLabel = document.createElement('label')
addPetImageLabel.htmlFor = 'image'
addPetImageLabel.textContent = 'Image'
addPetForm.appendChild(addPetImageLabel)
const addPetImageInput = document.createElement('input')
addPetImageInput.id = 'image'
addPetImageInput.type = 'url'
addPetImageInput.className = 'border px-1'
addPetForm.appendChild(addPetImageInput)
const addPetSubmitButton = document.createElement('button')
addPetSubmitButton.textContent = 'Add Pet'
addPetSubmitButton.type = 'submit'
addPetSubmitButton.className = 'bg-black text-white self-center px-1 mt-4'
addPetForm.appendChild(addPetSubmitButton)
addPetView.appendChild(addPetForm)

addPetForm.addEventListener('submit', function(event) {
    event.preventDefault()

    const name = addPetNameInput.value
    const birthdate = addPetBirthdateInput.value
    const weight = parseFloat(addPetWeightInput.value)
    const image = addPetImageInput.value

    try {
        logic.addPet(name, birthdate, weight, image)

        addPetForm.reset()
        addPetFeedback.textContent = ''

        addPetView.style.display = 'none'
        homeView.style.display = ''
    } catch(error) {
        addPetFeedback.textContent = error.message
    }
})

const addPetFeedback = document.createElement('p')
addPetView.appendChild(addPetFeedback)

document.body.appendChild(addPetView)