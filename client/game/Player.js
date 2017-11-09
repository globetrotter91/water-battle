class Player {

	constructor(id, name, lives, score, game, position, rotation) {
		this.id = id;
		this.name = name;
		this.lives = lives;
		this.score = score;
		this.game = game;
		this.object = new THREE.Object3D();
		this.ship = new THREE.Object3D();
		this.position = position;
	}

	load() {
		var loader = new THREE.OBJMTLLoader( this.game.loadingManager );
        loader.load( 'models/BlackPearl/BlackPearl.obj', 'models/BlackPearl/BlackPearl.mtl',  ( object ) => {
            object.position.y = 20.0;
            if( object.children ) {
                for( var child in object.children ) {
                    object.children[child].material.side = THREE.DoubleSide;
                }
            }
            this.ship.add( object );
        } );
	}

	initialize() {
		//this.object.position.x = this.position.x || 0;
		//this.object.position.y = this.position.y || 0;
		//this.object.position.z = this.position.z || 0;

		this.game.scene.add(this.object);
		this.object.add( this.ship );
		this.load();
	}

	initializeMe() {
		this.initialize();
		this.game.camera.position.set( 0, 350, 800 );
        this.game.camera.lookAt( new THREE.Vector3() );
		this.ship.add( this.game.camera );
	}

	update(position, rotation, score, lives) {
		//console.log(position);
		this.object.position.x = position.x; 
		this.object.position.y = position.y;
		this.object.position.z = position.z;
		this.object.rotation.y += rotation;
		this.lives = lives; 
		this.score = score;
		/*
		this.object.rotation.y += angle;
        //this.ship.rotation.z = -angle * 10.0;
        //this.ship.rotation.x = speed * 0.1;
        var shipDisplacement = (new THREE.Vector3(0, 0, -1)).applyEuler(this.object.rotation).multiplyScalar( 10.0 * speed );
		this.object.position.add( shipDisplacement );
		this
		*/
	}
	remove(){
		this.game.scene.remove(this.object);
	}
	
}

export default Player;