var request = require('request');
var fs = require('fs');

module.exports = {

  get_pic: function (from, text, cb) {
    var urls = [];
    // read suitable urls from the file
    try {
      // Will throw exception when such file does not exist
      urls = fs.readFileSync('./pic_reddit_urls.txt', 'utf8').split(/\r?\n/);

      // Empty file has single element with empty contents
      var hasUrls = !(urls.length === 1 && urls[0] === "");
      if (!hasUrls) {
        cb("Found file pic_reddit_urls.txt but it appears to be empty");
      }
    } catch (error) {
      cb("Reading the urls from the file 'pic_reddit_urls.txt' has encountered an error '" + error.message + "'");
    }

    // make request to the given random url
    var options = {
      url: urls[getIndex(urls.length)],
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
      }
    };

    // choose one random response if successful
    request(options, requestCallback)

    function requestCallback(error, response, body) {
      if (error) {
        cb(error);
      }
      else {
        try {
          var response = JSON.parse(body);
          var children = response.data.children;

          var urls = children.map(x => x.data.url);
          var url = urls[getIndex(urls.length)];

          cb(url);
        }
        catch (error) {
          cb(error.message)
        }
      }
    }

    function getIndex(maxLength) {
      return Math.floor(Math.random() * Math.floor(maxLength - 1));
    }
  }
}
