var winston = require('winston');
var config  = require('../config');
var path    = require('path');

winston.add(winston.transports.File, { filename: (path.join('log', config.env + '.log'))});
module.exports = winston;
