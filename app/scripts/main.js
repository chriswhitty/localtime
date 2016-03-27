/*global moment MapWrapper Geolocator LocalMeanTime*/
(function() {
  'use strict';

  var Main = function() {};

  Main.prototype.loadPage = function() {
    this.map = new MapWrapper(document.getElementById('map'));
    this.map.create();

    var geolocator = new Geolocator();

    var geolocationFailure = function() {
      this.setPosition({
        lat: 51.4780,
        lng: 0
      });
    }.bind(this);

    var geolocationSuccess = function(position) {
      this.setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    }.bind(this);

    geolocator.determineUsersLocation(geolocationSuccess, geolocationFailure);
  };


  Main.prototype.setPosition = function(position) {

    this.map.navigateToPosition(position);

    this.map.setMarker(position, function(dragPosition) {
      this.updatePositionForTime(dragPosition);
    }.bind(this));

    this.updatePositionForTime(position);

  };

  Main.prototype.updatePositionForTime = function(position) {
    if(this.interval !== undefined) {
      clearInterval(this.interval);
    }

    var displayElement = document.getElementById('localMeanTime');

    var longitude = position.lng;
    var localMeanTimeCalculator = new LocalMeanTime(longitude, function() {return moment(); });

    this.interval = setInterval(function() {
      var localMeanTime = localMeanTimeCalculator.calculate();
      var timeString = localMeanTime.format('HH:mm:ss');
      displayElement.innerText = timeString;
    }, 500);
  };

  window.initMap = function() {
    new Main().loadPage();
  };


})();
