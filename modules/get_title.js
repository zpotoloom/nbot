// Too much for just title, REWRITE
var url = require('url-regexp');
var title = require('url-to-title');
var trim = require('trim');

module.exports = 
{
	/*
	 * Get Title of URL
	 **/
	get_title: function(text, cb) {
	        if (  url.match(text)[0] == undefined ) {
	                cb(false);
	        } else {
	                title( url.match(text)[0] ).then(function(title) {
				if ( title !== undefined ) {
	                        	cb(trim(title));
				} else {
					cb(false);
				}
	                });
	        }
	}
	
}
