
class Bomb {
    constructor(id, game, position) {

        this.id = id;
        this.game = game;
        //this.material = new THREE.MeshBasicMaterial({
           // color: 0x000000
        //});
        //this.geometry = new THREE.SphereGeometry(1, 6, 10);
        //this.object = new THREE.Mesh(this.geometry, this.material);
        this.position = position;

        this.geometry = new THREE.IcosahedronGeometry( 20, 2 );
        for ( var i = 0, j = this.geometry.faces.length; i < j; i ++ ) {
            this.geometry.faces[ i ].color.setHex( Math.random() * 0xffffff );
        }
        this.material = new THREE.MeshPhongMaterial( {
            vertexColors: THREE.FaceColors,
            shininess: 10,
            //envMap: cubeMap,
            side: THREE.DoubleSide
        } );
        this.object = new THREE.Mesh( this.geometry, this.material );
        this.object.castShadow = true;
        //this.initialize(position);
    }

    initialize() {



        console.log(this.object);
        this.object.position.x = this.position.x;
        this.object.position.y = this.position.y;
        this.object.position.z = this.position.z;
        this.game.scene.add(this.object)
    }

    update(position) {
        this.object.position.x = position.x;
        this.object.position.y = position.y;
        this.object.position.z = position.z;
    }

    remove() {
        this.game.scene.remove(this.object);
    }
}

export default Bomb;