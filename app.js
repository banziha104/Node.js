let express = require('express'); //익스프레스 모듈 불러오기

/* MongoDB 접속부*/

let mongoose = require('mongoose'); // 몽구스 불러오기
mongoose.Promise = global.Promise; // 몽구스 자체 Promise를 내장 Promise로 변경
let autoIncrement = require('mongoose-auto-increment');

/* path */
let path = require('path');

/*DB 컨넥션 체크*/
let db = mongoose.connection; // 디비 컨넥션

db.on('error', console.error); //컨넥션 실패
db.once('open', () => {          //컨넥션 성공
    console.log("mongodb connect");
});

let connect = mongoose.connect('mongodb://127.0.0.1:27017/fastcampus', {useMongoClient: true}); //몽고db연결
autoIncrement.initialize(connect);

/*로거와 바디파서*/
let logger = require('morgan');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');

//flash  메시지 관련
let flash = require('connect-flash');

//passport 로그인 관련
let passport = require('passport');
let session = require('express-session');

let admin = require('./routes/admin'); // admin.js 불러오기
let accounts = require('./routes/account');
let auth = require('./routes/auth');
let home = require('./routes/home');
let chat = require('./routes/chat');
let products = require('./routes/products');

let app = express(); //익스프레스 객체 생성
let port = 3000;     //포트 번호 설정

app.set('views', path.join(__dirname, 'views')); // 현위치에 views 라는 폴더로 설정
app.set('view engine', 'ejs');

console.log("a");

/*미들웨어 세팅*/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

/*업로드 path 추가*/
app.use('/uploads', express.static('uploads'));


//session 관련 셋팅
//session 관련 셋팅
var connectMongo = require('connect-mongo');
var MongoStore = connectMongo(session);

var sessionMiddleWare = session({
    secret: 'fastcampus',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 2000 * 60 * 60 //지속시간 2시간
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 14 * 24 * 60 * 60
    })
});
app.use(sessionMiddleWare);

//passport 적용
app.use(passport.initialize());
app.use(passport.session());

//플래시 메시지 관련
app.use(flash());

// app.use(function(req, res, next) {
//     app.locals.isLogin = req.isAuthenticated();
//     //app.locals.urlparameter = req.url; //현재 url 정보를 보내고 싶으면 이와같이 셋팅
//     //app.locals.userData = req.user; //사용 정보를 보내고 싶으면 이와같이 셋팅
//     next();
// });
//flash 아래에다 붙여 넣는다.
app.use((req, res, next) => {
    //로그인 정보 뷰에서만 변수로 셋팅, 전체 미들웨어는 router위에 두어야 에러가 안난다
    app.locals.isLogin = req.isAuthenticated(); // passport에서 자동으로만들어
    app.locals.myname = "hello";
    //app.locals.urlparameter = req.url; //현재 url 정보를 보내고 싶으면 이와같이 셋팅
    //app.locals.userData = req.user; //사용 정보를 보내고 싶으면 이와같이 셋팅
    next()
});


app.use('/admin', admin); // /admin url이 들어오면 admin을 사용( url 분기)
app.use('/accounts', accounts);
app.use('/auth', auth);
app.use('/', home);
app.use('/chat', chat);
app.use('/products',products);
// app.listen( port, ()=>{
//    console.log('Express listening on port', port);
// });

let server = app.listen(port, () => {
    console.log('Express listening on port', port);
});

let listen = require('socket.io');
let io = listen(server);
io.use((socket,next)=>{
    sessionMiddleWare(socket.request,
        socket.request.req, next);
});
require('./libs/socketConnection')(io);