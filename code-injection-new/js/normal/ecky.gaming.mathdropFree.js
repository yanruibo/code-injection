





















        canvas.addEventListener('selectstart', function (e) { e.preventDefault(); return false; }, false);

        function preventBehavior(e) {
            //alert('touchmove');
            e.preventDefault();
        };
        document.addEventListener("touchmove", preventBehavior, false);
    

﻿/// <reference path="refs.js" />
function preloadAssets()  {
    var loader = new PxLoader(),
        i1 = loader.addImage("images/imageBlocks/1.png"),
        i2 = loader.addImage("images/imageBlocks/2.png"),
        i3 = loader.addImage("images/imageBlocks/3.png"),
        i4 = loader.addImage("images/imageBlocks/4.png"),
        i5 = loader.addImage("images/imageBlocks/5.png"),
        i6 = loader.addImage("images/imageBlocks/6.png"),
        i7 = loader.addImage("images/imageBlocks/7.png"),
        i8 = loader.addImage("images/imageBlocks/8.png"),
        i9 = loader.addImage("images/imageBlocks/9.png"),

        i1S = loader.addImage("images/imageBlocks/1selected.png"),
        i2S = loader.addImage("images/imageBlocks/2selected.png"),
        i3S = loader.addImage("images/imageBlocks/3selected.png"),
        i4S = loader.addImage("images/imageBlocks/4selected.png"),
        i5S = loader.addImage("images/imageBlocks/5selected.png"),
        i6S = loader.addImage("images/imageBlocks/6selected.png"),
        i7S = loader.addImage("images/imageBlocks/7selected.png"),
        i8S = loader.addImage("images/imageBlocks/8selected.png"),
        i9S = loader.addImage("images/imageBlocks/9selected.png"),

        logo = loader.addImage("images/logo.png"),
        background = loader.addImage("images/background.jpg"),

        s1 = loader.addImage("images/stickers/1.png"),
        s2 = loader.addImage("images/stickers/2.png"),
        s3 = loader.addImage("images/stickers/3.png"),
        s4 = loader.addImage("images/stickers/4.png"),
        s5 = loader.addImage("images/stickers/5.png"),
        s6 = loader.addImage("images/stickers/6.png"),
        s7 = loader.addImage("images/stickers/7.png"),
        s8 = loader.addImage("images/stickers/8.png"),
        s9 = loader.addImage("images/stickers/9.png"),
        s10 = loader.addImage("images/stickers/10.png"),
        s11 = loader.addImage("images/stickers/11.png"),
        s12 = loader.addImage("images/stickers/12.png"),
        s13 = loader.addImage("images/stickers/13.png"),
        s14 = loader.addImage("images/stickers/14.png"),
        s15 = loader.addImage("images/stickers/15.png");
    ;

    // callback that will be run once images are ready 
    loader.addCompletionListener(function () {
        globals.imageArray[0] = i1;
        globals.imageArray[1] = i2;
        globals.imageArray[2] = i3;
        globals.imageArray[3] = i4;
        globals.imageArray[4] = i5;
        globals.imageArray[5] = i6;
        globals.imageArray[6] = i7;
        globals.imageArray[7] = i8;
        globals.imageArray[8] = i9;
        globals.imageArraySelected[0] = i1S;
        globals.imageArraySelected[1] = i2S;
        globals.imageArraySelected[2] = i3S;
        globals.imageArraySelected[3] = i4S;
        globals.imageArraySelected[4] = i5S;
        globals.imageArraySelected[5] = i6S;
        globals.imageArraySelected[6] = i7S;
        globals.imageArraySelected[7] = i8S;
        globals.imageArraySelected[8] = i9S;

        globals.imageArray[10] = logo;
        globals.imageArray[11] = background;

        globals.stickerImages.push(s1);
        globals.stickerImages.push(s2);
        globals.stickerImages.push(s3);
        globals.stickerImages.push(s4);
        globals.stickerImages.push(s5);
        globals.stickerImages.push(s6);
        globals.stickerImages.push(s7);
        globals.stickerImages.push(s8);
        globals.stickerImages.push(s9);
        globals.stickerImages.push(s10);
        globals.stickerImages.push(s11);
        globals.stickerImages.push(s12);
        globals.stickerImages.push(s13);
        globals.stickerImages.push(s14);
        globals.stickerImages.push(s15);

        assetsLoaded = true;
    });

    // begin downloading images 
    loader.start();
}


﻿/// <reference path="refs.js" />
var globals = {
    runningOnDevice: false,
    screenX: 0,
    screenY: 0,
    gameWidth: 0,
    gameHeight: 0,
    scoreWidth: 0,
    scoreHeight: 0,
    numCols: 6,
    numRows: 5,
    blockWidth: 0,      // Placeholder, gets changed later
    blockHeight: 0,     // Placeholder, gets changed later
    animationSpeedTopBottomMs: 1000,
    kineticStage: null,
    kineticMenuLayer: null,
    kineticGameLayer: null,
    kineticStickerLayer: null,
    imageArray: new Array(),
    imageArraySelected: new Array(),
    stickerImages : new Array(),
    allLevels: null,
    currentLevel: null,
    gameRunning: false,
    soundOn: true,
    musicOn: true,
    scoreObject: true,

    calculate: function () {
        this.gameWidth = 1024// $("body").width();
        this.gameHeight = 495//$("body").height();

        this.blockWidth = this.gameWidth / this.numCols;              // The score row
        this.blockHeight = this.gameHeight / this.numRows - 10;       // The score row;
    }
}


﻿/// <reference path="refs.js" />
var stickers = {

    init: function () {
        this.addBackButton();
    },

    addSticker: function () {
        var c = new sticker();
        return c.init();
    },

    show: function () {
        globals.kineticMenuLayer.hide();
        globals.kineticStickerLayer.show();
        globals.kineticStickerLayer.draw();
    },

    addBackButton: function () {
        var backButton = new Kinetic.Text({
            x: 400,
            y: 10,
            strokeWidth: 5,
            fill: "red",
            stroke: "black",
            strokeWidth: 4,
            text: "BACK TO MENU",
            fontSize: 20,
            fontFamily: "Calibri",
            textFill: "white",
            width: 220,
            padding: 8,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 10,
            listen: true,
            alpha: 1,
            name: "stickerButton"
        });
        globals.kineticStickerLayer.add(backButton);

        backButton.on("click touchend", function () {
            globals.kineticMenuLayer.show();
            globals.kineticStickerLayer.hide();
            globals.kineticStage.draw();
        });
    }

};

function sticker() {
    this.image = null;

    this.init = function () {
        // Pick random sticker image
        var r = Math.floor(Math.random(0) * globals.stickerImages.length + 1) - 1;

        var newX = Math.floor(Math.random(1) * 750) + 100;      // So as not to go off screen
        var newY = Math.floor(Math.random(1) * 300) + 100;      // So as not to go off screen

        var image = new Kinetic.Image({
            x: newX,
            y: newY,
            image: globals.stickerImages[r],
            draggable: true
        });
        globals.kineticStickerLayer.add(image);
        globals.kineticStickerLayer.draw();

        return globals.stickerImages[r];
    }
}


﻿/// <reference path="refs.js" />
var assetsLoaded = false;
var interval;

function main() {
    // Check for phonegap first
    document.addEventListener("deviceready", onDeviceReady, false);

    // If no answer after 2 seconds 
    setTimeout("waitForPhonegap()", 2000, null);
}

function waitForPhonegap() {
    if (!globals.runningOnDevice) {
        // Set body resolution
        $("body").css("width", "1024px");
        $("body").css("height", "495px");

        startLoading();
    }
}

function startLoading() {
    preloadAssets();
    interval = setInterval(function () { waitForPreload() }, 250);
}

function waitForPreload() {
    if (assetsLoaded) {
        // No more waiting!
        clearInterval(interval);

        // Setup global vars
        globals.calculate();

        // Setup kinetic ahead of time
        setupKineticMenu();
        setupBlocks();      // This comes from game.js - getting very spaghetti
        
        // This is attempting to stop the flashing on kindle
        $("#kinetic").click(function (e) {
           // var x = e.pageX - this.offsetLeft;
            //var y = e.pageY - this.offsetTop;

            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
            //mouseClicked(x, y);         // in game.js
        });
      
        $("body").click(function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();

            //var x = e.pageX - this.offsetLeft;
            //var y = e.pageY - this.offsetTop;

            //alert("MOUSE CLICKED BODY " + x + " " + y);

            //mouseClicked(x, y);         // in game.js
        });

        // Watch for touch
        document.addEventListener('touchend', function (e) {
            e.preventDefault();

            for (loopy = 0; loopy < e.touches.length; loopy++) {
                var touch = e.touches[loopy];

                var x = touch.pageX;
                var y = touch.pageY;
                mouseClicked(x, y);         // in game.js
            }
        }, false);

        // Resize to match the div
        var xSize = $("body").width();
        var ySize = $("body").height();

        var scaleX = xSize / 1024;
        var scaleY = ySize / 495;
        globals.kineticStage.setScale(scaleX, scaleY);

        // Setup menu
        menu.init();

        // Show menu
        menu.show();

        // Score object
        globals.scoreObject = new score();
        globals.scoreObject.addKineticScore();

    }
}

function setupKineticMenu() {
    var s = new Kinetic.Stage({
        container: "kinetic",
        //width: 1024,
        //height: 495,
        width: $("body").width(),
        height: $("body").height()
    });

    var backgroundLayer = new Kinetic.Layer();
    s.add(backgroundLayer);

    var stickerLayer = new Kinetic.Layer();
    s.add(stickerLayer);
    stickerLayer.hide();

    var gameLayer = new Kinetic.Layer();
    s.add(gameLayer);

    var menuLayer = new Kinetic.Layer();
    s.add(menuLayer);
    var image = new Kinetic.Image({
        x: 0,
        y: 0,
        width: 1024,
        height: 495,
        image: globals.imageArray[11]
    });
    backgroundLayer.add(image);
    image.setZIndex(.5);

    globals.kineticStage = s;
    globals.kineticGameLayer = gameLayer;
    globals.kineticMenuLayer = menuLayer;
    globals.kineticStickerLayer = stickerLayer;

    // STICKERS!
    stickers.init();          
}


﻿function shapeCreator() {
    this.menuText = function (levelText, fontSize) {
        var levelText = new Kinetic.Text({
            x: 435,
            y: 110,
            text: levelText,
            fontSize: fontSize,
            fontFamily: "Calibri",
            textFill: "black",
            alpha: 1,
            cornerRadius: 10,
            fill: "cyan",
            strokeWidth: 3,
            stroke: "black",
            padding: 5,
            width: 156,
            align: "center",
            name: "menu"

        });
        return levelText;
    }

    this.menuLabel = function (theText) {
        var text = new Kinetic.Text({
            x: 385,
            y: 187,
            text: theText,
            fontSize: 19,
            fontFamily: "Calibri",
            textFill: "black",
            alpha: 1,
            width: 260,
            align: "center",
            name: "menu"


        });
        return text;
    }

    this.insideMenuCircle = function () {
        var circle = new Kinetic.Circle({
            x: 515,
            y: 255,
            radius: 40,
            fill: "orange",
            stroke: "black",
            strokeWidth: 4,
            alpha: 1,
            name: "menu"


        });
        return circle;
    }

    this.textInCircle = function (theText) {
        var numberText = new Kinetic.Text({
            x: 480,
            y: 235,
            text: theText,
            fontSize: 30,
            fontFamily: "Calibri",
            textFill: "black",
            width: 70,
            align: "center",
            alpha: 1,
            name: "menu"

        });
        return numberText;
    }

    this.goBackButton = function (theText, color) {
        if (color == null) color = "RED";

        var next = new Kinetic.Text({
            x: 457,
            y: 245,
            strokeWidth: 5,
            fill: color,
            stroke: "black",
            strokeWidth: 4,
            text: theText,
            fontSize: 20,
            fontFamily: "Calibri",
            textFill: "white",
            width: 120,
            padding: 9,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 10,
            listen: true,
            alpha: 1,
            name: "menu"

        });
        return next;
    }

    this.menuButton = function (theText, color) {
        if (color == null) color = "RED";

        var next = new Kinetic.Text({
            x: 457,
            y: 316,
            strokeWidth: 5,
            fill: color,
            stroke: "black",
            strokeWidth: 4,
            text: theText,
            fontSize: 20,
            fontFamily: "Calibri",
            textFill: "white",
            width: 120,
            padding: 9,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 10,
            listen: true,
            alpha: 1,
            name: "menu"

        });
        return next;
    }

    this.menuCircle = function (color) {
        var circle = new Kinetic.Circle({
            x: 515,
            y: 230,
            radius: 150,
            fill: color,
            stroke: "black",
            strokeWidth: 5,
            alpha: 1,
            name: "menu"
        });
        return circle;
    }

    this.menuStar = function (color) {
        var star = new Kinetic.Star({
            x: 515,
            y: 230,
            innerRadius: 200,
            outerRadius: 120,
            numPoints: 9,
            fill: color,
            stroke: "black",
            strokeWidth: 4,
            name: "menuStar"
        });
        return star;

    }

}


﻿function levels() {
    this.levels = null;
    this.currentlevel = 0;
    this.pointsForSticker = 0;

    this.init = function (difficulty) {
        this.currentlevel = 0;
        this.levels = new Array();
        this.levels.push(null);     // 0 based arrays!

        var cmd = "this.difficulty" + difficulty + "()";

        eval(cmd);
        this.generateLevels();
    }

    this.addLevel = function (dropTimeMs, minNum, maxNum, pointsNeeded, levelTimeSeconds, bonusPointsPerSecond, pointsMultiplier) {
        var lvl = new level();
        lvl.init(dropTimeMs, minNum, maxNum, pointsNeeded, levelTimeSeconds, bonusPointsPerSecond, pointsMultiplier);
        this.levels.push(lvl);
    }

    this.difficulty1 = function () {
        //            Droptime  min     max     points  leveltime   bonuspersecond      multiplier
        this.addLevel(2000, 3, 5, 20, 30, 1, 1);
        this.pointsForSticker = 200;
    }

    this.difficulty2 = function () {
        //            Droptime  min     max     points  leveltime   bonuspersecond      multiplier
        this.addLevel(1800, 3, 7, 25, 40, 2, 1.1);
      
        this.pointsForSticker = 100;
    }

    this.difficulty3 = function () {
        //            Droptime  min     max     points  leveltime   bonuspersecond      multiplier
        this.addLevel(1700, 3, 9, 50, 10, 3, 1.2);

        this.pointsForSticker = 400;
    }

    this.difficulty4 = function () {
        //            Droptime  min     max     points  leveltime   bonuspersecond      multiplier
        this.addLevel(1500, 5, 11, 75, 10, 4, 1.3);

        this.pointsForSticker = 500;
    }

    this.difficulty5 = function () {
        //            Droptime  min     max     points  leveltime   bonuspersecond      multiplier
        this.addLevel(1400, 5, 13, 100, 10, 5, 1.4);

        this.pointsForSticker = 600;

    }

    this.difficulty6 = function () {
        //            Droptime  min     max     points  leveltime   bonuspersecond      multiplier
        this.addLevel(1300, 7, 15, 150, 10, 6, 1.5);

        this.pointsForSticker = 700;

    }

    this.difficulty7 = function () {
        //            Droptime  min     max     points  leveltime   bonuspersecond      multiplier
        this.addLevel(1200, 8, 17, 200, 10, 7, 1.6);
        this.pointsForSticker = 800;

    }

    this.difficulty8 = function () {
        //            Droptime  min     max     points  leveltime   bonuspersecond      multiplier
        this.addLevel(1100, 9, 20, 250, 10, 8, 1.7);
        this.pointsForSticker = 900;

    }

    this.difficulty9 = function () {
        //            Droptime  min     max     points  leveltime   bonuspersecond      multiplier
        this.addLevel(1000, 10, 25, 300, 10, 9, 1.8);
        this.pointsForSticker = 1000;

    }

    // First level created, just add percentages to the next levels!
    this.generateLevels = function () {
        var firstLevel = this.levels[1];

        // Generate 50 random levels
        for (loopy = 0; loopy <= 50; loopy++) {
            this.addLevel(firstLevel.dropTimeMs * 0.9, firstLevel.minNum + 1, firstLevel.maxNum + 1, firstLevel.pointsNeeded * 1.1, firstLevel.levelTimeSeconds * 0.9, firstLevel.bonusPointsPerSecond * 1.1, firstLevel.pointsMultiplier * 1.1);
            firstLevel = this.levels[this.levels.length - 1];
        }
    }

    this.next = function () {
        this.currentlevel++;
        return this.get();
    }

    this.get = function () {
        return this.levels[this.currentlevel];
    }
}

function level() {
    this.dropTimeMs = 0;
    this.minNum = 0;
    this.maxNum = 0;
    this.pointsNeeded = 0;
    this.levelTimeSeconds = 0;
    this.bonusPointsPerSecond = 0;
    this.pointsMultiplier = 0;

    this.init = function (dropTimeMs, minNum, maxNum, pointsNeeded, levelTimeSeconds, bonusPointsPerSecond, pointsMultiplier) {
        this.dropTimeMs = dropTimeMs;
        this.minNum = minNum;
        this.maxNum = maxNum;
        this.pointsNeeded = pointsNeeded;
        this.levelTimeSeconds = levelTimeSeconds;
        this.bonusPointsPerSecond = bonusPointsPerSecond;
        this.pointsMultiplier = pointsMultiplier;
    }
}


﻿/// <reference path="refs.js" />
var menu = {
    blockInterval: null,

    // This is eitehr STARTGAME or SELECTLEVEL or INSTRUCTIONS and is using to control what is showed on the screen
    mode: "STARTGAME",

    init: function () {
        menu.showButtons();
        menu.showLogo();
        menu.addInstructions();
        menu.musicAndSound ();
        globals.kineticMenuLayer.draw();

        // Add difficulty buttons
        var xStart = 62;

        for (loopy = 1; loopy <= 9; loopy++) {
            menu.addDifficultyButton(loopy, "green", xStart, 328);
            xStart += 105;
        }
        menu.hideDifficulties();

        playMusic();
    },

    show: function () {
        globals.kineticMenuLayer.setListening(true);
        globals.kineticMenuLayer.show();
        globals.kineticGameLayer.hide();
        globals.kineticGameLayer.setListening(false);
        globals.kineticStage.draw();
        globals.kineticGameLayer.draw();
        globals.kineticMenuLayer.draw();

        menu.blockInterval = setInterval("menu.addBlock()", 500);
    },

    addInstructions: function () {
        var instructions = new Kinetic.Text({
            x: 27,
            y: 250,
            strokeWidth: 5,
            stroke: "black",
            text: "At the start of the game you will be given a number.\nClick the blocks until they add up to that number\nThe more blocks you click and the higher they are; the more points you get!\nGood Luck!",
            fontSize: 22,
            fontFamily: "Calibri",
            textFill: "black",
            width: 970,
            padding: 8,
            align: 'center',
            fontStyle: 'italic',
            alpha: 1,
            name: "instructions",
            fill: "green",
            alpha: 1
        });
        instructions.hide();
        globals.kineticMenuLayer.add(instructions);
    },


    showDifficulties: function () {
        var o = globals.kineticMenuLayer.get(".firstButton")[0];
        o.setText("SELECT LEVEL");

        var o = globals.kineticMenuLayer.get(".secondButton")[0];
        o.setText("BACK");

        var o = globals.kineticMenuLayer.get(".stickerButton")[0];
        o.hide();

        menu.mode = "SELECTLEVEL";

        // Show the difficulty buttons
        var o = globals.kineticMenuLayer.get(".difficulty");

        for (loopy = 0; loopy < o.length; loopy++) {
            o[loopy].show();
        }

        globals.kineticMenuLayer.draw();
    },

    hideDifficulties: function () {
        var o = globals.kineticMenuLayer.get(".firstButton")[0];
        o.setText("PLAY GAME");

        var o = globals.kineticMenuLayer.get(".secondButton")[0];
        o.setText("INSTRUCTIONS");

        var o = globals.kineticMenuLayer.get(".stickerButton")[0];
        o.show();

        var o = globals.kineticMenuLayer.get(".difficulty");
        for (loopy = 0; loopy < o.length; loopy++) {
            o[loopy].hide();
        }

        menu.mode = "STARTGAME";

        globals.kineticMenuLayer.draw();
    },
    
    musicAndSound: function () {
        var musicButton = new Kinetic.Text({
            x: 850,
            y: 400,
            strokeWidth: 5,
            fill: "green",
            stroke: "black",
            strokeWidth: 4,
            text: "MUSIC ON ",
            fontSize: 20,
            fontFamily: "Calibri",
            textFill: "white",
            width: 170,
            padding: 8,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 25,
            listen: true,
            alpha: .7
        });
        globals.kineticMenuLayer.add(musicButton);

        musicButton.on("click touchend", function () {
            if (globals.musicOn) {
                musicButton.setText("MUSIC OFF");
                musicButton.attrs.fill = "red";
                globals.kineticMenuLayer.draw(musicButton);
                globals.musicOn = false;
                stopMusic();
            } else {
                musicButton.setText("MUSIC ON");
                musicButton.attrs.fill = "green";
                globals.kineticMenuLayer.draw(musicButton);
                globals.musicOn = true;
                playMusic();
            }
        });

        var soundButton = new Kinetic.Text({
            x: 850,
            y: 450,
            strokeWidth: 5,
            fill: "green",
            stroke: "black",
            strokeWidth: 4,
            text: "SOUND ON",
            fontSize: 20,
            fontFamily: "Calibri",
            textFill: "white",
            width: 170,
            padding: 8,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 25,
            listen: true,
            alpha: .7
        });
        globals.kineticMenuLayer.add(soundButton);

        soundButton.on("click touchend", function () {
            if (globals.soundOn) {
                soundButton.setText("SOUND OFF");
                soundButton.attrs.fill = "red";
                globals.kineticMenuLayer.draw(musicButton);
                globals.soundOn = false;
            } else {
                soundButton.setText("SOUND ON");
                soundButton.attrs.fill = "green";
                globals.kineticMenuLayer.draw(musicButton);
                globals.soundOn = true;
            }
        });

    },

    startTheGame: function (level) {
        // Stop blocks falling
        clearInterval(menu.blockInterval);

        // Wait for the blocks to stop moving
        setTimeout(function () {
            startGame(level);       // This is found in game.js
        }, 50);

        globals.kineticMenuLayer.hide();
    },

    addBlock: function () {
        // Get random x position
        var xPos = Math.floor(Math.random() * globals.gameWidth) + 1;

        // Get a random block
        var blockNumber = Math.floor(Math.random() * 9) + 1;

        // Get random fall duration
        var randomFallSpeedMs = Math.floor(Math.random() * 2000) / 1000;

        if (randomFallSpeedMs < 1) randomFallSpeedMs = 1;

        // Add the image
        var image = new Kinetic.Image({
            x: xPos,
            y: -40,        // Off the screen
            image: globals.imageArray[blockNumber],
            width: 120,
            height: 80,
            listening: false,
            alpha: .3
        });
        image.setListening(false);
        
        globals.kineticMenuLayer.add(image);

        // Now fall down!
        image.transitionTo({
            y: globals.gameHeight+ 50,       // Off screen
            duration: randomFallSpeedMs,
            callback: function () {
                // This will happen when game starts if images are still moving
                try{
                    globals.kineticMenuLayer.remove(image);
                }
                catch(err) {};
            }
        })
    },

    showLogo: function () {
        var image = new Kinetic.Image({
            x: 260,
            y: 40,        
            image: globals.imageArray[10],
            width: 520,
            height: 200,
            listening: false,
            alpha: 5
        });
        globals.kineticMenuLayer.add(image);
    },

    showButtons: function () {
        var startButton = new Kinetic.Text({
            x: 333,
            y: 245,
            strokeWidth: 5,
            fill: "red",
            stroke: "black",
            strokeWidth: 4,
            text: "START GAME",
            fontSize: 30,
            fontFamily: "Calibri",
            textFill: "white",
            width: 350,
            padding: 8,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 10,
            listen: true,
            alpha: 1,
            name: "firstButton"

        });

        globals.kineticMenuLayer.add(startButton);

        startButton.on("click touchend", function () {
            if (menu.mode == "STARTGAME") {
                menu.showDifficulties();
            }
        });

        var stickerButton = new Kinetic.Text({
            x: 333,
            y: 340,
            strokeWidth: 5,
            fill: "red",
            stroke: "black",
            strokeWidth: 4,
            text: "STICKERS",
            fontSize: 30,
            fontFamily: "Calibri",
            textFill: "white",
            width: 350,
            padding: 8,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 10,
            listen: true,
            alpha: 1,
            name: "stickerButton"
        });

        stickerButton.on("click touchend", function () {
            stickers.show();
        });

        globals.kineticMenuLayer.add(stickerButton);

        var helpButton = new Kinetic.Text({
            x: 333,
            y: 432,
            strokeWidth: 5,
            fill: "red",
            stroke: "black",
            strokeWidth: 4,
            text: "HELP",
            fontSize: 30,
            fontFamily: "Calibri",
            textFill: "white",
            width: 350,
            padding: 8,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 10,
            listen: true,
            alpha: 1,
            name: "secondButton"
        });
        globals.kineticMenuLayer.add(helpButton);

        helpButton.on("click touchend", function () {
            if (menu.mode == "STARTGAME") {
                menu.mode = "INSTRUCTIONS";
                var o = globals.kineticMenuLayer.get(".instructions")[0];
                o.show();
                var o = globals.kineticMenuLayer.get(".firstButton")[0];
                o.hide();
                var o = globals.kineticMenuLayer.get(".stickerButton")[0];
                o.hide();
                var o = globals.kineticMenuLayer.get(".secondButton")[0];
                o.setText("BACK");
            }
            else {
                if (menu.mode == "INSTRUCTIONS") {
                    menu.mode = "STARTGAME";
                    var o = globals.kineticMenuLayer.get(".instructions")[0];
                    o.hide();
                    var o = globals.kineticMenuLayer.get(".firstButton")[0];
                    o.show();
                    var o = globals.kineticMenuLayer.get(".stickerButton")[0];
                    o.show();
                    var o = globals.kineticMenuLayer.get(".secondButton")[0];
                    o.setText("INSTRUCTIONS");

                }
                else {
                    menu.hideDifficulties();
                }
            }
        });
        globals.kineticMenuLayer.draw();
    },

    addDifficultyButton: function (difficulty, color, x, y) {
        var difficultyButton = new Kinetic.Text({
            x: x,
            y: y,
            strokeWidth: 5,
            fill: color,
            stroke: "black",
            strokeWidth: 4,
            text: difficulty.toString(),
            fontSize: 40,
            fontFamily: "Calibri",
            textFill: "white",
            padding: 7,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 10,
            listen: true,
            width: 80,
            alpha: 1,
            name: "difficulty"
        });

        difficultyButton.on("click touchend", function () {
            if (menu.mode == "SELECTLEVEL") {
                menu.startTheGame(difficulty);
            }
        });
        
        globals.kineticMenuLayer.add(difficultyButton);

        var difficultyButtonRed = new Kinetic.Text({
            x: x,
            y: y,
            strokeWidth: 5,
            fill: "red",
            stroke: "black",
            strokeWidth: 4,
            text: difficulty.toString(),
            fontSize: 40,
            fontFamily: "Calibri",
            textFill: "white",
            padding: 7,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 10,
            listen: true,
            width: 80,
            name: "difficulty",
            alpha: (difficulty == 1) ? .1 : (difficulty / 10) - .2
        });

        globals.kineticMenuLayer.add(difficultyButtonRed);

        difficultyButtonRed.on("click touchend", function () {
            if (menu.mode == "SELECTLEVEL") {
                menu.startTheGame(difficulty);
            }
        });
    }
}


﻿/// <reference path="refs.js" />
function score() {
    this.levelScore = null;
    this.scoreRequired = null;
    this.totalGameScore = null;
    this.fontSize = 20;

    this.addKineticScore = function () {
        var t = this;           // So we can use in the var below!
        var shuffleButton = this.createShuffleButton();
        globals.kineticGameLayer.add(shuffleButton);
        
        shuffleButton.on("click touchstart", function () {
            if (globals.gameRunning) {
                shuffle(true);          // This is in game.js!  A little spaghetti coding!
            }
        });

        var line = this.createLine();
        globals.kineticGameLayer.add(line);

        var pauseButton = this.createPauseButton();
        globals.kineticGameLayer.add(pauseButton);

        pauseButton.on("click touchstart", function () {
            if (globals.gameRunning) {
                pauseGame(true);          // This is in game.js!  A little spaghetti coding!
            }
        });

        var cr = this.createNumberRequired();
        globals.kineticGameLayer.add(cr);

        var createCurrentLevelFrame = this.createCurrentLevelFrame();
        globals.kineticGameLayer.add(createCurrentLevelFrame);

        var currentLevelPercentage = this.createCurrentLevelPercentage();
        globals.kineticGameLayer.add(currentLevelPercentage);

        var totalScore = this.createTotalScore();
        globals.kineticGameLayer.add(totalScore);

        // Move it down and draw
        globals.kineticGameLayer.draw();
    }
 
    this.createLine = function () {
        // dashed line
        var line = new Kinetic.Line({
            points: [1,445, 1024, 445],
            stroke: "black",
            strokeWidth: 4,
            lineJoin: "round",
            /*
             * line segments with a length of 33px
             * with a gap of 10px
             */
            dashArray: [33, 10]
        });
        return line;
    }

    this.createPauseButton = function () {
        var complexText = new Kinetic.Text({
            x: 15,
            y: 452,
            strokeWidth: 5,
            fill: "red",
            stroke: "black",
            strokeWidth: 4,
            text: "PAUSE",
            fontSize: this.fontSize,
            fontFamily: "Calibri",
            textFill: "white",
            width: 140,
            padding: 8,
            align: 'center',
            fontStyle: 'italic',
           
            cornerRadius: 10,
            listen: true,
            name: "pause"
        });
        return complexText;
    }

    this.setNumberRequired = function (theNumber) {
        var obj = globals.kineticStage.get(".numberRequired")[0];
        obj.setText(theNumber.toString());
        globals.kineticGameLayer.draw();
        globals.kineticStage.draw();
    }

    this.createShuffleButton = function () {
        var complexText = new Kinetic.Text({
            x: 190,
            y: 452,
            strokeWidth: 5,
            fill: "red",
            stroke: "black",
            strokeWidth: 4,
            text: "SHUFFLE",
            fontSize: this.fontSize,
            fontFamily: "Calibri",
            textFill: "white",
            width: 140,
            padding: 8,
            align: 'center',
            fontStyle: 'italic',
          
            cornerRadius: 10,
            listen: true,
            name: "shuffle"

        });
        return complexText;
    }

    this.createNumberRequired = function () {
        var complexText = new Kinetic.Text({
            x: 378,
            y: 452,
            strokeWidth: 5,
            fill: "orange",
            stroke: "black",
            strokeWidth: 4,
            text: "12",
            fontSize: this.fontSize,
            fontFamily: "Calibri",
            textFill: "black",
            width: 70,
            padding: 8,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 10,
            listen: false,
            name: "numberRequired"
        });
        return complexText;

    }

    this.createCurrentLevelFrame = function () {
        var complexText = new Kinetic.Text({
            x: 493,
            y: 452,
            strokeWidth: 5,
            fill: "red",
            stroke: "black",
            strokeWidth: 4,
            text: "LEVEL PROGRESS",
            fontSize: this.fontSize,
            fontFamily: "Calibri",
            textFill: "white",
            width: 140,
            padding: 8,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 10,
            listen: true,
            width: 330
        });
        return complexText;
    }

    this.createCurrentLevelPercentage = function () {
        // Current level score box
        var rect = new Kinetic.Rect({
            x: 496,
            y: 454,
            width: 0,
            height: 36,
            fill: "green",
            stroke: "black",
            strokeWidth: 0,
            cornerRadius: 0,
            name: "currentLevelPercentage",
            alpha: .8
        });
        return rect;
    }

    this.createTotalScore = function () {
        var complexText = new Kinetic.Text({
            x: 870,
            y: 452,
            strokeWidth: 5,
            fill: "green",
            stroke: "black",
            strokeWidth: 4,
            text: "TOTAL",
            fontSize: this.fontSize,
            fontFamily: "Calibri",
            textFill: "white",
            width: 140,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 10,
            padding: 8,
            align: 'center',
            name: "totalScore"
        });
        return complexText;
    }

    this.setScore = function (scoreToGet, currentScore, scoreAdded, totalGameScore) {
        // Set total score
        var totalScore = globals.kineticGameLayer.get(".totalScore")[0];

        if (totalGameScore == 0) {
            totalScore.setText("TOTAL");
        }
        else {
            totalScore.setText(totalGameScore.toString());
        }

        // Set the current level percetnage
        var currentLevelPercentage = globals.kineticGameLayer.get(".currentLevelPercentage")[0];

        var width = (currentScore / scoreToGet * 100) * 3.3;

        if (width > 330) width = 330;
        currentLevelPercentage.transitionTo({
            width: width,
            duration: .2
        });
    }

    this.showButtons = function () {
        this.showButton(".pause");
        this.showButton(".shuffle");
    }

    this.hideButtons = function () {
        this.hideButton(".pause");
        this.hideButton(".shuffle");
    }

    this.hideButton = function (buttonName) {
        var b = globals.kineticGameLayer.get(buttonName)[0];
        b.setAlpha(.5);
        globals.kineticGameLayer.draw();
    }

    this.showButton = function (buttonName) {
        var b = globals.kineticGameLayer.get(buttonName)[0];

        b.setAlpha(1);
        globals.kineticGameLayer.draw();
    }

}


﻿/// <reference path="refs.js" />
var blocks;
var currentColumn = 1;
var intervalBlockLoop;
var numberRequired = 8;
var levelScore = 0;
var scoreObject;
var totalGameScore = 0;
var stageGame;
var sc;
var kineticGameStage;
var animateSun = false;
var currentLevelTimeStarted;
var gotStickerAnimation;;
var gotStickerAnimation2;

function startGame(difficulty) {
    // Change layers around
    globals.kineticGameLayer.setListening(true);
    globals.kineticMenuLayer.setListening(false);
    globals.kineticMenuLayer.hide();
    globals.kineticStage.draw();
    globals.kineticGameLayer.show();

    // Reset score
    levelScore = 0;
    totalGameScore = 0;
    
    // Setup link to the shape creator class
    sc = new shapeCreator();

    // Get the Levels
    globals.allLevels = new levels();   
    globals.allLevels.init(difficulty);       

    // Setup score
    scoreObject = globals.scoreObject;
    
    // Setup the block array
    addScoreAddedToKinetic();

    // Start onframe checking
    globals.kineticStage.onFrame(function (frame) {
        if (globals.gameRunning) {
            gameLoop();
        }
        if (animateSun) {
            // Animate the star

            menuStar = globals.kineticStage.get(".menuStar")[0];

            var angleDiff = frame.timeDiff * Math.PI / 1500;
            menuStar.rotate(angleDiff);
            globals.kineticStage.draw();
        }
    });
    globals.kineticStage.start();

    // Start the level
    stopGameFromRunning();
    startLevelScreen();
}

function endGame() {
    clearblocks();
    animateSun  = false;

    // Remove the sticker stuff if we have it
    var o = globals.kineticGameLayer.get(".gotASticker")[0];

    if (o != null) {
        globals.kineticGameLayer.remove(o);
    }

    if (gotStickerAnimation != null) {
        clearInterval(gotStickerAnimation);
    }

    
    if (gotStickerAnimation2 != null) {
        clearInterval(gotStickerAnimation2);
    }

    var o = globals.kineticGameLayer.get(".theSticker")[0];

    if (o != null) {
        globals.kineticGameLayer.remove(o);
    }


    menu.show();
}

function gotASticker() {
    var sticker = new Kinetic.Text({
        x: -1200,
        y: 15,
        strokeWidth: 5,
        fill: "green",
        stroke: "black",
        strokeWidth: 4,
        text: "!!!!!YOU GOT A STICKER!!!!!",
        fontSize: 40,
        fontFamily: "Calibri",
        textFill: "white",
        width: 650,
        padding: 9,
        align: 'center',
        fontStyle: 'italic',
        cornerRadius: 10,
        alpha: .8,
        name: "gotASticker"
    });
    globals.kineticGameLayer.add(sticker);
    sticker.setZIndex(-4);

    var im = stickers.addSticker();

    var stickerImage = new Kinetic.Image({
        image: im,
        x: 120,
        y: 150,
        alpha: .8,
        name: "theSticker"
    });
    globals.kineticGameLayer.add(stickerImage);

    globals.kineticGameLayer.draw();
    animateGotSticker();
    gotStickerAnimation = setInterval("animateGotSticker()", 8000);

    moveStickerAround();
    gotStickerAnimation2 = setInterval("moveStickerAround()", 1000);

}

function animateGotSticker() {
    var o = globals.kineticGameLayer.get(".gotASticker")[0];
    o.transitionTo({
        x: 1200,
        duration: 4,
        callback: function() {
            o.transitionTo({
                x: -700,
                duration: 4})
        }
    });
}

function moveStickerAround() {
    var newX = Math.floor(Math.random(1) * 1024);
    var newY = Math.floor(Math.random(1) * 495);

    var o = globals.kineticGameLayer.get(".theSticker")[0];
    o.transitionTo({
        x: newX,
        y: newY,
        duration: 1});
}

function addScoreAddedToKinetic() {
    var layer = new Kinetic.Layer();
    
    kineticScoreAdded = new Kinetic.Text({
        x: globals.gameWidth / 2 - 200,
        y: globals.gameHeight / 2 - 75,
        text: "+10",
        fontSize: 150,          
        fontFamily: "Calibri",
        textFill: "green",
        align: "center",
        width: 400,
        alpha: 0,
        listen: false
    });
    globals.kineticGameLayer.add(kineticScoreAdded);
    kineticScoreAdded.setListening(false);
}

function setupBlocks() {
    blocks = new Array();
    blocks.push(null);

    for (rowNum = 1; rowNum <= globals.numRows; rowNum++) {
        var aColArray = new Array();
        aColArray.push(null);      // 0 based array - you dead to me!

        for (colNum = 1; colNum <= globals.numCols; colNum++) {

            var t = new blockType(rowNum, colNum, generateRandomBlock());        // TODO BLOCK NUMBER
            t.addKineticImage();

            // Add to the array!
            aColArray.push(t);
        }
        blocks.push(aColArray);
    }
}

// Not used at this time
/*
function mouseClicked(x, y) {
    if (globals.gameRunning) {
        iterateThruBlocks(
            function () {
                b = blocks[rowNum][colNum];

                if (b.active) {
                    bi = b.image;
                    blockXstart = bi.attrs.x;
                    blockYstart = bi.attrs.y;
                    blockXend = blockXstart + globals.blockWidth;
                    blockYend = blockYstart + globals.blockHeight;

                    if (x >= blockXstart && x <= blockXend && y >= blockYstart && y <= blockYend) {
                        b.clicked();
                    }
                }
            }
        )
    }
}
*/

function gameLoop() {
    var currentNumberTotal = 0;
    var scoreForRowHeight = 0;
    var numberBlocksSelected = 0;

    // Are we touchign an active block?
  //  console.log (globals.kineticStage.getUserPosition());

    // Check if number has been reached and if so remove the blocks and add the score
    iterateThruBlocks(
        function () {
            if (blocks[rowNum][colNum].active && blocks[rowNum][colNum].selected) {
                currentNumberTotal += blocks[rowNum][colNum].numberOnBlock;

                // More score the higher in the stack
                scoreForRowHeight += globals.numRows - rowNum + 1;

                // More score the more blocks used
                numberBlocksSelected ++;
            }
        }
    );
  
    // Did we score?  If so deactivate the blocks
    if (currentNumberTotal == numberRequired) {
        playCorrect();

        // Calculate scores
        var scoreGot = Math.round(scoreForRowHeight * numberBlocksSelected * globals.currentLevel.pointsMultiplier);

        levelScore += scoreGot;
        totalGameScore += scoreGot;
        drawScore(scoreGot);

        if (levelScore > globals.currentLevel.pointsNeeded) {
            levelScore = globals.currentLevel.pointsNeeded;
        }

        iterateThruBlocks(
            function () {
                if (blocks[rowNum][colNum].active && blocks[rowNum][colNum].selected) {
                    blocks[rowNum][colNum].deactivate();
                }
            }
        );
    }

    // Check for any blocks which need to be removed
    iterateThruBlocks(
         function () {
             // Ignore last block
             if (rowNum != globals.numRows) {
                 // Is this block active but one below isn't?
                 if (blocks[rowNum][colNum].active == true && blocks[rowNum + 1][colNum].active == false) {
                     // Move it
                     blocks[rowNum + 1][colNum].move(rowNum, rowNum + 1, blocks[rowNum][colNum].numberOnBlock, 1000, blocks[rowNum][colNum].selected);
                     blocks[rowNum][colNum].deactivate();
                 }
             }
         }
    )

    // Did you win
    if (levelScore >= globals.currentLevel.pointsNeeded) {
        levelComplete();
   }
}

function drawScore(scoreGot) {
    scoreObject.setScore(globals.currentLevel.pointsNeeded, levelScore, scoreGot, totalGameScore);

    if (scoreGot < 0) {
        kineticScoreAdded.setText(scoreGot.toString());
    }
    else {
        kineticScoreAdded.setText("+" + scoreGot.toString());
    }

    globals.kineticGameLayer.draw();

    if (scoreGot != 0) {
        kineticScoreAdded.transitionTo({
            alpha: 1,
            duration: .2,
            callback: function () {
                kineticScoreAdded.transitionTo({
                    alpha: 0,
                    duration: .5
                })
            }
        });
    }
}

function shuffle(losePoints) {
    iterateThruBlocks(
        function () {
            if (blocks[rowNum][colNum].active && !blocks[rowNum][colNum].selected) {
                var newNumber = generateRandomBlock();
                blocks[rowNum][colNum].shuffle(newNumber);
            }
        }
    )

    // Lose 10 points as per Keelie!
    if (levelScore >= 10 && losePoints) {
        levelScore -= 10;
        totalGameScore -= 10;
        drawScore(-10);
    }
}

function iterateThruBlocks(theFunction) {
    for (rowNum = 1; rowNum <= globals.numRows; rowNum++) {
        for (colNum = 1; colNum <= globals.numCols; colNum++) {
            theFunction();
        }
    }
}

function stopGameFromRunning() {
    clearInterval(intervalBlockLoop);
    scoreObject.hideButtons();
    globals.gameRunning = false;
}

function pauseGame() {
    stopGameFromRunning();

    // Add a new layer so we can remove this junk later
    var layer = new Kinetic.Layer();
    globals.kineticStage.add(layer);

    // Surrounding circle and star
    var menuStar = sc.menuStar("gray");
    layer.add(menuStar);

    var menuCircle = sc.menuCircle("gray");
    layer.add(menuCircle);

    var menuText = sc.menuText("PAUSE", 25);
    layer.add(menuText);

    var menuLabel = sc.menuLabel("WHAT NOW?");
    layer.add(menuLabel);

    var cont = sc.menuButton("GO", "red");
    layer.add(cont);

    var menuButton = sc.goBackButton("MENU", "red");
    layer.add(menuButton);

    cont.on("click touchend", function () {
        globals.kineticStage.remove(layer);
        scoreObject.showButtons();
        setAlphaOnAllBlocks(1);

        globals.kineticGameLayer.draw();
        startGameIntervals();
    });

    menuButton.on("click touchend", function () {
        globals.kineticStage.remove(layer);
        endGame();
    });

    // Hide the blocks - (after they fell)
    setTimeout("setAlphaOnAllBlocks(0);", 1000);

    // Animate the menu
    animateMenu(layer);
}

function setAlphaOnAllBlocks(theAlpha) {
    iterateThruBlocks(
          function () {
              var b = blocks[rowNum][colNum];

              if (b.active) {
                  b.image.transitionTo({
                      alpha: theAlpha,
                      duration: .2
                  })
              }
          }
    );
};

function gameOver() {
    playBoo();

    stopGameFromRunning();


    // Add a new layer so we can remove this junk later
    var layer = new Kinetic.Layer();
    globals.kineticStage.add(layer);

    // Surrounding circle and star
    var menuStar = sc.menuStar("red");
    layer.add(menuStar);

    var menuCircle = sc.menuCircle("red");
    layer.add(menuCircle);

    var menuText = sc.menuText("GAME OVER", 25);
    layer.add(menuText);
   
    var menuLabel = sc.menuLabel("TOTAL POINTS");
    layer.add(menuLabel);

    var circle = sc.insideMenuCircle("yellow");
    layer.add(circle);

    var textInCircle = sc.textInCircle(totalGameScore.toString());
    layer.add(textInCircle);

    var next = sc.menuButton("MENU", "black");
    layer.add(next);

    next.on("click touchend", function () {
        globals.kineticStage.remove(layer);
        
        globals.kineticStage.draw();
        endGame();
    });

    // Sticker?
    if (totalGameScore >= globals.allLevels.pointsForSticker)
        gotASticker();

    // Animate the menu
    animateMenu(layer);

}

function dropNextBlock() {
    var emptySpace = false;

    // Find next row to use
    for (rowNum = globals.numRows; rowNum >= 1; rowNum--) {
        var colArray = blocks[rowNum];

        if (colArray[currentColumn].active == 0) {
            emptySpace = true;
            break;
        }
    }
    if (!emptySpace) {
        gameOver();
    }
    else {
        blocks[rowNum][currentColumn].move(0, rowNum, generateRandomBlock(), 0, false);

        currentColumn = (currentColumn > globals.numRows) ? 1 : currentColumn + 1;
    }
}

function iterateColumns(theFunction) {
    for (colNum = 1; colNum <= globals.numCols; colNum++) {
        theFunction();
    }
}

function clearblocks() {
    // Clear all the blocks
    iterateThruBlocks(
        function () {
            blocks[rowNum][colNum].selected = false;
            blocks[rowNum][colNum].deactivate();
            blocks[rowNum][colNum].image.setAlpha(0);
        }
    )
    globals.kineticGameLayer.draw();
}

// Show the start level screen
function startLevelScreen() {
    clearblocks();

    // Move to next level
    globals.currentLevel = globals.allLevels.next();
    
    // Calculate the next number needed
    numberRequired = calculateNumberRequired();

    // Draw scoreboard
    levelScore = 0;
    drawScore(0);

    // Add a new layer so we can remove this junk later
    var layer = new Kinetic.Layer();
    globals.kineticStage.add(layer);
    globals.kineticStage.show();

    // Surrounding circle and star
    var menuStar = sc.menuStar("yellow");
    layer.add(menuStar);

    var menuCircle = sc.menuCircle("yellow");
    layer.add(menuCircle);

    var menuText = sc.menuText("LEVEL " + globals.allLevels.currentlevel, 26);
    layer.add(menuText);
   
    var menuLabel = sc.menuLabel("NUMBER REQUIRED");
    layer.add(menuLabel);

    var circle = sc.insideMenuCircle("yellow");
    layer.add(circle);

    var textInCircle = sc.textInCircle(numberRequired.toString());
    layer.add(textInCircle);

    var next = sc.menuButton("GO");
    layer.add(next);

    next.on("click touchend", function () {
        layer.remove(".menuStar");

        globals.kineticStage.remove(layer);
        globals.kineticGameLayer.draw();
        startLevel();
    });

    // Animate the menu
    animateMenu(layer);
}

function animateMenu(layer) {
    var menuStar = layer.get(".menuStar")[0];
    menuStar.setAlpha(0);
    var objs = layer.get(".menu");

    for (loopy = 0; loopy < objs.length - 1; loopy++) {
        var o = objs[loopy];

        o.setAlpha(1);
        o.transitionTo({
            alpha: 1,
            duration: .5
        });
    }

    animateSun  = true;
    setTimeout(function () {
        menuStar.setAlpha(1);
        layer.draw();
    }, 550); 
}

function levelComplete() {
    playYeah();

    stopGameFromRunning();
    // Wait a second for the add score graphic to finish
    setTimeout("levelCompleteMenu()", 500);
}

function levelCompleteMenu() {
    // Add a new layer so we can remove this junk later
    var layer = new Kinetic.Layer();
    globals.kineticStage.add(layer);

    // Surrounding circle and star
    var menuStar = sc.menuStar("green");
    layer.add(menuStar);

    var menuCircle = sc.menuCircle("green");
    layer.add(menuCircle);

    var menuText = sc.menuText("LEVEL " + globals.allLevels.currentlevel + " COMPLETE", 21);
    layer.add(menuText);

    var menuLabel = sc.menuLabel("BONUS POINTS");
    layer.add(menuLabel);

    var circle = sc.insideMenuCircle("green");
    layer.add(circle);

    // Bonus points calculation
    var d = new Date();
    var timeNow = d.getTime();
    var diffMs = timeNow - currentLevelTimeStarted;
    var diffSeconds = diffMs / 1000;

    var bonus = 0;
    if (diffSeconds > 0) {
        bonus = diffSeconds * globals.currentLevel.bonusPointsPerSecond;
    }
    bonus = Math.round(bonus);
    if (bonus > 100) bonus = 100;

    totalGameScore += bonus;
    drawScore(0);

    var textInCircle = sc.textInCircle(bonus.toString());
    
    layer.add(textInCircle);

    var next = sc.menuButton("GO");
    layer.add(next);

    // What to do on click
    next.on("click touchend", function () {
        globals.kineticStage.remove(layer);

        startLevelScreen();
    });

    // Animate the menu
    animateMenu(layer);
}

// Start the next level
function startLevel() {
    animateSun  = false;

    // Clear the blocks
    levelScore = 0;
    shuffle(false);
    drawScore(0);
    globals.kineticGameLayer.draw();

    currentColumn = 1;
    dropNextBlock();

    startGameIntervals();
}

function startGameIntervals() {
    // Gameloop ever 1ms
    intervalBlockLoop = setInterval(function () { dropNextBlock() }, globals.currentLevel.dropTimeMs);
    globals.gameRunning = true;
    scoreObject.showButtons();

    animateSun = false;

    var d = new Date();
    currentLevelTimeStarted = d.getTime();
}

// Calculate what number is required
function calculateNumberRequired() {
    var randomNumber = Math.floor(Math.random() * (globals.currentLevel.maxNum - globals.currentLevel.minNum + 1));

    randomNumber += globals.currentLevel.minNum;

    scoreObject.setNumberRequired(randomNumber);

    return randomNumber;
}

// Generate block number
function generateRandomBlock() {
    var maxNum = numberRequired;

    if (maxNum > 9) maxNum = 9;
    var randomnumber = Math.floor(Math.random() * maxNum);

    return randomnumber + 1;
}



﻿

﻿/// <reference path="libs/jquery/jquery-1.7.2.js" />
/// <reference path="libs/kinetic/kinetic-v3.10.3.js" />
/// <reference path="block.js" />
/// <reference path="globals.js" />
/// <reference path="main.js" />
/// <reference path="game.js" />
/// <reference path="libs/pxloader/PxLoader.js" />
/// <reference path="libs/pxloader/PxLoaderImage.js" />
/// <reference path="libs/pxloader/PxLoaderSound.js" />
/// <reference path="libs/pxloader/PxLoaderVideo.js" />
/// <reference path="assetPreload.js" />
/// <reference path="utils.js" />
/// <reference path="score.js" />
/// <reference path="shapeCreator.js" />
/// <reference path="levels.js" />
/// <reference path="menu.js" />
/// <reference path="animationHelper.js" />
/// <reference path="libs/cordova/cordova-1.9.0.js" />
/// <reference path="phonegapmethods.js" />
/// <reference path="stickers.js" />


﻿/// <reference path="refs.js" />
function getCurrentMilliseconds() {
    return new Date().getTime();
}


function runningInChrome() {
    var s = navigator.userAgent;
    s = s.toUpperCase();

    return 0;		//XDK

    if (s.indexOf("CHROME") != -1) {
        return 1;
    }
    else {
        return 0;
    }
}


﻿/// <reference path="refs.js" />
function blockType(row, col, numberOnBlock) {
    this.globals = globals;
    this.row = row;
    this.col = col;
    this.numberOnBlock = numberOnBlock;
    this.selected = false;
    this.active = false;
    this.finalXPosition = (this.col - 1) * globals.blockWidth;        
    this.finalyYPosition = (this.row- 1) * globals.blockHeight;       
    this.image = null;
    this.moving = false;
    
    // Debug function
    this.debug = function () {
        return this.globals.screenX;
    }

    this.clicked = function () {
        if (globals.gameRunning) {
            if (this.selected) {
                this.selected = false;
            }
            else {
                this.selected = true;
            }
            this.changeImage();
        }
    }

    this.addKineticImage = function () {
        imageObj = new Image();

        var t = this;           // So we can use in the var below!

        var image = new Kinetic.Image({
            x: t.finalXPosition,
            y: t.finalyYPosition,
            image: globals.imageArray[0],
            width: globals.blockWidth,
            height: globals.blockHeight,
            listening: false,
            alpha: 0
        });

        image.setListening(true);

        image.on("click touchend", function () {
            t.clicked();
        });
        
        // add the shape to the layer
        globals.kineticGameLayer.add(image);

        // Put this image back in the object of the class
        t.image = image;

        // Do a draw to get us going!
        globals.kineticGameLayer.draw();
    }

    this.changeImage = function () {
        if (this.selected) {
            this.image.attrs.image = globals.imageArraySelected[this.numberOnBlock - 1];
        }
        else {
            this.image.attrs.image = globals.imageArray[this.numberOnBlock - 1];
        }
        globals.kineticGameLayer.draw();
    }

    // Startrow = 0 means off screen
    this.move = function (startRow, endRow, numberOnBlock, delayMs, selected) {
        this.numberOnBlock = numberOnBlock;
        this.active = true;
        this.selected = selected;
        this.changeImage();

        // Calculate time to move
        var timeMove = (endRow - startRow) / globals.numRows * globals.animationSpeedTopBottomMs;

        // What animation do we want
        var animationType = "bounce-ease-out";
        if (endRow == globals.numRows) {
            animationType = "bounce-ease-out";
        } 

        // What row to start from
        var startY = (startRow - 1) * globals.blockHeight;

        // What row to end with
        var endY = (endRow - 1) * globals.blockHeight;

        // Move!  //TO DO DELAY!
        this.image.setY(startY);
        this.image.setAlpha(1);

        this.moving = true;
        var t = this;

        this.image.transitionTo({
            y: endY,
            duration: timeMove/1000,
            easing: animationType,
            callback: function () {
                t.moving = false;
            }
        });
    }

    this.deactivate = function () {
        this.active = false;
        this.image.transitionTo({
            alpha: 0.0,
            duration: .4
        });
    }

    this.shuffle = function (newNumber) {
        var t = this;

        // If moving don't change
        if (!t.moving) {
            this.image.transitionTo({
                alpha: 0.0,
                duration: .2,
                callback: function () {
                    t.numberOnBlock = newNumber;
                    t.selected = false;
                    t.changeImage();
                    t.image.transitionTo({
                        alpha: 1.0,
                        duration: .2
                    }
                    )
                }
            });
        }
    }
}


﻿
