var Aircall = require('./aircall');

/**
 * Create an Aircall client
 *
 * @param {String} apiID
 * @param {String} apiToken
 * @return {Aircall}
 */

module.exports = function aircall(apiID, apiToken) {
  // handle no params
  if (!apiID)
    throw new Error('Aircall requires an { token: <yourtoken> } object as params');

  // handle bearer token
  if (apiID && typeof apiID === 'object') {
    if (!apiID.token)
      throw new Error('Aircall requires an { token: <yourtoken> } object as params');

    return new Aircall({ token: apiID.token });
  }

  // handle legacy
  if (!apiID) throw new Error('Aircall requires an apiID.');
  if (!apiToken) throw new Error('Aircall requires an apiToken.');

  return new Aircall({ apiID: apiID, apiToken: apiToken });
};
