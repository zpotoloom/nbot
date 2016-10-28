var prompt = require('prompt');
var util = require('util');

var all_config_options = '[\n';

var config_params = [
  {
    name: 'Server', 
    validator: /^[a-zA-Z.]+$/,
    warning: 'Invalid server name',
    required: true
  },
  {
    name: 'Channels',
    validator: /^#.*/,
    warning: 'Must start with #, comma separated channels',
    required: true
  },
  {
    name: 'Nick',
    default: 'nbot'
  },
  {
    name: 'Password',
    hidden: true,
    replace: '*'
  }
];

var yes_no = [
  {
    name: 'Add',
    validator: /^[yn]$/,
    warning: 'Input y or n'
  }
];

prompt.message = "";
prompt.start();

console.log('Specify IRC bot configuration parameters.');

( function add_server() {
  prompt.delimiter = ':';
  prompt.get(config_params, function(err, result) {
    if (err) { return onErr(err); }
    console.log('Added server to configuration');
    console.log('  Server: ' + result.Server);
    console.log('  Channels: ' + util.inspect(result.Channels));
    console.log('  Nick: ' + result.Nick);
  
    config_options = JSON.stringify(result, null, 4);
    all_config_options = all_config_options + config_options;
  
  
  
	  prompt.delimiter = ' another server ? (y/n): ';
	  prompt.get(yes_no, function(err, result) {
	    if (err) {return onErr(err); }
	      if (result.Add == 'y'){
		all_config_options = all_config_options + ',\n';
		add_server();
	      } else {
	      	all_config_options = all_config_options + '\n]';
	      	console.log('Saving configuration');
	  	fs = require('fs');
	  	fs.appendFile('config.json', all_config_options, function(err) {
	  	  if(err) {
	  	  	console.log(err);
	  	  } else {
	  	  	console.log('Configuration written to config.json');
	  	  }
	  	});
	      }
	  });
  });
	
}());

function onErr(err) {
  console.log(err);
  process.exit(1);
}
