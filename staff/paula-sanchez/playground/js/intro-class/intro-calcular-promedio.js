var notas = [4.9, 9.5, 7.5, 8.2, 10, 0, 3.5, 9.9]

var suma = 0

var promedio = 0

for (var i = 0; i < notas.length; i++) {
    suma += notas[i]
} 

promedio = suma / notas.length

console.log(promedio)