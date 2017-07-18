var Monster = new Interactable;


        Monster.mapSymbol = { //SVG Shape of Interactable Icon
                  path: mapIcon['monster']['slime'],
                  fillColor: 'white',
                  fillOpacity: 0.8,
                  scale: .15,
                  strokeColor: 'black',
                  strokeWeight: 1
                };

        Monster.entity = function(interactablePos){
        	this.interactablePos = interactablePos;
        	this.stats = {
        		'health': 10,
        		'attack': 3,
        		'defense':1
        	}
        }

