'use strict'
if(process.env.NODE_ENV != 'production') { require('dotenv').config(); }
const merge = require('merge');

// Default config settings
const default_config = {
  auth_token: process.env.AUTH_TOKEN
}

// Per-environment config settings
const environment_config = require(('./environment/' + process.env.NODE_ENV) || "development");

module.exports = merge(default_config, environment_config);
