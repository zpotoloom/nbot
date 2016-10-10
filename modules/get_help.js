var fs = require('fs');

module.exports = 
{
	/*
	 * Get help for modules 
	 **/
	get_help: function(from, text, cb) {
		var command = text.split(" ")[1];
		if ( command !== undefined ) {
			var dyna = JSON.parse(fs.readFileSync('./modules.json', 'utf8'));
                	dyna.modules.forEach(function(value, key) {
                		var re = new RegExp(command, 'i');
				if ( re.test(value.command) ) {
					cb(value.description);
					return;
				}
			});
		}
		else {
			cb('Usage: !help <command>');
		}	
	}
	
}
