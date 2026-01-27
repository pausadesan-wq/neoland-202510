console.clear()

//const list = 'shoes nike 120€\nbike specialized 900€\nbackpack vans 60€'
const list = `shoes nike 120€
nike specialized 900€
backpack vans 60€`
console.log(list)

const lines = list.split('\n')
console.log(lines)

const cart = lines.map(line => {
    const parts = line.split(' ')

    const description = parts[0]
    const brand = parts[1]
    const price = Number(parts[2].slice(0, -1))

    return { description, brand, price }
})
console.log(cart)

const total = cart.reduce((accum, product) => {
    return accum + product.price
}, 0)
console.log(total)

// or use method-chaining

const totalAgain = list.split('\n')
    .map(line => {
        const parts = line.split(' ')
    
        const description = parts[0]
        const brand = parts[1]
        const price = Number(parts[2].slice(0, -1))
    
        return { description, brand, price }
    })
    .reduce((accum, product) => {
        return accum + product.price
    }, 0)
console.log(totalAgain)