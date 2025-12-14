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

addPetBackLink.addEventListener('click', function (event) {
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

addPetForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const name = addPetNameInput.value
    const birthdate = addPetBirthdateInput.value
    const weight = parseFloat(addPetWeightInput.value)
    const image = addPetImageInput.value

    try {
        logic.addPet(name, birthdate, weight, image)

        addPetForm.reset()
        addPetFeedback.textContent = ''

        // limpieza del listado
        for (let i = homePetList.children.length - 1; i >= 0; i--) {
            const child = homePetList.children[i]

            homePetList.removeChild(child)
            //child.remove()
        }

        // pedirle a la lógica los pets

        const pets = logic.getPets()

        for (let i = 0; i < pets.length; i++) {
            const pet = pets[i]

            // li es donde contiene todo del pet

            const petItem = document.createElement('li')
            petItem.className = 'flex'

            const image = document.createElement('img')
            image.src = pet.image
            image.className = 'rounded-[50%] w-20'
            petItem.appendChild(image)

            const name = document.createElement('p')
            name.textContent = pet.name
            petItem.appendChild(name)

            homePetList.appendChild(petItem)
        }

        //NOTA: si se repite código, se puede hacer una función, para que sea más fácil de leer y hacer

        addPetView.style.display = 'none'
        homeView.style.display = ''
    } catch (error) {
        addPetFeedback.textContent = error.message
    }
})

const addPetFeedback = document.createElement('p')
addPetView.appendChild(addPetFeedback)

document.body.appendChild(addPetView)