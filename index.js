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

var sprites = {
  characterMovement: new Image(),
  characterAttack: new Image(),
  babyDown: new Image(),
  skull: new Image(),
  rock2: new Image(),
  flowers2: new Image(),
  flowers: new Image(),
  rock: new Image(),
  groundLog: new Image(),
  grass: new Image(),
  enemy: new Image(),
  deadEnemy: new Image(),
  deadCharacter: new Image(),
  gameOver: new Image(),
  youWin: new Image(),
}

for (spriteName in sprites) {
  sprites[spriteName].src = "sprites/" + spriteName + ".png";
}

function restart() {
  mapChanged = false;
  youWin = false;
  maps = {
    "0,0": undefined
  }
  currentMap = "0,0";
  character.alive = true;
  character.positionX = canvas.width/2;
  character.direction = 0;
  mapGenerate();
}

window.onkeyup = function (e) {
  if (e.keyCode == keyCode.r) restart();
  keys[e.keyCode] = false;
}
window.onkeydown = function (e) {
  keys[e.keyCode] = true;
}
context = canvas.getContext('2d');

function drawContent() {
  context.textAlign = "center";
  var pattern = context.createPattern(sprites.grass, 'repeat');
  context.fillStyle = pattern;
  context.fillRect(0, 0, canvas.width, canvas.height);

  maps[currentMap].forEach(function(y, indexY) {
    y.forEach(function(image, indexX) {
      if (image == "babyDown") {
        var differenceX = character.positionX - (indexX * 192);
        var differenceY = character.positionY - (indexY * 108);
        if (differenceX < 110 && differenceX > -90 && differenceY < 50 && differenceY > -150) {
          youWin = true;
        }
      }
      if ( !(image = "babyDown" && youWin) && image != undefined && typeOf(image) != "object") {
        context.drawImage(sprites[image], 0, 0, sprites[image].width, sprites[image].height, indexX * 192, indexY * 108, sprites[image].width, sprites[image].height);
      }
    })
  })

  if (!character.alive) {
    context.drawImage(sprites.deadCharacter, 0, 0, character.width, character.height, character.positionX, character.positionY, character.width, character.height);
  }
}

function drawEnemies() {
  maps[currentMap].forEach(function(y) {
    y.forEach(function(image) {
      if (image != undefined && typeOf(image) == "object") {
        var differenceX = character.positionX - (image.positionX - 20);
        var differenceY = character.positionY - (image.positionY + 60);
        var printImage;
        if (charater.attacking) {
          if (character.direction == 3) {
            if (differenceX < 170 && differenceX > 0 && differenceY < 0 && differenceY > -140) {
              image.alive = false;
            }
          } else if (character.direction == 1) {
            if (difference X > -120 && differenceX < 0 && differenceY < 0 && differenceY > -140) {
              image.alive = false;
            }
          } else if (character.direction == 2) {
            if (differenceX < 90 && differenceX > -90 && differenceY < 90 && differenceY > -60) {
              image.alive = false;
            }
          } else if (character.direction == 0) {
            if (differenceX < 90 && differenceX > -90 && differenceY < -60 && differenceY > -200) {
              image.alive = false;
            }
          }
        }
        if (image.alive && character.alive && !youWin ) {
          if (differenceX < 110 && differenceX > -90 && differenceY < 0 && differenceY > -150) {
            character.alive = false;
          }
          if (character.positionX - image.positionX < 0) {
            image.positionX -= image.speed;
          } else if (character.positionX - image.positionX > 0) {
            image.positionX += image.speed;
          }
          if (character.positionY - image.positionY < 0) {
            image.positonY -= image.speed;            
          } else if (character.positionY - image.positionY > 0) {
            image.positionY += image.speed;
          }
          printImage = sprites["enemy"];
        } else if (!image.alive){
          printImage = sprites["deadEnemy"];
        } else if (image.alive) {
          image.speed = 1;
          if (character.positionX - image.positionX < 0) {
            image.positionX += image.speed;
          } else if (character.positionX - image.positionX > 0) {
            image.positionX -=image.speed;
          }
          if (character.positionY - image.positionY < 0) {
            image.positionY +=image.speed;
          } else if (character.positionY - image.positionY > 0) {
            image.positionY -= image.speed;
          }
          printImage = sprites ["enemy"];
        }
        context.drawImage(printImage, 0, 0, sprites["enemy"].width, sprites["enemy"].height, image.positionX - 20, image.positionY + 60, sprites ["enemy"].width, sprites["enemy"].height);
      }
    });
  })
}

