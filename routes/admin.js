let express = require('express');
let router = express.Router(); // 익스프레스의 라우터 모듈 추가
let ProductModel = require('../models/ProductsModel'); //모델 임포트
let CommentsModel = require('../models/CommentsModel');
let loginRequired = require('../libs/loginRequired');
let co = require('co');
let CheckoutModel = require('../models/CheckoutModel');
let adminRequired = require('../libs/adminRequired');

/*csrf 셋팅 */
let csrf = require('csurf');
let csrfProtection = csrf({cookie: true});

/*path 설정*/
let path = require('path');
let uploadDir = path.join(__dirname, '../uploads');
let fs = require('fs');

let multer = require('multer');
let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
        callback(null, 'products=' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
});
let upload = multer({storage: storage});

function testMiddleWare(req, res, next) {
    console.log("미들 웨어 작동");
    if (req.user) {
        next();
    } else {
        res.redirect("login 페이지로 이동");
    }
    next();
}

router.get('/', csrfProtection, (req, res) => {
    res.send('admin app 123')
});

router.get('/products', (req, res) => {
    ProductModel.find({}, (err, products) => { // 첫번재 파라미터는 무조건 err
        res.render('admin/products',
            {products: products})
    });
    // res.render('admin/products.ejs', { //템플릿을 지정함, 두 번째 파라미터 : 넘겨줄 key value 객체
    //     message : "nodejs",
    //     data : "camp"
    // });
});

router.get('/products/write',adminRequired, upload.single('thumbnail'), csrfProtection, (req, res) => {
    res.render('admin/form', {product: "", csrfToken: req.csrfToken()});
});

router.post('/products/write',adminRequired , upload.single('thumbnail'), csrfProtection, (req, res) => {
    {
        let product = new ProductModel({
            name: req.body.name,
            thumbnail: (req.file) ? req.file.filename : "",
            price: req.body.price,
            description: req.body.description,
            username: req.user.username
        });
        let validationError = product.validateSync();
        if (validationError) {
            res.send(validationError);
        } else {
            product.save(function (err) {        // mongoose의 DB에 저장
                console.log(err);
                res.redirect('/admin/products');
            });
        }
    }
});

router.get('/products/detail/:id', (req, res) => {
    let getData = co(function* (){
        let product = yield ProductsModel.findOne( { 'id' :  req.params.id }).exec();
        console.log(product);
        let comments = yield CommentsModel.find( { 'product_id' :  req.params.id }).exec();
        return {
            product : product,
            comments : comments
        };
    });
    getData.then( function(result){
        res.send(result);
    });
});

router.get('/products/edit/:id', csrfProtection, (req, res) => {
    ProductModel.findOne({'id': req.params.id, 'csrfToken': req.csrfToken()}, (err, product) => {
        res.render('admin/form', {product: product})
    });
});

router.post('/products/edit/:id', loginRequired, upload.single('thumnail'), (req, res) => {
    ProductModel.findOne({id: req.params.id}, (err, product) => {
        let query = {
            name: req.body.name,
            thumnail: (req.file) ? req.file.filename : product.thumnail,
            price: req.body.price,
            description: req.body.description,
        };
    });
    ProductModel.update({id: req.params.id}, {$set: query}, (err) => { // $set은 규
        res.redirect('/admin/products/detail/' + req.params.id); //수정후 본래보던 상세페이지로 이동
    });
});

router.get('/products/delete/:id', (req, res) => {
    ProductModel.remove({id: req.params.id}, (err) => {
        res.redirect('/admin/products');
    })
});

router.post('/products/ajax_comment/delete', loginRequired, function (req, res) {
    CommentsModel.remove({id: req.body.comment_id}, function (err) {
        res.json({message: "success"});
    });
});

router.post('/products/ajax_comment/insert', loginRequired, (req, res) => {
    let comment = new CommentsModel({
        content: req.body.content,
        product_id: parseInt(req.body.product_id)
    });

    comment.save((err, comment) => {
        console.log(comment);
        console.log(comment + comment.id + comment.content + comment.message);
        res.json({
            id: comment.id,
            content: comment.content,
            message: "success"
        });
    });
});

router.post('/products/ajax_summernote', loginRequired, upload.single('thumbnail'), function(req,res){
    res.send( '/uploads/' + req.file.filename);
});

router.get('/order', function(req,res){
  CheckoutModel.find( function(err, orderList){ //첫번째 인자는 err, 두번째는 받을 변수명
    res.render( 'admin/orderList' ,
      { orderList : orderList }
    );
  });
});

router.get('/order/edit/:id', function(req,res){
  CheckoutModel.findOne( { id : req.params.id } , function(err, order){
    res.render( 'admin/orderForm' ,
      { order : order }
    );
  });
});
router.get('/statistics', adminRequired, function(req,res){
  CheckoutModel.find( function(err, orderList){

    var barData = [];   // 넘겨줄 막대그래프 데이터 초기값 선언
    var pieData = [];   // 원차트에 넣어줄 데이터 삽입
    orderList.forEach(function(order){
      // 08-10 형식으로 날짜를 받아온다
      var date = new Date(order.created_at);
      var monthDay = (date.getMonth()+1) + '-' + date.getDate();

      // 날짜에 해당하는 키값으로 조회
      if(monthDay in barData){
        barData[monthDay]++; //있으면 더한다
      }else{
        barData[monthDay] = 1; //없으면 초기값 1넣어준다.
      }

      // 결재 상태를 검색해서 조회
      if(order.status in pieData){
        pieData[order.status]++; //있으면 더한다
      }else{
        pieData[order.status] = 1; //없으면 결재상태+1
      }

    });

    res.render('admin/statistics' , { barData : barData , pieData:pieData });
  });
});

router.post('/order/edit/:id', adminRequired, function(req,res){
  var query = {
    status : req.body.status,
    song_jang : req.body.song_jang
  };

  CheckoutModel.update({ id : req.params.id }, { $set : query }, function(err){
    res.redirect('/admin/order');
  });
});

module.exports = router; // 작성한 라우터를 모듈화