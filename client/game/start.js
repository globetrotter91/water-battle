import Window from './Window';
import Game from './Game';


var lastTime = ( new Date() ).getTime();

let windowObj = new Window(0,0, game)
windowObj.initialize();
let game = new Game(windowObj.width, windowObj.height);
game.initialize();
game.resize(windowObj.width, windowObj.height);



var render = function () {
    requestAnimationFrame( render );
    game.update();
};

render();