var assert = require('assert-callback');

// chuck module
var mod_chuck = require('../modules/chuck').chuck;

describe('Module: chuck', function () {

  it('Return Chuck norris fact', function (done) {
    mod_chuck('user', '', function (result) {
      assert.equal(result.includes('Chuck'), true);
      done();
    });
  });

});
