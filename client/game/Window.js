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
     * @param {*} game the object of the game
     */
    constructor( height, width, game ) {

        this.height = height;
        this.width = width;
        this.game = game;

    }
    /**
     * @description this method initializes the game height and width and adds resize handler
     */
    initialize() {

        this.updateSize();
        window.onresize = function ( inEvent ) {
            this.handleWindowResize();
        };

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
    handleWindowResize( inWidth, inHeight ) {
        //TODO: resize handler foe the game
        //this.game.resize( inWidth, inHeight );
    }

}