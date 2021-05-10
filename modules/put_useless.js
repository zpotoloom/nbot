var fs = require('fs');

module.exports =
{
  /*
   * Add useless item
   **/
  put_useless: function (from, text, cb) {
    var useless = text.replace(/[^ ]* /, '');
    if (useless !== '') {

      var useless_file;
      try {
        useless_file = JSON.parse(fs.readFileSync('./_data_useless_v01.json', 'utf8'));
      } catch (err) {
        console.log(err);
      }

      var key = 'useless';
      var data = {
        who: from,
        what: useless
      }

      if (useless_file == undefined) {

        useless_file = {}
        useless_file[key] = [];
        useless_file[key].push(data);

      } else {
        useless_file[key].push(data);
      }

      fs.writeFile("./_data_useless_v01.json", JSON.stringify(useless_file), function (err) {
        if (err) {
          return console.log(err);
        }
        //cb(JSON.stringify(data));
      });


    }
    else {
      cb('Usage: !put_useless a thing that is subjectivly useless');
    }

  }

}
