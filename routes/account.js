let express = require('express');
let router = express.Router();
let UserModel = require('../models/UserModel');
let passwordHash = require('../libs/passwordHash');

router.get('/', function(req, res){
    res.send('account app');
});

router.get('/join', function(req, res){
    res.render('accounts/join');
});

router.post('/join',(req,res)=>{
   let User = new UserModel({
       username : req.body.username,
       password : passwordHash(req.body.password),
       displayname : req.body.displayname
   });
   User.save((err)=>{
      res.send('<script>alert("회원가입 성공");\location.href="/accounts/login";</script>');
   });
});
router.get('/login', function(req, res){
    res.render('accounts/login');
});


module.exports = router;