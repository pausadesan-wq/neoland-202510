/*
Encontrar el índice de un elemento del Array

Crea un array que se llame toDoList con al menos 5 tareas para hacer.
A través del método indexOf() encontrar el indice de una de las 5 tareas especificadas en el array.
Borrar el item del array toDoList, que ha sido devuelto por el método indexOf().
*/

var toDoList = ['hacer la comida', 'poner la lavadora', 'estudiar js', 'regar las plantas', 'descansar el finde'];

//console.log(toDoList.indexOf('regar las plantas'));

//toDoList.splice(toDoList.indexOf('regar las plantas'),1);

var indice = toDoList.indexOf('descansar el finde');

toDoList.splice(indice,1);

console.log(toDoList);