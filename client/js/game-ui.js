/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Window = __webpack_require__(1);

var _Window2 = _interopRequireDefault(_Window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create a window object
var windowObj = new _Window2.default(0, 0);
// initialise the window object
windowObj.initialize();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Game = __webpack_require__(2);

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Window
 * @description Class for handling window events and setting defaults for the game
 * @author Satyam Saxena
 */
var Window = function () {
    /**
     * 
     * @param {*} height the height of the window
     * @param {*} width the width of the window
     */
    function Window(height, width) {
        _classCallCheck(this, Window);

        this.height = height;
        this.width = width;
    }
    /**
     * @description this method initializes the game height and width and adds resize handler
     */


    _createClass(Window, [{
        key: 'initialize',
        value: function initialize() {
            var _this = this;

            this.updateSize();
            window.onresize = function (inEvent) {
                _this.updateSize();
                _this.handleWindowResize();
            };
            this.game = new _Game2.default(this.width, this.height);
            this.game.initialize();
            this.game.resize(this.width, this.height);
            this.renderGame();
        }

        /**
         * @description  This method is used to request frames at 60FPS and update the game.
         */

    }, {
        key: 'renderGame',
        value: function renderGame() {

            requestAnimationFrame(this.renderGame.bind(this));
            this.game.update();
        }

        /**
         * @description this method sets the height and width to the inner with and inner height of the window
         */

    }, {
        key: 'updateSize',
        value: function updateSize() {

            this.width = window.innerWidth;
            this.height = window.innerHeight;
        }

        /**
         * @description this method handles the window resize
         */

    }, {
        key: 'handleWindowResize',
        value: function handleWindowResize() {
            this.game.resize(this.width, this.height);
        }
    }]);

    return Window;
}();

exports.default = Window;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Ocean = __webpack_require__(3);

var _Ocean2 = _interopRequireDefault(_Ocean);

var _Player = __webpack_require__(4);

var _Player2 = _interopRequireDefault(_Player);

var _Bomb = __webpack_require__(5);

var _Bomb2 = _interopRequireDefault(_Bomb);

var _constants = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Game 
 * @description Main class for the game. Contains initialization server communication functions
 */
var Game = function () {
    /**
     * 
     * @param {*} width the width of the game container
     * @param {*} height the height of the game container
     */
    function Game(width, height) {
        _classCallCheck(this, Game);

        this.renderer = new THREE.WebGLRenderer();
        this.camera = new THREE.PerspectiveCamera(55.0, width / height, 0.5, 1000000);
        this.scene = new THREE.Scene();
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.ocean = null;
        this.width = width;
        this.height = height;
        this.selfId = null;
        this.playerList = {};
        this.bombList = {};
        // socket coection to serve
        this.socket = io.connect(window.location.protocol + '//' + window.location.host);
        // binding the socket events coming from the server
        this.bindSocketEvents();
    }

    /**
     * @description This method is used to set the extensions of WEBGL and set them to the renderer. 
     * Sets up the user controls ans calls other methods required for rendering the scene.
     */


    _createClass(Game, [{
        key: 'initialize',
        value: function initialize() {

            this.renderer.context.getExtension('OES_texture_float');
            this.renderer.context.getExtension('OES_texture_float_linear');
            this.renderer.setClearColor(0x000000);

            document.body.appendChild(this.renderer.domElement);

            // Initialize Orbit control
            this.controls.userPan = false;
            this.controls.target.set(0, 100.0, 0);
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

            //TODO: Make this dyamic. Take user input for name
            this.serverRequest('saty', 'ff00ff');
        }

        /**
         * @description This method is used for initializing the image loader and loading manager for the game
         * All images and textures can be loaded using this method
         * The assets loaded can also be logged on the console.
         */

    }, {
        key: 'initializeLoader',
        value: function initializeLoader() {

            this.loadingManager = new THREE.LoadingManager();
            var log = function log(message, type, timeout) {
                console.log(message);
            };
            var delay = 1500; // constantise
            this.loadingManager.onProgress = function (item, loaded, total) {
                log('Loaded ' + loaded + '/' + total + ':' + item, 'info', delay);
            };
            this.loadingManager.onLoad = function () {
                log('Loaded.', 'success', delay);
            };
            this.loadingManager.onError = function () {
                log('Loading error.', 'error', delay);
            };
            this.imageLoader = new THREE.ImageLoader(this.loadingManager);
        }

        /**
         * @description This method initialises the commands and keyboard events to send a socket event when the keys are pressed/
         */

    }, {
        key: 'initializeCommands',
        value: function initializeCommands() {
            var _this = this;

            //handling the key down event 
            //fires a event sending the event data to server
            //-- helps in movement of the player
            document.onkeydown = function (event) {

                if (_this.socket) {
                    if (event.keyCode === 39) {
                        _this.socket.emit(_constants.EVENT_HAPPENED, { inputId: 'right', state: true });
                    } //right

                    else if (event.keyCode === 40) {
                            _this.socket.emit(_constants.EVENT_HAPPENED, { inputId: 'down', state: true });
                        } //down

                        else if (event.keyCode === 37) {
                                _this.socket.emit(_constants.EVENT_HAPPENED, { inputId: 'left', state: true });
                            } //left

                            else if (event.keyCode === 38) {
                                    _this.socket.emit(_constants.EVENT_HAPPENED, { inputId: 'up', state: true });
                                } // up

                                else if (event.keyCode === 32) {
                                        _this.socket.emit(_constants.EVENT_HAPPENED, { inputId: 'attack', state: true });
                                    } // space
                }
            };

            //handling the key up event
            //fires a event sending the event data to server based on the key codes
            //-- helps in stopping movement of the player
            document.onkeyup = function (event) {

                if (_this.socket) {
                    if (event.keyCode === 39) {
                        _this.socket.emit(_constants.EVENT_HAPPENED, { inputId: 'right', state: false });
                    } //right

                    else if (event.keyCode === 40) {
                            _this.socket.emit(_constants.EVENT_HAPPENED, { inputId: 'down', state: false });
                        } //down

                        else if (event.keyCode === 37) {
                                _this.socket.emit(_constants.EVENT_HAPPENED, { inputId: 'left', state: false });
                            } //left

                            else if (event.keyCode === 38) {
                                    _this.socket.emit(_constants.EVENT_HAPPENED, { inputId: 'up', state: false });
                                } // up

                                else if (event.keyCode === 32) {
                                        _this.socket.emit(_constants.EVENT_HAPPENED, { inputId: 'attack', state: false });
                                    } // space
                }
            };
        }

        /**
         * @description This method is sets the lightning, sets the ocean board and sets loads the sky-view
         */

    }, {
        key: 'initializeScene',
        value: function initializeScene() {

            this.setLighting();
            this.setOcean();
            this.loadSkyBox();
        }

        /**
         * @description This method is used to set the lightning in the scene using direction and ambient light.
         */

    }, {
        key: 'setLighting',
        value: function setLighting() {

            this.renderer.shadowMap.enabled = true;
            this.mainDirectionalLight = new THREE.DirectionalLight(0xffffbb, 1);
            this.mainDirectionalLight.position.set(-30, 30, -30);
            this.scene.add(this.mainDirectionalLight, new THREE.AmbientLight(0x888888));
        }

        /**
         * @description This method is used to set the ocean in the scene.
         */

    }, {
        key: 'setOcean',
        value: function setOcean() {

            this.ocean = new _Ocean2.default(this);
            this.ocean.initiate();
        }

        /**
         * @description This method is used to load the skybox in which the game runs and it sets up the camera.
         */

    }, {
        key: 'loadSkyBox',
        value: function loadSkyBox() {

            var cubeShader = THREE.ShaderLib['cube'];

            var skyBoxMaterial = new THREE.ShaderMaterial({
                fragmentShader: cubeShader.fragmentShader,
                vertexShader: cubeShader.vertexShader,
                uniforms: cubeShader.uniforms,
                side: THREE.BackSide
            });

            this.skyBox = new THREE.Mesh(new THREE.BoxGeometry(450000, 450000, 450000), skyBoxMaterial);

            this.scene.add(this.skyBox);

            this.updateEnvironment();
        }

        /**
         * @description This method renders the environment of the game things like the clouds and sunshine
         */

    }, {
        key: 'updateEnvironment',
        value: function updateEnvironment() {

            var directionalLightPosition = new THREE.Vector3(-1, 0.5, 0.8);
            var directionalLightColor = new THREE.Color(1, 0.95, 0.8);
            this.mainDirectionalLight.position.copy(directionalLightPosition);
            this.mainDirectionalLight.color.copy(directionalLightColor);
            var cubeMap = new THREE.CubeTexture([]);
            cubeMap.format = THREE.RGBFormat;
            var loader = this.imageLoader;
            loader.load('textures/skyboxsun25degtest.png', function (image) {
                var getSide = function getSide(x, y) {
                    var size = 1024;
                    var canvas = document.createElement('canvas');
                    canvas.width = size;
                    canvas.height = size;
                    var context = canvas.getContext('2d');
                    context.drawImage(image, -x * size, -y * size);
                    return canvas;
                };
                cubeMap.images[0] = getSide(2, 1); // px
                cubeMap.images[1] = getSide(0, 1); // nx
                cubeMap.images[2] = getSide(1, 0); // py
                cubeMap.images[3] = getSide(1, 2); // ny
                cubeMap.images[4] = getSide(1, 1); // pz
                cubeMap.images[5] = getSide(3, 1); // nz
                cubeMap.needsUpdate = true;
            });
            cubeMap.format = THREE.RGBFormat;
            cubeMap.generateMipmaps = false;
            cubeMap.magFilter = THREE.LinearFilter;
            cubeMap.minFilter = THREE.LinearFilter;

            this.skyBox.material.uniforms['tCube'].value = cubeMap;
        }

        /**
         * @description This method adds the scene instance and camera instance to the renderer.
         */

    }, {
        key: 'display',
        value: function display() {
            this.renderer.render(this.scene, this.camera);
        }

        /**
         * @description This method updates every frame of the game.
         */

    }, {
        key: 'update',
        value: function update() {

            if (this.camera.position.y < 0.0) {
                this.camera.position.y = 2.0;
            }

            this.ocean.update();
            this.display();
        }

        /**
         * //@TODO
         * @param {*} inWidth  width to resize to
         * @param {*} inHeight height to resize to
         */

    }, {
        key: 'resize',
        value: function resize(inWidth, inHeight) {
            // TODO: implement the function // currently not working
            this.camera.aspect = inWidth / inHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(inWidth, inHeight);
            this.display();
        }

        /**
         * 
         * @param {*} data data from the server
         * @description This function handles the game start event
         */

    }, {
        key: 'handleGameStarted',
        value: function handleGameStarted(data) {
            console.log;
            this.selfId = data.selfId;
        }

        /**
         * 
         * @param {*} data data from the server
         * @description This function handles the initialise event from the server
         */

    }, {
        key: 'handleInitialized',
        value: function handleInitialized(data) {
            var _this2 = this;

            if (this.selfId) {
                data.ship.forEach(function (ship, idx) {
                    if (!_this2.playerList[ship.id]) {

                        var player = new _Player2.default(ship.id, ship.name, ship.lives, ship.score, _this2, ship.position);
                        player.initialize();
                        if (ship.id === _this2.selfId) {
                            player.initializeControls();
                        }

                        _this2.playerList[ship.id] = player;
                    }
                });

                data.bomb.forEach(function (bomb, idx) {
                    if (!_this2.bombList[bomb.id]) {
                        var bomb = new _Bomb2.default(bomb.id, _this2, bomb.position);
                        bomb.initialize();
                        _this2.bombList[bomb.id] = bomb;
                    }
                });
            }
        }

        /**
         * 
         * @param {*} data data from the server
         * @description This function handles the update event from the server
         */

    }, {
        key: 'handleUpdated',
        value: function handleUpdated(data) {
            var _this3 = this;

            data.ship.forEach(function (ship, idx) {
                if (_this3.playerList[ship.id]) {
                    _this3.playerList[ship.id].update(ship.position, ship.angle, ship.score, ship.lives, ship.speed);
                }
            });

            data.bomb.forEach(function (bomb, idx) {
                if (_this3.bombList[bomb.id]) {
                    _this3.bombList[bomb.id].update(bomb.position);
                }
            });
        }

        /**
         * 
         * @param {*} data data from the server
         * @description This function handles the remove event from the server
         */

    }, {
        key: 'handleRemoved',
        value: function handleRemoved(data) {
            var _this4 = this;

            data.ship.forEach(function (shipId, idx) {
                if (_this4.playerList[shipId]) {
                    _this4.playerList[shipId].remove();
                    delete _this4.playerList[shipId];
                }
            });

            data.bomb.forEach(function (bombId, idx) {
                if (_this4.bombList[bombId]) {
                    _this4.bombList[bombId].remove();
                    delete _this4.bombList[bombId];
                }
            });
        }

        /**
         * //TODO
         * @param {*} data data from the server
         * @description This function handles the game over event from the server
         */

    }, {
        key: 'handleGameEnded',
        value: function handleGameEnded(data) {
            console.log('game over bitch', data);
            //TODO : implement game over logic and UI
        }

        /**
         * 
         * @description This function binds the socket events and data from the server
         */

    }, {
        key: 'bindSocketEvents',
        value: function bindSocketEvents() {

            this.socket.on(_constants.ENTERGAME_RESPONSE, this.handleGameStarted.bind(this));
            // handling server response when a player is initialized
            this.socket.on(_constants.INITIALIZE, this.handleInitialized.bind(this));

            // handling server response when a player is moving or attacking
            this.socket.on(_constants.UPDATE, this.handleUpdated.bind(this));

            // handling server response when a player is removed
            this.socket.on(_constants.REMOVE, this.handleRemoved.bind(this));

            // handling server response when a player has lost
            this.socket.on(_constants.GAME_LOST, this.handleGameEnded.bind(this));
        }

        /**
         * 
         * @param {*} playerName name of the player 
         * @param {*} color //TODO: this variable can be used for taking some other iformation from the player before entering the game
         * @description This method sends the request to the server when the users enters name. According the server response the game is initialised.
         */

    }, {
        key: 'serverRequest',
        value: function serverRequest(playerName, color) {

            var data = 'name=' + playerName + '&color=' + color;
            var xhttp = new XMLHttpRequest();
            var that = this;
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                    var resJson = JSON.parse(this.responseText);
                    that.socket.emit(_constants.ENTERGAME_REQUEST, { playerId: resJson.id, playerName: resJson.name, color: resJson.color });
                }
            };
            xhttp.open('GET', _constants.API_URL + '/users?' + data, true);
            xhttp.send();
        }
    }]);

    return Game;
}();

exports.default = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Ocean
 * @description Ocean class to add and update the ocean to the scene
 * @author Satyam Saxena
 */
var Ocean = function () {

    /**
     * 
     * @param {*} game object of the game
     */
    function Ocean(game) {
        _classCallCheck(this, Ocean);

        this.game = game;
        // default parameters for the ocean display
        this.parameters = {
            oceanSide: 30000,
            size: 1.0,
            distortionScale: 3.7,
            alpha: 1.0
        };
        this.object = new THREE.Water(this.parameters.oceanSide * 5, this.parameters.oceanSide * 5, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load('textures/waternormals.jpg', function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            }),
            alpha: this.parameters.alpha,
            sunDirection: this.game.mainDirectionalLight.position.clone().normalize(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: this.parameters.distortionScale
        });
    }

    /**
     * @description This method is used to initiate the ocean view in the scene
     */


    _createClass(Ocean, [{
        key: 'initiate',
        value: function initiate() {

            this.object.rotation.x = -Math.PI / 2;
            this.object.receiveShadow = true;
            this.game.scene.add(this.object);
        }

        /**
         * @description This method is used to update the ocean, waves and distortion and lightning
         */

    }, {
        key: 'update',
        value: function update() {

            this.object.material.uniforms.time.value += 1.0 / 60.0;
            this.object.material.uniforms.size.value = this.parameters.size;
            this.object.material.uniforms.distortionScale.value = this.parameters.distortionScale;
            this.object.material.uniforms.alpha.value = this.parameters.alpha;
        }
    }]);

    return Ocean;
}();

exports.default = Ocean;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Player
 * @description Class to add, remove and update the players of the game and adding controls to the playing player
 * @author Satyam Saxena
 */
var Player = function () {
    /**
     *
     * @param id id of the player
     * @param name name of the player
     * @param lives lives remaining of the player
     * @param score current score of the player
     * @param game object of the game
     * @param position initial position of the player
     */
    function Player(id, name, lives, score, game, position) {
        _classCallCheck(this, Player);

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


    _createClass(Player, [{
        key: 'load',
        value: function load() {
            var _this = this;

            var loader = new THREE.OBJMTLLoader(this.game.loadingManager);

            loader.load('models/BlackPearl/BlackPearl.obj', 'models/BlackPearl/BlackPearl.mtl', function (object) {
                object.position.y = 20.0;
                if (object.children) {

                    for (var child in object.children) {
                        object.children[child].material.side = THREE.DoubleSide;
                    }
                }
                _this.ship.add(object);
            });
        }

        /**
         * @description This method initialises the ship for all players and position them on the ocean.
         */

    }, {
        key: 'initialize',
        value: function initialize() {

            //TODO: position all ships at accurate postion now only positioning at 000
            //this.object.position.x = this.position.x || 0;
            //this.object.position.y = this.position.y || 0;
            //this.object.position.z = this.position.z || 0;

            this.game.scene.add(this.object);
            this.object.add(this.ship);
            this.load();
        }

        /**
         *@description This method initialises the controls for a player if the player is the user playing
         */

    }, {
        key: 'initializeControls',
        value: function initializeControls() {

            this.game.camera.position.set(0, 350, 800);
            this.game.camera.lookAt(new THREE.Vector3());
            this.ship.add(this.game.camera);
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

    }, {
        key: 'update',
        value: function update(position, angle, score, lives, speed) {

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

    }, {
        key: 'remove',
        value: function remove() {
            this.game.scene.remove(this.object);
        }
    }]);

    return Player;
}();

exports.default = Player;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Bomb
 * @description Class for creating, updating and removing the bombs in the game.
 * @author Satyam Saxena
 */
var Bomb = function () {
    /**
     *
     * @param id: id of the bomb
     * @param game: object of the game
     * @param position: initial position Vector of the bomb on the screen
     */
    function Bomb(id, game, position) {
        _classCallCheck(this, Bomb);

        this.id = id;
        this.game = game;
        this.position = position;

        this.geometry = new THREE.IcosahedronGeometry(20, 2);
        for (var i = 0, j = this.geometry.faces.length; i < j; i++) {
            this.geometry.faces[i].color.setHex(Math.random() * 0xffffff);
        }

        this.material = new THREE.MeshPhongMaterial({
            vertexColors: THREE.FaceColors,
            shininess: 10,
            side: THREE.DoubleSide
        });
        // this is the mesh object of the bomb which is for adding the bomb to the scene and updating its position.
        this.object = new THREE.Mesh(this.geometry, this.material);
        this.object.castShadow = true;
    }

    /**
     *
     * @description This method initialises the bomb on the screen.
     *
     */


    _createClass(Bomb, [{
        key: "initialize",
        value: function initialize() {

            this.object.position.x = this.position.x;
            this.object.position.y = this.position.y;
            this.object.position.z = this.position.z;
            this.game.scene.add(this.object);
        }

        /**
         *
         * @description This method updates the postion of the bomb receiving the position from the server
         * @param position: updated position vector of the bomb from server
         *
         */

    }, {
        key: "update",
        value: function update(position) {

            this.object.position.x = position.x;
            this.object.position.y = position.y;
            this.object.position.z = position.z;
        }

        /**
         *
         * @description This method removes the bomb on the screen.
         *
         */

    }, {
        key: "remove",
        value: function remove() {
            this.game.scene.remove(this.object);
        }
    }]);

    return Bomb;
}();

exports.default = Bomb;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var URL = exports.URL = "http://localhost:8000";
var API_URL = exports.API_URL = "http://localhost:8000/api";
var START_PAGE = exports.START_PAGE = document.getElementById('startPage');
var GAME_CONTAINER = exports.GAME_CONTAINER = document.getElementById('gameContainer');

//socket events 
var ENTERGAME_REQUEST = exports.ENTERGAME_REQUEST = 'ENTERGAME_REQUEST';
var ENTERGAME_RESPONSE = exports.ENTERGAME_RESPONSE = 'ENTERGAME_RESPONSE';
var DISCONNECT = exports.DISCONNECT = 'disconnect';
var EVAL_SERVER = exports.EVAL_SERVER = 'EVAL_SERVER';
var EVAL_SERVER_RESPONSE = exports.EVAL_SERVER_RESPONSE = 'EVAL_SERVER_RESPONSE';
var INITIALIZE = exports.INITIALIZE = 'INITIALIZE';
var UPDATE = exports.UPDATE = 'UPDATE';
var REMOVE = exports.REMOVE = 'REMOVE';
var EVENT_HAPPENED = exports.EVENT_HAPPENED = 'EVENT_HAPPENED';
var COLOR_SELECTED = exports.COLOR_SELECTED = 'COLOR_SELECTED';
var GAME_LOST = exports.GAME_LOST = 'GAME_LOST';

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.map