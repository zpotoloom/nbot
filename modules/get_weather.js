// Weather plugin using bing
// module caches something in included modules, breaks when multiple failed requests sent
delete require.cache[require.resolve('weather-js')];
var weather = require('weather-js');

module.exports = {

    /*
     * Get weather for Tallinn or specified town
     **/
    get_weather: function(from, text, cb) {
        var city = text.replace(/[^ ]* /, '');
        if ( city == text ) {
            city = 'Tallinn';
        } else if ( city.length == 0 ) { city = 'Tallinn'; }
            weather.find({ search: city, degreeType: 'C' }, function(err, result) {
                if(err) {
                    cb("Try harder!");
                } else {
                    console.log(err);
                    var ms = result[0].current.windspeed.split(" ")[0] / 3.6;
                    var direction = result[0].current.winddisplay.split(" ")[2];
                    var trim = require('trim');
                    cb(trim(result[0].current.observationpoint + ": " + result[0].current.temperature + "(" + result[0].current.feelslike + ") " + result[0].current.humidity + "% " + ms.toFixed(1)    + " m/s (" + direction + ") " + result[0].current.skytext));
                }
            });
        }
}
