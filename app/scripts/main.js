/*global MapWrapper */
(function() {
  'use strict';

  function createMap() {
    var map = new MapWrapper(document.getElementById('map'));
    map.create();
    map.navigateToUser();

  }

  window.initMap = createMap;


})();
