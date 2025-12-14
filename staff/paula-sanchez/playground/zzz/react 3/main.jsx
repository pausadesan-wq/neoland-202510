const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

// landing

const landingView = <div>
    <h1>MyPet</h1>

    <p>Welcome!</p>

    <nav>
        <a href="">Login</a> or <a href="">Register</a>
    </nav>
</div>

root.render(landingView)