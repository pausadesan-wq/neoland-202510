const registerView = createView()
hideView(registerView)

const registerTitle = createTitle()
setTextContent(registerTitle, 'MyPet')
addChild(registerView, registerTitle)

const registerSubtitle = createTitle2()
setTextContent(registerSubtitle, 'Register')
addChild(registerView, registerSubtitle)

const registerForm = createForm()
setClass(registerForm, 'flex flex-col')

const registerNameLabel = createLabel()
setTextContent(registerNameLabel, 'Name')
setFor(registerNameLabel, 'name')
addChild(registerForm, registerNameLabel)

const registerNameInput = createInput()
setId(registerNameInput, 'name')
setType(registerNameInput, 'text')
setClass(registerNameInput, 'border px-1')
addChild(registerForm, registerNameInput)

const registerEmailLabel = createLabel()
setTextContent(registerEmailLabel, 'Email')
setFor(registerEmailLabel, 'email')
addChild(registerForm, registerEmailLabel)

const registerEmailInput = createInput()
setId(registerEmailInput, 'email')
setType(registerEmailInput, 'email')
setClass(registerEmailInput, 'border px-1')
addChild(registerForm, registerEmailInput)

const registerUsernameLabel = createLabel()
setTextContent(registerUsernameLabel, 'Username')
setFor(registerUsernameLabel, 'username')
addChild(registerForm, registerUsernameLabel)

const registerUsernameInput = createInput()
setId(registerUsernameInput, 'username')
setType(registerUsernameInput, 'text')
setClass(registerUsernameInput, 'border px-1')
addChild(registerForm, registerUsernameInput)

const registerPasswordLabel = createLabel()
setFor(registerPasswordLabel, 'password')
setTextContent(registerPasswordLabel, 'Password')
addChild(registerForm, registerPasswordLabel)

const registerPasswordInput = createInput()
setId(registerPasswordInput, 'password')
setType(registerPasswordInput, 'password')
setClass(registerPasswordInput, 'border px-1')
addChild(registerForm, registerPasswordInput)

const registerShowPasswordButton = createButton()
setTextContent(registerShowPasswordButton, 'Show')
setType(registerShowPasswordButton, 'button')
setClass(registerShowPasswordButton, 'self-end')
addChild(registerForm, registerShowPasswordButton)

registerShowPasswordButton.addEventListener('click', function (event) {
    event.preventDefault()

    if (getType(registerPasswordInput) === 'password') {
        setType(registerPasswordInput, 'text')
        setTextContent(registerShowPasswordButton, 'Hide')
        setClass(registerPasswordInputregisterTitle, 'border px-1 bg-[gold]')
    } else {
        setType(registerPasswordInput, 'password')
        setTextContent(registerShowPasswordButton, 'Show')
        setClass(registerPasswordInputregisterTitle, 'border px-1')
    }
})

const registerPasswordRepeatLabel = createLabel()
setTextContent(registerPasswordRepeatLabel, 'Repeat Password')
setFor(registerPasswordRepeatLabel, 'passwordRepeat')
addChild(registerForm, registerPasswordRepeatLabel)

const registerPasswordRepeatInput = createInput()
setId(registerPasswordRepeatInput, 'passwordRepeat')
setType(registerPasswordRepeatInput, 'password')
setClass(registerPasswordRepeatInput, 'border px-1')
addChild(registerForm, registerPasswordRepeatInput)

const registerShowPasswordRepeatButton = createButton()
setTextContent(registerShowPasswordRepeatButton, 'Show')
setType(registerShowPasswordRepeatButton, 'button')
setClass(registerShowPasswordRepeatButton, 'self-end')
addChild(registerForm, registerShowPasswordRepeatButton)

registerShowPasswordRepeatButton.addEventListener('click', function (event) {
    event.preventDefault()

    if (getType(registerPasswordRepeatInput) === 'password') {
        setType(registerPasswordRepeatInput, 'text')
        setTextContent(registerShowPasswordRepeatButton, 'Hide')
        setClass(registerPasswordRepeatInput, 'border px-1 bg-[gold]')
    } else {
        setType(registerPasswordRepeatInput, 'password')
        setTextContent(registerShowPasswordRepeatButton, 'Show')
        setClass(registerPasswordRepeatInput, 'border px-1')
    }
})

const registerSubmitButton = createButton()
setTextContent(registerSubmitButton, 'Register')
setType(registerSubmitButton, 'submit')
addClass(registerSubmitButton, 'self-center')

/*DOM console - addPetSubmitButton.classList para ver todas las clases que se están usando .... si queremos añadir una clase -- addPetSubmitButton.classList.add('mt-4')---- si la quiero quitar addPetSubmitButton.classList.remove('mt-4')*/
addChild(registerForm, registerSubmitButton)
addChild(registerView, registerForm)

registerForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const name = getValue(registerNameInput)
    const email = getValue(registerEmailInput)
    const username = getValue(registerUsernameInput)
    const password = getValue(registerPasswordInput)
    const passwordRepeat = getValue(registerPasswordRepeatInput)

    try {
        logic.registerUser(name, email, username, password, passwordRepeat)

        reset(registerForm)
        setTextContent(registerFeedback, '')

        hideView(registerView)
        showView(loginView)
    } catch (error) {
        setTextContent(registerFeedback, error.message)
    }
})

const registerLoginLink = createLink()
setTextContent(registerLoginLink, 'Login')
addChild(registerView, registerLoginLink)

registerLoginLink.addEventListener('click', function (event) {
    event.preventDefault()

    hideView(registerView)
    showView(loginView)
})

const registerFeedback = createParagraph()
addChild(registerView, registerFeedback)

addChild(document.body, registerView)