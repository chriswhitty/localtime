/*global MapWrapper Geolocator*/
(function() {
  'use strict';

  var Main = function() {};

  Main.prototype.loadPage = function() {
    this.map = new MapWrapper(document.getElementById('map'));
    this.map.create();

    var geolocator = new Geolocator();

    var geolocationFailure = function(browserHasGeolocation) {
       var message = browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.';
        this.map.showError(message);
    }.bind(this);

    geolocator.determineUsersLocation(this.geolocationSuccess.bind(this), geolocationFailure);

  }

  Main.prototype.geolocationSuccess = function(position) {
    var longitude = position.coords.longitude;
    var pos = {
      lat: position.coords.latitude,
      lng: longitude
    };


    this.map.navigateToPosition(pos);

    this.map.setMarker(pos, function(position) {
      this.updatePositionForTime(position);
    }.bind(this));

    this.updatePositionForTime(pos);

  }

  Main.prototype.updatePositionForTime = function(position) {
    if(this.interval !== undefined) {
      clearInterval(this.interval);
    }

    var displayElement = document.getElementById("localMeanTime");

    var longitude = position.lng;
    var localMeanTimeCalculator = new LocalMeanTime(longitude, function() {return moment()});

    this.interval = setInterval(function() {
      var localMeanTime = localMeanTimeCalculator.calculate();
      var timeString  = localMeanTime.format('HH:mm:ss');
      displayElement.innerText = timeString;
    }, 500);
  };

  window.initMap = function() {
    new Main().loadPage();
  };


})();
