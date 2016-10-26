// Read config options
var config = require('./config.json');

var irc = require("irc");
var bot = new irc.Client(config.Server, config.Nick, {
	autoRejoin: true
});

// Checks if input matches command expression and executes modules
function check_for_command(from, to, text) {
	var fs = require('fs');
        var dyna = JSON.parse(fs.readFileSync('./modules.json', 'utf8'));

        dyna.modules.forEach(function(value, key) {

                var re = new RegExp(value.expression,'i');
                if (re.test(text)) {

                        var module = require('./modules/' + value.module + '.js');
                        module[value.module](from,text, function(result) {
                                if ( result !== false ) {
                                        bot.say(to, result);
                                }
                        });
                        return;
                }
        });
}

console.log("Starting IRC bot");
console.log("Connecting to " + config.Server + " channel(s) " + config.Channels + " as " + config.Nick);


// Join channel after motd
bot.addListener('motd', function(motd) {
	var channels = config.Channels.split(",");
	if ( channels.constructor.prototype.hasOwnProperty('push') ) {
		channels.forEach(function(value) {
			bot.join(value);
		});
	} else {
		bot.join(config.Channels);
	}
	bot.send('PRIVMSG', 'nickserv', 'identify', config.Password);
});

// Listen for errors, otherwise causes crash
bot.addListener('error', function(message) {
	console.log('error: ', message);
});

// Listen for messages 
bot.addListener("message", function(from, to, text) {
	check_for_command(from, to, text);
});
