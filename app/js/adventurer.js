//watch postition vars
      var timeoutVal = 10 * 1000 * 1000;
      
      var watchId = null;

//Build the Adventurer Icon here
var adventurerIcon = {
          path: mapIcon['adventurer']['WingedSword'],
          fillColor: 'white',
          fillOpacity: 0.8,
          scale: .1,
          strokeColor: 'black',
          strokeWeight: 1
      };

//Build the Adventurer encounter radius here
//This circle is the graphical representation of the range within whci adventurer will encounter monsters etc.
var adventurerEncounterRangeMarker = null;

function generateAdventurer () {
  adventurerMarker = new google.maps.Marker({
          position: pos,
          map: map,
          icon: adventurerIcon,
          title: 'Adventurer, you are here'
        });

  showHideEncounterRangeMarker();
}

function updateAdventurerPosition () {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    
    //Clear old watch first, then create new one
    navigator.geolocation.clearWatch(watchId);
    
    //Set watch id and watch position
     watchId = navigator.geolocation.watchPosition(successAdventurerWatch, function() {
      handleLocationError(true, infoWindow, map.getCenter());
      }, { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: (10 * 1000) }
      );


  
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function pauseUpdateAdventurerPosition () {
  if (navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId);
  }
}

function successAdventurerWatch(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      //Update encounter range to adventurer
      if (adventurerEncounterRangeMarker != null) {
        adventurerEncounterRangeMarker.setCenter(pos);
      }

      console.log(pos);


      consoleDisplay.innerText = 'lat: ' + pos['lat'] + ' ' + 'lng: ' + pos['lng'];
      
      //Updates Adventurer Marker
      adventurerMarker.setPosition(pos);

      //Monsters check for adventurer
      // checkForAdventurer();
      //Adventurer checks for monsters
      checkForMonster();
      checkForTreasure();
      // checkForInteractable();
  }

  function showHideEncounterRangeMarker () {
    //First hide and clear old marker
    if (adventurerEncounterRangeMarker != null) {
      adventurerEncounterRangeMarker.setMap(null);
      adventurerEncounterRangeMarker = null;
    } else {

      //Build the Adventurer encounter radius here
      //This circle is the graphical representation of the range within whci adventurer will encounter monsters etc.
      adventurerEncounterRangeMarker = new google.maps.Circle({
          strokeColor: '#0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: 'blue',
          fillOpacity: 0.35,
          map: map,
          center: pos,
          radius: 400
        });
    }
  }

//Adventurer Checks for Monster
//May later change this to checking for interactable
function checkForMonster () {
  if (Monster.entitys != [] && adventurerEncounterRangeMarker != null) { 
    var bounds = adventurerEncounterRangeMarker.getBounds();
    for (var i in Monster.entitys) {
      if (bounds.contains(Monster.entitys[i].interactablePos)) {
        console.log('fight!');
        console.log('You have encountered a monster that has '
          + Monster.entitys[i].stats['health']
          + ' points of health, '
          + Monster.entitys[i].stats['attack']
          + ' points of attack, and '
          + Monster.entitys[i].stats['defense']
          + ' points of defense.');
        consoleDisplay.innerText = 'Fight!';
       } 
    }
  }
}

//Adventurer Checks for Treasure
//May later change this to checking for interactable
function checkForTreasure () {
  if (Treasure.entitys != [] && adventurerEncounterRangeMarker != null) { 
    var bounds = adventurerEncounterRangeMarker.getBounds();
    for (var i in Treasure.entitys) {
      if (bounds.contains(Treasure.entitys[i].interactablePos)) {
        console.log('Gold!');
        consoleDisplay.innerText = 'Treasure!';
       } 
    }
  }
}



