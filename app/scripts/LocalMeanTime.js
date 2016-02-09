(function() {
  'use strict';

  var LocalMeanTime = function(longitude, momentProvider) {
      this.longitude = longitude;
      this.momentProvider = momentProvider;
  };

  LocalMeanTime.prototype.offsetFromUTC = function() {
      var minutesPerLongitude = 4;
      return minutesPerLongitude * this.longitude;
  };

  LocalMeanTime.prototype.calculate = function() {
    var now = this.momentProvider();
    var offset = this.offsetFromUTC();

    return now.utc().add(offset, 'minute');
  };

  window.LocalMeanTime = LocalMeanTime;

})();
