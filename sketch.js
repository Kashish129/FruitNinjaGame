//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage ,fruit1,fruit2,fruit3,fruit4,monsterImg,endImg;
var fruitGroup,monsterGroup;
var knifeS,gameOverS;


function preload(){
  
  knifeImage = loadImage("knife.png");
  fruit1= loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  knifeS=loadSound ("knifeSwoosh.mp3");
  monsterImg=loadAnimation("alien1.png","alien2.png")
  gameOverS=loadSound ("gameover.mp3");
  endImg=loadImage("gameover.png");
}



function setup() {
  createCanvas(600,600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
  
  fruitGroup=new Group();
  monsterGroup=new Group();
}

function draw() {
  background("lightblue");
  
  

  
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if knife touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
       knifeS.play();
      
      score=score+3;
    }
   
    fruits();
  monsters();
    
    // Go to end state if knife touching enemy
    if(monsterGroup.isTouching(knife)){
      gameState=END;
      monsterGroup.destroyEach();
      gameOverS.play();
    }
      
  }else if(gameState===END)
  {
   knife.scale=1.7;
    knife.x=300;
    knife.y=300;
    knife.addImage(endImg);
    fruitGroup.destroyEach();
   monsterGroup.destroyEach();
   
  }
  


  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}

function monsters(){
  if(World.frameCount%80===0){
  monster=createSprite(400,200,20,20);
  //monster.scale=0.3;
  monster.addAnimation("monster",monsterImg)
  //fruit.debug=true
  monster.y=Math.round(random(50,340));
  
  
  monster.velocityX=-7;
  monster.setLifetime=100;
  
 monsterGroup.add(monster);
    
    position=Math.round(random(1,2));
    if(position===1){
      monster.X=600;
    }else{
      monster.X=200;
    }
    monster.velocityX=-(8+(score/10));
  }
}
function fruits(){
  if(World.frameCount%80===0){
   fruit=createSprite(400,200,20,20); 
   fruit.scale=0.3;
   //fruit.debug=true;
   r=Math.round(random(1,4));
   if(r===1){
      fruit.addImage("fruit",fruit1);
   }else if(r===2){
      fruit.addImage("fruit",fruit2);
   }else if(r===3){
      fruit.addImage("fruit",fruit3);
   }else{
     fruit.addImage("fruit",fruit4);
  }
    
    fruit.y=Math.round(random(50,340));
  
  fruit.velocityX=-7;
 fruit.setLifetime=100;
  
 fruitGroup.add(fruit);
    
    position=Math.round(random(1,2));
    if(position===1){
      fruit.X=600;
    }else{
      fruit.X=200;
    }
    fruit.velocityX=-(8+(score/4));
  }
  
 
  
  
}


  

  

