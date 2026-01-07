var alumnos = []

alumnos[0] = {nombre: 'Juan', edad: 34, series:['The Big Bang Theory','Peaky Blinders','Game of Thrones']}
alumnos[1] = {nombre: 'Laura', edad: 30, series:['Mindhunter','Narcos','Monstruos']}
alumnos[2] = {nombre: 'Albert', edad: 36, series:['Avatar','Outlander','One Piece']}
alumnos[3] = {nombre:'Jodlin', edad: 45, series:['Two and half men','Aqui no hay quien viva','La que se avecina']}
alumnos[4] = {nombre: 'Paula', edad: 32, series:['Breaking Bad','The Boys','Attack On Titans']}
alumnos[5] = {nombre:'Manuel', edad: 15, series:[]}
alumnos[6] = {nombre:'Jorge', edad: 32, series:['The Office','One Piece','Ted Lasso']}
alumnos[7] = {nombre:'Sergio', edad:30, series:['Pose','Attack on Titans', 'Severance']}
alumnos[8] = {nombre:'Rodolfo', edad: 36, series:['Fringe','How I met your mother']}
alumnos[9] = {nombre:'Stephanny', edad: 27, series:['Greys Anatomy', 'House of Dragon', 'Friends']}
alumnos[10] = {nombre:'Agustin', edad: 23, series:['Sobrenatural','Perdidos','Hajime no ippo']}
alumnos[11] = {nombre:'Patricia', edad: 23, series:['Girls', 'Sex and the City', 'The Handmaid\'s Tale']}
alumnos[12] = {nombre: 'Ibra', edad: 18, series:['Lupin']}

var suma = 0

for ( var i = alumnos.length-1; i >= 0; i-- ) {
    console.log( 'Nombre: ' + alumnos[i].nombre.toLowerCase() + ' Edad: ' + '('+ alumnos[i].edad + ')' )
    for(var j=0;j < alumnos[i].series.length; j++ ){
        console.log('Series : ' + alumnos[i].series[j])
    }
    suma += alumnos[i].edad
}


console.log(suma)



console.log('The end')