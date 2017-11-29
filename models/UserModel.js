let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let autoIncrement = require('mongoose-auto-increment');

let UserSchema = new Schema({
    username : {
        type : String,
        required: [true, '아이디는 필수입니다.']
    },
    password : {
        type : String,
        required: [true, '패스워드는 필수입니다.']
    },
    displayname : String,
    created_at : {
        type : Date,
        default : Date.now()
    }
});

UserSchema.plugin( autoIncrement.plugin , { model : "user", field : "id" , startAt : 1 } );
module.exports = mongoose.model('user' , UserSchema);