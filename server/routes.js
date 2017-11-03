import path from 'path'; 

import userRoute from './api/user';

export default function(app) {

    app.use('/api/users', userRoute);

};