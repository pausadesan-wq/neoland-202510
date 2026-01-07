// destructuring

const pepito = {
    name: 'Pepito',
    age: 20,
    country: 'Italy'
}
console.log(pepito)

/*
const name = pepito.name
const age = pepito.age
const country = pepito.country
*/

//const { name, age, country } = pepito
//console.log(name, age, country)

//const { name, country } = pepito
//const { country, name } = pepito
//console.log(name, country)

const { country: pais, age: edad } = pepito
console.log(pais, edad)