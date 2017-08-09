
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1200 / 60);
          };
}());

function loadgame(){
var canvas=document.getElementById('canvas'),
	context=canvas.getContext('2d');
var	z = x = 0;
var i = 0;
var j = y = 20;
var jmp_dir = 1;
var ttl = ctr = ctr2 = scr = bgwidth = anotherjump = game_end = 0;

document.addEventListener("deviceready", onDeviceReady, false);
			
    function onDeviceReady() {
		  window.addEventListener("touchstart", eventHStart, false);
		}

	var gamestart= true;
	var firsttouch= false;
	var secondtouch= false;

	function eventHStart(evt){
	if(gamestart){
		firsttouch=true;
		gamestart= false;
	}else if(firsttouch){
		secondtouch= true;
		firsttouch= false;
	}
	}

if(window.screen != null)
    xHeight = window.screen.availHeight;
    xWidth= window.screen.availWidth;
 
  if(window.innerHeight != null)
    xHeight =   window.innerHeight;
    xWidth = 	window.innerWidth;
    
    
	var arr_croc= ["350","760","920","1330","1780","2150","2675","3000","3400","4000","4405","4625","5290","5650","6090","6430","6760","6960","7350"];
	var arr_lion= ["250","550","1270","1480","1610","1980","2330","2370","2575","3650","3900","4250","4850","5180","5450","5500","5820","5880","6275","6585","6630","6920","7220","7290"];
	var arr_trmbln= ["200","650","700","1130","1180","1670","2045","2088","2625","3175","3240","3750","3825","4330","4950","5025","5100","5550","5950","6025","6330","6380","6675","6720","7100","7150"];
	var arr_clspr= ["510","600","750","850","1050","1220","1550","2440","2900","3600","3950","4200","5250","5600","6240","6580"];
	canvas.height= xHeight -15;
	canvas.width= xWidth - 15;
	
	
    height = canvas.height;
	
	var deg_dir= 1;
	var deg= 0;
	var pow_dir= 1;
	var pow= 1;
	var height2= canvas.height- 80;
	
	
	(function loop() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	
		
		if( i >10000 || game_end){
		
				scr = Math.floor(scr/10);
				
				context.lineWidth=4;

				context.fillStyle="#CC0000";

				context.lineStyle="#ffff00";

				context.font="36px verdana";

				context.fillText("GAME ", 90, canvas.height/2-40);
				context.fillText("OVER", 90, canvas.height/2);
				
				context.font="18px verdana";
				context.fillText("Your score is "+ scr, 70, canvas.height/2+40);
				
				context.font="36px verdana";
				context.fillText("Play Again", 53, canvas.height/2+100);
				
				window.addEventListener("touchend", reload, false);
				
				function reload(evt){
					window.location.reload();
				}
				
			}else{
		
		if(gamestart){
			if(deg_dir == 1){
				if(deg < 90){
					deg= deg + deg_dir;
				}else{
					deg_dir= -1;
					deg= deg + deg_dir;
				}
				}
			else if(deg_dir == -1){
				if(deg > 0){
					deg= deg + deg_dir;
				}else{
					deg_dir= 1;
					deg= deg + deg_dir;
				}
			}
			ctx2= document.getElementById("cannon").getContext('2d');
			
			document.getElementById("cannon").style.top= xHeight-98+"px";
			
			document.getElementById("cannon").style.left= "-28px";
			
			imgc= document.getElementById("c");
			
			ctx2.save();
			
			ctx2.clearRect(0, 0, imgc.width, imgc.height);
			
			ctx2.translate(imgc.width/2, imgc.height/2);
			
			ctx2.rotate(0.02 * -deg);
			
			ctx2.drawImage(imgc, 0, 0, imgc.width/2, imgc.height/2);
			
			ctx2.restore();
			
			canvas.style.backgroundPosition= "0px "+canvas.height+"px";

			if(y == 0){
				x= 90;
			}else if(y == 90){
				x= 0;
			}else{
				x= Math.sqrt(8100-y*y);
			}
			
			if(deg_dir == 1){
			y++;
			}else{
			y--;
			}
			
			}else if(firsttouch){
				
      		canvas.style.backgroundPosition= "0px "+canvas.height+"px";
			
			img2= document.getElementById("img"+pow);
			context.drawImage(img2, canvas.width/2, canvas.height- 75, 26, 32);
			
			
			ttl= 30 * pow;
			
			ctr= 5;
      		
			if(parseInt(i/2) === i/2){
			if(pow_dir == 1){
				if(pow < 10){
					pow= pow + pow_dir;
				}else{
					pow_dir= -1;
					pow= pow + pow_dir;
				}
				}
			else if(pow_dir == -1){
				if(pow > 1){
					pow= pow + pow_dir;
				}else{
					pow_dir= 1;
					pow= pow + pow_dir;
				}
				}
				
		}
		}else if(secondtouch){
			if(jmp_dir === 1){
			if(ctr < ttl){
				ctr++;
				if( (20 + (x/20 *ctr)) < 150 && anotherjump == 0) {
					img3= document.getElementById("g-u");
					height2 -= y/20;
					width2= 0;
					context.drawImage(img3, (20 + (x/20 *ctr)), height2, img3.width/2, img3.height/2);
				}
				else{
				ctx2.clearRect(0, 0, imgc.width, imgc.height);
				if(anotherjump && height2 > canvas.height - 60){
					height2-= (y/20 );
					bgwidth-= x/20;
					canvas.style.backgroundPosition=""+bgwidth+"px "+height+"px";
					width2= 150 - (x/20 * ctr);
					img3= document.getElementById("g-u");
					context.drawImage(img3, 150, height2, img3.width/2, img3.height/2);
				}else{
				height+= (y/20 );
				bgwidth-= x/20;
				canvas.style.backgroundPosition=""+bgwidth+"px "+height+"px";
				width2= 150 - (x/20 * ctr);
				img3= document.getElementById("g-u");
				context.drawImage(img3, 150, height2, img3.width/2, img3.height/2);
				}
				}
				if(height < canvas.height+30){
					j= 0;
					while(arr_clspr[j]){
					if(arr_clspr[j] > -bgwidth && arr_clspr[j] < (-bgwidth)+canvas.width ){
						img4= document.getElementById("cl");
						context.drawImage(img4, parseInt(arr_clspr[j]) + Math.floor(bgwidth), canvas.height-20, img4.width, img4.height);
					}
					j++;
					}
					j= 0;
					while(arr_croc[j]){
					if(arr_croc[j] > -bgwidth && arr_croc[j] < (-bgwidth)+canvas.width ){
						img4= document.getElementById("crc");
						context.drawImage(img4, parseInt(arr_croc[j]) + Math.floor(bgwidth), canvas.height-20, img4.width/2, img4.height/2);
					}
					j++;
					}
					j= 0;
					while(arr_lion[j]){
					if(arr_lion[j] > -bgwidth && arr_lion[j] < (-bgwidth)+canvas.width ){
						img4= document.getElementById("lion");
						context.drawImage(img4, parseInt(arr_lion[j]) + Math.floor(bgwidth), height-20, img4.width/2, img4.height/2);
					}
					j++;
					}
					j= 0;
					while(arr_trmbln[j]){
					if(arr_trmbln[j] > -bgwidth && arr_trmbln[j] < (-bgwidth)+canvas.width ){
						img5= document.getElementById("trmpln");
						context.drawImage(img5, parseInt(arr_trmbln[j])+ Math.floor(bgwidth), height-15, img5.width/2, img5.height/2);
					}
					j++;
					}
				}
			}else if(ctr >= ttl){
				jmp_dir= -1;
				canvas.style.backgroundPosition=""+bgwidth+"px "+height+"px";
			}
			}else if(jmp_dir == -1){
			if(ctr > 0){
				ctr--;
				if((20 + (x/20 * (2 * ttl - ctr))) < 150 && anotherjump == 0) {
					img3= document.getElementById("g-d");
					height2 -= y/20;
					context.drawImage(img3, (20 + (x/20 * (2 * ttl - ctr))), height2, img3.width/2, img3.height/2);
				}
				else{
				if(height > canvas.height){
				height-= (y/20);
				bgwidth-= x/20;
				canvas.style.backgroundPosition=""+bgwidth+"px "+height+"px";
				img3= document.getElementById("g-d");
				context.drawImage(img3, 150, height2, img3.width/2, img3.height/2);
				width2= 150 -(20 + x/20 *(ttl + ttl -ctr));
				}
				else{
				height2+= y/20;
				bgwidth-= x/20;
				canvas.style.backgroundPosition=""+bgwidth+"px "+height+"px";
				img3= document.getElementById("g-d");
				context.drawImage(img3, 150, height2, img3.width/2, img3.height/2);
				width2= bgwidth;
				ctr2= ctr+25;
				}
				if(height < canvas.height+30){
					j= 0;
					while(arr_clspr[j]){
					if(arr_clspr[j] > -bgwidth && arr_clspr[j] < (-bgwidth)+canvas.width ){
						img4= document.getElementById("cl");
						context.drawImage(img4, parseInt(arr_clspr[j]) + Math.floor(bgwidth), canvas.height-20, img4.width, img4.height);
					}
					j++;
					}
					j= 0;
					while(arr_croc[j]){
					if(arr_croc[j] > -bgwidth && arr_croc[j] < (-bgwidth)+canvas.width ){
						img4= document.getElementById("crc");
						context.drawImage(img4, parseInt(arr_croc[j]) + Math.floor(bgwidth), canvas.height-20, img4.width/2, img4.height/2);
					}
					j++;
					}
					j= 0;
					while(arr_lion[j]){
					if(arr_lion[j] > -bgwidth && arr_lion[j] < (-bgwidth)+canvas.width ){
						img4= document.getElementById("lion");
						context.drawImage(img4, parseInt(arr_lion[j]) + Math.floor(bgwidth), canvas.height-20, img4.width/2, img4.height/2);
					}
					j++;
					}
					j= 0;
					while(arr_trmbln[j]){
					if(arr_trmbln[j] > -bgwidth && arr_trmbln[j] < (-bgwidth)+canvas.width ){
						img5= document.getElementById("trmpln");
						context.drawImage(img5, parseInt(arr_trmbln[j])+ Math.floor(bgwidth), canvas.height-15, img5.width/2, img5.height/2);
					}
					j++;
					}
				}
			}
			}
			else if( height2 < height -30 ){
				height2+= y/20;
				width2-= x/20;
				bgwidth-= x/20;
				canvas.style.backgroundPosition=""+bgwidth+"px "+height+"px";
				img3= document.getElementById("g-d");
				context.drawImage(img3, 150, height2, img3.width/2, img3.height/2);
					j= 0;
					while(arr_clspr[j]){
					if(arr_clspr[j] > -bgwidth && arr_clspr[j] < (-bgwidth)+canvas.width ){
						img4= document.getElementById("cl");
						context.drawImage(img4, parseInt(arr_clspr[j]) + Math.floor(bgwidth), canvas.height-20, img4.width, img4.height);
					}
					j++;
					}
					j= 0;
					while(arr_croc[j]){
					if(arr_croc[j] > -bgwidth && arr_croc[j] < (-bgwidth)+canvas.width ){
						img4= document.getElementById("crc");
						context.drawImage(img4, parseInt(arr_croc[j]) + Math.floor(bgwidth), canvas.height-20, img4.width/2, img4.height/2);
					}
					j++;
					}
					j= 0;
					while(arr_lion[j]){
					if(arr_lion[j] > -bgwidth && arr_lion[j] < (-bgwidth)+canvas.width ){
						img4= document.getElementById("lion");
						context.drawImage(img4, parseInt(arr_lion[j]) + Math.floor(bgwidth), canvas.height-20, img4.width/2, img4.height/2);
					}
					j++;
					}
					j= 0;
					while(arr_trmbln[j]){
					if(arr_trmbln[j] > -bgwidth && arr_trmbln[j] < (-bgwidth)+canvas.width ){
						img5= document.getElementById("trmpln");
						context.drawImage(img5, parseInt(arr_trmbln[j])+ Math.floor(bgwidth), canvas.height-15, img5.width/2, img5.height/2);
					}
					j++;
					}
			}else if(height2 >= height - 30){
				ttl= ttl/2;
				jmp_dir= 1;
				ctr= 0;
				anotherjump= 1;
				canvas.style.backgroundPosition=""+bgwidth+"px "+height+"px";
				
				
					j= 0;
					while(arr_clspr[j]){
					if(arr_clspr[j] > -bgwidth && arr_clspr[j] < (-bgwidth)+canvas.width ){
						img4= document.getElementById("cl");
						context.drawImage(img4, parseInt(arr_clspr[j]) + Math.floor(bgwidth), canvas.height-20, img4.width, img4.height);
					}
					if(arr_clspr[j] > -bgwidth && arr_clspr[j] < (parseInt((-bgwidth))+parseInt(canvas.width)) ){
						if((150+parseInt(img3.width/2)) > (parseInt(arr_clspr[j])+bgwidth)  && 150 < (parseInt(arr_clspr[j])+bgwidth+14)){
							ttl= ttl * 6/4;
						}
					}
					j++;
					}
				
					j= 0;
					while(arr_croc[j]){
					if(arr_croc[j] > -bgwidth && arr_croc[j] < (-bgwidth)+canvas.width ){
						img4= document.getElementById("crc");
						context.drawImage(img4, parseInt(arr_croc[j]) + Math.floor(bgwidth), canvas.height-20, img4.width/2, img4.height/2);
					}
					if(arr_croc[j] > -bgwidth && arr_croc[j] < (parseInt(-bgwidth)+parseInt(canvas.width)) ){
						if((150+parseInt(img3.width/2)) > (parseInt(arr_croc[j])+bgwidth)  && 150 < (parseInt(arr_croc[j])+bgwidth+28) ){
							game_end= 1;
						}else if( (150+parseInt(img3.width/2))  > (parseInt(arr_croc[j])+bgwidth+28)  && 150 < (parseInt(arr_croc[j])+bgwidth+129)){
							ttl= ttl * 7/4;
						}
					}
					j++;
					}
				
					j= 0;
					while(arr_lion[j]){
					if(arr_lion[j] > -bgwidth && arr_lion[j] < (-bgwidth)+canvas.width ){
						img4= document.getElementById("lion");
						context.drawImage(img4, parseInt(arr_lion[j]) + Math.floor(bgwidth), canvas.height-20, img4.width/2, img4.height/2);
					}
					if(arr_lion[j] > -bgwidth && arr_lion[j] < (parseInt(-bgwidth)+parseInt(canvas.width)) ){
						if((150+parseInt(img3.width/2)) > (parseInt(arr_lion[j])+bgwidth)  && 150 < (parseInt(arr_lion[j])+bgwidth+5) ){
							game_end= 1;
						}else if( (150+parseInt(img3.width/2))  > (parseInt(arr_lion[j])+bgwidth+5)  && 150 < (parseInt(arr_lion[j])+bgwidth+28)){
							ttl= ttl * 7/4;
						}
					}
					j++;
					}
					j= 0;
					while(arr_trmbln[j]){
					if(arr_trmbln[j] > -bgwidth && arr_trmbln[j] < (-bgwidth)+canvas.width ){
						img5= document.getElementById("trmpln");
						context.drawImage(img5, parseInt(arr_trmbln[j])+ Math.floor(bgwidth), canvas.height-15, img5.width/2, img5.height/2);
					}
					if(arr_trmbln[j] > -bgwidth && arr_trmbln[j] < (parseInt((-bgwidth))+parseInt(canvas.width)) ){
						if((150+parseInt(img3.width/2)) > (parseInt(arr_trmbln[j])+bgwidth)  && 150 < (parseInt(arr_trmbln[j])+bgwidth+22)){
							ttl= ttl * 6/4;
						}
					}
					j++;
					}

				if(ttl <= 6){
					game_end = 1;
				}
			}
			}
			
			scr+= Math.floor(x);
		}
		
		i++;
		
		
        requestAnimFrame(loop);
		}
		}());
}

window.addEventListener("load", loadgame, true);



