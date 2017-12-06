let express = require('express');
let router = express.Router(); // 익스프레스의 라우터 모듈 추가
let ProductModel = require('../models/ProductsModel'); //모델 임포트
let CommentsModel = require('../models/CommentsModel');
let loginRequired = require('../libs/loginRequired');

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

router.get('/products/write', loginRequired, upload.single('thumbnail'), csrfProtection, (req, res) => {
    res.render('admin/form', {product: "", csrfToken: req.csrfToken()});
});

router.post('/products/write', loginRequired , upload.single('thumbnail'), csrfProtection, (req, res) => {
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
    ProductModel.findOne({'id': req.params.id}, (err, product) => {
        CommentsModel.find({product_id: req.params.id}, (err, comments) => {
            res.render('admin/productsDetail', {product: product, comments: comments})
        })
    })
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

module.exports = router; // 작성한 라우터를 모듈화