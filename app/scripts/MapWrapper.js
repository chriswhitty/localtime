/*global google */
(function() {
  'use strict';

  var MapWrapper = function(targetElement) {
    this.targetElement = targetElement;
  };

  MapWrapper.prototype.showError = function(message) {
    var infoWindow = new google.maps.InfoWindow({map: this.map});
    infoWindow.setPosition(this.map.getCenter());
    infoWindow.setContent(message);
  };

  MapWrapper.prototype.setMarker = function(position, callback) {
    var marker = new google.maps.Marker({
      position: position,
      map: this.map,
      draggable: true
    });

    marker.addListener('dragend', function(args) {
      callback({
         lat: args.latLng.lat(),
         lng: args.latLng.lng()
      });
    }.bind(this));
  };

  MapWrapper.prototype.create = function() {
    this.map = new google.maps.Map(this.targetElement, {
      center: {lat: 0, lng: 0},
      zoom: 10,
      scrollwheel: false,
      disableDefaultUI: true,
      zoomControl: true

    });
  };

  MapWrapper.prototype.navigateToPosition = function(position) {
    this.map.setCenter(position);
  };


  window.MapWrapper = MapWrapper;


})();
