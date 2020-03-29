var request = require('request');

module.exports = {
    get_corona: function (from, text, cb) {
        var options = {
            url: 'https://ytm.azurewebsites.net/api/Corona?code=U1t4NekC9LwF8skhIWUlSgaRZCTcTE3IVi9IOpVgyFhUzKUzVDjxtg==',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
            }
        };

        request(options, requestCallback);

        function requestCallback(error, response, body) {
            if (error) {
                cb(error);
            }

            return body;
        }
    }
}