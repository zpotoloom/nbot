var prompt = require('prompt');

var config_params = [
  {
    name: 'Server', 
    validator: /^[a-zA-Z.]+$/,
    warning: 'Invalid server name',
    required: true
  },
  {
    name: 'Channel',
    validator: /^#.*/,
    warning: 'Must start with #',
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
    name: 'Save',
    validator: /^[yn]$/,
    warning: 'Input y or n'
  }
];

prompt.message = "";
prompt.start();

console.log('Specify IRC bot configuration parameters.');

prompt.get(config_params, function(err, result) {
  if (err) { return onErr(err); }
  console.log('Write the following configuration to file ?');
  console.log('  Server: ' + result.Server);
  console.log('  Channel: ' + result.Channel);
  console.log('  Nick: ' + result.Nick);

  config_options = JSON.stringify(result);

  prompt.delimiter = ' (y/n) ';
  prompt.get(yes_no, function(err, result) {
    if (err) {return onErr(err); }
	if (result.Save == 'y') { 
	  fs = require('fs');
	  fs.appendFile("config.json", config_options, function(err) {
	    if(err) {
	      console.log(err);
	    } else {
		console.log('Configuration written to config.json'); 
	    }
	  });
	}
	else console.log('Configuration cancelled');
  });
});

function onErr(err) {
  console.log(err);
  process.exit(1);
}
