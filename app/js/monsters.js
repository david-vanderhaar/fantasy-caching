var monsters = [];
var monsterMarkers = [];

//Number of Monsters Generated
var monsterNumber = 20;

//Monster Roaming Boxes

// // Lexington's Bounding Box
// var monsterBox = {
// 	'N': 38.211404,
// 	'S': 37.845256,
// 	'E': -84.282715,
// 	'W': -84.660415
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
          path: 'M 200 150 L 250 250 L 400 250 L 450 150 L 450 300 L 350 400 L 300 400 L 200 300 L 200 150 ',
          fillColor: 'black',
          fillOpacity: 0.8,
          scale: .1,
          strokeColor: 'red',
          strokeWeight: 5
        };

//Monster Constructor Object
var monster = function(pos) {
	this.pos = pos;
}

//Create Monsters here
for (var i = 0; i < monsterNumber; i++) {
	monsters.push(new monster({'lat': getRndFloat(monsterBox['S'], monsterBox['N']), 'lng': getRndFloat(monsterBox['E'], monsterBox['W']) }));
}

function generateMonsterMarkers () {
	// Add Monster Markers
    for (var i = 0; i < monsters.length; i ++){
        monsterMarkers.push(new google.maps.Marker({
        position: monsters[i].pos,
        map: map,
        icon: monsterSymbol,
        title: 'A monster lurks here'
      }));
    }

    console.log(monsters);

    // Add a marker clusterer to manage the monster markers.
    var monsterMarkerCluster = new MarkerClusterer(map, monsterMarkers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      
}

//Utility Functions
function getRndFloat(min, max) {
	console.log((Math.random() * (max - min) ) + min);
    return (Math.random() * (max - min) ) + min;
}

