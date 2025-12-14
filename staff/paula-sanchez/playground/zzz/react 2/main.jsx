const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

// === LANDING ===

const landingTitle = <h1>MyPet</h1>

const landingWelcome = <p>Welcome!</p>

const landingLoginLink = <a href="">Login</a>
const landingRegisterLink = <a href="">Register</a>

const landingNavigation = <nav>{landingLoginLink} or { landingRegisterLink}</nav>

const landingView = <div>
    {landingTitle}

    {landingWelcome}

    {landingNavigation}
</div>

root.render(landingView)