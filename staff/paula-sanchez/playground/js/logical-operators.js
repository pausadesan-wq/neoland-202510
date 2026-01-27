function yes() { 
    console.log('yes')
    
    return true 
} 

function no() {
    console.log('no')

    return false
}

// intersection

// 1 x 1 = 1
// true && true => true
// yes() && yes()

// 1 x 0 = 0
// true && false => false
// yes() && no()

// 0 x 1 = 0
// false && true => false
// no() && yes()

// 0 x 0 = 0
// false && false => false
// no() && no()

// union

// 1 + 1 = 1
// true || true => true
// yes() || yes()

// 1 + 0 = 1
// true || false => true
// yes() || no()

// 0 + 1 = 1
// false || true => true
// no() || yes()

// 0 + 0 = 0
// false || false => false
// no() || no()