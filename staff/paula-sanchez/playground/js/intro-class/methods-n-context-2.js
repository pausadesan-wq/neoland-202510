var peter = {
    name: 'Peter'
}

peter.salute = function(to) {
    return this.name + ': Hello, ' + to.name + '!'
}

var wendy = {
    name: 'Wendy'
}

wendy.salute = peter.salute

var james = {
    name: 'James'
}

james.salute = wendy.salute

console.log(peter.salute(wendy))
// Peter: Hello, Wendy!

console.log(wendy.salute(james))
// Wendy: Hello, James!

console.log(james.salute(peter))
// James: Hello, Peter!

// para que funcione esto, hay que cambiar el to arriba (to.name), ya que ahora es una referencia al objeto

/*

STACK
name       value
---------------------
peter      @1
wendy      @3
james      @4


HEAP
ref        value
----------------------
@1         { name: 'Petro', salute: @2 }
@2         f (to) { ... }
@3         { name: 'Wendy', salute: @2 }
@4         { name: 'James', salute: @2 }

*/