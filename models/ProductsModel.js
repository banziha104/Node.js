/*스키마가 있는 모델을 설계*/
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let autuIncrement = require('mongoose-auto-increment');

/*객체 설계*/
let ProductsSchema = new Schema({
   name : String,
   price : Number,
   description: String,
   create_at : {
       type : Date,
       default : Date.now()
   }
});


ProductsSchema.plugin(autuIncrement.plugin , {
    model : 'products', //products라는 모델에
    field : 'id',         //field라는 필드를 가지고
    startAt: 1          //1부터 증가하는
});

module.exports = mongoose.model('products', ProductsSchema); // products라는 이름으로 ProductsSchema를 내보냄