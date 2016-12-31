module.exports = {

	get_updates: function(from, text, cb) {
		require('simple-git')()
			.then(function() {
				console.log('Starting pull...');
			})
			.pull(function(err, update) {
        console.log(require('util').inspect(update));
				if(update && update.summary.changes) {
					var util = require('util');
					cb(util.inspect(update.files) + ' ' + util.inspect(update.summary));
				}
			})
			.then(function() {
				console.log('pull done.');
			})
		}
}
