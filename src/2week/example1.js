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
test("haha","kkk",function () {
    for(var i = 0 ; i < arguments.length ; i++){
        console.log( i + 1 + "번째 =" + arguments[i]);
    }
});


test(1,2,3,4,5,6,7,8,9);