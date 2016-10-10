// Simple betting module 

var fs = require('fs');

var util = require('util');

var JsonDB = require('node-json-db');
var db = new JsonDB("when.database", true, false);

function create_bet(from, data) {
	db.push("/" + data + "/creator/", from);
	return from + " created bet '" + data + "'";
}

function show_bet(data) {
	var bet = db.getData("/" + data + "");
	return "WHEN: '" + data + "' [" + bet['creator'] + "]\n" + util.inspect(bet['bets']);
}

function bet(from, data) {
	var target = data.substr(0,10);
	var re = new RegExp('[0-9]{4}-[0-1][0-9]-[0-3][0-9]');
	console.log(target);
	if ( re.test(target ) ) {

		var bet = data.substr(11,data.length);
		try {
			db.getData("/" + bet + "/bets/" + from);
		} catch(error) {
			console.log(error);
			db.push("/" + bet + "/bets/" + from, target);
	                return from + " betted that " + bet + " " + target;
		}
		return "Already voted for '" + bet + "'";
	} else {
		return "Usage: !when bet 2017-01-08 who does what";
	}
}

module.exports = {
	/**
	 * Bett 
	 **/
	get_when: function ( from, text, cb ) {
		var str = text.substr(6,text.length);
		var task = str.substr(0,str.indexOf(' ')+1);
		var data = str.substr(str.indexOf(' ')+1);


		switch(true){
		case RegExp('create').test(task):
			cb(create_bet(from, data));
			break;
		case RegExp('show').test(task):
			cb(show_bet(data));
			break;
		case RegExp('bet').test(task):
			cb(bet(from, data));
			break;
		default:
			cb(false);
			break;
		}
//		var dyna = JSON.parse(fs.readFileSync('./modules.json', 'utf8'));
//		dyna.modules.forEach(function(value, key) {
//			available = available + ', ' + value.command;
//		});
//		cb("Modules: " + available);
	}

}
