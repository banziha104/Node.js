let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let autoIncrement = require('mongoose-auto-increment');

let CommentsSchema = new Schema({
    content : String,
    created_at :{
      type : Date,
      default : Date.now()
    },
    product_id : Number
});

CommentsSchema.plugin(autoIncrement.plugin, { model : "comments" , field : "id", startAt : 1}); //id를 startAt 부터 1씩증가
module.exports = mongoose.model("comments", CommentsSchema);