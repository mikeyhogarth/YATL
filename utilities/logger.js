'use strict'

const winston = require('winston');
const config  = require('../config');
const path    = require('path');

winston.add(winston.transports.File, { filename: (path.join('log', config.env + '.log'))});
module.exports = winston;
