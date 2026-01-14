const addPetView = createView()
hideView(addPetView)

const addPetTitle = createTitle()
setTextContent(addPetTitle, 'MyPet')
addChild(addPetView, addPetTitle)

const addPetTopPanel = createPanel()
setClass(addPetTopPanel, 'flex justify-between')
addChild(addPetView, addPetTopPanel)

const addPetSubtitle = createTitle2()
setTextContent(addPetSubtitle, 'Add Pet')
addChild(addPetTopPanel, addPetSubtitle)

//codigo anterior en la clase del 10 diciembre 25
const addPetBackLink = createLink()
setTextContent(addPetBackLink, '< Back')
addChild(addPetTopPanel, addPetBackLink)

addPetBackLink.addEventListener('click', function (event) {
    event.preventDefault()

    hideView(addPetView)
    showView(homeView)
})

const addPetForm = createForm()
setClass(addPetForm, 'flex flex-col')

const addPetNameLabel = createLabel()
setTextContent(addPetNameLabel, 'Name')
setFor(addPetNameLabel, 'name')
addChild(addPetForm, addPetNameLabel)

const addPetNameInput = createInput()
setId(addPetNameInput, 'name')
setType(addPetNameInput, 'text')
setClass(addPetNameInput, 'border px-1')
addChild(addPetForm, addPetNameInput)

const addPetBirthdateLabel = createLabel()
setTextContent(addPetBirthdateLabel, 'Date of Birth')
setFor(addPetBirthdateLabel, 'date')
addChild(addPetForm, addPetBirthdateLabel)

const addPetBirthdateInput = createInput()
setId(addPetBirthdateInput, 'date')
setType(addPetBirthdateInput, 'date')
setClass(addPetBirthdateInput, 'border px-1')
addChild(addPetForm, addPetBirthdateInput)

const addPetWeightLabel = createLabel()
setTextContent(addPetWeightLabel, 'Weight (kg)')
setFor(addPetWeightLabel, 'weight')
addChild(addPetForm, addPetWeightLabel)

const addPetWeightInput = createInput()
setId(addPetWeightInput, 'weight')
setType(addPetWeightInput, 'number')
setStep(addPetWeightInput, '0.01')
setClass(addPetWeightInput, 'border px-1')
addChild(addPetForm, addPetWeightInput)

const addPetImageLabel = createLabel()
setFor(addPetImageLabel, 'image')
setTextContent(addPetImageLabel, 'Image')
addChild(addPetForm, addPetImageLabel)

const addPetImageInput = createInput()
setId(addPetImageInput, 'image')
setType(addPetImageInput, 'url')
setClass(addPetImageInput, 'border px-1')
addChild(addPetForm, addPetImageInput)

const addPetSubmitButton = createButton()
setTextContent(addPetSubmitButton, 'Add Pet')
setType(addPetSubmitButton, 'submit')
addClass(addPetSubmitButton, 'self-center')
addClass(addPetSubmitButton, 'mt-4')
addChild(addPetForm, addPetSubmitButton)

addChild(addPetView, addPetForm)

addPetForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const name = getValue(addPetNameInput)
    const birthdate = getValue(addPetBirthdateInput)
    const weight = parseFloat(getValue(addPetWeightInput))
    const image = getValue(addPetImageInput)

    try {
        logic.addPet(name, birthdate, weight, image)

        reset(addPetForm)
        setTextContent(addPetFeedback, '')

        clearHomePetList()

        renderHomePetList()

        //NOTA: si se repite código, se puede hacer una función, para que sea más fácil de leer y hacer -- esto lo vemos en common

        hideView(addPetView)
        showView(homeView)
    } catch (error) {
        setTextContent(addPetFeedback, error.message)
    }
})

const addPetFeedback = createParagraph()
addChild(addPetView, addPetFeedback)

addChild(document.body, addPetView)