// require the models
// var User = require('.../models/user');
var userConnection = require('../models/userConnection');

// class definition of UserProfile
class UserProfile {


    constructor(id, userConnection) {
        this.userID = id;
        this.userConnection = userConnection;
    }

    getUserID() {
        return this.userID;
    }

    setUserID(id) {
        this.userID = id;
    }

    setUserConnections(con) {
        this.userConnection = con;
    }

    // functions
    addConnection(connection, rsvp) {
        // check to see if the connection already exists within userConnection
        for (var i = 0; i < this.userConnection.length; i++) {
            // if it does exist update the rsvp and exit the function
            if (this.userConnection[i] == connection) {
                this.userConnection[i].setRsvp(rsvp);
                return;
            }
        }

        // if the connection does not exist create a new connection and add it
        // to the userConnection list
        var newConnection = new userConnection(connection, rsvp);
        this.userConnection.push(newConnection);
    }

    removeConnection(connection) {
        // variable to check if given ID exists in list of user connections
        var found = false;
        // variable to hold the index of the matching connection
        var number = -1;

        for(var i = 0; i < this.userConnection.length; i++){
            if(this.userConnection[i].connection.connectionID == connection){
                found = true;
                number = i;
                break;
            }
        }

        // check if connection to be deleted exists
        if(found == true){
            console.log('deleting connection');
            // remove connection from user profile list
            this.userConnection.splice(number, 1);
        }
    }

    updateRSVP(connection, rsvp) {
        // find the connection in the array
        for (var i = 0; i < this.userConnection.length; i++) {
            if (connection == this.userConnection[i].connection.connectionID) {
                this.userConnection[i].setRsvp(rsvp);
                return;
            }
        }
    }

    getUserConnections() {
        return this.userConnection;
    }
}

module.exports = UserProfile;