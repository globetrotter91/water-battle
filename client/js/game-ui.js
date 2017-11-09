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

var _Game = __webpack_require__(2);

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lastTime = new Date().getTime();

var windowObj = new _Window2.default(0, 0, game);
windowObj.initialize();
var game = new _Game2.default(windowObj.width, windowObj.height);
game.initialize();
game.resize(windowObj.width, windowObj.height);

var render = function render() {
    requestAnimationFrame(render);
    game.update();
};

render();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Window = function () {
    function Window(height, width, game) {
        _classCallCheck(this, Window);

        this.height = height;
        this.width = width;
        this.game = game;
    }

    _createClass(Window, [{
        key: "initialize",
        value: function initialize() {
            this.updateSize();

            // Create callbacks from keyboard
            window.onresize = function (inEvent) {
                this.updateSize();
            };
        }
    }, {
        key: "updateSize",
        value: function updateSize() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        }
    }, {
        key: "resizeCallBack",
        value: function resizeCallBack(inWidth, inHeight) {
            this.game.resize(inWidth, inHeight);
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

var _globals = __webpack_require__(3);

var _globals2 = _interopRequireDefault(_globals);

var _Ocean = __webpack_require__(4);

var _Ocean2 = _interopRequireDefault(_Ocean);

var _Player = __webpack_require__(5);

var _Player2 = _interopRequireDefault(_Player);

var _Bomb = __webpack_require__(6);

var _Bomb2 = _interopRequireDefault(_Bomb);

var _constants = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(width, height) {
        _classCallCheck(this, Game);

        this.renderer = new THREE.WebGLRenderer();
        this.camera = new THREE.PerspectiveCamera(55.0, width / height, 0.5, 1000000);
        this.scene = new THREE.Scene();
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.ocean = null;
        this.commands = {
            states: {
                up: false,
                right: false,
                down: false,
                left: false
            },
            movements: {
                speed: 0.0,
                angle: 0.0
            }
        };
        this.width = width;
        this.height = height;
        this.selfId = null;
        this.playerList = {};
        this.bombList = {};
        this.socket = io.connect(window.location.protocol + '//' + window.location.host);
        this.bindSocketEvents();
    }

    _createClass(Game, [{
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
            xhttp.open("GET", _constants.API_URL + '/users?' + data, true);
            xhttp.send();
        }
    }, {
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
            this.serverRequest('saty', 'ff00ff');
        }
    }, {
        key: 'initializeScene',
        value: function initializeScene() {
            this.setLighting();
            this.setOcean();
            this.loadSkyBox();
            // show 
        }
    }, {
        key: 'loadPlayer',
        value: function loadPlayer() {
            this.player = new _Player2.default(1, 'saty', 10, 0, this);
            this.player.initializeMe();
        }
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
    }, {
        key: 'setLighting',
        value: function setLighting() {

            this.renderer.shadowMap.enabled = true;
            this.mainDirectionalLight = new THREE.DirectionalLight(0xffffbb, 1);
            this.mainDirectionalLight.position.set(-30, 30, -30);
            this.scene.add(this.mainDirectionalLight, new THREE.AmbientLight(0x888888));
        }
    }, {
        key: 'setOcean',
        value: function setOcean() {
            this.ocean = new _Ocean2.default(this);
            this.ocean.initiate();
        }
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
    }, {
        key: 'updateEnvironment',
        value: function updateEnvironment() {
            var directionalLightPosition = new THREE.Vector3(-1, 0.5, 0.8);;
            var directionalLightColor = new THREE.Color(1, 0.95, 0.8);;
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
                        //this.commands.states.right = true;
                    } //right

                    else if (event.keyCode === 40) {
                            _this.socket.emit(_constants.EVENT_HAPPENED, { inputId: 'down', state: true });
                            //this.commands.states.down = true;
                        } //down

                        else if (event.keyCode === 37) {
                                _this.socket.emit(_constants.EVENT_HAPPENED, { inputId: 'left', state: true });
                                //this.commands.states.left = true;
                            } //left

                            else if (event.keyCode === 38) {
                                    _this.socket.emit(_constants.EVENT_HAPPENED, { inputId: 'up', state: true });
                                    //this.commands.states.up = true;
                                } // up
                                else if (event.keyCode === 32) {
                                        _this.socket.emit(_constants.EVENT_HAPPENED, { inputId: 'attack', state: true });
                                    }

                    //}		
                }

                //handling the key up event 
                //fires a event sending the event data to server based on the key codes
                //-- helps in stopping movement of the player
                document.onkeyup = function (event) {
                    //if (this.socket) {
                    if (event.keyCode === 39) {
                        _this.socket.emit(_constants.EVENT_HAPPENED, { inputId: 'right', state: false });
                        //this.commands.states.right = false;
                    } //right

                    else if (event.keyCode === 40) {
                            _this.socket.emit(_constants.EVENT_HAPPENED, { inputId: 'down', state: false });
                            //this.commands.states.down = false;
                        } //down

                        else if (event.keyCode === 37) {
                                _this.socket.emit(_constants.EVENT_HAPPENED, { inputId: 'left', state: false });
                                //this.commands.states.left = false;
                            } //left

                            else if (event.keyCode === 38) {
                                    _this.socket.emit(_constants.EVENT_HAPPENED, { inputId: 'up', state: false });
                                    //this.commands.states.up = false;
                                } // up
                                else if (event.keyCode === 32) {
                                        _this.socket.emit(_constants.EVENT_HAPPENED, { inputId: 'attack', state: false });
                                    }
                };
            };
        }
    }, {
        key: 'display',
        value: function display() {
            //this.groupShip.position.x = 4000;
            this.renderer.render(this.scene, this.camera);
        }
    }, {
        key: 'update',
        value: function update() {

            // Update camera position
            if (this.camera.position.y < 0.0) {
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
    }, {
        key: 'resize',
        value: function resize(inWidth, inHeight) {

            this.camera.aspect = inWidth / inHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(inWidth, inHeight);
            this.display();
        }
    }, {
        key: 'serverResponseEnterGame',
        value: function serverResponseEnterGame(data) {
            console.log('init game', data);
            this.selfId = data.selfId;
        }
    }, {
        key: 'initializeSocketEvent',
        value: function initializeSocketEvent(data) {
            var _this2 = this;

            if (data.bomb.length > 0) {
                //console.log(data); 
            }

            data.ship.forEach(function (ship, idx) {
                var player = new _Player2.default(ship.id, ship.name, ship.lives, ship.score, _this2, ship.position);
                if (ship.id === _this2.selfId) {
                    player.initializeMe();
                } else {
                    player.initialize();
                }

                _this2.playerList[ship.id] = player;
                //console.log(this.playerList);
            });

            data.bomb.forEach(function (bomb, idx) {
                //console.log(bomb);
                var bomb = new _Bomb2.default(bomb.id, _this2, bomb.position);
                bomb.initialize();
                _this2.bombList[bomb.id] = bomb;
                //console.log(this.bombList);
            });
        }
    }, {
        key: 'updateSocketEvent',
        value: function updateSocketEvent(data) {
            var _this3 = this;

            data.ship.forEach(function (ship, idx) {
                if (_this3.playerList[ship.id]) {
                    _this3.playerList[ship.id].update(ship.position, ship.angle, ship.score, ship.lives);
                }
            });

            data.bomb.forEach(function (bomb, idx) {
                if (_this3.bombList[bomb.id]) {
                    _this3.bombList[bomb.id].update(bomb.position);
                }
            });
        }
    }, {
        key: 'removeSocketEvent',
        value: function removeSocketEvent(data) {
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
    }, {
        key: 'overSocketEvent',
        value: function overSocketEvent(data) {
            console.log('game over bitch', data);
        }
    }, {
        key: 'bindSocketEvents',
        value: function bindSocketEvents() {

            this.socket.on(_constants.ENTERGAME_RESPONSE, this.serverResponseEnterGame.bind(this));
            // handling server response when a player is initialized
            this.socket.on(_constants.INITIALIZE, this.initializeSocketEvent.bind(this));

            // handling server response when a player is moving or attacking
            this.socket.on(_constants.UPDATE, this.updateSocketEvent.bind(this));

            // handling server response when a player is removed
            this.socket.on(_constants.REMOVE, this.removeSocketEvent.bind(this));

            // handling server response when a player has lost
            this.socket.on(_constants.GAME_LOST, this.overSocketEvent.bind(this));
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
exports.default = {
                                selfId: null, // selfId is the id of the player who is logged in 
                                //-- helps to differentiate the player playing from his enemies
                                lastScore: null, // score global for the player
                                // -- helps to save the last score of the player playing.
                                lastLives: null, // lives global for the player
                                // also referred to as killings in the game.
                                // -- helps to save the remaining lives of the player playing.
                                shipList: {}, // global ship list
                                // -- helps to keep the track of the players and the enemies 
                                bombList: {}, // global bomb list
                                // -- helps to keep track of the bombd fired. 
                                lastTime: new Date().getTime()
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ocean = function () {
	function Ocean(game) {
		_classCallCheck(this, Ocean);

		this.game = game;
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

	_createClass(Ocean, [{
		key: 'initiate',
		value: function initiate() {
			this.object.rotation.x = -Math.PI / 2;
			this.object.receiveShadow = true;

			this.game.scene.add(this.object);
		}
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
	function Player(id, name, lives, score, game, position, rotation) {
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
	}, {
		key: 'initialize',
		value: function initialize() {
			//this.object.position.x = this.position.x || 0;
			//this.object.position.y = this.position.y || 0;
			//this.object.position.z = this.position.z || 0;

			this.game.scene.add(this.object);
			this.object.add(this.ship);
			this.load();
		}
	}, {
		key: 'initializeMe',
		value: function initializeMe() {
			this.initialize();
			this.game.camera.position.set(0, 350, 800);
			this.game.camera.lookAt(new THREE.Vector3());
			this.ship.add(this.game.camera);
		}
	}, {
		key: 'update',
		value: function update(position, rotation, score, lives) {
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bomb = function () {
    function Bomb(id, game, position) {
        _classCallCheck(this, Bomb);

        this.id = id;
        this.game = game;
        //this.material = new THREE.MeshBasicMaterial({
        // color: 0x000000
        //});
        //this.geometry = new THREE.SphereGeometry(1, 6, 10);
        //this.object = new THREE.Mesh(this.geometry, this.material);
        this.position = position;

        this.geometry = new THREE.IcosahedronGeometry(20, 2);
        for (var i = 0, j = this.geometry.faces.length; i < j; i++) {
            this.geometry.faces[i].color.setHex(Math.random() * 0xffffff);
        }
        this.material = new THREE.MeshPhongMaterial({
            vertexColors: THREE.FaceColors,
            shininess: 10,
            //envMap: cubeMap,
            side: THREE.DoubleSide
        });
        this.object = new THREE.Mesh(this.geometry, this.material);
        this.object.castShadow = true;
        //this.initialize(position);
    }

    _createClass(Bomb, [{
        key: "initialize",
        value: function initialize() {

            console.log(this.object);
            this.object.position.x = this.position.x;
            this.object.position.y = this.position.y;
            this.object.position.z = this.position.z;
            this.game.scene.add(this.object);
        }
    }, {
        key: "update",
        value: function update(position) {
            this.object.position.x = position.x;
            this.object.position.y = position.y;
            this.object.position.z = position.z;
        }
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
/* 7 */
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