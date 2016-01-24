/*global MapWrapper Geolocator*/
(function() {
  'use strict';

  function loadPage() {
    this.map = new MapWrapper(document.getElementById('map'));
    map.create();

    var geolocator = new Geolocator();

    var geolocationFailure = function(browserHasGeolocation) {
       var message = browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.';
        map.showError(message);
    };

    geolocator.determineUsersLocation(geolocationSuccess.bind(this), geolocationFailure);

  }

  function geolocationSuccess(position) {
    var longitude = position.coords.longitude;
    var pos = {
      lat: position.coords.latitude,
      lng: longitude
    };

    this.map.navigateToPosition(pos);
    this.map.showError('Location found.');



    var displayElement = document.getElementById("localMeanTime");

    var localMeanTimeCalculator = new LocalMeanTime(longitude, function() {return moment()});

    setInterval(function() {
      var localMeanTime = localMeanTimeCalculator.calculate();
      var timeString  = localMeanTime.format('HH:mm:ss');
      displayElement.innerText = timeString;
    }, 1000);


  }

  window.initMap = loadPage;


})();
