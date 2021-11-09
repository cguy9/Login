var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dodoDB');

var Connection = require('../models/connection');

// find all the connections from the db
async function getConnections () {
    var query = await Connection.find();
    return query;
}

// get the connection from the connection's id
async function getConnection(id) {
    var query = await Connection.find( {connectionID: id} );
    return query;
}

// // get the user's connections
// async function getUserConnections(userID) {
//     var query = await Connection.find( {userID: userID} );
//     return query;
// }

module.exports.getConnections = getConnections;
module.exports.getConnection = getConnection;
// module.exports.getUserConnections = getUserConnections;
/*
// placeholder information for the datebase
var Connection = require('../models/connection');

// Set of connection details
let connectionList = [
    new Connection(1, 'Winter Item Trade', 'Item Trading',
        'Trade Winter-themed items','2/2/21', '2:00-4:00pm'),
    new Connection(2, 'Saharah\'s Wallpaper and Flooring Trade', 'Item Trading',
        'Trade Rugs, Floorings, and Wallpaper', '3/3/21', '1:00-3:00pm'),
    new Connection(3, 'Nookling\'s Flea Market', 'Item Trading',
        'Trade rare items from the Nooklings','3/3/21', '1:00-3:00pm'),
    new Connection(4, 'Valentine\'s Date-Night', 'HHA Showoff',
        'Present the perfect date night','3/3/21', '1:00-3:00pm'),
    new Connection(5, 'Spring Cleaning Rush', 'HHA Showoff',
        'Show the before and after of your most cluttered room','3/3/21', '1:00-3:00pm'),
    new Connection(6, 'Gold Trophy Tournament', 'HHA Showoff',
        'Everything goes, earn the most HHA points','3/3/21', '1:00-3:00pm')
];

// getConnections() - returns all of the connections
function getConnections(){
    return connectionList;
}

// getConnection(connectionID) - returns the specified connection from the database
function getConnection(connectionID) {
    return connectionList[connectionID - 1];
}

// return functions
module.exports.getConnections = getConnections;
module.exports.getConnection = getConnection;

 */