var Treasure = new Interactable;
console.log(Treasure);
//SVG Shape of Interactable Icon
        Treasure.mapSymbol = {
                  path: mapIcon['treasure']['coin'],
                  fillColor: 'gold',
                  fillOpacity: 0.8,
                  scale: .1,
                  strokeColor: 'white',
                  strokeWeight: 1
                };

 //Number of Treasures generated on load
 	Treasure.entityNumber = 10;