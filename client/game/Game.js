import Ocean from './Ocean';
import Player from './Player';
import Bomb from './Bomb';
import {
    ENTERGAME_REQUEST,
    ENTERGAME_RESPONSE,
    API_URL,
    INITIALIZE, UPDATE, REMOVE, GAME_LOST, EVENT_HAPPENED, 
    START_PAGE,
    PLAYER_NAME, 
    INFO_BAR,
    GAME_LOST_DIV,
    FINAL_SCORE_SPAN
} from './constants';
/**
 * @class Game 
 * @description Main class for the game. Contains initialization server communication functions
 */
class Game {
    /**
     * 
     * @param {*} width the width of the game container
     * @param {*} height the height of the game container
     */
    constructor( width, height ) {

        this.renderer = new THREE.WebGLRenderer();
        this.camera = new THREE.PerspectiveCamera( 55.0, width / height, 0.5, 1000000 );
        this.scene = new THREE.Scene();
        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        this.ocean = null;
        this.width = width;
        this.height = height;
        this.selfId = null;
        this.playerList = {};
        this.bombList = {};
        // socket coection to serve
        this.socket = io.connect( `${window.location.protocol}//${window.location.host}` );
        // binding the socket events coming from the server
        this.bindSocketEvents();

    }

    /**
     * @description This method is used to set the extensions of WEBGL and set them to the renderer. 
     * Sets up the user controls ans calls other methods required for rendering the scene.
     */
    initialize() {

        this.renderer.context.getExtension( 'OES_texture_float' );
        this.renderer.context.getExtension( 'OES_texture_float_linear' );
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

    }

    /**
     * This method is used to start the game with respect to the player. 
     * When the player enters the name and clicks start button
     */
    handleGameStartButtonClicked() {
        this.serverRequest(PLAYER_NAME.value, 'ffffff');
    }

    /**
     * @description This method is used for initializing the image loader and loading manager for the game
     * All images and textures can be loaded using this method
     * The assets loaded can also be logged on the console.
     */
    initializeLoader() {
        
        this.loadingManager = new THREE.LoadingManager();
        var log = function ( message, type, timeout ) {
            console.log( message );
        }
        var delay = 1500;           // constantise
        this.loadingManager.onProgress = function ( item, loaded, total ) {
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

    /**
     * @description This method initialises the commands and keyboard events to send a socket event when the keys are pressed/
     */
    initializeCommands() {
        //handling the key down event 
        //fires a event sending the event data to server
        //-- helps in movement of the player
        document.onkeydown = ( event ) => {
            
            if ( this.socket ) {
                if ( event.keyCode === 39 ) {
                    this.socket.emit( EVENT_HAPPENED, { inputId: 'right', state: true } );
                }	//right

                else if ( event.keyCode === 40 ) {
                    this.socket.emit( EVENT_HAPPENED, { inputId: 'down', state: true } );
                }	//down

                else if ( event.keyCode === 37 ) {
                    this.socket.emit( EVENT_HAPPENED, { inputId: 'left', state: true } );
                } //left

                else if ( event.keyCode === 38 ) {
                    this.socket.emit( EVENT_HAPPENED, { inputId: 'up', state: true } );
                } // up

                else if ( event.keyCode === 32 ) {
                    this.socket.emit( EVENT_HAPPENED, { inputId: 'attack', state: true } );
                } // space
            }

        }

        //handling the key up event
        //fires a event sending the event data to server based on the key codes
        //-- helps in stopping movement of the player
        document.onkeyup = ( event ) => {
            
            if (this.socket) {
                if ( event.keyCode === 39 ) {
                    this.socket.emit( EVENT_HAPPENED, { inputId: 'right', state: false } );
                }	//right

                else if ( event.keyCode === 40 ) {
                    this.socket.emit( EVENT_HAPPENED, { inputId: 'down', state: false } );
                }	//down

                else if ( event.keyCode === 37 ) {
                    this.socket.emit( EVENT_HAPPENED, { inputId: 'left', state: false } );
                } //left

                else if ( event.keyCode === 38 ) {
                    this.socket.emit( EVENT_HAPPENED, { inputId: 'up', state: false } );
                } // up

                else if ( event.keyCode === 32 ) {
                    this.socket.emit( EVENT_HAPPENED, { inputId: 'attack', state: false } );
                } // space
            }

        }

    }

    /**
     * @description This method is sets the lightning, sets the ocean board and sets loads the sky-view
     */   
    initializeScene() {

        this.setLighting();
        this.setOcean();
        this.loadSkyBox();

    }

    /**
     * @description This method is used to set the lightning in the scene using direction and ambient light.
     */
    setLighting() {

        this.renderer.shadowMap.enabled = true;
        this.mainDirectionalLight = new THREE.DirectionalLight( 0xffffbb, 1 );
        this.mainDirectionalLight.position.set( -30, 30, -30 );
        this.scene.add( this.mainDirectionalLight, new THREE.AmbientLight( 0x888888 ) );

    }

    /**
     * @description This method is used to set the ocean in the scene.
     */
    setOcean() {

        this.ocean = new Ocean( this )
        this.ocean.initiate();
    }

    /**
     * @description This method is used to load the skybox in which the game runs and it sets up the camera.
     */
    loadSkyBox() {

        var cubeShader = THREE.ShaderLib[ 'cube' ];

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

    /**
     * @description This method renders the environment of the game things like the clouds and sunshine
     */
    updateEnvironment() {

        var directionalLightPosition = new THREE.Vector3( -1, 0.5, 0.8 );
        var directionalLightColor = new THREE.Color( 1, 0.95, 0.8 );
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
                context.drawImage( image, -x * size, -y * size );
                return canvas;
            };
            cubeMap.images[ 0 ] = getSide( 2, 1 ); // px
            cubeMap.images[ 1 ] = getSide( 0, 1 ); // nx
            cubeMap.images[ 2 ] = getSide( 1, 0 ); // py
            cubeMap.images[ 3 ] = getSide( 1, 2 ); // ny
            cubeMap.images[ 4 ] = getSide( 1, 1 ); // pz
            cubeMap.images[ 5 ] = getSide( 3, 1 ); // nz
            cubeMap.needsUpdate = true;
        } );
        cubeMap.format = THREE.RGBFormat;
        cubeMap.generateMipmaps = false;
        cubeMap.magFilter = THREE.LinearFilter;
        cubeMap.minFilter = THREE.LinearFilter;

        this.skyBox.material.uniforms[ 'tCube' ].value = cubeMap;

    }

    /**
     * @description This method adds the scene instance and camera instance to the renderer.
     */
    display() {
        this.renderer.render( this.scene, this.camera );
    }

    /**
     * @description This method updates every frame of the game.
     */
    update() {

        if ( this.camera.position.y < 0.0 ) {
            this.camera.position.y = 2.0;
        }

        this.ocean.update();
        this.display();

    }

    /**
     * 
     * @param {*} inWidth  width to resize to
     * @param {*} inHeight height to resize to
     */
    resize( inWidth, inHeight ) {
        
        this.camera.aspect = inWidth / inHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( inWidth, inHeight );
        this.display();

    }

    /**
     * 
     * @param {*} data data from the server
     * @description This function handles the game start event
     */
    handleGameStarted( data ) {
        this.selfId = data.selfId;
    }

    /**
     * 
     * @param {*} data data from the server
     * @description This function handles the initialise event from the server
     */
    handleInitialized( data ) {
        
        if(this.selfId) {
            data.ship.forEach( ( ship, idx ) => {
                if( !this.playerList[ ship.id ] ) {
                    
                    var player = new Player( ship.id, ship.name, ship.lives, ship.score, this, ship.position );
                    player.initialize();
                    if ( ship.id === this.selfId ) {
                        player.initializeControls();
                    }
        
                    this.playerList[ ship.id ] = player;
                }
                
            } );

            data.bomb.forEach( ( bomb, idx ) => {
                if ( !this.bombList[ bomb.id ] ) {
                    var bomb = new Bomb( bomb.id, this, bomb.position );
                    bomb.initialize();
                    this.bombList[ bomb.id ] = bomb;
                }
            } );
        }

    }

    /**
     * 
     * @param {*} data data from the server
     * @description This function handles the update event from the server
     */
    handleUpdated( data ) {

        data.ship.forEach( ( ship, idx ) => {
            if ( this.playerList[ ship.id ] ) {
                this.playerList[ ship.id ].update( ship.position, ship.angle, ship.speed );
                if( ship.id === this.selfId ) {
                    this.playerList[ ship.id ].updateScoreAndLives( ship.score, ship.lives );
                }
            }
        } );

        data.bomb.forEach( ( bomb, idx ) => {
            if ( this.bombList[ bomb.id ] ) {
                this.bombList[ bomb.id ].update( bomb.position );
            }
        } );
    }

    /**
     * 
     * @param {*} data data from the server
     * @description This function handles the remove event from the server
     */
    handleRemoved( data ) {

        data.ship.forEach( ( shipId, idx ) => {
            if ( this.playerList[ shipId ] ) {
                this.playerList[ shipId ].remove();
                delete this.playerList[ shipId ];
            }
        } );

        data.bomb.forEach( ( bombId, idx ) => {
            if ( this.bombList[ bombId ] ) {
                this.bombList[ bombId ].remove();
                delete this.bombList[ bombId ];
            }
        } );
    }

    /**
     * 
     * @param {*} data data from the server
     * @description This function handles the game over event from the server
     */
    handleGameEnded( data ) {
        
        GAME_LOST_DIV.style.display = 'block';
        FINAL_SCORE_SPAN.innerHTML = data.score; 

    }


    /**
     * 
     * @description This function binds the socket events and data from the server
     */
    bindSocketEvents() {

        this.socket.on( ENTERGAME_RESPONSE, this.handleGameStarted.bind( this ) );
        // handling server response when a player is initialized
        this.socket.on( INITIALIZE, this.handleInitialized.bind( this ) );

        // handling server response when a player is moving or attacking
        this.socket.on( UPDATE, this.handleUpdated.bind( this ) );

        // handling server response when a player is removed
        this.socket.on( REMOVE, this.handleRemoved.bind( this ) );

        // handling server response when a player has lost
        this.socket.on( GAME_LOST, this.handleGameEnded.bind( this ) );

    }

    /**
     * 
     * @param {*} playerName name of the player 
     * @param {*} color //TODO: this variable can be used for taking some other iformation from the player before entering the game
     * @description This method sends the request to the server when the users enters name. According the server response the game is initialised.
     */
    serverRequest( playerName, color ) {
        
        var data = `name=${playerName}&color=${color}`;
        var xhttp = new XMLHttpRequest();
        var that = this;
        xhttp.onreadystatechange = function () {
            if ( this.readyState == 4 && this.status == 200 ) {

                START_PAGE.style.display = 'none';
                INFO_BAR.style.display = 'block';
                var resJson = JSON.parse( this.responseText );
                that.socket.emit( ENTERGAME_REQUEST, { playerId: resJson.id, playerName: resJson.name, color: resJson.color } );

            }
        };
        xhttp.open( 'GET', `${API_URL}/users?${data}`, true );
        xhttp.send();

    }
}

export default Game;