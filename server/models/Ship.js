import Entity from './../lib/Entity';
import Vector from './../lib/Vector';
import Bomb from './Bomb';
import { SHIP_LIST, SOCKET_LIST, SOCKET_PLAYER_MAP, initPack, removePack } from './../db';
import { INITIALIZE, EVENT_HAPPENED, GAME_LOST } from './../constants';
import { Euler, Vector3 } from 'three';

/**
 * @class Ship
 * @description This class deals with creation, removal and position management of the ship\
 */
class Ship extends Entity {
    
    /**
     * 
     * @param {*} id id of the ship
     * @param {*} name name of the player
     * @param {*} color //TODO optional parameter for later use
     * @param {*} position postion of the ship
     * @param {*} socketId socketid of the player to map with ship id in the list
     */
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
        this.bombTimer = 0;     // used for debouncing the bombs

    }

    /**
     * //TODO
     * @description called when game is lost
     */
    gameLost() {
        
		var socket = SOCKET_LIST[ this.socketId ];
		socket.emit( GAME_LOST, { score: this.score } );
		delete SHIP_LIST[ this.id ];
        removePack.ship.push( this.id );
        
    }
    
    /**
     * @description used for changing the speed and angle of the ship based on the key events
     */
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

    /**
     * @description updates the position of the ship by calculating displacement based on angle and speed
     * throws bomb if the attack button is pressed.
     */
    update() {
        
        this.updateWithCommands();
        this.rotation.y += this.angle;
        var shipDisplacement = (new Vector3(0, 0, -0.75)).applyEuler( this.rotation ).multiplyScalar( 10.0 * this.speed );
        this.position.add( shipDisplacement );
        this.bombTimer++; 
        if(this.pressingAttack && this.bombTimer > 10) {
            this.throwBomb(); 
            this.bombTimer = 0; 
        }

    }

    /**
     * @description throws the bomb from the position of the ship
     */
    throwBomb() {

        let position = new Vector(this.position.X, this.position.Y, this.position.Z);
        let bomb = new Bomb(position, this.id, this.rotation);
        bomb.initiate(); 

    }

    /**
     * @return initial data for a ship
     */
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
    
    /**
     * @return update data for a ship
     */
	getUpdatePack(){

		return {
            id: this.id,
            position: this.position,
			score:this.score,
            lives: this.lives, 
            angle: this.angle,
            speed: this.speed
        }	

	}

    /**
     * adds ship to the global ship list
     */
    initiate() {
        //TODO: add db support when a new player joins 
        SHIP_LIST[this.id] = this;
        initPack.ship.push(this.getInitPack());

    }
}

/**
 * @description Onconnect property attached to ship class to call it when a player connects
 * Creates a object of the Ship class and adds scoket events to it.
 */
Ship.onConnect = ( socket , playerId, name, color, position ) => {
    
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
    } );

    socket.emit( INITIALIZE, {
		ship: Ship.getAllInitPack(),
		bomb: Bomb.getAllInitPack(),
	} );
   
}

/**
 * @description complete list of all the ships there are.
 */
Ship.getAllInitPack = () => {

	var ships = [];
	for(var i in SHIP_LIST) {
        ships.push(SHIP_LIST[i].getInitPack());
    }		
    return ships;
    
}

/**
 * @description deletes the player from the list when player disconnects
 */
Ship.onDisconnect = ( socket ) => {

	delete SHIP_LIST[SOCKET_PLAYER_MAP[socket.id]];
    removePack.ship.push(SOCKET_PLAYER_MAP[socket.id]);
    
}

/**
 * @description Updates all the ships in the list
 */
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