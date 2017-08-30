var fs = require('fs');
var c = require('irc-colors');


function days_between(date1, date2) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms)

    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY)

}

module.exports = 
{
	/*
	 * Reminders 
	 **/
  reminders: function(from, text, cb) {
    var delete_command = text.match(/delete/);
    if ( delete_command ) {
      var reminders_file;
      try {
          reminders_file = JSON.parse(fs.readFileSync('./_data_reminders_v01.json', 'utf8'));
      } catch (err) {
          console.log(err);
          return;
      }

      var reminders_data = {},
          key = 'remind';
      reminders_data[key] = [];

      reminders_file.remind.forEach(function(value) {
        if ( value.who != from ) {
          reminders_data[key].push(value);
        } else {
          var util = require("util");
          console.log("Deleted: " + util.inspect(value));
        }
      });

      fs.writeFile("./_data_reminders_v01.json", JSON.stringify(reminders_data), function(err) {
        if(err) {
          return console.log(err);
        }
      });

    } else {
      var who = text.replace(/[^ ]* /, '');
      if ( who !== '!reminders' ) {
          from = who;
      }
      console.log(who); 
      var reminders_file;
      try {
          reminders_file = JSON.parse(fs.readFileSync('./_data_reminders_v01.json', 'utf8'));
      } catch (err) {
          console.log(err);
          return;
      }

      reminders_file.remind.forEach(function(value, key) {
          var re = new RegExp(from, 'i');
          if ( re.test(value.who) ) {
              if ( value.what.match(/\d+/) ) {
                  var days_from_what = value.what.match(/\d+/)[0],
                      days_remaining = days_from_what - days_between(new Date(), new Date(value.when));
                  if ( days_remaining > 0 ) {
                      cb(c.green(value.when) + ' (' + days_remaining  + ' days remaining): ' + c.yellow(value.who) + ': ' + value.what);
                  } else {
                      cb(c.red(value.when) + ' (' + days_remaining  + ' days remaining): ' + c.yellow(value.who) + ': ' + value.what);
                  }
              } else {
                  cb(value.when + ' ' + c.yellow(value.who) + ': ' + value.what);
              }
              //return;
          }
      });
    }

  }

}
