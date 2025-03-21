// // console.log("Hey!");

// const radius = [2, 5, 7, 9];

// const area = (r) => {
//   return Math.floor(Math.PI * r * r);
// };
// const circumference = (r) => {
//   return Math.floor(2 * Math.PI * r);
// };

// const calculate = (logic) => {
//   let output = [];
//   for (let i = 0; i < radius.length; i++) {
//     output.push(logic(radius[i]));
//   }
//   return output;
// };

// // const calculateCir = () => {
// //   let output = [];
// //   for (let i = 0; i < radius.length; i++) {
// //     output.push(Math.floor(2 * Math.PI * radius[i]));
// //   }
// //   return output;
// // };

// console.log(calculate(area));
// console.log(calculate(circumference));
// const areaArr = radius.map(area);
// console.log(areaArr);

const radius = [1, 2, 3, 4, 5];

const toBinary = (num) => {
  return num.toString(2);
};

const isOdd = (num) => {
  return num % 2;
};

const output = radius.filter(isOdd);
// console.log(output);

const ro = radius.reduce((ac, n) => {
  return (ac += n);
}, 0);
const ro1 = radius.reduce((max, n) => {
  if (n > max) {
    max = n;
  }
  return max;
}, -23);
// console.log(ro1);

const users = [
  { firstName: "John", lastName: "Cena", age: 45 },
  { firstName: "Tina", lastName: "Cena", age: 40 },
  { firstName: "Huka", lastName: "Katroi", age: 40 },
  { firstName: "Hioka", lastName: "Kaoi", age: 25 },
  { firstName: "Poka", lastName: "roi", age: 35 },
];

const ro2 = users.reduce((output, obj) => {
  if (output[obj.age]) {
    output[obj.age] = output[obj.age]++;
  } else {
    output[obj.age] = 1;
  }
  return output;
}, {});

// console.log(ro2);

const ro3 = users
  .filter((obj) => {
    return obj.age <= 40;
  })
  .map((obj) => {
    return obj.firstName;
  });

const ro4 = users.reduce((output, obj) => {
  if (obj.age <= 40) {
    output.push(obj.firstName);
  }
  return output;
}, []);

// console.log(ro4);
//call// apply bind *****************************

const obj1 = {
  firstName: "Gargee",
  lastName: "Banerjee",
  age: 24,
};
const obj2 = {
  firstName: "Gege",
  lastName: "Baner",
  age: 25,
  // getName: function () {
  //   console.log(this.firstName + " " + this.lastName);
  // },
};

const getName = (obj) => {
  console.log(obj.firstName + " " + obj.lastName);
};

const validateAge = (obj) => {
  console.log(obj.age >= 18 ? "Can vote" : "Cannot vote");
};

const printDetails = function (...args) {
  // fnName(this);
  // console.log(args);
  const [state, townName] = [...args];
  console.log(
    this.firstName + " " + this.lastName + " is from " + state + " ," + townName
  );
};

// printDetails.call(obj1);
// printDetails.apply(obj1);

const newFn = printDetails.bind(obj2);
// newFn("Assam");

Function.prototype.myBind = function (...args) {
  const obj = this;
  const params = args.slice(1);
  return function (...args2) {
    const params2 = [...params, ...args2];
    obj.apply(args[0], params2);
  };
};

const newFn2 = printDetails.myBind(obj1, "Assam");
// newFn2("Tinsukia");

let counter = 0;
function getData() {
  console.log("Got data", counter++);
}

const debouncerMethod = (d) => {
  let timer;
  let timer2;
  return function () {
    console.log("Before", timer, timer2);
    clearTimeout(timer);
    clearTimeout(timer2);
    timer = setTimeout(() => {
      getData.apply();
    }, d);
    timer2 = setTimeout(() => {
      // getData.apply();
    }, d + 100);
    console.log("After", timer, timer2);
  };
};

const throttleMethod = (d) => {
  let flag = true;
  return function () {
    console.log(flag);
    if (flag) {
      getData.apply();
      flag = false;
    }
    setTimeout(() => {
      flag = true;
    }, d);
  };
};

const magicFunction = debouncerMethod(300);
const trottleMagicFunction = throttleMethod(7000);

// window.addEventListener("resize", trottleMagicFunction);

//This************THIS******THIS**********THIS********THIS**********THIS********

//parent scope this
// they inherit it from the parent scope,
const testArrow = () => {
  console.log(this);
};

function testArrow2() {
  console.log(this);
}

// testArrow();
// testArrow2();

//Metod :: inside object
// depends on how the method is called

//Scenario -1
const arrowObj1 = {
  tArrow1: () => {
    console.log(this);
  },
};

// const arrowObj1 = {};
// arrowObj1.tArrow1 = () => {
//   console.log(this);
// };s
// Usually the object literal is written this way,
//so the arrow function does not have its own this context
//and picks from lexical surrounding which is global,
//but in 3rd scenario the lexical environment is a function.

//Scenario - 2
const arrowObj3 = {
  tArrow1: function () {
    console.log(this);
  },
};

//Scenario - 3
const arrowObj2 = {
  arrowFunction: null,
  tArrow1: function () {
    // console.log(this);
    this.arrowFunction = () => {
      console.log(this);
    };
  },
};

// const arrowObj2 = {};
// arrowObj2.arrowFunction = null;
// arrowObj2.tArrow1 = function () {
//   console.log(this);
//   arrowObj2.arrowFunction = () => {
//     console.log(this);
//   };
// };

// arrowObj1.tArrow1();
// arrowObj3.tArrow1();
// arrowObj2.tArrow1();

// arrowObj2.tArrow1();
// arrowObj2.arrowFunction();

const obj = {
  name: "Alice",
  printName: function () {
    console.log("1:", this.name); // Alice

    setTimeout(function () {
      console.log("2:", this.name); // undefined (or error in strict mode)
    }, 1000);

    setTimeout(() => {
      console.log("3:", this.name); // Alice
    }, 1000);
  },
};

// obj.printName();

// Inside the first setTimeout, the function is not an arrow function, so this refers to the global object (window in browsers, undefined in strict mode).
// The second setTimeout uses an arrow function, which inherits this from printName(), so "3: Alice" is printed.

//call apply bind
const o1 = {
  name: "Gargee",
  say: function (hoby) {
    console.log(`${this.name} ${hoby}`);
  },
};

const a1 = {
  name: "Gargee",
  // say:(
};

const o2 = { name: "Pupu" };

// o1.say("Dance")
// o1.say.call(o2, "Music");

//😍
// 'this' is an object created for every Execution Context that is created (on program startup and on every function invocation).
// 'this' can change based on how/where the function is called/invoked.
// There are four patterns of invoking functions that define the context of the function being called:
// function invocation (e.g. says())
// method invocation (e.g. call.says())
// constructor invocation pattern (when you call a constructor function with the 'new' keyword - e.g. var person = new Caller())
// apply invocation pattern (when you provide your own context while calling the function with say.call() or say.apply(), or if you explicitly bind the context with say.bind())

// I think it's also important to mention that arrow functions don't get own this keyword - they can use this keyword of their closest regular function parent

//*********************************** */
//For methods, this points to  Who is invoking that method
// -Each fn invocation this createDiv, and points to something
//But arrow fn doesn't have any this created. So it used parent's this.

// THIS = created
// i)Program start : this = global
//ii)Fun invocation :
// function(){} :: this  created = points to global
// ()=>{} this is not created, uses nearest parent's this.

//HOISTING ****************************
//This process of storing variables and function declaration in memory prior to the execution of the code is known as Hoisting

//Function hoisting
// It is convenient. Both to the reader of code as the coder themselves.
//Not so much for variable hoisting, but for function hoisting. This way you can put the helper functions to the bottom of your code and the more abstract ones which show your business logic at the top.

//Variable hoisting
//JavaScript in strict mode does not allow variables to be used if they are not declared.

//Hoisting : block scope
//One potential pitfall of hoisting is that it can lead to unexpected behavior if you are not aware of how it works.
//For example, if you declare a variable inside a block statement, but then use it outside of the block,
//the variable will be hoisted to the top of the function or global scope, which may not be what you intended/.
//Another potential pitfall is that hoisting can make it difficult to understand the flow of your code,
//especially if you are not familiar with the concept.

//1 Hoisting
var test = 1;
function functionHoisting() {
  //function Hoisting, test is re-defined and re-declared
  function test() {}
  test = 10;
  return;
}
functionHoisting();
// console.log(test); // 1

//2 Hoisting
var hoistingTestVar = 99;
if (true) {
  var hoistingTestVar = 1;
  let b = 10;
}
// console.log(hoistingTestVar);

//For 'var' if block has global scope, so 2nd var overwrote the first

//3 Hoisting
const x = 5;
{
  console.log(x);
  const x = 10;
}
//x inside the block is in the Temporal Dead Zone (TDZ).
// var is not block-scoped, only function-scoped.

//CLOSURE*************************************************************

//**How to write closure functions**
//1) *A function returning function that has access to private variables
//2) * Usage of IIFE Immediately Invoked Function Expression
const counter1 = () => {
  let count = 0;
  const increment = () => {
    ++count;
    return count;
  };
  return increment;
};

let myFn = counter1();
// console.log(myFn());
// console.log(myFn());

let myFn2 = counter1();
// console.log(myFn2());
// console.log(myFn2());

//Live example
//Button click count
//1)global variable :: any one can alter the value
//2)local variable :: temp variable
//3)Final solution :: closure

const counter3 = () => {
  let count = 0;
  const increment = () => {
    ++count;
    document.getElementById("click_count").innerHTML = count;
    console.log(count);
  };
  return increment;
};

//IIFE example
const handleClickCount = (function () {
  let count = 0;
  const increment = () => {
    ++count;
    document.getElementById("click_count").innerHTML = count;
    // return count;
  };
  return increment;
})();

// console.log(handleClickCount());
// console.log(handleClickCount());

const Rent = (function (initialRent) {
  let rent = initialRent;
  return {
    getRent: function () {
      console.log(rent);
    },
    incRent: function (incAmount) {
      rent += incAmount;
      console.log(rent);
    },
    decRent: function (decAmount) {
      rent -= decAmount;
      console.log(rent);
    },
  };
})(2000);

// Rent.getRent();
// Rent.incRent(1000);
// Rent.decRent(1000);

//tiMEOUT function using closures
for (var i = 0; i < 5; i++) {
  function time(i) {
    setTimeout(function () {
      // console.log(i);
    }, i * 1000);
  }
  time(i);
}
// function

//CURRY++++++++++++++++++++++++++++++++++++++++++++++++
const multiply = (function () {
  let number = 1;
  return function (num) {
    number *= num;
    return number;
  };
})();

// console.log(multiply(2))
// console.log(multiply(2))
// console.log(multiply(2))
// console.log(multiply(100))

//currying
//We curry a function(transform a function)
//😶curry = cook function

//Using Bind
function multiplyCurryBind(a, b) {
  return a * b;
}

const mulBy2 = multiplyCurryBind.bind(this, 2);
// console.log(mulBy2(2));

//Using Closure
function multiplyCurry(amount) {
  return function (amount2) {
    return amount * amount2;
  };
}

const multiply2 = multiplyCurry(2);
// console.log(multiply2(6));
// console.log(multiply2(9));

const multiply3 = multiplyCurry(3);
// console.log(multiply3(9));
// console.log(multiply3(4));

const add = (a) => {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
};

const add2 = add(2)(2);

// console.log(add2(3));

const curry = (f) => {
  return function (a) {
    return function (b) {
      return f(a, b);
    };
  };
};

const sum = (a, b) => a + b;

const currySum = curry(sum);

// console.log(currySum(5)(5))

//Why currying????
//https://javascript.info/currying-partials
//Really good explanation
//Real world usecase

//Currying is a transformation of functions that translates a function from callable as f(a, b, c) into callable as f(a)(b)(c).
function curryFn(f) {
  return function (date) {
    return function (type) {
      return function (message) {
        f(date, type, message);
      };
    };
  };
}

function log(date, type, message) {
  alert(`[${date.getHours()} : ${date.getMinutes()}] [${type}] ${message} `);
}

const curryLog = curryFn(log);
const logNow = curryLog(new Date());
// logNow('Debug')('Type Error')

//USing Bind
const curryLogBind = log.bind(this, new Date());
// console.log(curryLogBind('Debug', 'TypeError'))

//General currying form
//Interview question
function sum(a) {
  let sum = a;
  const testFunc = (t) => {
    if (t === undefined) {
      return sum;
    } else {
      sum += t;
      return testFunc;
    }
  };
  return testFunc;
}
// console.log(sum(1)(2)(3)(4)())

//EVENT Delegation
//Event bubbling and capturing

const grandParent = document.querySelector("#grandparent");
grandParent.addEventListener("click", function () {
  console.log("grandParent");
});

const parent = document.querySelector("#parent");
parent.addEventListener("click", function (e) {
  console.log("parent");
});

const child = document.querySelector("#child");
child.addEventListener("click", function (e) {
  // e.stopPropagation();// The event wont bubble after this point
  console.log("child");
});

//Efficient method to add event listeners on parent
//Utilizing bubbling event
document.querySelector("#grandparent").addEventListener(
  "click",
  function (event) {
    console.log(event.target.innerHTML);
  },
  false
);

const butttonDelegation = document.getElementById("butContainerDelegation");
butttonDelegation.addEventListener("click", function (e) {
  if (e.target.classList.contains("butContainerDelegationButton")) {
    console.log("Button");
  } else console.log("Container");
});

const delegationButton = document.querySelector(
  ".butContainerDelegationButton"
);
// delegationButton.addEventListener("click", function (e) {
//   console.log("Button");
// });

//Advantage of delegation
//Add any number of children, parent takes care of the event listener

(function listEventHandler() {
  let prev;
  document
    .querySelector("#delegationList")
    .addEventListener("click", function (event) {
      // let prev;
      // console.log(prev);
      if (prev) {
        prev.classList.remove("highlight");
      }
      event.target.classList.add("highlight");
      prev = event.target;
    });
})();

//Any number of child created
const childEleLi = document.createElement("li");
childEleLi.innerText = "Fish";
document.querySelector("#delegationList").appendChild(childEleLi);

// const li = document.querySelectorAll("li");
// li.forEach(function (list, index) {
//   list.addEventListener("click", () => {
//     console.log(`li ${index + 1}`);
//   });
// });
// console.log("get")

const delegationForm = document.querySelector("#delegationForm");
delegationForm.addEventListener("click", function (e) {
  // console.log(e.target)
  e.preventDefault();
  if (e.target.id === "sub") {
    console.log("Submit");
  } else if (e.target.classList.contains("cancelDelegation")) {
    console.log("Cancel");
  }
});
//======================================================================

const capitalizeAlternate = (str) => {
  let resultString = "";
  str = str.toLowerCase();
  for (let i = 0; i < str.length; i++) {
    if (!(i % 2)) {
      resultString += str.charAt(i).toUpperCase();
    } else {
      resultString += str.charAt(i);
    }
  }
  console.log(resultString);
};

// capitalizeAlternate("gargee ??jdgj")

//PROTOTYPE======================================================
const proto_arr = ["H", "P"];
function proto_fun() {}
const proto_obj1 = {
  name: "Gargee",
  location: "Assam",
  getIntro: function () {
    console.log(`Hey, proto!! This is ${this.name} from ${this.location}`);
  },
};

const proto_obj2 = {
  name: "Banerjee",
  location: "West Bengal",
};

proto_obj2.__proto__ = proto_obj1;

console.log("Fn", proto_fun.prototype);
console.log("Array", proto_arr.__proto__);
console.log("Object", proto_obj2.__proto__);

//PROTOTYPE INTERESTING CASE======================================================
function Person(name) {
  this.name = name;
}
Person.prototype.getIntro = function () {
  console.log(`Hey, ${this.name}`);
};

const user1 = new Person("Gargee");
const user2 = new Person("John");
user1.getIntro();
user2.getIntro();

//WHY use prototype and not the below

function Person(name) {
  this.name = name;
  this.getIntro = function () {
    console.log(`Hey, ${this.name}`);
  };
}
//For every instance created, a new function will be created = Memory wastage

//

//Callback function=================================
const addA = (x, y) => {
  return x + y;
};
const divideA = (x, y) => {
  console.log("In divideA");
  return x / y;
};

const compute = (action, x, y) => {
  return action(x, y);
};

// console.log(compute(addA, 5, 5));

//Convert a function using a callback into a Promise.
function fetchData(callback, params) {
  //Simulating Data fetch
  setTimeout(() => {
    callback(params);
  }, 3000);
}
fetchData((p) => {
  console.log(p);
}, "Data fetched");

function fetchData() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("Success");
    }, 2000);
  });
}
fetchData().then((data) => {
  console.log(data);
});
//==============================================================

// Call back hell==============================================
const updateWallet1 = () => {
  console.log("Wallet updated");
};
const showOrder1 = (performNextOp) => {
  console.log("order History :: pen - 2pcs");
  performNextOp();
};
const makePayment1 = (performNextOp) => {
  console.log("Payment Done");
  performNextOp(updateWallet);
};
const addToCart1 = (performNextOp) => {
  const p = new Promise((resolve, reject) => {
    if (true) {
      //create order
      // performNextOp(showOrder);
      resolve("Order created");
    } else {
      reject("Order couldnt be crrated");
    }
  });
  return p;
};

// addToCart1(makePayment1);

const addToCart = (performNextOp) => {
  const p = new Promise((resolve, reject) => {
    if (true) {
      //create order
      // performNextOp(showOrder);
      resolve(5643);
    } else {
      reject("Order couldnt be crrated");
    }
  });
  return p;
};

const makePayment = (orderId) => {
  const p = new Promise((resolve, reject) => {
    //MAKE PAYMENT
    resolve("Payment Done");
    console.log("Payment Done for orderId", orderId);
    s;
  });
  return p;
};

const showOrder = (orderId) => {
  const p = new Promise((resolve, reject) => {
    //Display Order
    resolve("View Order");
    console.log("Order viewed for", orderId);
  });
  return p;
  // console.log("order History :: pen - 2pcs");
};

const updateWallet = () => {
  console.log("Wallet updated");
};

// addToCart(makePayment)
//   .then((res) => {
//     const orderId = res;
//     console.log(res);
//     makePayment(orderId);
//     return orderId;
//   })
//   .then((res) => {
//     const orderId = res;
//     showOrder(orderId);
//   })
//   .then((res) => {
//     updateWallet();
//   });

function A() {
  console.log("Inside A");
  new Promise((resolve) => {
    console.log("Inside Promise");
    resolve();
  }).then(() => {
    console.log("Inside .then()");
  });
  console.log("After Promise");
}

// console.log(1);
// A();
// console.log(2);
// ======================================================================
const promiseCallback = (response) => {
  console.log("Responses", response);
};

const user = fetch("https://api.github.com/user/gargeebanerjee");
// console.log(user);

// user.then(
//   (res) => {
//     // console.log("Responses", res);
//     res.json().then((response) => console.log(response));
//   },
//   (err) => {
//     console.log("Error", err);
//   }
// );

//Promise chain==========================================
const createOrder = () => {
  const status = false;
  const userPromise = { name: "Gargee" };
  const promise = new Promise((resolve, reject) => {
    const name = userPromise.name;
    if (userPromise.hasOwnProperty("name")) {
      resolve(userPromise.name);
      // setTimeout(() => {
      // }, 4000);
    }
    reject("Error occured");
  });
  return promise;
};

// createOrder()
//   .then(
//     (res) => {
//       console.log(res);
//     },
//     (err) => {
//       console.log(err);
//     }
//   )
//   .catch((er) => {
//     console.log(er);
//   });

const createOrder2 = () => {
  const orderId = 12345;
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(orderId);
    }, 4000);
  });
};

const makePayment2 = (orderId) => {
  return new Promise(function (resolve, reject) {
    resolve("Payment Done");
  });
};

// createOrder2()
//   .then((res) => {
//     console.log("Order Id",res);
//     return makePayment2(res);
//   })
//   .then((msg) => {
//     console.log(msg);
//   })
//   .catch((err) => console.log(err));

//Async Function==================================================
//Promise
const URL = "https://api.github.com/users/gargeebanerjee";
const asyncPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved");
  }, 5000);
});

async function asyncFun() {
  return "Nothing";
  // return asyncPromise;
}

const data = asyncFun();
// data.then((res) => {
//   console.log(res);
// });

//Async eg2
const getAsyncData = async () => {
  const userData = await fetch(URL); //Response object(Promise)
  const user = await userData.json(); //Promise
  console.log(user);
  // .then((res) => res.json())
  // .then((res) => console.log(res));

  console.log("Data received");
};

// getAsyncData();

const fn3 = async () => {
  console.log("Async function");
  const id = await asyncPromise;
  console.log("Async function for", id);
};
// fn3();


//THIS value
const thisObject = {
  name: "Gege",
  getName: function () {
    console.log(this);
  },
  getNameNameArrow: () => {
    console.log(this);
  },
};
function outerFunc() {
  console.log(this.name);
}
// thisObject.getName();
// thisObject.getNameNameArrow();
// outerFunc()

var checkThis = "This is this";
// function outerFunc() {
//   console.log(this.name);
// }
// outerFunc();

document.getElementById("thisCheck").addEventListener("click", () => {
  console.log(this);
});

const thisObject2 = {
  name: "Gege",
  getName: outerFunc,
};
// outerFunc();
// thisObject2.getName();

const thisObject3 = {
  name: "Gege Banner",
  getName: outerFunc,
};

//Pollyfill for bind===========================================


// Arrow function binding??
//This in arrow is bounded during lexical scoping, so ignores bind
const arrowFunc = () => {
  console.log(this);
};

const boundFunc = arrowFunc.bind({ name: "Alice" });
// boundFunc();

//Rest parameters (...args)
function withDefault(a = 10, ...args) {
  console.log(a, args);
}

withDefault(undefined, 20, 30); // 10 [ 20, 30 ]
withDefault(5); //5 []

//Polyfill for object ==============================================

const tempObj = {
  name: "Gargee",
  rollNo: "60",
  address: {
    state: "Assam",
    town: "TSK",
  },
  branch: "CSSE",
};

const tempObj2 = {
  name: "Gargee",
  rollNo: "60",
  certificates: ["AWS", "Reacts"],
  address: {
    state: "Assam",
    town: "TSK",
  },
  branch: "CSSE",
};

Object.prototype.myFlat = function (keyName, output = {}) {
  let obj = this;

  Object.keys(obj).forEach((key) => {
    let tempKey = `${keyName}_${key}`;
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      let tempObj = obj[key];
      tempObj.myFlat(tempKey, output);
    } else {
      output[tempKey] = obj[key];
    }
  });

  return output;
};

const flatObj = tempObj.myFlat("student");

// console.log(flatObj);

//Polyfill Promise.all=================================================

const p1 = Promise.resolve(2);
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("FOO");
  }, 1000);
});

const p3 = 3;
const p4 = Promise.reject("Just Rejected");

// Promise.all([p1, p2])
//   .then((values) => {
//     console.log(values);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

function all(promises) {
  let resultArray = [];
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      try {
        const promise = promises[i];
        const res = await promise;
        resultArray.push(res);
        if (resultArray.length - 1 === promises.length - 1)
          resolve(resultArray);
      } catch (err) {
        reject(err);
      }
    }
  });
}
//Short code
async function all(promises) {
  let result = [];
  for (promise of promises) {
    try {
      result.push(await promise);
    } catch (err) {
      return err;
    }
  }
  return result;
}

function any(promises) {
  let errorArray = [];
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      try {
        const promise = promises[i];
        const res = await promise;
        resolve(res);
      } catch (error) {
        errorArray.push(error);
        if (errorArray.length === promises.length)
          reject(new AggregateError(error, "All promises were rejected"));
      }
    }
  });
}

function allSettled(promises) {
  let resultArray = [];
  return new Promise((resolve, reject) => {
    promises.forEach(async (promise) => {
      try {
        let res = await promise;
        resultArray.push(res);
      } catch (error) {
        resultArray.push(error);
      }
      if (resultArray.length === promises.length) resolve(resultArray);
    });
  });
}

function race(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(async (promise) => {
      try {
        let res = await promise;
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  });
}
// all([p1, p2])
//   .then((values) => {
//     console.log(values);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// any([p2, p4])
//   .then((values) => {
//     console.log(values);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// allSettled([p1, p2, p3, p4])
//   .then((values) => {
//     console.log(values);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// race([p2, p4]).then(
//   (val) => {
//     console.log(val);
//   },
//   (err) => {
//     console.error(err);
//   }
// );

//Polyfill of clearAllTimeout====================================
window.timeOutIds = [];

window.originalSetTimeout = setTimeout;

window.setTimeout = function (action, delay) {
  let timeoutId = originalSetTimeout(action, delay);
  window.timeOutIds.push(timeoutId);
  return timeoutId;
};

window.clearAllTimeout = function () {
  while (window.timeOutIds.length) {
    clearTimeout(window.timeOutIds.pop());
  }
};

setTimeout(() => {
  console.log("hello");
}, 2000);
setTimeout(() => {
  console.log("hello1");
}, 3000);
setTimeout(() => {
  console.log("hello2");
}, 4000);
setTimeout(() => {
  console.log("hello3");
}, 5000);

clearAllTimeout();

//Using closure, as timeoudIds array can be changed since it is a global var.
const handleTime = (function handleTimeouts() {
  let timeoutIds = [];
  return {
    setTimeout: function (action, delay) {
      let timeId = setTimeout(action, delay);
      timeoutIds.push(timeId);
    },
    clearAllTimeout: function () {
      while (timeoutIds.length) {
        clearTimeout(timeoutIds.pop());
      }
    },
  };
})();

// const handleTime = handleTimeouts();

handleTime.setTimeout(() => {
  console.log("hello");
}, 2000);
handleTime.setTimeout(() => {
  console.log("hello1");
}, 3000);
handleTime.setTimeout(() => {
  console.log("hello2");
}, 4000);
handleTime.setTimeout(() => {
  console.log("hello3");
}, 5000);

handleTime.clearAllTimeout();

//Memoization============================================

function fibbo(n) {
  let a = 0,
    b = 1,
    c;
  let arr = [0, 1];
  for (let i = 2; i <= n; i++) {
    c = a + b;
    a = b;
    b = c;
    arr.push(c);
  }
  return arr;
}
// console.log(fibbo(9));

function recurFib(n, memo) {
  if (memo[n]) return memo[n];
  if (n <= 1) return n;

  // console.log()
  return (memo[n] = recurFib(n - 1, memo) + recurFib(n - 2, memo));
}

// console.log(recurFib(10,{}));

//Promise.All .any .race .allSettled

const P1 = new Promise((resolve, reject) => {
  setTimeout(() => reject("P1 Success"), 3000);
});
const P2 = new Promise((resolve, reject) => {
  setTimeout(() => reject("P2 Failed"), 2000);
});
const P3 = new Promise((resolve, reject) => {
  setTimeout(() => reject("P3 Success"), 6000);
});

// Promise.all([P1, P2, P3]).then(
//   (res) => {
//     console.log(res);
//   },
//   // (rej) => {
//   //   console.log(rej);
//   // }
//   ).catch((err) => {
//   console.error(err);

// });

// Promise.allSettled([P1, P2, P3]).then(
//   (res) => {
//     console.log(res);
//   },
//   // (rej) => {
//   //   console.log(rej);
//   // }
//   ).catch((err) => {
//   console.error(err);

// });

// Promise.race([P1, P2, P3]).then(
//   (res) => {
//     console.log(res);
//   },
//   // (rej) => {
//   //   console.log(rej);
//   // }
//   ).catch((err) => {
//   console.error(err);

// });
Promise.any([P1, P2, P3])
  .then(
    (res) => {
      console.log(res);
    }
    // (rej) => {
    //   console.log(rej);
    // }
  )
  .catch((err) => {
    // console.error(err);
    // console.log(err.errors);
  });

//IIFE

// (function hey(){console.log("HEY")})();
// (function hey(){console.log("HEY")}());

//POPOVER
const displayPopOver = () => {
  console.log("OP");
  document
    .getElementsByClassName("popOverForClick")[0]
    .classList.toggle("display"); 
};

const stars = document.querySelectorAll("input[name='rate']");
// console.log(stars)

stars.forEach((star, index1) => {
  star.addEventListener("click", function () {
    console.log(index1);
    stars.forEach((star, index2) => {
      console.log(index2);
      index2 >= index1
        ? star.classList.add("active")
        : star.classList.remove("active");
    });
  });
});

// const buttCon = document.getElementsByClassName("buttonContainer")[0];
// // console.log(buttCon);
// const arr = [1, 2, 3, 4, 5, 6];
// for (el of arr) {
//   const newButton = document.createElement("button");
//   newButton.innerHTML = `Button ${el}`;
//   buttCon.appendChild(newButton);
// }

//Progress
const bar = document.getElementsByClassName("myBar")[0];
console.log(bar);
let width = 0;
let id = setInterval(barProgress, 100);
function barProgress() {
  if (width === 100) {
    clearInterval(id);
  } else {
    width++;
    bar.style.width = width + "%";
  }
}

//Pipe function=====================================================
function sumTwo(a) {
  return a + 2;
}

const sumThree = (a) => a + 3;
const multiplyBy2 = (a) => a * 2;

const result1 = multiply2(sumThree(sumTwo(2)));

// console.log(result1);

const pipe = function (...functions) {
  return function (value) {
    return functions.reduce((acc, fn) => {
      return fn(acc);
    }, value);
  };
};
const result2 = pipe(sumTwo, sumThree, multiplyBy2)(2);
// console.log(result2);

//Throttle================================================================

const throttleHandler = throttle(ThrottleClick, 1000);
const throttleButton = document.getElementsByClassName("throttleButton")[0];
throttleButton.addEventListener("click", throttleHandler);

function ThrottleClick() {
  console.log("Throttle");
}

function throttle(action, delay) {
  let flag = true;
  return function () {
    if (flag) {
      action.apply(this);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, delay);
    }
  };
}
//Debounce================================================
//Eg
//1)Auto suggestion
//2)Auto save in online editors
const debounceHandler = debounce(debounceAction, 300);
function debounceAction() {
  console.log("Search", this);
}

//GEneric debounce function
function debounce(action, delay) {
  let timer;
  let context = this;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      action.apply(context);
    }, delay);
  };
}

//Another way
//To take action on the very first event and ignore subsequesnt events
// function debounce(action, delay) {
//   let timer;

//   return function (e) {
//     if (!timer) {
//       action.apply(null, [e]);
//     }

//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       timer = undefined;
//     }, delay);
//   };
// }
//PROMISE =========================
let strArr = ["abc", "abcd", "ab", "absbhd"];

function getLongestStr(strArray) {
  let result = "";
  for (let str of strArray) {
    if (result.length < str.length) {
      result = str;
    }
  }
  return result;
}
// console.log(getLongestStr(strArr));

async function loadStrings() {
  return Promise.resolve([
    "string-abc",
    "string-defg",
    "string-h",
    "string-ijklmnop",
    "",
  ]);
}
async function fetchLongestStr() {
  let response = await loadStrings();
  console.log(response);
  let result = getLongestStr(response);
  return result;
}
// console.log(fetchLongestStr().then((res)=>{console.log(res)}));

const getInternationalNames = async () => {
  return Promise.resolve([
    "account1",
    "account2",
    "account3",
    "account9",
    "account10",
    "account11",
  ]);
};

const getDomesticNames = async () => {
  return Promise.resolve([
    "account2",
    "account4",
    "account5",
    "account9",
    "account10",
    "account11",
  ]);
};

async function getUniqueAccounts() {
  let internationalNames = await getInternationalNames();
  let domesticNames = await getDomesticNames();
  // console.log(internationalNames, domesticNames);
  let uniqueSet = new Set([...internationalNames, ...domesticNames]);
  // console.log(Array.from(uniqueSet));
  return Array.from(uniqueSet);
}
// getUniqueAccounts().then((uniqueData)=>{console.log(uniqueData)})

//OBJECTS
const obj = { a: 1, b: 2, c: 3, d: "4" };
//even

function filterObject(obj, callBack) {
  let result = {};
  Object.keys(obj).forEach((o) => {
    if (callBack(obj[o])) result[o] = obj[o];
  });
  return result;
}

function isEven(value) {
  return value % 2 === 0;
}

function isValid(value) {
  return typeof value === "number" && Number.isInteger(value);
}
let res = filterObject(obj, isEven);
// console.log(res);

//2 Write a function to count how many times each key appears in an array of objects.
const array = [
  { a: 1, b: 2 },
  { a: 3, c: 4 },
  { b: 5, e: 44 },
  { a: 2, d: 45, e: 2 },
];

function countKeys(arr) {
  let result = {};
  for (let obj of arr) {
    Object.keys(obj).forEach((key) => {
      if (result[key]) {
        result[key]++;
      } else {
        result[key] = 1;
      }
    });
  }
  return result;
}
// console.log(countKeys(array)); // Output: { a: 2, b: 2, c: 1 }

//3 Deep clone======================

const original = {
  name: "Alice",
  rollNo: 60,
  address: {
    city: "Wonderland",
    zip: "12345",
  },
  add: {
    city: "Wonder",
    zip: "1",
  },
};

const shallowClone = { ...original };
// shallowClone.address.city = "New York";
//   console.log(shallowClone);

// let a = JSON.stringify(original);
// let b = JSON.parse(a);
b.rollNo = 77;

function deepClone(obj) {
  const result = {};
  for (key in obj) {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      result[key] = deepClone(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}
console.log(deepClone(original));


//deep merge two objects==============================
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { b: { d: 3 }, e: 4 };

function deepMerge(obj1, obj2) {
    
    Object.keys(obj2).forEach(key => {
        
       
         if(typeof obj1[key] === 'object' && typeof obj2[key] === 'object'){
             obj1[key] = deepMerge(obj1[key], obj2[key]);
         } else {
             obj1[key] = obj2[key];
         }
    })
    return obj1;
}
console.log(deepMerge(obj1, obj2)); 
// { a: 1, b: { c: 2, d: 3 }, e: 4 }

// Implement once function======================================

function once(fn) {
  let executed = false;
  return function (...args) {
    if (!executed) {
      fn(...args);
      executed = true;
    }
  };
}

const logData = once((params) => {
  console.log("Log Once", params);
});
logData("1");
logData("2");


