let express = require('express');
let router = express.Router();

router.get('/',(req,res)=>{
    if(req.isAuthenticated()){
        res.send('<script>alert("로그인이 필요한 서비스 입니다");\location.href="/accounts/login";</script>');
    }
   res.render('chat/index');
});
module.exports = router;
