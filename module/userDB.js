var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dodoDB');

var User = require('../models/user');

// function to find the user by id
async function getUser(userid) {
    var query = await User.findOne( {id: userid} );
    return query;
}

// function to find a user from their username
async function getUserfromUN(username) {
    var query = await User.findOne( {username: username} );
    return query;
}

// function to check to see if the username exists in database
async function validateUsername(username) {
    var query = await User.findOne( {username: username} );

    if (query == null) {
        console.log("User was not found");
        return null;
    }
    return query.username;
}

// function to check to see if the password exists in the database
async function validatePassword(username, password) {
    var query = await User.findOne( {username: username, password: password} );

    if (query == null) {
        console.log("Password was not found");
        return null;
    }
    return query.password;
}

module.exports.getUser = getUser;
module.exports.getUserfromUN = getUserfromUN;
module.exports.validateUsername = validateUsername;
module.exports.validatePassword = validatePassword;