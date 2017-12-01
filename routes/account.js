let express = require('express');
let router = express.Router();
let UserModel = require('../models/UserModel');
let passwordHash = require('../libs/passwordHash');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

/*시리얼 라이저 및 디시리얼 라이저 설정*/
passport.serializeUser((user,done)=>{
    console.log('serializeUser');
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    let result = user;
    user.password ="";
    console.log('deserializeUser');
    done(null,user);
});

/*정책 설정*/
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

router.get('/', function (req, res) {
    res.send('account app');
});

router.get('/join', function (req, res) {
    res.render('accounts/join');
});

router.post('/join', (req, res) => {
    let User = new UserModel({
        username: req.body.username,
        password: passwordHash(req.body.password),
        displayname: req.body.displayname
    });
    User.save((err) => {
        res.send('<script>alert("회원가입 성공");\location.href="/accounts/login";</script>');
    });
});

router.get('/login', function (req, res) {
    res.render('accounts/login', {flashMessage: req.flash().error}); // 플레시 메세지 내보네기
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

router.get('/success', function (req, res) {
    res.send(req.user);
});


router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/accounts/login');
});


module.exports = router;