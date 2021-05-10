var fs = require('fs');

module.exports =
{
  /*
   * Delete useless item 
   **/
  del_useless: function (from, text, cb) {
    var useless = text.replace(/[^ ]* /, '');
    if (useless !== '') {

      var useless_file;
      try {
        useless_file = JSON.parse(fs.readFileSync('./_data_useless_v01.json', 'utf8'));
      } catch (err) {
        console.log(err);
      }

      var key = 'useless';

      if (useless_file == undefined) {
        cb('No useless items available');
      } else {
        for ( var i = 0; i < useless_file[key].length; i++) {
          var regex = new RegExp( useless, 'g' );
          if ( useless_file[key][i].id == useless || useless_file[key][i].what.match(regex) ) {
            useless_file[key].splice(i, 1);
          }
        }
      }

      fs.writeFile("./_data_useless_v01.json", JSON.stringify(useless_file, null, 2), function (err) {
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
