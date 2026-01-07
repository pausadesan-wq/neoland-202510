// destructuring

const data = [ 'Hola, Mundo!', 2026, true, {}, null ]
console.log(data)

/*
const salute = data[0]
const year = data[1]
const boolean = data[2]
const object = data[3]
const nvll = data[4]
*/

//const [ salute, year, boolean, object, nvll ] = data

//const [ year, salute, boolean, object, nvll ] = data

// console.log(salute, year, boolean, object, nvll)


/*
const [ salute, , , object ] = data
console.log(salute, object)
*/

/*
const [ salute, , boolean, , nvll ] = data
console.log(salute, boolean, nvll)
*/

//const [,,,,nvll] = data
//const nvll = data[data.length - 1]
//console.log(nvll)

const { 0: salute, 4: nvll } = data
console.log(salute, nvll)