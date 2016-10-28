var gis = require('g-i-s');

module.exports = {

	get_pic: function(from, text, cb) {
		var query = text.split(' ');
		gis(query[1] + ' site:tumblr.com', logResults);
		
		function logResults(error, results) {
		  if (error) {
		    console.log(error);
		  }
		  else {
		    cb(results[Math.floor( Math.random() * ( results.length - 1 ) )].url);
		  }
		}
	}
}
