const root = ReactDOM.createRoot(document.getElementById('root')) // Crea el root del DOM donde React montará la app
root.render(<App />) // Renderiza el componente principal App dentro del root

const useState = React.useState // Alias de React.useState para abreviar llamadas al hook

function App() { // Componente principal de React
    const displayState = useState('0') // Hook de estado: valor inicial '0' y función setter
    const displayValue = displayState[0] // Valor actual mostrado en la calculadora
    const setDisplayValue = displayState[1] // Función que actualiza el estado y provoca re-render

    // ---------------- NÚMEROS ----------------
    const handleOneClicked = () => { // Maneja click del 1
        logic.selectOne() // Llama a la lógica central para seleccionar el número 1
        setDisplayValue(logic.getCurrentValue()) // Actualiza el display con el valor actual de la lógica
    }

    const handleTwoClicked = () => {
        logic.selectTwo()
        setDisplayValue(logic.getCurrentValue())
    }

    const handleThreeClicked = () => {
        logic.selectThree()
        setDisplayValue(logic.getCurrentValue())
    }

    const handleFourClicked = () => {
        logic.selectFour()
        setDisplayValue(logic.getCurrentValue())
    }

    const handleFiveClicked = () => {
        logic.selectFive()
        setDisplayValue(logic.getCurrentValue())
    }

    const handleSixClicked = () => {
        logic.selectSix()
        setDisplayValue(logic.getCurrentValue())
    }

    const handleSevenClicked = () => {
        logic.selectSeven()
        setDisplayValue(logic.getCurrentValue())
    }

    const handleEightClicked = () => {
        logic.selectEight()
        setDisplayValue(logic.getCurrentValue())
    }

    const handleNineClicked = () => {
        logic.selectNine()
        setDisplayValue(logic.getCurrentValue())
    }

    const handleZeroClicked = () => { // Maneja click del 0
        logic.selectZero() // Llama a la lógica para agregar un cero
        setDisplayValue(logic.getCurrentValue())
    }

    // ---------------- OPERADORES ----------------
    const handleAllClearClicked = () => { // Resetea la calculadora
        logic.clearAll() // Lógica para limpiar todos los valores
        setDisplayValue(logic.getCurrentValue())
    }

    const handleDivideClicked = () => { // Operador división
        logic.selectDivide()
        setDisplayValue(logic.getCurrentValue())
    }

    const handleMultiplyClicked = () => { // Operador multiplicación
        logic.selectMultiply()
        setDisplayValue(logic.getCurrentValue())
    }

    const handleSubtractClicked = () => { // Operador resta
        logic.selectSubtract()
        setDisplayValue(logic.getCurrentValue())
    }

    const handleAddClicked = () => { // Operador suma
        logic.selectAdd()
        setDisplayValue(logic.getCurrentValue())
    }

    // ---------------- RESULTADO ----------------
    const handleResultClicked = () => { // Calcula el resultado final
        logic.calculate() // Llama a la lógica para evaluar la operación
        setDisplayValue(logic.getCurrentValue()) // Muestra el resultado
    }

    // ---------------- BORRAR ----------------
    const handleBackspaceClicked = () => { // Borra último carácter
        logic.selectBackspace()
        setDisplayValue(logic.getCurrentValue())
    }

    // ---------------- COMA DECIMAL ----------------
    const handleCommaClicked = () => { // Agrega una coma decimal
        logic.selectComma()
        setDisplayValue(logic.getCurrentValue())
    }

    // ---------------- CAMBIO DE SIGNO ----------------
    const handleChangeSignClicked = () => { // Cambia el signo del último número
        logic.changeSign()
        setDisplayValue(logic.getCurrentValue())
    }

    console.log('App -> render') // Mensaje en consola en cada render

    // ---------------- JSX ----------------
    return <div className="border-2 m-2 p-2 rounded-2xl bg-gray-800 text-white"> {/* Contenedor principal */}
        <div className="flex justify-end px-4 text-3xl">{displayValue}</div> {/* Display de la calculadora */}

        <div className="p-2 flex flex-col gap-2"> {/* Contenedor de botones */}

            <div className="flex justify-between"> {/* Primera fila: Backspace, AC, %, ÷ */}
                <div className="bg-gray-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleBackspaceClicked}>⌫</div>
                <div className="bg-gray-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleAllClearClicked}>AC</div>
                <div className="bg-gray-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer">%</div>
                <div className="bg-orange-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleDivideClicked}>÷</div>
            </div>

            <div className="flex justify-between"> {/* Segunda fila: 7, 8, 9, × */}
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleSevenClicked}>7</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleEightClicked}>8</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleNineClicked}>9</div>
                <div className="bg-orange-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleMultiplyClicked}>×</div>
            </div>

            <div className="flex justify-between"> {/* Tercera fila: 4, 5, 6, - */}
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleFourClicked}>4</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleFiveClicked}>5</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleSixClicked}>6</div>
                <div className="bg-orange-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleSubtractClicked}>-</div>
            </div>

            <div className="flex justify-between"> {/* Cuarta fila: 1, 2, 3, + */}
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleOneClicked}>1</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleTwoClicked}>2</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleThreeClicked}>3</div>
                <div className="bg-orange-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleAddClicked}>+</div>
            </div>

            <div className="flex justify-between"> {/* Quinta fila: +/-, 0, ',', = */}
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleChangeSignClicked}>+/-</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleZeroClicked}>0</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleCommaClicked}>,</div>
                <div className="bg-orange-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleResultClicked}>=</div>
            </div>

        </div>
    </div>
}