// var myvar = require("./myvar");
// var setVar = new myvar();
// console.log(setVar.a);
// console.log(setVar.setA());
// console.log(setVar.name);

var http = require('http');

http.createServer((request, response)=>{
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Hello Nodejs');
    response.end();
}).listen(3000);