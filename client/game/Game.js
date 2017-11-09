import globals from './globals';
import Ocean from './Ocean';
import Player from './Player';
import Bomb from './Bomb';
import { ENTERGAME_REQUEST, ENTERGAME_RESPONSE, API_URL, INITIALIZE, UPDATE, REMOVE, GAME_LOST, EVENT_HAPPENED } from './constants';

class Game {
    constructor(width, height){
        this.renderer =  new THREE.WebGLRenderer();
        this.camera = new THREE.PerspectiveCamera( 55.0, width / height, 0.5, 1000000 );
        this.scene = new THREE.Scene();
        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        this.ocean = null;
        this.commands = {
            states : {
                up : false,
                right : false,
                down : false,
                left : false
            },
            movements : {
                speed : 0.0,
                angle : 0.0
            }
        };
        this.width = width;
        this.height = height;
        this.selfId = null;
        this.playerList = {};
        this.bombList = {};
        this.socket = io.connect(`${window.location.protocol}//${window.location.host}`);
        this.bindSocketEvents();
        
    }

    serverRequest(playerName, color) {
        var data = `name=${playerName}&color=${color}`;

        var xhttp = new XMLHttpRequest();
        var that = this ; 
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

               var resJson = JSON.parse(this.responseText);
               that.socket.emit(ENTERGAME_REQUEST,{ playerId : resJson.id, playerName:  resJson.name, color:  resJson.color});
            }
        };
        xhttp.open("GET", `${API_URL}/users?${data}` , true);
        xhttp.send();
    }


    initialize() {
            
        this.renderer.context.getExtension('OES_texture_float');
        this.renderer.context.getExtension('OES_texture_float_linear');
        this.renderer.setClearColor( 0x000000 );
           
        document.body.appendChild( this.renderer.domElement );

        
        // Initialize Orbit control
        this.controls.userPan = false;
        this.controls.target.set( 0, 100.0, 0 );
        this.controls.noKeys = true;
        this.controls.userPanSpeed = 0;
        this.controls.minDistance = 0;
        this.controls.maxDistance = 20000.0;
        this.controls.minPolarAngle = 0;
        this.controls.maxPolarAngle = Math.PI * 0.75;

        //this.scene.fog = new THREE.FogExp2( 0xaabbbb, 0.001 );
        this.initializeLoader();
        this.initializeCommands();
        this.initializeScene();
        this.serverRequest('saty', 'ff00ff');
        
    }
    initializeScene() {
        this.setLighting();
        this.setOcean();
        this.loadSkyBox();
        // show 
    }
    loadPlayer() {
        this.player = new Player(1, 'saty', 10, 0, this);
        this.player.initializeMe(); 
    }

    initializeLoader() {

        this.loadingManager = new THREE.LoadingManager();
        
        var log = function( message, type, timeout ) {
            console.log( message );
        }
        
        var delay = 1500;           // constantise
        this.loadingManager.onProgress = function( item, loaded, total ) {
            log( 'Loaded ' + loaded + '/' + total + ':' + item, 'info', delay );
        };
        this.loadingManager.onLoad = function () {
            log( 'Loaded.', 'success', delay );
        };
        this.loadingManager.onError = function () {
            log( 'Loading error.', 'error', delay );
        };
        
        this.imageLoader = new THREE.ImageLoader( this.loadingManager );
    }

    setLighting() {

        this.renderer.shadowMap.enabled = true;
        this.mainDirectionalLight = new THREE.DirectionalLight( 0xffffbb, 1 );
        this.mainDirectionalLight.position.set( - 30, 30, - 30 );
        this.scene.add( this.mainDirectionalLight, new THREE.AmbientLight( 0x888888 ) );
    }


    setOcean() {
        this.ocean = new Ocean(this)
        this.ocean.initiate();
    }

    loadSkyBox() {
        
        var cubeShader = THREE.ShaderLib['cube'];

        var skyBoxMaterial = new THREE.ShaderMaterial( {
            fragmentShader: cubeShader.fragmentShader,
            vertexShader: cubeShader.vertexShader,
            uniforms: cubeShader.uniforms,
            side: THREE.BackSide
        } );

        this.skyBox = new THREE.Mesh(
            new THREE.BoxGeometry( 450000, 450000, 450000 ),
            skyBoxMaterial
        );

        this.scene.add( this.skyBox );

        this.updateEnvironment();

    }

    updateEnvironment(){
		var directionalLightPosition = new THREE.Vector3( -1, 0.5, 0.8 );;
		var directionalLightColor =  new THREE.Color( 1, 0.95, 0.8 );;
		this.mainDirectionalLight.position.copy( directionalLightPosition );
        this.mainDirectionalLight.color.copy( directionalLightColor );                
        let cubeMap = new THREE.CubeTexture( [] );
        cubeMap.format = THREE.RGBFormat;
        var loader = this.imageLoader;
        loader.load( 'textures/skyboxsun25degtest.png', function ( image ) {
            var getSide = function ( x, y ) {
                var size = 1024;
                var canvas = document.createElement( 'canvas' );
                canvas.width = size;
                canvas.height = size;
                var context = canvas.getContext( '2d' );
                context.drawImage( image, - x * size, - y * size );
                return canvas;
            };
            cubeMap.images[ 0 ] = getSide( 2, 1 ); // px
            cubeMap.images[ 1 ] = getSide( 0, 1 ); // nx
            cubeMap.images[ 2 ] = getSide( 1, 0 ); // py
            cubeMap.images[ 3 ] = getSide( 1, 2 ); // ny
            cubeMap.images[ 4 ] = getSide( 1, 1 ); // pz
            cubeMap.images[ 5 ] = getSide( 3, 1 ); // nz
            cubeMap.needsUpdate = true;
        });
		cubeMap.format = THREE.RGBFormat;
		cubeMap.generateMipmaps = false;
		cubeMap.magFilter = THREE.LinearFilter;
		cubeMap.minFilter = THREE.LinearFilter;

        this.skyBox.material.uniforms['tCube'].value = cubeMap;       
    }


    initializeCommands() {
        //handling the key down event 
        //fires a event sending the event data to server
        //-- helps in movement of the player
        document.onkeydown = (event) => {
            if (this.socket) {
                if (event.keyCode === 39) {
                    this.socket.emit(EVENT_HAPPENED, { inputId: 'right', state: true });
                    //this.commands.states.right = true;
                }	//right
                    
                else if (event.keyCode === 40) {
                    this.socket.emit(EVENT_HAPPENED,{ inputId: 'down', state: true });
                    //this.commands.states.down = true;
                }	//down
                    
                else if (event.keyCode === 37) {
                    this.socket.emit(EVENT_HAPPENED,{ inputId: 'left', state: true});
                    //this.commands.states.left = true;
                } //left
                    
                else if (event.keyCode === 38) {
                    this.socket.emit(EVENT_HAPPENED,{ inputId: 'up', state: true });
                    //this.commands.states.up = true;
                } // up
                else if (event.keyCode === 32) {
                    this.socket.emit(EVENT_HAPPENED,{ inputId: 'attack', state: true });
                } 
                    
            //}		
        }
    
        //handling the key up event 
        //fires a event sending the event data to server based on the key codes
        //-- helps in stopping movement of the player
        document.onkeyup = (event) => {
            //if (this.socket) {
                if (event.keyCode === 39){
                    this.socket.emit(EVENT_HAPPENED, { inputId: 'right', state: false });
                    //this.commands.states.right = false;
                }	//right
                    
                else if (event.keyCode === 40){
                    this.socket.emit(EVENT_HAPPENED,{ inputId: 'down', state: false });
                    //this.commands.states.down = false;
                }	//down
                    
                else if (event.keyCode === 37){
                    this.socket.emit(EVENT_HAPPENED,{ inputId: 'left', state: false});
                    //this.commands.states.left = false;
                } //left
                    
                else if (event.keyCode === 38){
                    this.socket.emit(EVENT_HAPPENED,{ inputId: 'up', state: false });
                    //this.commands.states.up = false;
                } // up
                else if (event.keyCode === 32) {
                    this.socket.emit(EVENT_HAPPENED,{ inputId: 'attack', state: false });
                }
                
            }
        }
    }

    
    display() {    
        //this.groupShip.position.x = 4000;
        this.renderer.render( this.scene, this.camera );
    }
        
    update() {

        // Update camera position
        if( this.camera.position.y < 0.0 ) {
            this.camera.position.y = 2.0;
        }
        

        //console.log(this.playerList);
        //this.updateCommands();

        ///this.player.update(this.commands.movements.speed, this.commands.movements.angle);
        //console.log(this.player.object.position, this.player.object.rotation);
        //var currentTime = new Date().getTime();
        //this.ocean.deltaTime = ( currentTime - globals.lastTime ) / 1000 || 0.0;
        //globals.lastTime = currentTime;

        //var time = performance.now() * 0.001;
        this.ocean.update();
        //this.controls.update();
        this.display();



    }
  
    resize( inWidth, inHeight ) {

        this.camera.aspect = inWidth / inHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( inWidth, inHeight );
        this.display();

    }

    serverResponseEnterGame(data) {
        console.log('init game', data);
        this.selfId = data.selfId;
    }

    initializeSocketEvent(data) {
       if(data.bomb.length>0){
            //console.log(data); 
       }
        
       
       data.ship.forEach(( ship, idx ) => {
            var player = new Player(ship.id, ship.name, ship.lives, ship.score, this, ship.position);
            if(ship.id === this.selfId) {
                player.initializeMe();
            }               
            else{
                player.initialize();
            }
                
            this.playerList[ship.id] = player;
            //console.log(this.playerList);
       });

       data.bomb.forEach(( bomb, idx ) => {
            //console.log(bomb);
            var bomb = new Bomb(bomb.id, this, bomb.position);
            bomb.initialize();
            this.bombList[bomb.id] = bomb;
            //console.log(this.bombList);
       });
       
    }

   

   updateSocketEvent(data) {
    
        data.ship.forEach(( ship, idx ) => {
            if(this.playerList[ship.id]) {
                this.playerList[ship.id].update(ship.position, ship.angle, ship.score, ship.lives);
            }
                
        });

        data.bomb.forEach(( bomb, idx ) => {
            if(this.bombList[bomb.id]) {
                this.bombList[bomb.id].update(bomb.position);
            }
        });
   }

    removeSocketEvent(data) {
        
        data.ship.forEach(( shipId, idx ) => {
            if(this.playerList[shipId]) {
                this.playerList[shipId].remove();
                delete this.playerList[shipId];
            }
        });

        data.bomb.forEach(( bombId, idx ) => {
            if(this.bombList[bombId]) {
                this.bombList[bombId].remove();
                delete this.bombList[bombId];
            }
        });
    }

    overSocketEvent(data) {
        console.log('game over bitch', data);
    }


    bindSocketEvents() {
        
        this.socket.on(ENTERGAME_RESPONSE, this.serverResponseEnterGame.bind(this));
        // handling server response when a player is initialized
        this.socket.on(INITIALIZE, this.initializeSocketEvent.bind(this));
        
        // handling server response when a player is moving or attacking
        this.socket.on(UPDATE, this.updateSocketEvent.bind(this));
        
        // handling server response when a player is removed
        this.socket.on(REMOVE, this.removeSocketEvent.bind(this));
        
        // handling server response when a player has lost
        this.socket.on(GAME_LOST, this.overSocketEvent.bind(this));

    }
}


export default Game;