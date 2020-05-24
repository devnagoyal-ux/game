var mario, mario_running, mario_collided;
var mario_dying;
var ground, invisibleGround;
var coinsGroup,coin1, coinImage , coins2;
var obstaclesGroup,obstacle,obstacle1,obstacle2;
var score;
var background1;
var bg ;
var bg2;
var bg1;

var PLAY = 1;
var END = 2;
var gameState = PLAY;

var gameOver,restart;
var restart_i , gameOver_i;

function preload(){
 
 bg1 = loadImage("bg.png");
 bg2 = loadImage("bg2.jpg");
 mario_running = loadImage("mario.jpg");
 mario_dying = loadImage("mario dying.jpg");
 coinImage = loadImage("coin.png");
 obstacle1 = loadImage( "obst.png");
 obstacl2 = loadImage( "obs2.jpg");
 gameOver_i = loadImage("gameO.png");
 restart_i = loadImage("restartimg.png");

}

function setup() {

  createCanvas(600, 200);

 // bg = createSprite(0,0,600,200);
 // bg.addImage("bg1 ",background1);
 // bg.addImage(" bg2",bg2_img);

  mario = createSprite(50,160,20,50);
  mario.addImage("running", mario_running);
  mario.addImage("dying",mario_dying);
  mario.scale = 0.5;
  
  fill("brown");
  ground = createSprite(200,180,600,5);
  ground.x = ground.width /2;
  ground.velocityX = -4;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  gameOver = createSprite(200,30,20,20);
  gameOver.addImage("game",gameOver_i);
  gameOver.visible = false;

  restart = createSprite(340,30,20,20);
  restart.addImage("res",restart_i);
  restart.visible = false;

  coinsGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;

}

function draw() {
  //if(background1)
  background();
  noStroke();
  fill('red');
  text("Score: "+ score, 500, 50);
  
  if(gameState === PLAY){

  if(keyDown("space")) {
    mario.velocityY = -10;
  }

  mario.velocityY = mario.velocityY + 0.8

  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  if(coinsGroup.isTouching(mario)){
    score = score + 1;
}



  mario.collide(invisibleGround);
  spawnObstacles();
  spawnObstacles2();
  spawnCoins();
  spawnCoins2();

  if(obstaclesGroup.isTouching(mario)){
    gameState = END;
  }
}
else if (gameState === END){
  ground.velocityX = 0;
  coinsGroup.setVelocityXEach(0);
  obstaclesGroup.setVelocityXEach(0);
  mario.velocityY = 0;
  mario.changeImage("dying",mario_dying);

  score = 0;

  gameOver.visible = true;
  restart.visible = true;
  
 if(mousePressedOver(restart)){
    reset();
  }
  
}

 // console.log("bg" + bg.depth);
 // console.log(score.depth);
  drawSprites();
}

function reset(){
 gameState = PLAY;

 gameOver.visible = false;
 restart.visible = false;

 score = 0;

 obstaclesGroup.destroyEach();
 coinsGroup.destroyEach();

 mario.changeImage("running", mario_running);

}

function spawnObstacles() {
    if(frameCount % 60 === 0) {
       obstacle = createSprite(600,165,10,40);
       obstacle.addImage(obstacle1);
       obstacle.velocityX = -6;
       obstaclesGroup.add(obstacle);
     
   }
}

  function spawnObstacles2() {
    if(frameCount % 60 === 0) {
       obstacle2 = createSprite(900,165,40,50);
       obstacle2.x = Math.round(random(850,870));
       obstacle2.y = Math.round(random(145,165));
       obstacle2.addImage(obstacl2);
       obstacle2.velocityX = -6;
       obstaclesGroup.add(obstacle2); 
      
    }
}


function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     coin1 = createSprite(300,70,10,30);
     coin1.y = Math.round(random(70,80));
     coin1.addImage(coinImage);
     coin1.velocityX = -3;
  //adjust the depth
     coin1.depth = mario.depth;
     mario.depth = mario.depth + 1;

     coinsGroup.add(coin1);

}
}

function spawnCoins2() {
   //write code here to spawn the clouds
    if (frameCount % 60 === 0) {
     coins2 = createSprite(450,20,10,30);
     coins2.y = Math.round(random(90,100));
     coins2.addImage(coinImage);
     coins2.velocityX = -3;
  //adjust the depth
     coins2.depth = mario.depth;
     mario.depth = mario.depth + 1;
  
     coinsGroup.add(coins2);
     
  }
  }

  function changeBackground__img ()  {
    if(score < 30){
     background1 =  bg1 ;
    }
    else {
      background1 =  bg2 ;
    }
   
  }