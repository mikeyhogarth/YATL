var express     = require('express');
var fs          = require('fs');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var logger      = require('./utilities/logger');
var httpLog     = require('morgan')
var path        = require('path');
var config      = require('./config');

// Start the app
var app = express();

// Middlewares
app.use(bodyParser.json());

// Http Logging
var accessLogStream = fs.createWriteStream(path.join(__dirname,'/log/', config.env +'.log'), {flags: 'a'});
app.use(httpLog('combined', {stream: accessLogStream}));

// DB
mongoose.connect(config.db_host);

// Mount Routes
app.use(require('./routes'));

// Listen for requests
var port   = config.port || process.env.PORT;
var server = app.listen(port, function() { logger.info("Listening on port " + port) });

module.exports = server;
