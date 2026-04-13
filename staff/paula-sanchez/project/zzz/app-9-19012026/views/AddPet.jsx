const { useState } = React

function AddPet({ onGoToHome }) {
    console.log('AddPet -> call')

    const [message, setMessage] = useState('')

    const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()   
    }

    const handleAddPetSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const birthdate = form.birthdate.value
        const weight = Number(form.weight.value)
        const image = form.image.value

        try {
            logic.addPet(name, birthdate, weight, image)

            form.reset()

            onGoToHome()
        } catch (error) {
            setMessage(error.message)
        }
    }

    console.log('AddPet -> render')

    return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <div className="flex justify-between">
                <h2 className="font-bold">Add Pet</h2>

                <a className="cursor-pointer underline font-bold" onClick={handleBackClick}>&lt; Back</a>
            </div>

            <form className="flex flex-col" onSubmit={handleAddPetSubmit}>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" autoComplete="off" type="text" className="border px-1" />

                <label htmlFor="date">Date of Birth</label>
                <input id="birthdate" name="birthdate" autoComplete="off" type="date" className="border px-1" />

                <label htmlFor="weight">Weight (kg)</label>
                <input id="weight" name="weight" autoComplete="off" type="number" step="0.01" className="border px-1" />

                <label htmlFor="image">Image</label>
                <input id="image" name="image" autoComplete="off" type="url" className="border px-1" />

                <Button className="self-center mt-4" type="submit">Add Pet</Button>
            </form>

            <p>{message}</p>
        </div>
}