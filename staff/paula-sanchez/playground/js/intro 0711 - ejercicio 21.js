/*
Armando una lista de super

Crea un array vacio que se llame listaDeSuper.
Piensa como le puedes pedir al usuario para que ingrese al menos 5 productos para llenar la lista de super.
Muestra por la consola los productos introducidos por el usuario.
*/

var listaDeSuper = [];

for (var i = 0; i < 5; i++) {
    listaDeSuper[i] = prompt('Ingrese productos: ');
}

console.log(listaDeSuper);


/*for (var i=0; i < 5); i++){
    listaDeSuper.push(prompt('Ingrese productos: '));
}

console.log(listaDeSuper);


/*
LUEGO DE ESTO:

var listaDeSuper = [];

var producto = '';

while( producto !== "stop"){
producto = prompt("Ingrese un producto: ");
listaDeSuper.push(producto);
}
*/