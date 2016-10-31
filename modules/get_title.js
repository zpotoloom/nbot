process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Too much for just title, REWRITE
var url = require('url-regexp');
var title = require('url-to-title');
var trim = require('trim');
var request = require('request');

module.exports = 
{
	/*
	 * Get Title of URL
	 **/
	get_title: function(from, text, cb) {
	        if (  url.match(text)[0] == undefined ) {
	                cb(false);
	        } else {
			var request = require('request');
			request( url.match(text)[0], {method: 'HEAD'}, function (err, res, body){
				if (err) {
					console.log(err);
					cb(false);
				} else {
					var re = new RegExp('text.html');
                			if (re.test(res.headers['content-type'])) {
						try {
							title( url.match(text)[0] ).then(function(title) {
								if ( title !== undefined ) {
					                	       	cb(trim('[ ' + title + ' ]'));
								} else {
									cb(false);
								}

				                	});
						} catch (err) {
							console.log(err);
							cb(false);
						}
                        	        } else {
                        	                cb(false);
                        	        }
				}
                        });
	        }
	}
	
}
