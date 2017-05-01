var stage;
var shapes = [];
var slots = [];
var score = 0;

function init() {
    stage = new createjs.Stage("canvas");
    buildShapes();
    setShapes();
    startGame();
}
function buildShapes() {
    var colors = ['blue', 'red', 'green', 'yellow'];
    var i, shape, slot;
    for (i = 0; i < 3; i++) {
        //slots
        if (i !=2 && i !=1) {
        slot = new createjs.Shape();
        slot.graphics.beginStroke(colors[i]);
        slot.graphics.beginFill(createjs.Graphics.getRGB(255, 255, 255, 1));
        slot.graphics.drawRect(0, 0, 100, 100);
        slot.regX = slot.regY = 50;
        slot.key = i;
        slot.y = 80;
        slot.x = (i * 130) + 100;
        stage.addChild(slot);
        slots.push(slot);
      }

        ///CIRCLE
        var circle = new createjs.Shape();
        circle.graphics.beginStroke(colors[2]);
        circle.graphics.beginFill(createjs.Graphics.getRGB(255, 255, 255, 1));
        circle.graphics.drawCircle(0, 0, 50);
        circle.x = 365;
        circle.y = 80;
        slot.key = i;
        //slot.y = 80;
        //slot.x = (i * 130) + 100
        stage.addChild(circle);
        slots.push(slot);


        //TRIANGLE
        var tri = new createjs.Shape();
        tri.graphics.beginStroke('red');
        tri.graphics.beginFill(createjs.Graphics.getRGB(255, 255, 255, 1));
        tri.graphics.moveTo(50, 0)
                .lineTo(0, 100)
                .lineTo(100, 100)
                .lineTo(50, 0);
        tri.x = 200;
        tri.y = 30;
        stage.addChild(tri);


      //shapes
      //if(i !=2)
      if(i !=2 && i !=1) {
        shape = new createjs.Shape();
        shape.graphics.beginFill(colors[i]);
        shape.graphics.drawRect(0, 0, 100, 100);
        shape.regX = shape.regY = 50;
        shape.key = i;
        shapes.push(shape);
      }

        else if(i !=0 && i !=2) {
        var tri = new createjs.Shape();
        //tri.graphics.beginStroke('red');
        tri.graphics.beginFill('red');
        tri.graphics.moveTo(50, 0)
                .lineTo(0, 100)
                .lineTo(100, 100)
                .lineTo(50, 0);
        //tri.x = 80;
        //tri.y = (1 * 130) + 100;;
        tri.key = 1;
        shapes.push(tri);

      }

      else {

      var circlef = new createjs.Shape();
      //circlef.graphics.beginStroke(colors[2]);
      circlef.graphics.beginFill('green');
      circlef.graphics.drawCircle(0, 0, 50);
      circlef.x = 80;
      circlef.y = (2 * 130) + 100;
      circlef.key = 2;
      shapes.push(circlef); }

}

}
function setShapes() {
    var i, r, shape;
    var l = shapes.length;
    for (i = 0; i < l; i++) {
        r = Math.floor(Math.random() * shapes.length);
        shape = shapes[r];
        shape.homeY = 320;
        shape.homeX = (i * 130) + 100;
        shape.y = shape.homeY;
        shape.x = shape.homeX;
        shape.addEventListener("mousedown", startDrag);
        stage.addChild(shape);
        shapes.splice(r, 1);
    }
}
function startGame() {
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function (e) {
        stage.update();
    });
}
function startDrag(e) {
    var shape = e.target;
    var slot = slots[shape.key];
    stage.setChildIndex(shape, stage.getNumChildren() - 1);
    stage.addEventListener('stagemousemove', function (e) {
        shape.x = e.stageX;
        shape.y = e.stageY;
    });
    stage.addEventListener('stagemouseup', function (e) {
        stage.removeAllEventListeners();
        var pt = slot.globalToLocal(stage.mouseX, stage.mouseY);
        if (slot.hitTest(pt.x, pt.y)) {
            shape.removeEventListener("mousedown",startDrag);
            score++;
            createjs.Tween.get(shape).to({x:slot.x, y:slot.y}, 200, createjs.Ease.quadOut).call(checkGame);
            console.log('h');
        }
        else {
            createjs.Tween.get(shape).to({x:shape.homeX, y:shape.homeY}, 200, createjs.Ease.quadOut);
        }
    });
}
function checkGame(){
    if(score == 4){
        alert('You Win!');
    }
}
