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