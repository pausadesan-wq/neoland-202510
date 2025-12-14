// dom (general purpose)

function createElement(tagName) {
    return document.createElement(tagName)
}

function changeDisplay(element, value) {
    element.style.display = value
}

function setTextContent(element, text) {
    element.textContent = text
}

function addChild(element, childElement) {
    element.appendChild(childElement)
}

function removeChild(element, childElement) {
    element.removeChild(childElement)
}

function setClass(element, clazz) {
    element.className = clazz
}

//para añadir y quitar (se puede poner clazz o value para diferenciar de class)

function addClass(element, value) {
    element.classList.add(value)
}

function removeClass(element, value) {
    element.classList.remove(value)
}

function createTextNode(text) {
    return document.createTextNode(text)
}

function setFor(element, value) {
    element.htmlFor = value
}

function setId(element, value) {
    element.id = value
}

function setType(element, value) {
    element.type = value
}

function getType(element) {
    return element.type
}

function getValue(element) {
    return element.value
}

function reset(element) {
    element.reset()
}

function setSource(element, value) {
    element.src = value
}

function setStep(element, value) {
    element.step = value
}

function setHref(element, value) {
    element.href = value
}

// interface (application specific)

function createView() {
    const view = createElement('div')
    setClass(view, 'p-4')

    return view
}

function hideView(view) {
    changeDisplay(view, 'none')
}

function showView(view) {
    changeDisplay(view, '')
}

function createTitle() {
    const title = createElement('h1')
    setClass(title, 'font-bold text-xl')

    return title
}

function createTitle2() {
    const title2 = createElement('h2')
    setClass(title2, 'font-bold')

    return title2
}

function createParagraph() {
    return createElement('p')
}

function createNavigation() {
    return createElement('nav')
}

function createLink() {
    const link = createElement('a')
    //setHref(link, '') - DEDITO pero mejor poner lo de abajo (tailwind)
    setClass(link, 'cursor-pointer underline font-bold')

    return link
}

function createForm() {
    return createElement('form')
}

function createLabel() {
    return createElement('label')
}

function createInput() {
    return createElement('input')
}

function createButton() {
    const button = createElement('button')
    setClass(button, 'bg-black text-white px-1')

    return button 
}

function createPanel() {
    return createElement('div')
}

function createUnorderedList() {
    return createElement('ul')
}

function createListItem() {
    return createElement('li')
}

function createImage() {
    return createElement('img')
}