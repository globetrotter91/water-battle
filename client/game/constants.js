export const URL = "http://localhost:8000";
export const API_URL = "http://localhost:8000/api";
export const START_PAGE = document.getElementById('startPage');
export const START_BUTTON = document.getElementById('startGameButton');
export const PLAYER_NAME = document.getElementById('playerName');
export const PLAYER_NAME_SPAN = document.getElementById('username');
export const PLAYER_LIVES_SPAN = document.getElementById('lifeCounter');
export const PLAYER_SCORE_SPAN = document.getElementById('scoreCounter');
export const INFO_BAR = document.getElementById('infoBar');
export const GAME_LOST_DIV = document.getElementById('gameLosDiv');
export const FINAL_SCORE_SPAN = document.getElementById('finalScore');

//socket events 
export const ENTERGAME_REQUEST = 'ENTERGAME_REQUEST';
export const ENTERGAME_RESPONSE = 'ENTERGAME_RESPONSE';
export const DISCONNECT = 'disconnect';
export const EVAL_SERVER = 'EVAL_SERVER';
export const EVAL_SERVER_RESPONSE = 'EVAL_SERVER_RESPONSE';
export const INITIALIZE = 'INITIALIZE';
export const UPDATE = 'UPDATE';
export const REMOVE = 'REMOVE';
export const EVENT_HAPPENED = 'EVENT_HAPPENED';
export const COLOR_SELECTED = 'COLOR_SELECTED'; 
export const GAME_LOST = 'GAME_LOST'; 
