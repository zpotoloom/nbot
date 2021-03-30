var fs = require('fs');

module.exports =
{
  /*
   * Reminders
   **/
  remindme: function (from, text, cb) {
    var remind = text.replace(/[^ ]* /, '');
    if (remind !== '') {

      var reminders_file;
      try {
        reminders_file = JSON.parse(fs.readFileSync('./_data_reminders_v01.json', 'utf8'));
      } catch (err) {
        console.log(err);
      }

      var key = 'remind';
      var data = {
        who: from,
        what: remind,
        when: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      }

      if (reminders_file == undefined) {

        reminders_file = {}
        reminders_file[key] = [];
        reminders_file[key].push(data);

      } else {
        reminders_file[key].push(data);
      }

      fs.writeFile("./_data_reminders_v01.json", JSON.stringify(reminders_file), function (err) {
        if (err) {
          return console.log(err);
        }
        //cb(JSON.stringify(data));
      });


    }
    else {
      cb('Usage: !remind someone does something');
    }

  }

}
