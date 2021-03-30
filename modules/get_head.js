process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var url = require('url-regexp');
var trim = require('trim');

module.exports =
{
  /*
   * Get HEAD of URL
   **/
  get_head: function (from, text, cb) {
    if (url.match(text)[0] == undefined) {
      cb(false);
    } else {
      var request = require('request');
      request(url.match(text)[0], { method: 'HEAD' }, function (err, res, body) {
        if (err) {
          console.log(err);
          cb(false);
        } else {
          var util = require('util');
          cb(JSON.stringify(res.headers));
        }
      });
    }
  }
}
