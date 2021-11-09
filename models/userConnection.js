var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userConnectionSchema = new Schema({
    connID: {type:String, required:true},
    connection: {
        connectionID: {type:String, required: true},
        name: {type:String, required: true},
        topic: {type:String, required: true},
        details: {type:String, required: true},
        date: {type:String, required: true},
        time: {type:String, required: true},
        userID: {type:String, required: true}
    },
    userID: {type:String, required:true},
    rsvp: {type:String, required:true}
});

module.exports = mongoose.model('UserConnection', userConnectionSchema, 'userConnections')
