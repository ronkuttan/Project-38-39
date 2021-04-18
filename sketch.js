
var gameState = "Start";

var cycle, cycling, cycle_collided;
var ground, invisibleGround, groundImage;
var okImg,clickImg,greatImg,wellImg,tryImg,playImg;
var coinGroup, coinImage;
var obstaclesGroup,coneImg;
var heart1,heart2,heart3,life,lifeImg;
var score , coins;
var startImg,gameOverImg,restartImg;
var life = 3;
var winImg;

function preload(){
  cycling = loadAnimation("cycle1.png","cycle2.png","cycle3.png","cycle4.png","cycle5.png","cycle6.png");
  cycle_collided = loadAnimation("collided.png");
  
  groundImage = loadImage("backg.jpg");
  
  coinImage = loadAnimation("coin1.png","coin2.png","coin3.png","coin5.png","coin6.png",);
  
  coneImg = loadImage("cone.png")
  
  gameOverImg = loadImage("gameOver.png")
  startImg = loadImage("start.png")
 lifeImg = loadImage("life.png");
  okImg = loadImage("ok.png");
  clickImg = loadImage("clickHere.png");
  greatImg = loadImage("great Job.jpg");
  wellImg = loadImage("well done.png");
  winImg = loadImage("win.jpg");
  tryImg = loadImage("sorry.png");
  playImg = loadImage("Play.png")
}

function setup() {
  createCanvas(750, 600);

  var message = "This is a message";
 console.log(message)
  
  cycle = createSprite(200,300,20,50);
  cycle.addAnimation("running", cycling);
  cycle.addAnimation("collided", cycle_collided);
  cycle.scale = 1;
 
  ground = createSprite(100,400,800,20);
  ground.addImage("ground",groundImage);

  ground.x = ground.width /2;
  ground.scale = 1.5;

  click = createSprite(200,500);
  click.addImage(clickImg);
  click.scale = 0.3;

  ground.depth = cycle.depth
  cycle.depth+=3
  gameOver = createSprite(200,click.y-120);
  gameOver.addImage(gameOverImg);

  great = createSprite(200,click.y-320);
  great.addImage(greatImg);
  great.scale = 0.7;

  well = createSprite(200,click.y-320);
  well.addImage(wellImg);
  well.scale = 0.7;

  nextTime = createSprite(200,click.y-320);
  nextTime.addImage(tryImg);
  nextTime.scale = 0.7;
  

  start = createSprite(350,460);
  start.addImage(startImg);
  start.scale = 0.5;

  ok = createSprite(200,460);
  ok.addImage(okImg);
  ok.scale = 0.1;
  
  play = createSprite(650,540);
  play.addImage(playImg);
  play.scale = 0.4;

  heart1 = createSprite(350,40);
  heart1.addImage(lifeImg);
  heart1.scale = 0.1;
  heart1.visible = false;

  heart2 = createSprite(410,40);
  heart2.addImage(lifeImg);
  heart2.scale = 0.1;
  heart2.visible = false;
  
  heart3 = createSprite(470,40);
  heart3.addImage(lifeImg);
  heart3.scale = 0.1;
  heart3.visible = false;

  gameOver.scale = 0.7;
  
  
  invisibleGround = createSprite(600,310,1200,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  coinGroup = createGroup();

  score = 0;
  coins = 0;
}

function draw() {
  if(gameState === "Start"){
    cycle.visible = false;
    
    gameOver.visible = false;
    ground.visible=false;
    great.visible = false;
    nextTime.visible = false;
    well.visible = false;
    ok.visible = false;
    click.visible = false;
    play.visible = false;
     
    background(0);
    textSize(40)
    fill("YELLOW")
    stroke("YELLOW")
    strokeWeight(1.5);
    text("WELCOME",250,150);
    textSize(37)
    fill("ORANGE")
    stroke("ORANGE")
    strokeWeight(1.4);
    text("TO THE",280,230);
    textSize(50)
    fill("RED")
    stroke("RED")
    strokeWeight(3);
    text("CYCLE RACE GAME",120,330)
    if(mousePressedOver(start)) {
      gameState="Instructions"
     }
  }

  if(gameState === "Instructions" ){
    background(255);
    textSize(30)
    fill("YELLOW")
    stroke("orange")
    strokeWeight(3);
    text("INSTRUCTIONS",250,50);
    textSize(20)
    fill("red")
    stroke("red")
    strokeWeight(1);
    text("1. USE  UP  AND  DOWN  ARROWS  TO  MOVE.",50,120);
    text("2.WHENEVER  YOU  TOUCH  AN  OBSTACLE  YOUR  LIVES",50,160);
    text(" WILL  REDUCE  ONE  BY  ONE..",70,185);
    text("3. YOU  HAVE  THREE  LIVES",50,225);
    text("4. THERE  WILL  BE  ALERTS  WHEN  YOUR  LIVES  ARE  GONE.",50,265);
    text("JUST  CLICK  OK..",75,290);
    text("5.  COLLECT  30  COINS  TO  WIN.. ",50,330);
    text("6. YOU WILL BE REWARDED ACCORDING  TO  YOUR COLLECTED COINS",50,370);
    text("*0-10 COINS : BETTER LUCK NEXT TIME",70,395);
    text("*10-20 COINS : WELL DONE",70,420);
    text("*20-30 COINS : GREAT JOB",70,445);
    text("*30 COINS : YOU WON",70,470);
    textSize(15)
    text("*IF  YOU  WANT  TO  PLAY  AGAIN  PLEASE  RELOAD  THE  PAGE ",50,500);
    play.visible = true;
    if(mousePressedOver(play)){
      gameState = "Play"
    }
     
    start.destroy();
  }
 
  if(gameState === "Play"){
   
    background(0);
    heart1.y = cycle.y-250;
    heart2.y = cycle.y-250;
    heart3.y = cycle.y-250;
  heart1.visible = true;
  heart2.visible = true;
  heart3.visible = true;
   ok.visible = false;
   click.visible = false;
   great.visible = false;
   well.visible = false;
   nextTime.visible = false;
   play.destroy();
   start.destroy();
  //displaying score
  textSize(20);
  fill(255)
  text("Distance: "+ score, -150,cycle.y-250);
  fill("yellow")
  text("Coins: "+ coins, -150,cycle.y-220);
  camera.x = cycle.x;
  camera.y = cycle.y;
 
   cycle.setCollider("rectangle",0,50,114,25);
  cycle.debug = false;
  
  
    gameOver.visible = false;
    
    cycle.visible = true;
    ground.visible=true;
    ground.velocityX = -(3 + 3* score/150)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    cycle.velocityX =0;
  
    if(keyDown("UP_ARROW")&& cycle.y >= 250) {
      cycle.y = cycle.y-20;
     invisibleGround.y+= -20;
     cycle.scale = cycle.scale-0.05
  }
  if(keyDown("DOWN_ARROW")&& cycle.y <= 500) {
    cycle.y = cycle.y+20;
   invisibleGround.y+= +20;
   cycle.scale = cycle.scale+0.05
}
    //add gravity
    cycle.velocityY = cycle.velocityY + 0.8
  
    //spawn the clouds
    spawnCoins();
    if(coinGroup.isTouching(cycle)){
      coinGroup.destroyEach();
     coins = coins+1;
  }
  
    //spawn obstacles on the ground
    spawnObstacles();

    if(coins === 30){
       gameState ="Win"
        
        }
    if(obstaclesGroup.isTouching(cycle)){
        life = life-1;     
        if(life === 2){
          heart1.destroy();
          gameState = "End"
          textSize(20)
        fill("yellow")
       text("Your 1 Life Is Gone",150,cycle.y-250)
        }
        if(life === 1){
          heart2.destroy();
         text("1 More Life",150,cycle.y-255)
         gameState = "End";
        }
        if(life===0){
          heart3.destroy();
          gameState = "Over"
        }
        
    }
  }
  
   else if (gameState === "End") {
      gameOver.visible = false;
     
      click.visible = false;
       ok.visible = true;
       ok.y = cycle.y-230;
        great.visible = false;
       well.visible = false;
       nextTime.visible = false;
     //change the trex animation
      cycle.changeAnimation("collided", cycle_collided);

      ground.velocityX = 0;
      cycle.velocityY = 0;
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     coinGroup.setVelocityXEach(0); 
     
     if(mousePressedOver(ok)) {
      reset();
     }
     
   }
   if(gameState =="Win"){
      background(winImg);
          cycle.changeAnimation("collided", cycle_collided);

          ground.velocityX = 0;
          cycle.velocityY = 0;
          
        
          //set lifetime of the game objects so that they are never destroyed
        obstaclesGroup.setLifetimeEach(-1);
        coinGroup.setLifetimeEach(-1);
         
         obstaclesGroup.setVelocityXEach(0);
         coinGroup.setVelocityXEach(0); 
         
          cycle.visible = false;
          
          gameOver.visible = false;
          ground.visible=false;
          ok.visible = false;
          click.visible = false;
          nextTime.visible = false;
          obstaclesGroup.destroyEach();
          coinGroup.destroyEach();
         
        }
   
  if(gameState === "Over"){
    background(1)
 //change the trex animation
    cycle.changeAnimation("collided", cycle_collided);

    ground.velocityX = 0;
    cycle.velocityY = 0;
    
  
    //set lifetime of the game objects so that they are never destroyed
  obstaclesGroup.setLifetimeEach(-1);
  coinGroup.setLifetimeEach(-1);
 obstaclesGroup.setVelocityXEach(0);
   coinGroup.setVelocityXEach(0); 
   
    cycle.visible = false;
    gameOver.visible = false;
    ground.visible=false;
    ok.visible = false;
    click.visible = false;
    obstaclesGroup.destroyEach();
    coinGroup.destroyEach();


    if(coins>-1 & coins<10){
    nextTime.visible = true;
    gameOver.visible = true;
  
     textSize(12)
     fill("yellow")
     text("Coins Collected :  "+ coins, -150,220);
    }
   
  if(coins>9 & coins<20){
    well.visible = true;
    gameOver.visible = true;
  
     textSize(12)
     fill("yellow")
     text("Coins: Collected : "+ coins, -150,220);
    }
    if(coins>19 & coins<30){
      great.visible = true;
      gameOver.visible = true;

      textSize(12)
      fill("yellow")
      text("Coins Collected :"+ coins, -150,120);
      }
     
    }
  
  //stop trex from falling down
  cycle.collide(invisibleGround);
  
  


  drawSprites();
}

function reset(){
  gameState = "Play";
  
  gameOver.visible = false;
 
  start.visible = false;

  obstaclesGroup.destroyEach();
  coinGroup.destroyEach();
  
  cycle.changeAnimation("running",cycling);

  
}

function spawnObstacles(){
 
  if (frameCount % 90 === 0) {
    var cone = createSprite(760,120,40,10);
    cone.y = Math.round(random(280,550));
    cone.addImage(coneImg);
     //assign scale and lifetime to the obstacle           
    cone.scale = 0.46
    cone.lifetime = 300;
    if(cone.y>280  && cone.y <320 ){
      cone.scale = 0.25
    }
    if(cone.y>320  && cone.y <380 ){
      cone.scale = 0.32
    }
    if(cone.y>380  && cone.y <480 ){
      cone.scale = 0.39
    }
   
    
    //add each obstacle to the group
     obstaclesGroup.add(cone);
    cone.velocityX = -(3 + 3* score/150)
    cycle.depth= cone.depth;
    cone.depth= cone.depth+1;   
    cone.setCollider("rectangle",0,65,155,40);
    cone.debug = false;
  }
   

}


function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var coin = createSprite(760,120,40,10);
    coin.y = Math.round(random(280,550));
    coin.addAnimation("coin",coinImage);
    coin.scale = 0.2;
    coin.velocityX = -(3 + 3* score/150)
    cycle.depth= coin.depth;
    coin.depth= coin.depth+1;
     //assign lifetime to the variable
    coin.lifetime = 300;   
    coin.setCollider("circle",0,0,170);
    coin.debug = false;
    
    //add each cloud to the group
    coinGroup.add(coin);
  }
}

