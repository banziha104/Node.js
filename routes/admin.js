let express = require('express');
let router = express.Router(); // 익스프레스의 라우터 모듈 추가
let ProductModel= require('../models/ProductsModel'); //모델 임포트

router.get('/',(req,res) => {res.send('admin app 123')});

router.get('/products',(req,res)=>{
    ProductModel.find({},(err,products)=>{ // 첫번재 파라미터는 무조건 err
        res.render('admin/products',
            { products : products})
    });
    // res.render('admin/products.ejs', { //템플릿을 지정함, 두 번째 파라미터 : 넘겨줄 key value 객체
    //     message : "nodejs",
    //     data : "camp"
    // });
});

router.get('/products/write', (req,res)=>{
   res.render('admin/form');
});

router.post('/products/write',(req,res)=>{{
    let product = new ProductModel({
       name : req.body.name,
       price : req.body.price,
       description : req.body.description,
    });
    console.log(req.body);
    product.save(function(err){        // mongoose의 DB에 저장
        console.log(err);
        res.redirect('/admin/products');
    });
}});
module.exports = router; // 작성한 라우터를 모듈화
