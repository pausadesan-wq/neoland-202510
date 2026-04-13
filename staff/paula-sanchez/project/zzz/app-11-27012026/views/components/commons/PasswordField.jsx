const { useState } = React

function PasswordField({ alias, children }) {
    const [type, setType] = useState('password')

    const handleTogglePasswordClick = event => {
        event.preventDefault()

        setType(type === 'password' ? 'text' : 'password')
    }

    return <div className="flex flex-col">
        <Label alias={alias}>{children}</Label>
        <Input alias={alias} type={type} autoComplete="off" className={type === 'password'? '' : 'bg-[gold]'} />
        <button className="self-end" type="button" onClick={handleTogglePasswordClick}>{type === 'password' ? 'Show' : 'Hide'}</button>
    </div>
}