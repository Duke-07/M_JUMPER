var man, man_running, man_collided;
var tree,treeimage;
var obstacle1,obstacle1image;
var obstacle2,obstacle2image;
var bush , bushimage;
var coin ,coinimage;


var  ground1,groundimage;
var invisibleGround;

var PLAY=1;
var END=0;
var gameState=1;

var cointaken = 0;

var coinGroup,obstacleGroup;
var treeGroup,bushGroup;

var survivaltime =0;
 
var gameover,gameoverimage;
var retry,retryimage;


function preload(){
  
  man_running = loadAnimation("frame1.png","frame2.png","frame3.png","frame4.png","frame5.png","frame6.png","frame7.png","frame8.png");
  
  treeimage = loadImage("tree1.png");
  
 obstacle1image = loadImage("rock.png");
  
 obstacle2image = loadImage("log.png");
  
 bushimage = loadImage("bush.png") ;
  
  groundimage = loadImage("white (1).png");
  
  coinimage = loadAnimation("coin.gif");
  
  man_collided = loadAnimation("frame1.png");
  
  gameoverimage = loadImage("gameover.jpg")
  
  retryimage = loadImage("circled-play.png");

}

function setup() {
 createCanvas(600,600);
  
  
  
  
  man = createSprite(100,10);
  man.addAnimation("mrunning",man_running);
  man.scale = 0.7;
  man.addAnimation("collided",man_collided)
  
   invisibleGround = createSprite(300,600,600,100);
  
 
  fill("brown");
  ground1 = createSprite(700,670,600,100);
  ground1.addImage(groundimage);
   ground1.x = ground1.width /2;
  ground1.velocityX = -6 ;
  ground1.scale = 1.5
  
  invisibleGround.x = ground1.x;

  
   gameover = createSprite(300,300,10,10);
  gameover.addImage(gameoverimage);
  gameover.scale=2.6;
  gameover.visible = false;
  
   retry = createSprite(300,430,10,10);
  retry.addImage(retryimage);
  retry.scale = 0.7;
  retry.visible = false;
  
  
  
  invisibleGround.setCollider("rectangle",0,0,600,320)
  
  man.setCollider("rectangle",0,30,60,150)
   

 
 obstacleGroup = new Group();
  coinGroup = new Group();
  treeGroup = new Group();
  bushGroup = new Group();
  
}

function draw() {
  background("skyblue");
  
  if(gameState === PLAY){
     survivaltime = survivaltime +Math.round(getFrameRate()/65)
  bushes();
  coins();
    obstacles();
  
  
     if (ground1.x < 150){
      ground1.x = ground1.width/2;
    }
  
     if(keyDown("space") && man.y >= 159) {
      man.velocityY = -14;
    }
  
    man.velocityY = man.velocityY + 1.0
    
     if(coinGroup.isTouching(man)){
    coin.visible = false;
       cointaken = cointaken+1;
  } 
  man.collide(invisibleGround);
    
    if(obstacleGroup.isTouching(man)){
      gameState = END;
    }
  }
   if(gameState === END){
    man.changeAnimation("collided",man_collided)
     
     gameover.visible= true;
     retry.visible = true;
    
     obstacleGroup.destroyEach();
     obstacleGroup.setVelocityXEach(0);
     
     coinGroup.destroyEach();
     coinGroup.setVelocityXEach(0);
     
     treeGroup.setLifetimeEach(-1);
     treeGroup.setVelocityXEach(0);
     
     bushGroup.setLifetimeEach(-1);
     bushGroup.setVelocityXEach(0);
     
     man.velocityY =0;
     
     ground1.velocityX = 0;
  }
  
 
  if(mousePressedOver(retry)){
    reset();
  }
  
  
  
 drawSprites();
  fill("black")
  textSize(22);
  text("points :" +cointaken , 10,20);
   text("survivaltime :"+survivaltime,10,50);
}


function bushes(){
  if(World.frameCount%60 ===0 ){
    
    
    tree = createSprite(850,300);
    tree.addImage(treeimage);
    tree.velocityX=-6;
    treeGroup.add(tree);
    
    
    bush = createSprite(850,600);
    bush.addImage(bushimage);
    bush.velocityX=-6;
    bush.lifeTime = 200;
    bushGroup.add(bush);
    
    var position = Math.round(random(1,2))
    
    man.depth = tree.depth +1;
   gameover.depth = tree.depth+1;
 retry.depth = tree.depth+1;
    
  }
}

function coins(){
  if(World.frameCount%100 === 0){
    coin = createSprite(750,100);
    coin.addAnimation("gif",coinimage);
    coin.velocityX =-6;
  
    coin.setCollider("circle",0,0,40)
    coinGroup.add(coin);
    
  }
}

function obstacles(){
  if(World.frameCount%100 ===0){
    
  obstacle1 = createSprite(850,400);
  
  
  
   var rand = Math.round(random(1,2)); 
   switch(rand) {
      case 1: obstacle1.addImage(obstacle1image);
       obstacle1.scale = 0.2
        obstacle1.y = 450;
           
              break;
      case 2: obstacle1.addImage(obstacle2image);
           obstacle1.scale = 0.3
       obstacle1.y = 450;
              break; 
                      
      default: break;
    }
  obstacle1.velocityX =-6;
    
    obstacleGroup.add(obstacle1);
  }
}

function reset(){
  gameState=PLAY;
  gameover.visible = false;
  retry.visible = false;
  
  obstacleGroup.destroyEach();
   coinGroup.destroyEach();
  
   treeGroup.destroyEach();
   bushGroup.destroyEach();
  
  ground1.velocityX=-6;
  
  survivaltime = 0;
 cointaken = 0;
  
  
  
  man.changeAnimation("mrunning",man_running);
}


