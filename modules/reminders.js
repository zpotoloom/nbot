var fs = require('fs');
var c = require('irc-colors');


function date_days_ago(ndays) {
  var today=new Date(); //Today's Date
  var requiredDate=new Date(today.getFullYear(),today.getMonth(),today.getDate()-ndays).toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[0];

  return requiredDate;
}


module.exports = 
{
	/*
	 * Reminders 
	 **/
  reminders: function(from, text, cb) {
    var user = text.replace(/[^ ]* /, '');
    if ( user !== '' ) {

      var reminders_file;
      try {
          reminders_file = JSON.parse(fs.readFileSync('./_data_reminders_v01.json', 'utf8'));
      } catch (err) {
          console.log(err);
          return;
      }

      reminders_file.remind.forEach(function(value, key) {
          var re = new RegExp(user, 'i');
          if ( re.test(value.who) ) {
              if ( value.what.match(/\d+/) ) {
                  if ( value.what.match(/\d+/)[0] < new Date() ) {
                      if ( value.when.split(" ")[0] > date_days_ago(value.what.match(/\d+/)[0]) ) {
                          cb(c.green(value.when) + ' ' + value.who + ': ' + value.what);
                      } else {
                          cb(c.red(value.when) + ' ' + value.who + ': ' + value.what);
                      }
                  } else {
                      cb(value.when + ' ' + value.who + ': ' + value.what.replace(value.what.match(/\d+/)[0],c.red(value.what.match(/\d+/)[0])));
                  }
              } else {
                  cb(value.when + ' ' + value.who + ': ' + value.what);
              }
              //return;
          }
      });
    } else {
      cb('Usage: !remindme <who>');
    }

  }

}
