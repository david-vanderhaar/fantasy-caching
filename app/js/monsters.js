var monsters = [];
var monsterMarkers = [];
var monsterMarkerCluster = null;

//Number of Monsters Generated
var monsterNumber = 20;

//Monster Roaming Boxes

// // Lexington's Bounding Box
// var monsterBox = {
//  'N': 38.211404,
//  'S': 37.845256,
//  'E': -84.282715,
//  'W': -84.660415
// }

//40502's Bounding Box
var monsterBox = {
  'N': 38.041314,
  'S': 37.990589,
  'E': -84.453474,
  'W': -84.515582
}

//SVG Shape of Monster Icon
var monsterSymbol = {
          path: 'M260.875 18.375C220.39 207.41 99.905 207.03 99.905 339.563c0 89.282 81.826 153.843 160.97 153.843 80.922 0 157.78-64.24 157.78-147.312 0-127.22-115.946-139.043-157.78-327.72zM164.72 224.53c20.58 28.427 49.463 50.325 84.843 67.126-52.21 33.95-104.512 4.16-84.844-67.125zm186.56 0c19.67 71.285-32.632 101.076-84.842 67.126 35.38-16.8 64.262-38.7 84.843-67.125zm-228.467 91c13.56 15.95 31.694 29.396 52.968 39.25.824 19.023 7.407 34.174 23.75 53.376-.656-16.11.23-30.838 3.876-43.125 17.655 5.02 36.742 7.75 56.656 7.75 18.736 0 36.733-2.438 53.5-6.905 3.442 12.116 4.3 26.536 3.657 42.28 15.894-18.673 22.544-33.512 23.655-51.81 22.768-9.975 42.15-24.008 56.438-40.814-1.84 57.177-40.896 105.505-94.625 122.533L291.75 403.78l-12.625 39.564c-6.228.84-12.593 1.28-19.063 1.28-6.468 0-12.834-.44-19.062-1.28l-12.625-39.563-10.938 34.283c-53.73-17.03-92.788-65.358-94.625-122.532z ',
          fillColor: 'grey',
          fillOpacity: 0.8,
          scale: .1,
          strokeColor: 'black',
          strokeWeight: 1
        };

//Monster Constructor Object
var monster = function(pos) {
  this.pos = pos;
}

function generateMonsterMarkers () {

  // Initialize length of monster and monsterMarker arrays
  var monsterLength = monsters.length;
  var monsterMarkerLength = monsterMarkers.length;

  //Create Monsters here
  for (var i = monsterLength; i < monsterLength + monsterNumber; i++) {
    monsters.push(new monster({'lat': getRndFloat(monsterBox['S'], monsterBox['N']), 'lng': getRndFloat(monsterBox['E'], monsterBox['W']) }));
  }
  // Add Monster Markers
    for (var i = monsterMarkerLength; i < monsterMarkerLength + monsterNumber; i ++){
        monsterMarkers.push(new google.maps.Marker({
        position: monsters[i].pos,
        map: map,
        icon: monsterSymbol,
        title: 'A monster lurks here'
      }));
    }

    // console.log(monsterMarkers); 

    // Add a marker clusterer to manage the monster markers.

     // monsterMarkerCluster = (new MarkerClusterer(map, monsterMarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}));
     
     // console.log(monsterMarkerCluster); 
}

//Clear Monsters Data
function clearMonsters() {

  //Remove Monster markers from map
  // for (var i = 0; i < monsterMarkerCluster['clusters_'].length; i++) {
    
  //   for (var j = 0; j < monsterMarkerCluster['clusters_'][i]['markers_'].length; j++){
  //     console.log(monsterMarkerCluster['clusters_'][i]['markers_'][j]);
  //     monsterMarkerCluster['clusters_'][i]['markers_'][j].setMap(null);
  //     monsterMarkerCluster['clusters_'][i]['markers_'][j] = null;
  //   }
    
  // }

  //Clear Monster MarkerClusterer
  monsterMarkerCluster = null;

  //Remove Monster markers from map
  for (var i = 0; i < monsterMarkers.length; i++) {
    monsterMarkers[i].setMap(null);
    monsterMarkers[i] = null;
  }


  //Clear Monster markers array
  monsterMarkers = [];

  //Clear the Monsters Array
  monsters = [];
}

//Utility Functions
function getRndFloat(min, max) {
  // console.log((Math.random() * (max - min) ) + min);
    return (Math.random() * (max - min) ) + min;
}

