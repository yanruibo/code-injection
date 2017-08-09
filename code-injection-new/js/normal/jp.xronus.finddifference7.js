


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
	
	bimg30 = document.getElementById('i01');
	bimg29 = document.getElementById('i02');
	bimg28 = document.getElementById('i03');
	bimg27 = document.getElementById('i04');
	bimg26 = document.getElementById('i05');
	bimg25 = document.getElementById('i06');
	bimg24 = document.getElementById('i07');
	bimg23 = document.getElementById('i08');
	bimg22 = document.getElementById('i09');
	bimg21 = document.getElementById('i10');
	bimg20 = document.getElementById('i11');
	bimg19 = document.getElementById('i12');
	bimg18 = document.getElementById('i13');
	bimg17 = document.getElementById('i14');
	bimg16 = document.getElementById('i15');
	bimg15 = document.getElementById('i16');
	bimg14 = document.getElementById('i17');
	bimg13 = document.getElementById('i18');
	bimg12 = document.getElementById('i19');
	bimg11 = document.getElementById('i20');
	bimg10 = document.getElementById('i21');
	bimg9 = document.getElementById('i22');
	bimg8 = document.getElementById('i23');
	bimg7 = document.getElementById('i24');
	bimg6 = document.getElementById('i25');
	bimg5 = document.getElementById('i26');
	bimg4 = document.getElementById('i27');
	bimg3 = document.getElementById('i28');
	bimg2 = document.getElementById('i29');
	bimg1 = document.getElementById('i30');
	
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
	var s30 = [[117,852,85,1,1],[562,20,85,1,1],[340,390,60,1,1.5],[1160,400,70,1,1],[1005,300,60,1,1.3]];
	var s29 = [[140,400,115,1,1.2],[290,865,80,1.7,1],[865,570,78,1.2,1],[380,300,70,3,1],[710,460,55,1,1]];
	var s28 = [[240,830,85,1,1],[700,715,80,1,1],[530,280,100,1,1],[855,545,65,1,1.5],[1110,435,80,1,1]];
	var s27 = [[60,100,65,1,1],[805,640,60,1,1],[1035,755,68,1,1],[610,320,52,1,1.5],[384,835,110,1,1]];
	var s26 = [[275,197,70,1,1],[1020,115,62,1,3.5],[565,20,90,1,1],[630,860,100,1,1],[670,530,65,1,1]];
	var s25 = [[880,310,56,1,1],[0,820,80,1,1],[508,415,73,1,1],[850,160,60,1,1],[788,495,54,1,1.3]];
	var s24 = [[366,280,58,1,1.3],[30,830,80,1,1],[1100,170,75,1,1],[828,149,60,1,1],[465,720,60,1,1]];
	var s23 = [[245,265,70,1,1],[870,50,80,1,1],[540,845,100,1,1],[550,560,100,1.5,1],[5,835,100,1,1]];
	var s22 = [[255,210,60,1,1],[827,610,58,1,1],[900,154,65,1,2],[52,577,60,1.5,1],[360,835,75,1,1]];
	var s21 = [[485,290,60,1,1],[1030,435,62,1,1],[340,840,65,1,1],[1065,450,80,1,1.6],[90,790,68,1,1]];
	var s20 = [[515,160,68,1,1],[885,220,80,1,1],[670,840,62,1,1],[235,365,67,1,1],[190,460,75,1,1.7]];
	var s19 = [[185,110,64,1,1],[225,495,60,1,1],[1000,420,58,1,1],[820,270,60,1,1],[40,860,90,1.5,1]];
	var s18 = [[415,830,70,1.3,1],[980,530,60,1,1.5],[675,50,80,1.1,1],[655,240,58,1,1],[175,625,80,1,1]];
	var s17 = [[675,845,60,1,1],[1165,598,60,1,1],[500,355,66,1,1],[135,715,60,1,1],[850,315,60,1,1]];
	var s16 = [[1085,605,60,1,1],[220,845,65,2.6,1],[380,450,68,1,1],[115,470,65,1,1],[545,575,60,1,1]];
	var s15 = [[645,840,60,1,1],[565,700,60,1,1],[494,125,58,1,1],[200,215,60,1,1.7],[1000,650,58,1,1]];
	var s14 = [[540,800,60,1,1],[680,865,74,1.5,1],[633,105,65,1,1],[643,358,60,1,1],[20,285,60,1.5,1]];
	var s13 = [[100,240,60,1,1],[340,855,58,1,1],[927,756,60,1,1],[630,750,75,1,1],[275,320,60,1,1]];
	var s12 = [[160,422,60,1,1],[610,450,60,1,1],[485,50,90,1.1,1],[285,875,90,1.3,1],[950,575,60,1,1.2]];
	var s11 = [[120,480,65,1,1],[525,830,70,1,1],[1050,270,65,1,1],[465,415,70,1,1],[85,100,90,1.8,1]];
	var s10 = [[1147,522,60,1,1],[630,330,58,1,1],[845,150,56,1,1.3],[307,522,70,1,1],[20,680,70,1,1]];
	var s9 = [[380,830,70,1,1],[810,340,64,1.2,1],[1000,145,65,1,1],[30,135,90,1,1],[375,410,60,1.9,1]];
	var s8 = [[20,820,95,1.2,1],[1145,550,80,1,1],[475,510,58,1,1],[1005,205,54,1,1],[130,60,60,1,1]];
	var s7 = [[870,130,60,1.2,1],[40,850,70,1.5,1],[40,40,90,1,1],[1170,405,95,1,1],[710,580,80,1,1]];
	var s6 = [[540,360,80,1,1],[420,850,80,1.2,1],[440,135,80,1,1],[1170,270,75,1,1],[675,500,85,1.1,1]];
	var s5 = [[960,155,60,1,1],[55,520,55,1.5,1],[508,550,60,2,1],[280,790,70,1,1],[40,810,70,1,1]];
	var s4 = [[300,365,65,1,1],[30,830,70,1,1],[540,643,70,1,1],[1050,180,60,1,1],[310,810,65,1,1]];
	var s3 = [[50,845,53,2.5,1],[270,190,90,1,1.3],[735,620,65,1,1.2],[880,210,70,1,1.3],[520,250,65,1,1]];
	var s2 = [[87,855,90,1.6,1],[945,575,65,1,1],[710,95,60,1,1],[645,335,70,1,1],[680,840,95,1.3,1]];
	var s1 = [[580,100,65,1,1],[430,780,65,1,1],[415,395,58,1,1],[1090,260,60,1,1],[70,860,70,1.6,1]];
	
	var p30=[[0.09,0.99,0.07,0.1],[0.44,0.02,0.07,0.1],[0.27,0.45,0.05,0.07],[0.91,0.47,0.05,0.08],[0.79,0.35,0.05,0.07]];
	var p29=[[0.11,0.47,0.09,0.13],[0.23,1.01,0.06,0.09],[0.68,0.66,0.06,0.09],[0.3,0.35,0.05,0.08],[0.55,0.53,0.04,0.06]];
	var p28=[[0.19,0.97,0.07,0.1],[0.55,0.83,0.06,0.09],[0.41,0.33,0.08,0.12],[0.67,0.63,0.05,0.08],[0.87,0.51,0.06,0.09]];
	var p27=[[0.05,0.12,0.05,0.08],[0.63,0.74,0.05,0.07],[0.81,0.88,0.05,0.08],[0.48,0.37,0.04,0.06],[0.3,0.97,0.09,0.13]];
	var p26=[[0.21,0.23,0.05,0.08],[0.8,0.13,0.05,0.07],[0.44,0.02,0.07,0.1],[0.49,1,0.08,0.12],[0.52,0.62,0.05,0.08]];
	var p25=[[0.69,0.36,0.04,0.07],[0,0.95,0.06,0.09],[0.4,0.48,0.06,0.08],[0.66,0.19,0.05,0.07],[0.62,0.58,0.04,0.06]];
	var p24=[[0.29,0.33,0.05,0.07],[0.02,0.97,0.06,0.09],[0.86,0.2,0.06,0.09],[0.65,0.17,0.05,0.07],[0.36,0.84,0.05,0.07]];
	var p23=[[0.19,0.31,0.05,0.08],[0.68,0.06,0.06,0.09],[0.42,0.98,0.08,0.12],[0.43,0.65,0.08,0.12],[0,0.97,0.08,0.12]];
	var p22=[[0.2,0.24,0.05,0.07],[0.65,0.71,0.05,0.07],[0.7,0.18,0.05,0.08],[0.04,0.67,0.05,0.07],[0.28,0.97,0.06,0.09]];
	var p21=[[0.38,0.34,0.05,0.07],[0.8,0.51,0.05,0.07],[0.27,0.98,0.05,0.08],[0.83,0.52,0.06,0.09],[0.07,0.92,0.05,0.08]];
	var p20=[[0.4,0.19,0.05,0.08],[0.69,0.26,0.06,0.09],[0.52,0.98,0.05,0.07],[0.18,0.42,0.05,0.08],[0.15,0.53,0.06,0.09]];
	var p19=[[0.14,0.13,0.05,0.07],[0.18,0.58,0.05,0.07],[0.78,0.49,0.05,0.07],[0.64,0.31,0.05,0.07],[0.03,1,0.07,0.1]];
	var p18=[[0.32,0.97,0.05,0.08],[0.77,0.62,0.05,0.07],[0.53,0.06,0.06,0.09],[0.51,0.28,0.05,0.07],[0.14,0.73,0.06,0.09]];
	var p17=[[0.53,0.98,0.05,0.07],[0.91,0.7,0.05,0.07],[0.39,0.41,0.05,0.08],[0.11,0.83,0.05,0.07],[0.66,0.37,0.05,0.07]];
	var p16=[[0.85,0.7,0.05,0.07],[0.17,0.98,0.05,0.08],[0.3,0.52,0.05,0.08],[0.09,0.55,0.05,0.08],[0.43,0.67,0.05,0.07]];
	var p15=[[0.5,0.98,0.05,0.07],[0.44,0.81,0.05,0.07],[0.39,0.15,0.05,0.07],[0.16,0.25,0.05,0.07],[0.78,0.76,0.05,0.07]];
	var p14=[[0.42,0.93,0.05,0.07],[0.53,1.01,0.06,0.09],[0.49,0.12,0.05,0.08],[0.5,0.42,0.05,0.07],[0.02,0.33,0.05,0.07]];
	var p13=[[0.08,0.28,0.05,0.07],[0.27,0.99,0.05,0.07],[0.72,0.88,0.05,0.07],[0.49,0.87,0.06,0.09],[0.21,0.37,0.05,0.07]];
	var p12=[[0.13,0.49,0.05,0.07],[0.48,0.52,0.05,0.07],[0.38,0.06,0.07,0.1],[0.22,1.02,0.07,0.1],[0.74,0.67,0.05,0.07]];
	var p11=[[0.09,0.56,0.05,0.08],[0.41,0.97,0.05,0.08],[0.82,0.31,0.05,0.08],[0.36,0.48,0.05,0.08],[0.07,0.12,0.07,0.1]];
	var p10=[[0.9,0.61,0.05,0.07],[0.49,0.38,0.05,0.07],[0.66,0.17,0.04,0.07],[0.24,0.61,0.05,0.08],[0.02,0.79,0.05,0.08]];
	var p9=[[0.3,0.97,0.05,0.08],[0.63,0.4,0.05,0.07],[0.78,0.17,0.05,0.08],[0.02,0.16,0.07,0.1],[0.29,0.48,0.05,0.07]];
	var p8=[[0.02,0.95,0.07,0.11],[0.89,0.64,0.06,0.09],[0.37,0.59,0.05,0.07],[0.79,0.24,0.04,0.06],[0.1,0.07,0.05,0.07]];
	var p7=[[0.68,0.15,0.05,0.07],[0.03,0.99,0.05,0.08],[0.03,0.05,0.07,0.1],[0.91,0.47,0.07,0.11],[0.55,0.67,0.06,0.09]];
	var p6=[[0.42,0.42,0.06,0.09],[0.33,0.99,0.06,0.09],[0.34,0.16,0.06,0.09],[0.91,0.31,0.06,0.09],[0.53,0.58,0.07,0.1]];
	var p5=[[0.75,0.18,0.05,0.07],[0.04,0.6,0.04,0.06],[0.4,0.64,0.05,0.07],[0.22,0.92,0.05,0.08],[0.03,0.94,0.05,0.08]];
	var p4=[[0.23,0.42,0.05,0.08],[0.02,0.97,0.05,0.08],[0.42,0.75,0.05,0.08],[0.82,0.21,0.05,0.07],[0.24,0.94,0.05,0.08]];
	var p3=[[0.04,0.98,0.04,0.06],[0.21,0.22,0.07,0.1],[0.57,0.72,0.05,0.08],[0.69,0.24,0.05,0.08],[0.41,0.29,0.05,0.08]];
	var p2=[[0.07,0.99,0.07,0.1],[0.74,0.67,0.05,0.08],[0.55,0.11,0.05,0.07],[0.5,0.39,0.05,0.08],[0.53,0.98,0.07,0.11]];
	var p1=[[0.45,0.12,0.05,0.08],[0.34,0.91,0.05,0.08],[0.32,0.46,0.05,0.07],[0.85,0.3,0.05,0.07],[0.05,1,0.05,0.08]];

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
				location.href = "http://www.facebook.com/sharer.php?u= https://play.google.com/store/apps/details?id=jp.xronus.finddifference7";
			 }else if((0.52*dw <= mx) && (mx <= 0.68*dw)) {
			 	var cmt1 = encodeURIComponent("Let's look for a difference together!");
				var cmt2 = encodeURIComponent("[ Find Difference7 ]");
				var cmt3 = encodeURIComponent("https://play.google.com/store/apps/details?id=jp.xronus.finddifference7");
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
				location.href = "http://www.facebook.com/sharer.php?u= https://play.google.com/store/apps/details?id=jp.xronus.finddifference7";
			 }else if((0.52*dw <= mx) && (mx <= 0.68*dw)) {
			 	var cmt1 = encodeURIComponent("Let's look for a difference together!");
				var cmt2 = encodeURIComponent("[ Find Difference7 ]");
				var cmt3 = encodeURIComponent("https://play.google.com/store/apps/details?id=jp.xronus.finddifference7");
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

