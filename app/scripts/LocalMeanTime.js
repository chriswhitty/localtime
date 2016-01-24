(function() {
  'use strict';

  var LocalMeanTime = function(longitude, momentProvider) {
      this.longitude = longitude;
      this.momentProvider = momentProvider;
  };

  LocalMeanTime.prototype.offsetFromUTC = function() {
      return 4 * this.longitude;
  };

  LocalMeanTime.prototype.calculate = function() {
    var now = this.momentProvider();
    var offset = this.offsetFromUTC();

    return now.add(offset, 'minute');
  };

  window.LocalMeanTime = LocalMeanTime;

})();
