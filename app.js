var express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var webpackDevHelper = require('./hotReload.js');

// require routes
var auth = require('./routes/auth');
var propositions = require('./routes/propositions');

// require models
var Propositions = require('./models/Propositions');

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
app.use(session({ secret : 'efficiency', resave : true, saveUninitialized : true }));

//setup routes
app.use('/auth', auth);
app.use('/propositions', propositions);
app.get('*', function(req,res) {
   res.sendFile(path.join(__dirname, 'public/index.html'));
});

//export app
module.exports = app;