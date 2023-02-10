var trim = require('trim');

module.exports =
{
  /*
   * Get Chuck Norris joke
   **/
  chuck: function (from, text, cb) {
    var request = require('request');
    request('http://www.chucknorrisfacts.fr/facts/random', function (error, response, body)
    {
      if (!error && response.statusCode == 200)
      {
        // extract first html p element from body with class card-text safely
        var fact = body.match(/<p class="card-text">(.*)<\/p>/);
        if (fact) {
          fact = fact[1];
          // Replace French Characters
          fact = fact.replace(/&eacute;/g, 'é');
          fact = fact.replace(/&egrave;/g, 'è');
          fact = fact.replace(/&ecirc;/g, 'ê');
          fact = fact.replace(/&ccedil;/g, 'ç');
          fact = fact.replace(/&agrave;/g, 'à');
          fact = fact.replace(/&acirc;/g, 'â');
          fact = fact.replace(/&ocirc;/g, 'ô');
          fact = fact.replace(/&icirc;/g, 'î');
          fact = fact.replace(/&ucirc;/g, 'û');
          // replace html &#039; with '  (single quote)
          fact = fact.replace(/&#039;/g, "'");
          cb(trim(fact));
        } else {
          cb('Chuck Norris is not amused.');
        }
      }
    });
  }
}
