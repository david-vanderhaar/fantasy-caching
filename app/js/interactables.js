var Interactable = function () {
        this.entitys = [];
        this.entityMarkers = [];

        //Build the Interactable encounter radius here
        //This circle is the graphical representation of the range within which this.entity will encounter adventurer
        this.encounterRangeMarkers = [];

        // var interactableMarkerCluster = null;

        //Number of Interactables Generated
        this.entityNumber = 20;

        //Selected this.entity box
        this.selectedBoundingBox = 'ChevyChase';

        //Interactable Roaming Boxes
        this.boundingBox = {
          'Lexington': {
            'N': 38.211404,
            'S': 37.845256,
            'E': -84.282715,
            'W': -84.660415
          },
          'LexingtonDowntown': {
            'N': 38.054707,
            'S': 38.036752,
            'E': -84.489183,
            'W': -84.503093
          },
          'ChevyChase': {
            'N': 38.041314,
            'S': 37.990589,
            'E': -84.453474,
            'W': -84.515582
          }
        };

        //SVG Shape of Interactable Icon
        this.mapSymbol = {
                  path: mapIcon['default'],
                  fillColor: 'white',
                  fillOpacity: 0.8,
                  scale: .15,
                  strokeColor: 'black',
                  strokeWeight: 1
                };

        //Interactable Constructor Object
          this.entity = function(interactablePos) {
          this.interactablePos = interactablePos;
        }

        this.generateMarkers = function() {

          // Initialize length of this.entity and interactableMarker arrays
          var interactableLength = this.entitys.length;
          var interactableMarkerLength = this.entityMarkers.length;
          var encounterRangeMarkersLength = this.encounterRangeMarkers.length;

          //Create Interactables here
          for (var i = interactableLength; i < interactableLength + this.entityNumber; i++) {
            this.entitys.push(new this.entity (this.boundingBoxToLatLng(this.boundingBox)));
          }
          // Add Interactable Markers
            for (var i = interactableMarkerLength; i < interactableMarkerLength + this.entityNumber; i ++){
                this.entityMarkers.push(new google.maps.Marker({
                position: this.entitys[i].interactablePos,
                map: map,
                icon: this.mapSymbol,
                title: 'You found something!'
              }));
            }

            // Add Interactable Encounter Range Markers
            for (var i = encounterRangeMarkersLength; i < encounterRangeMarkersLength + this.entityNumber; i ++){
                this.encounterRangeMarkers.push(new google.maps.Circle({
                  strokeColor: '#0000',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: 'red',
                  fillOpacity: 0.35,
                  map: map,
                  center: this.entitys[i].interactablePos,
                  radius: 30
                }));
            }

            // console.log(this.entityMarkers); 

            // Add a marker clusterer to manage the this.entity markers.

             // interactableMarkerCluster = (new MarkerClusterer(map, this.entityMarkers,
                // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}));
             
             // console.log(interactableMarkerCluster); 
        }

        //Clear Interactables Data
        this.clearMarkers = function() {

          //Remove Interactable markers from map
          // for (var i = 0; i < interactableMarkerCluster['clusters_'].length; i++) {
            
          //   for (var j = 0; j < interactableMarkerCluster['clusters_'][i]['markers_'].length; j++){
          //     console.log(interactableMarkerCluster['clusters_'][i]['markers_'][j]);
          //     interactableMarkerCluster['clusters_'][i]['markers_'][j].setMap(null);
          //     interactableMarkerCluster['clusters_'][i]['markers_'][j] = null;
          //   }
            
          // }

          //Clear Interactable MarkerClusterer
          // this.interactableMarkerCluster = null;

          //Remove Interactable markers from map
          for (var i = 0; i < this.entityMarkers.length; i++) {
            this.entityMarkers[i].setMap(null);
            this.entityMarkers[i] = null;

            this.encounterRangeMarkers[i].setMap(null);
            this.encounterRangeMarkers[i] = null;
          }

          //Clear Encounter markers array
          this.encounterRangeMarkers = [];

          //Clear Interactable markers array
          this.entityMarkers = [];

          //Clear the Interactables Array
          this.entitys = [];
        }

        //Interactable Checks for Adventurer
        this.checkForAdventurer = function() {
          if (this.entitys != []) { 
            for (var i in this.entitys) {
              if (this.encounterRangeMarkers[i].getBounds().contains(pos)) {
                console.log('fight!');
              }
            }
          }
        }

        this.boundingBoxToLatLng = function(boundedBox) {
          return {'lat': getRndFloat(boundedBox[this.selectedBoundingBox]['S'], boundedBox[this.selectedBoundingBox]['N']), 'lng': getRndFloat(boundedBox[this.selectedBoundingBox]['E'], boundedBox[this.selectedBoundingBox]['W']) };
        }
}

//Utility Functions
function getRndFloat(min, max) {
  // console.log((Math.random() * (max - min) ) + min);
    return (Math.random() * (max - min) ) + min;
}

