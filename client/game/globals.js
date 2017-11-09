export default {
    selfId : null,                  // selfId is the id of the player who is logged in 
                                    //-- helps to differentiate the player playing from his enemies
    lastScore: null,                // score global for the player
                                    // -- helps to save the last score of the player playing.
    lastLives: null,                // lives global for the player
                                    // also referred to as killings in the game.
                                    // -- helps to save the remaining lives of the player playing.
    shipList: {},                   // global ship list
                                    // -- helps to keep the track of the players and the enemies 
    bombList: {},                    // global bomb list
                                    // -- helps to keep track of the bombd fired. 
    lastTime: ( new Date() ).getTime()
}