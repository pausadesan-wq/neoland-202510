// "structuring"

/*
const name = 'Pepito'
const age = 20
const country = 'Italy'
*/

let name = 'Pepito'
let age = 20
let country = 'Italy'

/*
const pepito = {}
pepito.name = name
pepito.age = age
pepito.country = country
*/

/*
const pepito = {
    name: name,
    age: age,
    country: country
}
*/

/*
const pepito = {
    name,
    age,
    country
}
*/

const pepito = { name, age, country }
console.log(pepito)

name = 'Campanilla'
age = 19
country = 'Neverland'

const campanilla = { name, age, country }
console.log(campanilla)