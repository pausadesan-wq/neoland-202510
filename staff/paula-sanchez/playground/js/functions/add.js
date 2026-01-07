// add operations for numbers

// compact (implicit reference)

/*
function add(a, b) {
    return a + b
}
*/

// expanded (explicit reference)

/*
var add = function(a, b) {
    return a + b
}
*/

// arrow (short)

/*
var add = (a, b) => a + b
*/

// arrow (long)

var add = (a, b) => {
    return a + b
}

// usage

var result = add(123, 456)

console.log(result)