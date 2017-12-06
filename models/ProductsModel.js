/*스키마가 있는 모델을 설계*/
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let autoIncrement = require('mongoose-auto-increment');

/*객체 설계*/
let ProductsSchema = new Schema({
   name : {
       type : String,
       required : [true, '제목을 입력해주세요']
   },
    thumbnail: String,
   price : Number,
   description: String,
   create_at : {
       type : Date,
       default : Date.now()
   },
   username :String
});

/* 가상의 변수를 만듬 */
ProductsSchema.virtual('getDate').get(function () {
   let date = new Date(this.create_at);
   console.log(this);
   return{
       year : date.getFullYear(),
       month : date.getMonth()+1,
       day : date.getDate()
   };
});

ProductsSchema.plugin(autoIncrement.plugin , {
    model : 'products', //products라는 모델에
    field : 'id',       //field라는 필드를 가지고
    startAt: 1          //1부터 증가하는
});

module.exports = mongoose.model('products', ProductsSchema); // products라는 이름으로 ProductsSchema를 내보냄