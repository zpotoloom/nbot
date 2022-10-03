var trim = require('trim');

module.exports =
{
  /*
   * Get Chuck Norris joke
   **/
  chuck: function (from, text, cb) {
    var request = require('request');
    request('http://api.icndb.com/jokes/random', { method: 'GET' }, function (err, res, body) {
      if (err) {
        console.log(err);
        cb(false);
      } else {
        if (body !== undefined && body.length > 0 &&JSON.parse(body).value !== undefined) {
          cb(trim(JSON.parse(body).value.joke));
        } else {
	  cb("500");
	}
      }
    });
  }
}
