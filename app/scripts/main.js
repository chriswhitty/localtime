/*global MapWrapper Geolocator*/
(function() {
  'use strict';

  function createMap() {
    var map = new MapWrapper(document.getElementById('map'));
    map.create();

    var geolocator = new Geolocator();

    var geolocationSuccess = function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.navigateToPosition(pos);
        map.showError('Location found.');
    };


    var geolocationFailure = function(browserHasGeolocation) {
       var message = browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.';
        map.showError(message);
    };

    geolocator.determineUsersLocation(geolocationSuccess, geolocationFailure);

  }

  window.initMap = createMap;


})();
