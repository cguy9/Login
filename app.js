var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');

// connect to the database
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/dodoDB', {useNewUrlParser: true});
// require and connect to mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dodoDB', {useNewUrlParser: true, useUnifiedTopology: true});

// set up database connection with mongoose and mongoDB
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connection successful!");
});

//set view engine to ejs
app.set('view engine', 'ejs');

// add the css
app.use('/assets', express.static('assets'));

// set up the session
app.use(session({secret: 'secret', saveUninitialized: true, resave: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// get the controller
let connectionController =require('./routes/connectionController.js');
let userController = require('./routes/userController');

// set up the controller
app.use('/profile', userController);
app.use('/', connectionController);


// port number
app.listen(3000);