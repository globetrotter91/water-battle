import Entity from './../lib/Entity';
import Vector from './../lib/Vector';
import { SHIP_LIST, BOMB_LIST, initPack, removePack } from './../db';
import { createHash } from 'crypto';


/**
 * @class Bomb
 * @description This class deals with creation, removal and position management of the bomb
 */
class Bomb extends Entity {
	
	/**
	 * 
	 * @param {*} position position of the bomb
	 * @param {*} angle angle at which the bomb was fired
	 * @param {*} parent parent of the bomb, the ship from which the bomb was initiated
	 */
    constructor(position, angle, parent) {

		super(position);
		var t = new Date().getTime().toString(); 
		this.id = createHash('md5').update(t).digest("hex");	 
        this.parent = parent;
        this.velocity = this.position.getVelocityFromAngle(angle).multiply(30);
        this.timer = 0;
		this.toRemove = false;	

    }

	/**
	 * @description updates the position of the bomb and handles collision with othre players
	 * // TODO : Collision detection optimise 
	 */
    update() {

		this.timer++;
		this.position = this.position.add(this.velocity);
		
		if(this.timer<50) {
			this.position.y+=5;
		}
		else if(this.timer > 75 && this.timer <= 150) {
			this.position.y-=5;
		}
		else if(this.timer > 150) {
			this.toRemove = true;
		}

		
    	for(var i in SHIP_LIST){  
			var ship = SHIP_LIST[i];
			if(this.getDistance(ship) < 10 && this.parent !== ship.id){
                ship.lives -= 1;	
                var shooter = SHIP_LIST[this.parent];
                shooter.score+= 1;
                // update db if necessary
                if(ship.lives == 0) {
                    ship.gameLost();
                }
				this.toRemove = true;
			}
		}
    }
	
	/**
	 * @return initial data for the bomb
	 */
	getInitPack() {

		return {
			id: this.id,
			position: this.position
		};

	}
	
	/**
	 * @return update data for the bomb
	 */
    getUpdatePack() {

		return {
			id: this.id,
			position: this.position
		};

    }
	
	/**
	 * @description adds the bomb to the bomb list
	 */
    initiate() {

        BOMB_LIST[this.id] = this;
		initPack.bomb.push(this.getInitPack());
		
    }
}

/**
 * @description updates all the bombs in the list and removes if the toRemove flag is true
 * @return list of all the updated position of the bomb
 */
Bomb.update = () => {

	var pack = [];
	for(var i in BOMB_LIST){
		var bomb = BOMB_LIST[i];
		bomb.update();
		if(bomb.toRemove){
			removePack.bomb.push(bomb.id);
			delete BOMB_LIST[i];			
		} else {
			pack.push(bomb.getUpdatePack());		
		}
	}
	return pack;

}

/**
 * @description gets the initial position of the bombs
 */
Bomb.getAllInitPack = () => {

	var bomen = [];
	for(var i in BOMB_LIST)
		bomen.push(BOMB_LIST[i].getInitPack());
	return bomen;
	
}

export default Bomb;