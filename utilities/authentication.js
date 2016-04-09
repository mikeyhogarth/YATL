var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var config   = require('../config');

// Very simple example that just uses a token fished out of the env vars.
passport.use(new Strategy((token, cb) => {
  return token === config.auth_token ? cb(null, 'Authenticated') : cb('Incorrect token');
}));

module.exports = passport.authenticate('bearer', { session: false });
