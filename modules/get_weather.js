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
    request('http://wttr.in/' + city + '?format="%l:+%c+%t+%h+%w+%m"', { method: 'GET' }, function (err, res, body) {
      if (err) {
        console.log(err);
        cb(false);
      } else {
        cb(body.replace(/"/g, ''));
      }
    });
  }
}
