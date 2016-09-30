var config = require('./config.json');
var fs = require('fs');

var irc = require("irc");

var bot = new irc.Client(config.Server, config.Nick, {
});

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

// MAIN BOT LOOP
bot.addListener("message", function(from, to, text) {

	var re = new RegExp('^!m');
	if ( re.test(text)) {
		var available = "";
		var dyna = JSON.parse(fs.readFileSync('./modules.json', 'utf8'));
		dyna.modules.forEach(function(value, key) {
			available = available + ' ' + value.command;
		});
		bot.say(config.Channel, "Modules: " + available);
	}
	var dyna = JSON.parse(fs.readFileSync('./modules.json', 'utf8'));
	dyna.modules.forEach(function(value, key) {
	        var re = new RegExp(value.expression,'i');
	
	        if (re.test(text)) {
	                var module = require('./modules/' + value.module);
	
	                module[value.module](text, function(result) {
	                        if ( result !== false ) {
	                                console.log(result);
					bot.say(config.Channel, result);
	                        }
	
	                });
	                return;
	        }
	});

});
