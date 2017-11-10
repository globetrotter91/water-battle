import Game from './Game';
/**
 * @class Window
 * @description Class for handling window events and setting defaults for the game
 * @author Satyam Saxena
 */
export default class Window {
    /**
     * 
     * @param {*} height the height of the window
     * @param {*} width the width of the window
     */
    constructor( height, width ) {

        this.height = height;
        this.width = width;

    }
    /**
     * @description this method initializes the game height and width and adds resize handler
     */
    initialize() {

        this.updateSize();
        window.onresize = ( inEvent ) => {
            this.updateSize();
            this.handleWindowResize();
        };
        this.game = new Game(this.width, this.height);
        this.game.initialize();
        this.game.resize(this.width, this.height);
        this.renderGame()
    }

    /**
     * @description  This method is used to request frames at 60FPS and update the game.
     */
    renderGame() {

        requestAnimationFrame( this.renderGame.bind(this) );
        this.game.update();
        
    }

    /**
     * @description this method sets the height and width to the inner with and inner height of the window
     */
    updateSize() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

    }

    /**
     * @description this method handles the window resize
     */
    handleWindowResize() {
        this.game.resize( this.width, this.height );
    }

}