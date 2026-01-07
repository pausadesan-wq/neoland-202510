class Logic {
    constructor() {} // Constructor vacío (por ahora no necesita inicialización)

    // ---------------- NÚMEROS ----------------
    selectOne() { // Selecciona el número 1
        if (data.getValue() === '0') // Si el display solo tiene '0'
            data.setValue('1')       // Reemplaza por '1'
        else 
            data.setValue(data.getValue() + '1') // Concatena '1' al final
    }

    selectTwo() { // Selecciona el número 2
        if (data.getValue() === '0')
            data.setValue('2')
        else 
            data.setValue(data.getValue() + '2')
    }

    selectThree() { // Selecciona el número 3
        if (data.getValue() === '0')
            data.setValue('3')
        else 
            data.setValue(data.getValue() + '3')
    }

    selectFour() { // Selecciona el número 4
        if (data.getValue() === '0')
            data.setValue('4')
        else 
            data.setValue(data.getValue() + '4')
    }

    selectFive() { // Selecciona el número 5
        if (data.getValue() === '0')
            data.setValue('5')
        else 
            data.setValue(data.getValue() + '5')
    }

    selectSix() { // Selecciona el número 6
        if (data.getValue() === '0')
            data.setValue('6')
        else 
            data.setValue(data.getValue() + '6')
    }

    selectSeven() { // Selecciona el número 7
        if (data.getValue() === '0')
            data.setValue('7')
        else 
            data.setValue(data.getValue() + '7')
    }

    selectEight() { // Selecciona el número 8
        if (data.getValue() === '0')
            data.setValue('8')
        else 
            data.setValue(data.getValue() + '8')
    }

    selectNine() { // Selecciona el número 9
        if (data.getValue() === '0')
            data.setValue('9')
        else 
            data.setValue(data.getValue() + '9')
    }

    selectZero() { // Selecciona el número 0 evitando ceros iniciales múltiples
        if (data.getValue() !== '0') 
            data.setValue(data.getValue() + '0')
    }

    // ---------------- OPERADORES ----------------
    clearAll() { // Resetea el display
        data.setValue('0')
    }

    selectDivide() { // Añade operador división
        data.setValue(data.getValue() + '÷')
    }

    selectMultiply() { // Añade operador multiplicación
        data.setValue(data.getValue() + '×')
    }

    selectSubtract() { // Añade operador resta
        data.setValue(data.getValue() + '-')
    }

    selectAdd() { // Añade operador suma
        data.setValue(data.getValue() + '+')
    }

    // ---------------- RESULTADO ----------------
    calculate() { // Calcula la operación
        const operation = data.getValue().replaceAll('÷', '/').replaceAll('×', '*') // Convierte símbolos a JS
        const result = eval(operation) // Evalúa la operación
        const newValue = String(result) // Convierte a string
        data.setValue(newValue) // Actualiza el display
    }

    // ---------------- BORRAR ----------------
    selectBackspace() { // Borra el último carácter
        if (data.getValue().length === 1) {
            if (data.getValue() === '0') return // No hace nada si solo hay '0'
            else data.setValue('0') // Si hay un solo número, lo resetea a '0'
        } else {
            const newValue = data.getValue().slice(0, -1) // Quita último carácter
            data.setValue(newValue)
        }
    }

    // ---------------- COMA DECIMAL ----------------
    selectComma() { // Añade una coma decimal
        const lastCharacter = data.getValue().at(-1)
        if (lastCharacter === ',') return // Evita coma duplicada

        // Encuentra la posición del último operador
        const lastIndexOfDivide = data.getValue().lastIndexOf('÷')
        const lastIndexOfMultiply = data.getValue().lastIndexOf('×')
        const lastIndexOfSubtract = data.getValue().lastIndexOf('-')
        const lastIndexOfAdd = data.getValue().lastIndexOf('+')
        const lastIndexOfOperation = Math.max(lastIndexOfDivide, lastIndexOfMultiply, lastIndexOfSubtract, lastIndexOfAdd)

        const lastIndex = data.getValue().length - 1
        let newValue

        if (lastIndexOfOperation === lastIndex) newValue = data.getValue() + '0,'
        else if (lastIndexOfOperation === -1) { // No hay operadores
            if (data.getValue().includes(',')) return // Evita coma duplicada
            newValue = data.getValue() + ','
        } else { // Extrae el último operando y verifica si ya tiene coma
            const lastOperand = data.getValue().slice(lastIndexOfOperation + 1)
            if (lastOperand.includes(',')) return
            newValue = data.getValue() + ','
        }

        data.setValue(newValue)
    }

    // ---------------- CAMBIO DE SIGNO ----------------
    changeSign() { // Cambia el signo del último número
        const operands = [] // Array de operandos
        const operators = [] // Array de operadores
        let operand = ''

        // Separa la expresión en operandos y operadores
        for (let i = 0; i < data.getValue().length; i++) {
            const char = data.getValue()[i]
            const prevChar = data.getValue()[i - 1]

            if (char === '-' && prevChar !== '(' || char === '+' || char === '÷' || char === '×') {
                operands.push(operand)
                operators.push(char)
                operand = ''
            } else {
                operand += char
                if (i === data.getValue().length - 1) operands.push(operand)
            }
        }

        if (operands.length === operators.length) return // No hay último operando

        let lastOperand = operands.at(-1)
        if (lastOperand === '0') return // No cambia signo si es 0

        if (lastOperand.includes('(')) lastOperand = lastOperand.slice(2, -1) // Quita paréntesis si negativo
        else lastOperand = '(-' + lastOperand + ')' // Envuelve en negativo

        operands[operands.length - 1] = lastOperand

        // Reconstruye la expresión
        let newValue = ''
        for (let i = 0; i < operands.length; i++) {
            newValue += operands[i]
            if (operators[i]) newValue += operators[i]
        }

        data.setValue(newValue)
    }

    // ---------------- GETTER ----------------
    getCurrentValue() { // Devuelve el valor actual del display
        return data.getValue()
    }
}

// instance
const logic = new Logic() // Instancia única de la lógica