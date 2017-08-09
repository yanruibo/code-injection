


onload = function() {
	imgT = document.getElementById('top');
	imgO = document.getElementById('op');
	imgE = document.getElementById('end');
	imgR = document.getElementById('right');
	imgA = document.getElementById('ans');
	imgY = document.getElementById('yes_no');
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
		ctx1.clearRect(0, 0, 640, 860);
		ctx1.globalAlpha = al;
		ctx1.drawImage(imgO, 0, 0);
		al=al+0.1;
	  }
	}
	timerID=setInterval(anime,50);
	
	function toppage(){
	  var dw = window.innerWidth; var dh = window.innerHeight; var df = dh/2;
	  ctx1.globalAlpha = 1;
	  ctx1.clearRect(0, 0, 640, 860);
	  ctx1.drawImage(imgT, 0, 0);
	
	  //canvas5.onmousedown = (function(e) {
	  canvas5.ontouchstart=function(){
		e=event.touches[0];
		var rect = e.target.getBoundingClientRect();
		var mx = e.clientX - rect.left; var my = e.clientY - rect.top;
		console.log(mx); console.log(my);
		if (( 0.1*dw <= mx) && (mx <= 0.9*dw )) { if (( 0.64*dh <= my) && (my <= 0.77*dh )) {
			window.localStorage.clear();
			draw();
		 }else if(( 0.83*dh <= my) && (my <= 0.96*dh )) {
			draw();
		}}
	  }//);
	}
}
/*--------------------------------------------*/

function draw() {
 var dw = window.innerWidth; var dh = window.innerHeight; var df = dh/2;
 var sc = new Number(window.localStorage.getItem( "sckey" ));
 if( sc == 0 ){ sc = new Number(1); }
  for(l=1;l<=30;l++){
    if(sc == l){
	for(a=1;a<=5;a++) { eval("ctx"+a).clearRect(0, 0, 640, 860); }
	var alr = [1,1,1,1,1];
	var s1 = [[57,160,35,4.5,1],[480,31,16,1,2],[120,426,30,2.2,1],[480,232,15,1,1.2],[107,419,19,1,1]];
	var s2 = [[178,35,14,1,5.2],[294,278,20,1,1],[290,98,22,1,1],[262,425,22,1,1],[430,81,14,1,2.7]];
	var s3 = [[35,110,22,1,1],[210,151,22,1,1],[430,120,35,1,1.3],[142,20,34,1,1],[35,402,60,1.5,1]];
	var s4 = [[60,120,16,1.3,1],[162,410,55,2,1],[200,184,24,1,1],[30,365,26,3,1],[607,209,22,1,1]];
	var s5 = [[167,173,26,1.6,1],[234,223,24,1,1],[325,280,22,1,1],[395,160,22,1,2.5],[70,170,18,1,1]];
	var s6 = [[234,50,40,1.5,1],[66,198,20,1,1],[360,250,27,1,1],[192,205,27,1,2],[470,284,50,1.2,1]];
	var s7 = [[135,388,52,1,1],[403,30,54,1,1],[230,82,40,1,1],[10,330,50,1,1],[478,286,30,1,1]];
	var s8 = [[137,50,45,1,1],[86,215,20,3,1],[355,402,22,1,1],[330,350,30,1.2,1],[439,336,22,1.2,1]];
	var s9 = [[335,61,40,1,1.3],[125,378,50,1,1],[220,260,25,1,1],[50,220,46,1,1],[135,375,50,3,1]];
	var s10 = [[330,67,31,1,1],[402,124,44,1,1.2],[282,385,68,1,1],[378,157,24,1,1.8],[458,250,52,1,1.5]];
	var s11 = [[261,60,25,1,1],[30,380,35,3,1],[318,286,22,1,1],[530,68,24,1,2.2],[590,70,25,1,2.2]];
	var s12 = [[145,124,56,1.3,1],[134,398,40,1.5,1],[425,267,52,1.2,1],[85,64,23,1,2.3],[310,220,58,1.2,1]];
	var s13 = [[47,62,22,2.5,1],[220,268,34,1,1.4],[350,248,33,1,1.5],[205,140,30,1,1],[185,85,35,2.2,1]];
	var s14 = [[35,320,22,1.5,1],[95,147,16,1,2.4],[290,280,24,1.4,1],[495,300,26,1,1],[230,168,38,2,1]];
	var s15 = [[43,290,28,1,1],[185,25,26,1.5,1],[322,203,24,1,1.5],[107,297,15,2,1],[377,125,20,1,1]];
	var s16 = [[131,80,23,1,1.5],[110,327,36,1,1.2],[270,172,25,1,1],[548,216,20,1,1],[400,305,35,1,1.3]];
	var s17 = [[272,57,30,1.4,1],[413,179,20,1,1],[162,238,26,1.3,1],[299,202,28,1,1],[213,394,35,1,1]];
	var s18 = [[36,280,32,1.5,1],[132,310,25,2,1],[124,90,45,1.8,1],[470,220,20,1,1],[424,198,25,1.4,1]];
	var s19 = [[77,135,53,1.5,1],[104,254,50,1.4,1],[240,45,28,1,1],[158,390,25,2.5,1],[260,235,25,1.2,1]];
	var s20 = [[150,75,18,1,2.5],[85,395,30,3.5,1],[450,24,30,1,3],[458,364,36,1,1],[340,16,20,1,1]];
	var s21 = [[287,19,25,1,1.8],[42,19,27,1,1],[110,422,22,1,1],[420,250,25,1,1.5],[479,112,27,1,1.7]];
	var s22 = [[93,405,32,1,1],[52,55,47,1,1],[314,91,28,1,1],[469,320,20,1,1],[542,288,38,1,1]];
	var s23 = [[106,82,24,1,1.5],[352,80,20,1,1],[4,135,30,1,3],[503,250,32,1,1],[110,5,42,2,1]];
	var s24 = [[22,231,33,1,1],[255,62,32,1.3,1],[79,50,28,1.5,1],[452,165,35,1,1.5],[190,430,60,1,1]];
	var s25 = [[117,-5,37,1,1],[128,412,19,1,1],[102,189,22,1.8,1],[394,29,24,1,1],[434,344,30,1,1]];
	var s26 = [[118,62,15,3,1],[505,22,36,1,1.2],[338,280,62,1,1],[52,305,22,2.5,1],[137,424,35,1.6,1]];
	var s27 = [[194,128,43,1,1.5],[80,370,23,1,1],[390,420,30,1,1],[192,207,31,1,2],[452,36,24,1,1.2]];
	var s28 = [[33,305,50,1,1],[368,80,21,1,1.8],[601,198,16,1,1],[96,180,16,1,1],[232,403,42,1,1]];
	var s29 = [[43,117,21,2.5,1],[540,76,40,1,1],[446,281,25,1,1.4],[425,295,16,1,1],[425,100,30,1,1.4]];
	var s30 = [[190,391,20,1,1],[115,150,26,1,1.4],[175,50,22,1,1.6],[160,165,23,1,1.6],[107,263,26,2.3,1]];
	
	var p1 =[[0.09,0.37,0.05,0.08],[0.75,0.07,0.03,0.04],[0.19,0.99,0.05,0.07],[0.75,0.54,0.02,0.03],[0.17,0.97,0.03,0.04]];
	var p2=[[0.28,0.08,0.02,0.03],[0.46,0.65,0.03,0.05],[0.45,0.23,0.03,0.05],[0.41,0.99,0.03,0.05],[0.67,0.19,0.02,0.03]];
	var p3=[[0.05,0.26,0.03,0.05],[0.33,0.35,0.03,0.05],[0.67,0.28,0.05,0.08],[0.22,0.05,0.05,0.08],[0.05,0.93,0.09,0.14]];
	var p4=[[0.09,0.28,0.03,0.04],[0.25,0.95,0.09,0.13],[0.31,0.43,0.04,0.06],[0.05,0.85,0.04,0.06],[0.95,0.49,0.03,0.05]];
	var p5=[[0.26,0.4,0.04,0.06],[0.37,0.52,0.04,0.06],[0.51,0.65,0.03,0.05],[0.62,0.37,0.03,0.05],[0.11,0.4,0.03,0.04]];
	var p6=[[0.37,0.12,0.06,0.09],[0.1,0.46,0.03,0.05],[0.56,0.58,0.04,0.06],[0.3,0.48,0.04,0.06],[0.73,0.66,0.08,0.12]];
	var p7=[[0.21,0.9,0.08,0.12],[0.63,0.07,0.08,0.13],[0.36,0.19,0.06,0.09],[0.02,0.77,0.08,0.12],[0.75,0.67,0.05,0.07]];
	var p8=[[0.21,0.12,0.07,0.1],[0.13,0.5,0.03,0.05],[0.55,0.93,0.03,0.05],[0.52,0.81,0.05,0.07],[0.69,0.78,0.03,0.05]];
	var p9=[[0.52,0.14,0.06,0.09],[0.2,0.88,0.08,0.12],[0.34,0.6,0.04,0.06],[0.08,0.51,0.07,0.11],[0.21,0.87,0.08,0.12]];
	var p10=[[0.52,0.16,0.05,0.07],[0.63,0.29,0.07,0.1],[0.44,0.9,0.11,0.16],[0.59,0.37,0.04,0.06],[0.72,0.58,0.08,0.12]];
	var p11=[[0.41,0.14,0.04,0.06],[0.05,0.88,0.05,0.08],[0.5,0.67,0.03,0.05],[0.83,0.16,0.04,0.06],[0.92,0.16,0.04,0.06]];
	var p12=[[0.23,0.29,0.09,0.13],[0.21,0.93,0.06,0.09],[0.66,0.62,0.08,0.12],[0.13,0.15,0.04,0.05],[0.48,0.51,0.09,0.13]];
	var p13=[[0.07,0.14,0.03,0.05],[0.34,0.62,0.05,0.08],[0.55,0.58,0.05,0.08],[0.32,0.33,0.05,0.07],[0.29,0.2,0.05,0.08]];
	var p14=[[0.05,0.74,0.03,0.05],[0.15,0.34,0.03,0.04],[0.45,0.65,0.04,0.06],[0.77,0.7,0.04,0.06],[0.36,0.39,0.06,0.09]];
	var p15=[[0.07,0.67,0.04,0.07],[0.29,0.06,0.04,0.06],[0.5,0.47,0.04,0.06],[0.17,0.69,0.02,0.03],[0.59,0.29,0.03,0.05]];
	var p16=[[0.2,0.19,0.04,0.05],[0.17,0.76,0.06,0.08],[0.42,0.4,0.04,0.06],[0.86,0.5,0.03,0.05],[0.63,0.71,0.05,0.08]];
	var p17=[[0.43,0.13,0.05,0.07],[0.65,0.42,0.03,0.05],[0.25,0.55,0.04,0.06],[0.47,0.47,0.04,0.07],[0.33,0.92,0.05,0.08]];
	var p18=[[0.06,0.65,0.05,0.07],[0.21,0.72,0.04,0.06],[0.19,0.21,0.07,0.1],[0.73,0.51,0.03,0.05],[0.66,0.46,0.04,0.06]];
	var p19=[[0.12,0.31,0.08,0.12],[0.16,0.59,0.08,0.12],[0.38,0.1,0.04,0.07],[0.25,0.91,0.04,0.06],[0.41,0.55,0.04,0.06]];
	var p20=[[0.23,0.17,0.03,0.04],[0.13,0.92,0.05,0.07],[0.7,0.06,0.05,0.07],[0.72,0.85,0.06,0.08],[0.53,0.04,0.03,0.05]];
	var p21=[[0.45,0.04,0.04,0.06],[0.07,0.04,0.04,0.06],[0.17,0.98,0.03,0.05],[0.66,0.58,0.04,0.06],[0.75,0.26,0.04,0.06]];
	var p22=[[0.15,0.94,0.05,0.07],[0.08,0.13,0.07,0.11],[0.49,0.21,0.04,0.07],[0.73,0.74,0.03,0.05],[0.85,0.67,0.06,0.09]];
	var p23=[[0.17,0.19,0.04,0.06],[0.55,0.19,0.03,0.05],[0.01,0.31,0.05,0.07],[0.79,0.58,0.05,0.07],[0.17,0.01,0.07,0.1]];
	var p24=[[0.03,0.54,0.05,0.08],[0.4,0.14,0.05,0.07],[0.12,0.12,0.04,0.07],[0.71,0.38,0.05,0.08],[0.3,1,0.09,0.14]];
	var p25=[[0.18,-0.01,0.06,0.09],[0.2,0.96,0.03,0.04],[0.16,0.44,0.03,0.05],[0.62,0.07,0.04,0.06],[0.68,0.8,0.05,0.07]];
	var p26=[[0.18,0.14,0.02,0.03],[0.79,0.05,0.06,0.08],[0.53,0.65,0.1,0.14],[0.08,0.71,0.03,0.05],[0.21,0.99,0.05,0.08]];
	var p27=[[0.3,0.3,0.07,0.1],[0.13,0.86,0.04,0.05],[0.61,0.98,0.05,0.07],[0.3,0.48,0.05,0.07],[0.71,0.08,0.04,0.06]];
	var p28=[[0.05,0.71,0.08,0.12],[0.58,0.19,0.03,0.05],[0.94,0.46,0.03,0.04],[0.15,0.42,0.03,0.04],[0.36,0.94,0.07,0.1]];
	var p29=[[0.07,0.27,0.03,0.05],[0.84,0.18,0.06,0.09],[0.7,0.65,0.04,0.06],[0.66,0.69,0.03,0.04],[0.66,0.23,0.05,0.07]];
	var p30=[[0.3,0.91,0.03,0.05],[0.18,0.35,0.04,0.06],[0.27,0.12,0.03,0.05],[0.25,0.38,0.04,0.05],[0.17,0.61,0.04,0.06]];


	/*--------------------------------------------*/
	ctx1.drawImage(eval("bimg"+l), 0, 0);	// 背景の画像を表示（重ね順①）
	ctx4.drawImage(imgR,573, 0);		// ライトの画像を表示（重ね順④）
	ctx4.drawImage(imgA, 575, 805); 	// Ansの画像を表示（重ね順④）
	
	/*---------カウント関数（重ね順⑤）---------*/
	var count1 = 5;
	function count() {
		ctx5.font = "42pt Arial";
		ctx5.fillText(count1, 590, 55);
	}count();
	/*---------nextstage画像を表示（重ね順⑤）---------*/
	function nextstage() {
	  setTimeout( function() {
		ctx5.drawImage(imgNE1, 0, 260);
		//canvas5.onmousedown = (function(e) {
		canvas5.ontouchstart=function(){
			e=event.touches[0];
			var rect = e.target.getBoundingClientRect();
			var mx = e.clientX - rect.left; var my = e.clientY - rect.top;
			console.log(mx); console.log(my);
			if ((0 <= mx) && (mx <= dw)) { if (( 0.3*dh <= my) && (my <= 0.67*dh )) {
				sc = new Number(sc + 1);
				window.localStorage.setItem( "sckey" , sc);
				draw();
			}}
		}//);
	  }, 600);
	}
	/*---------答えを見る　YES or NO を表示（重ね順⑤）---------*/
	function yes_or_no() {
		ctx5.drawImage(imgY, 70, 305);
		//canvas5.onmousedown = (function(e) {
		canvas5.ontouchstart=function(){
			e=event.touches[0];
			var rect = e.target.getBoundingClientRect();
			var mx = e.clientX - rect.left; var my = e.clientY - rect.top;
			console.log(mx); console.log(my);
			if (( 0.49*dh <= my) && (my <= 0.59*dh )) { if (( 0.19*dw <= mx) && (mx <= 0.43*dw )) {
				ctx5.clearRect(0, 305, 640, 555); //表示クリア
				answer();
			 }else if(( 0.55*dw <= mx) && (mx <= 0.78*dw )) {
				ctx5.clearRect(0, 305, 640, 555); //表示クリア
				hit();
			}}
		}//);
	}
	/*---------YESだった時の処理---------*/
	function answer() {
	  ctx4.drawImage(imgNE2, 210, 374);
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
		if (( 0.43*dh <= my) && (my <= 0.57*dh )) { if (( 0.33*dw <= mx) && (mx <= 0.68*dw )) {
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
		if ((0.13*dw <= mx) && (mx <= 0.85*dw)) { if ((0.78*dh <= my) && (my <= 0.92*dh)) {
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
		if (( 0.89*dw <= mx) && (mx <= dw )) { if (( 0.93*dh <= my) && (my <= dh )) {
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
		   if ( (( hp-yrad+df<=my)&&(my<= hp+yrad+df)) && (df<=my)&& ((my<=0.93*dh)||(mx<=0.89*dw)) ) {
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
		    ctx5.clearRect(0, 0, 640, 860);//表示クリア
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

