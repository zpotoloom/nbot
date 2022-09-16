var assert = require('assert-callback');

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

});
