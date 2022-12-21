module.exports = {

  /*
   * Get weather for Tallinn or specified town
   **/
  get_weather: function (from, text, cb) {
    var city = text.replace(/[^ ]* /, '');
    if (city == text) {
      city = 'Tallinn';
    } else if (city.length == 0) { city = 'Tallinn'; }
    var request = require('request');
    var url = 'https://nominatim.openstreetmap.org/search?city=' + encodeURI(city) + '&format=json&addressdetails=0&countrycodes=ee&limit=1';
    request(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
      }}, function (err, res, body) {
      if ( err) {
	      cb(err);
      } else {
        var response = JSON.parse(body)[0];
        if (response === undefined) {
          request('http://wttr.in/' + encodeURI(city) + '?format="%l:+%t+%h+%w"&M', { method: 'GET' }, function (err, res, body) {
            if (err) {
              console.log(err);
              cb(false);
            } else {
              cb(body.replace(/"/g, ''));
            }
          });
        } else {
          var name = response.display_name;
          var lat = response.lat;
          var lon = response.lon;
          request('https://www.ilmateenistus.ee/ilma_andmed/xml/observations.php', {
            method: 'GET',
            headers: {
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
            }}, function (err, res, body) {
            if ( err) {
              cb(err);
            } else {
              var parser = require('xml2json');
              var observations = JSON.parse(parser.toJson(body)).observations;
              var locations = [];
              if ( observations !== undefined ) {
                observations.station.forEach(station => {
                  locations.push(station);
                });
                var geolib = require('geolib');
                var result = geolib.orderByDistance({ latitude: lat, longitude: lon }, locations);
                for (let i = 0; i < 3; i++) {
                  var a = result[i];
                  if (a.airtemperature.length > 0) {
                    cb('(ilmateenistus.ee) '
                    + a.name + ': Õhk '
                    + a.airtemperature + '°C '
                    + ((a.windspeed.length > 0) ? 'Tuul ' + a.windspeed + '' : '')
                    + ((a.windspeedmax.length > 0) ? '(' + a.windspeedmax + ')ms ' : '')
                    + ((a.watertemperature.length > 0) ? 'Vesi ' + a.watertemperature + ' °C' : ''));
                  }
                }
              }
            }
          });
        }
      }
    });
  }
}
