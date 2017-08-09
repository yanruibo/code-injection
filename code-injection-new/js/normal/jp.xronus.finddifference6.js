


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
	
	// canvas1đo(wi)
	canvas1 = document.getElementById('id_canvas1');
	if (!canvas1 || !canvas1.getContext) {return false;}
	ctx1 = canvas1.getContext('2d');
	// canvas2đo(˝čĚŰş)
	canvas2 = document.getElementById('id_canvas2');
	ctx2 = canvas2.getContext('2d');
	// canvas3đo(˝čĚŰă)
	canvas3 = document.getElementById('id_canvas3');
	ctx3 = canvas3.getContext('2d');
	// canvas4đo(Cgć,onoff,Ans)
	canvas4 = document.getElementById('id_canvas4');
	ctx4 = canvas4.getContext('2d');
	// canvas5đo(nextstage,JEgś)
	canvas5 = document.getElementById('id_canvas5');
	ctx5 = canvas5.getContext('2d');
	
	var al=0.1;
	function anime(){
	 var dw = window.innerWidth; //Ąćž
	 var h1 = window.innerHeight;//cćž
	 var h2 = dw/6.4;	//}NĚLc(ĄŠçcđvZ)
	 var h3 = 1720/h1;	//1720:cĚäŚđvZ
	 var h4 = h2 * h3;	//~NĚLc(cÉäŚđ|Żé)
	 var dh = h1 - h2;	//}NĚQ[ćĘc(cŠçLŞđř­)
	 var dh2= 1720-h4;	//~NĚQ[ćĘc
	 var df = dh/2;		//}NĚQ[ćĘcĚźŞ
	
	  if(al>=1){
		clearInterval(timerID);
		setTimeout(toppage,5000);
	  }else{
		ctx1.clearRect(0, 0, 1280, 1720);
		ctx1.globalAlpha = al;
		ctx1.drawImage(imgO, 0, 0,1280, dh2);
		al=al+0.1;
	  }
	}
	timerID=setInterval(anime,50);
	
	function toppage(){
	 var dw = window.innerWidth; //Ąćž
	 var h1 = window.innerHeight;//cćž
	 var h2 = dw/6.4;	//}NĚLc(ĄŠçcđvZ)
	 var h3 = 1720/h1;	//1720:cĚäŚđvZ
	 var h4 = h2 * h3;	//~NĚLc(cÉäŚđ|Żé)
	 var dh = h1 - h2;	//}NĚQ[ćĘc(cŠçLŞđř­)
	 var dh2= 1720-h4;	//~NĚQ[ćĘc
	 var df = dh/2;		//}NĚQ[ćĘcĚźŞ
	
	  ctx1.globalAlpha = 1;
	  ctx1.clearRect(0, 0, 1280, 1720);
	  ctx1.drawImage(imgT, 0, 0,1280, dh2);
	
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
 var dw = window.innerWidth; //Ąćž
 var h1 = window.innerHeight;//cćž
 var h2 = dw/6.4;	//}NĚLc(ĄŠçcđvZ)
 var h3 = 1720/h1;	//1720:cĚäŚđvZ
 var h4 = h2 * h3;	//~NĚLc(cÉäŚđ|Żé)
 var dh = h1 - h2;	//}NĚQ[ćĘc(cŠçLŞđř­)
 var dh2= 1720-h4;	//~NĚQ[ćĘc
 var df = dh/2;		//}NĚQ[ćĘcĚźŞ
 var df2 = dh2/2;	//~NĚQ[ćĘcĚźŞ
 
 var sc = new Number(window.localStorage.getItem( "sckey" ));
 if( sc == 0 ){ sc = new Number(1); }
  for(l=1;l<=30;l++){
    if(sc == l){
	for(a=1;a<=5;a++) { eval("ctx"+a).clearRect(0, 0, 1280, 1720); }
	var alr = [1,1,1,1,1];
	var s1 = [[70,478,55,1,1],[562,360,62,1,1],[265,605,48,1.5,1],[1125,115,55,1,1],[935,188,55,1,1]];
	var s2 = [[160,720,115,1,1],[476,838,115,1,1],[805,45,65,1,1.5],[865,295,60,1,2],[445,300,70,1,1]];
	var s3 = [[430,220,55,1,1],[405,760,90,1.2,1],[680,320,55,1,1],[154,152,58,1,1],[908,505,75,1.2,1]];
	var s4 = [[272,228,85,1.2,1],[320,550,135,1.1,1],[864,775,85,1.1,1],[525,820,85,1.2,1],[410,590,75,1.6,1]];
	var s5 = [[245,170,60,1,1],[1120,270,60,1,1],[120,670,75,1,1],[765,290,50,1,1.5],[675,234,50,1,1]];
	var s6 = [[240,140,48,1.4,1],[655,54,80,1,1],[392,240,73,1,1.2],[440,780,72,1.3,1],[792,590,54,1,1]];
	var s7 = [[140,340,150,1,1],[460,65,65,1,1],[800,510,64,1,1.5],[812,225,56,1,1],[350,645,50,3.2,1]];
	var s8 = [[20,98,60,1,1],[750,290,66,1,1],[230,830,90,1.2,1],[650,575,100,1.5,1],[205,560,52,2.5,1]];
	var s9 = [[835,495,70,1,1],[1165,490,55,1,1],[1162,722,54,1,1],[316,348,55,1,1],[20,20,80,1,1]];
	var s10 = [[0,105,62,1,1.5],[690,880,100,1.5,1],[912,440,50,1,1],[280,150,65,1,1],[705,353,70,1,1.2]];
	var s11 = [[210,197,75,1,1.8],[1085,195,68,1,1],[930,575,62,1,1],[670,730,55,1,1],[190,685,60,1,1]];
	var s12 = [[-0,145,85,1,1.2],[550,450,105,1,1],[1025,350,77,1,1],[810,220,77,1,1],[450,830,90,1,1]];
	var s13 = [[410,590,58,1,1],[730,265,57,1,1.8],[1110,310,55,1,1],[50,590,50,2.2,1],[564,74,54,1,1.3]];
	var s14 = [[585,825,62,1,1],[615,410,70,1.5,1],[435,402,70,1,1],[310,755,65,1,1],[830,195,80,1,1]];
	var s15 = [[1020,120,60,1,1],[400,785,100,1,1],[400,150,68,1,1],[175,270,65,1,2.2],[710,655,60,1,1]];
	var s16 = [[868,230,55,1,1],[835,722,60,1,1],[934,344,50,1,1],[615,325,80,1,1],[1110,590,95,1,1]];
	var s17 = [[72,265,50,1,1.5],[234,438,55,1,1],[692,370,55,1,1],[990,550,58,1,1],[1060,152,65,1,1]];
	var s18 = [[430,150,60,1.6,1],[238,538,54,1,1],[550,628,60,1,1],[434,298,52,1,1],[1095,210,55,1,1]];
	var s19 = [[400,120,60,1,1],[210,460,70,1,1.7],[1190,415,70,1,1],[205,75,60,1,1],[850,290,60,1,1]];
	var s20 = [[1025,225,55,1,1],[475,140,60,1,1.5],[460,735,85,1,1],[580,550,70,1,1],[935,500,75,1,1.2]];
	var s21 = [[905,105,54,1,1],[365,20,54,1,1],[950,340,65,1,1],[310,510,65,1,1],[470,860,90,1.2,1]];
	var s22 = [[150,800,68,1,1],[1095,475,60,1,1],[720,535,68,1,1],[495,130,75,1,1],[340,300,55,1,1]];
	var s23 = [[370,250,60,1,1],[130,465,70,1.2,1],[225,825,60,1,1],[920,190,54,1,1],[1090,310,90,1,1.2]];
	var s24 = [[50,715,77,1,1],[555,145,55,1,1],[950,560,60,1,1],[785,230,65,1,1],[155,190,70,1,1]];
	var s25 = [[440,130,65,1,1.3],[715,130,70,1,1],[860,218,55,1,1.4],[985,570,70,1,1.4],[674,720,58,1,1]];
	var s26 = [[805,170,60,1,1],[710,472,90,1.1,1],[290,830,80,2.2,1],[335,835,70,1,1],[140,380,85,1.6,1]];
	var s27 = [[270,315,110,1,1],[70,445,60,1,1.5],[595,800,56,1.5,1],[500,100,90,1.2,1],[275,550,70,1.2,1]];
	var s28 = [[327,434,53,1.6,1],[850,620,58,1,1],[120,318,56,1,1.5],[455,840,55,1,1],[1115,710,70,1,1]];
	var s29 = [[280,455,65,1,1],[475,345,50,2.5,1],[200,810,90,1,1],[226,230,60,1,1],[1000,830,70,1,1]];
	var s30 = [[300,512,55,1,1.5],[40,845,60,1,1],[1190,550,90,1,1],[340,535,55,1,1],[10,130,100,1.2,1]];
	
	var p1 =[[0.05,0.56,0.04,0.06],[0.44,0.42,0.05,0.07],[0.21,0.7,0.04,0.06],[0.88,0.13,0.04,0.06],[0.73,0.22,0.04,0.06]];
	var p2=[[0.13,0.84,0.09,0.13],[0.37,0.97,0.09,0.13],[0.63,0.05,0.05,0.08],[0.68,0.34,0.05,0.07],[0.35,0.35,0.05,0.08]];
	var p3=[[0.34,0.26,0.04,0.06],[0.32,0.88,0.07,0.1],[0.53,0.37,0.04,0.06],[0.12,0.18,0.05,0.07],[0.71,0.59,0.06,0.09]];
	var p4=[[0.21,0.27,0.07,0.1],[0.25,0.64,0.11,0.16],[0.68,0.9,0.07,0.1],[0.41,0.95,0.07,0.1],[0.32,0.69,0.06,0.09]];
	var p5=[[0.19,0.2,0.05,0.07],[0.88,0.31,0.05,0.07],[0.09,0.78,0.06,0.09],[0.6,0.34,0.04,0.06],[0.53,0.27,0.04,0.06]];
	var p6=[[0.19,0.16,0.04,0.06],[0.51,0.06,0.06,0.09],[0.31,0.28,0.06,0.08],[0.34,0.91,0.06,0.08],[0.62,0.69,0.04,0.06]];
	var p7=[[0.11,0.4,0.12,0.17],[0.36,0.08,0.05,0.08],[0.63,0.59,0.05,0.07],[0.63,0.26,0.04,0.07],[0.27,0.75,0.04,0.06]];
	var p8=[[0.02,0.11,0.05,0.07],[0.59,0.34,0.05,0.08],[0.18,0.97,0.07,0.1],[0.51,0.67,0.08,0.12],[0.16,0.65,0.04,0.06]];
	var p9=[[0.65,0.58,0.05,0.08],[0.91,0.57,0.04,0.06],[0.91,0.84,0.04,0.06],[0.25,0.4,0.04,0.06],[0.02,0.02,0.06,0.09]];
	var p10=[[0,0.12,0.05,0.07],[0.54,1.02,0.08,0.12],[0.71,0.51,0.04,0.06],[0.22,0.17,0.05,0.08],[0.55,0.41,0.05,0.08]];
	var p11=[[0.16,0.23,0.06,0.09],[0.85,0.23,0.05,0.08],[0.73,0.67,0.05,0.07],[0.52,0.85,0.04,0.06],[0.15,0.8,0.05,0.07]];
	var p12=[[0,0.17,0.07,0.1],[0.43,0.52,0.08,0.12],[0.8,0.41,0.06,0.09],[0.63,0.26,0.06,0.09],[0.35,0.97,0.07,0.1]];
	var p13=[[0.32,0.69,0.05,0.07],[0.57,0.31,0.04,0.07],[0.87,0.36,0.04,0.06],[0.04,0.69,0.04,0.06],[0.44,0.09,0.04,0.06]];
	var p14=[[0.46,0.96,0.05,0.07],[0.48,0.48,0.05,0.08],[0.34,0.47,0.05,0.08],[0.24,0.88,0.05,0.08],[0.65,0.23,0.06,0.09]];
	var p15=[[0.8,0.14,0.05,0.07],[0.31,0.91,0.08,0.12],[0.31,0.17,0.05,0.08],[0.14,0.31,0.05,0.08],[0.55,0.76,0.05,0.07]];
	var p16=[[0.68,0.27,0.04,0.06],[0.65,0.84,0.05,0.07],[0.73,0.4,0.04,0.06],[0.48,0.38,0.06,0.09],[0.87,0.69,0.07,0.11]];
	var p17=[[0.06,0.31,0.04,0.06],[0.18,0.51,0.04,0.06],[0.54,0.43,0.04,0.06],[0.77,0.64,0.05,0.07],[0.83,0.18,0.05,0.08]];
	var p18=[[0.34,0.17,0.05,0.07],[0.19,0.63,0.04,0.06],[0.43,0.73,0.05,0.07],[0.34,0.35,0.04,0.06],[0.86,0.24,0.04,0.06]];
	var p19=[[0.31,0.14,0.05,0.07],[0.16,0.53,0.05,0.08],[0.93,0.48,0.05,0.08],[0.16,0.09,0.05,0.07],[0.66,0.34,0.05,0.07]];
	var p20=[[0.8,0.26,0.04,0.06],[0.37,0.16,0.05,0.07],[0.36,0.85,0.07,0.1],[0.45,0.64,0.05,0.08],[0.73,0.58,0.06,0.09]];
	var p21=[[0.71,0.12,0.04,0.06],[0.29,0.02,0.04,0.06],[0.74,0.4,0.05,0.08],[0.24,0.59,0.05,0.08],[0.37,1,0.07,0.1]];
	var p22=[[0.12,0.93,0.05,0.08],[0.86,0.55,0.05,0.07],[0.56,0.62,0.05,0.08],[0.39,0.15,0.06,0.09],[0.27,0.35,0.04,0.06]];
	var p23=[[0.29,0.29,0.05,0.07],[0.1,0.54,0.05,0.08],[0.18,0.96,0.05,0.07],[0.72,0.22,0.04,0.06],[0.85,0.36,0.07,0.1]];
	var p24=[[0.04,0.83,0.06,0.09],[0.43,0.17,0.04,0.06],[0.74,0.65,0.05,0.07],[0.61,0.27,0.05,0.08],[0.12,0.22,0.05,0.08]];
	var p25=[[0.34,0.15,0.05,0.08],[0.56,0.15,0.05,0.08],[0.67,0.25,0.04,0.06],[0.77,0.66,0.05,0.08],[0.53,0.84,0.05,0.07]];
	var p26=[[0.63,0.2,0.05,0.07],[0.55,0.55,0.07,0.1],[0.23,0.97,0.06,0.09],[0.26,0.97,0.05,0.08],[0.11,0.44,0.07,0.1]];
	var p27=[[0.21,0.37,0.09,0.13],[0.05,0.52,0.05,0.07],[0.46,0.93,0.04,0.07],[0.39,0.12,0.07,0.1],[0.21,0.64,0.05,0.08]];
	var p28=[[0.26,0.5,0.04,0.06],[0.66,0.72,0.05,0.07],[0.09,0.37,0.04,0.07],[0.36,0.98,0.04,0.06],[0.87,0.83,0.05,0.08]];
	var p29=[[0.22,0.53,0.05,0.08],[0.37,0.4,0.04,0.06],[0.16,0.94,0.07,0.1],[0.18,0.27,0.05,0.07],[0.78,0.97,0.05,0.08]];
	var p30=[[0.23,0.6,0.04,0.06],[0.03,0.98,0.05,0.07],[0.93,0.64,0.07,0.1],[0.27,0.62,0.04,0.06],[0.01,0.15,0.08,0.12]];

	/*--------------------------------------------*/
	ctx1.drawImage(eval("bimg"+l), 0, 0,1280, dh2);	// wiĚćđ\ŚidË@j
	ctx4.drawImage(imgR, 1146, 0);	// CgĚćđ\ŚidËCj
	ctx4.drawImage(imgA, 1150, 1610-h4); 	// AnsĚćđ\ŚidËCj
	
	/*---------JEgÖidËDj---------*/
	var count1 = 5;
	function count() {
		ctx5.font = "87pt Arial";
		ctx5.fillText(count1, 1180, 115);
	}count();
	/*---------nextstagećđ\ŚidËDj---------*/
	function nextstage() {
	  setTimeout( function() {
		ctx5.drawImage(imgNE1,  0, 0.3 *dh2, 1280, 0.4*dh2);
		ctx5.drawImage(imgFB, 410, 0.57*dh2,  200, 0.12*dh2);
		ctx5.drawImage(imgTW, 670, 0.57*dh2,  200, 0.12*dh2);
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
				location.href = "http://www.facebook.com/sharer.php?u= https://play.google.com/store/apps/details?id=jp.xronus.finddifference6";
			 }else if((0.52*dw <= mx) && (mx <= 0.68*dw)) {
			 	var cmt1 = encodeURIComponent("Let's look for a difference together!");
				var cmt2 = encodeURIComponent("[ Find Difference6 ]");
				var cmt3 = encodeURIComponent("https://play.google.com/store/apps/details?id=jp.xronus.finddifference6");
				location.href = "http://twitter.com/home?status=" + cmt1 +"%0D%0A"+ cmt2 +"%0D%0A"+ cmt3;
			}}
		}//);
	  }, 600);
	}
	/*---------ŚđŠé@YES or NO đ\ŚidËDj---------*/
	function yes_or_no() {
		ctx5.drawImage(imgY,  140, 0.35*dh2, 1000, 0.37*dh2);
		ctx5.drawImage(imgFB, 410, 0.59 *dh2,  200, 0.12*dh2);
		ctx5.drawImage(imgTW, 670, 0.59 *dh2,  200, 0.12*dh2);
		//canvas5.onmousedown = (function(e) {
		canvas5.ontouchstart=function(){
			e=event.touches[0];
			var rect = e.target.getBoundingClientRect();
			var mx = e.clientX - rect.left; var my = e.clientY - rect.top;
			console.log(mx); console.log(my);
			if (( 0.49*dh <= my) && (my <= 0.59*dh )) { if (( 0.19*dw <= mx) && (mx <= 0.43*dw )) {
				ctx5.clearRect(0, 0.35*dh2, 1280, 0.38*dh2); //\ŚNA
				answer();
			 }else if(( 0.55*dw <= mx) && (mx <= 0.78*dw )) {
				ctx5.clearRect(0, 0.35*dh2, 1280, 0.38*dh2); //\ŚNA
				hit();
			}}
			if ((0.6*dh <= my) && (my <= 0.7*dh )) { if ((0.32*dw <= mx) && (mx <= 0.48*dw)) {
				location.href = "http://www.facebook.com/sharer.php?u= https://play.google.com/store/apps/details?id=jp.xronus.finddifference6";
			 }else if((0.52*dw <= mx) && (mx <= 0.68*dw)) {
			 	var cmt1 = encodeURIComponent("Let's look for a difference together!");
				var cmt2 = encodeURIComponent("[ Find Difference6 ]");
				var cmt3 = encodeURIComponent("https://play.google.com/store/apps/details?id=jp.xronus.finddifference6");
				location.href = "http://twitter.com/home?status=" + cmt1 +"%0D%0A"+ cmt2 +"%0D%0A"+ cmt3;
			}}
		}//);
	}
	/*---------YESžÁ˝Ě---------*/
	function answer() {
	  ctx4.drawImage(imgNE2, 420, 0.43*dh2,450,0.13*dh2);
	  for(i=0;i<=4;i++){
	    if(alr[i] == 1){
	    	ctx2.save();
		ctx2.beginPath();
		ctx2.scale(eval("s"+sc)[i][3],eval("s"+sc)[i][4]);
		if(eval("s"+sc)[i][4]==1){
			ctx2.arc(eval("s"+sc)[i][0],(eval("p"+sc)[i][1]*df2)+df2,eval("s"+sc)[i][2],0,Math.PI*2,false);
		}else{	ctx2.arc(eval("s"+sc)[i][0],(eval("p"+sc)[i][1]*df2)+(df2/eval("s"+sc)[i][4]),eval("s"+sc)[i][2],0,Math.PI*2,false); }
		ctx2.fillStyle = "rgba(0,0,0,0)";// FĚwč
		ctx2.fill();
		ctx2.strokeStyle = "rgba(0,51,255,1)";
		ctx2.lineWidth = 8;
		ctx2.stroke();
		ctx2.restore();
		ctx2.clearRect(0, 0, 1280, df2);
		ctx2.clearRect(0, dh2, 1280, h4);
		
		ctx3.save();
		ctx3.beginPath();
		ctx3.scale(eval("s"+sc)[i][3],eval("s"+sc)[i][4]);
		ctx3.arc(eval("s"+sc)[i][0],eval("p"+sc)[i][1]*df2,eval("s"+sc)[i][2],0,Math.PI*2,false);
		ctx3.fillStyle = "rgba(0,0,0,0)";// FĚwč
		ctx3.fill();
		ctx3.strokeStyle = "rgba(0,51,255,1)";
		ctx3.lineWidth = 8;
		ctx3.stroke();
		ctx3.clearRect(0, df2, 1280, df2);
		ctx3.restore();
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
	/*---------finish---------*/
	function finish(){
	  ctx5.drawImage(imgE, 0, 0,1280, dh2);
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
		//y{^zAnswerĚđŔs
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
		 var h6   = df2/eval("s"+sc)[i][4];
		 
		 if(alr[i] == 1){
		  if (( wp-xrad <= mx) && (mx <= wp+xrad )) {
		   if ( (( hp-yrad+df<=my)&&(my<= hp+yrad+df)) && (df<=my)&& ((my<=0.93*dh)||(mx<=0.89*dw)) ) {
			ctx2.save();
			ctx2.beginPath();
			ctx2.scale(eval("s"+sc)[i][3],eval("s"+sc)[i][4]);
			if(yratio==1){	ctx2.arc(eval("s"+sc)[i][0],(eval("p"+sc)[i][1]*df2)+df2,eval("s"+sc)[i][2],0,Math.PI*2,false);
			}else{		ctx2.arc(eval("s"+sc)[i][0],(eval("p"+sc)[i][1]*df2)+ h6,eval("s"+sc)[i][2],0,Math.PI*2,false); }
			ctx2.fillStyle = "rgba(0,0,0,0)";// FĚwč
			ctx2.fill();
			ctx2.strokeStyle = "rgba(255,0,51,1)";
			ctx2.lineWidth = 8;
			ctx2.stroke();
			ctx2.restore();
			ctx2.clearRect(0, 0, 1280, df2);
			ctx2.clearRect(0, dh2, 1280, h4);
			
			ctx3.save();
			ctx3.beginPath();
			ctx3.scale(eval("s"+sc)[i][3],eval("s"+sc)[i][4]);
			ctx3.arc(eval("s"+sc)[i][0],eval("p"+sc)[i][1]*df2,eval("s"+sc)[i][2],0,Math.PI*2,false);
			ctx3.fillStyle = "rgba(0,0,0,0)";// FĚwč
			ctx3.fill();
			ctx3.strokeStyle = "rgba(255,0,51,1)";
			ctx3.lineWidth = 8;
			ctx3.stroke();
			ctx3.clearRect(0, df2, 1280, df2);
			ctx3.restore();
			
			alr[i] = 2;
			count1 = count1-1;
			ctx5.clearRect(0, 0, 1280, 1720);//\ŚNA
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

