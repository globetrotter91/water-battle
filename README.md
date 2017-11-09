# water-battle
Multiplayer game using THREE.js, NodeJS and sockets. ES6 syntax.


# SETUP

1. Clone the repo

2. cd to repo. 

3. npm install

4. npm start

5. In development -- open another tab with same path and run webpack -w to watch and build game. 


# Info

1. The backend is build in node.js(version 6.10) [/server]

2. Socket.io(version 2.0) library is used for websocket connection between client and server.

3. The frontend code is in the folder with minimal css [/client].

4. The game logic and components are written in es2015 syntax [/game].

5. Babel transpiler is used for transpiling ES6 to browser-friendly JS. 


# ToDO

1. Add shooting physics for projectile motion. Minor fixes like initial positiom setting of the player.

2. Shaky movemnt to the ship. Ship should visually be damaged when hit.

3. DB support for returning users. Will give more stability to the game.