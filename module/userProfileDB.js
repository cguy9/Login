var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dodoDB');

var Connection = require('../models/connection');
var UserConnection = require('../models/userConnection');
var UserProfile = require('../models/userProfile');

// get all connections connected to a user
async function getUserProfile(id) {
    var query = await UserConnection.find( {userID: id} );
    return query;
}

// add rsvp connection
async function addRSVP(connectionID, userID, rsvp) {
    var connection = await Connection.findOne({connectionID:connectionID});
    await UserConnection.insertMany({connID: connectionID, connection: connection, userID:userID, rsvp:rsvp})
}

// update an rsvp connection
async function updateRSVP(connectionID, userID, rsvp) {
    await UserConnection.findOneAndUpdate( {connID: connectionID, userID: userID}, {rsvp:rsvp} );
}
// add a new connection
async function addConnection(connection) {
    await Connection.insertMany(connection);
}

// remove a connection
async function removeConnection(connectionID, userID) {
    await UserConnection.findOneAndDelete( {connID: connectionID, userID: userID} );
}

// get the connections the user has rsvp to
// async function getUserConnections(userID) {
//     var query = await UserConnection.find()
// }

module.exports.getUserProfile = getUserProfile;
module.exports.addRSVP = addRSVP;
module.exports.updateRSVP = updateRSVP;
module.exports.addConnection = addConnection;
module.exports.removeConnection = removeConnection;