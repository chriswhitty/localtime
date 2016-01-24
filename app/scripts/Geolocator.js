(function() {
  'use strict';

  var Geolocator = function(targetElement) {
    this.targetElement = targetElement;
  };

  Geolocator.prototype.determineUsersLocation = function(successCallback, errorCallback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, function() {
        errorCallback(true);
      });
    } else {
      // Browser doesn't support Geolocation
      errorCallback(false);
    }
  };


  window.Geolocator = Geolocator;

})();
