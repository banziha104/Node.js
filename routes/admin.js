let express = require('express');
let router = express.Router(); // 익스프레스의 라우터 모듈 추가
let ProductModel= require('../models/ProductsModel'); //모델 임포트
let CommentsModel = require('../models/CommentsModel');

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
   res.render('admin/form', {product : ""});
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

router.get('/products/detail/:id', (req,res)=>{
   ProductModel.findOne({ 'id' : req.params.id } , (err,product)=>{
       res.render('admin/productsDetail',
           {product : product})
   })
});

router.get('/products/edit/:id', (req,res)=>{
   ProductModel.findOne({'id' : req.params.id},(err,product)=>{
       res.render('admin/form', {product : product})
   });
});

router.post('/products/edit/:id', (req,res)=>{
   let query = {
       name : req.body.name,
       price : req.body.price,
       description : req.body.description,
   };
    ProductModel.update({ id : req.params.id }, { $set : query }, (err) => { // $set은 규
        res.redirect('/admin/products/detail/' + req.params.id ); //수정후 본래보던 상세페이지로 이동
    });
});

router.get('/products/delete/:id',(req,res)=>{
    ProductModel.remove({ id : req.params.id}, (err) =>{
        res.redirect('/admin/products');
    })
});

router.post('/products/ajax_comment/insert',(req,res)=>{
   let comment = new CommentsModel({
      content : req.body.content,
      product_id : parseInt(req.body.product_id)
   });

   comment.save((err,comment)=>{
      res.json({
          id : comment.id,
          content : comment.content,
          message : "success"
      });
   });
});

module.exports = router; // 작성한 라우터를 모듈화
