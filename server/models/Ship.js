import Entity from './../lib/Entity';
import Vector from './../lib/Vector';
import Bomb from './Bomb';
import { SHIP_LIST, SOCKET_LIST, SOCKET_PLAYER_MAP, initPack, removePack } from './../db';
import { INITIALIZE, EVENT_HAPPENED, GAME_LOST } from './../constants';
import { Euler, Vector3 } from 'three';

class Ship extends Entity {
    
    constructor(id, name, color, position, socketId) {

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
        this.speed = 0.0;
        this.angle = 0.0;
        this.rotation = new Euler(0, 0, 0, 'XYZ');
        this.socketId = socketId;

    }

    gameLost() {

		var socket = SOCKET_LIST[this.socketId];
		socket.emit(GAME_LOST, {score: this.score});
		delete SHIP_LIST[this.id];
		removePack.ship.push(this.id);
    }
    

    updateWithCommands() {
        var targetSpeed = 0.0;
        var targetAngle = 0.0;

        if(this.pressingUp) {
            targetSpeed = 1.0;
		}
		else if(this.pressingDown) {
            targetSpeed = -0.5;
        }

        var curSpeed = this.speed ;
        this.speed = curSpeed + ( targetSpeed - curSpeed ) * 0.02;

        
        //console.log(this);
        if(this.pressingLeft) {
            targetAngle = Math.PI * 0.005;
		}			
		else if(this.pressingRight) {
            targetAngle = -Math.PI * 0.005;
        }
        if(this.pressingDown) {
            targetAngle *= -1.0;
        }
        
        var curAngle = this.angle ;
        this.angle = curAngle + ( targetAngle - curAngle ) * 0.02;  
        
    }

    update() {
        this.updateWithCommands();
        this.rotation.y += this.angle;
        var shipDisplacement = (new Vector3(0, 0, -1)).applyEuler(this.rotation).multiplyScalar( 10.0 * this.speed );
        this.position.add( shipDisplacement );
        //console.log(this.position);
        //console.log(this.pressingAttack);
        if(this.pressingAttack) {
            //console.log(this.position);
            //console.log('pressing attacj', this.angle);
            this.throwBomb();
        }
    }

    throwBomb() {
        //let aimAngle = (this.mouseAngle<0)?360 + this.mouseAngle:this.mouseAngle;	

        let position = new Vector(this.position.X, this.position.Y, this.position.Z); //this.position;
        let id = this.id;
        let bomb = new Bomb(position, this.angle , id);
        bomb.initiate(); 
    }

    getInitPack(){
		return {
            id: this.id,
            name: this.name,
            position: this.position,
            score: this.score,
			lives: this.lives, 
            color: this.color, 
		};		
    }
    
	getUpdatePack(){
		return {
            id: this.id,
            position: this.position,
			score:this.score,
            lives: this.lives, 
            angle: this.angle
		}	
	}

    initiate() {
        SHIP_LIST[this.id] = this;
        initPack.ship.push(this.getInitPack());
    }
}

Ship.onConnect = (socket , playerId, name, color, position) => {
    
    let ship = new Ship(playerId, name, color, position, socket.id);
    ship.initiate();

    socket.on(EVENT_HAPPENED, (data) => {
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
	/*	
	socket.emit(INITIALIZE,{
		selfId: playerId,
		ship: Ship.getAllInitPack(),
		bomb: Bomb.getAllInitPack(),
    })
    */
}

Ship.getAllInitPack = () => {
	var ships = [];
	for(var i in SHIP_LIST) {
        ships.push(SHIP_LIST[i].getInitPack());
    }		
	return ships;
}

Ship.onDisconnect = (socket) => {
	delete SHIP_LIST[SOCKET_PLAYER_MAP[socket.id]];
	removePack.ship.push(SOCKET_PLAYER_MAP[socket.id]);
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