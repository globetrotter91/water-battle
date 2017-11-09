import path from 'path'; 

import userRoute from './api/user';

/**
 * 
 * @param {*} app express application
 * @description routes the api call for player joining
 * //TODO : add db support
 */
export default function( app ) {
    // used for routing the when the player joins

    app.use('/api/users', userRoute);


};