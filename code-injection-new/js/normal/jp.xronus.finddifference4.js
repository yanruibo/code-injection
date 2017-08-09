


onload = function() {
	imgT = document.getElementById('top');
	imgO = document.getElementById('op');
	imgE = document.getElementById('end');
	imgR = document.getElementById('right');
	imgA = document.getElementById('ans');
	imgY = document.getElementById('yes_no');
	imgNE1 = document.getElementById('next1');
	imgNE2 = document.getElementById('next2');
	imgFB  = document.getElementById('fb');
	imgTW  = document.getElementById('tw');
	
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
		ctx1.clearRect(0, 0, 1280, 1720);
		ctx1.globalAlpha = al;
		ctx1.drawImage(imgO, 0, 0);
		al=al+0.1;
	  }
	}
	timerID=setInterval(anime,50);
	
	function toppage(){
	  var dw = window.innerWidth; var dh = window.innerHeight; var df = dh/2;
	  ctx1.globalAlpha = 1;
	  ctx1.clearRect(0, 0, 1280, 1720);
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
	for(a=1;a<=5;a++) { eval("ctx"+a).clearRect(0, 0, 1280, 1720); }
	var alr = [1,1,1,1,1];
	var s1 = [[108,177,47,1,1],[820,352,61,1,1.7],[570,386,42,1,1.5],[476,250,44,1,1.2],[1084,400,44,1,1]];
	var s2 = [[290,74,50,1,1.8],[90,516,44,1,1],[370,495,44,1,1],[232,835,70,1,1],[890,400,75,1,1.8]];
	var s3 = [[290,657,47,1.3,1],[970,625,45,1,1],[440,75,70,1,1],[584,470,58,1,1.8],[556,426,50,1,1]];
	var s4 = [[35,137,88,1,1.5],[75,810,40,9,1],[185,323,58,5,1],[465,590,66,2,1],[1175,558,45,1,1]];
	var s5 = [[30,810,65,1.4,1],[178,512,50,1,1],[845,650,75,1.3,1],[835,660,57,1,1],[802,122,80,1,1]];
	var s6 = [[950,235,58,1,1.7],[1042,425,90,1,1.7],[407,224,40,1,1],[230,557,75,1.4,1],[565,350,58,1,1.9]];
	var s7 = [[315,183,48,2,1],[672,687,40,1.5,1],[632,358,40,1,2],[165,635,48,1.8,1],[105,392,68,1,1]];
	var s8 = [[592,305,40,1,1.5],[460,807,78,1.6,1],[496,206,38,1,1.5],[865,68,42,1,1.5],[120,300,78,1.8,1]];
	var s9 = [[587,110,60,1,1.5],[315,400,64,1,1.5],[975,112,60,1,1.5],[35,545,66,1,1.5],[589,540,62,1,1.5]];
	var s10 = [[140,177,42,1.8,1],[1012,67,66,1,1.5],[642,206,60,1,1],[422,528,54,1,1],[485,835,80,1,1]];
	var s11 = [[814,286,60,1,1.8],[805,395,72,1,2],[172,342,68,1,1],[25,520,92,1,1.5],[430,429,52,1,1]];
	var s12 = [[215,365,50,1,1],[380,455,48,1,1],[682,500,52,1,1],[815,160,72,1,1],[520,602,64,1,1.23]];
	var s13 = [[65,185,55,1.8,1],[77,820,55,1.8,1],[220,740,55,1.8,1],[360,425,55,1.8,1],[505,510,55,1.8,1]];
	var s14 = [[130,390,70,1,1],[470,240,70,1,1],[650,350,67,1.5,1],[522,790,78,1,1],[150,508,42,1.5,1]];
	var s15 = [[70,115,60,1,1],[529,86,55,1,1],[1030,100,65,1,2],[340,430,60,1,1.2],[857,780,55,1,1]];
	var s16 = [[115,240,52,1.4,1],[535,142,54,1,1.8],[70,820,52,1.5,1],[658,780,54,1,1],[258,720,54,1,1]];
	var s17 = [[50,270,105,1,2],[755,650,75,1,1],[1015,430,65,1,1],[350,30,60,1,1.5],[490,830,85,1,1]];
	var s18 = [[75,400,56,4,1],[620,172,60,1,1],[293,600,55,2,1],[910,495,75,1,1.2],[1150,580,82,1,1]];
	var s19 = [[75,200,60,1,1],[345,175,75,1,1],[90,615,78,1,1],[700,820,100,1,1],[960,215,65,1,1]];
	var s20 = [[445,610,82,1.2,1],[55,525,50,1,1],[165,80,66,1.8,1],[780,820,60,1,1],[1085,502,65,1,1.2]];
	var s21 = [[664,365,80,1.4,1],[262,341,46,1,1],[403,800,90,1.5,1],[320,10,65,1,1],[413,556,46,1,1]];
	var s22 = [[485,825,66,1,1],[1138,468,52,1,1],[596,170,50,1,1],[373,370,66,1,1],[152,505,44,1,1]];
	var s23 = [[85,680,75,1,1],[745,122,55,1,1],[780,480,60,1,1],[595,795,50,1,1],[142,388,46,2.2,1]];
	var s24 = [[15,138,55,4.5,1],[450,400,50,1,1],[425,80,60,1.3,1],[230,520,50,4.2,1],[100,455,65,1,1]];
	var s25 = [[1038,533,55,1,1],[290,460,50,1,1.3],[90,738,65,1,1],[185,400,38,1,1.5],[855,115,95,1,1]];
	var s26 = [[30,810,150,1,1],[750,810,92,1,1],[385,300,75,1.2,1],[10,250,90,1.2,1],[710,440,50,1,1]];
	var s27 = [[520,365,70,1,1],[765,370,72,1,1],[370,370,40,1,1],[630,20,105,1,1.3],[930,760,110,1,1]];
	var s28 = [[208,650,58,1,1],[440,225,40,1,1],[727,487,47,1,1],[550,300,60,1.2,1],[1010,520,100,1,1.5]];
	var s29 = [[100,485,74,2,1],[250,230,52,1,1],[740,530,52,1,1.2],[480,280,52,2,1],[280,548,45,1,1.3]];
	var s30 = [[405,245,43,1,1.8],[565,258,44,1,1],[960,155,60,1,1.5],[282,846,67,1.4,1],[985,710,55,1,1]];
	
	var p1 =[[0.08,0.21,0.04,0.05],[0.64,0.41,0.05,0.07],[0.45,0.45,0.03,0.05],[0.37,0.29,0.03,0.05],[0.85,0.47,0.03,0.05]];
	var p2=[[0.23,0.09,0.04,0.06],[0.07,0.6,0.03,0.05],[0.29,0.58,0.03,0.05],[0.18,0.97,0.05,0.08],[0.7,0.47,0.06,0.09]];
	var p3=[[0.23,0.76,0.04,0.05],[0.76,0.73,0.04,0.05],[0.34,0.09,0.05,0.08],[0.46,0.55,0.05,0.07],[0.43,0.5,0.04,0.06]];
	var p4=[[0.03,0.16,0.07,0.1],[0.06,0.94,0.03,0.05],[0.14,0.38,0.05,0.07],[0.36,0.69,0.05,0.08],[0.92,0.65,0.04,0.05]];
	var p5=[[0.02,0.94,0.05,0.08],[0.14,0.6,0.04,0.06],[0.66,0.76,0.06,0.09],[0.65,0.77,0.04,0.07],[0.63,0.14,0.06,0.09]];
	var p6=[[0.74,0.27,0.05,0.07],[0.81,0.49,0.07,0.1],[0.32,0.26,0.03,0.05],[0.18,0.65,0.06,0.09],[0.44,0.41,0.05,0.07]];
	var p7=[[0.25,0.21,0.04,0.06],[0.53,0.8,0.03,0.05],[0.49,0.42,0.03,0.05],[0.13,0.74,0.04,0.06],[0.08,0.46,0.05,0.08]];
	var p8=[[0.46,0.35,0.03,0.05],[0.36,0.94,0.06,0.09],[0.39,0.24,0.03,0.04],[0.68,0.08,0.03,0.05],[0.09,0.35,0.06,0.09]];
	var p9=[[0.46,0.13,0.05,0.07],[0.25,0.47,0.05,0.07],[0.76,0.13,0.05,0.07],[0.03,0.63,0.05,0.08],[0.46,0.63,0.05,0.07]];
	var p10=[[0.11,0.21,0.03,0.05],[0.79,0.08,0.05,0.08],[0.5,0.24,0.05,0.07],[0.33,0.61,0.04,0.06],[0.38,0.97,0.06,0.09]];
	var p11=[[0.64,0.33,0.05,0.07],[0.63,0.46,0.06,0.08],[0.13,0.4,0.05,0.08],[0.02,0.6,0.07,0.11],[0.34,0.5,0.04,0.06]];
	var p12=[[0.17,0.42,0.04,0.06],[0.3,0.53,0.04,0.06],[0.53,0.58,0.04,0.06],[0.64,0.19,0.06,0.08],[0.41,0.7,0.05,0.07]];
	var p13=[[0.05,0.22,0.04,0.06],[0.06,0.95,0.04,0.06],[0.17,0.86,0.04,0.06],[0.28,0.49,0.04,0.06],[0.39,0.59,0.04,0.06]];
	var p14=[[0.1,0.45,0.05,0.08],[0.37,0.28,0.05,0.08],[0.51,0.41,0.05,0.08],[0.41,0.92,0.06,0.09],[0.12,0.59,0.03,0.05]];
	var p15=[[0.05,0.13,0.05,0.07],[0.41,0.1,0.04,0.06],[0.8,0.12,0.05,0.08],[0.27,0.5,0.05,0.07],[0.67,0.91,0.04,0.06]];
	var p16=[[0.09,0.28,0.04,0.06],[0.42,0.17,0.04,0.06],[0.05,0.95,0.04,0.06],[0.51,0.91,0.04,0.06],[0.2,0.84,0.04,0.06]];
	var p17=[[0.04,0.31,0.08,0.12],[0.59,0.76,0.06,0.09],[0.79,0.5,0.05,0.08],[0.27,0.03,0.05,0.07],[0.38,0.97,0.07,0.1]];
	var p18=[[0.06,0.47,0.04,0.07],[0.48,0.2,0.05,0.07],[0.23,0.7,0.04,0.06],[0.71,0.58,0.06,0.09],[0.9,0.67,0.06,0.1]];
	var p19=[[0.06,0.23,0.05,0.07],[0.27,0.2,0.06,0.09],[0.07,0.72,0.06,0.09],[0.55,0.95,0.08,0.12],[0.75,0.25,0.05,0.08]];
	var p20=[[0.35,0.71,0.06,0.1],[0.04,0.61,0.04,0.06],[0.13,0.09,0.05,0.08],[0.61,0.95,0.05,0.07],[0.85,0.58,0.05,0.08]];
	var p21=[[0.52,0.42,0.06,0.09],[0.2,0.4,0.04,0.05],[0.31,0.93,0.07,0.1],[0.25,0.01,0.05,0.08],[0.32,0.65,0.04,0.05]];
	var p22=[[0.38,0.96,0.05,0.08],[0.89,0.54,0.04,0.06],[0.47,0.2,0.04,0.06],[0.29,0.43,0.05,0.08],[0.12,0.59,0.03,0.05]];
	var p23=[[0.07,0.79,0.06,0.09],[0.58,0.14,0.04,0.06],[0.61,0.56,0.05,0.07],[0.46,0.92,0.04,0.06],[0.11,0.45,0.04,0.05]];
	var p24=[[0.01,0.16,0.04,0.06],[0.35,0.47,0.04,0.06],[0.33,0.09,0.05,0.07],[0.18,0.6,0.04,0.06],[0.08,0.53,0.05,0.08]];
	var p25=[[0.81,0.62,0.04,0.06],[0.23,0.53,0.04,0.06],[0.07,0.86,0.05,0.08],[0.14,0.47,0.03,0.04],[0.67,0.13,0.07,0.11]];
	var p26=[[0.02,0.94,0.12,0.17],[0.59,0.94,0.07,0.11],[0.3,0.35,0.06,0.09],[0.01,0.29,0.07,0.1],[0.55,0.51,0.04,0.06]];
	var p27=[[0.41,0.42,0.05,0.08],[0.6,0.43,0.06,0.08],[0.29,0.43,0.03,0.05],[0.49,0.02,0.08,0.12],[0.73,0.88,0.09,0.13]];
	var p28=[[0.16,0.76,0.05,0.07],[0.34,0.26,0.03,0.05],[0.57,0.57,0.04,0.05],[0.43,0.35,0.05,0.07],[0.79,0.6,0.08,0.12]];
	var p29=[[0.08,0.56,0.06,0.09],[0.2,0.27,0.04,0.06],[0.58,0.62,0.04,0.06],[0.38,0.33,0.04,0.06],[0.22,0.64,0.04,0.05]];
	var p30=[[0.32,0.28,0.03,0.05],[0.44,0.3,0.03,0.05],[0.75,0.18,0.05,0.07],[0.22,0.98,0.05,0.08],[0.77,0.83,0.04,0.06]];

	/*--------------------------------------------*/
	ctx1.drawImage(eval("bimg"+l), 0, 0);	// 背景の画像を表示（重ね順①）
	ctx4.drawImage(imgR, 1146, 0);		// ライトの画像を表示（重ね順④）
	ctx4.drawImage(imgA, 1150, 1610); 	// Ansの画像を表示（重ね順④）
	
	/*---------カウント関数（重ね順⑤）---------*/
	var count1 = 5;
	function count() {
		ctx5.font = "87pt Arial";
		ctx5.fillText(count1, 1180, 115);
	}count();
	/*---------nextstage画像を表示（重ね順⑤）---------*/
	function nextstage() {
	  setTimeout( function() {
		ctx5.drawImage(imgNE1, 0, 520);
		ctx5.drawImage(imgFB, 410, 980);
		ctx5.drawImage(imgTW, 670, 980);
		//canvas5.onmousedown = (function(e) {
		canvas5.ontouchstart=function(){
			e=event.touches[0];
			var rect = e.target.getBoundingClientRect();
			var mx = e.clientX - rect.left; var my = e.clientY - rect.top;
			console.log(mx); console.log(my);
			if ((0 <= mx) && (mx <= dw)) { if (( 0.3*dh <= my) && (my <= 0.57*dh )) {
				sc = new Number(sc + 1);
				window.localStorage.setItem( "sckey" , sc);
				draw();
			}}
			if ((0.57*dh <= my) && (my <= 0.69*dh )) { if ((0.32*dw <= mx) && (mx <= 0.48*dw)) {
				location.href = "http://www.facebook.com/sharer.php?u= https://play.google.com/store/apps/details?id=jp.xronus.finddifference4";
			 }else if((0.52*dw <= mx) && (mx <= 0.68*dw)) {
			 	var cmt1 = encodeURIComponent("Let's look for a difference together!");
				var cmt2 = encodeURIComponent("[ Find Difference4 ]");
				var cmt3 = encodeURIComponent("https://play.google.com/store/apps/details?id=jp.xronus.finddifference4");
				location.href = "http://twitter.com/home?status=" + cmt1 +"%0D%0A"+ cmt2 +"%0D%0A"+ cmt3;
			}}
		}//);
	  }, 600);
	}
	/*---------答えを見る　YES or NO を表示（重ね順⑤）---------*/
	function yes_or_no() {
		ctx5.drawImage(imgY, 140, 610);
		ctx5.drawImage(imgFB, 410, 1020);
		ctx5.drawImage(imgTW, 670, 1020);
		//canvas5.onmousedown = (function(e) {
		canvas5.ontouchstart=function(){
			e=event.touches[0];
			var rect = e.target.getBoundingClientRect();
			var mx = e.clientX - rect.left; var my = e.clientY - rect.top;
			console.log(mx); console.log(my);
			if (( 0.49*dh <= my) && (my <= 0.59*dh )) { if (( 0.19*dw <= mx) && (mx <= 0.43*dw )) {
				ctx5.clearRect(0, 610, 1280, 640); //表示クリア
				answer();
			 }else if(( 0.55*dw <= mx) && (mx <= 0.78*dw )) {
				ctx5.clearRect(0, 610, 1280, 640); //表示クリア
				hit();
			}}
			if ((0.6*dh <= my) && (my <= 0.7*dh )) { if ((0.32*dw <= mx) && (mx <= 0.48*dw)) {
				location.href = "http://www.facebook.com/sharer.php?u= https://play.google.com/store/apps/details?id=jp.xronus.finddifference4";
			 }else if((0.52*dw <= mx) && (mx <= 0.68*dw)) {
			 	var cmt1 = encodeURIComponent("Let's look for a difference together!");
				var cmt2 = encodeURIComponent("[ Find Difference4 ]");
				var cmt3 = encodeURIComponent("https://play.google.com/store/apps/details?id=jp.xronus.finddifference4");
				location.href = "http://twitter.com/home?status=" + cmt1 +"%0D%0A"+ cmt2 +"%0D%0A"+ cmt3;
			}}
		}//);
	}
	/*---------YESだった時の処理---------*/
	function answer() {
	  ctx4.drawImage(imgNE2, 420, 748);
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
		eval("ctx"+c).lineWidth = 8;
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
			eval("ctx"+c).lineWidth = 8;
			eval("ctx"+c).stroke();
			eval("ctx"+c).restore();
			}
		    alr[i] = 2;
		    count1 = count1-1;
		    ctx5.clearRect(0, 0, 1280, 1720);//表示クリア
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

