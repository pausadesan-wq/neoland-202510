const landingView = createView()
//hideView(landingView)

//titulo

const landingTitle = createTitle()
setTextContent(landingTitle, 'MyPet')
addChild(landingView, landingTitle)

//mensaje de bienvenida

const landingWelcome = createParagraph()
setTextContent(landingWelcome, 'Welcome!')
addChild(landingView, landingWelcome)

const landingNavigation = createNavigation()

//link

const landingLoginLink = createLink()
setTextContent(landingLoginLink, 'Login')
addChild(landingNavigation, landingLoginLink)

//texto del medio

const landingOrText = createTextNode(' or ')
addChild(landingNavigation, landingOrText)

//link

const landingRegisterLink = createLink()
setTextContent(landingRegisterLink, 'Register')
addChild(landingNavigation, landingRegisterLink)

addChild(landingView, landingNavigation)

landingLoginLink.addEventListener('click', function (event) {
    event.preventDefault()

    hideView(landingView)
    showView(loginView)
})

landingRegisterLink.addEventListener('click', function (event) {
    event.preventDefault()

    hideView(landingView)
    showView(registerView)
})

addChild(document.body, landingView)