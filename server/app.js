import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { Server } from 'http';
import SocketIO from 'socket.io';
import { connectSocket } from './services/socket.service';

import constants from './constants';
import config from './config';

import routesForApp from './routes';

let app = express();
let server = Server(app);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../client')));
routesForApp(app);
app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, './../client/index.html'));
})

server.listen(process.env.PORT || config.port, () => console.log('Listening on',config.port));
console.log("Server started.", config.port);

let io = new SocketIO(server,{});
io.sockets.on('connection', connectSocket);
