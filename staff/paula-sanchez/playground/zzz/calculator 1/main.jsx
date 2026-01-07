const root = ReactDOM.createRoot(document.getElementById('root')) // Crea el punto donde React montará la app
root.render(<App />) // Renderiza el componente App dentro del root

const useState = React.useState // Alias de React.useState

function App() { // Componente principal que devuelve JSX y se re-ejecuta en cada cambio de estado
    const displayState = useState('0') // Crea estado inicial '0' y devuelve [valor, setter]
    const displayValue = displayState[0] // Valor actual del estado
    const setDisplayValue = displayState[1] // Función que actualiza el estado y provoca re-render


    //esto sería la función base para poder concadenar cada número al pulsar sobre él

    const handleOneClicked = () => { // Maneja click del número 1
        if (displayValue === '0') // Si solo hay 0
            setDisplayValue('1') // Reemplaza por 1
        else
            setDisplayValue(displayValue + '1') // Concatena 1 al final
    }

    const handleTwoClicked = () => { // Maneja click del número 2
        if (displayValue === '0')
            setDisplayValue('2')
        else
            setDisplayValue(displayValue + '2')
    }

    const handleThreeClicked = () => { // Maneja click del número 3
        if (displayValue === '0')
            setDisplayValue('3')
        else
            setDisplayValue(displayValue + '3')
    }

    const handleFourClicked = () => { // Maneja click del número 4
        if (displayValue === '0')
            setDisplayValue('4')
        else
            setDisplayValue(displayValue + '4')
    }

    const handleFiveClicked = () => { // Maneja click del número 5
        if (displayValue === '0')
            setDisplayValue('5')
        else
            setDisplayValue(displayValue + '5')
    }

    const handleSixClicked = () => { // Maneja click del número 6
        if (displayValue === '0')
            setDisplayValue('6')
        else
            setDisplayValue(displayValue + '6')
    }

    const handleSevenClicked = () => { // Maneja click del número 7
        if (displayValue === '0')
            setDisplayValue('7')
        else
            setDisplayValue(displayValue + '7')
    }

    const handleEightClicked = () => { // Maneja click del número 8
        if (displayValue === '0')
            setDisplayValue('8')
        else
            setDisplayValue(displayValue + '8')
    }

    const handleNineClicked = () => { // Maneja click del número 9
        if (displayValue === '0')
            setDisplayValue('9')
        else
            setDisplayValue(displayValue + '9')
    }

    const handleZeroClicked = () => { // Maneja click del 0 evitando múltiples ceros iniciales
        if (displayValue !== '0')
            setDisplayValue(displayValue + '0')
    }

    const handleAllClearClicked = () => setDisplayValue('0') // Resetea el display a 0

    const handleDivideClicked = () => setDisplayValue(displayValue + '÷') // Añade símbolo división

    const handleMultiplyClicked = () => setDisplayValue(displayValue + '×') // Añade símbolo multiplicación

    const handleSubtractClicked = () => setDisplayValue(displayValue + '-') // Añade símbolo resta

    const handleAddClicked = () => setDisplayValue(displayValue + '+') // Añade símbolo suma

    const handleResultClicked = () => { // Calcula el resultado final
        const operation = displayValue.replaceAll('÷', '/').replaceAll('×', '*') // Convierte símbolos visuales a operadores JS
        const result = eval(operation) // Evalúa la operación como código JS y devuelve un número
        setDisplayValue(String(result))        // Convierte el resultado a string y lo muestra provocando re-render
    }

    console.log('App -> render') // Se ejecuta en cada render del componente. Llamada a la función para que se repinte.

    return <div className="border-2 m-2 p-2 rounded-2xl bg-gray-800 text-white"> {/* JSX que React convierte en DOM */}
        <div className="flex justify-end px-4 text-3xl">{displayValue}</div> {/* Muestra el valor actual del estado */}
        <div className="p-2 flex flex-col gap-2">
            <div className="flex justify-between">
                <div className="bg-gray-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer">⌫</div>
                <div className="bg-gray-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleAllClearClicked}>AC</div> {/* Resetea estado */}
                <div className="bg-gray-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer">%</div>
                <div className="bg-orange-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleDivideClicked}>÷</div> {/* Añade división */}
            </div>
            <div className="flex justify-between">
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleSevenClicked}>7</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleEightClicked}>8</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleNineClicked}>9</div>
                <div className="bg-orange-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleMultiplyClicked}>×</div>
            </div>
            <div className="flex justify-between">
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleFourClicked}>4</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleFiveClicked}>5</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleSixClicked}>6</div>
                <div className="bg-orange-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleSubtractClicked}>-</div>
            </div>
            <div className="flex justify-between">
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleOneClicked}>1</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleTwoClicked}>2</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleThreeClicked}>3</div>
                <div className="bg-orange-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleAddClicked}>+</div>
            </div>
            <div className="flex justify-between">
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer">+/-</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleZeroClicked}>0</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer">,</div>
                <div className="bg-orange-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleResultClicked}>=</div>
            </div>
        </div>
    </div>
}