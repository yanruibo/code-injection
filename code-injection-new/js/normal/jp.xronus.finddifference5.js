


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
	var s1 = [[775,335,52,1,1],[860,465,65,1,1.2],[635,50,60,1,1],[536,732,70,1,1],[224,820,70,1,1]];
	var s2 = [[164,316,58,1,2],[230,332,64,1,1],[645,118,65,1,2],[840,505,70,1,1],[160,20,70,1,1]];
	var s3 = [[538,348,60,1,1],[100,850,64,1.7,1],[480,172,95,1,1],[895,750,95,1,1],[1005,510,55,1,1]];
	var s4 = [[0,0,160,1,1],[885,127,60,1,1],[374,825,90,1,1],[675,870,90,1,1],[902,547,86,1,1]];
	var s5 = [[778,222,48,1,1],[1025,384,60,1,1.4],[650,600,75,1,1],[198,147,65,1,1.5],[202,580,50,1,1]];
	var s6 = [[235,100,80,2,1],[165,408,45,1,1],[242,676,82,1,1],[790,540,85,1,1],[760,150,55,1,1]];
	var s7 = [[156,436,50,1,1],[686,385,58,1,1],[947,664,58,1,1],[84,338,45,1,1],[905,290,50,1,1]];
	var s8 = [[496,30,72,1,1],[768,368,45,1,1],[130,830,90,1,1],[545,300,67,1,1.5],[880,40,90,1,1.6]];
	var s9 = [[211,820,58,1,1],[960,478,52,1,1],[415,140,58,1,1],[846,554,52,1,1],[220,270,58,1,1]];
	var s10 = [[410,725,62,1.6,1],[208,325,46,1,1.8],[655,460,65,1,1],[30,20,150,1,1.3],[830,570,65,1,1]];
	var s11 = [[55,160,58,1,1.5],[650,350,48,1,1.5],[543,73,56,1,1],[165,790,55,4,1],[478,642,52,2,1]];
	var s12 = [[405,122,58,2.4,1],[460,510,65,1,1],[608,315,60,1.4,1],[245,80,68,1.2,1],[476,820,68,1,1]];
	var s13 = [[30,168,58,1,3],[432,100,70,1,1.8],[1048,372,75,1,1],[396,454,54,1.7,1],[670,70,60,1,1]];
	var s14 = [[435,595,55,1,1],[1018,722,65,1,1],[510,175,50,1.7,1],[692,712,50,1,1],[10,390,74,1,1.3]];
	var s15 = [[67,240,78,1,1.2],[522,10,72,1,1],[514,380,58,1.5,1],[556,838,55,1,1],[1010,430,70,1,1.5]];
	var s16 = [[395,77,80,1,1.5],[672,315,50,1,1],[994,526,62,1,1],[380,890,100,1.5,1],[320,430,55,1,1]];
	var s17 = [[30,622,70,1.5,1],[445,590,140,1.2,1],[635,375,90,1.4,1],[180,115,115,1.6,1],[424,835,100,1,1]];
	var s18 = [[368,80,90,1,1.5],[737,668,98,1,1],[410,835,70,1,1],[705,100,50,1,1],[1070,598,67,1,1]];
	var s19 = [[275,290,65,1,1.5],[510,215,70,1,1.5],[672,380,60,1,1.5],[668,790,62,1,1],[890,70,80,1,1]];
	var s20 = [[710,440,58,1,1.5],[288,65,70,1,1.5],[840,650,90,1,1.2],[552,550,60,1,1],[102,450,80,1.2,1]];
	var s21 = [[732,200,60,1,1],[322,275,50,1,1],[740,260,55,1.5,1],[315,695,70,1,1],[1135,470,50,1,1]];
	var s22 = [[770,190,100,1,1],[450,405,65,1,1],[600,855,100,1.3,1],[890,585,80,1,1],[285,530,58,1,1]];
	var s23 = [[900,340,115,1,2],[80,130,60,2,1],[715,270,55,1,1],[560,390,50,1,2],[420,285,52,1,1]];
	var s24 = [[312,55,75,1,3],[125,770,70,3,1],[1080,260,60,1,1.5],[785,704,52,1,1],[742,562,55,1,1]];
	var s25 = [[800,372,53,1,1],[298,520,58,1,1.3],[590,850,65,1,1],[872,496,48,1,1.5],[715,520,50,1,1]];
	var s26 = [[428,820,60,1,1],[1108,150,53,1,1],[408,835,68,1.7,1],[522,295,60,1,1.2],[55,518,50,6,1]];
	var s27 = [[208,762,75,1,1],[210,430,54,1,1],[982,478,75,1,1],[540,82,70,1,1.5],[728,820,80,1,1]];
	var s28 = [[605,455,58,1,1],[380,145,72,1,1.2],[490,335,70,1,2],[300,830,60,1,1],[1080,535,70,1,1]];
	var s29 = [[695,385,58,1,1],[1195,450,50,1,1],[150,640,110,2,1],[50,305,70,1,1],[520,830,75,1.7,1]];
	var s30 = [[335,268,58,1,1.5],[550,490,55,1,1],[895,445,48,1,1.5],[280,618,50,1,1],[590,855,84,1.3,1]];
	
	var p1 =[[0.61,0.39,0.04,0.06],[0.67,0.54,0.05,0.08],[0.5,0.06,0.05,0.07],[0.42,0.85,0.05,0.08],[0.18,0.95,0.05,0.08]];
	var p2=[[0.13,0.37,0.05,0.07],[0.18,0.39,0.05,0.07],[0.5,0.14,0.05,0.08],[0.66,0.59,0.05,0.08],[0.13,0.02,0.05,0.08]];
	var p3=[[0.42,0.4,0.05,0.07],[0.08,0.99,0.05,0.07],[0.38,0.2,0.07,0.11],[0.7,0.87,0.07,0.11],[0.79,0.59,0.04,0.06]];
	var p4=[[0,0,0.13,0.19],[0.69,0.15,0.05,0.07],[0.29,0.96,0.07,0.1],[0.53,1.01,0.07,0.1],[0.7,0.64,0.07,0.1]];
	var p5=[[0.61,0.26,0.04,0.06],[0.8,0.45,0.05,0.07],[0.51,0.7,0.06,0.09],[0.15,0.17,0.05,0.08],[0.16,0.67,0.04,0.06]];
	var p6=[[0.18,0.12,0.06,0.09],[0.13,0.47,0.04,0.05],[0.19,0.79,0.06,0.1],[0.62,0.63,0.07,0.1],[0.59,0.17,0.04,0.06]];
	var p7=[[0.12,0.51,0.04,0.06],[0.54,0.45,0.05,0.07],[0.74,0.77,0.05,0.07],[0.07,0.39,0.04,0.05],[0.71,0.34,0.04,0.06]];
	var p8=[[0.39,0.03,0.06,0.08],[0.6,0.43,0.04,0.05],[0.1,0.97,0.07,0.1],[0.43,0.35,0.05,0.08],[0.69,0.05,0.07,0.1]];
	var p9=[[0.16,0.95,0.05,0.07],[0.75,0.56,0.04,0.06],[0.32,0.16,0.05,0.07],[0.66,0.64,0.04,0.06],[0.17,0.31,0.05,0.07]];
	var p10=[[0.32,0.84,0.05,0.07],[0.16,0.38,0.04,0.05],[0.51,0.53,0.05,0.08],[0.02,0.02,0.12,0.17],[0.65,0.66,0.05,0.08]];
	var p11=[[0.04,0.19,0.05,0.07],[0.51,0.41,0.04,0.06],[0.42,0.08,0.04,0.07],[0.13,0.92,0.04,0.06],[0.37,0.75,0.04,0.06]];
	var p12=[[0.32,0.14,0.05,0.07],[0.36,0.59,0.05,0.08],[0.48,0.37,0.05,0.07],[0.19,0.09,0.05,0.08],[0.37,0.95,0.05,0.08]];
	var p13=[[0.02,0.2,0.05,0.07],[0.34,0.12,0.05,0.08],[0.82,0.43,0.06,0.09],[0.31,0.53,0.04,0.06],[0.52,0.08,0.05,0.07]];
	var p14=[[0.34,0.69,0.04,0.06],[0.8,0.84,0.05,0.08],[0.4,0.2,0.04,0.06],[0.54,0.83,0.04,0.06],[0.01,0.45,0.06,0.09]];
	var p15=[[0.05,0.28,0.06,0.09],[0.41,0.01,0.06,0.08],[0.4,0.44,0.05,0.07],[0.43,0.97,0.04,0.06],[0.79,0.5,0.05,0.08]];
	var p16=[[0.31,0.09,0.06,0.09],[0.53,0.37,0.04,0.06],[0.78,0.61,0.05,0.07],[0.3,1.03,0.08,0.12],[0.25,0.5,0.04,0.06]];
	var p17=[[0.02,0.72,0.05,0.08],[0.35,0.69,0.11,0.16],[0.5,0.44,0.07,0.1],[0.14,0.13,0.09,0.13],[0.33,0.97,0.08,0.12]];
	var p18=[[0.29,0.09,0.07,0.1],[0.58,0.78,0.08,0.11],[0.32,0.97,0.05,0.08],[0.55,0.12,0.04,0.06],[0.84,0.7,0.05,0.08]];
	var p19=[[0.21,0.34,0.05,0.08],[0.4,0.25,0.05,0.08],[0.53,0.44,0.05,0.07],[0.52,0.92,0.05,0.07],[0.7,0.08,0.06,0.09]];
	var p20=[[0.55,0.51,0.05,0.07],[0.23,0.08,0.05,0.08],[0.66,0.76,0.07,0.1],[0.43,0.64,0.05,0.07],[0.08,0.52,0.06,0.09]];
	var p21=[[0.57,0.23,0.05,0.07],[0.25,0.32,0.04,0.06],[0.58,0.3,0.04,0.06],[0.25,0.81,0.05,0.08],[0.89,0.55,0.04,0.06]];
	var p22=[[0.6,0.22,0.08,0.12],[0.35,0.47,0.05,0.08],[0.47,0.99,0.08,0.12],[0.7,0.68,0.06,0.09],[0.22,0.62,0.05,0.07]];
	var p23=[[0.7,0.4,0.09,0.13],[0.06,0.15,0.05,0.07],[0.56,0.31,0.04,0.06],[0.44,0.45,0.04,0.06],[0.33,0.33,0.04,0.06]];
	var p24=[[0.24,0.06,0.06,0.09],[0.1,0.9,0.05,0.08],[0.84,0.3,0.05,0.07],[0.61,0.82,0.04,0.06],[0.58,0.65,0.04,0.06]];
	var p25=[[0.63,0.43,0.04,0.06],[0.23,0.6,0.05,0.07],[0.46,0.99,0.05,0.08],[0.68,0.58,0.04,0.06],[0.56,0.6,0.04,0.06]];
	var p26=[[0.33,0.95,0.05,0.07],[0.87,0.17,0.04,0.06],[0.32,0.97,0.05,0.08],[0.41,0.34,0.05,0.07],[0.04,0.6,0.04,0.06]];
	var p27=[[0.16,0.89,0.06,0.09],[0.16,0.5,0.04,0.06],[0.77,0.56,0.06,0.09],[0.42,0.1,0.05,0.08],[0.57,0.95,0.06,0.09]];
	var p28=[[0.47,0.53,0.05,0.07],[0.3,0.17,0.06,0.08],[0.38,0.39,0.05,0.08],[0.23,0.97,0.05,0.07],[0.84,0.62,0.05,0.08]];
	var p29=[[0.54,0.45,0.05,0.07],[0.93,0.52,0.04,0.06],[0.12,0.74,0.09,0.13],[0.04,0.35,0.05,0.08],[0.41,0.97,0.06,0.09]];
	var p30=[[0.26,0.31,0.05,0.07],[0.43,0.57,0.04,0.06],[0.7,0.52,0.04,0.06],[0.22,0.72,0.04,0.06],[0.46,0.99,0.07,0.1]];

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
				location.href = "http://www.facebook.com/sharer.php?u= https://play.google.com/store/apps/details?id=jp.xronus.finddifference5";
			 }else if((0.52*dw <= mx) && (mx <= 0.68*dw)) {
			 	var cmt1 = encodeURIComponent("Let's look for a difference together!");
				var cmt2 = encodeURIComponent("[ Find Difference5 ]");
				var cmt3 = encodeURIComponent("https://play.google.com/store/apps/details?id=jp.xronus.finddifference5");
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
				location.href = "http://www.facebook.com/sharer.php?u= https://play.google.com/store/apps/details?id=jp.xronus.finddifference5";
			 }else if((0.52*dw <= mx) && (mx <= 0.68*dw)) {
			 	var cmt1 = encodeURIComponent("Let's look for a difference together!");
				var cmt2 = encodeURIComponent("[ Find Difference5 ]");
				var cmt3 = encodeURIComponent("https://play.google.com/store/apps/details?id=jp.xronus.finddifference5");
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

