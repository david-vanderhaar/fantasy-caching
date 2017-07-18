      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow, pos;

      //Define DOM Elements
      var consoleDisplay = $('#console')[0];
      
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 38.0423268, lng: -84.49276569999999},
          zoom: 14,
          styles: mapStyles['dark']
        });
        infoWindow = new google.maps.InfoWindow;

        getCurrentLocation();

      }

      function getCurrentLocation(){
          // Try HTML5 geolocation.
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };

              infoWindow.setPosition(pos);
              infoWindow.setContent('Adventurer, you are here');
              // infoWindow.open(map);
              map.setCenter(pos);
              console.log(pos);
              //Generates Adventurer Marker
              generateAdventurer();

            }, function() {
              handleLocationError(true, infoWindow, map.getCenter());
            });
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
          }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        // infoWindow.open(map);
      }

      function setMapCenterToAdventurer () {
        infoWindow.setPosition(pos);
        infoWindow.setContent('Adventurer position found');
        infoWindow.open(map);
        map.setCenter(pos);
      }

