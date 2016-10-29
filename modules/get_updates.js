var git = require('simple-git')('./');

module.exports = {

	get_updates: function(from, text, cb) {
		require('simple-git')()
			.then(function() {
				console.log('Starting pull...');
			})
			.pull(function(err, update) {
				if(update && update.summary.changes) {
					cb(update.summary.changes);
				}
			})
			.then(function() {
				console.log('pull done.');
			})
		});
	}
}
