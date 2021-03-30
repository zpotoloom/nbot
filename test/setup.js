var assert = require('assert-callback');

describe("Setup Input Validator", function () {
  describe("Channels", function () {

    // Must follow the pattern of <#channel> or <#channel, #channel>
    var regex = /(([, ]*#[a-z]+)+)$/;

    describe("Single Channel", function () {
      it("should not allow empty", function () {
        assert(regex.test("") === false);
      });

      it("should start with #", function () {
        assert(regex.test("abc") === false)
      });

      it("should start with # and followed by 1 or more characters", function () {
        assert(regex.test("#") === false);
        assert(regex.test("#a") === true);
      });
    });

    describe("Multiple Channels", function () {
      it("should not allow trailing ','", function () {
        assert(regex.test("#abc,") === false);
      });

      it("should require # before every group separated by ','", function () {
        assert(regex.test("#abc,abc") === false);
      });

      it("should accept multiple entries separated by ',' or ', '", function () {
        assert(regex.test("#abc,#abc") === true);
      });

      it("should allow whitespace after ','", function () {
        assert(regex.test("#abc,#abc") === true);
        assert(regex.test("#abc, #abc") === true);
      });
    });
  });
});