var stage, queue;
var gameLevel;
var faces = ["badoo", "behance", "deviantart", "dribbble","facebook", "flickr", "google-plus","instagram", "lastfm", "linkedin", "flickr2", "pinterest", "facebook2", "soundcloud",
                "swarm", "tumblr", "twitter", "vk "];
var cards = [];
var cardsFlipped = [];
var matches = 0;
var canvas;
var menu;

function preload() {
    queue = new createjs.LoadQueue();
    queue.addEventListener("complete", init);
    queue.loadManifest([
        {id:"shell", src:"img/card.png"},
        {id:"back", src:"img/back.png"},
        {id:"badoo", src:"img/badoo.png"},
        {id:"behance", src:"img/behance.png"},
        {id:"deviantart", src:"img/deviantart.png"},
        {id:"dribbble", src:"img/dribbble.png"},
        {id:"facebook", src:"img/facebook.png"},
        {id:"flickr", src:"img/flickr.png"},
        {id:"google-plus", src:"img/google-plus.png"},
        {id:"instagram", src:"img/instagram.png"},
        {id:"lastfm", src:"img/lastfm.png"},
        {id:"linkedin", src:"img/linkedin.png"},
        {id:"facebook2", src:"img/facebook2.png"},
        {id:"pinterest", src:"img/pinterest.png"},
        {id:"flickr2", src:"img/flickr2.png"},
        {id:"soundcloud", src:"img/soundcloud.png"},
        {id:"swarm", src:"img/swarm.png"},
        {id:"tumblr", src:"img/tumblr.png"},
        {id:"twitter", src:"img/twitter.png"},
        {id:"vk", src:"img/vk.png"}
    ]);
}

function init() {
    canvas = document.getElementById('canvas');
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);

    Intro();
    startGame();
}

function Intro(){

    menu = new createjs.Container();
    menu.x = canvas.width/2 - 60;
    menu.y = 150;
    makeLevel("Easy Level", 0, 0);
    makeLevel("Medium Level", 0, 60);
    makeLevel("Hard Level", 0, 120);

    stage.addChild(menu);
}

function startGame() {

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function (e) {
        stage.update();
    });

}

function makeLevel(level, x, y){

    var bt = new createjs.Container();
    bt.x = x;
    bt.y = y;
    var text = new createjs.Text(level, "35px Arial", "black");
    text.x = 60;
    text.textAlign = 'center';
    bt.on("click", function(evt) {
        if(level == "Easy Level")
            gameLevel = 2;
        else if (level == "Medium Level")
            gameLevel = 4;
        else if (level == "Hard Level")
            gameLevel = 6;
        stage.removeChild(menu);
        buildCards();
        shuffleCards();
        dealCards();
    });
     bt.on("mouseover", function(evt) {
        text.color = 'blue';
    });
    bt.on("mouseout", function(evt) {
        text.color = 'black';
    });

    text.x = 50;
    text.y = 10;

    bt.addChild(text);
    menu.addChild(bt);
}

function buildCards() {
    var i, card, card2, bmp, label, face;

    for (i = 0; i < Math.pow(gameLevel,2)/2; i++) {
        card = new createjs.Container();
        bmp = new createjs.Bitmap(queue.getResult('shell'));
        bmp.shadow = new createjs.Shadow("#666", 3, 3, 5);
        card.regX = bmp.image.width / 2;
        card.regY = bmp.image.height / 2;
        card.addChild(bmp);

        bmp = new createjs.Bitmap(queue.getResult(faces[i]));
        bmp.regX = bmp.image.width / 2;
        bmp.regY = bmp.image.height / 2;
        bmp.x = card.regX;
        bmp.y = 70;
        card.addChild(bmp);
        label = new createjs.Text(faces[i].toUpperCase(), "15px Arial", "#009900");
        label.textAlign = 'center';
        label.x = card.regX;
        label.y = 144;
        card.addChild(label);
        bmp = new createjs.Bitmap(queue.getResult('back'));
        bmp.name = 'back';
        card.addChild(bmp);
        card2 = card.clone(true);
        card.key = card2.key = faces[i];
        cards.push(card, card2);
    }
}
function shuffleCards() {
    var i, card, randomIndex;
    var l = cards.length;
    var shuffledCards = [];
    for (i = 0; i < l; i++) {
        randomIndex = Math.floor(Math.random() * cards.length);
        shuffledCards.push(cards[randomIndex]);
        cards.splice(randomIndex, 1);
    }
    cards = cards.concat(shuffledCards);
}
function dealCards() {
    var i, card;
    var xPos = 100;
    var yPos = 200;
    var count = 0;
    for (i = 0; i < cards.length; i++) {
        card = cards[i];
        card.x = -200;
        card.y = 400;
        card.rotation = Math.random() * 600;
        card.addEventListener('click', flipCard);
        stage.addChild(card);
        createjs.Tween.get(card)
            .wait(i * 100)
            .to({x:xPos, y:yPos, rotation:0}, 300);
        xPos += 150;
        count++;
        if (count === gameLevel) {
            count = 0;
            xPos = 100;
            yPos += 220;
        }
    }
}

function flipCard(e) {
    if (cardsFlipped.length === 2) {
        return;
    }
    var card = e.currentTarget;
    card.mouseEnabled = false;
    card.getChildByName('back').visible = false;
    cardsFlipped.push(card);
    if (cardsFlipped.length === 2) {
        evalCardsFlipped();
    }
}
function evalCardsFlipped() {
    if (cardsFlipped[0].key === cardsFlipped[1].key) {
        matches++;
        evalGame();
    }
    else {
        setTimeout(resetFlippedCards, 1000);
    }
}
function resetFlippedCards() {
    cardsFlipped[0].mouseEnabled = cardsFlipped[1].mouseEnabled = true;
    cardsFlipped[0].getChildByName('back').visible = true;
    cardsFlipped[1].getChildByName('back').visible = true;
    cardsFlipped = [];
}
function evalGame() {
    if (matches === Math.pow(gameLevel,2)/2) {
        setTimeout(function () {
            alert('YOU WIN!')
        }, 300)
    }
    else {
        cardsFlipped = [];
    }
}
