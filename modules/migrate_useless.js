var fs = require('fs');

module.exports =
{
  /*
   * Migrate useless items "database"
   **/
  migrate_useless: function (from, text, cb) {
    const crypto = require("crypto");
    
    var useless_file;
    try {
      useless_file = JSON.parse(fs.readFileSync('./_data_useless_v01.json', 'utf8'));
    } catch (err) {
      console.log(err);
    }

    var key = 'useless';

    if (useless_file !== undefined) {
     for ( var i = 0; i < useless_file[key].length; i++) {
       if ( useless_file[key][i].id == undefined ) {
         const id = crypto.randomBytes(4).toString("hex");
         useless_file[key][i].id = id;
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
