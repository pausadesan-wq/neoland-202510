// Obtiene el elemento real del DOM con id="root"
const rootElement = document.getElementById('root')

// Crea la raíz de React asociada a ese nodo del DOM
const root = ReactDOM.createRoot(rootElement)

// === LANDING ===

/* Componente funcional de React.
 Es una función normal de JavaScript que devuelve JSX (que Babel transforma en llamadas a React.createElement) */

function LandingView() {

  /* Elemento raíz del componente 
  Primero: Título principal del landing
  Segundo: Texto de bienvenida
  Tercero: Contenedor de navegación
  Cuarto: Enlaces */

  return <div>
    <h1>MyPet</h1>

    <p>Welcome!</p>

    <nav>
      <a href="">Login</a> or <a href="">Register</a>
    </nav>
  </div>
}

// Renderiza el componente LandingView dentro del nodo #root del DOM real

root.render(<LandingView />)
