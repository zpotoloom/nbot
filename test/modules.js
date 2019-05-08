var assert = require('assert-callback');

// URL to Title module
var mod_get_title = require('../modules/get_title').get_title;

describe('Module: get_title', function() {

  it('Return title of URL google.com', function(done) {
    mod_get_title('user', 'https://www.google.com', function(result) {
      assert.equal(result, '[ Google ]');
      done();
    });
  });
  it('Invalid URL', function(done) {
    mod_get_title('user', 'http://url', function(result) {
      assert.equal(result, false);
      done();
    });
  });
  it('Invalid content-type or missing <title> tag', function(done) {
    mod_get_title('user', 'http://ifconfig.ca', function(result) {
      assert.equal(result, false);
      done();
    });
  });

});

// Weather module
var mod_get_weather = require('../modules/get_weather').get_weather;

describe('Module: get_weather', function() {

  it('Default location', function(done) {
    mod_get_weather('user', '!ilm', function(result) {
      assert.equal(result.includes('Tallinn'), true);
      done();
    });
  });
  it('Missing location', function(done) {
    mod_get_weather('user', '!ilm ', function(result) {
      assert.equal(result.includes('Tallinn'), true);
      done();
    });
  });
  it('Unknown location', function(done) {
    mod_get_weather('user', '!ilm XXX', function(result) {
      assert.equal(result, 'Try harder!');
      done();
    });
  });

});
