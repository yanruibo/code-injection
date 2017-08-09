


onload = function() {
	imgT = document.getElementById('top');
	imgO = document.getElementById('op');
	imgR = document.getElementById('right');
	imgF = document.getElementById('s_off');
	imgN = document.getElementById('s_on');
	imgA = document.getElementById('ans');
	imgY = document.getElementById('yes_no');
	imgE = document.getElementById('end');
	imgNE1 = document.getElementById('next1');
	imgNE2 = document.getElementById('next2');
	
	bimg1 = document.getElementById('i01');
	bimg2 = document.getElementById('i02');
	bimg3 = document.getElementById('i03');
	bimg4 = document.getElementById('i04');
	bimg5 = document.getElementById('i05');
	bimg6 = document.getElementById('i06');
	bimg7 = document.getElementById('i07');
	bimg8 = document.getElementById('i08');
	bimg9 = document.getElementById('i09');
	bimg10 = document.getElementById('i10');
	bimg11 = document.getElementById('i11');
	bimg12 = document.getElementById('i12');
	bimg13 = document.getElementById('i13');
	bimg14 = document.getElementById('i14');
	bimg15 = document.getElementById('i15');
	bimg16 = document.getElementById('i16');
	bimg17 = document.getElementById('i17');
	bimg18 = document.getElementById('i18');
	bimg19 = document.getElementById('i19');
	bimg20 = document.getElementById('i20');
	bimg21 = document.getElementById('i21');
	bimg22 = document.getElementById('i22');
	bimg23 = document.getElementById('i23');
	bimg24 = document.getElementById('i24');
	bimg25 = document.getElementById('i25');
	bimg26 = document.getElementById('i26');
	bimg27 = document.getElementById('i27');
	bimg28 = document.getElementById('i28');
	bimg29 = document.getElementById('i29');
	bimg30 = document.getElementById('i30');
	
	// canvas1を検出(背景)
	canvas1 = document.getElementById('id_canvas1');
	if (!canvas1 || !canvas1.getContext) {return false;}
	ctx1 = canvas1.getContext('2d');
	// canvas2を検出(当たりの丸下)
	canvas2 = document.getElementById('id_canvas2');
	ctx2 = canvas2.getContext('2d');
	// canvas3を検出(当たりの丸上)
	canvas3 = document.getElementById('id_canvas3');
	ctx3 = canvas3.getContext('2d');
	// canvas4を検出(ライト画像,onoff,Ans)
	canvas4 = document.getElementById('id_canvas4');
	ctx4 = canvas4.getContext('2d');
	// canvas5を検出(nextstage,カウント文字)
	canvas5 = document.getElementById('id_canvas5');
	ctx5 = canvas5.getContext('2d');
	
	var al=0.1;
	function anime(){
	  if(al>=1){
		clearInterval(timerID);
		setTimeout(toppage,5000);
	  }else{
		ctx1.clearRect(0, 0, 480, 645);
		ctx1.globalAlpha = al;
		ctx1.drawImage(imgO, 0, 0);
		al=al+0.1;
	  }
	}
	timerID=setInterval(anime,50);
	
	function toppage(){
	  var dw = window.innerWidth; var dh = window.innerHeight; var df = dh/2;
	  ctx1.globalAlpha = 1;
	  ctx1.clearRect(0, 0, 480, 645);
	  ctx1.drawImage(imgT, 0, 0);
	
	  //canvas5.onmousedown = (function(e) {
	  canvas5.ontouchstart=function(){
		e=event.touches[0];
		var rect = e.target.getBoundingClientRect();
		var mx = e.clientX - rect.left; var my = e.clientY - rect.top;
		console.log(mx); console.log(my);
		if (( 0.1*dw <= mx) && (mx <= 0.88*dw )) { if (( 0.64*dh <= my) && (my <= 0.77*dh )) {
			window.localStorage.clear();
			draw();
		 }else if(( 0.83*dh <= my) && (my <= 0.96*dh )) {
			draw();
		}}
	  }//);
	}
	//*/draw();
}
/*--------------------------------------------*/

function draw() {
 var dw = window.innerWidth; var dh = window.innerHeight; var df = dh/2;
 var sc = new Number(window.localStorage.getItem( "sckey" ));
 if( sc == 0 ){ sc = new Number(1); }
  for(l=1;l<=30;l++){
    if(sc == l){
	for(a=1;a<=5;a++) { eval("ctx"+a).clearRect(0, 0, 480, 645); }
	var alr = [1,1,1,1,1];
	var s1 = [[48,125,17,1,1],[164,180,21,1.2,1],[320,53,23,1,1],[456,205,27,1,1],[73,302,16,1,1]];
	var s2 = [[50,56,23,1.5,1],[390,317,35,1,1],[215,81,33,1.4,1],[78,34,15,4,1],[30,280,80,1,1]];
	var s3 = [[30,175,32,1,1],[54,286,38,1,1],[325,289,40,1,1],[273,150,42,1,1],[140,292,30,1.2,1]];
	var s4 = [[24,114,20,2.3,1],[143,193,30,1,1],[198,135,24,1,1],[328,39,16,1,1],[100,319,34,2.5,1]];
	var s5 = [[23,250,23,1,1],[229,140,20,1,1],[408,124,22,1,1],[293,272,22,1,1],[324,214,20,1,1]];
	var s6 = [[40,78,25,1,1.5],[114,172,19,1,1],[163,266,35,1.9,1],[267,150,22,1.5,1],[77,44,25,1.7,1]];
	var s7 = [[44,132,20,1,2],[167,65,20,1,2],[188,177,25,1,1.4],[357,210,32,1,1.4],[10,50,30,3,1]];
	var s8 = [[132,176,23,1,1],[102,327,32,1.5,1],[316,216,15,1,1],[266,42,14,1,2.8],[83,90,20,2,1]];
	var s9 = [[15,100,54,1,1],[96,250,72,1,1],[87,64,16,1,1],[370,160,46,1,1],[176,180,18,1,1]];
	var s10 = [[67,237,31,1,1.3],[149,223,75,1,1],[345,130,32,1,1],[155,12,40,1,1],[278,60,35,1,1]];
	var s11 = [[81,55,29,1.9,1],[120,200,30,1,1.5],[295,105,18,1,1],[222,220,27,1.9,1],[403,55,40,1,1]];
	var s12 = [[71,89,24,1,1],[160,122,25,1,1],[336,110,20,1,1],[239,233,18,1.5,1],[194,296,20,1,1]];
	var s13 = [[32,195,26,2,1],[67,210,16,2.5,1],[105,137,42,2.4,1],[347,82,22,1,1],[170,293,39,1.3,1]];
	var s14 = [[103,262,25,1,1],[155,119,25,1,1.5],[330,176,31,1,1.5],[422,147,24,1,1],[115,104,20,3,1]];
	var s15 = [[184,73,35,1,1.2],[150,301,33,1,1],[129,220,14,3.4,1],[293,147,56,1,1],[348,105,32,1,3]];
	var s16 = [[45,190,75,1,1],[130,-10,50,1,1.3],[147,186,25,1,1.3],[12,50,40,1.5,1],[22,310,35,1.5,1]];
	var s17 = [[55,215,21,2,1],[82,70,24,2,1],[337,268,13,1,1],[44,300,16,1,1],[530,40,70,1,3]];
	var s18 = [[73,36,27,2,1],[60,295,28,2,1],[310,60,26,1,1],[60,174,13,1.5,1],[225,125,34,1,1.4]];
	var s19 = [[42,72,18,4,1],[103,111,12,1.5,1],[280,20,24,1,5],[52,270,22,1.7,1],[316,127,13,1.2,1]];
	var s20 = [[213,48,20,1.2,1],[218,100,15,1,1],[234,132,15,1,1],[72,310,30,1.3,1],[170,226,25,2.5,1]];
	var s21 = [[138,95,24,1,2.5],[66,98,19,1,1.5],[62,23,15,1,3],[253,296,30,1,1],[397,34,17,1,1.5]];
	var s22 = [[17,293,15,1,1],[155,21,27,1,2],[235,110,36,1,1],[395,205,24,1,1],[347,151,15,1,1.3]];
	var s23 = [[15,285,22,1.5,1],[73,205,15,1,1],[325,276,18,1,1],[435,250,20,1,1],[137,207,12,2.5,1]];
	var s24 = [[6,149,31,1,1],[84,65,22,1,1.8],[141,310,32,1.5,1],[303,62,18,1.1,2],[385,250,33,1,1]];
	var s25 = [[48,62,15,1,1],[17,94,12,1,1],[219,86,21,1,1.8],[375,22,20,1,1],[241,176,14,1,1.5]];
	var s26 = [[325,36,12,1,1],[384,80,19,1,1.2],[225,303,35,1.4,1],[55,265,25,2.7,1],[-20,25,70,1,1.8]];
	var s27 = [[103,47,45,1,1.2],[73,272,40,1.8,1],[195,225,19,1.7,1],[217,70,22,1.3,1],[416,93,32,1,1]];
	var s28 = [[412,104,24,1,1],[312,10,24,1,2],[191,38,29,1,1.5],[254,218,21,1,1],[-10,80,60,1,1.8]];
	var s29 = [[19,290,27,1,1],[65,225,28,1,1],[89,300,22,1,1],[438,175,32,1,1],[402,245,27,1,1]];
	var s30 = [[173,16,23,1,1.3],[242,20,25,1,1],[262,129,13,1.2,1],[358,154,18,1,1.2],[150,275,20,1.3,1]];
	
	var p1 =[[0.1,0.39,0.04,0.05],[0.34,0.56,0.04,0.07],[0.67,0.16,0.05,0.07],[0.95,0.64,0.06,0.08],[0.15,0.94,0.03,0.05]];
	var p2=[[0.1,0.17,0.05,0.07],[0.81,0.98,0.07,0.11],[0.45,0.25,0.07,0.1],[0.16,0.11,0.03,0.05],[0.06,0.87,0.17,0.25]];
	var p3=[[0.06,0.54,0.07,0.1],[0.11,0.89,0.08,0.12],[0.68,0.9,0.08,0.12],[0.57,0.47,0.09,0.13],[0.29,0.91,0.06,0.09]];
	var p4=[[0.05,0.35,0.04,0.06],[0.3,0.6,0.06,0.09],[0.41,0.42,0.05,0.07],[0.68,0.12,0.03,0.05],[0.21,0.99,0.07,0.11]];
	var p5=[[0.05,0.78,0.05,0.07],[0.48,0.43,0.04,0.06],[0.85,0.38,0.05,0.07],[0.61,0.84,0.05,0.07],[0.68,0.66,0.04,0.06]];
	var p6=[[0.08,0.24,0.05,0.08],[0.24,0.53,0.04,0.06],[0.34,0.82,0.07,0.11],[0.56,0.47,0.05,0.07],[0.16,0.14,0.05,0.08]];
	var p7=[[0.09,0.41,0.04,0.06],[0.35,0.2,0.04,0.06],[0.39,0.55,0.05,0.08],[0.74,0.65,0.07,0.1],[0.02,0.16,0.06,0.09]];
	var p8=[[0.28,0.55,0.05,0.07],[0.21,1.01,0.07,0.1],[0.66,0.67,0.03,0.05],[0.55,0.13,0.03,0.04],[0.17,0.28,0.04,0.06]];
	var p9=[[0.03,0.31,0.11,0.17],[0.2,0.78,0.15,0.22],[0.18,0.2,0.03,0.05],[0.77,0.5,0.1,0.14],[0.37,0.56,0.04,0.06]];
	var p10=[[0.14,0.73,0.06,0.1],[0.31,0.69,0.16,0.23],[0.72,0.4,0.07,0.1],[0.32,0.04,0.08,0.12],[0.58,0.19,0.07,0.11]];
	var p11=[[0.17,0.17,0.06,0.09],[0.25,0.62,0.06,0.09],[0.61,0.33,0.04,0.06],[0.46,0.68,0.06,0.08],[0.84,0.17,0.08,0.12]];
	var p12=[[0.15,0.28,0.05,0.07],[0.33,0.38,0.05,0.08],[0.7,0.34,0.04,0.06],[0.5,0.72,0.04,0.06],[0.4,0.92,0.04,0.06]];
	var p13=[[0.07,0.6,0.05,0.08],[0.14,0.65,0.03,0.05],[0.22,0.42,0.09,0.13],[0.72,0.25,0.05,0.07],[0.35,0.91,0.08,0.12]];
	var p14=[[0.21,0.81,0.05,0.08],[0.32,0.37,0.05,0.08],[0.69,0.55,0.06,0.1],[0.88,0.46,0.05,0.07],[0.24,0.32,0.04,0.06]];
	var p15=[[0.38,0.23,0.07,0.11],[0.31,0.93,0.07,0.1],[0.27,0.68,0.03,0.04],[0.61,0.46,0.12,0.17],[0.73,0.33,0.07,0.1]];
	var p16=[[0.09,0.59,0.16,0.23],[0.27,-0.03,0.1,0.16],[0.31,0.58,0.05,0.08],[0.03,0.16,0.08,0.12],[0.05,0.96,0.07,0.11]];
	var p17=[[0.11,0.67,0.04,0.07],[0.17,0.22,0.05,0.07],[0.7,0.83,0.03,0.04],[0.09,0.93,0.03,0.05],[1.1,0.12,0.15,0.22]];
	var p18=[[0.15,0.11,0.06,0.08],[0.13,0.91,0.06,0.09],[0.65,0.19,0.05,0.08],[0.13,0.54,0.03,0.04],[0.47,0.39,0.07,0.11]];
	var p19=[[0.09,0.22,0.04,0.06],[0.21,0.34,0.03,0.04],[0.58,0.06,0.05,0.07],[0.11,0.84,0.05,0.07],[0.66,0.39,0.03,0.04]];
	var p20=[[0.44,0.15,0.04,0.06],[0.45,0.31,0.03,0.05],[0.49,0.41,0.03,0.05],[0.15,0.96,0.06,0.09],[0.35,0.7,0.05,0.08]];
	var p21=[[0.29,0.29,0.05,0.07],[0.14,0.3,0.04,0.06],[0.13,0.07,0.03,0.05],[0.53,0.92,0.06,0.09],[0.83,0.11,0.04,0.05]];
	var p22=[[0.04,0.91,0.03,0.05],[0.32,0.07,0.06,0.08],[0.49,0.34,0.08,0.11],[0.82,0.64,0.05,0.07],[0.72,0.47,0.03,0.05]];
	var p23=[[0.03,0.88,0.05,0.07],[0.15,0.64,0.03,0.05],[0.68,0.86,0.04,0.06],[0.91,0.78,0.04,0.06],[0.29,0.64,0.03,0.04]];
	var p24=[[0.01,0.46,0.06,0.1],[0.18,0.2,0.05,0.07],[0.29,0.96,0.07,0.1],[0.63,0.19,0.04,0.06],[0.8,0.78,0.07,0.1]];
	var p25=[[0.1,0.19,0.03,0.05],[0.04,0.29,0.03,0.04],[0.46,0.27,0.04,0.07],[0.78,0.07,0.04,0.06],[0.5,0.55,0.03,0.04]];
	var p26=[[0.68,0.11,0.03,0.04],[0.8,0.25,0.04,0.06],[0.47,0.94,0.07,0.11],[0.11,0.82,0.05,0.08],[-0.04,0.08,0.15,0.22]];
	var p27=[[0.21,0.15,0.09,0.14],[0.15,0.84,0.08,0.12],[0.41,0.7,0.04,0.06],[0.45,0.22,0.05,0.07],[0.87,0.29,0.07,0.1]];
	var p28=[[0.86,0.32,0.05,0.07],[0.65,0.03,0.05,0.07],[0.4,0.12,0.06,0.09],[0.53,0.68,0.04,0.07],[-0.02,0.25,0.13,0.19]];
	var p29=[[0.04,0.9,0.06,0.08],[0.14,0.7,0.06,0.09],[0.19,0.93,0.05,0.07],[0.91,0.54,0.07,0.1],[0.84,0.76,0.06,0.08]];
	var p30=[[0.36,0.05,0.05,0.07],[0.5,0.06,0.05,0.08],[0.55,0.4,0.03,0.04],[0.75,0.48,0.04,0.06],[0.31,0.85,0.04,0.06]];

	/*--------------------------------------------*/
	ctx1.drawImage(eval("bimg"+l), 0, 0);	// 背景の画像を表示（重ね順①）
	ctx4.drawImage(imgR, 429, 0);		// ライトの画像を表示（重ね順④）
	ctx4.drawImage(imgA, 425, 600); 	// Ansの画像を表示（重ね順④）
	
	/*---------カウント関数（重ね順⑤）---------*/
	var count1 = 5;
	function count() {
		ctx5.font = "33pt Arial";
		ctx5.fillText(count1, 442, 45);
	}count();
	/*---------nextstage画像を表示（重ね順⑤）---------*/
	function nextstage() {
	  setTimeout( function() {
		ctx5.drawImage(imgNE1, 0, 210);
		//canvas5.onmousedown = (function(e) {
		canvas5.ontouchstart=function(){
			e=event.touches[0];
			var rect = e.target.getBoundingClientRect();
			var mx = e.clientX - rect.left; var my = e.clientY - rect.top;
			console.log(mx); console.log(my);
			if ((0 <= mx) && (mx <= dw)) { if (( 0.33*dh <= my) && (my <= 0.7*dh )) {
				sc = new Number(sc + 1);
				window.localStorage.setItem( "sckey" , sc);
				draw();
			}}
		}//);
	  }, 600);
	}
	/*---------答えを見る　YES or NO を表示（重ね順⑤）---------*/
	function yes_or_no() {
		ctx5.drawImage(imgY, 48, 230);
		//canvas5.onmousedown = (function(e) {
		canvas5.ontouchstart=function(){
			e=event.touches[0];
			var rect = e.target.getBoundingClientRect();
			var mx = e.clientX - rect.left; var my = e.clientY - rect.top;
			console.log(mx); console.log(my);
			if (( 0.45*dh <= my) && (my <= 0.59*dh )) { if (( 0.17*dw <= mx) && (mx <= 0.45*dw )) {
				ctx5.clearRect(0, 210, 480, 240); //表示クリア
				answer();
			 }else if(( 0.55*dw <= mx) && (mx <= 0.8*dw )) {
				ctx5.clearRect(0, 210, 480, 240); //表示クリア
				hit();
			}}
		}//);
	}
	/*---------YESだった時の処理---------*/
	function answer() {
	  ctx4.drawImage(imgNE2, 160, 277);
	  for(i=0;i<=4;i++){
	    if(alr[i] == 1){
	      for(c=2;c<=3;c++){
		eval("ctx"+c).save();
		eval("ctx"+c).beginPath();
		eval("ctx"+c).scale(eval("s"+sc)[i][3],eval("s"+sc)[i][4]);
		eval("ctx"+c).arc(eval("s"+sc)[i][0],eval("s"+sc)[i][1],eval("s"+sc)[i][2],0,Math.PI*2,false);
		eval("ctx"+c).fillStyle = "rgba(0,0,0,0)";
		eval("ctx"+c).fill();
		eval("ctx"+c).strokeStyle = "rgba(0,51,255,1)";
		eval("ctx"+c).lineWidth = 4;
		eval("ctx"+c).stroke();
		eval("ctx"+c).restore();
	      }
	    }
	  }
	  //canvas5.onmousedown = (function(e) {
	  canvas5.ontouchstart=function(){
		e=event.touches[0];
		var rect = e.target.getBoundingClientRect();
		var mx = e.clientX - rect.left; var my = e.clientY - rect.top;
		console.log(mx); console.log(my);
		if (( 0.43*dh <= my) && (my <= 0.57*dh )) { if (( 0.33*dw <= mx) && (mx <= 0.67*dw )) {
		  if(sc == 30){ finish(); 
		  } else { 
			//if(on ==1){ audio2.play(); }
			sc = new Number(sc + 1);
			window.localStorage.setItem( "sckey" , sc);
			draw();
		  }
		}}
	  }//);
	}
	/*---------finish処理---------*/
	function finish(){
	  ctx5.drawImage(imgE, 0, 0);
	  //canvas5.onmousedown = (function(e) {
	  canvas5.ontouchstart=function(){
		e=event.touches[0];
		var rect = e.target.getBoundingClientRect();
		var mx = e.clientX - rect.left; var my = e.clientY - rect.top;
		console.log(mx); console.log(my);
		if ((0.16*dw <= mx) && (mx <= 0.8*dw)) { if ((0.78*dh <= my) && (my <= 0.91*dh)) {
			window.localStorage.clear();
			draw();
		  }else if((0.61*dh <= my) && (my <= 0.74*dh)){ location.href = "market://search?q=pub:Xronus%2einc";
		}}
	  }//);
	}
	/*--------------------------------------------*/
	function hit() {
	  //canvas5.onmousedown = (function(e) {
	  canvas5.ontouchstart=function(){
		e=event.touches[0];
		var rect = e.target.getBoundingClientRect();
		var mx = e.clientX - rect.left; var my = e.clientY - rect.top;
		console.log(mx); console.log(my);
		//【ボタン】Answerの処理を実行
		if (( 0.89*dw <= mx) && (mx <= dw )) { if (( 0.92*dh <= my) && (my <= dh )) {
		  yes_or_no();
		}}
		for(i=0;i<=4;i++){
		 var xratio = eval("s"+sc)[i][3];
		 var yratio = eval("s"+sc)[i][4];
		 var xlef = eval("s"+sc)[i][0] * xratio;
		 var ytop = eval("s"+sc)[i][1] * yratio;
		 var xrad = (eval("p"+sc)[i][2]*dw) * xratio;
		 var yrad = (eval("p"+sc)[i][3]*df) * yratio;
		 var wp   = (eval("p"+sc)[i][0]*dw) * xratio;
		 var hp   = (eval("p"+sc)[i][1]*df) * yratio;
		 
		 if(alr[i] == 1){
		  if (( wp-xrad <= mx) && (mx <= wp+xrad )) {
		   if (( (( hp-yrad <=my)&&(my<= hp+yrad)) &&(my<=df) ) || ( (( hp-yrad+df<=my)&&(my<= hp+yrad+df)) && (df<=my)&& ((my<=0.92*dh)||(mx<=0.89*dw)) )) {
		    for(c=2;c<=3;c++){
			eval("ctx"+c).save();
			eval("ctx"+c).beginPath();
			eval("ctx"+c).scale(eval("s"+sc)[i][3],eval("s"+sc)[i][4]);
			eval("ctx"+c).arc(eval("s"+sc)[i][0],eval("s"+sc)[i][1],eval("s"+sc)[i][2],0,Math.PI*2,false);
			eval("ctx"+c).fillStyle = "rgba(0,0 ,0,0)";// 色の指定
			eval("ctx"+c).fill();
			eval("ctx"+c).strokeStyle = "rgba(255,0,51,1)";
			eval("ctx"+c).lineWidth = 4;
			eval("ctx"+c).stroke();
			eval("ctx"+c).restore();
			}
		    alr[i] = 2;
		    count1 = count1-1;
		    ctx5.clearRect(0, 0, 480, 645);//表示クリア
		    count();
		    if(count1 == 0){
		     if(sc == 30){ finish(); } else { nextstage(); }
		    }
		   }
		  }
		 }
		}
	  }//);
	} hit();
    }
  }
}

