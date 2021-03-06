/**********************************************
 * Home Work - Task2:
 * Due: March 7th, before class
 *
 * Add graphical representation of the hanged man:
 * . increase the width of the stage to accomodate the drawing of the hanged man
 * . after each loss of live add an additional feature
 * . lives=5 => draw the platform
 * . lives=4 => draw the rope
 * . lives=3 => draw the head
 * . lives=2 => draw the torso
 * . lives=1 => draw the hands
 * . lives=0 => draw the feet, wait 3 seconds, show game over message
 *********************************************/


var stage, livesTxt, gameOverTxt, win;
var answer = "CREATEJS IS&AWESOME"
var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lives = 5;
var lettersNeeded = 0;


function init() {
    stage = new createjs.Stage("canvas");
    drawBoard();
    drawLetters();
    drawMessages();
    startGame();
}

function drawBoard() {
    var i, char, box;
    var xPos = 20;
    var yPos = 90;
    for (i = 0; i < answer.length; i++) {
        char = answer[i];
        if (char != ' ' && char != '&') {
            lettersNeeded++;
            box = new createjs.Shape();
            box.graphics.beginStroke("#000");
            box.graphics.drawRect(0, 0, 20, 24);
            box.regX = 10;
            box.regY = 12;
            box.x = xPos;
            box.y = yPos;
            box.name = 'box_' + i;
            box.key = char;
            stage.addChild(box);
        }
        xPos += 26;
        if (char == '&') {
            yPos += 40;
            xPos = 20;
        }

    }
}

function drawLetters() {
    var i, char, txt, btn;
    var cnt = 0;
    var xPos = 20;
    var yPos = 200;
    for (i = 0; i < abc.length; i++) {
        char = abc[i];
        btn = new createjs.Shape();
        btn.graphics.beginFill("#000");
        btn.graphics.beginStroke("#000");
        btn.graphics.drawRect(0, 0, 20, 24);
        btn.regX = 10;
        btn.regY = 12;
        btn.x = xPos;
        btn.y = yPos;
        stage.addChild(btn);
        //create text
        txt = new createjs.Text(char);
        txt.color = "#FFF";
        txt.textAlign = 'center';
        txt.textBaseline = 'middle';
        txt.x = xPos;
        txt.y = yPos;
        stage.addChild(txt);
        btn.txt = txt;
        btn.addEventListener('click', onLetterClick);
        //adjust positions
        xPos += 24;
        cnt++;
        if (cnt == 13) {
            yPos += 30;
            xPos = 20;
        }
    }
}

function drawMessages() {
    var txt = new createjs.Text("WORD GAME", "26px Arial");
    txt.color = '#990000';
    txt.x = txt.y = 10;
    stage.addChild(txt);
    livesTxt = new createjs.Text("LIVES: " + lives, "16px Arial");
    livesTxt.textAlign = 'right';
    livesTxt.y = 16;
    livesTxt.x = stage.canvas.width - 10;
    stage.addChild(livesTxt);
}

function onLetterClick(e) {
    var btn = e.target;
    var txt = btn.txt;
    btn.removeEventListener('click', onLetterClick);
    checkForMatches(txt);
    checkGame();
}

function checkForMatches(txt) {
    var letter = txt.text
    var i, char, box, newTxt;
    var match = false;
    for (i = 0; i < answer.length; i++) {
        char = answer[i];
        if (char == ' ' || char == '&') {
            continue;
        }
        box = stage.getChildByName('box_' + i);
        if (box.key == letter) {
            lettersNeeded--;
            match = true;
            newTxt = txt.clone();
            newTxt.color = "#000";
            newTxt.x = box.x;
            newTxt.y = box.y;
            stage.addChild(newTxt);
        }
    }
    stage.removeChild(txt);
    if (!match) {
        lives--;
        livesTxt.text = "LIVES: " + lives;
        hangMan();
    }
}

function checkGame() {
    if (lettersNeeded == 0) {
        win = true;
        gameOver();
    } else if (lives == 0) {
        win = false;
        gameOver();

    }
}

function gameOver() {
    stage.removeAllChildren();
    var msg = win ? "YOU WIN!" : "YOU LOSE";
    gameOverTxt = new createjs.Text(msg, "36px Arial");
    gameOverTxt.color = win ? 'blue' : 'red';
    gameOverTxt.textAlign = 'center';
    gameOverTxt.textBaseline = 'middle';
    gameOverTxt.x = stage.canvas.width / 2;
    gameOverTxt.y = stage.canvas.height / 2;
    stage.addChild(gameOverTxt);
}

function hangMan(){

  if (lives == 4) {

    ///draw platform
    var roundedRectangle = new createjs.Shape();
    roundedRectangle.graphics.beginStroke('#000');
    roundedRectangle.graphics.beginFill('black');
    roundedRectangle.graphics.drawRoundRect(0,0,300,50,10);
    roundedRectangle.x = 100;
    roundedRectangle.y = 500;
    stage.addChild(roundedRectangle);
  }

  if (lives == 3){

    //draw rope
    var tri = new createjs.Shape();
    tri.graphics.beginStroke('#000');
    tri.graphics.beginFill('black');
    tri.graphics.moveTo(50, 0).lineTo(50, 200);
    tri.graphics.moveTo(50, 0).lineTo(100, 20);
            //.lineTo(200, 100);
            //.lineTo(100, 100);
            //.lineTo(50, 0);
    tri.x = 100;
    tri.y = 300;
    stage.addChild(tri);

  }

  if (lives == 2) {

    //draw head
    var circle = new createjs.Shape();
    circle.graphics.beginStroke('black');
    circle.graphics.beginFill('white');
    circle.graphics.drawCircle(0, 0, 10);
    circle.x = 200;
    circle.y = 325;
    stage.addChild(circle);
  }

  if (lives == 1) {

    // draw body
    var tri = new createjs.Shape();
    tri.graphics.beginStroke('#000');
    tri.graphics.beginFill('black');
    //tri.graphics.moveTo(100, 30).lineTo(0, 100); //works
    tri.graphics.moveTo(200, 32).lineTo(200, 100);

    tri.x = 1;
    tri.y = 300;
    stage.addChild(tri);


  }

/*

  if (lives == 0) {

      //draw feet
      // end game


      var tri = new createjs.Shape();
      tri.graphics.beginStroke('#000');
      tri.graphics.beginFill('black');

    tri.graphics.moveTo(300, 45).lineTo(200, 20);  //work

    //tri.graphics.moveTo(300, 32).lineTo(300, 10);
      //tri.graphics.moveTo(30, -50).lineTo(50, 0);
      //tri.x = 100;
      tri.y = 370;
      stage.addChild(tri);

  } */




}

function startGame() {
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function(e) {
        stage.update();
    });
}
