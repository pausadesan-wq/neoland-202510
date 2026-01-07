const root = ReactDOM.createRoot(document.getElementById('root')) // Crea el root del DOM donde React montará la app
root.render(<App />) // Renderiza el componente principal App dentro del root

const useState = React.useState // Alias de React.useState para abreviar llamadas al hook

function App() { // Componente principal, React lo ejecuta cada vez que el estado cambia
    const displayState = useState('0') // Hook de estado: valor inicial '0' y función setter
    const displayValue = displayState[0] // Valor actual mostrado en la calculadora
    const setDisplayValue = displayState[1] // Función que actualiza el estado y provoca re-render

    //esto sería la función base

    // ---------------- NÚMEROS ----------------
    const handleOneClicked = () => { // Maneja click del 1
        if (displayValue === '0') // Si solo hay 0
            setDisplayValue('1') // Reemplaza por 1
        else {
            const newValue = displayValue + '1' // Concatena 1 al final
            setDisplayValue(newValue) // Actualiza el estado
        }
    }

    const handleTwoClicked = () => { // Maneja click del 2
        if (displayValue === '0')
            setDisplayValue('2')
        else {
            const newValue = displayValue + '2'
            setDisplayValue(newValue)
        }
    }

    const handleThreeClicked = () => { // Maneja click del 3
        if (displayValue === '0')
            setDisplayValue('3')
        else {
            const newValue = displayValue + '3'
            setDisplayValue(newValue)
        }
    }

    const handleFourClicked = () => { // Maneja click del 4
        if (displayValue === '0')
            setDisplayValue('4')
        else {
            const newValue = displayValue + '4'
            setDisplayValue(newValue)
        }
    }

    const handleFiveClicked = () => { // Maneja click del 5
        if (displayValue === '0')
            setDisplayValue('5')
        else {
            const newValue = displayValue + '5'
            setDisplayValue(newValue)
        }
    }

    const handleSixClicked = () => { // Maneja click del 6
        if (displayValue === '0')
            setDisplayValue('6')
        else {
            const newValue = displayValue + '6'
            setDisplayValue(newValue)
        }
    }

    const handleSevenClicked = () => { // Maneja click del 7
        if (displayValue === '0')
            setDisplayValue('7')
        else {
            const newValue = displayValue + '7'
            setDisplayValue(newValue)
        }
    }

    const handleEightClicked = () => { // Maneja click del 8
        if (displayValue === '0')
            setDisplayValue('8')
        else {
            const newValue = displayValue + '8'
            setDisplayValue(newValue)
        }
    }

    const handleNineClicked = () => { // Maneja click del 9
        if (displayValue === '0')
            setDisplayValue('9')
        else {
            const newValue = displayValue + '9'
            setDisplayValue(newValue)
        }
    }

    const handleZeroClicked = () => { // Maneja click del 0 evitando múltiples ceros iniciales
        if (displayValue !== '0') {
            const newValue = displayValue + '0'
            setDisplayValue(newValue)
        }
    }

    // ---------------- OPERADORES ----------------
    const handleAllClearClicked = () => setDisplayValue('0') // Resetea el display a 0
    const handleDivideClicked = () => setDisplayValue(displayValue + '÷') // Añade símbolo división
    const handleMultiplyClicked = () => setDisplayValue(displayValue + '×') // Añade símbolo multiplicación
    const handleSubtractClicked = () => setDisplayValue(displayValue + '-') // Añade símbolo resta
    const handleAddClicked = () => setDisplayValue(displayValue + '+') // Añade símbolo suma

    // ---------------- RESULTADO ----------------
    const handleResultClicked = () => { // Calcula el resultado final
        const operation = displayValue.replaceAll('÷', '/').replaceAll('×', '*') // Convierte símbolos a operadores JS
        const result = eval(operation) // Evalúa la operación
        const newValue = String(result) // Convierte resultado a string
        setDisplayValue(newValue) // Actualiza el estado
    }

    // ---------------- BORRAR ----------------
    const handleBackspaceClicked = () => { // Borra último carácter
        if (displayValue.length === 1) {
            if (displayValue === '0') return
            else setDisplayValue('0')
        } else {
            const newValue = displayValue.slice(0, displayValue.length - 1)
            setDisplayValue(newValue)
        }
    }

    // ---------------- COMA DECIMAL ----------------
    const handleCommaClicked = () => {
        const lastCharacter = displayValue.at(-1)
        if (lastCharacter === ',') return

        const lastIndexOfDivide = displayValue.lastIndexOf('÷')
        const lastIndexOfMultiply = displayValue.lastIndexOf('×')
        const lastIndexOfSubtract = displayValue.lastIndexOf('-')
        const lastIndexOfAdd = displayValue.lastIndexOf('+')

        const lastIndexOfOperation = Math.max(lastIndexOfDivide, lastIndexOfMultiply, lastIndexOfSubtract, lastIndexOfAdd)

        const lastIndex = displayValue.length - 1

        let newValue

        if (lastIndexOfOperation === lastIndex) newValue = displayValue + '0,'
        else if (lastIndexOfOperation === -1) {
            if (displayValue.includes(',')) return
            newValue = displayValue + ','
        } else {
            const lastOperand = displayValue.slice(lastIndexOfOperation + 1)
            if (lastOperand.includes(',')) return
            newValue = displayValue + ','
        }

        setDisplayValue(newValue)
    }

    // ---------------- CAMBIO DE SIGNO ----------------
    const handleChangeSignClicked = () => {
        // Convierte el último número en positivo o negativo usando paréntesis

        /* ANTIGUO

        const lastIndexOfDivide = displayValue.lastIndexOf('÷')
        const lastIndexOfMultiply = displayValue.lastIndexOf('×')
        const lastIndexOfSubtract = displayValue.lastIndexOf('-')
        const lastIndexOfAdd = displayValue.lastIndexOf('+')

        const lastIndexOfOperation = Math.max(lastIndexOfDivide, lastIndexOfMultiply, lastIndexOfSubtract, lastIndexOfAdd)

        let newValue

        if (lastIndexOfOperation === -1) {
            if (displayValue === '0') return

            if (!displayValue.includes('(')) {
                newValue = '(-' + displayValue + ')'
            } else {
                const operand = displayValue.slice(2, displayValue.length - 1)

                newValue = operand
            }
        }
        setDisplayValue(newValue)
        */
        const operands = []
        const operators = []
        let operand = ''

        for (let i = 0; i < displayValue.length; i++) {
            const char = displayValue[i]
            const prevChar = displayValue[i - 1]

            if (char === '-' && prevChar !== '(' || char === '+' || char === '÷' || char === '×') {
                operands.push(operand)
                operators.push(char)
                operand = ''
            } else {
                operand += char
                if (i === displayValue.length - 1) operands.push(operand)
            }
        }

        if (operands.length === operators.length) return

        let lastOperand = operands.at(-1)
        if (lastOperand === '0') return

        if (lastOperand.includes('(')) lastOperand = lastOperand.slice(2, -1)
        else lastOperand = '(-' + lastOperand + ')'

        operands[operands.length - 1] = lastOperand

        let newValue = ''
        for (let i = 0; i < operands.length; i++) {
            const operand = operands[i]
            newValue += operand
            const operator = operators[i]
            if (operator) newValue += operator
        }

        setDisplayValue(newValue)
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