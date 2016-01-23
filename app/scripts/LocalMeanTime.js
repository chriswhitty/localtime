(function() {
  'use strict';

  var LocalMeanTime = function(latitude, momentProvider) {
      this.latitude = latitude;
      this.momentProvider = momentProvider;
  };

  LocalMeanTime.prototype.offsetFromUTC = function() {
      return 4 * this.latitude;
  };

  LocalMeanTime.prototype.calculate = function() {
    var now = this.momentProvider();
    var offset = this.offsetFromUTC();

    return now.add(offset, 'minute');
  };

  window.LocalMeanTime = LocalMeanTime;

})();
