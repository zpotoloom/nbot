// Read config options
var config = require('./config.json');


// Checks if input matches command expression and executes modules
function check_for_command(server, from, channel, text, cb) {
	var fs = require('fs');
        
	if ( fs.existsSync('./modules.json') ) {
	        var dyna = JSON.parse(fs.readFileSync('./modules.json', 'utf8'));
	
	        dyna.modules.forEach(function(value, key) {
	
	                var re = new RegExp(value.expression,'i');
	                if (re.test(text)) {
				console.log('Server: ' + server + ' Channel: ' + channel + ' User: ' + from + ' Command: ' + text);
	                        // delete module from cache to allow dynamic changes
				delete require.cache[require.resolve('./modules/' + value.module + '.js')];
				// load module from disk
				var module = require('./modules/' + value.module + '.js');
	                        module[value.module](from,text, function(result) {
	                                if ( result !== false ) {
	                                        cb(channel, result);
	                                }
	                        });
	                        return;
	                }
	        });
	}
}


// connects to server, joins channels and listens for messages
function start_bot(config) {
	var IRC = require('ircsock');

	var options = {
		name: 'IRC',
		port: 6667,
		ssl: false
	}

	options.host = config.Server;
	options.nickname = config.Nick;
	options.username = config.Nick;
	options.realname = config.Nick;
	options.password = config.Password;
	
	var irc = new IRC(options);
	
	irc.on('motd', function() {
		var util = require('util');
		console.log("Connecting to " + config.Server + " channel(s) " + util.inspect(config.Channel) + " as " + config.Nick);
		if ( config.Channel.constructor.prototype.hasOwnProperty('push') ) {
	        	config.Channel.forEach(function(value) {
	                	irc.join(value);
	                });
		} else {
			irc.join(config.Channels);
	        }
	});

	irc.on('join', function(event) {
		if ( event.nick == config.Nick ) {
			console.log(event.nick + ' joined ' + event.target);
		}
	});
	
	// Listen for PRIVMSG
	irc.on('privmsg', function (event) {
	    check_for_command(config.Server, event.nick, event.target, event.message, function(channel, message){
		irc.privmsg(channel, message);
	    });
	    // leave channel when requested 
	    if (event.message === '!leavechannel') {
	        irc.part(event.target, 'leaving from ' + event.target + ' as requested by ' + event.nick, function() {
			console.log('Leave requested from ' + event.target + ' by ' + event.nick);
		});
	    }
	});

	// join channel upon invite
	irc.on('invite', function (event) {
		var channel_regex = /.*(#.*)/g;
		if ( match = channel_regex.exec(event.raw) ) {
			irc.join(match[1]);
			console.log('Joined: ' + match[1]);
		}
	});
	
	// Reconnect when kicked
	irc.on('kick', function ( event ) {
		console.log(event);
		if ( event.client == config.Nick ) {
			irc.join(event.target);
		}
	});
	
	// Connect to server
	irc.connect();
}



// Main Program
console.log('Starting IRC bot\n');
config.forEach( function(value) {
	start_bot(value);
});
