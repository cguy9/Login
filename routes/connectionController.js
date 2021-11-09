// add required functions
var connections = require('../module/connectionDB');
var users = require('../module/userDB');

var express = require('express');
var router = express.Router();

// index
router.get('/', function (req, res) {
    res.render('index', {user: req.session.theUser});
});

// index
router.get('/index', function (req, res) {
    res.render('index', {user: req.session.theUser});
});

// connections
router.get('/connections', async function (req, res) {
    //load the catalog / database of connections
    var catalog = await connections.getConnections();
    res.render('connections', {connect: catalog, user: req.session.theUser});
});

// connection
router.get('/connection/:id', async function (req, res) {
    // get the connectionID from the request query
    var event = await connections.getConnection(req.params.id);
    var host = await users.getUser(event[0].userID);

    //load the catalog / database of connections
    var catalog = await connections.getConnections();

    // check if the event is defined
    if (event) {
        // check if the event exists in db
        if ((1 <= event[0].userID) && (event[0].userID <= 6)) {
            res.render('connection', {connect: event, host: host.fName, user: req.session.theUser});
        } else {
            // else go back to the connections page
            res.render('connections', {connect: catalog, user: req.session.theUser});
        }
    } else {
        // if no connectionID param, go back to connections
        res.render('connections', {connect: catalog, user: req.session.theUser});
    }
});

// new connection
router.get('/newConnection', function (req, res) {
    res.render('newConnection', {user: req.session.theUser});
});


// about
router.get('/about', function (req, res) {
    res.render('about', {user: req.session.theUser});
});

// contact
router.get('/contact', function (req, res) {
    res.render('contact', {user: req.session.theUser});
});



module.exports = router;
