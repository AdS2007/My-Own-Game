var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieImg,zombieGroup
var bullet,bulletImg,bulletGroup
var bullets = 50
var explosionSound
var loseSound
var winSound
var score = 0

var gameState ="fight"
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
zombieImg= loadImage("assets/zombie.png");
  bgImg = loadImage("assets/bg.jpeg")
  bulletImg = loadImage("assets/Bullet.png")
  explosionSound = loadSound("assets/explosion.mp3")
  loseSound = loadSound("assets/lose.mp3")
  winSound = loadSound("assets/win.mp3")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);
 
  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   zombieGroup= new Group();
   bulletGroup= new Group();
   

}

function draw() {
  background(0); 
  
 

//if(gameState==='start'){
  //textSize(24)
  //fill("white")
  ////text("press f to start the game",width/2-200,height/2)
  //player.visible =false;
  ////console.log("this 1 is working")

//}



if(gameState ==="fight")
{
console.log("fight is working")
//movin the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  
  player.addImage(shooter_shooting)
  bullet = createSprite(displayWidth -1150, player.y -30, 20, 10)
  bullet.addImage(bulletImg)
  bullet.scale = 0.1
  bullet.velocityX = 30
  bulletGroup.add(bullet)
  bullets = bullets -1
  explosionSound.play();
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      
   if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
        score=score +5;
        winSound.play()
       
        } 
  
  }
}
enemy()
if(zombieGroup.isTouching(player)){
  gameState="end"
loseSound.play()
}

}



drawSprites();
if(gameState==='end'){
  //background(0);
  zombieGroup.destroyEach();
  player.visible=false
  fill("white")
  textSize(20)
  text("You Loss",width/2,height/2)
}
fill("yellow")
textSize(20)
 text("Score: "+score, width-200,30) 

}

function enemy(){
  if(frameCount%200 ===0){
    zombie = createSprite(width+100,random(300,700))
    zombie.addImage(zombieImg)
    zombie.scale=0.2;
    zombie.velocityX=-10
    zombie.lifetime=500
    zombieGroup.add(zombie)
  }
}