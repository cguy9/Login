// var mongoose = require('mongoose');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connectionSchema = new Schema({
    connectionID: {type:String, required: true},
    name: {type:String, required: true},
    topic: {type:String, required: true},
    details: {type:String, required: true},
    date: {type:String, required: true},
    time: {type:String, required: true},
    userID: {type:String, required: true}
});

module.exports = mongoose.model('Connection', connectionSchema, 'connections');
