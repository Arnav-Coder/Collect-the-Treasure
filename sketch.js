var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var endImg;

//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");

}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

boy.setCollider("circle",0,0,900);

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
  if(gameState == PLAY){
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
  }  

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      treasureCollection = treasureCollection + 100;
      diamondsG.destroyEach();
    }
      else if(jwelleryG.isTouching(boy)) {
      treasureCollection = treasureCollection + 150;  
      jwelleryG.destroyEach();
    }
      else if(swordGroup.isTouching(boy)) {
      gameState = END;
    }
  
  if(gameState == END){
  //Set velocityY to 0 for Cash, Diamond, Jwellery, Sword and destroy them
    cashG.setVelocityYEach(0);
    cashG.destroyEach();
    diamondsG.setVelocityYEach(0);
    diamondsG.destroyEach();
    jwelleryG.setVelocityYEach(0);
    jwelleryG.destroyEach();
    swordGroup.setVelocityYEach(0);
    swordGroup.destroyEach();

  //Destroy Player 
    boy.addAnimation("SahilRunning",endImg);
    boy.scale = 1;
    boy.x = 200;
    boy.y = 300;

  //To increase depth of GameOver  
    boy.depth = 123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890;

  }

  drawSprites();

    if(gameState == END){
    textSize(50);
    fill("Black");
    text("Treasure  ",20,400,);
    text("collected",20,450);
    text(":",220,425);
    text(" "+treasureCollection,230,425)
    }

    if(gameState == PLAY){
    textSize(20);
    fill(255);
    text("Treasure : "+ treasureCollection,250,30);
    }
  }

}

function createCash() {
  if (World.frameCount % 190 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3 + (treasureCollection/100);
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 200 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3 + (treasureCollection/100);
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 300 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3 + (treasureCollection/100);
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 400 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3 + (treasureCollection/100);
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}