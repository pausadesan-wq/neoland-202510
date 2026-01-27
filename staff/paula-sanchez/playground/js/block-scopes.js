// FAIL definition collision
/*
const a = 1
console.log(a)    

const a = 2
console.log(a)    
*/

// SUCCESS with block scopes

{
    const a = 1
    console.log(a)    
}

{
    const a = 2
    console.log(a)    
}