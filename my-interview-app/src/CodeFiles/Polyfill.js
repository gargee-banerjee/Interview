//===========================BIND=======================================BIND===============================BIND===============
//==========================================================================
function pollyBindFunc(town, state, phone = 9898) {
  console.log(`Hi! I am ${this.name} from ${town}, ${state} `);
  console.log(`with contact details as ${this.phone ? this.phone : phone} `);
}
const bindObj = {
  name: "Gege Banner",
  rollNo: "60",
};
// pollyBindFunc();
// const newFunc = pollyBindFunc.bind(bindObj, "Tinsukia", "Assam");
// newFunc();

Function.prototype.newBind = function (...args) {
  const fun = this;
  const params = args.slice(1);
  return function () {
    fun.call(args[0], ...params);
  };
};
const newFunc = pollyBindFunc.newBind(bindObj, "Tinsukia", "Assam");
newFunc();

Function.prototype.newBind2 = function (...args) {
  const fun = this;
  const params = args.slice(1);
  return function (...newArgs) {
    fun.call(args[0], ...params, ...newArgs);
  };
};
//   const newFunc2 = pollyBindFunc.newBind2(bindObj, "Tinsukia", "Assam");
// newFunc2(3434);

//==============MAP===================MAP==================MAP===========MAP=============================================
//==========================================================================
const ownArr = [1, 2, 3, 4];
const newArr = ownArr.map(function (x) {
  return x * 2;
});
// console.log(newArr);

Array.prototype.newMap = function (action) {
  let result = [];
  let inputArray = this;
  inputArray.forEach((el) => {
    result.push(action(el));
  });
  return result;
};
const pollyMapVal = ownArr.newMap((e) => {
  return e + 2;
});
// console.log(pollyMapVal);

//===========REDUCE=================REDUCE=================REDUCE==================REDUCE================================
//==========================================================================
const testReduceArr = [1, 2, 3, 4, 5];
const reducedValue = testReduceArr.reduce(function (x, total) {
  return total + x;
}, 0);

Array.prototype.newReduce = function (action, initial) {
  let result = initial;
  let inputArray = this;
  inputArray.forEach((el) => {
    result = action(result, el);
  });
  return result;
};
const pollyReducedValue = testReduceArr.newReduce(function (total, x) {
  return total + x;
}, 0);
// console.log(pollyReducedValue);

//==========FILTER========================FILTER==================FILTER======================FILTER===========================
//==========================================================================
const testFilterArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const filteredArray = testFilterArray.filter(function (x) {
  return !(x % 2);
});
// console.log(filteredArray);

Array.prototype.newFilter = function(action){
    let result = [];
    let inputArray = this;
    inputArray.forEach((el)=>{
        if(action(el))
        result.push(el)
    })
    return result;
}
const pollyFilteredArray = testFilterArray.newFilter(function (x) {
    return !(x % 2);
  });
//   console.log(pollyFilteredArray);

//==============FLAT============================FLAT============================FLAT==============================
//==========================================================================
const testFlatArray = [1, 2, 3, [4, 5, 6, [8, 9, [33, 44]]], [10, 11, 12]];
const resultFlatArray = testFlatArray.flat(2);
// console.log(resultFlatArray);

Array.prototype.newFlat = function(){}