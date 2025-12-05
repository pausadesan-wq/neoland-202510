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

        const pets = logic.getPets()

        for (let i = 0; i < pets.length; i++) {
            const pet = pets[i]

            const item = document.createElement('li')
            item.className = 'flex'

            const image = document.createElement('img')
            image.src = pet.image
            image.className = 'rounded-[50%] w-20'
            item.appendChild(image)

            const name = document.createElement('p')
            name.textContent = pet.name
            item.appendChild(name)

            homePetList.appendChild(item)
        }

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