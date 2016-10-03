// List available modules

var fs = require('fs');

module.exports = {
	/**
	 * Lists available modules
	 **/
	get_modules: function ( text, cb ) {
		var available = "";
		var dyna = JSON.parse(fs.readFileSync('./modules.json', 'utf8'));
		dyna.modules.forEach(function(value, key) {
			available = available + ', ' + value.command;
		});
		cb("Modules: " + available);
	}

}
