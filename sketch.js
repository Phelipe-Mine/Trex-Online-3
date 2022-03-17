var trex, trex_running, edges;
var groundImage,terra,solo ;
var nuvem,ceu
var planta,cacto1,cacto2,cacto3,cacto4,cacto5,cacto6;
var pontos = 0
var grupodecactos,grupodenuvem
var modolo = "play"
var trexmorreu
var gameover,gameoverimagem
var reset,resetimagem
var som1,som2,som3



function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexmorreu = loadImage ("trex_collided.png");
  groundImage = loadImage("ground2.png");
nuvem = loadImage ("cloud.png");
cacto1 = loadImage ("obstacle1.png");
cacto2 = loadImage ("obstacle2.png");
cacto3 = loadImage ("obstacle3.png");
cacto4 = loadImage ("obstacle4.png");
cacto5 = loadImage ("obstacle5.png");
cacto6 = loadImage ("obstacle6.png");
gameoverimagem = loadImage ("gameOver.png")
resetimagem = loadImage ("restart.png")
som1 = loadSound ("checkpoint.mp3")
som2 = loadSound ("die.mp3")
som3 = loadSound ("jump.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
 
  terra = createSprite (width,height-20)
  terra.addImage (groundImage)
  //criando o trex
  trex = createSprite(50,height-30,20,50);
  trex.addAnimation("running", trex_running);
  trex.addImage ("morreu",trexmorreu)
  edges = createEdgeSprites();
  
  reset = createSprite (width/2,height/2+30)
  reset.addImage (resetimagem)
  reset.scale = 0.6
  reset.visible = false

  gameover = createSprite (width/2,height/2-60)
  gameover.addImage (gameoverimagem)
  gameover.visible = false

  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  solo = createSprite (width/2,height-10,width,10)
  solo.visible = false
   grupodecactos  = new Group ()
   grupodenuvem  = new Group ()
    trex.debug = false
    //trex.setCollider ("circle",0,1,40)
    trex.setCollider ("rectangle",3,7,25,60,0)
   // trex.setCollider ("rectangle",3,7,250,60,0)
  }


function draw(){
  //definir a cor do plano de fundo 
  background("white");
  text ("pontos"+pontos,500,10)
    if (pontos > 0 && pontos% 100 === 0 ) {
      som1.play ()
    }
  
  if (modolo === "play") {
    pontos = pontos+ Math.round(getFrameRate()/60 )
    terra.velocityX = -(8+pontos /100)
    if (terra.x <0 ){
      terra.x = terra.width/2;
    }
    if(touches.length>0||keyDown("space") && trex.y >height-40){
      trex.velocityY = -10;
      som3.play ()
      touches = []
    }
    trex.velocityY = trex.velocityY + 0.5;
    infinito ()
    cacto ();
    
    if (trex.isTouching(grupodecactos)) {
      modolo = "game over"
      som2.play ()
    // trex.velocityY = -12
    // som3.play ()
    }
  } else if (modolo === "game over") {
    terra.velocityX  = 0
    grupodecactos.setVelocityXEach(0)
    grupodenuvem.setVelocityXEach(0)
    trex.changeAnimation ("morreu",trexmorreu)
    trex.velocityY = 0
    grupodecactos.setLifetimeEach (-1)
    grupodenuvem.setLifetimeEach (-1)
  reset.visible = true
  gameover.visible = true
  
  if (touches.length>0||mousePressedOver(reset)) {
    volta ()
    touches = []
  }
  }
  
  
 //impedir que o trex caia
  trex.collide(solo)
  drawSprites();

}
function infinito (){
  if (frameCount%60 === 0){
    ceu = createSprite (width+30,200)
  ceu.addImage (nuvem)
  ceu.velocityX = -7
  ceu.y = Math.round (random(10,height+10))
  ceu.depth = trex.depth
  ceu.depth = reset.depth
  ceu.depth = gameover.depth
  trex.depth = trex.depth +1
  reset.depth = reset.depth +1
  gameover.depth = gameover.depth +1
  ceu.lifetime = 600
  grupodenuvem.add (ceu);
  
}
 
}
function cacto (){
  if (frameCount%60 === 0){
    planta = createSprite (width+30,height-45)
    planta.velocityX = -(9+pontos /100)
    planta.scale = 0.7 
    planta.lifetime = 600 
    planta.depth = trex.depth
    trex.depth = trex.depth +1
    grupodecactos.add (planta);
    var dado = Math.round (random(1,6))
    switch (dado) {
      case 1: planta.addImage (cacto1);
        break;
      case 2: planta.addImage (cacto2);
      break;
      case 3: planta.addImage (cacto3);
      break;
      case 4: planta.addImage (cacto4);
      break;
      case 5: planta.addImage (cacto5);
      break;
      case 6: planta.addImage (cacto6);
      break;
      default:
        break;
    }
  }
}
  
function volta (){
  modolo = "play";
  grupodecactos.destroyEach ();
  grupodenuvem.destroyEach ();
  reset.visible = false;
  gameover.visible = false;
  pontos = 0;
  trex.changeAnimation("running", trex_running);
}
