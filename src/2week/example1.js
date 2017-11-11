// var test = 20;
// (function () {
//     var test = 10;
//     console.log(test);
// })();
// console.log(test);

// var test = (function () {
//     var a = "1";
//     return {
//         b : "2",
//         c : "3"
//     }
// })();
//
// console.log(test.a);
// console.log(test.b);
// test("haha","kkk

function Car() {}
var myCar = new Car();
console.log(myCar.constructor == Car());
console.log(myCar.constructor.prototype === Car.prototype);
