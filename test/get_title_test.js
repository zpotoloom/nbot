var assert = require('assert-callback');

// URL to Title module
var mod_get_title = require('../modules/get_title').get_title;

describe('Module: get_title', function () {

  it('Return title of URL google.com', function (done) {
    mod_get_title('user', 'https://www.google.com', function (result) {
      assert.equal(result, '[ Google ]');
      done();
    });
  });
  it('Invalid URL', function (done) {
    mod_get_title('user', 'http://url', function (result) {
      assert.equal(result, false);
      done();
    });
  });
  it('Invalid content-type or missing <title> tag', function (done) {
    mod_get_title('user', 'http://ifconfig.ca', function (result) {
      assert.equal(result, false);
      done();
    });
  });

});
