let express = require('express');
let router = express.Router();
let ProductsModel = require('../models/ProductsModel');
let CommentsModel = require('../models/CommentsModel');
let co = require('co');

router.get('/:id' , function(req, res){

    var getData = co(function* (){
        return {
            product : yield ProductsModel.findOne( { 'id' :  req.params.id }).exec(),
            comments : yield CommentsModel.find( { 'product_id' :  req.params.id }).exec()
        };
    });
    getData.then( result =>{
        res.render('products/detail', { product: result.product , comments : result.comments });
    });
});


module.exports = router;