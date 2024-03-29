var trim = require('trim');

module.exports =
{
  /*
   * Insult
   **/
  insult: function (from, text, cb) {
    var request = require('request');
    request('https://insult.mattbas.org/api/insult.json', { method: 'GET' }, function (err, res, body) {
      if (err) {
        console.log(err);
        cb(false);
      } else {
        if (JSON.parse(body).insult !== undefined) {
          cb(trim(JSON.parse(body).insult));
        }
      }
    });
  }
}
