var express = require('express'); //익스프레스 모듈 불러오기

var app = express(); //익스프레스 객체 생성
var port = 3000;     //포ㅡ 번호 설정

app.get('/',(req,res)=>{
   res.send('first app');
});

app.listen( port, ()=>{
   console.log('Express listening on port', port);
});