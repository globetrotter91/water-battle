import Entity from './../lib/Entity';
import { SHIP_LIST, BOMB_LIST, initPack, removePack } from './../db';

class Bomb extends Entity {
    constructor(position, angle, parent) {
        super(parent.position);
        this.parent = parent;
        this.velocity = parent.position.getVelocityFromAngle(angle);
        this.timer = 0;
        this.toRemove = false;
    }

    update() {
        if(this.timer++ > 100)	this.toRemove = true;
        this.position = this.position.add(velocity);
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
    
	getInitPack() {
		return {
			id: this.id,
			position: this.position
		};
	}
    
    getUpdatePack() {
		return {
			id: this.id,
			position: this.position
		};
    }
    
    initiate() {
        BOMB_LIST[this.id] = this;
        initPack.bomb.push(self.getInitPack());
    }
}

Bomb.update = () => {
	var pack = [];
	for(var i in BOMB_LIST){
		var bomb = BOMB_LIST[i];
		bomb.update();
		if(bomb.toRemove){
			delete BOMB_LIST[i];
			removePack.bomb.push(bomb.id);
		} else {
			pack.push(bomb.getUpdatePack());		
		}
	}
	return pack;
}

Bomb.getAllInitPack = () => {
	var bomen = [];
	for(var i in BOMB_LIST)
		bomen.push(BOMB_LIST[i].getInitPack());
	return bomen;
}

export default Bomb;