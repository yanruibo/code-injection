


        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
     





if (document.getElementById&&!document.layers){

    // *** Clock colours
    dCol='#00ff00';   //date colour.
    fCol='#ffffff';   //face colour.
    sCol='#ffffff';   //seconds colour.
    mCol='#00ff00';   //minutes colour.
    hCol='#00ff00';   //hours colour.

// *** Controls
    del=0.6;  //
    ref=40;   //Run speed (timeout).


    var ieType=(typeof window.innerWidth != 'number');
    var docComp=(document.compatMode);
    var docMod=(docComp && docComp.indexOf("CSS") != -1);
    var ieRef=(ieType && docMod)
    ?document.documentElement:document.body;
    theDays=new Array("SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY");
    theMonths=new Array("JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER");
    date=new Date();
    day=date.getDate();
    year=date.getYear();
    if (year < 2000) year=year+1900; 
    tmpdate=" "+theDays[date.getDay()]+" "+day+" "+theMonths[date.getMonth()]+" "+year;
    D=tmpdate.split("");
    N='3 4 5 6 7 8 9 10 11 12 1 2';
    N=N.split(" ");
    F=N.length;
    H='...';
    H=H.split("");
    M='....';
    M=M.split("");
    S='.....';
    S=S.split("");
    
    siz=40;
    eqf=360/F;
    eqd=360/D.length;
    han=siz/5.5;
    ofy=-7;
    ofx=-3;
    ofst=70;
    tmr=null;
    vis=true;
    mouseY=0;
    mouseX=0;
    
    dy=new Array();
    dx=new Array();
    zy=new Array();
    zx=new Array();
    tmps=new Array();
    tmpm=new Array(); 
    tmph=new Array();
    tmpf=new Array(); 
    tmpd=new Array();
    
var sum=parseInt(D.length+F+H.length+M.length+S.length)+1;
for (i=0; i < sum; i++){
    dy[i]=0;
    dx[i]=0;
    zy[i]=0;
    zx[i]=0;
}

    algn=new Array();
for (i=0; i < D.length; i++){
    algn[i]=(parseInt(D[i]) || D[i]==0)?10:9;
    document.write('<div id="_date'+i+'" class="css2" style="font-size:'+algn[i]+'px;color:'+dCol+'">'+D[i]+'<\/div>');
    tmpd[i]=document.getElementById("_date"+i).style;
}

for (i=0; i < F; i++){
    document.write('<div id="_face'+i+'" class="css2" style="color:'+fCol+'">'+N[i]+'<\/div>');
    tmpf[i]=document.getElementById("_face"+i).style; 
}

for (i=0; i < H.length; i++){
    document.write('<div id="_hours'+i+'" class="css1" style="color:'+hCol+'">'+H[i]+'<\/div>');
    tmph[i]=document.getElementById("_hours"+i).style;
}

for (i=0; i < M.length; i++){
    document.write('<div id="_minutes'+i+'" class="css1" style="color:'+mCol+'">'+M[i]+'<\/div>');
    tmpm[i]=document.getElementById("_minutes"+i).style; 
}

for (i=0; i < S.length; i++){
    document.write('<div id="_seconds'+i+'" class="css1" style="color:'+sCol+'">'+S[i]+'<\/div>');
    tmps[i]=document.getElementById("_seconds"+i).style;         
}

function onoff(){
    if (vis){ 
    vis=false;
    document.getElementById("control").value="Clock On";
 }
 
else{ 
    vis=true;
    document.getElementById("control").value="Clock Off";
    Delay();
 }
 
    kill();
}


function winDims(){
    winH=(ieType)?ieRef.clientHeight:window.innerHeight; 
    winW=(ieType)?ieRef.clientWidth:window.innerWidth;
}

winDims();
window.onresize=new Function("winDims()");

function ClockAndAssign(){
    time = new Date();
    secs = time.getSeconds();
    sec = Math.PI * (secs-15) / 30;
    mins = time.getMinutes();
    min = Math.PI * (mins-15) / 30;
    hrs = time.getHours();
    hr = Math.PI * (hrs-3) / 6 + Math.PI * parseInt(time.getMinutes()) / 360;

for (i=0; i < S.length; i++){
    tmps[i].top=dy[D.length+F+H.length+M.length+i]+ofy+(i*han)*Math.sin(sec)+scrollY+"px";
    tmps[i].left=dx[D.length+F+H.length+M.length+i]+ofx+(i*han)*Math.cos(sec)+"px";
 }
 
for (i=0; i < M.length; i++){
    tmpm[i].top=dy[D.length+F+H.length+i]+ofy+(i*han)*Math.sin(min)+scrollY+"px";
    tmpm[i].left=dx[D.length+F+H.length+i]+ofx+(i*han)*Math.cos(min)+"px";
 }
 
for (i=0; i < H.length; i++){
    tmph[i].top=dy[D.length+F+i]+ofy+(i*han)*Math.sin(hr)+scrollY+"px";
    tmph[i].left=dx[D.length+F+i]+ofx+(i*han)*Math.cos(hr)+"px";
 }
 
for (i=0; i < F; i++){
    tmpf[i].top=dy[D.length+i]+siz*Math.sin(i*eqf*Math.PI/180)+scrollY+"px";
    tmpf[i].left=dx[D.length+i]+siz*Math.cos(i*eqf*Math.PI/180)+"px";
 }
 
for (i=0; i < D.length; i++){
    tmpd[i].top=dy[i]+siz*1.5*Math.sin(-sec+i*eqd*Math.PI/180)+scrollY+"px";
    tmpd[i].left=dx[i]+siz*1.5*Math.cos(-sec+i*eqd*Math.PI/180)+"px";
 }
 
    if (!vis)clearTimeout(tmr);
 }

buffW=(ieType)?80:90;

function Delay(){
    scrollY=(ieType)?ieRef.scrollTop:window.pageYOffset;
    if (!vis){
    dy[0]=-100;
    dx[0]=-100;
}

else{
    zy[0]=Math.round(dy[0]+=((mouseY)-dy[0])*del);
    zx[0]=Math.round(dx[0]+=((mouseX)-dx[0])*del);
}

for (i=1; i < sum; i++){
    if (!vis){
    dy[i]=-100;
    dx[i]=-100;
 }
 
 else{
    zy[i]=Math.round(dy[i]+=(zy[i-1]-dy[i])*del);
    zx[i]=Math.round(dx[i]+=(zx[i-1]-dx[i])*del);
 }
 
    if (dy[i-1] >= winH-80) dy[i-1]=winH-80;
    if (dx[i-1] >= winW-buffW) dx[i-1]=winW-buffW;
}

    tmr=setTimeout('Delay()',ref);
    ClockAndAssign();
}

    window.onload=Delay; 
}

//-->




        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





            // Set virtual screen width size to 640 pixels (横幅640pxに設定)
            monaca.viewport({width: 640});
        





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    




var dataEl;


window.onload = function () {
    dataEl = $('dataElement');
	dataEl.onmousedown = dataEl.ontouchstart = startDrag;
    
	dataEl2 = $('dataElement2');
	dataEl2.onmousedown = dataEl2.ontouchstart = startDrag;
    
	dataEl3 = $('dataElement3');
	dataEl3.onmousedown = dataEl3.ontouchstart = startDrag;
    
    dataEl4 = $('dataElement4');
    dataEl4.onmousedown = dataEl4.ontouchstart = startDrag;
    
	dataEl5 = $('dataElement5');
	dataEl5.onmousedown = dataEl5.ontouchstart = startDrag;
    
	dataEl6 = $('dataElement6');
	dataEl6.onmousedown = dataEl6.ontouchstart = startDrag;
    
    dataEl7 = $('dataElement7');
    dataEl7.onmousedown = dataEl7.ontouchstart = startDrag;
    
    dataEl8 = $('dataElement8');
    dataEl8.onmousedown = dataEl8.ontouchstart = startDrag;
    
    dataEl9 = $('dataElement9');
    dataEl9.onmousedown = dataEl9.ontouchstart = startDrag;
    
    dataEl10 = $('dataElement10');
    dataEl10.onmousedown = dataEl10.ontouchstart = startDrag;
    
    dataEl11 = $('dataElement11');
    dataEl11.onmousedown = dataEl11.ontouchstart = startDrag;
    
    dataEl12 = $('dataElement12');
    dataEl12.onmousedown = dataEl12.ontouchstart = startDrag;
    
    dataEl13 = $('dataElement13');
    dataEl13.onmousedown = dataEl13.ontouchstart = startDrag;
    
    dataEl14 = $('dataElement14');
    dataEl14.onmousedown = dataEl14.ontouchstart = startDrag;
    
     dataEl15 = $('dataElement15');
    dataEl15.onmousedown = dataEl15.ontouchstart = startDrag;
    
     dataEl16 = $('dataElement16');
    dataEl16.onmousedown = dataEl16.ontouchstart = startDrag;
    
     dataEl17 = $('dataElement17');
    dataEl17.onmousedown = dataEl17.ontouchstart = startDrag;
    
     dataEl18 = $('dataElement18');
    dataEl18.onmousedown = dataEl18.ontouchstart = startDrag;
    
     dataEl19 = $('dataElement19');
    dataEl19.onmousedown = dataEl19.ontouchstart = startDrag;
    
     dataEl20 = $('dataElement20');
    dataEl20.onmousedown = dataEl20.ontouchstart = startDrag;
    
     dataEl21 = $('dataElement21');
    dataEl21.onmousedown = dataEl21.ontouchstart = startDrag;
    
     dataEl22 = $('dataElement22');
    dataEl22.onmousedown = dataEl22.ontouchstart = startDrag;
    
     dataEl23 = $('dataElement23');
    dataEl23.onmousedown = dataEl23.ontouchstart = startDrag;
    
     dataEl24 = $('dataElement24');
    dataEl24.onmousedown = dataEl24.ontouchstart = startDrag;
    
     dataEl25 = $('dataElement25');
    dataEl25.onmousedown = dataEl25.ontouchstart = startDrag;
    
     dataEl26 = $('dataElement26');
    dataEl26.onmousedown = dataEl26.ontouchstart = startDrag;
    
     dataEl27 = $('dataElement27');
    dataEl27.onmousedown = dataEl27.ontouchstart = startDrag;
    
     dataEl28 = $('dataElement28');
    dataEl28.onmousedown = dataEl28.ontouchstart = startDrag;
    
     dataEl29 = $('dataElement29');
    dataEl29.onmousedown = dataEl29.ontouchstart = startDrag; 
    
    dataEl30 = $('dataElement30');
    dataEl30.onmousedown = dataEl30.ontouchstart = startDrag;
    
     dataEl31 = $('dataElement31');
    dataEl31.onmousedown = dataEl31.ontouchstart = startDrag;
    
     dataEl32 = $('dataElement32');
    dataEl32.onmousedown = dataEl32.ontouchstart = startDrag;
    
     dataEl33 = $('dataElement33');
    dataEl33.onmousedown = dataEl33.ontouchstart = startDrag;
    
     dataEl34 = $('dataElement34');
    dataEl34.onmousedown = dataEl34.ontouchstart = startDrag;
    
     dataEl35 = $('dataElement35');
    dataEl35.onmousedown = dataEl35.ontouchstart = startDrag;
    
     dataEl36 = $('dataElement36');
    dataEl36.onmousedown = dataEl36.ontouchstart = startDrag;
    
     dataEl37 = $('dataElement37');
    dataEl37.onmousedown = dataEl37.ontouchstart = startDrag;
    
     dataEl38 = $('dataElement38');
    dataEl38.onmousedown = dataEl38.ontouchstart = startDrag;
    
     dataEl39 = $('dataElement39');
    dataEl39.onmousedown = dataEl39.ontouchstart = startDrag;
    
     dataEl40 = $('dataElement40');
    dataEl40.onmousedown = dataEl40.ontouchstart = startDrag;
    
     dataEl41 = $('dataElement41');
    dataEl41.onmousedown = dataEl41.ontouchstart = startDrag;
    
     dataEl42 = $('dataElement42');
    dataEl42.onmousedown = dataEl42.ontouchstart = startDrag;
    
     dataEl43 = $('dataElement43');
    dataEl43.onmousedown = dataEl43.ontouchstart = startDrag;
       
     dataEl44 = $('dataElement44');
    dataEl44.onmousedown = dataEl44.ontouchstart = startDrag;
       
     dataEl45 = $('dataElement45');
    dataEl45.onmousedown = dataEl45.ontouchstart = startDrag;
       
     dataEl46 = $('dataElement46');
    dataEl46.onmousedown = dataEl46.ontouchstart = startDrag;
       
     dataEl47 = $('dataElement47');
    dataEl47.onmousedown = dataEl47.ontouchstart = startDrag;
       
     dataEl48 = $('dataElement48');
    dataEl48.onmousedown = dataEl48.ontouchstart = startDrag;
        
     dataEl49 = $('dataElement49');
    dataEl49.onmousedown = dataEl49.ontouchstart = startDrag;
       
     dataEl50 = $('dataElement50');
    dataEl50.onmousedown = dataEl50.ontouchstart = startDrag;
        
     dataEl51 = $('dataElement51');
    dataEl51.onmousedown = dataEl51.ontouchstart = startDrag;
       
     dataEl52 = $('dataElement52');
    dataEl52.onmousedown = dataEl52.ontouchstart = startDrag;
      
     dataEl54 = $('dataElement54');
    dataEl54.onmousedown = dataEl54.ontouchstart = startDrag;
   
   
	document.ongesturechange = function () {
		return false;
	}

} 

function startDrag(e) {

	if (e.type === 'touchstart') {
		this.onmousedown = null;
		this.ontouchmove = moveDrag;
		this.ontouchend = function () {
			this.ontouchmove = null;
			this.ontouchend = null;
			this.ontouchstart = startDrag; // Dolfin
		}
	} else {
		document.onmousemove = moveDrag;
		document.onmouseup = function () {
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}

	var pos = [this.offsetLeft,this.offsetTop];
	var that = this;
	var origin = getCoors(e);

	function moveDrag (e) {
		var currentPos = getCoors(e);
		var deltaX = currentPos[0] - origin[0];
		var deltaY = currentPos[1] - origin[1];
		this.style.left = (pos[0] + deltaX) + 'px';
		this.style.top  = (pos[1] + deltaY) + 'px';
		return false; // cancels scrolling

	}

	function getCoors(e) {
		var coors = [];
		if (e.targetTouches && e.targetTouches.length) { 	// iPhone
			var thisTouch = e.targetTouches[0];
			coors[0] = thisTouch.clientX;
			coors[1] = thisTouch.clientY;
		} else { 								// all others
			coors[0] = e.clientX;
			coors[1] = e.clientY;
		}
		return coors;
	}
    
    }

    function $(id) {
    	return document.getElementById(id);
    }





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    





        // Set virtual screen width size to 640 pixels (横幅640pxに設定)
        monaca.viewport({width: 640});
    



$(function() {
    // active
    $('a, input[type="button"], input[type="submit"], button')
        .bind('touchstart', function() {
            $(this).addClass('active');
        }).bind( 'touchend', function() {
            $(this).removeClass('active');
        });

});

