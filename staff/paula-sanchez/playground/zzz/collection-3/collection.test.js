const { assert } = console

// TEST add

// CASE add names
{
    const names = new Collection()
    names.add('Juan')
    names.add('Sergio')
    names.add('Laura')
    names.add('Albert')
    names.add('Sergio')
    // log(names)
    // Collection { 0: Juan, 1: Sergio, 2: Laura, 3: Albert, 4: Sergio, count: 5 }
    assert(names.count === 5, 'names.count is 5')
    assert(names[0] === 'Juan', 'names[0] is Juan')
    assert(names[1] === 'Sergio', 'names[1] is Sergio')
    assert(names[2] === 'Laura', 'names[2] is Laura')
    assert(names[3] === 'Albert', 'names[3] is Albert')
    assert(names[4] === 'Sergio', 'names[4] is Sergio')
}

// CASE add colors
{
    const colors = new Collection()
    colors.add('red')
    colors.add('green')
    colors.add('blue')
    // log(colors)
    // Collection { 0: red, 1: green, 2: blue, count: 3 }
    assert(colors.count === 3, 'colors.count is 3')
    assert(colors[0] === 'red', 'colors[0] is red')
    assert(colors[1] === 'green', 'colors[1] is green')
    assert(colors[2] === 'blue', 'colors[2] is blue')
}

// CASE add numbers
{
    const nums = new Collection()
    nums.add(3.141516) // PI
    nums.add(666) // (..)
    nums.add(2000)
    // log(nums)
    // Collection { 0: 3.141516, 1: 666, 2: 2000, count: 3 }
    assert(nums.count === 3, 'nums.count is 3')
    assert(nums[0] === 3.141516, 'nums[0] is 3.141516')
    assert(nums[1] === 666, 'nums[1] is 666')
    assert(nums[2] === 2000, 'nums[2] is 2000')
}

// TODO TEST remove
// TODO TEST removeFirst
// TODO TEST update
// TODO TEST updateFirst
// TODO TEST push
// TODO TEST pop
// TODO TEST shift
// TODO TEST includes

// TEST forEach

// CASE print fruits
{
    const fruits = new Collection()
    fruits[0] = 'Apple'
    fruits[1] = 'Banana'
    fruits[2] = 'Orange'
    fruits.count = 3

    const box = []
    fruits.forEach(function (fruit) {
        //log(fruit)
        box.push(fruit)
    })
    // log(box)
    // [ Apple, Banana, Orange ]
    assert(box.length === 3, 'box length is 3')
    assert(box[0] === 'Apple', 'box[0] is Apple')
    assert(box[1] === 'Banana', 'box[1] is Banana')
    assert(box[2] === 'Orange', 'box[2] is Orange')
}

// CASE calculate total
{
    const prices = new Collection()
    prices[0] = 150
    prices[1] = 30
    prices[2] = 45
    prices[3] = 25
    prices.count = 4

    let total = 0

    prices.forEach(price => total += price * 1.21)
    // log(total)
    // 302.5
    assert(total === 302.5, 'total is 302.5')
}

// TEST map

// CASE names to uppercase
{
    const names = new Collection()
    names[0] = 'Rodolfo'
    names[1] = 'Serito'
    names[2] = 'Agus'
    names[3] = 'Albert'
    names[4] = 'Juanico'
    names.count = 5

    const namesInUppercase = names.map(name => name.toUpperCase())
    assert(namesInUppercase.count === 5, 'namesInUppercase.count is 5')
    assert(namesInUppercase[0] === 'RODOLFO', 'namesInUppercase[0] is RODOLFO')
    assert(namesInUppercase[1] === 'SERITO', 'namesInUppercase[1] is SERITO')
    assert(namesInUppercase[2] === 'AGUS', 'namesInUppercase[2] is AGUS')
    assert(namesInUppercase[3] === 'ALBERT', 'namesInUppercase[3] is ALBERT')
    assert(namesInUppercase[4] === 'JUANICO', 'namesInUppercase[4] is JUANICO')
}

// CASE arrays to objects
{
    const arrayVehicles = new Collection()
    arrayVehicles[0] = ['seat', 'ibiza', 2001]
    arrayVehicles[1] = ['ford', 'fiesta', 2005]
    arrayVehicles[2] = ['citroen', 'c3', 2010]
    arrayVehicles.count = 3

    const objectVehicles = arrayVehicles.map(arrayVehicle => {
        const objectVehicle = {}
        objectVehicle.brand = arrayVehicle[0]
        objectVehicle.model = arrayVehicle[1]
        objectVehicle.year = arrayVehicle[2]

        return objectVehicle
    })

    assert(objectVehicles.count === 3, 'objectVehicles.length is 3')
    const car0 = objectVehicles[0]
    assert(car0.constructor === Object, 'car0.constructor is Object')
    assert(Object.keys(car0).length === 3, 'car0 has 3 properties (keys)')
    assert(car0.brand === 'seat', 'car0.brand is seat')
    assert(car0.model === 'ibiza', 'car0.model is ibiza')
    assert(car0.year === 2001, 'car0.year is 2001')
    const car1 = objectVehicles[1]
    assert(car1.constructor === Object, 'car1.constructor is Object')
    assert(Object.keys(car1).length === 3, 'car1 has 3 properties (keys)')
    assert(car1.brand === 'ford', 'car1.brand is ford')
    assert(car1.model === 'fiesta', 'car1.model is fiesta')
    assert(car1.year === 2005, 'car1.year is 2005')
    const car2 = objectVehicles[2]
    assert(car2.constructor === Object, 'car2.constructor is Object')
    assert(Object.keys(car2).length === 3, 'car2 has 3 properties (keys)')
    assert(car2.brand === 'citroen', 'car2.brand is citroen')
    assert(car2.model === 'c3', 'car2.model is c3')
    assert(car2.year === 2010, 'car2.year is 2010')
}

// TEST filter

// CASE colors with character o
{
    const colors = new Collection()
    colors[0] = 'red'
    colors[1] = 'brown'
    colors[2] = 'blue'
    colors[3] = 'black'
    colors[4] = 'yellow'
    colors[5] = 'orange'
    colors.count = 6

    const colorsWithO = colors.filter(color => color.includes('o'))

    assert(colorsWithO.count === 3, 'colorsWithO.count is 3')
    assert(colorsWithO[0] === 'brown', 'colorsWithO[0] is brown')
    assert(colorsWithO[1] === 'yellow', 'colorsWithO[1] is yellow')
    assert(colorsWithO[2] === 'orange', 'colorsWithO[2] is orange')
}

// CASE clients with surname Garcia
{
    const clients = new Collection()
    clients[0] = { name: 'Pepito', surname: 'Grillo', balance: 1000 }
    clients[1] = { name: 'Juan', surname: 'Garcia', balance: 600 }
    clients[2] = { name: 'Peter', surname: 'Pan', balance: 1010 }
    clients[3] = { name: 'Antonio', surname: 'Garcia', balance: 3000 }
    clients[4] = { name: 'Manuel', surname: 'Lopez', balance: 5000 }
    clients[5] = { name: 'Jorge', surname: 'Grillo', balance: 6000 }
    clients[6] = { name: 'Gerardo', surname: 'Martinez', balance: 10000 }
    clients[7] = { name: 'Juan', surname: 'Jimenez', balance: 9000 }
    clients[8] = { name: 'Jaime', surname: 'Garcia', balance: 7000 }
    clients.count = 9

    const garcias = clients.filter(client => client.surname === 'Garcia')

    assert(garcias.count === 3, 'garcias.count is 3')
    assert(garcias[0].name === 'Juan' && garcias[0].surname === 'Garcia' && garcias[0].balance === 600, '0 is Juan Garcia (600)')
    assert(garcias[1].name === 'Antonio' && garcias[1].surname === 'Garcia' && garcias[1].balance === 3000, '1 is Antonio Garcia (3000)')
    assert(garcias[2].name === 'Jaime' && garcias[2].surname === 'Garcia' && garcias[2].balance === 7000, '2 is Jaime Garcia (7000)')
}