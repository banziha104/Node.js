var express = require('express'); //익스프레스 모듈 불러오기

let admin = require('./routes/admin'); // admin.js 불러오기

let app = express(); //익스프레스 객체 생성
let port = 3000;     //포트 번호 설정

app.get('/',(req,res)=>{      //url 라우팅
   res.send('first app');
});



// app.get('/admin',(req,res)=>{
//     res.send('admin app');
// });

app.use('/admin',admin); // /admin url이 들어오면 admin을 사용( url 분기)

app.listen( port, ()=>{
   console.log('Express listening on port', port);
});