// Weather plugin using bing
var weather = require('weather-js');

module.exports = {

	/*
	 * Get weather for Tallinn or specified town
	 **/
	get_weather: function(from, location, cb) {
	        var args = location.split(" ");
	        var city = args[1];
	        if ( city == undefined ) {
	                city = 'Põlva';
	        } else if ( city.length == 0 ) { city = 'Tallinn'; }
	        weather.find({search: city, degreeType: 'C'}, function(err, result) {
	        if(err) {
	                console.log(err);
	        } else {
	                var ms = result[0].current.windspeed.split(" ")[0] / 3.6;
	                var direction = result[0].current.winddisplay.split(" ")[2];
	                var dir_text = direction;
	                if ( direction == "North" ) {
	                        direction = "\u2193";
	                }
	                if ( direction == "East" ) {
	                        direction = "\u2190";
	                }
	                if ( direction == "West" ) {
	                        direction = "\u2192";
	                }
	                if ( direction == "South" ) {
	                        direction = "\u2191";
	                }
	                if ( direction == "Northeast" ) {
	                        direction = "\u2199";
	                }
	                if ( direction == "Southeast" ) {
	                        direction = "\u2196";
	                }
	                if ( direction == "Southwest" ) {
	                        direction = "\u2197";
	                }
	                if ( direction == "Northwest" ) {
	                        direction = "\u2198";
	                }
	                cb(result[0].current.observationpoint + ": " + result[0].current.temperature + "(" + result[0].current.feelslike + ")  : Wind " + ms.toFixed(1)  + " m/s " + direction + " (" + dir_text + ")");
	        }
	        });
	}
}

