/*global google */
(function() {
  'use strict';

  var MapWrapper = function(targetElement) {
    this.targetElement = targetElement;
  };

  MapWrapper.prototype.handleLocationError = function(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
  };

  MapWrapper.prototype.create = function() {
    this.map = new google.maps.Map(this.targetElement, {
      center: {lat: 0, lng: 0},
      zoom: 15
    });
    this.infoWindow = new google.maps.InfoWindow({map: this.map});

  };

  MapWrapper.prototype.navigateToUser = function() {
    var geolocationSuccess = function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.infoWindow.setPosition(pos);
        this.infoWindow.setContent('Location found.');
        this.map.setCenter(pos);
    }.bind(this);

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geolocationSuccess, function() {
        this.handleLocationError(true, this.infoWindow, this.map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, this.infoWindow, this.map.getCenter());
    }
  };

  window.MapWrapper = MapWrapper;


})();
