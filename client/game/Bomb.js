/**
 * @class Bomb
 * @description Class for creating, updating and removing the bombs in the game.
 * @author Satyam Saxena
 */
class Bomb {
    /**
     *
     * @param id: id of the bomb
     * @param game: object of the game
     * @param position: initial position Vector of the bomb on the screen
     */
    constructor( id, game, position ) {

        this.id = id;
        this.game = game;
        this.position = position;

        this.geometry = new THREE.IcosahedronGeometry( 20, 2 );
        for ( var i = 0, j = this.geometry.faces.length; i < j; i++ ) {
            this.geometry.faces[ i ].color.setHex( Math.random() * 0xffffff );
        }

        this.material = new THREE.MeshPhongMaterial( {
            vertexColors: THREE.FaceColors,
            shininess: 10,
            side: THREE.DoubleSide
        } );
        // this is the mesh object of the bomb which is for adding the bomb to the scene and updating its position.
        this.object = new THREE.Mesh( this.geometry, this.material );
        this.object.castShadow = true;
        
    }

    /**
     *
     * @description This method initialises the bomb on the screen.
     *
     */
    initialize() {

        this.object.position.x = this.position.x;
        this.object.position.y = this.position.y;
        this.object.position.z = this.position.z;
        this.game.scene.add( this.object )

    }

    /**
     *
     * @description This method updates the postion of the bomb receiving the position from the server
     * @param position: updated position vector of the bomb from server
     *
     */
    update( position ) {

        this.object.position.x = position.x;
        this.object.position.y = position.y;
        this.object.position.z = position.z;

    }

    /**
     *
     * @description This method removes the bomb on the screen.
     *
     */
    remove() {
        this.game.scene.remove( this.object );
    }
}

export default Bomb;