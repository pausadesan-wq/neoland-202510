var peter = {
    name: 'Peter'
}

peter.salute = function(to) {
    //return peter.name + ': Hello, ' + to + '!'
    return this.name + ': Hello, ' + to + '!'
}

// usar mejor this, ya que es más corto, en vez de mencionar peter. Así si queremos cambiar el nombre del objeto, es más sencillo

var petro = peter

petro.name = 'Petro'

peter = undefined

// como queremos eliminar el objeto peter y reemplazarlo por petro, ponemos peter como undefined

console.log(petro.salute('Wendy'))
// Peter: Hello, Wendy!

console.log(petro.salute('James'))
// Peter: Hello, James!


var wendy = {
    name: 'Wendy'
}

wendy.salute = petro.salute

console.log(wendy.salute('Petro'))
// Wendy: Hello, Petro!

console.log(wendy.salute('James'))
// Wendy: Hello, James!

/*

STACK (objeto)
name       value
---------------------
peter      undefined
petro      @1
wendy      @3


HEAP
ref        value
----------------------
@1         { name: 'Petro', salute: @2 }
@2         f (to) { ... }
@3         { name: 'Wendy', salute: @2 }

*/