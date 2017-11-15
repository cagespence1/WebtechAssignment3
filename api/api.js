// ExpressJS as the web framework for NodeJS (routing etc.)
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

// Body Parser parses responses into JSON objects
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Connect to mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', {
    useMongoClient: true
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'));

// Routes
var checker = require('../routes/checker');
app.use('/api', checker);

var authorize = require('../routes/authorize');
app.use('/api/authorize', authorize);

var movies = require('../routes/movies');
app.use('/api/movies', movies);

var users = require('../routes/users');
app.use('/api/users', users);

var ratings = require('../routes/ratings');
app.use('/api/ratings', ratings);

var posters = require('../routes/posters');
app.use('/api/posters', posters);

// Error handling
var errorHandler = require('../routes/errorHandler');
app.use(errorHandler);

// Listen to the port
app.listen(3000);
