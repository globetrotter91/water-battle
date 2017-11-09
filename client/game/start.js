import Window from './Window';
import Game from './Game';

// TODO: clean this file


// creating object of the window class
let windowObj = new Window(0,0)
// initialise window object
windowObj.initialize();
// create the game instance with width and height from window.
let game = new Game(windowObj.width, windowObj.height);
// initialise the game
game.initialize();
game.resize(windowObj.width, windowObj.height);

// render function is used to request frames at 60FPS and update the game.
var render = function () {
    requestAnimationFrame( render );
    game.update();
};

render();