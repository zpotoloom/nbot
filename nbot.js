// Read config options
var config = require('./config.json');

var irc = require("irc");
var bot = new irc.Client(config.Server, config.Nick, {
	autoRejoin: true
});

// Checks if input matches command expression and executes modules
function check_for_command(text) {
	var fs = require('fs');
        var dyna = JSON.parse(fs.readFileSync('./modules.json', 'utf8'));

        dyna.modules.forEach(function(value, key) {

                var re = new RegExp(value.expression,'i');
                if (re.test(text)) {

                        var module = require('./modules/' + value.module);
                        module[value.module](text, function(result) {
                                if ( result !== false ) {
                                        bot.say(config.Channel, result);
                                }
                        });
                        return;
                }
        });
}

console.log("Starting IRC bot");
console.log("Connecting to " + config.Server + " channel " + config.Channel + " as " + config.Nick);


// Join channel after motd
bot.addListener('motd', function(motd) {
	bot.join(config.Channel);
	bot.send('PRIVMSG', 'nickserv', 'identify', config.Password);
});

// Listen for errors, otherwise causes crash
bot.addListener('error', function(message) {
	console.log('error: ', message);
});

// Listen for messages 
bot.addListener("message", function(from, to, text) {
	check_for_command(text);
});
