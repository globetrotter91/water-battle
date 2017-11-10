/**
 * @class Player
 * @description Class to add, remove and update the players of the game and adding controls to the playing player
 * @author Satyam Saxena
 */
class Player {
    /**
     *
     * @param id id of the player
     * @param name name of the player
     * @param lives lives remaining of the player
     * @param score current score of the player
     * @param game object of the game
     * @param position initial position of the player
     */
    constructor( id, name, lives, score, game, position ) {

        this.id = id;
        this.name = name;
        this.lives = lives;
        this.score = score;
        this.game = game;
        this.object = new THREE.Object3D();
        this.ship = new THREE.Object3D();
        this.position = position;

    }

    /**
     * @description this method loads the obj and mtl file of the player ship
     */
    load() {

        var loader = new THREE.OBJMTLLoader( this.game.loadingManager );

        loader.load( 'models/BlackPearl/BlackPearl.obj', 'models/BlackPearl/BlackPearl.mtl', ( object ) => {
            object.position.y = 20.0;
            if ( object.children ) {

                for ( var child in object.children ) {
                    object.children[ child ].material.side = THREE.DoubleSide;
                }

            }
            this.ship.add( object );
        } );

    }

    /**
     * @description This method initialises the ship for all players and position them on the ocean.
     */
    initialize() {
        
        //TODO: position all ships at accurate postion now only positioning at 000
        //this.object.position.x = this.position.x || 0;
        //this.object.position.y = this.position.y || 0;
        //this.object.position.z = this.position.z || 0;

        this.game.scene.add( this.object );
        this.object.add( this.ship );
        this.load();

    }

    /**
     *@description This method initialises the controls for a player if the player is the user playing
     */
    initializeControls() {

        this.game.camera.position.set( 0, 350, 800 );
        this.game.camera.lookAt( new THREE.Vector3() );
        this.ship.add( this.game.camera );

    }

    /**
     *
     * @param {*} position new position of the ship from the server.
     * @param {*} angle angle of the ship relative to the previous position
     * @param {*} score updated score of the player
     * @param {*} lives updated lives of the player
     * @param {*} speed updated speed of the player
     * @description this method updates the position of the player with vectos coming from the server
     */
    update( position, angle, score, lives, speed ) {

        this.object.position.x = position.x;
        this.object.position.y = position.y;
        this.object.position.z = position.z;
        this.object.rotation.y += angle;
        this.lives = lives;
        this.score = score;
        //TODO: movement and toppling of ship withing the object
        this.ship.rotation.z = -angle * 10.0;
        this.ship.rotation.x = speed * 0.1;

    }

    /**
     * @description this method removes the player from the screen on disconnect of game lost.
     */
    remove() {
        this.game.scene.remove( this.object );
    }

}

export default Player;