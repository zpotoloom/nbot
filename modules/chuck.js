var trim = require('trim');

module.exports = 
{
	/*
	 * Get Chuck Norris joke 
	 **/
	chuck: function(from, text, cb) {
              var request = require('request');
              request('http://api.icndb.com/jokes/random', {method: 'GET'}, function (err, res, body) {
	              if (err) {
		              console.log(err);
		              cb(false);
	              } else {
				var util = require('util');
		              	console.log(util.inspect(body));
				cb(trim(body.value.joke));
	              }
              });
  }
}
