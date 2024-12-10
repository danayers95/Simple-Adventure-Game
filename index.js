var canvas;
var context;
var keys = {};
const keyCode = {
  left: 37,
  up: 38, 
  right: 39, 
  down: 40, 
  space: 32,
  r: 82
}
canvas = document.getElementById('canvas');
var framesByImage = 5;
var attackFramesByImage = 3;
var mapChanged = false;
var youWin = false;
var saved = false;
var maps = {
  "0,0: undefined
}
var currentMap = "0,0";

var character = {
  spriteX: 0,
  spriteY: 0,
  width: 100,
  height: 200,
  attackWidth: 200,
  attackHeight: 200,
  moveSpeed: 7, 
  positionX: canvas.width/2,
  positionY: canvas.height/2,
  moving: false,
  currentSprite: 0,
  attackSprite: undefined,
  direction: 0,
  attacking: false,
  attackPressed: false,
  alive: true
}
