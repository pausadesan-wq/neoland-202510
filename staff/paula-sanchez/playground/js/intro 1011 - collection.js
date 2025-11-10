var collection = {
    count: 0
}

// similar a un array, sin serlo, ya que vamos a usar objetos
// length ---> array   count ---> contador

// TODO implement method add

collection.add = function(item) {
    this[this.count] = item
    this.count++
}

collection.add('Peter')
console.log(collection)
// { 0: 'Peter', count: 1}

collection.add('Wendy')
console.log(collection)
// { 0: 'Peter', 1: 'Wendy', count: 2}

coleccion.add('James')
console.log(collection)
// { 0: 'Peter', 1: 'Wendy', 2: 'James', count: 3}