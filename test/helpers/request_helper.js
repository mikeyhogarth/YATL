const config        = require('../../config');

module.exports.getWithAuth = function (req, server, path) {
  return req(server).get(path).set('Authorization', 'Bearer ' + config.auth_token);
}

module.exports.postWithAuth = function (req, server, path) {
  return req(server).post(path).set('Authorization', 'Bearer ' + config.auth_token);
}

module.exports.putWithAuth = function (req, server, path) {
  return req(server).put(path).set('Authorization', 'Bearer ' + config.auth_token);
}

module.exports.deleteWithAuth = function (req, server, path) {
  return req(server).delete(path).set('Authorization', 'Bearer ' + config.auth_token);
}



