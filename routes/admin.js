let express = require('express');

let router = express.Router(); // 익스프레스의 라우터 모듈 추가


router.get('/',(req,res)=>{res.send('admin app 123')});

router.get('/products',(req,res)=>{res.send('admin product')});

module.exports = router; //작성한 라우터를 모듈화
