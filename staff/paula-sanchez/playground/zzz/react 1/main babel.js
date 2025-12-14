// Obtiene el nodo real del DOM con id="root"
const rootElement = document.getElementById('root')

// Crea la raíz de React sobre ese elemento del DOM real
const root = ReactDOM.createRoot(rootElement)

// === LANDING ===

// Crea un elemento React <h1> con children pasado dentro de props

const landingTitle = React.createElement('h1', { children: 'MyPet' })

  /*
  'h1',                       // tipo de elemento
  { children: 'MyPet' }       // props (incluye el contenido como children)
) */

// Crea un elemento React <p> con texto de bienvenida
const landingWelcome = React.createElement('p', { children: 'Welcome!' })

// Crea un enlace React <a> con atributo href y texto "Login"
const landingLoginLink = React.createElement('a', { href: '', children: 'Login' })

/*(
  'a',
  { href: '', children: 'Login' }  // props: atributos HTML + children
)
*/

// Crea un enlace React <a> con atributo href y texto "Register"
const landingRegisterLink = React.createElement('a', { href: '', children: 'Register' })

/*
 Crea un <nav> con varios hijos:
 - enlace de login
 - texto plano
 - enlace de registro
*/

const landingNavigation = React.createElement('nav', null, [landingLoginLink, ' or ', landingRegisterLink])

/*
 Crea un <div> contenedor de toda la vista del landing:
 - título
 - texto de bienvenida
 - navegación
*/

const landingView = React.createElement('div', null, [landingTitle, landingWelcome, landingNavigation])

// Renderiza el árbol de React dentro del nodo real del DOM
root.render(landingView)
