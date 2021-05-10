var fs = require('fs');

module.exports =
{
  /*
   * Get useless things 
   **/
  get_useless: function (from, text, cb) {
    var who = text.replace(/[^ ]* /, '');
    if (who !== '!get_useless') {
      from = who;
    }
    console.log(who);
    var useless_file;
    try {
      useless_file = JSON.parse(fs.readFileSync('./_data_useless_v01.json', 'utf8'));
    } catch (err) {
      console.log(err);
      return;
    }

    useless_file.useless.forEach(function (value, key) {
      var re = new RegExp(from, 'i');
      if (re.test(value.who)) {
        cb('id: ' + value.id + ', who: ' + value.who + '(self), what: ' + ': ' + value.what);
      } else {
        cb('id: ' + value.id + ', who: ' + value.who + ', what: ' + ': ' + value.what);
      }
    });

  }

}
