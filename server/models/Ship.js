import Entity from './../lib/Entity';
import Vector from './../lib/Vector';
import Bomb from './Bomb';
import { SHIP_LIST, initPack, removePack } from './../db';
import { INITIALIZE, EVENT_HAPPENED } from './../constants';


class Ship extends Entity {
    
    constructor(id, name, color, position) {

        super(position);
        this.id = id; 
        this.name = name; 
        this.color = color;
        this.pressingRight = false;
        this.pressingLeft = false;
        this.pressingUp = false;
        this.pressingDown = false;
        this.pressingAttack = false;
        this.lives = 10;
        this.score = 0;
        this.scalarSpeed = 5;
    }


    gameLost() {
		var socket = SOCKET_LIST[self.id];
		socket.emit(GAME_LOST, {score: self.score});
		delete SHIP_LIST[this.id];
		removePack.ship.push(this.id);
    }
    
    getNextPosition(velocity) {
        return this.position.add(velocity);
    }

    update() {
        if(this.pressingRight){
            let velocity = new Vector(this.scalarSpeed, 0);
            this.position = this.getNextPosition(velocity);
		}			
		else if(this.pressingLeft){
            let velocity = new Vector(-this.scalarSpeed, 0);
            this.position = this.getNextPosition(velocity);
		}
		else{
            let velocity = new Vector(0,0);
            this.position = this.getNextPosition(velocity);
		}
		
		if(this.pressingUp){
            let velocity = new Vector(0, this.scalarSpeed);
            this.position = this.getNextPosition(velocity);
		}
		else if(this.pressingDown){
            let velocity = new Vector(0, -this.scalarSpeed);
            this.position = this.getNextPosition(velocity);
		}
		else{
            let velocity = new Vector(0,0);
            this.position = this.getNextPosition(velocity);
		}
    }

    throwBomb(angle) {
        let bomb = new Bomb(this.position, angle, this.id);
        bomb.initiate(); 
    }

    nextPosition() {
        return this.position.add(this.velocity);
    }

    getInitPack(){
		return {
            id: this.id,
            position: this.position,
            score: this.score,
			lives: this.lives, 
			color: this.color
		};		
    }
    
	getUpdatePack(){
		return {
            id: this.id,
            position: this.nextPosition(),
			score:this.score,
			lives: this.lives
		}	
	}

    initiate() {
        SHIP_LIST[this.id] = this;
        initPack.ship.push(this.getInitPack());
    }
}

Ship.onConnect = (socket , playerId, name, color, position) => {
    
    let ship = new Ship(playerId, name, color, position);
    ship.initiate();

    socket.on(EVENT_HAPPENED, (data) => {

        console.log(data);
		if(data.inputId === 'left')
			ship.pressingLeft = data.state;
		else if(data.inputId === 'right')
			ship.pressingRight = data.state;
		else if(data.inputId === 'up')
			ship.pressingUp = data.state;
		else if(data.inputId === 'down')
			ship.pressingDown = data.state;
		else if(data.inputId === 'attack')
			ship.pressingAttack = data.state;
		else if(data.inputId === 'mouseAngle')
			ship.mouseAngle = data.state;
	});
		
	socket.emit(INITIALIZE,{
		selfId: playerId,
		ship: Ship.getAllInitPack(),
		bomb: Bomb.getAllInitPack(),
	})
}

Ship.getAllInitPack = () => {
	var ships = [];
	for(var i in SHIP_LIST) {
        ships.push(SHIP_LIST[i].getInitPack());
    }		
	return ships;
}

Ship.onDisconnect = (socket) => {
	delete SHIP_LIST[socket.id];
	removePack.ship.push(socket.id);
}

Ship.update = () => {
	var pack = [];
	for(var i in SHIP_LIST){
		var ship = SHIP_LIST[i];
		ship.update();
		pack.push(ship.getUpdatePack());		
	}
	return pack;	
}

export default Ship;