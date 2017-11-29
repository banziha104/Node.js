# 암호화 기법

<li> Ciper 방식 : 평문 -> 암호문 -> 복호문, 암호 복원가능
<li> Hmac 방식 : 복원불가능
<li> form에서 입력된 정보 + salt(의미 없는 값)을 더한 후 sha512 암호화 기법으로 해시를 만들어 제공

---

<br>

# 암호화 모듈 만들기

```javascript
let crypto = require('crypto'); //모듈
let mysalt = "fastcampus"; //의미없는 값

module.exports = (password) =>{
  return crypto.createHash('sha512').update(password + mysalt).digest('base64');
};
```

---

<br>

# 로그인 구현시 사용할 모듈 다운로드


<li> npm install --save express-session : 세션사용
<li> npm install --save passport : passport 다운로드
<li> npm install --save passport-local : local 방식으로 저장 가능하게 사용
<li> npm install --save connect-flash  : flash message



---

<br> 

# passport 적용 순서


<ol> 정책작성
<ol> serializeUser, deserializeUser 작성 (시리얼라이즈는 첫 로그인시 디시리얼라이저는 그 이후 조회 마다)
<ol> router적용

<li> app.js에 모듈불러오기

```javascript
/*app.js*/
let passport = require('passport');
let session = require('express-session');
```

<li> app.js 세션, passport 및 플래시 메세지 설정


```javascript
//session 관련 셋팅
app.use(session({
    secret: 'fastcampus',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 2000 * 60 * 60 //지속시간 2시간
    }
}));

//passport 적용
app.use(passport.initialize());
app.use(passport.session());

//플래시 메시지 관련
app.use(flash());
```

<li> accounts.js에 모듈을 불러옮 

```javascript
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
```

<li> 정책 설정

```javascript
passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, username, password, done) => {
        UserModel.findOne({username: username, password: passwordHash(password)},(err,user)=>{
            if(!user){
                return done(null, false, {message : '아이디 또는 비밀번호 오류입니다'});
            }else{
                return done(null, user);
            }
    });
    })
);
```

<li> 시리얼라이저 및 디시리얼라이저 설정

```javascript
/*시리얼 라이저 및 디시리얼 라이저 설정*/
passport.serializeUser((user,done)=>{
   console.log('serializeUser');
   done(null,user);
});

passport.deserializeUser((user,done)=>{
   console.log('deserializeUser');
   done(null,user);
});
```

<li> url 라우팅

```javascript

router.get('/login', function (req, res) {
    res.render('accounts/login', {flashMessage: req.flash().error});
});

router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/accounts/login',
        failureFlash: true
    }),
    function (req, res) {
        res.send('<script>alert("로그인 성공");location.href="/accounts/success";</script>');
    }
);

```