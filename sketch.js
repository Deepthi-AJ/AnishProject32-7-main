/*
 *
 * This code perform object creation and do actions listed below:
 * --------------------------------------------------------------
 * 
 * action : If space key is pressed then dart board and shuriken re-loaded.
 * action : click around Shuriken and drag mouse to throw shuriken.
 * 
 */
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var totalCh = 3;
var balanceCh = totalCh;
var playerState = "onSling";
var score = 0;
var level = 1;
var gamerState = 0;
var myColor = "blue";
var readyForFly = false;
var isLaunched = false;

// Displaying the score
scoreDis = [];

// Displaying the level
lvlDis = [];

// Displaying the total score
totalDis = [];


var scorestatus = 0, hitstatus = 0;


function preload() {
}

/*
 * create engine to run
 * create canvas to put objects
 * create objects - ground, shuriken, ninja, platforms, dartboard
 */
function setup(){
    // Create a canvas with x = 1530, y = 715
    var canvas = createCanvas(1530,715); 
    engine = Engine.create();
    world = engine.world;

    //Creating the objects
    ground = new Ground(765,height,1530,20);
    shuriken = new Shuriken(200,50);
    ninjaPlatform = new Ground(250, 270, 100, 240);
    horizPlatform = new Ground(900,130,140,10);
    verticPlatform = new Ground(980,120,10,100);
    dartBoard = new DartBoard(900,100);
    ninja = new Ninja(shuriken.body,{x:200, y:50}, 200, 10);
}

function draw(){
    
    // Background is black (To show night background)
    background(0); 

    //Checking the gamerState in the console
    console.log(gamerState);

    //Updating the engine in draw
    Engine.update(engine);

    //Big text
    textSize(40);

    //Text for score and level
    text("score = " + score, 1000,50); 
    text("level = " + level, 1250,50);
 
    fill("yellow")
    text("Press space for ", 1010, 100);
    text("another chance!", 1205, 150)

    // If level is 2 then object's positions are changed
    // for ninja, ninja platform, shuriken
    if(level === 2){     
        // ninja.changePosition(300,470,{x:300, y:100});
        // ninjaPlatform.changeGrPosition(300,500);
        //shuriken = new Shuriken(150,100);   
    }

    //Displaying the objects
    ninja.display();    

    ground.display();

    ninjaPlatform.display();
    horizPlatform.display();
    verticPlatform.display();

    dartBoard.display();
    dartBoard.score();    

    shuriken.display();
}

// Ma'am I tried to stop the shuriken from moving while dragged anywhere.
// I wanted it to move only if I dragged it near the ninja.
//When dragged the x and y is changed to mouseX and mouseY

function mouseDragged(){
    if ( (mouseX >= 0 && mouseX <= 250 && mouseY >= 0 && mouseY <= 100 && readyForFly === false) || (isLaunched === true) ) {
        Matter.Body.setPosition(shuriken.body, {x: mouseX , y: mouseY}); 
        readyForFly = true;
    }
}

function mouseReleased(){
    //If mouse is released and readyForFly is true then ninja.fly(function to release shuriken) is executed
    if (readyForFly === true) {
        ninja.fly(); // In Ninja.js 
        playerState = "launched";
        isLaunched = true;
    }
}

/*
 * If the space key (32) is pressed then:
 * -----------------------------------
 * Shuriken moves to its original place and gets attached to the ninja
 * Dartboard re-appears in its place(If hit) or stays where it is
 * 
 */
function keyPressed(){
    // if score status is increased to 1
    if(scorestatus===1 || hitstatus === 0){

        // if space key is pressed
        if(keyCode === 32 ){
            shuriken.trajectory = [];
            Matter.Body.setPosition(shuriken.body, {x:  200, y: 50});
           
            ninja.attach(shuriken.body);
            gamerState = gamerState + 1;
         
        }

        // If gamerState is multiples of 3, then level is changed
        if(gamerState === 3 || gamerState === 7 || gamerState === 10 || gamerState === 13){
            level = level + 1;
            init=1
        }

        if ( hitstatus === 1){
            // dartboard create one more when it disappears
            dartBoard = new DartBoard(900,100);
            hitstatus = 0;
        }

        scorestatus = 0;
     } //else if ( hitstatus === 1){
            // dartboard create one more when it disappears
            // dartBoard = new DartBoard(900,100);
            // hitstatus = 0;
    // }
    if(level === 2 && init===1){   
        if(init===1){   

            ninja.changePosition(290,300);
            ninja = new Ninja(shuriken.body,{x:300, y:300}, 275,280);
            Matter.Body.setPosition(shuriken.body, {x: 300 , y: 100}); 

            ninjaPlatform.changeGrPosition(300,500);
            init=0;
            readyForFly=false
        }else {
            Matter.Body.setPosition(shuriken.body, {x: 300 , y: 100}); 
        }
    }
}