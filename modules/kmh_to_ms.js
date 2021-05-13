module.exports = {

  /*
   * Convert km/h to m/s 
   **/
  kmh_to_ms: function (from, text, cb) {
    var kmh = text.replace(/[^ ]* /, '');
    if ( /^\d+$/.test(kmh)) {
      console.log(kmh);
      cb((kmh * 0.27777777777778).toFixed(2));
    }
  }
}
