process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var url = require('url-regexp');
var trim = require('trim');

// Check if content is text/html
function check_header(url, cb) {
	var request = require('request');
	request(url, {method: 'HEAD'}, function (err, res, body) {
		if (err) {
			console.log(err);
			cb(false);
		} else {
			var re = new RegExp('text.html');
			if ( res.headers['content-type'] !== undefined ) {
				var re = new RegExp('text.html');
				if (re.test(res.headers['content-type'])) {
					cb(true);
				} else cb(false);
			} else cb(false);
		}
	});
}

// Extract title from html body
function extract_title(url, cb) {
	var request = require('request');
	request(url, {method: 'GET'}, function (err, res, body) {
                if (err) {
                        console.log(err);
                        cb(false);
                } else {
			// removo linebreaks
			body = body.replace(/(\r\n|\n|\r)/gm,"");
			var re = new RegExp('<title>(.*[^<])<\/title>');
			if ( body.match(re) != null ) {
				var title = body.match(re)[1];
				if ( title.length >= 100 ) {
					title = title.substring(0,99);
				}
				cb(title);
			} else {
				cb(false);
			}
                }
        });
}


module.exports = 
{
	/*
	 * Get Title of URL
	 **/
	get_title: function(from, text, cb) {
	        if (  url.match(text)[0] == undefined ) {
	                cb(false);
	        } else {
			check_header(url.match(text)[0], function(result) {
				if ( result ) {
					extract_title(url.match(text)[0], function(title) {
						if ( title ) {
							cb('[ ' + trim(title) + ' ]');
						}
					});
				} else {
					cb(false);
				}
			});
                }
        }
	
}
