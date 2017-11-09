
export default class Window {
    constructor(height, width, game){
        this.height = height; 
        this.width = width;
        this.game = game;
    }

    initialize() {
        this.updateSize();

        // Create callbacks from keyboard
        window.onresize = function ( inEvent ) {
            this.updateSize();
        };
    }
    
    updateSize() {
        this.width = window.innerWidth ;
        this.height = window.innerHeight;
    }

    resizeCallBack(inWidth, inHeight) {
        this.game.resize( inWidth, inHeight ); 
    }
}