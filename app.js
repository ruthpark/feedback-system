var express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var webpackDevHelper = require('./hotReload.js');
// var utils = require('../utils/utils.js');

// require routes
var auth = require('./routes/auth');
var climbers = require('./routes/climbers');
var climbs = require('./routes/climbs');
var competitions = require('./routes/competitions');
var hosts = require('./routes/hosts');
var problems = require('./routes/problems');

// require Climber
var Climbers = require('./models/Climbers');
var Hosts = require('./models/Hosts');

var mongoose = require('mongoose');
var app = express();

// Set up webpack-hot-middleware for development, express-static for production and test
// NOTE: Chandler refactored this on 11/19/2016. Should be okay, but check here if deployment to Heroku broken
if (process.env.NODE_ENV == 'test'){
    console.log("TEST: Serving static files from /public...");
    app.use(express.static(path.join(__dirname, 'public')));
    mongoose.connect('mongodb://localhost/test-reachdb');
} else if (process.env.NODE_ENV == 'production') {
    console.log("PRODUCTION: Serving static files from /public...");
    app.use(express.static(path.join(__dirname, 'public')));
    mongoose.connect(process.env.MONGODB_URI);
} else {
    console.log("DEVELOPMENT: Turning on WebPack middleware...");
    app = webpackDevHelper.useWebpackMiddleware(app);
    console.log(__dirname);
    app.use('/css', express.static(path.join(__dirname, 'public/css')));
    app.use('/images', express.static(path.join(__dirname, 'public/images')));
    mongoose.connect('mongodb://localhost/reachdb');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Set up some middleware to use.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret : '6170', resave : true, saveUninitialized : true }));

// console.log(require('os').hostname());

//setup routes
app.use('/auth', auth);
app.use('/climbers', climbers);
app.use('/climbs', climbs);
app.use('/competitions', competitions);
app.use('/hosts', hosts);
app.use('/problems', problems);
app.get('*', function(req,res) {
   res.sendFile(path.join(__dirname, 'public/index.html'));
});

//export app
module.exports = app;