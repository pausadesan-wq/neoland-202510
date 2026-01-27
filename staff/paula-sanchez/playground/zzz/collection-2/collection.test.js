// test add

// case add names
const names = new Collection()
names.add('Juan')
names.add('Sergio')
names.add('Laura')
names.add('Albert')
names.add('Sergio')
// console.log(names)
// Collection { 0: Juan, 1: Sergio, 2: Laura, 3: Albert, 4: Sergio, count: 5 }
console.assert(names.count === 5, 'names.count is 5')
console.assert(names[0] === 'Juan', 'names[0] is Juan')
console.assert(names[1] === 'Sergio', 'names[1] is Sergio')
console.assert(names[2] === 'Laura', 'names[2] is Laura')
console.assert(names[3] === 'Albert', 'names[3] is Albert')
console.assert(names[4] === 'Sergio', 'names[4] is Sergio')

// case add colors
const colors = new Collection()
colors.add('red')
colors.add('green')
colors.add('blue')
// console.log(colors)
// Collection { 0: red, 1: green, 2: blue, count: 3 }
console.assert(colors.count === 3, 'colors.count is 3')
console.assert(colors[0] === 'red', 'colors[0] is red')
console.assert(colors[1] === 'green', 'colors[1] is green')
console.assert(colors[2] === 'blue', 'colors[2] is blue')

// case add numbers
const nums = new Collection()
nums.add(3.141516) // PI
nums.add(666) // (..)
nums.add(2000)
// console.log(nums)
// Collection { 0: 3.141516, 1: 666, 2: 2000, count: 3 }
console.assert(nums.count === 3, 'nums.count is 3')
console.assert(nums[0] === 3.141516, 'nums[0] is 3.141516')
console.assert(nums[1] === 666, 'nums[1] is 666')
console.assert(nums[2] === 2000, 'nums[2] is 2000')

// TODO test remove
// TODO test removeFirst
// TODO test update
// TODO test updateFirst
// TODO test push
// TODO test pop
// TODO test shift
// TODO test includes

// test forEach

// case print fruits
const fruits = new Collection()
fruits[0] = 'Apple'
fruits[1] = 'Banana'
fruits[2] = 'Orange'
fruits.count = 3

const box = []
fruits.forEach(function(fruit) {
    //console.log(fruit)
    box.push(fruit)
})
// console.log(box)
// [ Apple, Banana, Orange ]
console.assert(box.length === 3, 'box length is 3')
console.assert(box[0] === 'Apple', 'box[0] is Apple')
console.assert(box[1] === 'Banana', 'box[1] is Banana')
console.assert(box[2] === 'Orange', 'box[2] is Orange')

// case calculate total
const prices = new Collection()
prices[0] = 150
prices[1] = 30
prices[2] = 45
prices[3] = 25
prices.count = 4

let total = 0

prices.forEach(price => total += price * 1.21)
// console.log(total)
// 302.5
console.assert(total === 302.5, 'total is 302.5')