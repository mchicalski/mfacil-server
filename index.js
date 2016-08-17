var express = require('express');
var bodyParser = require('body-parser');
var sites = require('./routes/sites');
var mongoose = require('mongoose');


var app = express();

//connect to our database
//Ideally you will obtain DB details from a config file
var dbName='siteDB';

var connectionString='mongodb://localhost:27017/'+dbName;

mongoose.connect(connectionString);

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var port = process.env.PORT || 3000;
var router = express.Router();

// Only requests to /api/ will be send to router.
app.use('/api', sites);

module.exports = app;

app.listen(port);
console.log('Server listening on port ' + port);



