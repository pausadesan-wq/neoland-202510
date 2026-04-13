const loginView = createView()
hideView(loginView)

const loginTitle = createTitle()
setTextContent(loginTitle, 'MyPet')
addChild(loginView, loginTitle)

const loginSubtitle = createTitle2()
setTextContent(loginSubtitle, 'Login')
addChild(loginView, loginSubtitle)

const loginForm = createForm()
setClass(loginForm, 'flex flex-col')

const loginUsernameLabel = createLabel()
setTextContent(loginUsernameLabel, 'Username')
setFor(loginUsernameLabel, 'username')
addChild(loginForm, loginUsernameLabel)

const loginUsernameInput = createInput()
setId(loginUsernameInput, 'username')
setType(loginUsernameInput, 'text')
setClass(loginUsernameInput, 'border px-1')
addChild(loginForm, loginUsernameInput)

const loginPasswordLabel = createLabel()
setTextContent(loginPasswordLabel, 'Password')
setFor(loginPasswordLabel, 'password')
addChild(loginForm, loginPasswordLabel)

const loginPasswordInput = createInput()
setId(loginPasswordInput, 'password')
setType(loginPasswordInput, 'password')
setClass(loginPasswordInput, 'border px-1')
addChild(loginForm, loginPasswordInput)

const loginShowPasswordButton = createButton()
setTextContent(loginShowPasswordButton, 'Show')
setType(loginShowPasswordButton, 'button')
setClass(loginShowPasswordButton, 'self-end')
addChild(loginForm, loginShowPasswordButton)

loginShowPasswordButton.addEventListener('click', function (event) {
    event.preventDefault()

    if (getType(loginPasswordInput) === 'password') {
        setType(loginPasswordInput, 'text')
        setTextContent(loginShowPasswordButton, 'Hide')
        setClass(loginPasswordInput, 'border px-1 bg-[gold]')
    } else {
        setType(loginPasswordInput, 'password')
        setTextContent(loginShowPasswordButton, 'Show')
        setClass(loginPasswordInput, 'border px-1')
    }
})

const loginSubmitButton = createButton()
setTextContent(loginSubmitButton, 'Login')
setType(loginSubmitButton, 'submit')
//setClass(loginSubmitButton, 'bg-black text-white px-1 self-center') -- como ya he hecho una class general, quiero añadirle una cosa pero sin tocar la class
addClass(loginSubmitButton, 'self-center')
addChild(loginForm, loginSubmitButton)
addChild(loginView, loginForm)

loginForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const username = getValue(loginUsernameInput)
    const password = getValue(loginPasswordInput)

    try {
        logic.loginUser(username, password)

        //si algo va mal aquí, nos lleva al catch error

        reset(loginForm)
        setTextContent(loginFeedback, '')

        renderHomePetList()

        hideView(loginView)
        showView(homeView)
    } catch (error) {
        setTextContent(loginFeedback, error.message)
    }
})

const loginRegisterLink = createLink()
setTextContent(loginRegisterLink, 'Register')
addChild(loginView, loginRegisterLink)

loginRegisterLink.addEventListener('click', function (event) {
    event.preventDefault()

    hideView(loginView)
    showView(registerView)
})

const loginFeedback = createParagraph()
addChild(loginView, loginFeedback)

addChild(document.body, loginView)