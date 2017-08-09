


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
	var s30 = [[305,185,60,1,1],[500,55,65,1,1],[520,462,56,1,1.5],[72,845,65,1,1],[622,490,56,1,1]];
	var s29 = [[120,50,77,1,1.8],[630,295,58,1,1],[330,830,65,1,1],[300,635,80,1.4,1],[625,40,60,1,1.3]];
	var s28 = [[100,880,80,1.4,1],[690,235,60,1,1],[445,295,60,1,1],[40,500,60,1.2,1],[1100,600,68,1,1]];
	var s27 = [[210,110,64,1,1],[360,540,58,1,1],[730,410,115,1,1.6],[635,120,60,1,1.5],[455,840,60,1,1]];
	var s26 = [[420,390,82,1,1.2],[820,150,80,1.3,1],[310,840,80,1,1],[940,860,110,1,1],[100,250,60,1,1]];
	var s25 = [[1105,345,60,1,1],[890,840,80,1,1],[500,625,65,1,1],[165,130,60,1,1],[345,490,60,1,1]];
	var s24 = [[465,100,65,1,1],[132,800,56,1,1],[965,535,60,1,1],[840,295,60,1,1],[720,840,90,1.3,1]];
	var s23 = [[595,280,54,1,1],[1160,570,66,1,1],[230,760,60,1,1],[865,410,58,1,1],[570,155,55,1,1]];
	var s22 = [[175,385,62,1,1],[990,730,58,1,1],[865,235,75,1,1.2],[90,600,75,1,1.3],[595,860,60,1,1]];
	var s21 = [[535,100,58,1,1.5],[890,645,65,1,1],[730,545,60,1.5,1],[1040,840,65,1,1],[200,550,65,1,1]];
	var s20 = [[590,475,55,1,1.4],[600,275,68,1,1.5],[420,850,60,1,1],[235,170,120,1,1.1],[1095,700,58,1,1]];
	var s19 = [[810,435,60,1.3,1],[225,630,60,1,1],[890,455,60,1,1],[940,865,85,1,1],[730,755,60,1,1]];
	var s18 = [[50,135,65,1.5,1],[810,440,65,1,1],[865,690,60,1,1],[710,800,60,1,1],[950,230,65,1,1]];
	var s17 = [[735,200,78,1,1],[80,850,80,1,1],[50,520,58,1,1],[525,70,60,1,1],[235,110,65,1,1.3]];
	var s16 = [[20,170,60,1,1],[555,305,94,1.6,1],[740,830,90,1,1],[420,300,75,1,1],[140,445,80,1,1]];
	var s15 = [[1142,310,60,1,1],[830,540,60,1,1],[185,250,58,1.4,1],[335,560,58,1,1],[640,840,60,1,1]];
	var s14 = [[305,215,60,1,1.4],[285,845,65,1,1],[810,200,60,1,1],[555,475,65,1,1],[730,375,65,1,1]];
	var s13 = [[355,250,60,1,1.5],[50,855,110,1,1],[800,390,60,1,1],[840,20,70,1,1],[1000,550,68,1,1]];
	var s12 = [[245,255,70,1.5,1],[145,820,85,1,1],[780,340,60,1,1.8],[375,410,60,1.4,1],[1035,500,70,1,1]];
	var s11 = [[760,545,60,1,1],[530,850,65,1.3,1],[295,240,56,1,1],[785,395,60,1,1],[390,75,70,1,1]];
	var s10 = [[370,820,80,1.4,1],[50,110,110,1.3,1],[290,85,58,1,1],[270,400,75,1,1],[700,540,75,1,1]];
	var s9 = [[150,630,100,1.4,1],[330,775,66,1.9,1],[787,60,65,1,2.3],[590,285,56,1,1],[480,460,55,1.5,1]];
	var s8 = [[130,840,70,1.5,1],[615,210,85,1,1],[545,655,56,1,1],[220,275,56,1,1],[35,740,52,1,1]];
	var s7 = [[480,330,60,1,1],[35,570,65,1,1],[855,795,60,1,1],[1110,405,70,1,1],[645,655,80,1,1]];
	var s6 = [[220,75,70,1,1],[862,78,62,1,1.5],[740,375,60,1,2],[930,380,75,1.3,1],[190,460,65,1,1]];
	var s5 = [[60,560,90,1,1.4],[310,430,90,1,1.4],[225,90,80,1,1],[875,830,70,1,1],[465,665,54,1,1]];
	var s4 = [[345,230,60,1,1],[40,850,75,1.3,1],[350,445,60,1,1],[885,360,60,1,1],[950,660,60,1,1]];
	var s3 = [[65,855,85,1,1],[650,850,85,1,1],[120,380,70,1,1],[740,380,68,1.2,1],[200,155,65,1.3,1]];
	var s2 = [[525,830,75,1,1],[920,75,56,1,1],[180,210,58,1,1],[340,640,60,1,1],[405,130,58,1,1]];
	var s1 = [[30,260,65,1,1],[80,850,60,1,1],[1130,405,60,1,1],[1070,510,60,1,1.2],[585,755,58,1,1]];
	
	var p30=[[0.24,0.22,0.05,0.07],[0.39,0.06,0.05,0.08],[0.41,0.54,0.04,0.07],[0.06,0.98,0.05,0.08],[0.49,0.57,0.04,0.07]];
	var p29=[[0.09,0.06,0.06,0.09],[0.49,0.34,0.05,0.07],[0.26,0.97,0.05,0.08],[0.23,0.74,0.06,0.09],[0.49,0.05,0.05,0.07]];
	var p28=[[0.08,1.02,0.06,0.09],[0.54,0.27,0.05,0.07],[0.35,0.34,0.05,0.07],[0.03,0.58,0.05,0.07],[0.86,0.7,0.05,0.08]];
	var p27=[[0.16,0.13,0.05,0.07],[0.28,0.63,0.05,0.07],[0.57,0.48,0.09,0.13],[0.5,0.14,0.05,0.07],[0.36,0.98,0.05,0.07]];
	var p26=[[0.33,0.45,0.06,0.1],[0.64,0.17,0.06,0.09],[0.24,0.98,0.06,0.09],[0.73,1,0.09,0.13],[0.08,0.29,0.05,0.07]];
	var p25=[[0.86,0.4,0.05,0.07],[0.7,0.98,0.06,0.09],[0.39,0.73,0.05,0.08],[0.13,0.15,0.05,0.07],[0.27,0.57,0.05,0.07]];
	var p24=[[0.36,0.12,0.05,0.08],[0.1,0.93,0.04,0.07],[0.75,0.62,0.05,0.07],[0.66,0.34,0.05,0.07],[0.56,0.98,0.07,0.1]];
	var p23=[[0.46,0.33,0.04,0.06],[0.91,0.66,0.05,0.08],[0.18,0.88,0.05,0.07],[0.68,0.48,0.05,0.07],[0.45,0.18,0.04,0.06]];
	var p22=[[0.14,0.45,0.05,0.07],[0.77,0.85,0.05,0.07],[0.68,0.27,0.06,0.09],[0.07,0.7,0.06,0.09],[0.46,1,0.05,0.07]];
	var p21=[[0.42,0.12,0.05,0.07],[0.7,0.75,0.05,0.08],[0.57,0.63,0.05,0.07],[0.81,0.98,0.05,0.08],[0.16,0.64,0.05,0.08]];
	var p20=[[0.46,0.55,0.04,0.06],[0.47,0.32,0.05,0.08],[0.33,0.99,0.05,0.07],[0.18,0.2,0.09,0.14],[0.86,0.81,0.05,0.07]];
	var p19=[[0.63,0.51,0.05,0.07],[0.18,0.73,0.05,0.07],[0.7,0.53,0.05,0.07],[0.73,1.01,0.07,0.1],[0.57,0.88,0.05,0.07]];
	var p18=[[0.04,0.16,0.05,0.08],[0.63,0.51,0.05,0.08],[0.68,0.8,0.05,0.07],[0.55,0.93,0.05,0.07],[0.74,0.27,0.05,0.08]];
	var p17=[[0.57,0.23,0.06,0.09],[0.06,0.99,0.06,0.09],[0.04,0.6,0.05,0.07],[0.41,0.08,0.05,0.07],[0.18,0.13,0.05,0.08]];
	var p16=[[0.02,0.2,0.05,0.07],[0.43,0.35,0.07,0.11],[0.58,0.97,0.07,0.1],[0.33,0.35,0.06,0.09],[0.11,0.52,0.06,0.09]];
	var p15=[[0.89,0.36,0.05,0.07],[0.65,0.63,0.05,0.07],[0.14,0.29,0.05,0.07],[0.26,0.65,0.05,0.07],[0.5,0.98,0.05,0.07]];
	var p14=[[0.24,0.25,0.05,0.07],[0.22,0.98,0.05,0.08],[0.63,0.23,0.05,0.07],[0.43,0.55,0.05,0.08],[0.57,0.44,0.05,0.08]];
	var p13=[[0.28,0.29,0.05,0.07],[0.04,0.99,0.09,0.13],[0.63,0.45,0.05,0.07],[0.66,0.02,0.05,0.08],[0.78,0.64,0.05,0.08]];
	var p12=[[0.19,0.3,0.05,0.08],[0.11,0.95,0.07,0.1],[0.61,0.4,0.05,0.07],[0.29,0.48,0.05,0.07],[0.81,0.58,0.05,0.08]];
	var p11=[[0.59,0.63,0.05,0.07],[0.41,0.99,0.05,0.08],[0.23,0.28,0.04,0.07],[0.61,0.46,0.05,0.07],[0.3,0.09,0.05,0.08]];
	var p10=[[0.29,0.95,0.06,0.09],[0.04,0.13,0.09,0.13],[0.23,0.1,0.05,0.07],[0.21,0.47,0.06,0.09],[0.55,0.63,0.06,0.09]];
	var p9=[[0.12,0.73,0.08,0.12],[0.26,0.9,0.05,0.08],[0.61,0.07,0.05,0.08],[0.46,0.33,0.04,0.07],[0.38,0.53,0.04,0.06]];
	var p8=[[0.1,0.98,0.05,0.08],[0.48,0.24,0.07,0.1],[0.43,0.76,0.04,0.07],[0.17,0.32,0.04,0.07],[0.03,0.86,0.04,0.06]];
	var p7=[[0.38,0.38,0.05,0.07],[0.03,0.66,0.05,0.08],[0.67,0.92,0.05,0.07],[0.87,0.47,0.05,0.08],[0.5,0.76,0.06,0.09]];
	var p6=[[0.17,0.09,0.05,0.08],[0.67,0.09,0.05,0.07],[0.58,0.44,0.05,0.07],[0.73,0.44,0.06,0.09],[0.15,0.53,0.05,0.08]];
	var p5=[[0.05,0.65,0.07,0.1],[0.24,0.5,0.07,0.1],[0.18,0.1,0.06,0.09],[0.68,0.97,0.05,0.08],[0.36,0.77,0.04,0.06]];
	var p4=[[0.27,0.27,0.05,0.07],[0.03,0.99,0.06,0.09],[0.27,0.52,0.05,0.07],[0.69,0.42,0.05,0.07],[0.74,0.77,0.05,0.07]];
	var p3=[[0.05,0.99,0.07,0.1],[0.51,0.99,0.07,0.1],[0.09,0.44,0.05,0.08],[0.58,0.44,0.05,0.08],[0.16,0.18,0.05,0.08]];
	var p2=[[0.41,0.97,0.06,0.09],[0.72,0.09,0.04,0.07],[0.14,0.24,0.05,0.07],[0.27,0.74,0.05,0.07],[0.32,0.15,0.05,0.07]];
	var p1=[[0.02,0.3,0.05,0.08],[0.06,0.99,0.05,0.07],[0.88,0.47,0.05,0.07],[0.84,0.59,0.05,0.07],[0.46,0.88,0.05,0.07]];

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
				location.href = "http://www.facebook.com/sharer.php?u= https://play.google.com/store/apps/details?id=jp.xronus.finddifference8";
			 }else if((0.52*dw <= mx) && (mx <= 0.68*dw)) {
			 	var cmt1 = encodeURIComponent("Let's look for a difference together!");
				var cmt2 = encodeURIComponent("[ Find Difference8 ]");
				var cmt3 = encodeURIComponent("https://play.google.com/store/apps/details?id=jp.xronus.finddifference8");
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
				location.href = "http://www.facebook.com/sharer.php?u= https://play.google.com/store/apps/details?id=jp.xronus.finddifference8";
			 }else if((0.52*dw <= mx) && (mx <= 0.68*dw)) {
			 	var cmt1 = encodeURIComponent("Let's look for a difference together!");
				var cmt2 = encodeURIComponent("[ Find Difference8 ]");
				var cmt3 = encodeURIComponent("https://play.google.com/store/apps/details?id=jp.xronus.finddifference8");
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

