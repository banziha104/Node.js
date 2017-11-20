let express = require('express');

let router = express.Router(); // 익스프레스의 라우터 모듈 추가


router.get('/',(req,res)=>{res.send('admin app 123')});

router.get('/products',(req,res)=>{
    res.render('admin/products.ejs', { //템플릿을 지정함, 두 번째 파라미터 : 넘겨줄 key value 객체
        message : "nodejs",
        data : "camp"
    });
});

module.exports = router; // 작성한 라우터를 모듈화
