var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: {type:String, required: true},
    fName: {type:String, required: true},
    lName: {type:String, required: true},
    email: {type:String, required: true},
    friendCode: {type:String, required: true},
    username: {type:String, required: true},
    password: {type:String, required: true}
});

module.exports = mongoose.model('User', userSchema, 'users');
