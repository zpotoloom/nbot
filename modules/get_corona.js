var cheerio = require('cheerio');
var request = require('request');

module.exports = {
    get_corona: function (from, text, cb) {
        var options = {
            url: 'https://www.worldometers.info/coronavirus/',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
            }
        };

        request(options, requestCallback);


        function requestCallback(error, response, body) {
            if (error) {
                cb(error);
            }
            else {
                try {
                    var $ = cheerio.load(body);

                    var summaries = $("#maincounter-wrap");
                    var statistics = [];

                    // extract each summary (cases, recovered, death)
                    summaries.each((index, element) => {
                        const rawNumber = $(element).find(".maincounter-number").text();
                        const rawName = $(element).find("h1").text();

                        var name = rawName;
                        var number = rawNumber.trim();

                        switch (rawName) {
                            case 'Coronavirus Cases:':
                                name = 'Nohused:';
                                break;
                            case 'Deaths:':
                                name = 'Mulla all:';
                                break;
                            case 'Recovered:':
                                name = 'Joppas rsk:';
                                break;
                        }

                        statistics.push({ name: name, number: number });
                    });

                    var message = statistics.map(function (item) {
                        return item.name + ' ' + item.number;
                    }).join(', ');

                    cb(message);
                }
                catch (error) {
                    cb(error.message)
                }
            }
        }
    }
}