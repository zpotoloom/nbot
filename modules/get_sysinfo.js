module.exports = {

	get_sysinfo: function(from, text, cb) {
    var unit = ['', 'K', 'M', 'G', 'T', 'P'];
    
    function bytesToSize(input, precision)
    {
        var index = Math.floor(Math.log(input) / Math.log(1024));
        if (unit >= unit.length) return input + ' B';
        return (input / Math.pow(1024, index)).toFixed(precision) + ' ' + unit[index] + 'B'
    }
    
    function format(seconds){
      function pad(s){
        return (s < 10 ? '0' : '') + s;
      }
      var days = Math.floor(seconds / 86400);
      var hours = Math.floor((seconds % 86400) / 3600);
      var minutes = Math.floor(seconds % (60*60) / 60);
      var seconds = Math.floor(seconds % 60);
    
      return days + ' days ' + pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
    } 
    
    usage = process.memoryUsage();
    cb(  'Uptime: ' + format(process.uptime()) + ' { RSS: ' + bytesToSize(usage.rss, 3) + ' and Heap: ' + bytesToSize(usage.heapUsed, 3) + ' of ' + bytesToSize(usage.heapTotal, 3) + ' total }');

  }
}
