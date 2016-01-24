/*global google */
(function() {
  'use strict';

  var MapWrapper = function(targetElement) {
    this.targetElement = targetElement;
  };

  MapWrapper.prototype.showError = function(message) {
    this.infoWindow.setPosition(this.map.getCenter());
    this.infoWindow.setContent(message);
  };

  MapWrapper.prototype.create = function() {
    this.map = new google.maps.Map(this.targetElement, {
      center: {lat: 0, lng: 0},
      zoom: 15
    });
    this.infoWindow = new google.maps.InfoWindow({map: this.map});
  };

  MapWrapper.prototype.navigateToPosition = function(position) {
    this.map.setCenter(position);
  };


  window.MapWrapper = MapWrapper;


})();
