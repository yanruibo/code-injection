
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());



function resizeGame() {

    var gameArea = document.getElementById('gameZone');
    var widthToHeight = 4 / 3;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;
    
    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        gameArea.style.height = newHeight + 'px';
        gameArea.style.width = newWidth + 'px';
    } else {
        newHeight = newWidth / widthToHeight;
        gameArea.style.width = newWidth + 'px';
        gameArea.style.height = newHeight + 'px';
    }
    
    gameArea.style.marginTop = (-newHeight / 2) + 'px';
    gameArea.style.marginLeft = (-newWidth / 2) + 'px';
    
    var gameCanvas = document.getElementById('game_canvas');
    gameCanvas.width = newWidth;
    gameCanvas.height = newHeight;
}
			
					window.addEventListener('resize', resizeGame, false);
					window.addEventListener('orientationchange', resizeGame, false);
					window.addEventListener('load', resizeGame, false);








      
        var onDeviceReady = function() {
            document.getElementById("devready").innerHTML = "OnDeviceReady fired.";
        };

        function bugStart() {
            document.addEventListener("deviceready", onDeviceReady, true);
			
        }   
			


$(document).ready(function(){

				$(window).load(function(){
				 
					var canvas = $("#game_canvas");
					var context = canvas.get(0).getContext("2d");
					
					var canvasWidth = canvas.width(); 
					var canvasHeight = canvas.height();
				
					var rocket;
					var bigRocket;
					var Star;
					var stars;
					var numStars;
					var starImg;
					var playGame = false;
					var Asteroid;
					var asteroids;
					var numAsteroids;
					var astImage;
					var score;
					var cScore;
					var mScore;
					var scoreTimeout;
					var imgData;
					var fX;
					var checkFrame =0;
					var aCount = 0;
					var fps = 33;
					var now;
					var then;
					var delta;
					var gameOverImg;
					var dist;
					var gCoin;
					var coins;
					var numCoins;
					var coinImg;
					var hud;
					var speedUp;
					localStorage.bigScore;
					
	
					var startButton = $("#startButt");
					var highScores = $("#highScores");
					var newHighScore = $(".newScore");
					var thisScore = $("#highSc");
					var replay = $("#replay");
					var menu = $("#menu");
					var press = $("#pressMe");
					var startScreen = $("#startScreen");
					var stats = $("#statsPanel");
					var resetGame = $("#reset");
					var gameOver = $("#gameOver");
					var touch = $("#touchMe");
					var uiScore = $(".gameScore");
					var coinScore = $(".coiny");
					var startM = $("#startMusic").get(0);
					var gameM = $("#inGameM").get(0);
					var thrust = $("#thruster").get(0);
					var coinS = $("#coinSound").get(0);
					var bigStart = $("#bigStart").get(0);
					var gameEnd = $("#endGame").get(0);
					var endScore = $(".endScore");
					var endHighScore = $("#dispScore");
					var touchThrust = $("#thrust");
					
					var mouseDown;
					var touchTap;
				
					
					var Star = function(x, y, width, height, vX, vY){
					this.x = x;
					this.y = y;
					this.width = width;
					this.height = height;
					this.vX = vX;
					this.vY = vY;
					
					};
					
					var Asteroid = function(x, y, vX,fCount,fCount,width,height){
					this.x = x;
					this.y = y;
					this.vX = vX;
					this.fCount =0;
					this.width;
					this.height;

	
					};
					
					var Ship = function(x,y,vX,vY,width,height){
					this.x = x;
					this.y = y;
					this.vX = vX;
					this.vY = vY;
					this.width;
					this.height;
					this.halfWidth;
					this.halfHeight;
	
					};
					
					var gCoin = function(x,y,vX,radius) {
					this.x = x;
					this.y = y;
					this.vX = vX;
					this.radius = radius;			
					};
					
					var hudView = function(x,y,width,height){
					this.x = x;
					this.y = y;
					this.width = width;
					this.height = height;
					};
					
					
					replay.click(function(e) {
							playGame = false;
							startGame();
							coinScore.html("0");
							endScore.hide();
							endHighScore.hide();
							score = 0;
							cScore = 0;
							mScore = 0;
							
						});
						
					menu.click(function(e) {
							e.preventDefault();
							startScreen.show();
							gameOver.hide();
							thisScore.show();
							newHighScore.show();
							init();
						});	
						
						startButton.click(function(e) {
							e.preventDefault();
							startScreen.hide();
							startButton.hide();
							highScores.hide();
							startGame();
							coinScore.html("0");
							mScore = 0;
							cScore = 0;
							
							
						});
							

					
					function init(){
							

							newHighScore.html(localStorage.getItem("bigScore"));
							playGame = false;
							
							startM.play();
							uiScore.html("0");
							coinScore.html("0");
							endScore.html("0");
	
							cScore = 0;
						
							gameOver.hide();
							resetGame.hide();
							stats.hide();
							startButton.show();
							highScores.show();
							replay.hide();
							menu.hide();
							endScore.hide();
							endHighScore.hide();
							touchThrust.hide();
							
						
	
					};
					
					
					function startGame(){
						
						
						startM.pause();
						bigStart.play();
					
						gameM.play();
						startScreen.hide();
						stats.show();
						replay.hide();
						menu.hide();
					
						newHighScore.hide();
						thisScore.hide();
						coinScore.html("0");
						score = 0;
						cScore = 0;
						mScore = 0;
						
						starImg = new Image();
						starImg.src ="star.png"
						
						rocket = new Image();
						rocket.src ="yellow_ship.png";
						
						astImage = new Image();
						astImage.src = "asteroid_sheet.png";
						
						dist = new Image();
						dist.src = "distance.png";
						
						coinImg = new Image();
						coinImg.src = "coinIm.png";
						
						hud = new Image();
						hud.src = "hud.png";
			
						gameOverImg = new Image();
						gameOverImg.src = "game_over_pic.png";
						
						speedUp = new Image();
						speedUp.src = "speed_up.png";

						bigRocket = new Ship(canvasWidth/15,canvasHeight/2-canvasHeight/2,50,0,0);
					
						gameOver.hide();
						resetGame.hide();
						touch.hide();
						touchThrust.show();
						
						stars = new Array();
						numStars = 25;
						numAsteroids = 5;
						playGame = true;
						mouseDown = false;
						touchTap = false;
						asteroids = new Array();
						score = 0;
						cScore = 0;
						coins = new Array();
						numCoins = 1;
		
					//set up initial stars------------------------
					for(var i = 0; i < numStars; i++){
						var x = Math.random()*canvasWidth;
						var y = Math.random()*canvasHeight;
						var width = height = +2+Math.random()*6;
						var vX = -3.5+Math.random()*-4;
						var vY =0;
					
					//--------------------------------------------
					//push new object into aray with above parameters
					
						stars.push(new Star(x, y, width, height, vX, vY));
					
						};// end loop
						
					//set up asteroids ---------------------------
		
					for(var i =0; i < numAsteroids; i++){
						var x = +canvasWidth/7+Math.random()*canvasWidth+canvasWidth/2;
						var y = -canvasHeight/7+Math.random()*canvasHeight-canvasHeight/8;
						var vX = -3;
						var fC = 0;
						
	
						asteroids.push(new Asteroid(x, y, vX, fC));
						
						};// end loop
						
					//set up coins
					
					for(var i =0; i < numCoins; i++){
					
						var x = Math.random()*canvasWidth+canvasWidth/2;
						var y = Math.random()*canvasHeight;
						var vX = -3;
						var radius = 50;
						
						coins.push(new gCoin(x,y,vX,radius));
					
						};

							//event listener----------------
						$(touchThrust).bind('touchstart',function(e){
						
							e.preventDefault();
							touchTap = true;
				
						});
						
						$(touchThrust).bind('touchend',function(e){
						
							e.preventDefault();
							touchTap = false;
				
						});
						
						$(touchThrust).bind('tap', function(e){
							
							e.peventDefault();
						
						});

						$(touchThrust).mousedown(function(e){
				
							e.preventDefault();
							mouseDown = true;
							
						});
						
						$(touchThrust).mouseup(function(e){
			
							e.preventDefault();
							mouseDown = false;
							
						});

						$(canvas).mousedown(function(e){
								
								e.preventDefault();
								mouseDown = true;
						});
						
						$(canvas).mouseup(function(e){
								
								e.preventDefault();
								mouseDown = false;
								
						});
						
						$(canvas).bind('tap', function(e){
						
							e.preventDefault();
						
						});
						
						
						//------------------------------
						
								animate();
								timer();
								
					};
					
					function timer(){
						if(playGame){
							scoreTimeout = setTimeout(function(){
								uiScore.html(++score);
					
						timer();
						}, 90);
						
					} else {
					
							gameM.pause();
							gameEnd.play();
							replay.show();
							menu.show();
							mScore = cScore *10;
							
							score += mScore;
							
							endScore.html(score);
							endHighScore.show();
							endScore.show();

							
							
							if(score > localStorage.getItem("bigScore")){
								
								localStorage.setItem("bigScore", score);
								
								};	
					};
				};
					
				
					
					
					function animate(){
		
						var canvasWidth = canvas.width(); 
						var canvasHeight = canvas.height();
	
						var starsLength = stars.length;
						
						
						context.clearRect(0, 0, canvasWidth, canvasHeight);
					
						bigRocket.y += bigRocket.vY;
						
						for(var i =0; i < starsLength; i++){
						
						tmpStars = stars[i]; //create and update tmpstars variable with array element
						tmpStars.x += tmpStars.vX; //on each call to animate add and update tmpstars position
		
						
						if(tmpStars.x+tmpStars.width < 0){//reset stars as they leave screen right
						
							tmpStars.x = canvasWidth+tmpStars.width;
							tmpStars.y = Math.random()*canvasHeight;
							tmpStars.vX = -3.5+Math.random()*-4;
					
						};//------------------------------------------------------------------------
						
						context.fillStyle = "rgb(255,255,255)";
						
						//draw stars with objects parameters
						context.drawImage(starImg,tmpStars.x, tmpStars.y, canvasWidth/110, canvasHeight/110);
						
						};
						
						var asteroidsLength = asteroids.length;
						
						for(var i=0; i < asteroidsLength; i++){
						
						tmpAsteroid = asteroids[i];
						tmpAsteroid.x += tmpAsteroid.vX;
						
						if(score > 1999 && score < 2010){
						
							tmpAsteroid.vX = -5;
							tmpCoin.vX = -5;
							context.drawImage(speedUp,Math.floor(canvasWidth/2.5),Math.floor(canvasHeight/4),canvasWidth/6,canvasHeight/7);
						};
						
						if(score > 4999 && score < 5010){
							tmpAsteroid.vX = -7;
							tmpCoin.vX = -7;
							context.drawImage(speedUp,Math.floor(canvasWidth/2.5),Math.floor(canvasHeight/4),canvasWidth/6,canvasHeight/7);
						};
						
						
						
						if(score > 19999 && score < 20010){
						
							tmpAsteroid.vX = -10;
							tmpCoin.vX = -10;
							context.drawImage(speedUp,Math.floor(canvasWidth/2.5),Math.floor(canvasHeight/4),canvasWidth/6,canvasHeight/7);
							
						
						};
						
					
						
						tmpAsteroid.width = Math.floor(canvasWidth/7);
						tmpAsteroid.height = Math.floor(canvasHeight/7);
						
						
						if(tmpAsteroid.x+tmpAsteroid.width < 0){//reset asteroids
							
							tmpAsteroid.x = +canvasWidth/7+tmpAsteroid.width+canvasWidth+Math.random()*canvasWidth;
							tmpAsteroid.y = -canvasHeight/8+bigRocket.height+Math.random()*canvasHeight;
							tmpAsteroid.vX = -3;
							tmpAsteroid.fCount =0;
						
						};

						
						//asteroid animation and movement------------
						
						fX = (tmpAsteroid.fCount % 13) * 202;//each count move 189 pixels across
					
					
						context.drawImage(astImage,fX,0,185,190,tmpAsteroid.x,tmpAsteroid.y,tmpAsteroid.width,tmpAsteroid.height);
						//draw image, frame x co-ord, frame y co-ord, width of frame, height of frame, tmpAsteroidX, tmpAsteroidY, width of asteroid, height of asteroid.
	
						if(tmpAsteroid.fCount == 13)
								tmpAsteroid.fCount = 0;
							else
								tmpAsteroid.fCount++;
								
						//--------------------------------------------

						};
						
						//draw and reset coins
						
						var coinsLength = coins.length;
						
						for(var i =0; i < coinsLength; i++){
						
						tmpCoin = coins[i];
						tmpCoin.x += tmpCoin.vX;
						
						context.lineWidth = 5;
						context.strokeStyle = "rgb(255,215,0)";
						context.fillStyle = "rgb(255,255,0)";
						context.beginPath()
						context.arc(tmpCoin.x,tmpCoin.y,canvasWidth/50,0,Math.PI*2,false);
						context.arc(tmpCoin.x,tmpCoin.y,canvasWidth/90,0,Math.PI*2,false);
						context.closePath();
						context.fill();
						context.stroke();
						
						
							if(tmpCoin.x+tmpCoin.radius < 0){
							
							tmpCoin.x = canvasWidth+Math.random()*canvasWidth;
							tmpCoin.y = Math.random()*canvasHeight;
							tmpCoin.vX = -3;
							};
							
							
							// coin and rocket collision 
							
							if(!(tmpCoin.x+tmpCoin.radius < bigRocket.x) &&
							  !(bigRocket.x+bigRocket.width < tmpCoin.x) &&
							  !(tmpCoin.y+tmpCoin.radius < bigRocket.y) &&
							  !(bigRocket.y+bigRocket.height < tmpCoin.y)){
							  
								tmpCoin.x = canvasWidth+Math.random()*canvasWidth;
								tmpCoin.y = +canvasHeight/8+Math.random()*canvasHeight-canvasHeight/8;
				
								coinS.play();
								
								
									coinScore.html(++cScore);
					
							};
							
							//coin and asteroid collision
							
							if(!(tmpCoin.x+tmpCoin.radius < tmpAsteroid.x) &&
							   !(tmpAsteroid.x+tmpAsteroid.width < tmpCoin.x) &&
							   !(tmpCoin.y+tmpCoin.radius < tmpAsteroid.y) &&
							   !(tmpAsteroid.y+tmpAsteroid.height < tmpCoin.y)) {
							   
								tmpCoin.x = canvasWidth+Math.random()*canvasWidth;
								tmpCoin.y = +canvasHeight/8+Math.random()*canvasHeight-canvasHeight/8;
				
							   
							   };
		
						};
			
						//--------------------------------------------
					
						
						//draw a rocket -----------------------------
						
						bigRocket.width = Math.floor(canvasWidth/9);
						bigRocket.height = Math.floor(canvasHeight/7);
						bigRocket.halfWidth = Math.floor(canvasWidth/27);
						bigRocket.halfHeight = Math.floor(canvasWidth/25);
				
						
						
						context.drawImage(rocket, bigRocket.x, bigRocket.y,bigRocket.width,bigRocket.height);
						
						//--------------------------------------------
						

						if(mouseDown){// check for mouse click down
						
							bigRocket.vY = -6;
						
							} else {
							bigRocket.vY = 4;
						};
						
						if(touchTap){//touch event
						
							bigRocket.vY = -6;
							
							} else {
							
							bigRocket.vy = 4;
						};
						//------------------------------------------
						
						//check for bounderies--------------------->
						
						if(bigRocket.y < 0){
						
							bigRocket.y = 0;
						};
						
						if(bigRocket.y+bigRocket.height > canvasHeight+canvasHeight/10){
						
						
							
							playGame = false;
		
							context.drawImage(gameOverImg,Math.floor(canvasWidth/2.5),Math.floor(canvasHeight/8),canvasWidth/6,canvasHeight/6);
					
						};
						
						
						//colision with asteroids
						
						for(var i =0; i < asteroidsLength; i++){
						
							tmpAsteroid = asteroids[i];
						
						if(!(bigRocket.x+bigRocket.width-Math.round(canvasWidth/17) < tmpAsteroid.x) &&
						   !(tmpAsteroid.x+tmpAsteroid.width-Math.round(canvasWidth/17) < bigRocket.x) &&
						   !(bigRocket.y+bigRocket.height-Math.round(canvasWidth/17) < tmpAsteroid.y) && 
						   !(tmpAsteroid.y+tmpAsteroid.height-Math.round(canvasWidth/17) < bigRocket.y)){
	
							playGame = false;
							
		
							context.drawImage(gameOverImg,Math.floor(canvasWidth/2.5),Math.floor(canvasHeight/8),canvasWidth/6,canvasHeight/6);
							};
					
						};			
						//---------------------------------------------------------------------------

						if(mouseDown) {
						
						
							thrust.play();
							
							context.save();
							context.translate(bigRocket.x+bigRocket.halfWidth, bigRocket.y+bigRocket.halfHeight);
							
				
							context.fillStyle = "orange";
							context.beginPath();
							context.arc(canvasWidth/60,canvasHeight/10,canvasWidth/90,0,Math.PI*2, false);
							context.closePath();
							context.fill();
							context.strokeStyle = "rgb(255,255,150)";
							context.lineWidth = 5;
							context.stroke();
							
							context.restore();
						
						} else {
						
							thrust.pause();
						};
						
						
						then = now;

						
						if(playGame){

								setTimeout(function() {
									requestAnimationFrame(animate);
									// Drawing code goes here
								}, 1000 / fps);
							
								
						};
						
					
						
						aCount++;
						
					};
					
			
					init();
		
	});

});



