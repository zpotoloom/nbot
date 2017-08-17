var fs = require('fs');

module.exports = 
{
	/*
	 * Reminders 
	 **/
  remindme: function(from, text, cb) {
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
              cb(value.when + ' ' + value.who + ': ' + value.what);
              //return;
          }
      });
    } else {
      cb('Usage: !remindme <who>');
    }

  }

}
