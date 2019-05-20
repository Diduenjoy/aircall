var defaults = require("defaults");

module.exports = Teams;

function Teams(API) {
  this.API = API;
}

Teams.prototype.list = function(callback, options) {
  var options = defaults(options, {
    page: 1, // Pagination for list of objects
    per_page: 50, // Number of objects fetched per request
    order: "asc", // Reorder entries per creation date, asc or desc
    from: null, // Set a minimal creation date for objects	(non
    to: null // Set a maximal creation date for objects
  });

  this.API.get("/teams", options, callback);
};

Teams.prototype.get = function(id, callback, options) {
  this.API.get("/teams/" + id, options, callback);
};
