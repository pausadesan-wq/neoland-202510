// salute

// compact (implicit reference)

/*
function salute(name) {
    return 'Hello, ' + name + '!'
}
*/

// expanded (explicit reference)

/*
var salute = function(name) {
    return 'Hello, ' + name + '!'
}
*/

// short arrow

/*
var salute = (name) => 'Hello, ' + name + '!'
*/

/*
var salute = name => 'Hello, ' + name + '!'
*/

// long arrow

var salute = (name) => {
    return 'Hello, ' + name + '!'
}

// usage

const salutation = salute('Sergio')

console.log(salutation)