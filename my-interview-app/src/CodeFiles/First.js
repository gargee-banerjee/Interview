
// 'use strict';
// //=====HOISTING========HOISTING========HOISTING============HOISTING=========HOISTING========HOISTING========HOISTING==


// console.log(a);
// a = 1; // a is not declared anywhere
// //====================================================================

var foo = 10;

function foo() {
    console.log('I am a function');
}

// console.log(foo);
// //====================================================================
if (true) {
    function test() {
        console.log('Inside function');
    }
}

// test();
// In most JavaScript engines, function declarations inside blocks (if, for, etc.) 
//are hoisted to the top of their enclosing scope, making them available outside of the block. 


//====================================================================

function hoisting(){
    hosta ="Hosta";
}
hoisting();
// console.log(hosta)
//====================================================================

if(true){
    var a =10;// Globally scoped
    let b =10;//Block scoped
    const c =10;//Block scoped
}
// console.log(a)
console.log(b)
// console.log(c)
//====================================================================

