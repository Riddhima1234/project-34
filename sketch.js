const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  empty1 = loadAnimation('empty.png');
  emptystar1 = loadAnimation('one_star.png');
  emptystar2 = loadAnimation('stars.png');
  coin11 = loadAnimation('fillcoin1.png');
  coin22 = loadAnimation('fillcoin2.png');
  coin33 = loadAnimation('fillcoin3.png');
  board11 = loadAnimation('board1.png');
  
  
  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  star1 = loadImage("star.png");
  coinA = loadAnimation("coin22.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  createCanvas(600,700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(100,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(460,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);

   //coin 1
   coin1 = createImg("coin22.png");
   coin1.position(300,600);
   coin1.size(35,35);

   //coin 2
   coin2 = createImg("coin22.png");
   coin2.position(400,600);
   coin2.size(35,35);

   //coin 3
   coin3 = createImg("coin22.png");
   coin3.position(500,600);
   coin3.size(35,35);


  rope = new Rope(7,{x:120,y:90});
  rope2 = new Rope(7,{x:490,y:90});


  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(300,height,width,20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(200,height-80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  starA = createSprite(320,30,20,20);
  starA.addImage(star1);
  starA.scale = 0.02;

  starB = createSprite(70,350,20,20);
  starB.addImage(star1);
  starB.scale = 0.02;

  Blower = createImg("baloon2.png");
  Blower.position(260,370,);
  Blower.size(120,120);
  Blower.mouseClicked(airblow);

  star3 = createSprite(60,10,30,30);
  star3.scale = 0.2;
  star3.addAnimation("empty",empty1);
  star3.addAnimation("one",emptystar1);
  star3.addAnimation("two",emptystar2);
  star3.changeAnimation("empty");

  board1 = createSprite(100,10,30,30);
  board1.scale = 0.2;
  board1.addAnimation("board",board1);
  board1.addAnimation("coinA",coin11);
  board1.addAnimation("coinB",coin22);
  board1.addAnimation("coinC",coin33);
  board.changeAnimation("board");

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(keyDown("LEFT_ARROW")){
    bunny.x = bunny.x-2;
  }

  if(keyDown("RIGHT_ARROW")){
    bunny.x = bunny.x+2;
  }


  if(collide(fruit,bunny,80)==true)
  {
    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(collide(fruit,starA,20)==true){
    starA.visible = false;
    star3.changeAnimation("one");
  }

  if(collide(fruit,starB,20)==true){
    starB.visible = false;
    star3.changeAnimation("two");
  }

  if(collide(bunny,coin1,30)==true){
    coin1.visible = false;
    point1.changeAnimation("coin11");
  }

  if(collide(bunny,coin2,30)==true){
    coin2.visible = false;
    point2.changeAnimation("coin22");
  }

  if(collide(bunny,coin3,30)==true){
    coin3.visible = false;
    point3.changeAnimation("coin33");
  }



  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
   }
  
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function airblow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.03})
   air.play();
}










