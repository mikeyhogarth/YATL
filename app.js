'use strict'
const express         = require('express');
const fs              = require('fs');
const bodyParser      = require('body-parser');
const mongoose        = require('mongoose');
const logger          = require('./utilities/logger');
const httpLog         = require('morgan')
const path            = require('path');
const config          = require('./config');

// Start the app
const app = express();

// Middlewares
app.use(bodyParser.json());

// Http Logging
const accessLogStream = fs.createWriteStream(path.join(__dirname,'/log/', config.env +'.log'), {flags: 'a'});
app.use(httpLog('combined', {stream: accessLogStream}));

// DB
mongoose.connect(config.db_host);

// Auth
app.use('/', require('./utilities/authentication'));

// Mount Routes
app.use(require('./routes'));

// Listen for requests
const port   = config.port || process.env.PORT;
const server = app.listen(port, () => logger.info("Listening on port " + port));

module.exports = server;
