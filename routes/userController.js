// add required functions
var connectionDB = require('../module/connectionDB');
var userDB = require('../module/userDB');
var userProfileDB = require('../module/userProfileDB');

var UserProfile = require('../models/userProfile');
var User = require('../models/user');
var Connection = require('../models/connection');
var UserConnection = require('../models/userConnection');

var express = require('express');
var router = express.Router();

router.get('/', async function (req, res) {

    // create the session user
    var sessionUser = req.session.profile;

    // get the action
    var action = req.query.action;

    // check to see if session is being tacked
    // if (typeof sessionUser == 'undefined') {
    //     // if there is no user yet use temporary data to create a new user
    //
    //     req.session.theUser = await userDB.getUser(UserID);
    //
    //     // create a user profile
    //     var profile = await userProfileDB.getUserProfile(UserID);
    //
    //     // get the users connections
    //     var connectionList = [];
    //     // console.log('profile');
    //     // console.log(profile);
    //
    //     for (i in profile) {
    //         connectionList.push(profile[i].connection);
    //     }
    //
    //     // console.log('connection list');
    //     // console.log(connectionList);
    //
    //     // update the session
    //     req.session.profile = profile;
    //     sessionUser = req.session.profile;
    //     req.session.conList = connectionList;
    // }

    // handle signin and new connection clicks
    if ( action == '' || action == null) {

        if (typeof sessionUser == 'undefined') {
            var error = null;
            res.render('login', {message: error});
        } else {
            // else if session data exists render saved connections
            res.render('savedConnections', {connect: req.session.profile, user: req.session.theUser});
        }
    } else if (action == 'signout') {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('index');
            }
        });
        // go to login page
    } else if (action == 'login' ) {
        var error = null;
        res.render('login', {message: error});
        // POST method for Login
    } else if (action == 'Login') {
        // check to see if the user has logged in
        if (!req.session.theUser) {

            var uname = req.query.username;
            var passw = req.query.password;

            // check to see if username exists in database
            if (uname == await userDB.validateUsername(uname)) {
                console.log('found username');
                // check to see if the password pairs with the username in database
                if (passw == await userDB.validatePassword(uname, passw)) {
                    console.log('found password for username');
                    // if the user can login then update the session
                    req.session.isLoggedIn = true;
                    req.session.theUser = await userDB.getUserfromUN(uname);

                    var userID = req.session.theUser.id;

                    req.session.profile = await userProfileDB.getUserProfile(userID);
                    var profile = req.session.profile;

                    var connectionList = [];
                    for (i in profile) {
                        connectionList.push(profile[i].connection);
                    }
                    req.session.conList = connectionList;

                    res.render('savedConnections', {connect: req.session.profile, user: req.session.theUser} )
                } else {
                    console.log('password was not found');
                    var error = "Password was incorrect.";
                    res.render('login', {message: error});
                }
            } else {
                console.log('username was not found');
                var error = "Username was incorrect.";
                res.render('login', {message: error});
            }
        }
    }

});

router.get('/newConnection', function (req, res) {
    res.render('newConnection', {user: req.session.theUser});
});

router.post('/', async function (req, res) {
    var sessionUser = req.session.profile;

    var profile = req.session.profile;

    var action = req.body.action;
    var conID = req.body.connectionID;

    var UserID = req.session.theUser.id;

    // get the users connections
    var connectionList = [];
    for (i in profile) {
        connectionList.push(profile[i].connection);
    }
    var connectionList = req.session.conList;

    if (action == 'rsvp') {
        if (!req.session.theUser) {
            var error = null;
            res.render('login', {message: error});
        }
        var value = req.body.rsvp;

        var flag = false;

        for (i in connectionList) {
            if (connectionList[i].connectionID == conID) {
                flag = true;
                break;
            }
        }

        if (flag == false) {
            // add the rsvp event
            await userProfileDB.addRSVP(conID, UserID, value);
            // update the profile
            req.session.profile = await userProfileDB.getUserProfile(UserID);
        } else if (flag == true) {
            // update the rsvp event
            await userProfileDB.updateRSVP(conID, UserID, value);
            // update the profile
            req.session.profile = await userProfileDB.getUserProfile(UserID);
        }

        res.render('savedConnections', {connect: req.session.profile, user: req.session.theUser});
    } else if (action == 'Update') {
        var catalog = await connectionDB.getConnection(conID);
        var host = await userDB.getUser(catalog[0].userID);

        res.render('connection', {connect: catalog, host: host.fName, user: req.session.theUser});
    } else if (action == 'Delete') {
        await userProfileDB.removeConnection(conID, UserID);
        req.session.profile = await userProfileDB.getUserProfile(UserID);

        res.render('savedConnections', {connect: req.session.profile, user: req.session.theUser});
    } else if (action == 'signout') {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('index');
            }
        });
    } else if ( action == "Create") {
        var list = await connectionDB.getConnections();
        var count =(list.length) + 1;

        // get the data for creating a new connection object
        var newConnID = count.toString();
        var name = req.body.name;
        var topic = req.body.topic;
        var details = req.body.details;
        var date = req.body.date;
        var time = req.body.time;
        var userID = req.body.hostid;

        // use that data to create a new connection object
        var newConnection = new Connection({
            connectionID: newConnID,
            name: name,
            topic: topic,
            details: details,
            date: date,
            time: time,
            userID: userID
        });

        // add new connection to connectionDB
        await userProfileDB.addConnection(newConnection);

        var catalog = await connectionDB.getConnections();

        res.render('connections', {connect: catalog, user: req.session.theUser});

    }else {
        res.render('savedConnections', {connect: req.session.conList, user: req.session.theUser});
    }
});

module.exports = router;