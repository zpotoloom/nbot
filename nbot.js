var config = {
        channel: "#nbot",
        server: "irc.example.com",
        botName: "nbot"
};

var irc = require("irc");

var bot = new irc.Client(config.server, config.botName, {
        channels: config.channels
});

// Weather plugin using bing
var weather = require('weather-js');
// For colorizing IRC output
var c = require('irc-colors');

// Too much for just title, REWRITE
var url = require('url-regexp');
var title = require('url-to-title');
var trim = require('trim');




/*
 * Get Title of URL
 **/
function get_title(text, cb) {
        if (  url.match(text)[0] == undefined ) {
                cb(false);
        } else {
                title( url.match(text)[0] ).then(function(title) {
                        cb(trim(title));
                });
        }
}


/*
 * Get weather for Tallinn or specified town
 **/
function getweather(location, cb) {
        var args = location.split(" ");
        var city = args[1];
        if ( city == undefined ) {
                city = 'Tallinn';
        } else if ( city.length == 0 ) { city = 'Tallinn'; }
        weather.find({search: city, degreeType: 'C'}, function(err, result) {
        if(err) {
                console.log(err);
        } else {
                var ms = result[0].current.windspeed.split(" ")[0] / 3.6;
                var direction = result[0].current.winddisplay.split(" ")[2];
                var dir_text = direction;
                if ( direction == "North" ) {
                        direction = "\u2193";
                }
                if ( direction == "East" ) {
                        direction = "\u2190";
                }
                if ( direction == "West" ) {
                        direction = "\u2192";
                }
                if ( direction == "South" ) {
                        direction = "\u2191";
                }
                if ( direction == "Northeast" ) {
                        direction = "\u2199";
                }
                if ( direction == "Southeast" ) {
                        direction = "\u2196";
                }
                if ( direction == "Southwest" ) {
                        direction = "\u2197";
                }
                if ( direction == "Northwest" ) {
                        direction = "\u2198";
                }
                cb(result[0].current.observationpoint + ": " + result[0].current.temperature + "(" + result[0].current.feelslike + ")  : Wind" + ms.toFixed(1)  + " m/s " + direction + " (" + dir_text + ")");
        }
        });
}


// Join channel after motd
bot.addListener('motd', function(motd) {
	bot.join(config.channel + ' Password');
});

// Listen for errors, otherwise causes crash
bot.addListener('error', function(message) {
    console.log('error: ', message);
});

// MAIN BOT LOOP
bot.addListener("message", function(from, to, text) {



switch(true){
case RegExp('^!help.*$','i').test(text):
        var command = text.split(" ")[1];
        if ( command !== undefined ) {
                switch (true) {
                case RegExp('^help$','i').test(command):
                        bot.say(config.channel, c.green("!HELP"));
                        break;
                case RegExp('^ilm$','i').test(command):
                        bot.say(config.channel, c.green("Shows weather for Tallinn or requested city"));
                        break;
		}
        } else {
		bot.say(config.channel, c.green("Available commands: !help !ilm"));
        }
        break;
case RegExp('^!ilm.*','i').test(text):
        getweather(text, function(result) {
                bot.say(config.channel, c.bold(result));
        });
        break;
case RegExp('http','i').test(text):
        get_title(text, function(result) {
                if( result !== false ) {
                        bot.say(config.channel, c.pink(result));
                }
        });
        break;
default:
	console.log(text);
        break;
}

});
