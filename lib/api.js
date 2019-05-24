var BASE_API = 'https://api.aircall.io/v1';

var request = require('superagent');

module.exports = API;

function API(tokens) {
  this.apiID = tokens.apiID;
  this.apiToken = tokens.apiToken;
  this.bearerToken = tokens.bearerToken;
}

API.prototype.query = function(method, endpoint, options, callback) {
  var base = request[method](BASE_API + endpoint);
  if (this.bearerToken) {
    base = base.set({ Authorization: 'Bearer ' + this.bearerToken });
  } else {
    base = base.auth(this.apiID, this.apiToken);
  }

  base[method === 'get' ? 'query' : 'send'](options).end(function(err, res) {
    if (err) return callback(err);
    if ([200, 201, 204].indexOf(res.statusCode) < 0)
      return callback(
        new Error('[' + res.statusCode + '] Bad response: ' + res.text)
      );
    return callback(null, res.body);
  });
};

API.prototype.get = function(endpoint, options, callback) {
  this.query('get', endpoint, options, callback);
};

API.prototype.post = function(endpoint, options, callback) {
  this.query('post', endpoint, options, callback);
};

API.prototype.delete = function(endpoint, options, callback) {
  this.query('delete', endpoint, options, callback);
};
