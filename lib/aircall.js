var request = require('superagent');
var defaults = require('defaults');

var API = require('./api');
var Users = require('./users');
var Teams = require('./teams');
var Numbers = require('./numbers');
var Calls = require('./calls');
var Contacts = require('./contacts');
var Tags = require('./tags');

module.exports = Aircall;

function Aircall(tokens) {
  if (!(this instanceof Aircall)) return new Aircall(apiID, apiToken);

  // handle bearer token
  this.bearerToken = tokens.token;

  // handle legacy apiId / apiToken
  this.apiID = tokens.apiID;
  this.apiToken = tokens.apiToken;

  this.API = new API({
    apiID: this.apiID,
    apiToken: this.apiToken,
    bearerToken: this.bearerToken
  });

  this.users = new Users(this.API);
  this.teams = new Teams(this.API);
  this.numbers = new Numbers(this.API);
  this.calls = new Calls(this.API);
  this.contacts = new Contacts(this.API);
  this.tags = new Tags(this.API);
}

Aircall.prototype.ping = function(callback) {
  this.API.get('/ping', null, callback);
};

Aircall.prototype.company = function(callback) {
  this.API.get('/company', null, callback);
};
