

	var etags = document.getElementsByTagName('embed');
	var itags = document.getElementsByTagName('iframe');
	processEmbeds(etags);
	processEmbeds(itags);
	function processEmbeds(earr) {
		for(var i = 0; i < earr.length; i++) {
			var eobject = earr[i];
			var esrc = eobject.src;
			if(esrc.indexOf('www.youtube.com') != -1) {
				var vid = '';
				var parentRepl = eobject.parentNode;
				var sind = 0;
				var tind = 0;
				if(esrc.indexOf('/embed/') != -1) {
					sind = esrc.indexOf('/embed/') + 7;
					tind = esrc.indexOf('?');
					if(tind == -1) {
						tind = esrc.length;
					}
				} else {
					if (parentRepl.tagName.toLowerCase() == 'object') {
						parentRepl = parentRepl.parentNode;
						eobject = eobject.parentNode;
					}
					sind = esrc.indexOf('/v/') + 3;
					tind = esrc.indexOf('?');
				}
				vid = esrc.substring(sind, tind);

				var width = eobject.width;
				var height = eobject.height;
				
				if(parseInt(width) < 100) {
					width = '100';
				}
				
				if(parseInt(height) < 100) {
					height = '100';
				}

				var image = '<img width=\"' + width + '\" height=\"' + height + '\" src=\"http://img.youtube.com/vi/' + vid + '/0.jpg\" alt=\"YouTube.com\">';

				var youtubeLink = document.createElement('a');
				youtubeLink.innerHTML = image;
				youtubeLink.href = 'ytube:http://www.youtube.com/watch?v=' + vid;

				parentRepl.replaceChild(youtubeLink, eobject);
				i = -1;
			}
		}
	}


    window.onload = function()
    {
        var pUrl = "";
        var hdiv = document.getElementById("hiddendivid");
        if (hdiv != null)
        {
            pUrl = (hdiv.innerText) ? hdiv.innerText : hdiv.textContent;
        }
        if (pUrl != "" && top === self)
        {
            window.location = pUrl;
        }
    }
  







    window.onload = function()
    {
        var pUrl = "";
        var hdiv = document.getElementById("hiddendivid");
        if (hdiv != null)
        {
            pUrl = (hdiv.innerText) ? hdiv.innerText : hdiv.textContent;
        }
        if (pUrl != "" && top === self)
        {
            window.location = pUrl;
        }
    }
  


 
 function UTypeColor(newBoxImg,newType) {
    // Assign the properties
    this.boxImg = newBoxImg;
    this.type = newType;
  }
  
  function Cell(newX, newY, newImg, newEmpty, newParent,newParentWidth,newCssStyle) {
    // Assign the properties
    this.x = newX;
    this.y = newY;
    this.boxImg = newImg;
    this.empty = newEmpty;
    this.parent = newParent;
    this.parentWidth = newParentWidth;
    this.cssStyle = newCssStyle;
  } 
 
  //check is the cell empty
  Cell.prototype.isNotEmpty = function() {
    return this.empty; 
  }
 
  //set ParentWithd
  Cell.prototype.SetParentW = function(newParentWidth) {
    this.parentWidth = newParentWidth;
  }
  
  //set the cell color and state
  Cell.prototype.SetColorState = function(newBoxImg,newState) {
    this.boxImg = newBoxImg;
    this.empty = newState;
    document.getElementById("cell"+this.parent+(this.x*this.parentWidth  + this.y )).src = this.boxImg ;
  };

//set only state
  Cell.prototype.SetState = function(newState) {
    this.empty = newState;
    //document.getElementById("cell"+this.parent+(this.x*this.parentWidth  + this.y )).src = "tetrisgamepage" + this.color +this.boxSize + "Box.png";
  };
  // draw the cell	
  Cell.prototype.Draw = function() {
    document.getElementById("cell"+this.parent+(this.x*this.parentWidth + this.y )).src = this.boxImg ;
  };
  // Return a formatted HTML representation of the cell entry
  Cell.prototype.toHTML = function() {
    var cellHTML = "";
    return cellHTML = "<img id=\"cell"+ this.parent + (this.x*this.parentWidth  + this.y) +"\" src=\"" + this.boxImg  + "\" class=\""+this.cssStyle+"\" alt=\"\" />";
  };
  
  // Block object constructor
  function Block(newX,newY,newType,newParent,newParentW,newBoxImg,newCssStyle) {
    // Assign the properties
    this.x = newX;
    this.y = newY;
    this.r = 0;
    this.type = newType;
    this.Height = 0;
    this.Width = 0;
    this.Parent = newParent;
    this.ParentW = newParentW;
    this.UpdateWH();
    this.boxImg = newBoxImg;
    this.cssStyle = newCssStyle;
  }
  
  //  Return a formatted HTML representation of the block entry
  Block.prototype.setCell = function (uX,uY,newCssStyle){
    
   
   //console.info("Function set cell. %s ((uX*this.ParentW + uY)) (%d*%d + %d) = %d",this.Parent,uX,this.ParentW,uY,uX*this.ParentW + uY);
   var currentCell = document.getElementById("cell"+this.Parent+(uX*this.ParentW + uY));
   //if(uX!=-1||uY!=-1){
   	if(currentCell!=null)
   		currentCell.src = this.boxImg;
   	//document.getElementById("cell"+this.Parent+(uX*this.ParentW + uY)).class = newCssStyle;
   //}
  }    
	// draw the block
    Block.prototype.Draw = function() {
      
      for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
          if(this.type[this.r]&(1<<(i*4+j)))
            this.setCell(this.x + i,this.y + j,this.cssStyle);
        }
      }		
      
    };

// change Height and Width of the block after rotation
  Block.prototype.UpdateWH = function() {
    
    this.Height = 0;
    this.Width = 0;
    for(var i=0;i<4;i++){
      for(var j=0;j<4;j++){
        if(this.type[this.r]&(1<<(i*4+j))){
          if(this.Height < i) this.Height = i ;
          if(this.Width < j) this.Width = j ;
          
        }	
      }
    }		
    this.Height+=1;
    this.Width+=1;
  };
  
  //  Move the Block Down
  Block.prototype.StepDown = function() {
    
    this.x++;
  };
  
  //  Move the Block Right
  Block.prototype.StepRight = function() {
    
    this.y++;
  };
  
  //  Move the Block Left
  Block.prototype.StepLeft = function() {
    this.y--;
  };
  
  //  Rotate the Block
  Block.prototype.Rotate = function() {
    this.r++;
    this.r = (this.r > 3)? 0 : this.r;
    this.UpdateWH();
  };
  
  //  get the current Block
  Block.prototype.getBlock = function() {
    return this.type[this.r];
  };
  
 
  
 
  // Court object constructor create a court
  function Court(newWidth,newHeight,newActiveBlock,newElementID,newCssStyle){
    this.Width = newWidth;
    this.Height = newHeight;
    this.ActiveBlock = newActiveBlock;
    this.Frame = new Array(newWidth*newHeight);
    this.elementID = newElementID;
    this.cssStyle = newCssStyle;
    this.fullRefresh = false;
  };
 
   Court.prototype.setHeight = function(newHeight){
 	this.Height = newHeight;
 }; 
  //Initialize the Court
  Court.prototype.Init = function () {
    var initFrame = "";
    
  // console.info(this.Height);
    // Generate the  HTML code on the page
    for(var i=0; i<this.Height; i++){
      for(var j=0;j<this.Width;j++){
        this.Frame[i*this.Width + j] = new Cell(i,j,"tetrisgamepageblack24Box.png",false,this.elementID,this.Width,this.cssStyle);
        initFrame +=this.Frame[i*this.Width +j].toHTML();
      }
      initFrame +="<br/>";
     }
    //console.info("")
 
     
    // Set the  HTML code on the page
    var tetrisFrame = document.getElementById(this.elementID);
    
    if(tetrisFrame==null)
    	alert("tetrisFrame is NULL!");
    tetrisFrame.innerHTML = initFrame; 
    this.ActiveBlock.x = 0;
    this.ActiveBlock.y = 0;

  };
  
  // Set the  active block of the court
  Court.prototype.setActiveBlock = function (newActiveBlock) {
    
    this.ActiveBlock = newActiveBlock;
    this.ActiveBlock.Parent = this.elementID;
    this.ActiveBlock.ParentW = this.Width;
  	this.ActiveBlock.cssStyle = this.cssStyle;
    //console.info("setActiveBlock %s:",newActiveBlock.boxImg);
    
    this.ActiveBlock.boxImg = newActiveBlock.boxImg;
    
  };
  
  // Update the user?s court
  Court.prototype.Refresh = function () {
    
   if(this.fullRefresh)
    for(var i=0; i<this.Height; i++){
      for(var j=0;j<this.Width;j++){
        if(!this.Frame[i*this.Width + j].isNotEmpty())
          this.Frame[i*this.Width + j].SetColorState("tetrisgamepageblack24Box.png",false);
        this.Frame[i*this.Width + j].Draw();
      }
    }else{
    
    var xStart = this.ActiveBlock.x>1 ? this.ActiveBlock.x - 1 : 0;
    var yStart = this.ActiveBlock.y>1 ? this.ActiveBlock.y-1 : 0;
    
    var xEnd = this.ActiveBlock.x + this.ActiveBlock.Height >= this.Height ? this.Height : this.ActiveBlock.x + this.ActiveBlock.Height;
    var yEnd = this.ActiveBlock.y + this.ActiveBlock.Width >= this.Width ? this.Width : this.ActiveBlock.y + this.ActiveBlock.Width+1;
    
    
    for(var i=xStart; i<xEnd; i++){
      for(var j=yStart;j<yEnd;j++){
        if(!this.Frame[i*this.Width + j].isNotEmpty())
          this.Frame[i*this.Width + j].SetColorState("tetrisgamepageblack24Box.png",false);
        this.Frame[i*this.Width + j].Draw();
      }
    }
    
    }
    this.ActiveBlock.Draw();
  };
  
  // Merge the Active Block with building 
  Court.prototype.Merge = function () {
    
    for(var i = this.ActiveBlock.x + this.ActiveBlock.Height; i > this.ActiveBlock.x; i--){
      for(var j = this.ActiveBlock.y + this.ActiveBlock.Width; j > this.ActiveBlock.y ; j--){
        if(this.ActiveBlock.getBlock()&(1<<((i-1-this.ActiveBlock.x)*4+j-1-this.ActiveBlock.y)))
          this.Frame[(i-1)*this.Width + j-1].SetColorState(this.ActiveBlock.boxImg,true);
      }
    }
    this.fullRefresh = true;
    
  };
  
  //Check if the ActiveBlock reached the RightMargins
  Court.prototype.isRightMargin = function () {
    
    if((this.ActiveBlock.y + this.ActiveBlock.Width) < this.Width)
      return 0; //Can move
    return 1;
  };
  
  //Check if the ActiveBlock reached the LeftMargins
  Court.prototype.isLeftMargin = function () {
    
    if((this.ActiveBlock.y) > 0)
      return 0; //Can move
    return 1;
  };
  
  //Check if the ActiveBlock reached the BottomMargins
  Court.prototype.isBottomMargin = function () {
    
    if((this.ActiveBlock.x + this.ActiveBlock.Height) < this.Height )
      return 0; //Can move
    return 1;
  };
  
  //Check if there is a not empty cell on the Left of the ActiveBlock
  Court.prototype.isLeftBlock = function () {
    
    var xB = this.ActiveBlock.x-1 + 4;
    for(var i = 12; i >= 0; i-=4){
     
      if(this.Frame[xB*this.Width+this.ActiveBlock.y-1].isNotEmpty()&&(this.ActiveBlock.getBlock()&(1<<i))){
        return 1;
      }
      xB--;
    }	
    return 0;
  };
  
  //Check if there is a not empty cell on the Right the ActiveBlock
  Court.prototype.isRightBlock = function () {
    
    var xB = this.ActiveBlock.x-1 + 4;
    for(var i = 12 + this.ActiveBlock.Width -1; i >= 0; i-=4){
      if((this.Frame[xB*this.Width+this.ActiveBlock.y + this.ActiveBlock.Width].isNotEmpty())&&((this.ActiveBlock.getBlock())&(1<<i))){
        return 1;
      }
      xB--;
    }
    return 0;
  };
  
  //Check if there is a not empty cell under	the ActiveBlock
  Court.prototype.isAnotherBlock = function () {
    
    for(var i = this.ActiveBlock.x + this.ActiveBlock.Height; i > this.ActiveBlock.x; i--){
      for(var j = this.ActiveBlock.y + this.ActiveBlock.Width; j > this.ActiveBlock.y ; j--){
        if(this.Frame[i*this.Width + j-1].isNotEmpty()&&(this.ActiveBlock.getBlock()&(1<<((i-1-this.ActiveBlock.x)*4+j-1-this.ActiveBlock.y)))){
          return 1;
        }
      }	
      
    }
    
    return 0;
  };
  
  //  Move the Active Block Down
  Court.prototype.NextStep = function () {
    
    this.ActiveBlock.StepDown();
  };
  
  //  Move the Active Block Down
  Court.prototype.StepDown = function () {
    
    this.ActiveBlock.StepDown();
  };
  //  Move the Active Block to the Right
  Court.prototype.StepRight = function () {
    
    this.ActiveBlock.StepRight();
  };
  
  //  Move the Active Block to the Left
  Court.prototype.StepLeft = function () {
    
    this.ActiveBlock.StepLeft();
  };
  
  // Rotate the Active Block
  Court.prototype.Rotate = function () {
    
    this.ActiveBlock.Rotate();
    var tempY = this.ActiveBlock.y ;
    //  Move the Activ Block Left if it is out of leftMargins
    for(i=0;i<tempY+this.ActiveBlock.Width - this.Width;i++){
      this.ActiveBlock.StepLeft();
      this.fullRefresh = true;
    }
  };
  
  //  Genereta new ActiveBlock
  //blockNum ==-1 a random block from an user defined array
  //blockNum != -1 user chooses what the block will be created
  Court.prototype.GenerateNewBlock = function (newTypeColor) {
    
    var arrayBlocks = [[4896,25344,4896,25344],[4369,61440,4369,61440],[4880,9984,8992,29184],
                       [13056,13056,13056,13056],[4400,18176,12832,28928],[8752,29696,12560,5888],
                       [8976,13824,8976,13824]];
    
  // var arrayColors = ["tetrisgamepagegreen24Box.png","tetrisgamepageyellow24Box.png","tetrisgamepageorange24Box.png",
  //  					"tetrisgamepageblue24Box.png","tetrisgamepagered24Box.png","tetrisgamepageviolet24Box.png"];
    
    var resources = document.getElementById('resources'); 
	if(resources) 
	    
	    var resImg1 = null;
	    resImg1 = resources.getElementsByTagName('div');
   	    //console.info("resImg count=%d ",resImg1.length);
    
    
    var newType = [0,0,0,0];
    
   var blockNumber = newTypeColor.type == -1 ? Math.floor(Math.random()*7) : newTypeColor.type;
    var colorNumber = newTypeColor.boxImg == -1 ? Math.floor(Math.random()*resImg1.length) : newTypeColor.boxImg;
    
   // console.info("GenerateNewBlock Block type =%d  Block Image=%s:",blockNumber,colorNumber);
    for(var i=0;i<4;i++)
      newType[i] = arrayBlocks[blockNumber][i];	
    
    
  
    this.setActiveBlock(new Block(-1,0,newType,this.elementID,this.Width,resImg1[colorNumber].getAttribute('name')),"smallbox");
    var result = new UTypeColor(colorNumber,blockNumber);
    
    return result;
    
  }
    
    //Check if the Active Block must be merged with the user buildig
    Court.prototype.CheckAndComplete = function () {
      
      if(this.isBottomMargin()){
        this.Merge();
        return 0;
      }
      
      if(userCourt.isAnotherBlock()){
        this.Merge();
        return 0;
      }
      return 1;
    }
      
      Court.prototype.CheckLines = function (gameLevel) {
        
        var lines = 0;
        for(var i=this.Height-1; i>=0; i--){
          var isLine = true;
          for(var j=this.Width-1; j>=0; j--){
            if(!this.Frame[i*this.Width + j].isNotEmpty()){
              isLine = false;
              break;
                }
          }
          if(isLine){
            lines ++;
            for(var n = i; n>0;n--)
              for(var m = this.Width-1; m>=0;m--){
                this.Frame[n*this.Width + m].SetState(this.Frame[(n-1)*this.Width + m].empty);
              }
            i++;
          }
        }
        
        return lines*gameLevel;
      }
 
    

 ////////////////////////////////// ////////////////////////////////// ////////////////////////////////// //////////////////////////////////
  //define the userCourt, the mini dispalay, the next block and  the user?s score
  var BlocksV = 15;
  var BlocksW = 12;
  var dispNextBlock = new Court(3,4,0,"disp","smallbox");
  var userCourt = new Court(BlocksW,BlocksV,0,"TetrisFrame","normalbox");
  var nextBlock = new UTypeColor (-1,-1);
  var score = 0;
  var gameLevel = 0;
  var levelUp = 2;//icrease the game level every levelUp
  var timerRuning = false;
  var leftButton = false, rightButton = false, downButton = false; rotateBotton = false;

 
 ////////////////////////////////// ////////////////////////////////// ////////////////////////////////// ////////////////////////////////// /////////

function SetPlatform(platform)
 {
 	var fontSize = "8pt";
 	if(platform=="iPhone"){
		BlocksV = 15;
	}	
 	else
 		if(platform=="Android")
 		{ 
 			BlocksV = 19;
 			fontSize = "10pt";
 		}	
 
  userCourt.setHeight(BlocksV);
  document.getElementById("UserScores").style.fontSize = fontSize;	
 // console.info("Platform %s blockcount %d",platform,BlocksV);
 	
 } 


// Set timer, the block speed
  function SetTimer(gameLevel) {
    
    clearInterval(window.timer1);
    window.timer1 = window.setInterval("draw()", (10 - gameLevel)*100);
 
  }
  
  // Start game
  function StartGame() {
    
    SetTimer(gameLevel);
    userCourt.Init();
    nextBlock = dispNextBlock.GenerateNewBlock(nextBlock);
    dispNextBlock.StepDown();
    dispNextBlock.StepRight();
    dispNextBlock.Refresh();
    timerRuning = true;
  }
  
    // Start game
  function ReStartGame() {
    
    gameLevel = 0; 
    SetTimer(gameLevel);
    userCourt.Init();
    nextBlock = dispNextBlock.GenerateNewBlock(nextBlock);
    dispNextBlock.StepDown();
    dispNextBlock.StepRight();
    dispNextBlock.Refresh();
    timerRuning = true;
   
  }
  
  // Pause game
  function PauseGame() {
    
    
    var pauseimg = document.getElementById("imgpause");
    
    if(timerRuning){
      clearInterval(window.timer1);
      pauseimg.src = document.getElementById('starthidden').getAttribute('name')
      timerRuning = false;
    }else{
      if(isGameOver())
      	ReStartGame();
      else{
      	SetTimer(gameLevel);
      	pauseimg.src = document.getElementById('pausehidden').getAttribute('name');
      	timerRuning = true;
      }	
    }
    
  }
  // Update user score
  function UpdateScores(newScore) {
    
    //score+=newScore;
    if(newScore!=0)
      for(var i=1;i<=newScore;i++){
        score+=1;
        if(score%levelUp==0){
          gameLevel++;
          SetTimer(gameLevel);
        }
      }	
    document.getElementById("UserScores").innerHTML = "Your Score: " + score +" Game Level: "+gameLevel;
    
  }
  
  //Check is GameOver
  function isGameOver(){
    
    for(var j=0;j<3;j++){
      if(userCourt.Frame[(userCourt.ActiveBlock.Height-1)*userCourt.Width+j].isNotEmpty()) return 1;
    }	
    return 0;
  }	
  
  // Set Pressed button
  function SetPressedButton(buttonKey) {
    
    switch(buttonKey)
    {
        
      case 39: //RIGHT
        rightButton = true;
        break;
          
          case 37: //LEFT
       	leftButton = true;
        break;
          
          case 40: //DOWN
       	downButton = true;
        break;
          
          }
    
  }
  // Set Pressed button
  function UnSetPressedButtons() {
    
    rightButton = false;
    leftButton = false;
    downButton = false;
    
  }
  
  
  function checkButtons(){
  	if(rightButton) KeyPressButton(39);
  	if(leftButton) KeyPressButton(37);
  	if(downButton) KeyPressButton(40);
    
  }
  
  
  //Draw user court
  function draw() {
    
    if(userCourt.CheckAndComplete()){
      userCourt.NextStep();
    }
    else{
      var newScore = userCourt.CheckLines(1);
      userCourt.GenerateNewBlock(nextBlock);
      nextBlock = dispNextBlock.GenerateNewBlock(new UTypeColor(-1,-1));
      dispNextBlock.StepRight();
      dispNextBlock.StepDown();
      dispNextBlock.Refresh();
      UpdateScores(newScore);			
    }
    
    if(isGameOver()){ 
      clearInterval(window.timer1);

      document.getElementById("UserScores").innerHTML = "GAME OVER!";
      return;
        }
    userCourt.Refresh();
    
  }
  // Process key events
  function KeyPress(e) {
    
  
    switch(e.keyCode)
    {
        
      case 39: //RIGHT
        if(!userCourt.isRightMargin())
          if(!userCourt.isRightBlock())
            userCourt.StepRight();
        break;
          case 37: //LEFT
        if(!userCourt.isLeftMargin())
          if(!userCourt.isLeftBlock())
            userCourt.StepLeft();
        break;
          case 40: //DOWN
        if(!userCourt.isBottomMargin())
          if(!userCourt.isAnotherBlock())
            userCourt.StepDown();
        break;
          case 38: //ROTATE
        userCourt.Rotate();
        break;
          
          }
    userCourt.Refresh();		
  }
  
  // Process key events
  function KeyPressButton(buttonKey) {
    
    if(timerRuning)
    switch(buttonKey)
    {
        
      case 39: //RIGHT
        if(!userCourt.isRightMargin())
          if(!userCourt.isRightBlock())
            userCourt.StepRight();
        break;
          case 37: //LEFT
        if(!userCourt.isLeftMargin())
          if(!userCourt.isLeftBlock())
            userCourt.StepLeft();
        break;
          case 40: //DOWN
        if(!userCourt.isBottomMargin())
          if(!userCourt.isAnotherBlock())
            userCourt.StepDown();
        break;
          case 38: //ROTATE
        userCourt.Rotate();
        break;
          
    }
    userCourt.Refresh();
		
  } 
  
  function setUpHandlers() {
	
   document.getElementById("imgleft").setAttribute("onclick", "KeyPressButton(37)");
   document.getElementById("imgdown").setAttribute("onclick", "KeyPressButton(40)");
   document.getElementById("imgright").setAttribute("onclick", "KeyPressButton(39)");
   document.getElementById("imgrotate").setAttribute("onclick", "KeyPressButton(38)");
   document.getElementById("imgpause").setAttribute("onclick", "PauseGame()");
	for(i=0;i<BlocksV;i++)
		for(j=0;j<3;j++)
		{
			var id = "cellTetrisFrame" + (i*12+j).toString();
			document.getElementById(id).setAttribute("onclick", "KeyPressButton(37)");
			//console.info("id = %s",id);
		}
	
	for(i=0;i<BlocksV;i++)
		for(j=9;j<12;j++)
		{
			var id = "cellTetrisFrame" + (i*12+j).toString();
			document.getElementById(id).setAttribute("onclick", "KeyPressButton(39)");
			//console.info("id = %s",id);
		}
	
	for(i=BlocksV-4;i<BlocksV;i++)
		for(j=4;j<9;j++)
		{
			var id = "cellTetrisFrame" + (i*12+j).toString();
			document.getElementById(id).setAttribute("onclick", "KeyPressButton(40)");
			//console.info("id = %s",id);
		}
	
	for(i=4;i<BlocksV-4;i++)
		for(j=4;j<9;j++)
		{
			var id = "cellTetrisFrame" + (i*12+j).toString();
			document.getElementById(id).setAttribute("onclick", "KeyPressButton(38)");
			//console.info("id = %s",id);
		}		
			
  
  
}

 function loadtetris(){ 
  	
  	var platform = document.getElementById('platform').getAttribute('name');
  	SetPlatform(platform);
  	
  	userCourt.Init();
    dispNextBlock.Init();
    nextBlock = dispNextBlock.GenerateNewBlock(new UTypeColor(-1,-1));
    userCourt.GenerateNewBlock(nextBlock);
    userCourt.Refresh();
    dispNextBlock.Refresh();
    document.getElementById("UserScores").innerHTML = "Your Score: 0 Game Level: 0";
    
   
   
    //console.info("Game loaded");		
    setUpHandlers();
    
  }
  




    window.onload = function()
    {
        var pUrl = "";
        var hdiv = document.getElementById("hiddendivid");
        if (hdiv != null)
        {
            pUrl = (hdiv.innerText) ? hdiv.innerText : hdiv.textContent;
        }
        if (pUrl != "" && top === self)
        {
            window.location = pUrl;
        }
    }
  


/*Easy Slider*/
$(function(){
    $('#slider img:gt(0)').hide();
    setInterval(function(){
      $('#slider :first-child').fadeOut(0)
         .next('img').fadeIn(0)
         .end().appendTo('#slider');}, 
      3000);
});

/*Elastic GoTo*/
$('.button a').each(function(){
	var goto = $(this).attr('href');
	$(this).removeAttr('href').click(function() {
		$('html, body').animate({
		scrollTop: $(goto).offset().top
	}, 650); });
});

/*Menu Slider*/
$(document).ready(function () {
	cchild = $("#box-container div").size()
	cwidth = (cchild*320)+"px";
	$("#box-container").css("width", cwidth);

    $("#box-container div:first").addClass("current");
    $("#back").hide();
	
    $("#back").click(function () {
        $(".current").prev('div').addClass("current").next('div').removeClass("current");
        if ($("#box-container div:first").hasClass("current")) {
            $("#back").fadeOut(0);
        }
        if ("#box-container div:last-child:not(.current)") {
            $("#next").fadeIn(0);
        }
        $("#box-container").animate({
            marginLeft: "+=320px"
        }, 400);
        event.preventDefault();
    });
	
    $("#next").click(function () {
        $(".current").next('div').addClass("current").prev('div').removeClass("current");
        if ("#box-container div:first:not(.current)") {
            $("#back").fadeIn(0);
        }
        if ($("#box-container div:last-child").hasClass("current")) {
            $("#next").fadeOut(0);
        }
        $("#box-container").animate({
            marginLeft: "-=320px"
        }, 400);
        event.preventDefault();
    });
});

/*Validation Rules*/
$('fieldset *').each(function(){
	var default_value = $(this).val();
	$(this).focus(function(){
		if ($(this).val() == default_value) $(this).val("").addClass('current');
	});
	$(this).blur(function(){
		if ($(this).val() == "") $(this).val(default_value).removeClass('current');
	});
});
$(document).ready(function() {
var validator = $("form").validate({ 
	 	rules: {
			email: { 
				required: true, 
				email: true
			},
			comment: { 
				required: true
			}
		}, 
		errorPlacement: function(error, element) { 
		error.appendTo(element.parent() );
		}
	});
});




