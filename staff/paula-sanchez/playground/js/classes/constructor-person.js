function Person(name, age) {
    this.name = name
    this.age = age
}

Person.prototype.talk = function(what) {
    return this.name + ': ' + what
}

Person.prototype.walk = function(km) {
    return this.name + ': 👟 ... ' + km + 'km'
}

const lau = new Person('Lau', 24)
const pau = new Person('Pau', 23)

console.log(lau)
console.log(pau)

console.log(lau.talk('maldito código!'))
// Lau: maldito código!
console.log(lau.talk('que bonito dia hace hoy'))
// Lau: que bonito dia hace hoy

console.log(pau.walk(10))
// Pau: 👟 ... 10km