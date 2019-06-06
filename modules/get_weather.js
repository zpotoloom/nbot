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
        console.log(city);
        console.log(text);
        if ( city == text ) {
            city = 'Tallinn';
        } else if ( city.length == 0 ) { city = 'Tallinn'; }
            weather.find({ search: city, degreeType: 'C' }, function(err, result) {
                if(err) {
                    console.log(err);
                    cb("Microsoft discontinued access to the MSN Weather Service API on April 15, 2016.");
                } else {
                    var ms = result[0].current.windspeed.split(" ")[0] / 3.6;
                    var direction = result[0].current.winddisplay.split(" ")[2];
                    var trim = require('trim');
                    var addition = "";
                    if ( result[0].current.temperature >= 25 ) {
                        addition = "Vitun kuuma se on ! ";
                    }
                    cb(addition + trim(result[0].current.observationpoint + ": " + result[0].current.temperature + "(" + result[0].current.feelslike + ") " + result[0].current.humidity + "% " + ms.toFixed(1)    + " m/s (" + direction + ") " + result[0].current.skytext));
                }
            });
        }
}
