var collection = {
    count: 0
}

// similar a un array, sin serlo, ya que vamos a usar objetos 
// (propiedades numéricas (0, 1, 2, …) para guardar elementos, 
// y count hace de “longitud”).
// length ---> array   count ---> contador

// TODO implement add method

collection.add = function(item) {
    this[this.count] = item
    this.count++
}

// TODO implement remove method
collection.remove = function(item) { // item = "Wendy"
    // recorremos todos los elementos
    for (var i = 0; i < this.count; i++) {
        // si encontramos el item, lo eliminamos
        if (this[i] === item) {  
            delete this[i]
        }
    }
}

// SIGNIFICADO DE LOS IGUALES:
// =  ---> asignación. Sirve para dar un valor a una variable o propiedad.
// == ---> comparación con conversión de tipo. Compara si dos valores son iguales, pero sin importar el tipo.
// === ---> comparación estricta. Compara valor y tipo (sin convertir nada). Solo devuelve true si ambos son iguales y del mismo tipo.

/* 
EJEMPLO PARA LOS IGUALES:

collection.add(1000)
collection.add('2000') --- para cuando se pone arriba ==
collection.add(2000)

console.log(collection)

collection.remove('2000')  // elimina solo el que coincide en tipo y valor (si usamos ===)
console.log(collection)
*/

// elimina solo la primera coincidencia
collection.removeFirst = function(item) {
    for (var i = 0; i < this.count; i++) {
        if (this[i] === item) {
            delete this[i]
            return
        }
    }
}

// pruebas
collection.add('Peter')
console.log(collection)
// { 0: 'Peter', count: 1}

collection.add('Wendy')
console.log(collection)
// { 0: 'Peter', 1: 'Wendy', count: 2}

collection.add('James')
console.log(collection)
// { 0: 'Peter', 1: 'Wendy', 2: 'James', count: 3}

collection.remove('Wendy')
console.log(collection)
// { 0: 'Peter', 2: 'James', count: 3}

// EJERCICIO 11-11-2025

collection.removeFirst('Wendy')
console.log(collection)

collection.add('Wendy')
collection.add('Pepito')
collection.add('Wendy')

collection.removeFirst = function (item) {
    for (var i = 0; i < this.count; i++) {
        if (this[i] === item) {
            delete this[i]
            return
        }
    }
}

// TODO implement remove method
// forma más avanzada --> collection.update = function (src, update){

collection.update = function (target, replacement){
    for (var i = 0; i < this.count; i++)
        if (this[i] === target)
            this[i] = replacement
}

collection.update('Pepito', 'Jiminy')
console.log(collection)

// src --> src (source), el valor original a buscar. Es el elemento que quieres reemplazar dentro de la colección.
// update --> es el nuevo valor con el que lo sustituyes.
