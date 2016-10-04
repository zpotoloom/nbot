var gis = require('g-i-s');

module.exports = {

	get_boobs: function(text, cb) {
		gis('boobs site:tumblr.com', logResults);
		
		function logResults(error, results) {
		  if (error) {
		    console.log(error);
		  }
		  else {
		    cb(results[Math.floor( Math.random() * ( results.length - 1 ) )].url);
		    //console.log(JSON.stringify(results, null, '  '));
		  }
		}
	}
}
