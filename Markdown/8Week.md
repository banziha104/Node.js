# Socket.io 

> 작동 방식:

1. 웹소켓 지원하는 브라우저에서는 그대로 사용
2. 그렇지 않은 브라우저에서는 
3. 플래시가 설치되어있으면 플래시로
4. ajax로 중간중간마다 체크하거나
5. iframe 또는 streaming등으로 실행 

<br />

> 작동흐름

1. 웹페이지 접속
2. 클라이언트 let socket = io()로
3. 서버와 연결관계를 맺음
4. 서버에 이벤트로 emit
5. 전체클라이언트에 메세지 전달

> 서버측 

```javascript
let listen = require('socket.io');
let io = listen(server);
io.on('connection',(socket)=>{
    socket.on('client message',(data)=>{
        console.log("socket" + socket);
        console.log("data" + data);
       io.emit('server message', data.message);
    });
});
```

<br />

> client 측 (chat/index)
```html
<script>
     (function(){
         let socket = io();
         socket.on('server message',(data)=>{
             $('#chatBody').append('<li>' + data + '</li>');
         });
         $(document).ready(()=>{
             $('#sendForm').submit(()=>{
                 let $message = $('sendFrom input [name=message]');
                 socket.emit('client message',{message : $message.val()});
                 $message.val('');
                 return false;
             }) ;
         });
     })();
 </script>
```

<br />

# 회원간의 채팅

> npm installl --save connect-mongo : 세션을 mongoDB에 저장한다

```javascript
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
```