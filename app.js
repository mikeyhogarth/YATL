var envvar      = require('dotenv').config();
var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var routes      = require('./routes');
var config      = require('./config')[process.env.NODE_ENV || "development"];

// Start the app
var app = express();

// Middlewares
app.use(bodyParser.json());

// Connect to DB
mongoose.connect(config.db_host);

// Mount Routes
routes.mount(app);

// Listen for requests
var port   = process.env.PORT || 3000;
var server = app.listen(port, function() { console.log("Listening on port " + port) });

module.exports = server;
