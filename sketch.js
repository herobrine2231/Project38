var canvas;
var background;
var runner1, runner2;

var jungleImage, bananaImage;
var jungleSprite, bananaSprite;
var monkeyImage;
var obstacleImage;
var floor1;
var monkeyPlayer;
var obstacleSprite;
var obstacleGroup;
var food, foodGroup;
var score=0;

var gameOver, gameRestart;
var PLAY=1;
var END=0;
var  gameState=PLAY;
var gameOverImg, gameRestartImg;

function preload()
{
  jungleImage=loadImage("images/jungle.jpg");
  bananaImage=loadImage("images/banana.png");
  moneky_running_image= loadAnimation("images/Monkey_01.png", 
  "images/Monkey_02.png", "images/Monkey_03.png", "images/Monkey_04.png", 
  "images/Monkey_05.png", "images/Monkey_06.png", "images/Monkey_07.png",
  "images/Monkey_08.png", "images/Monkey_09.png", "images/Monkey_10.png"
  );
  monkeyImage=loadImage("images/Monkey_01.png");

  obstacleImage=loadImage("images/stone.png");

  gameOverImg=loadImage("images/gameOver.jpg");
  gameRestartImg=loadImage("images/gameRestart.jpg");
}
function setup()
{
    canvas= createCanvas(displayWidth, displayHeight);
    jungleSprite=createSprite(displayWidth ,displayHeight,displayWidth,2);
    jungleSprite.addImage(jungleImage);
    jungleSprite.x=width/2;
    jungleSprite.velocityX=-2;

    floor1=createSprite(displayWidth/2,height,displayWidth,10);
    //  floor1.visible=false;

    monkeyPlayer=createSprite(100,height-70,20,50);
    monkeyPlayer.addAnimation("monkey", moneky_running_image);
    monkeyPlayer.scale=0.1;

    foodGroup= new Group();
    obstacleGroup= new Group();

    gameOver= createSprite(width/2,height/2-50);
    gameOver.addImage(gameOverImg);

    gameRestart=createSprite(width/2,height/2);
    gameRestart.addImage(gameRestartImg);

    gameOver.scale=0.5;
    gameRestart.scale=0.1;
 
    gameOver.visible=false;
    gameRestart.visible=false;

    
    score=0;


   
}

function draw()
{
  //  background("red");

  spawnFood();
  stroke("white");
  textSize(20);
  fill("black");
  text("Score: " +score, 30,350);

  if(gameState===PLAY)
  {
    if(keyDown("SPACE") )
    {
      monkeyPlayer.velocityY=-10;
      //touches= [];
    }
    monkeyPlayer.velocityY=monkeyPlayer.velocityY+2;
    monkeyPlayer.collide(floor1);
  spawnObstacles();
 // spawnFood();
 

 if(foodGroup.isTouching(monkeyPlayer))
    {
      score= score+2
      food.remove();
    }

  if(jungleSprite.x<0)
    {      
      jungleSprite.x=jungleSprite.width/2;
    }

    
      console.log(score);
    if(obstacleGroup.isTouching(monkeyPlayer))
    {
      monkeyPlayer.scale=0.1;
      gameState=END;
    // gameOver.visible=true;
    }

    switch(score)
    {
      case 10:
          monkeyPlayer.scale=0.14;
          break;
        case 20:
            monkeyPlayer.scale=0.18;
            break;
        case 30:
            monkeyPlayer.scale=0.22;
            break;
        case 40:
            monkeyPlayer.scale=0.26;
            break;
        default: break;
    }
  }

  else if(gameState===END)
  {
   gameOver.visible=true;
  
    monkeyPlayer.velocityX=0;
  jungleSprite.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);

    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    monkeyPlayer.destroy();
    
  }
    
    drawSprites();
    
}







function spawnObstacles()
{
  if(frameCount % 80 === 0)
  {
    obstacleSprite= createSprite(300, height-95, 20,30);
    obstacleSprite.y= Math.round(random(height,height-20));
    obstacleSprite.addImage(obstacleImage);
    obstacleSprite.scale=0.05;
   obstacleSprite.velocityX=-3;
    
    obstacleSprite.lifetime=200;
    obstacleGroup.add(obstacleSprite);
  }
}

function spawnFood()
{
  if (frameCount % 60 === 0)
  {
     food=createSprite(300 ,height-100,20,10);
     food.y=Math.round(random(height-50,height-100));
    food.addImage(bananaImage);
    food.scale=0.05;
    food.velocityX=-3;

    food.lifetime=100;
    foodGroup.add(food);
  }
}
