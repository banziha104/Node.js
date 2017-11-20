let express = require('express'); //익스프레스 모듈 불러오기

/* MongoDB 접속부*/

let mongoose = require('mongoose'); // 몽구스 불러오기
let autoIncrement = require('mongoose-auto-increment');

/* path */
let path = require('path');

/*DB 컨넥션 체크*/
let db = mongoose.connection; // 디비 컨넥션

db.on('error', console.error); //컨넥션 실패
db.once('open', ()=>{          //컨넥션 성공
   console.log("mongodb connect");
});

let connect = mongoose.connect('mongodb://127.0.0.1:27017/fastcampus', { useMongoClient: true }); //몽고db연결
autoIncrement.initialize(connect);

let admin = require('./routes/admin'); // admin.js 불러오기

let app = express(); //익스프레스 객체 생성
let port = 3000;     //포트 번호 설정

app.set('views', path.join(__dirname,'views')); // 현위치에 views 라는 폴더로 설정
app.set('view engine','ejs');

app.get('/',(req,res)=>{      //url 라우팅
   res.send('first app');
});

app.use('/admin',admin); // /admin url이 들어오면 admin을 사용( url 분기)

app.listen( port, ()=>{
   console.log('Express listening on port', port);
});