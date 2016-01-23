(function() {
  'use strict';

  window.LocalMeanTime = function(latitude) {
      this.latitude = latitude;
  };

  window.LocalMeanTime.prototype.offsetFromUTC = function() {
      return 4 * this.latitude;
  };


})();
