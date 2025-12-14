//=========== SIN BABEL ===========

// Obtiene el elemento del DOM con id="root"
const rootElement = document.getElementById('root')

// Crea la raíz de React asociada a ese elemento del DOM
const root = ReactDOM.createRoot(rootElement)

// === LANDING ===

// Crea un elemento React <h1> con el texto "MyPet"
const landingTitle = React.createElement('h1', null, 'MyPet')

  /*'h1',            // tipo de elemento
  null,            // props (no tiene)
  'MyPet'          // contenido hijo
  */


// Crea un elemento React <p> con el texto "Welcome!"
const landingWelcome = React.createElement('p', null, 'Welcome!')

// Crea un enlace <a> con atributo href y texto "Login"
const landingLoginLink = React.createElement('a', { href: '' }, 'Login')


/*
  { href: '' },    // props: atributos HTML
  */

// Crea un enlace <a> con atributo href y texto "Register"
const landingRegisterLink = React.createElement('a', { href: '' }, 'Register')

/* Crea un <nav> que contiene:
 - el enlace de login
 - un texto intermedio
 - el enlace de register
*/
const landingNavigation = React.createElement('nav', null, [landingLoginLink, ' or ', landingRegisterLink])

/* Crea un <div> contenedor del landing completo:
 - título
 - texto de bienvenida
 - navegación
*/
const landingView = React.createElement('div', null, [landingTitle, landingWelcome, landingNavigation])

// Renderiza el árbol de React dentro del DOM real
root.render(landingView)

