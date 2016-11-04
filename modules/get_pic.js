var gis = require('g-i-s');

module.exports = {

	get_pic: function(from, text, cb) {
		var query = text.replace(/[^ ]* /, '');
		var re = new RegExp('boobs|tissid|\(\.\)\(\.\)','i');
                if (re.test(text)) {
			query = 'boobs';
		}
		var q_w_opts = {
            searchTerm: query + ' site:tumblr.com',
            queryStringAddition: "&safe=off&tbs=imgo:1,isz:lt,islt:vga"
        };
		gis(q_w_opts, logResults);
		
		function logResults(error, results) {
		  if (error) {
		    console.log(error);
		  }
		  else {
		    var result = results[Math.floor( Math.random() * ( results.length - 1 ) )];
		    if ( result ) {
		    	cb(result.url);
		    } else {
			cb('Try harder!');
		    }
		  }
		}
	}
}
