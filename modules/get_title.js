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
	get_title: function(text, cb) {
	        if (  url.match(text)[0] == undefined ) {
	                cb(false);
	        } else {
			var request = require('request');
			request( url.match(text)[0], {method: 'HEAD'}, function (err, res, body){
				if ( res.headers['content-type'] == 'text/html' ) {
					title( url.match(text)[0] ).then(function(title) {
						if ( title !== undefined ) {
				                       	cb(trim(title));
						} else {
							cb(false);
						}
			                });
                                } else {
                                        cb(res.headers['content-type'] + ' ' + res.headers['content-length']);
                                }
                        });
	        }
	}
	
}