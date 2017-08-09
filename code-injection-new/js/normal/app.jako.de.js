



	var jQT = new $.jQTouch({
	  icon: 'jqtouch.png',
	  icon4: 'jqtouch4.png',
	  addGlossToIcon: false,
	  slideleftSelector: '#jqt > ul > li > a, #jqt > ol > li > a',
	  startupScreen: 'jqt_startup.png',
	  statusBar: 'black',
	
	  preloadImages: [
	    'png/Default_android.png',
	    'waiting.gif',
	    'themes/jqt/img/activeButton.png',	 	
	    'themes/jqt/img/back_button.png',
	    'themes/jqt/img/back_button_clicked.png',
	    'themes/jqt/img/blueButton.png',
	    'themes/jqt/img/button.png',
	    'themes/jqt/img/button_clicked.png',
	    'themes/jqt/img/grayButton.png',
	    'themes/jqt/img/greenButton.png',
	    'themes/jqt/img/redButton.png',
	    'themes/jqt/img/whiteButton.png',
	    'themes/jqt/img/loading.gif',
	    'css/sw-alpha.png',
	    'css/sw-button_cancel.png',
	    'css/sw-button-done.png', 	
	    'css/sw-header.png',	
	    'css/sw-slot-border.png',	 	
	    'bar_img/ajax.png',
	    'bar_img/animation.png',
	    'bar_img/demos.png',
	    'bar_img/events.png',
	    'bar_img/extensions.png',
	    'bar_img/iphone.png',
	    'bar_img/home.png',
	    'bar_img/settings.png',
	    'bar_img/ajax@2x.png',
	    'bar_img/animation@2x.png',
	    'bar_img/demos@2x.png',
	    'bar_img/events@2x.png',
	    'bar_img/extensions@2x.png',
	    'bar_img/iphone@2x.png',
	    'bar_img/jqt@2x.png',
	    'bar_img/video@2x.png'
	  ],
	  useFastTouch: true
	});
	
	
	// Some sample Javascript functions:
	function onSuccess(position) {
	    kx = position.coords.latitude;
	    ky = position.coords.longitude;
	}
	
	function onError(error) {
        alert ("Sie haben keine Geolocalisation aktiviert." + '\n' +
					"Bitte haken Sie die Option unter 'Einstellungen/Standort & Sicherheit/Drahtlosnetzwerke' an");
	}

    //var pictureSource;   // picture source
    //var destinationType; // sets the format of returned value 
    


var SpinningWheel={cellHeight:44,friction:0.003,slotData:[],handleEvent:function(e){if(e.type=="touchstart"){this.lockScreen(e);if(e.currentTarget.id=="sw-cancel"||e.currentTarget.id=="sw-done"){this.tapDown(e)}else{if(e.currentTarget.id=="sw-frame"){this.scrollStart(e)}}}else{if(e.type=="touchmove"){this.lockScreen(e);if(e.currentTarget.id=="sw-cancel"||e.currentTarget.id=="sw-done"){this.tapCancel(e)}else{if(e.currentTarget.id=="sw-frame"){this.scrollMove(e)}}}else{if(e.type=="touchend"){if(e.currentTarget.id=="sw-cancel"||e.currentTarget.id=="sw-done"){this.tapUp(e)}else{if(e.currentTarget.id=="sw-frame"){this.scrollEnd(e)}}}else{if(e.type=="webkitTransitionEnd"){if(e.target.id=="sw-wrapper"){this.destroy()}else{this.backWithinBoundaries(e)}}else{if(e.type=="orientationchange"){this.onOrientationChange(e)}else{if(e.type=="scroll"){this.onScroll(e)}}}}}}},onOrientationChange:function(e){window.scrollTo(0,0);this.swWrapper.style.top=window.innerHeight+window.pageYOffset+"px";this.calculateSlotsWidth()},onScroll:function(e){this.swWrapper.style.top=window.innerHeight+window.pageYOffset+"px"},lockScreen:function(e){e.preventDefault();e.stopPropagation()},reset:function(){this.slotEl=[];this.activeSlot=null;this.swWrapper=undefined;this.swSlotWrapper=undefined;this.swSlots=undefined;this.swFrame=undefined},calculateSlotsWidth:function(){var div=this.swSlots.getElementsByTagName("div");for(var i=0;i<div.length;i+=1){this.slotEl[i].slotWidth=div[i].offsetWidth}},create:function(){var i,l,out,ul,div;this.reset();div=document.createElement("div");div.id="sw-wrapper";div.style.top=window.innerHeight+window.pageYOffset+"px";div.style.webkitTransitionProperty="-webkit-transform";div.innerHTML='<div id="sw-header"><div id="sw-cancel">Cancel</div><div id="sw-done">Done</div></div><div id="sw-slots-wrapper"><div id="sw-slots"></div></div><div id="sw-frame"></div>';document.body.appendChild(div);this.swWrapper=div;this.swSlotWrapper=document.getElementById("sw-slots-wrapper");this.swSlots=document.getElementById("sw-slots");this.swFrame=document.getElementById("sw-frame");for(l=0;l<this.slotData.length;l+=1){ul=document.createElement("ul");out="";for(i in this.slotData[l].values){out+="<li>"+this.slotData[l].values[i]+"</li>"}ul.innerHTML=out;div=document.createElement("div");div.className=this.slotData[l].style;div.appendChild(ul);this.swSlots.appendChild(div);ul.slotPosition=l;ul.slotYPosition=0;ul.slotWidth=0;ul.slotMaxScroll=this.swSlotWrapper.clientHeight-ul.clientHeight-86;ul.style.webkitTransitionTimingFunction="cubic-bezier(0, 0, 0.2, 1)";this.slotEl.push(ul);if(this.slotData[l].defaultValue){this.scrollToValue(l,this.slotData[l].defaultValue)}}this.calculateSlotsWidth();document.addEventListener("touchstart",this,false);document.addEventListener("touchmove",this,false);window.addEventListener("orientationchange",this,true);window.addEventListener("scroll",this,true);document.getElementById("sw-cancel").addEventListener("touchstart",this,false);document.getElementById("sw-done").addEventListener("touchstart",this,false);this.swFrame.addEventListener("touchstart",this,false)},open:function(){this.create();this.swWrapper.style.webkitTransitionTimingFunction="ease-out";this.swWrapper.style.webkitTransitionDuration="400ms";this.swWrapper.style.webkitTransform="translate3d(0, -260px, 0)"},destroy:function(){this.swWrapper.removeEventListener("webkitTransitionEnd",this,false);this.swFrame.removeEventListener("touchstart",this,false);document.getElementById("sw-cancel").removeEventListener("touchstart",this,false);document.getElementById("sw-done").removeEventListener("touchstart",this,false);document.removeEventListener("touchstart",this,false);document.removeEventListener("touchmove",this,false);window.removeEventListener("orientationchange",this,true);window.removeEventListener("scroll",this,true);this.slotData=[];this.cancelAction=function(){return false};this.cancelDone=function(){return true};this.reset();document.body.removeChild(document.getElementById("sw-wrapper"))},close:function(){this.swWrapper.style.webkitTransitionTimingFunction="ease-in";this.swWrapper.style.webkitTransitionDuration="400ms";this.swWrapper.style.webkitTransform="translate3d(0, 0, 0)";this.swWrapper.addEventListener("webkitTransitionEnd",this,false)},addSlot:function(values,style,defaultValue){if(!style){style=""}style=style.split(" ");for(var i=0;i<style.length;i+=1){style[i]="sw-"+style[i]}style=style.join(" ");var obj={values:values,style:style,defaultValue:defaultValue};this.slotData.push(obj)},getSelectedValues:function(){var index,count,i,l,keys=[],values=[];for(i in this.slotEl){this.slotEl[i].removeEventListener("webkitTransitionEnd",this,false);this.slotEl[i].style.webkitTransitionDuration="0";if(this.slotEl[i].slotYPosition>0){this.setPosition(i,0)}else{if(this.slotEl[i].slotYPosition<this.slotEl[i].slotMaxScroll){this.setPosition(i,this.slotEl[i].slotMaxScroll)}}index=-Math.round(this.slotEl[i].slotYPosition/this.cellHeight);count=0;for(l in this.slotData[i].values){if(count==index){keys.push(l);values.push(this.slotData[i].values[l]);break}count+=1}}return{keys:keys,values:values}},setPosition:function(slot,pos){this.slotEl[slot].slotYPosition=pos;this.slotEl[slot].style.webkitTransform="translate3d(0, "+pos+"px, 0)"},scrollStart:function(e){var xPos=e.targetTouches[0].clientX-this.swSlots.offsetLeft;var slot=0;for(var i=0;i<this.slotEl.length;i+=1){slot+=this.slotEl[i].slotWidth;if(xPos<slot){this.activeSlot=i;break}}if(this.slotData[this.activeSlot].style.match("readonly")){this.swFrame.removeEventListener("touchmove",this,false);this.swFrame.removeEventListener("touchend",this,false);return false}this.slotEl[this.activeSlot].removeEventListener("webkitTransitionEnd",this,false);this.slotEl[this.activeSlot].style.webkitTransitionDuration="0";var theTransform=window.getComputedStyle(this.slotEl[this.activeSlot]).webkitTransform;theTransform=new WebKitCSSMatrix(theTransform).m42;if(theTransform!=this.slotEl[this.activeSlot].slotYPosition){this.setPosition(this.activeSlot,theTransform)}this.startY=e.targetTouches[0].clientY;this.scrollStartY=this.slotEl[this.activeSlot].slotYPosition;this.scrollStartTime=e.timeStamp;this.swFrame.addEventListener("touchmove",this,false);this.swFrame.addEventListener("touchend",this,false);return true},scrollMove:function(e){var topDelta=e.targetTouches[0].clientY-this.startY;if(this.slotEl[this.activeSlot].slotYPosition>0||this.slotEl[this.activeSlot].slotYPosition<this.slotEl[this.activeSlot].slotMaxScroll){topDelta/=2}this.setPosition(this.activeSlot,this.slotEl[this.activeSlot].slotYPosition+topDelta);this.startY=e.targetTouches[0].clientY;if(e.timeStamp-this.scrollStartTime>80){this.scrollStartY=this.slotEl[this.activeSlot].slotYPosition;this.scrollStartTime=e.timeStamp}},scrollEnd:function(e){this.swFrame.removeEventListener("touchmove",this,false);this.swFrame.removeEventListener("touchend",this,false);if(this.slotEl[this.activeSlot].slotYPosition>0||this.slotEl[this.activeSlot].slotYPosition<this.slotEl[this.activeSlot].slotMaxScroll){this.scrollTo(this.activeSlot,this.slotEl[this.activeSlot].slotYPosition>0?0:this.slotEl[this.activeSlot].slotMaxScroll);return false}var scrollDistance=this.slotEl[this.activeSlot].slotYPosition-this.scrollStartY;if(scrollDistance<this.cellHeight/1.5&&scrollDistance>-this.cellHeight/1.5){if(this.slotEl[this.activeSlot].slotYPosition%this.cellHeight){this.scrollTo(this.activeSlot,Math.round(this.slotEl[this.activeSlot].slotYPosition/this.cellHeight)*this.cellHeight,"100ms")}return false}var scrollDuration=e.timeStamp-this.scrollStartTime;var newDuration=(2*scrollDistance/scrollDuration)/this.friction;var newScrollDistance=(this.friction/2)*(newDuration*newDuration);if(newDuration<0){newDuration=-newDuration;newScrollDistance=-newScrollDistance}var newPosition=this.slotEl[this.activeSlot].slotYPosition+newScrollDistance;if(newPosition>0){newPosition/=2;newDuration/=3;if(newPosition>this.swSlotWrapper.clientHeight/4){newPosition=this.swSlotWrapper.clientHeight/4}}else{if(newPosition<this.slotEl[this.activeSlot].slotMaxScroll){newPosition=(newPosition-this.slotEl[this.activeSlot].slotMaxScroll)/2+this.slotEl[this.activeSlot].slotMaxScroll;newDuration/=3;if(newPosition<this.slotEl[this.activeSlot].slotMaxScroll-this.swSlotWrapper.clientHeight/4){newPosition=this.slotEl[this.activeSlot].slotMaxScroll-this.swSlotWrapper.clientHeight/4}}else{newPosition=Math.round(newPosition/this.cellHeight)*this.cellHeight}}this.scrollTo(this.activeSlot,Math.round(newPosition),Math.round(newDuration)+"ms");return true},scrollTo:function(slotNum,dest,runtime){this.slotEl[slotNum].style.webkitTransitionDuration=runtime?runtime:"100ms";this.setPosition(slotNum,dest?dest:0);if(this.slotEl[slotNum].slotYPosition>0||this.slotEl[slotNum].slotYPosition<this.slotEl[slotNum].slotMaxScroll){this.slotEl[slotNum].addEventListener("webkitTransitionEnd",this,false)}},scrollToValue:function(slot,value){var yPos,count,i;this.slotEl[slot].removeEventListener("webkitTransitionEnd",this,false);this.slotEl[slot].style.webkitTransitionDuration="0";count=0;for(i in this.slotData[slot].values){if(i==value){yPos=count*this.cellHeight;this.setPosition(slot,yPos);break}count-=1}},backWithinBoundaries:function(e){e.target.removeEventListener("webkitTransitionEnd",this,false);this.scrollTo(e.target.slotPosition,e.target.slotYPosition>0?0:e.target.slotMaxScroll,"150ms");return false},tapDown:function(e){e.currentTarget.addEventListener("touchmove",this,false);e.currentTarget.addEventListener("touchend",this,false);e.currentTarget.className="sw-pressed"},tapCancel:function(e){e.currentTarget.removeEventListener("touchmove",this,false);e.currentTarget.removeEventListener("touchend",this,false);e.currentTarget.className=""},tapUp:function(e){this.tapCancel(e);if(e.currentTarget.id=="sw-cancel"){this.cancelAction()}else{this.doneAction()}this.close()},setCancelAction:function(action){this.cancelAction=action},setDoneAction:function(action){this.doneAction=action},cancelAction:function(){return false},cancelDone:function(){return true}};

//alert ($(window).width());
//alert ($(window).height());

	var webpfad = "http://www.reinke.de/jako/";
	//var webpfad = "http://www.jako.de/app/";
	var acode;
	
	var mymarkt = "";
	
	var paramter;

	var adevice;
    
    var jxhr;
    
	var marker_list = [];

	var liste = "";
	var gefunden = 0;
	var haendlers = 0;
	var zoom;

	var kx = 0;
	var ky = 0;
	
	var xu = 0;
	var xo = 0;
	var yu = 0;
	var yo = 0;

	var sprache;
	var plzeingabe;
	var ortseingabe;
	
	var sprachliste = 0;
	var marktliste = 0;

    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 

	var standortseite = "";

	var welcheKarte = "";
	
	var wheel_an = 0;
	var aWheel = "";
			
	var online = navigator.onLine;

	var mywhere = "";
	
	paramter = dynpara();
	//alert (paramter);
		
	var device = navigator.userAgent.toLowerCase();
  	if (device.indexOf('iphone') > 1)
  	{
        adevice = "iphone";
		document.write('<script type="text/javascript" charset="utf-8" src="phonegap-1.3.0.js"></script>');
  	}
  	else
  	{
	  	if (device.indexOf('ipad') > 1)
	  	{
            adevice = "ipad";
			document.write('<script type="text/javascript" charset="utf-8" src="phonegap-1.3.0.js"></script>');
	  	}
	  	else
	  	{
            adevice = "android";
			document.write('<script type="text/javascript" charset="utf-8" src="phonegap-1.0.0.js"></script>');
		}
	}


	document.write('<script src="js/publicsql.js" type="text/javascript" charset="utf-8"></script>');

	//früh laden, da setzen einer globalen Variable gefordert ist (webpfad)
    document.write('<script type="text/javascript" src="' + webpfad + '"/db/interface.ptf?para=' + paramter + '"></script>');
    document.write('<script type="text/javascript" src="' + webpfad + '"/db/haendler.ptf?para=' + paramter + '"></script>');

	document.write('<script src="js/jquery-1.4.2.js" type="text/javascript" charset="utf-8"></script>');
	document.write('<script src="js/jQueryRotate.2.2.js" type="text/javascript" charset="utf-8"></script>');

	document.write('<link type="text/css" rel="stylesheet" href="css/jako.css" />');
	document.write('<link type="text/css" rel="stylesheet" href="css/kooaba.css" />');
 	
	document.write('<style type="text/css" media="screen">@import "css/jqtouch.css";</style>');
	document.write('<style type="text/css" media="screen">@import "css/theme.css";</style>');
	document.write('<style type="text/css" media="screen">@import "extensions/jqt.bars/jqt.bars.css";</style>');
	document.write('<style type="text/css" media="screen">@import "extensions/jqt.bars/themes/jqt/theme.css";</style>');
	document.write('<style type="text/css" media="screen">@import "extensions/jqt.listIndex/jqt.listIndex.css";</style>');

	document.write('<!--script src="js/php.js"></script-->');
	document.write('<script src="js/kooaba.js"></script>');

	document.write('<script src="js/jqtouch.js" type="application/x-javascript" charset="utf-8"></script>');

	document.write('<script src="extensions/jqt.autotitles.js" type="application/x-javascript" charset="utf-8"></script>');
	document.write('<script src="extensions/jqt.bars/jqt.bars.js" type="application/x-javascript" charset="utf-8"></script>');
	document.write('<script src="extensions/jqt.listIndex/jqt.listIndex.js" type="application/x-javascript" charset="utf-8"></script>');

	//spinning wheel
	document.write('<script src="js/spinningwheel.js" type="application/x-javascript"></script>');
	document.write('<style type="text/css" media="screen">@import "css/spinningwheel.css";</style>');

	document.write('<script src="http://maps.google.com/maps/api/js?sensor=true&amp;language=de" type="text/javascript"></script>');		

	document.write('<script src="js/gmap3.js" type="text/javascript" charset="utf-8"></script>');

    //alert (adevice);
    



function onload() {

	//window.onerror = Fehlerbehandlung;


	document.addEventListener("deviceready", onDeviceReady, false);

	navisprache();

	buildinterface(sprache);
	
	if (localStorage.getItem("BildNr") == null)
	{
        resetSpeicher();
	}
}

function onDeviceReady() {

	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;
    
    navigator.geolocation.getCurrentPosition(xyAusgabe, xyError);

	//navigator.network.isReachable("http://www.google.com", reachableCallback, {});

	//JAKO events
	alleevents();
	
    navigator.notification.vibrate(100);

	if ( adevice == "android" )
	{
		document.getElementById("android_br").innerHTML = "<br>";
	}
	document.getElementById("starten").style.visibility = "visible";
}

function dynpara() {
	a = new Date();
	b = a.getHours(); c = a.getMinutes(); d = a.getSeconds();
	if(b < 10){b = '0'+b;} 
	if(c < 10){c = '0'+c;} 
	if(d < 10){d = '0'+d;}
	var para = b+'_'+c+'_'+d;
	return para;
}

function resetSpeicher() {
    localStorage.BildNr = "0";
    //alert (localStorage.getItem("BildNr"));
}

function alleevents() {
	pageevents();
	klickevents();
}

function pageevents() {

	//JAKO PAGE EVENTS
	//Start____________________________________________________________________________________________________________________________________________________	
	// Page animation callback events

	$('#aufnehmen').
	bind('pageAnimationStart', function(e, info){
	    if (info.direction == 'in')
	    {
	    	capturePhoto();
	    }
	}).
		bind('pageAnimationEnd', function(e, info){
	});


	$('#sprachen').
	bind('pageAnimationStart', function(e, info){
	    if (info.direction == 'in')
	    {
	    	zeigesprachen("sprache");
	    }
	}).
		bind('pageAnimationEnd', function(e, info){
	});

	$('#de').
	bind('pageAnimationStart', function(e, info){
	    if (info.direction == 'in')
	    {
	    	//falls klickevents vergessen wurden
	    	klickevents();
	    }
	}).
		bind('pageAnimationEnd', function(e, info){
	});


	$('#haendler').
	  bind('pageAnimationStart', function(e, info){
	    if (info.direction == 'in')
	    {
	    	//zeigeLaender();
	    }
	 }).
	  bind('pageAnimationEnd', function(e, info){
	    if (info.direction == 'in')
	    {
	    	var dummy = document.getElementById("db_waehleland").innerHTML;
			if (dummy.indexOf("*") != -1)
			{
				//zeigeLaender();
                umkreis("select * FROM umkreis");
			}
	    }
	    if (info.direction == 'out')
	    {
	    	if (wheel_an == 1)
	    	{
	    		cancel();
	    	}
	    }
	  });
	
	//JAKO PAGE EVENTS
	//Start____________________________________________________________________________________________________________________________________________________	

}

function klickevents() {


	$('#loescheBilder').click(function(){
		allebilderloeschen();
	});

	$('#loescheBild').click(function(){
		loescheBildNr(document.getElementById('abild').innerText);
	});

	$('#starten_').click(function(){
	
        buildinterface(sprache);
                        
		var dummy = document.getElementById("db_fotografieren").innerHTML;
		if (dummy.indexOf("*") > -1)
		{
			jQT.goTo("#nichtonline", 'slideleft');
		}
		else
		{
			//alert ("preload");
			/*
			getScript('http://www.reinke.de/jako/db/deutschlandplz.ptf', function(){
	  			alert("Pet Name: " + PETNAME);
			});
			*/
		}

	});

	$('#fotomachen').click(function(){
		capturePhoto();
	});

    $('#foto_de').click(function(){
		jQT.goTo("#wichtig", 'slideleft');
	});


	$('#deutsch').click(function(){
		sprache = "de";
	});

	$('#englisch').click(function(){
		sprache = "en";
	});

	$('#button_plz').click(function(){
		standortseite = "#standorte_plz";
		welcheKarte = "#m_plz";

		switch (document.getElementById("db_waehleland").innerHTML)
		{
			case "Deutschland":						
				if (document.Formular_DE.plz.value == "")
					document.getElementById("db_plzeingabe").innerText = plzeingabe;
				else
				{
					if (wheel_an == 0)
					{					
						document.getElementById("db_plzeingabe").innerText = "";
						haendler_plz_suche("select * FROM deutschlandplz");
					}
					else
					{
						//navigator.notification.vibrate(100);
					}
				}
				break;
			default:
				document.getElementById("db_plzeingabe").innerText = "";
				haendler_plz_suche("select * FROM restplz where restplz.Land = '" + document.getElementById("db_waehleland").innerHTML + "'");
				break;
		}
	});


	$('#button_ort').click(function(){
		standortseite = "#standorte_ort";
		welcheKarte = "#m_ort";
		
		if (document.Formular_DE.ort.value == "")
			document.getElementById("db_keinort").innerText = ortseingabe;
		else
		{
			if (wheel_an == 0)
			{
				document.getElementById("db_keinort").innerText = ""
				deutschlandOrt("select * FROM deutschlandort");
			}
			else
			{
				//navigator.notification.vibrate(100);
			}
		}
	});

	$('#button_umkreis').click(function(){

		if (wheel_an == 0)
		{
			umkreis("select * FROM umkreis");
		}
		else
		{
			//navigator.notification.vibrate(100);
		}
	});


	$('#karte_de').click(function(){

			zeigestandorte(document.getElementById("db_waehleland").innerText, 
			document.getElementById("db_plz_de").innerText,
			document.getElementById("db_ort_de").innerText,
			document.getElementById("db_strasse_de").innerText);		
	});


	$('#finde_haendler').click(function(){
		//zeigeLaender();
	});
	

	$('#button_land').click(function(){
		if (wheel_an == 0)
			zeigeLaender();
		else
		{
			//navigator.notification.vibrate(100);
		}
	});
	
	
}

function loescheBildNr(i) {

	localStorage.setItem("Datum" + i, "");
	localStorage.setItem("Zeit" + i, "");
	localStorage.setItem("Haupttitel" + i, "");
	localStorage.setItem("Bild" + i, "");
	localStorage.setItem("Icon" + i, "");
	
	var z = 0;	
	while (localStorage.getItem("url" + String(i) + String(z)) != null) {
		localStorage.setItem("url" + String(i) + String(z), "");
		localStorage.setItem("Titel" + String(i) + String(z), "");
	  	z++;
	}			
}

function starten2() {

    buildinterface(sprache);

    var dummy = document.getElementById("db_fotografieren").innerHTML;
    //alert (dummy);
    if (dummy.indexOf("*") > -1)
    {
        jQT.goTo("#nichtonline", 'slideleft');
    }
    else
    {
        //alert ("preload");
        /*
        getScript('http://www.reinke.de/jako/db/deutschlandplz.ptf', function(){
        alert("Pet Name: " + PETNAME);
        });
        */
        jQT.goTo("#de", 'slideleft');
    }
}

function ermittleUmkreisStandorte(entfernung) {
	
	var km10;
	var km50;
	var km100;
	var km150;
	var dummy;
	var faktor = 0.7;

	//alert (entfernung);		
	switch (entfernung)
	{
		case "10":
			// 10km
			km10 = eval((100/111) * 0.1 * faktor);
			dummy = km10;
			zoom = 11;
			break;

		case "50":
			// 50km
			km10 = eval((100/111) * 0.1 * faktor * 5);
			dummy = km10;
			zoom = 10;
			break;

		case "100":
			// 100km
			km100 = eval((100/111) * 0.1 * faktor * 10);
			dummy = km100;
			zoom = 9;
			break;
			
		case "150":
			// 150km
			km100 = eval((100/111) * 0.1 * faktor * 15);
			dummy = km100;
			zoom = 8;
			break;
			
		case "200":
			// 200km
			km200 = eval((100/111) * 0.1 * faktor * 20);
			dummy = km200;
			zoom = 7;
			break;
			
		case "300":
			// 300km
			km300 = eval((100/111) * 0.1 * faktor * 30);
			dummy = km300;
			zoom = 7;
			break;

		default:
			break;
	}

	xu = eval(kx - eval(dummy * faktor));
	xo = eval(kx + eval(dummy * faktor));

	yu = eval(ky - dummy);
	yo = eval(ky + dummy);
	
	//alert (kx + "\n" + ky + "\n\n" + eval(kx - dummy) + "\n" + eval(ky - dummy));
	//alert ("ul->" + xu + "#" + yu + "\n" +	"ol->" + xu + "#" + yo + "\n" + "or->" + xo + "#" + yo + "\n" +	"ur->" + xo + "#" + yu + "\n");
	
	//4 Nachkommastellen
	xu = (Math.round(xu * 10000) / 10000);
	xo = (Math.round(xo * 10000) / 10000);
	yu = (Math.round(yu * 10000) / 10000);
	yo = (Math.round(yo * 10000) / 10000);
	
	var sql = "select * from haendler where haendler.Breite > " + xu + " and haendler.Breite < " + xo + " and haendler.Laenge > " + yu + " and haendler.Laenge < " + yo;
	//var sql = "SELECT * FROM haendler WHERE (Laenge > " + xu + " AND Laenge < " + xo + ")";
	var sql = "SELECT Name,Adresse,PLZ,Ort,Email,Homepage,Telefonnr,Land,Country,Breite,Laenge FROM haendler WHERE Laenge > " + xu + " AND Breite > " + yu + "";
	//alert (sql);

    publicSQL.tablePath = webpfad + "db/";
	publicSQL.query(sql, "haendlerliste");
	
}


function haendlerliste(t) {

  	//Records
  	//alert (t.length-1);
  	//Felder
  	//alert (t[0].length);
	
	var dummy;
	haendlers = 0;

    var myName;
    var myAdresse;
    var myPLZ;
    var myOrt;
    var myEmail;
    var myHomepage;
    var myHomepage2;
    var myBreite;
    var myLaenge;

	for (var i=1; i<t.length; i++) {
		dummy = "";
		yOK = 0;
		xOK = 0;
		for (var ii=0; ii<t[0].length; ii++) {

			switch (t[0][ii])
			{
				case "Name":
					myName = t[i][ii];
					break;
					
				case "Adresse":
					myAdresse = t[i][ii];
					break;
					
				case "PLZ":
					myPLZ = t[i][ii];
					break;
					
				case "Ort":
					myOrt = t[i][ii];
					break;
					
				case "Email":
					myEmail = t[i][ii];
					break;
					
				case "Homepage":
					myHomepage = t[i][ii];
                    if (myHomepage.indexOf("http://") == -1)
                    {
                        if (myHomepage != "")
                        {
                            myHomepage2 = "http://" + myHomepage;
                            //alert (myHomepage2);
                        }
                        else
                        {
                            myHomepage2 = "";
                        }
					}
                    else
                    {
                        myHomepage2 = myHomepage;
					}
					break;
					
				case "Breite":
					myBreite = t[i][ii];
					//yu
					if (eval(t[i][ii]) < yo)
					{
						dummy = dummy + t[i][ii] + " ist kleiner als " + yo + "\n";
						yOK = 1;
					}
					break;

				case "Laenge":
					myLaenge = t[i][ii];
					//xu
					if (eval(t[i][ii]) < xo)
					{
						dummy = dummy + t[i][ii] + " ist kleiner als " + xo;
						xOK = 1;
					}
					break;

				default:
					break;
			}
    	}
    	if (( xOK ==1) && ( yOK == 1))
    	{
			haendlers = eval(haendlers + 1);
			//alert (myOrt);

            if (myEmail != "")
            {
                if (myHomepage2 != "")
                {
                    //alles da
                    dummy = "<span style='color: black'><strong>" + myName + "</strong><br>" + myPLZ + 
                    " " + myOrt + "<br>" + myAdresse + "<br><br>" +
                    "<a href='mailto:" + myEmail + "'>" + myEmail + "</a>" +
                    "<br>" + 
                    "<a href='" + myHomepage2 + "' target='_blank'>" + myHomepage2 + "</a>" +
                    "</span>";
                }
                else
                {
                    //Email da
                    dummy = "<span style='color: black'><strong>" + myName + "</strong><br>" + myPLZ + 
                    " " + myOrt + "<br>" + myAdresse + "<br><br>" +
                    "<a href='mailto:" + myEmail + "'>" + myEmail + "</a>" +
                    "</span>";
                }
            }
            else    
            {
                if (myHomepage2 != "")
                {
                    //Homepage da
                    dummy = "<span style='color: black'><strong>" + myName + "</strong><br>" + myPLZ + 
                    " " + myOrt + "<br>" + myAdresse + "<br><br>" +
                    "<br>" + 
                    "<a href='" + myHomepage2 + "' target='_blank'>" + myHomepage2 + "</a>" +
                    "</span>";
                }
                else
                {
                    //nichts da
                    dummy = "<span style='color: black'><strong>" + myName + "</strong><br>" + myPLZ + 
                    " " + myOrt + "<br>" + myAdresse +
                    "</span>";
                }
            }
            /*    
			dummy = "<span style='color: black'><strong>" + myName + "</strong><br>" + myPLZ + 
            " " + myOrt + "<br>" + myAdresse + "<br><br>" +
            "<a href='mailto:" + myEmail + "'>" + myEmail + "</a>" +
            "<br>" + 
            myHomepage + 
            "</span>";
            */
			marker_list.push({ latLng:[myLaenge, myBreite], data: dummy, options:{icon: "marker/marker_green.png"}});
		}
		else
		{
			//alert ("Ort->" + myOrt + " ist nicht drin");
		}
    }
	//alert (haendlers);
	zeigeHaendler();
}

function zeigeHaendler() {

	marker_list.push({ latLng:[kx, ky], data: "<span style='color: black'>Ihr Standort</span>", options:{icon: "marker/standort.png"}});
/*
marker_list.push({ latLng:[xu, yu], data: "unten links", options:{icon: "marker/ul.png"}});
marker_list.push({ latLng:[xu, yo], data: "oben links", options:{icon: "marker/ol.png"}});
marker_list.push({ latLng:[xo, yo], data: "oben rechts", options:{icon: "marker/or.png"}});
marker_list.push({ latLng:[xo, yu], data: "unten rechts", options:{icon: "marker/ur.png"}});
*/

	$("#m_plz").gmap3({
	  map:
	  {
	    options:
	    {
	  		    center:[kx,ky],
	      		zoom: zoom
	    }
	  },
	  marker:{
	    values: marker_list,
	    options:{
	      draggable: false
	    },
	    events:{
	      mouseover: function(marker, event, context){
	        var map = $(this).gmap3("get"),
	          infowindow = $(this).gmap3({get:{name:"infowindow"}});
	        if (infowindow){
	          infowindow.open(map, marker);
	          infowindow.setContent(context.data);
	        } else {
	          $(this).gmap3({
	            infowindow:{
	              anchor:marker,
	              options:{content: context.data}
	            }
	          });
	        }
	      },
	      mouseout: function(){
	        var infowindow = $(this).gmap3({get:{name:"infowindow"}});
	        if (infowindow){
	          infowindow.close();
	        }
	      }
	    }
	  }
	});

  	jQT.goTo("#standorte_plz", 'slideleft');
}

function getScript(url, callback) {

   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   script.onreadystatechange = callback;
   script.onload = callback;

   document.getElementsByTagName('head')[0].appendChild(script);
   //alert (document.head);
   
}


function teste() {

	//Define user data provided by kooaba
	var access_key = "39f8ed9043b16dcec1c0cbd7b95e5b792c6d5a42";
	var secret_key = "519015fa6c550007b88ef5c5bcd4d8c97bc2acc0";
	var group_id = "2376";
	
	
	//Query image
	var filename = "jako_test.jpg";
	
	//Load image
	var img = file_get_contents(filename); 
	
	//Connection data. Hostname, port number, and path
	//var host = "search.kooaba.com";
	var host = "https://search.kooaba.com";
	var port = "80";
	var path = "/queries.xml";
	var content_type = "multipart/form-data";

	//Define timezone for RFC 2616 standards
	date_default_timezone_set('GMT');
	
	//Get current time in RFC 2616 format
	var thisDate = date("D, d M Y H:i:s T", time());

	//Define boundary for multipart message
	var boundary = uniqid();
	
	//Construct message body first as it is needed for the authentication
	var body  = "--" + boundary + "\r\n";
	body = body + 'Content-Disposition: form-data; name="query[file]"; filename="' + filename + '"' + "\r\n";
	body = body + 'Content-Transfer-Encoding: binary' + "\r\n";
	body = body + 'Content-Type: image/jpeg' + "\r\n\r\n";
	body = body + img + "\r\n";
	//Group part begin
	body = body + "--" + boundary + "\r\n";
	body = body + 'Content-Disposition: form-data; name="query[group_ids][]"'+"\r\n\r\n";
	body = body + group_id + "\r\n";
	//Group part end
	//To query multiple groups, append additional group parts (each with a single group ID)
	body = body + "--" + boundary + "--\r\n";
	

	//Create the string to sign
	var string_to_sign = secret_key + "\n\n" +
		"POST" + "\n" +
		md5(body) + "\n" +
		content_type + "\n" +
		thisDate + "\n" +
		path;

	//Create signature
	var signature = base64_encode( sha1(string_to_sign, true) );
	var auth = "KWS" + " " + access_key + ":" + signature;
	
	
	//Define HTTP message header
	var header  = "Content-Type: " + content_type + "; boundary=" + boundary +"\r\n";
	header = header + "Host: " + host + "\r\n";
	header = header + "Date: " + thisDate + "\r\n";
	header = header + "Authorization: " + auth + "\r\n";
	header = header + "Content-Length: " + strlen(body) + "\r\n";

 	//alert ("Host->" + host); 
 	//alert ("port->" + port); 
 	//alert ("header->" + header); 
 	//alert ("body->" + body); 


	if (window.XMLHttpRequest)
	{
		xhr = new XMLHttpRequest();		
		xhr.open("POST", host, true);

		//Send the proper header information along with the request
		xhr.setRequestHeader("Content-Type", content_type + "; boundary=" + boundary);
		xhr.setRequestHeader("Host", host);
		xhr.setRequestHeader("Authorization", auth);
		xhr.setRequestHeader("Content-Length", strlen(body));
		xhr.onreadystatechange = datenAusgeben;
		xhr.send(body);
	}
	else
	{
		alert ("Es konnte kein Request-Objekt geladen werden!");
	}

}

function xyAusgabe(position) {

	var element =  'Latitude: '           + position.coords.latitude              + '\n' +
	'Longitude: '          + position.coords.longitude             + '\n' +
	'Altitude: '           + position.coords.altitude              + '\n' +
	'Accuracy: '           + position.coords.accuracy              + '\n' +
	'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '\n' +
	'Heading: '            + position.coords.heading               + '\n' +
	'Speed: '              + position.coords.speed                 + '\n' +
	'Timestamp: '          + new Date(position.timestamp)          + '\n';

    kx = position.coords.latitude;
    ky = position.coords.longitude;

}

function xyError(error) {
        //alert('code: '    + error.code    + '\n' +
        //      'message: ' + error.message + '\n');
        //zoro
		alert ("Sie haben keine Geolocalisation aktiviert." + '\n' +
				"Bitte haken Sie die Option unter 'Einstellungen/Standort & Sicherheit/Drahtlosnetzwerke' an");
}

function reachableCallback(reachability) {
  // There is no consistency on the format of reachability

  var networkState = reachability.code || reachability;
  var states = {};
  states[NetworkStatus.NOT_REACHABLE]                      = 'No network connection';
  states[NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK] = 'Carrier data connection';
  states[NetworkStatus.REACHABLE_VIA_WIFI_NETWORK]         = 'WiFi connection';
  if (networkState != 0) online = true;
  
  alert (online);
}

function zeigeUmkreisStandorte(werte) {

    var dummy = land + "," + plz + "," + ort + "," + strasse;

    switch (sprache)
    {
    	case "de":
		    standort = "Ihr Standort";
    		break;
    	default:
		    standort = "Your location";
    		break;
    }

	
	$(welcheKarte).gmap3({
	  map:
	  {
	    options:
	    {
	  		    center:[kx,ky],
	      		zoom: 7
	    }
	  },
	  marker:{
	    values:[
	      {latLng:[kx, ky], data: standort, options:{icon: "marker/standort.png"}},
	      {address:dummy, data: dummy, options:{icon: "marker/marker_green.png"}}
	    ],
	    options:{
	      draggable: false
	    },
	    events:{
	      mouseover: function(marker, event, context){
	        var map = $(this).gmap3("get"),
	          infowindow = $(this).gmap3({get:{name:"infowindow"}});
	        if (infowindow){
	          infowindow.open(map, marker);
	          infowindow.setContent(context.data);
	        } else {
	          $(this).gmap3({
	            infowindow:{
	              anchor:marker,
	              options:{content: context.data}
	            }
	          });
	        }
	      },
	      mouseout: function(){
	        var infowindow = $(this).gmap3({get:{name:"infowindow"}});
	        if (infowindow){
	          infowindow.close();
	        }
	      }
	    }
	  }
	});

	$(welcheKarte)
  		.width("320px")
  		.height("460px")
  		.gmap3({trigger:"resize"}
  	);
  
  	jQT.goTo(standortseite, 'slideleft');
}
    
    
function zeigestandorte(land, plz, ort, strasse) {

    var dummy = land + "," + plz + "," + ort + "," + strasse;

    switch (sprache)
    {
    	case "de":
		    standort = "Ihr Standort";
    		break;
    	default:
		    standort = "Your location";
    		break;
    }
	
	$(welcheKarte).gmap3({
	  map:
	  {
	    options:
	    {
	  		    center:[kx,ky],
	      		zoom: 7
	    }
	  },
	  marker:{
	    values:[
	      {latLng:[kx, ky], data: standort, options:{icon: "marker/standort.png"}},
	      {address:dummy, data: dummy, options:{icon: "marker/marker_green.png"}}
	    ],
	    options:{
	      draggable: false
	    },
	    events:{
	      mouseover: function(marker, event, context){
	        var map = $(this).gmap3("get"),
	          infowindow = $(this).gmap3({get:{name:"infowindow"}});
	        if (infowindow){
	          infowindow.open(map, marker);
	          infowindow.setContent(context.data);
	        } else {
	          $(this).gmap3({
	            infowindow:{
	              anchor:marker,
	              options:{content: context.data}
	            }
	          });
	        }
	      },
	      mouseout: function(){
	        var infowindow = $(this).gmap3({get:{name:"infowindow"}});
	        if (infowindow){
	          infowindow.close();
	        }
	      }
	    }
	  }
	});

	$(welcheKarte)
  		.width("320px")
  		.height("460px")
  		.gmap3({trigger:"resize"}
  	);
  
  	jQT.goTo(standortseite, 'slideleft');
}
    

function video1() {
	window.location.href="http://www.youtube.com/watch?v=ESxQkDHD9Qs"
}
    
function mytel(nr) {
    window.location.href = 'tel:' + nr;
}
    
function resetSuche() {
	mywhere = "";
	jQT.goTo('#suchen1', 'slideleft');
}


function ajax() {
	if (zwei == 1) {zwei = 0; return;}



$("#ajax").load(
	"http://www.reinke.de/ajax.php",
	{
		ajaxpost: "post()-Daten (POST)"
		},
		function (responseText, textStatus, XMLHttpRequest){
			alert(
			responseText + ", " +
			textStatus + ", " +
			XMLHttpRequest
		);
	}
);




/*	
	$("#ajax").load("http://www.reinke.de/ajax.php");
*/

	jQT.goTo('#ajaxcontent', 'slideleft');
	zwei = 1;
}

function starteWheel(db, thema) {

	aWheel = thema;
	
	if (wheel_an == 0)
	{	
		SpinningWheel.addSlot(db, 'left');
	
		SpinningWheel.setCancelAction(cancel);
		SpinningWheel.setDoneAction(done);
		
		wheel_an = 1;
		SpinningWheel.open();
	}
	else
	{
		//wheel schon an
	}
}

function done() {
	var results = SpinningWheel.getSelectedValues();
	//alert('values:' + results.values.join(', ') + ' - keys: ' + results.keys.join(', '));
	//alert("!" + results.values.join(', ') + "!");

	switch (aWheel)
	{
		case "umkreis":
			var wahl = String(results.values.join(', '));
			wahl = wahl.replace(/&nbsp;/g, "");
			document.getElementById("db_umkreissuche").innerHTML = wahl;
			wahl = wahl.replace(/km/g, "");
			ermittleUmkreisStandorte (wahl);
			break;
		
		case "laender":
			switch (sprache)
			{
				case "de":
					document.getElementById("db_waehleland").innerHTML = results.values.join(', ');
					document.getElementById("suchtabelle").style.visibility = "visible";
					break;
				default:
					document.getElementById("country").innerHTML = results.values.join(', ');
					document.getElementById("searchtable").style.visibility = "visible";
					break;
			}
			break;

		case "plz":
			var wahl = String(results.values.join(', '));
			wahl = wahl.replace(/&nbsp;/g, "");
			
			var pos;
			var rest;
			
			pos = wahl.indexOf("#");

			rest = wahl.substr(pos + 1, wahl.length);
			wahl = wahl.substr(0, pos);
						
			pos = wahl.indexOf(">");
			var plz = wahl.substr(0, pos);
			wahl = wahl.substr(pos + 1, wahl.length);
			
			pos = wahl.indexOf(">");
			var ort = wahl.substr(0, pos);
			wahl = wahl.substr(pos + 1, wahl.length);

			var name = wahl;
			//pos = wahl.indexOf(">");
			//var name = wahl.substr(0, pos);
			//wahl = wahl.substr(pos + 1, pos);
			
			pos = rest.indexOf(">");
			var strasse = rest.substr(0, pos);
			rest = rest.substr(pos + 1, rest.length);

			pos = rest.indexOf(">");
			var email = rest.substr(0, pos);
			rest = rest.substr(pos + 1, rest.length);

			pos = rest.indexOf(">");
			var homepage = rest.substr(0, pos);
			rest = rest.substr(pos + 1, rest.length);

			pos = rest.indexOf(">");
			var telefon = rest.substr(0, pos);
			rest = rest.substr(pos + 1, rest.length);


			switch (window.location.hash)
			{
				case "#haendler":
					document.getElementById("db_name_de").innerText = name;
					document.getElementById("db_ort_de").innerText = ort;
					document.getElementById("db_plz_de").innerText = plz;
					document.getElementById("db_strasse_de").innerText = strasse;
					document.getElementById("db_email_de").innerText = email;
					document.getElementById("db_homepage_de").innerText = homepage;
					document.getElementById("db_telefon_de").innerText = telefon;

					document.getElementById("ergebnis").style.visibility = "visible";
					break;

				default:
					break;
			}
			break;

		case "ort":
			var wahl = String(results.values.join(', '));
			wahl = wahl.replace(/&nbsp;/g, "");
			
			var pos;
			var rest;
			
			pos = wahl.indexOf("#");

			rest = wahl.substr(pos + 1, wahl.length);
			wahl = wahl.substr(0, pos);
						
			pos = wahl.indexOf(">");
			var ort = wahl.substr(0, pos);
			wahl = wahl.substr(pos + 1, wahl.length);

			pos = wahl.indexOf(">");
			var plz = wahl.substr(0, pos);
			wahl = wahl.substr(pos + 1, wahl.length);
			
			var name = wahl;
			//pos = wahl.indexOf(">");
			//var name = wahl.substr(0, pos);
			//wahl = wahl.substr(pos + 1, pos);
			
			pos = rest.indexOf(">");
			var strasse = rest.substr(0, pos);
			rest = rest.substr(pos + 1, rest.length);

			pos = rest.indexOf(">");
			var email = rest.substr(0, pos);
			rest = rest.substr(pos + 1, rest.length);

			pos = rest.indexOf(">");
			var homepage = rest.substr(0, pos);
			rest = rest.substr(pos + 1, rest.length);

			pos = rest.indexOf(">");
			var telefon = rest.substr(0, pos);
			rest = rest.substr(pos + 1, rest.length);

			switch (window.location.hash)
			{
				case "#haendler":
					document.getElementById("db_name_de").innerText = name;
					document.getElementById("db_ort_de").innerText = ort;
					document.getElementById("db_plz_de").innerText = plz;
					document.getElementById("db_strasse_de").innerText = strasse;
					document.getElementById("db_email_de").innerText = email;
					document.getElementById("db_homepage_de").innerText = homepage;
					document.getElementById("db_telefon_de").innerText = telefon;

					document.getElementById("ergebnis").style.visibility = "visible";
					break;

				case "#dealer":
					document.getElementById("result").style.visibility = "visible";
					break;
				default:
					break;
			}
			break;
	}
	
	SpinningWheel.close();
	wheel_an = 0;
}

function cancel() {

	SpinningWheel.close();
	wheel_an = 0;
}

function sprachenliste() {
	
    publicSQL.tablePath = webpfad + "db/";
	var sql = "select sprache from interface where interface.sprache = '" + asprache + "'";
    //alert (sql);
	publicSQL.query(sql, "holeinterface");
	//alert (publicSQL.errorNumber);
}

function navisprache() {

	var pos;
	sprache = navigator.language;
  	pos = sprache.indexOf("-"); 
   	if (sprache.indexOf("-") >= 0)
   	{
		sprache = sprache.substr(0, pos);	
   	}
	//aktiver Code z.B. de, en, fr, nl
	acode = sprache;
}


function setzemarkt(amarkt) {
	mymarkt = amarkt;
	//alert (mymarkt);
	jQT.goTo("#aufnehmen", 'slideleft');
}

function buildinterface(acode) {

    publicSQL.tablePath = webpfad + "db/";
    //alert (publicSQL.tablePath);

    if ( acode == "")
    	acode = "en";
    
	var sql = "select * from interface where code = '" + acode + "'";
	//alert (sql);

	publicSQL.query(sql, "holeinterface");
	//alert (publicSQL.errorNumber);
	
}

function holeinterface(t) {

	var feld = "";
	var codeCC = 0;

  	//Records
  	//alert (t.length-1);
  	//Felder
  	//alert (t[0].length);

	acode = acode.replace(/'/g, "");

/*	
	//wo steht der Ländercode in der ptf?
	for (var i=0; i<1; i++)
	{
		for (var ii=0; ii<t[0].length; ii++)
		{
			if (t[0][ii] == "code")
				codeCC = ii;
		}
    }
*/

	for (var i=1; i<t.length; i++) {
		//alert ("i->" + i + "#" + t[i][0] + "\n" + t[i]);

			for (var ii=1; ii<t[0].length; ii++) {
				feld = "db_" + t[0][ii];
	
	            //alert ("Feld->" + feld + "\n" + t[i][ii] + "\n" + t[i]);
				switch (feld)
				{
					case "db_plzeingabe":
						plzeingabe = t[i][ii];
						break;
					case "db_ortseingabe":
						ortseingabe = t[i][ii];
						break;
					case "db_abbrechen":
						break;
					case "db_auswahl":
						break;
					case "db_code":
						break;
					case "db_sprache":
						break;
					case "db_meldung1":
						break;
					case "db_meldung2":
						break;
					default:
						//alert (t[i][ii]);
						labeln(feld, t[i][ii]);
				}
    	}
    }

	document.getElementById("los").style.visibility = "visible";
	//alert ("ja");
}

function labeln(feld, label) {
	try
	{
	  	//alert ("Feld-" + feld + "----" + label);
        document.getElementById(feld).innerText = label;
	}
	catch(err)
	{
	  	//alert (feld + " ist nicht da!");
	}
 }

function jako_http(seite) {

    switch (adevice)
    {
        case "android_":
            var dummy = '<iframe src="' + seite + '" style="width:200px; height: 200px; border:none;" name="website" scrolling="auto" frameborder="0"></iframe>';

            document.getElementById("jakohtml").innerHTML = dummy;
            //alert (document.getElementById("jakohtml").innerHTML);

            jQT.goTo('#jakoanzeige', 'slideleft');
            break;

        default:
            window.location.href = seite;
            break;
    }

}


function haendler_plz_suche(sql) {

//$('#haendler').append('<div id="warten" style="position: absolute; top: 100px; left: 100px; background-color:#C800000; visibility: visible;"><img src="waiting.gif"></div>');
//document.getElementById("warten").style.zIndex=100;

//alert ($(window).width());
//alert ($(window).height());
	

	switch (window.location.hash)
	{
		case "#haendler":
		    publicSQL.tablePath = webpfad + "db/";
			publicSQL.query(sql, "plzDB_DE");
			break;
		default:
			break;
	}
	//alert (publicSQL.errorNumber);

//$('#warten').remove();
}

function plzDB_DE(t) {

  	var dummy = {};
	
  	//alert (t.length-1);

	var suche = document.Formular_DE.plz.value;

	var aktplz = "";
	var z = 1;
	for (var i=1; i<t.length; i++) {
    	aktplz = String(t[i][2]);
    	//alert ("aktplz->" + aktplz + "\n" + "suche->" + suche + "\n" + "index->" + aktplz.indexOf(suche) ); 
    	if (aktplz.indexOf(suche) == 0)
    	{
    		//alert ("gefunden:" + aktplz);
    		//alert (t[i][2] + "&nbsp;>&nbsp;" + t[i][3] + "&nbsp;>&nbsp;" + t[i][0]);
    		dummy[z] =  t[i][2] + "&nbsp;>&nbsp;" + t[i][3] + "&nbsp;>&nbsp;" + t[i][0] + 
    		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + 
    		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#" + 
    		t[i][1] + "&nbsp;>&nbsp;" + t[i][4] + "&nbsp;>&nbsp;" + t[i][5] + "&nbsp;>&nbsp;" + t[i][6] + "&nbsp;>&nbsp;" + t[i][7];
    		z = z + 1;
    	}
	}
	//alert ("z->" + z);
	if (z > 0)
		starteWheel(dummy, "plz");
	else
	{
		//navigator.notification.vibrate(200);
	}
}


function umkreis(sql) {

	//alert (sql);
    publicSQL.tablePath = webpfad + "db/";	
	publicSQL.query(sql, "umkreisDB");
	//alert (publicSQL.errorNumber);

}

function umkreisDB(t) {

  	var dummy = {};
  	
  	//alert (t.length-1);
	for (var i=1; i<t.length; i++) {
    	//alert (t[i]);
    	dummy[i] =  t[i];
	}
	starteWheel(dummy, "umkreis");
}

function deutschlandOrt(sql) {

    publicSQL.tablePath = webpfad + "db/";	
	publicSQL.query(sql, "ortDB");
	//alert (publicSQL.errorNumber);

}


function ortDB(t) {

  	var dummy = {};
  	
  	//alert (t.length-1);
	var suche = document.Formular_DE.ort.value;
	suche = suche.toLowerCase();

	var aktort = "";
	var z = 1;
	for (var i=1; i<t.length; i++) {
    	aktort = String(t[i][3]);
    	aktort = aktort.toLowerCase();
    	if (aktort.indexOf(suche) == 0)
    	{
    		//alert (t[i][2] + "&nbsp;>&nbsp;" + t[i][3] + "&nbsp;>&nbsp;" + t[i][0]);
    		dummy[z] =  t[i][3] + "&nbsp;>&nbsp;" + t[i][2] + "&nbsp;>&nbsp;" + t[i][0] + 
    		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + 
    		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#" + 
    		t[i][1] + "&nbsp;>&nbsp;" + t[i][4] + "&nbsp;>&nbsp;" + t[i][5] + "&nbsp;>&nbsp;" + t[i][6] + "&nbsp;>&nbsp;" + t[i][7];
    		z = z + 1;
    	}
	}

	if (z > 0)
		starteWheel(dummy, "ort");
	else
	{
		//navigator.notification.vibrate(200);
	}
}


function zeigeLaender() {

    publicSQL.tablePath = webpfad + "db/";

	var sql = "select DISTINCT rest.Land FROM rest";

	publicSQL.query(sql, "LaenderlisteDB");
	//alert (publicSQL.errorNumber);

}


function LaenderlisteDB(t) {

	var dummy = {};

  	//alert (t.length-1);

	dummy[0] = 'Deutschland';
	//alert (dummy[0]);
	
	for (var i = 1; i <= t.length-1; i++) {
    	dummy[i] =  t[i][0];
    	//alert (dummy[i]);
	} 	
	starteWheel(dummy, "laender");

}

function zeigemarkt() {

	if (mymarkt != "")
	{
		jQT.goTo("#aufnehmen", 'slideleft');
		return;
	}

	if (marktliste == 1)
	{
		jQT.goTo("#markt", 'slideleft');
		return;
	}

    publicSQL.tablePath = webpfad + "db/";
	
	var sql = "select katalog, code from region";

	publicSQL.query(sql, "startezeigemarkt");
	//alert (publicSQL.errorNumber);
	marktliste = 1;
	jQT.goTo("#markt", 'slideleft');
}

function startezeigemarkt(t) {

	var dummy = '<table border=0 width="320px">';
	var dummy2;
	var dummy3;
	var asprache;
	var pos;
		
  	//Records
  	//alert (t.length-1);
  	//Felder
  	//alert (t[0].length);
	
	for (var i=1; i<t.length; i++) {
		dummy3 = String(t[i]);

	  	pos = dummy3.indexOf(",");

		asprache = dummy3.substr(0, pos);   	
		acode = "'" + dummy3.substr(pos+1, dummy3.length) +"'";   	

		dummy2 = '<tr><td><a href="#" class="jButton" onclick="setzemarkt(' + acode + ')" style="font-weight: normal; text-align: left; height: 22px">&nbsp;' + asprache + '</a></td></tr>';

		dummy = dummy + dummy2;
		
		dummy = dummy + '<tr><th height="20px"></th></tr>';	
   	}

	dummy = dummy + '</table>';
	
	$('#marktliste').append(dummy);
    
}

function zeigesprachen() {

	if (sprachliste == 1)
		return;
		
    publicSQL.tablePath = webpfad + "db/";
	
	var sql = "select sprache, code from interface";
	publicSQL.query(sql, "startezeigesprachen");
	//alert (publicSQL.errorNumber);
}


function startezeigesprachen(t) {

	var dummy = '<table border=0 width="320px">';
	var dummy2;
	var dummy3;
	var asprache;
	var pos;
		
  	//Records
  	//alert (t.length-1);
  	//Felder
  	//alert (t[0].length);
	
	for (var i=1; i<t.length; i++) {
		dummy3 = String(t[i]);

	  	pos = dummy3.indexOf(",");

		asprache = dummy3.substr(0, pos);   	
		acode = "'" + dummy3.substr(pos+1, dummy3.length) +"'";   	

		dummy2 = '<tr><td><a href="#de" class="jButton" onclick="buildinterface(' + acode + ')" style="font-weight: normal; text-align: left; height: 22px">&nbsp;' + asprache + '</a></td></tr>';

		dummy = dummy + dummy2;
		
		dummy = dummy + '<tr><th height="20px"></th></tr>';	
   	}

	dummy = dummy + '</table>';
	
	$('#sprachliste').append(dummy);
	
	//Neuer Markt?
	//mymarkt = "";
	
	sprachliste = 1;
    
}

function myBack() {

	jQT.goTo("#de", 'slideleft');
}

/*
function Fehlerbehandlung(meldung, url, zeile) {

   //var txt = "Es ist ein Fehler aufgetreten! Das macht aber nichts...\n\n";
   var txt = "";
   txt += "Meldung: " + meldung + "\n";
   txt += "URL: " + url + "\n";
   txt += "Zeile: " + zeile + "\n";
   txt += "Element: z_" + ele;
   //alert (txt)
   //document.getElementById('meldung').innerHTML = txt;
   return true;
}
*/

/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
var Base64 = {

// private property
_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

// public method for encoding
encode : function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

    }

    return output;
},

// public method for decoding
decode : function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

        enc1 = this._keyStr.indexOf(input.charAt(i++));
        enc2 = this._keyStr.indexOf(input.charAt(i++));
        enc3 = this._keyStr.indexOf(input.charAt(i++));
        enc4 = this._keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }

    }

    output = Base64._utf8_decode(output);

    return output;

},

// private method for UTF-8 encoding
_utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

        var c = string.charCodeAt(n);

        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }

    return utftext;
},

// private method for UTF-8 decoding
_utf8_decode : function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;

    while ( i < utftext.length ) {

        c = utftext.charCodeAt(i);

        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        }
        else if((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else {
            c2 = utftext.charCodeAt(i+1);
            c3 = utftext.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }

    }

    return string;
}

}

var xhr;
var azeit;
var adatum;

//var pictureSource;   // picture source
//var destinationType; // sets the format of returned value 

function capturePhoto() {

	document.getElementById('trefferliste').innerHTML = "";
	document.getElementById('bigImage').src = "";
	navigator.camera.getPicture(Bildbearbeitung, keineAufnahme, { quality: 5, 
	destinationType: Camera.DestinationType.DATA_URL });
}


function zeiten() {

	a = new Date();
	b = a.getHours(); c = a.getMinutes(); d = a.getSeconds();
	if(b < 10){b = '0'+b;} 
	if(c < 10){c = '0'+c;} 
	if(d < 10){d = '0'+d;}
	azeit = b+':'+c+':'+d;
	
	// Neues Datumsobjekt erstellen
	var new_date = new Date();
	// 10 Tage hinzuaddieren
	new_date.setDate(new_date.getDate() + 10);
	// dd.mm.yyyy isolieren
	var p_day =  new_date.getDate();
	var p_month = new_date.getMonth() + 1;
	var p_year = new_date.getFullYear();
	// Nullen anhängen
	if(p_day < 10) p_day = '0' + p_day;
	if(p_month < 10) p_month= '0' + p_month;
	if(p_year < 1000) p_year += 1900;
	// Datumsstring formatieren
	adatum = p_day + '.' + p_month + '.' + p_year;
}

function Bildbearbeitung(imageData) {

	// Uncomment to view the base64 encoded image data
	// console.log(imageData);

	//alert ($(window).width());
	//alert ($(window).height());

	// Get image handle
	//var smallImage = document.getElementById('smallImage');

	//smallImage.src = "data:image/jpeg;base64," + imageData;

	//$("#smallImage").animate({left: "600px", width: $(window).height() + "px", height: $(window).height() + "px"}, 0);	

	//alert ("width->" + document.getElementById('smallImage').style.width + "\n" + "height->" + document.getElementById('smallImage').style.height);

	document.getElementById('warten').style.visibility = "visible";
	
	//Bild hochladen
	upload(imageData);

	//uploadPicture(imageData);
}


function upload(imageData) {

	var url = webpfad + "/php/file_upload.php";
	//alert (url);
	var params = {image: imageData, datei: "jako.jpg"};
			
	// send the data
	$.post(url, params, function(data) {
		kooabaergebnis();
	});
}

function kooabaergebnis() {

	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
			
		xhr.open("GET", webpfad + "/php/kooaba_jako.php", true);
		xhr.onreadystatechange = datenAusgeben;
		xhr.send(null);
	}
	else
	{
		alert ("Es konnte keine Verbindung zum Server aufgenommen werden!");
	}
}

function datenAusgeben() {

	if (xhr.readyState == 4){

		document.getElementById('warten').style.visibility = "hidden";

		var xml = xhr.responseText;
		//alert (xml);

		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(xml,"text/xml");

		//alert (xmlDoc);

		var haupttitel = $(xmlDoc).find("title").first().text();
		if (haupttitel == "")
		{
			//alert ("nix");
			//dummy = "<ul class='rounded'><li id='ul_nix' style='font-size:16px;'><a href='#'><div id='db_nichtsgefunden'>Es wurde leider nichts gefunden!<br>Versuchen Sie es bitte erneut...</div></a></li></ul>";			
			dummy = "<p><table border=0 width='100%'><tr><td>&nbsp;&nbsp;</td><td><div id='db_nichtsgefunden'>Es wurde leider nichts gefunden!<br>Versuchen Sie es bitte erneut...</div></td></tr></table>";			
            document.getElementById('trefferliste').innerHTML = dummy;
            jQT.goTo("#treffer", 'slideleft');

		}
		else
		{

			var pos;
			var save = haupttitel;
			
			haupttitel = haupttitel.replace("jako_", "JAKO Katalog ");
			pos = haupttitel.indexOf("_");
			var seite = haupttitel.substr(pos+1, haupttitel.length);
			var nr = eval(seite) + 1;
			var cnr = nr.toString(); 
			seite = " Seite " + nr;
			haupttitel = haupttitel.substr(0, pos) + seite;  
	
			var icon = save;
			icon = icon.replace("jako_", "jako#");
			pos = icon.indexOf("_");
			icon = icon.substr(0, pos) + "_Seite_";
			
			switch (cnr.length)
			{
				case 1:
					cnr = "00" + cnr;
					break;
				case 2:
					cnr = "0" + cnr;
					break;
				case 3:
					cnr = cnr;
					break;
				default:
					cnr = "00" + cnr;
					break;
			}
			
			icon = icon + cnr;
			var iconklein = webpfad + "/icons/" + icon.replace("#", "_") + ".png";
			var icongross = webpfad + "/bilder/" + icon.replace("#", "_") + ".png";
            //alert (icongross);
            bigImage.src = icongross;

			//var dummy = "<div><ul class='metal'><li style='font-weight: bold; font-size: 20px; color: black;background-color: blue'>" + haupttitel + "</li></ul><ul class='metal'>";
			var dummy = "<div><table width='100%' bgcolor='#008ac9'><tr><td>&nbsp;</td><td style='font: Arial; font-size: 20px; font-weight: bold'>" +
			haupttitel + "</td></tr></table>";

			var bildnr = localStorage.getItem("BildNr");
			bildnr = eval(bildnr) + 1;
			
			zeiten();
			
			localStorage.setItem("Datum" + bildnr, adatum);
			localStorage.setItem("Zeit" + bildnr, azeit);
			localStorage.setItem("Haupttitel" + bildnr, haupttitel);
			localStorage.setItem("Bild" + bildnr, icongross);
			localStorage.setItem("Icon" + bildnr, iconklein);

			//Bild
			//Icon
			//Haupttitel
			//Titel
			//url
	
			var z = 0;
			$(xmlDoc).find("item-resource").each(function()
			{
				var titel = $(this).find("title").text();
				var url = $(this).find("url").text();
				var locale = $(this).find("locale").text();
				
				if (locale != "")
				{
					locale = locale.toLowerCase();
					locale = locale.replace("de-", "");
				}
				else
				{
					locale = "de";
				}

				if (locale == mymarkt)
				{					
					localStorage.setItem("Titel" + bildnr + z, titel);
					localStorage.setItem("url" + bildnr + z, url);
	
					dummy = dummy + 
					"<span class='jButtonList' style='color: black; font-size: 14px' onclick=jako_http('" + url + "')><table border=0><tr><th><img src='" + 'icons/jako_app_wellen_28.png' + "' border=0 width='30px'></td><td>&nbsp;</td><td>" + titel + "</td></tr></table></span>";

					z = z + 1;
					//alert (z + "->" + mymarkt + "-----" + locale + "!");
				}
			});
			

			dummy = dummy + "</span></div>";
            //alert (dummy);
            document.getElementById('trefferliste').innerHTML = dummy;

			localStorage.setItem("BildNr", bildnr);

            jQT.goTo("#treffer", 'slideleft');
		}
 	}
}


function allebilderzeigen() {

	var anz = localStorage.getItem("BildNr");
	//alert (anz);

	if (anz == 0)
		return;
		
	var Listbild = "";

	var Datum;
	var Zeit;
	var Haupttitel;
	var Bild;
	var Icon;

	var titel;
	var url;
	
	//var dummy = "<ul class='metal'>";
dummy = "";

	for (var i = 1; i <= anz; i++)
	{

		Haupttitel = localStorage.getItem("Haupttitel" + i);

		if (Haupttitel != "")
		{
			//dummy = dummy + "<li class='arrow'>";
dummy = dummy + "<span class='jButtonList'>";
	
			Datum = localStorage.getItem("Datum" + i);
			Zeit = localStorage.getItem("Zeit" + i);
			Haupttitel = localStorage.getItem("Haupttitel" + i);
			Bild = localStorage.getItem("Bild" + i);
			Icon = localStorage.getItem("Icon" + i);
	
			/*
			dummy = dummy + "<table border='0'><tr><th rowspan='3'><img src='" + Icon + 
			"' class='wRahmen'>&nbsp;&nbsp;</th><td style='font-size: 14px;'><span onclick='artikelauswahl(" + i + ")'>" + Datum + ", " + Zeit +
			"</span></td></tr><tr><td style='font-size: 16px;color: black'>" + Haupttitel + "</td></tr></table>"
			*/
			

			dummy = dummy + "<table border='0' width='300px'><tr><th rowspan='2'><img src='" + Icon + 
			"' class='wRahmen'>&nbsp;&nbsp;</th><th align='left' style='font-size: 14px;'><span onclick='artikelauswahl(" + i + ")'>" + Datum + ", " + Zeit +
			"</span></th><th rowspan='2'><img src='css/img/chevron.png' align='right'></th></tr><tr><th align='left' style='font-size: 16px;color: black'>" + Haupttitel + "</th></tr></table>"
	
			//dummy = dummy + "</li>"
dummy = dummy + "</span>"
		}

	}
	//alert (dummy);
	document.getElementById("hauptliste").innerHTML = dummy;
}

function artikelauswahl(i) {

	var Datum = localStorage.getItem("Datum" + i);
	var Zeit = localStorage.getItem("Zeit" + i);
	var Haupttitel = localStorage.getItem("Haupttitel" + i);
	var Bild = localStorage.getItem("Bild" + i);
	var Icon = localStorage.getItem("Icon" + i);
		
	//alert (Bild);

	document.getElementById('abild').innerText = i;	
	document.getElementById('bigImage').src = Bild;	

	//alert (Haupttitel);

	//var dummy = "<div><table width='100%' bgcolor='#008ac9'><tr><td>&nbsp;</td><td style='font: Arial; font-size: 20px; font-weight: bold'>" +
	//Haupttitel + "</td></tr></table><ul class='metal'>";
var dummy = "<div><table width='100%' bgcolor='#008ac9'><tr><td>&nbsp;</td><td style='font: Arial; font-size: 20px; font-weight: bold'>" +
Haupttitel + "</td></tr></table>";


	var z = 0;
	//alert (String(i) + String(z));

	while (localStorage.getItem("url" + String(i) + String(z)) != null) {
		var url = localStorage.getItem("url" + String(i) + String(z));
		var titel = localStorage.getItem("Titel" + String(i) + String(z));
  		//alert (localStorage.getItem("Titel" + String(i) + String(z)) + "\n" + localStorage.getItem("url" + String(i) + String(z)));
		/*
		dummy = dummy + 
		"<li class='arrow' style='color: black; font-size: 14px' onclick=jako_http('" + url + "')><table border=0><tr><th><img src='" + 
		'icons/jako_app_wellen_28.png' + "' border=0 width='30px'></td><td>&nbsp;</td><td>" + titel + "</td></tr></table></li>";
		*/
		dummy = dummy + 
		"<span class='jButtonList' style='color: black; font-size: 14px' onclick=jako_http('" + url + "')><table border=0><tr><th><img src='" + 
		'icons/jako_app_wellen_28.png' + "' border=0></td><td>&nbsp;</td><td>" + titel + "</td></tr></table></span>";

  		z++;
	}	

	//dummy = dummy + "</ul></div>";
dummy = dummy + "</div>";
	//alert (dummy);
	document.getElementById('trefferliste').innerHTML = dummy;

	//alert (i);
	jQT.goTo("#treffer", 'slideleft');
}

function keineAufnahme(message) {

	if (message.indexOf("cancelled") == 0)
	{
		alert('No Camera function\nGrund:\n' + message);
	}
  	jQT.goTo("#de", 'slideleft');
}

function uploadPicture(imageURI) {
    	        
        // Verify server has been entered
        server = "http://www.reinke.de/kooaba/file_upload2.php";
        if (server) {
        	
            // Specify transfer options
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType = "image/jpeg";
            options.chunkedMode = false;

            // Transfer picture to server
            var ft = new FileTransfer();
            ft.upload(imageURI, server, function(r) {
                alert ("Upload successful: " + r.bytesSent + " bytes uploaded.");
            }, function(error) {
                alert ("Upload failed: Code = " + error.code) ;            	
            }, options);
        }
}


function loescheBild(Nr) {

	var dummy = "Bild" + Nr;
	var Listbild = document.getElementById(dummy);
	Listbild.src = "leer.png";
}

function allebilderloeschen() {

	var anz = localStorage.getItem("BildNr");
	//alert (anz);
	for (var i = 1; i <= anz; i++)
	{
		//alert (i);
		loescheBildNr(i);	
	}

	localStorage.BildNr = "0";
	
	//document.getElementById("db_bildergeloescht").innerText = "Alle Bilder wurden gelöscht.";
}


//alert ($(window).width());
//alert ($(window).height());

    var naviPLZ;
    var naviOrt;
                    
	var webpfad = "http://www.reinke.de/jako/";
	//var webpfad = "http://www.jako.de/app/";
	var acode;
	
	var mymarkt = "";
	
	var paramter;

	var adevice;
    
    var jxhr;
    
	var marker_list = [];

	var liste = "";
	var gefunden = 0;
	var haendlers = 0;
	var zoom;

	var kx = 0;
	var ky = 0;
	
	var xu = 0;
	var xo = 0;
	var yu = 0;
	var yo = 0;

	var sprache;
	var plzeingabe;
	var ortseingabe;
	
	var sprachliste = 0;
	var marktliste = 0;

    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 

	var standortseite = "";

	var welcheKarte = "";
	
	var wheel_an = 0;
	var aWheel = "";
			
	var online = navigator.onLine;

	var mywhere = "";
	
	paramter = dynpara();
	//alert (paramter);
		
	var device = navigator.userAgent.toLowerCase();
  	if (device.indexOf('iphone') > 1)
  	{
        adevice = "iphone";
		document.write('<script type="text/javascript" charset="utf-8" src="phonegap-1.3.0.js"></script>');
  	}
  	else
  	{
	  	if (device.indexOf('ipad') > 1)
	  	{
            adevice = "ipad";
			document.write('<script type="text/javascript" charset="utf-8" src="phonegap-1.3.0.js"></script>');
	  	}
	  	else
	  	{
            adevice = "android";
			document.write('<script type="text/javascript" charset="utf-8" src="phonegap-1.0.0.js"></script>');
		}
	}


	document.write('<script src="js/publicsql.js" type="text/javascript" charset="utf-8"></script>');

	//früh laden, da setzen einer globalen Variable gefordert ist (webpfad)
    document.write('<script type="text/javascript" src="' + webpfad + '"/db/interface.ptf?para=' + paramter + '"></script>');
    document.write('<script type="text/javascript" src="' + webpfad + '"/db/haendler.ptf?para=' + paramter + '"></script>');

	document.write('<script src="js/jquery-1.4.2.js" type="text/javascript" charset="utf-8"></script>');
	document.write('<script src="js/jQueryRotate.2.2.js" type="text/javascript" charset="utf-8"></script>');

	document.write('<link type="text/css" rel="stylesheet" href="css/jako.css" />');
	document.write('<link type="text/css" rel="stylesheet" href="css/kooaba.css" />');
 	
	document.write('<style type="text/css" media="screen">@import "css/jqtouch.css";</style>');
	document.write('<style type="text/css" media="screen">@import "css/theme.css";</style>');
	document.write('<style type="text/css" media="screen">@import "extensions/jqt.bars/jqt.bars.css";</style>');
	document.write('<style type="text/css" media="screen">@import "extensions/jqt.bars/themes/jqt/theme.css";</style>');
	document.write('<style type="text/css" media="screen">@import "extensions/jqt.listIndex/jqt.listIndex.css";</style>');

	document.write('<!--script src="js/php.js"></script-->');
	document.write('<script src="js/kooaba.js"></script>');

	document.write('<script src="js/jqtouch.js" type="application/x-javascript" charset="utf-8"></script>');

	document.write('<script src="extensions/jqt.autotitles.js" type="application/x-javascript" charset="utf-8"></script>');
	document.write('<script src="extensions/jqt.bars/jqt.bars.js" type="application/x-javascript" charset="utf-8"></script>');
	document.write('<script src="extensions/jqt.listIndex/jqt.listIndex.js" type="application/x-javascript" charset="utf-8"></script>');

	//spinning wheel
	document.write('<script src="js/spinningwheel.js" type="application/x-javascript"></script>');
	document.write('<style type="text/css" media="screen">@import "css/spinningwheel.css";</style>');

	document.write('<script src="http://maps.google.com/maps/api/js?sensor=true&amp;language=de" type="text/javascript"></script>');		

	document.write('<script src="js/gmap3.js" type="text/javascript" charset="utf-8"></script>');

    //alert (adevice);
    



function onload() {

	//window.onerror = Fehlerbehandlung;


	document.addEventListener("deviceready", onDeviceReady, false);

	navisprache();

	buildinterface(sprache);
	
	if (localStorage.getItem("BildNr") == null)
	{
        resetSpeicher();
	}
}

function onDeviceReady() {

	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;
    
    navigator.geolocation.getCurrentPosition(xyAusgabe, xyError);

	//navigator.network.isReachable("http://www.google.com", reachableCallback, {});

	//JAKO events
	alleevents();
	
    navigator.notification.vibrate(100);

	if ( adevice == "android" )
	{
		document.getElementById("android_br").innerHTML = "<br>";
	}
	document.getElementById("starten").style.visibility = "visible";
}

function dynpara() {
	a = new Date();
	b = a.getHours(); c = a.getMinutes(); d = a.getSeconds();
	if(b < 10){b = '0'+b;} 
	if(c < 10){c = '0'+c;} 
	if(d < 10){d = '0'+d;}
	var para = b+'_'+c+'_'+d;
	return para;
}

function resetSpeicher() {
    localStorage.BildNr = "0";
    //alert (localStorage.getItem("BildNr"));
}

function alleevents() {
	pageevents();
	klickevents();
}

function pageevents() {

	//JAKO PAGE EVENTS
	//Start____________________________________________________________________________________________________________________________________________________	
	// Page animation callback events

	$('#aufnehmen').
	bind('pageAnimationStart', function(e, info){
	    if (info.direction == 'in')
	    {
	    	capturePhoto();
	    }
	}).
		bind('pageAnimationEnd', function(e, info){
	});


	$('#sprachen').
	bind('pageAnimationStart', function(e, info){
	    if (info.direction == 'in')
	    {
	    	zeigesprachen("sprache");
	    }
	}).
		bind('pageAnimationEnd', function(e, info){
	});

	$('#de').
	bind('pageAnimationStart', function(e, info){
	    if (info.direction == 'in')
	    {
	    	//falls klickevents vergessen wurden
	    	klickevents();
	    }
	}).
		bind('pageAnimationEnd', function(e, info){
	});


	$('#haendler').
	  bind('pageAnimationStart', function(e, info){
	    if (info.direction == 'in')
	    {
	    	//zeigeLaender();
	    }
	 }).
	  bind('pageAnimationEnd', function(e, info){
	    if (info.direction == 'in')
	    {
	    	var dummy = document.getElementById("db_waehleland").innerHTML;
			if (dummy.indexOf("*") != -1)
			{
				//zeigeLaender();
                umkreis("select * FROM umkreis");
			}
	    }
	    if (info.direction == 'out')
	    {
	    	if (wheel_an == 1)
	    	{
	    		cancel();
	    	}
	    }
	  });
	
	//JAKO PAGE EVENTS
	//Start____________________________________________________________________________________________________________________________________________________	

}

function klickevents() {


	$('#loescheBilder').click(function(){
		allebilderloeschen();
	});

	$('#loescheBild').click(function(){
		loescheBildNr(document.getElementById('abild').innerText);
	});

	$('#starten_').click(function(){
	
        buildinterface(sprache);
                        
		var dummy = document.getElementById("db_fotografieren").innerHTML;
		if (dummy.indexOf("*") > -1)
		{
			jQT.goTo("#nichtonline", 'slideleft');
		}
		else
		{
			//alert ("preload");
			/*
			getScript('http://www.reinke.de/jako/db/deutschlandplz.ptf', function(){
	  			alert("Pet Name: " + PETNAME);
			});
			*/
		}

	});

	$('#fotomachen').click(function(){
		capturePhoto();
	});

    $('#foto_de').click(function(){
		jQT.goTo("#wichtig", 'slideleft');
	});


	$('#deutsch').click(function(){
		sprache = "de";
	});

	$('#englisch').click(function(){
		sprache = "en";
	});

	$('#button_plz').click(function(){
		standortseite = "#standorte_plz";
		welcheKarte = "#m_plz";

		switch (document.getElementById("db_waehleland").innerHTML)
		{
			case "Deutschland":						
				if (document.Formular_DE.plz.value == "")
					document.getElementById("db_plzeingabe").innerText = plzeingabe;
				else
				{
					if (wheel_an == 0)
					{					
						document.getElementById("db_plzeingabe").innerText = "";
						haendler_plz_suche("select * FROM deutschlandplz");
					}
					else
					{
						//navigator.notification.vibrate(100);
					}
				}
				break;
			default:
				document.getElementById("db_plzeingabe").innerText = "";
				haendler_plz_suche("select * FROM restplz where restplz.Land = '" + document.getElementById("db_waehleland").innerHTML + "'");
				break;
		}
	});


	$('#button_ort').click(function(){
		standortseite = "#standorte_ort";
		welcheKarte = "#m_ort";
		
		if (document.Formular_DE.ort.value == "")
			document.getElementById("db_keinort").innerText = ortseingabe;
		else
		{
			if (wheel_an == 0)
			{
				document.getElementById("db_keinort").innerText = ""
				deutschlandOrt("select * FROM deutschlandort");
			}
			else
			{
				//navigator.notification.vibrate(100);
			}
		}
	});

	$('#button_umkreis').click(function(){

		if (wheel_an == 0)
		{
			umkreis("select * FROM umkreis");
		}
		else
		{
			//navigator.notification.vibrate(100);
		}
	});


	$('#karte_de').click(function(){

			zeigestandorte(document.getElementById("db_waehleland").innerText, 
			document.getElementById("db_plz_de").innerText,
			document.getElementById("db_ort_de").innerText,
			document.getElementById("db_strasse_de").innerText);		
	});


	$('#finde_haendler').click(function(){
		//zeigeLaender();
	});
	

	$('#button_land').click(function(){
		if (wheel_an == 0)
			zeigeLaender();
		else
		{
			//navigator.notification.vibrate(100);
		}
	});
	
	
}

function loescheBildNr(i) {

	localStorage.setItem("Datum" + i, "");
	localStorage.setItem("Zeit" + i, "");
	localStorage.setItem("Haupttitel" + i, "");
	localStorage.setItem("Bild" + i, "");
	localStorage.setItem("Icon" + i, "");
	
	var z = 0;	
	while (localStorage.getItem("url" + String(i) + String(z)) != null) {
		localStorage.setItem("url" + String(i) + String(z), "");
		localStorage.setItem("Titel" + String(i) + String(z), "");
	  	z++;
	}			
}

function starten2() {

    buildinterface(sprache);

    var dummy = document.getElementById("db_fotografieren").innerHTML;
    //alert (dummy);
    if (dummy.indexOf("*") > -1)
    {
        jQT.goTo("#nichtonline", 'slideleft');
    }
    else
    {
        //alert ("preload");
        /*
        getScript('http://www.reinke.de/jako/db/deutschlandplz.ptf', function(){
        alert("Pet Name: " + PETNAME);
        });
        */
        jQT.goTo("#de", 'slideleft');
    }
}

function ermittleUmkreisStandorte(entfernung) {
	
	var km10;
	var km50;
	var km100;
	var km150;
	var dummy;
	var faktor = 0.7;

	//alert (entfernung);		
	switch (entfernung)
	{
		case "10":
			// 10km
			km10 = eval((100/111) * 0.1 * faktor);
			dummy = km10;
			zoom = 11;
			break;

		case "50":
			// 50km
			km10 = eval((100/111) * 0.1 * faktor * 5);
			dummy = km10;
			zoom = 10;
			break;

		case "100":
			// 100km
			km100 = eval((100/111) * 0.1 * faktor * 10);
			dummy = km100;
			zoom = 9;
			break;
			
		case "150":
			// 150km
			km100 = eval((100/111) * 0.1 * faktor * 15);
			dummy = km100;
			zoom = 8;
			break;
			
		case "200":
			// 200km
			km200 = eval((100/111) * 0.1 * faktor * 20);
			dummy = km200;
			zoom = 7;
			break;
			
		case "300":
			// 300km
			km300 = eval((100/111) * 0.1 * faktor * 30);
			dummy = km300;
			zoom = 7;
			break;

		default:
			break;
	}

	xu = eval(kx - eval(dummy * faktor));
	xo = eval(kx + eval(dummy * faktor));

	yu = eval(ky - dummy);
	yo = eval(ky + dummy);
	
	//alert (kx + "\n" + ky + "\n\n" + eval(kx - dummy) + "\n" + eval(ky - dummy));
	//alert ("ul->" + xu + "#" + yu + "\n" +	"ol->" + xu + "#" + yo + "\n" + "or->" + xo + "#" + yo + "\n" +	"ur->" + xo + "#" + yu + "\n");
	
	//4 Nachkommastellen
	xu = (Math.round(xu * 10000) / 10000);
	xo = (Math.round(xo * 10000) / 10000);
	yu = (Math.round(yu * 10000) / 10000);
	yo = (Math.round(yo * 10000) / 10000);
	
	var sql = "select * from haendler where haendler.Breite > " + xu + " and haendler.Breite < " + xo + " and haendler.Laenge > " + yu + " and haendler.Laenge < " + yo;
	//var sql = "SELECT * FROM haendler WHERE (Laenge > " + xu + " AND Laenge < " + xo + ")";
	var sql = "SELECT Name,Adresse,PLZ,Ort,Email,Homepage,Telefonnr,Land,Country,Breite,Laenge FROM haendler WHERE Laenge > " + xu + " AND Breite > " + yu + "";
	//alert (sql);

    publicSQL.tablePath = webpfad + "db/";
	publicSQL.query(sql, "haendlerliste");
	
}


function haendlerliste(t) {

  	//Records
  	//alert (t.length-1);
  	//Felder
  	//alert (t[0].length);
	
	var dummy;
	haendlers = 0;

    var myName;
    var myPLZ;
    var myAdresse;
    var myOrt;
    var myEmail;
    var myHomepage;
    var myHomepage2;
    var myBreite;
    var myLaenge;
    var naviAdresse;

	for (var i=1; i<t.length; i++) {
		dummy = "";
		yOK = 0;
		xOK = 0;
		for (var ii=0; ii<t[0].length; ii++) {

			switch (t[0][ii])
			{
				case "Name":
					myName = t[i][ii];
					break;
					
				case "Adresse":
					myAdresse = t[i][ii];
					break;
					
				case "PLZ":
					myPLZ = t[i][ii];
					break;
					
				case "Ort":
					myOrt = t[i][ii];
					break;
					
				case "Email":
					myEmail = t[i][ii];
					break;
					
				case "Homepage":
					myHomepage = t[i][ii];
                    if (myHomepage.indexOf("http://") == -1)
                    {
                        if (myHomepage != "")
                        {
                            myHomepage2 = "http://" + myHomepage;
                            //alert (myHomepage2);
                        }
                        else
                        {
                            myHomepage2 = "";
                        }
					}
                    else
                    {
                        myHomepage2 = myHomepage;
					}
					break;
					
				case "Breite":
					myBreite = t[i][ii];
					//yu
					if (eval(t[i][ii]) < yo)
					{
						dummy = dummy + t[i][ii] + " ist kleiner als " + yo + "\n";
						yOK = 1;
					}
					break;

				case "Laenge":
					myLaenge = t[i][ii];
					//xu
					if (eval(t[i][ii]) < xo)
					{
						dummy = dummy + t[i][ii] + " ist kleiner als " + xo;
						xOK = 1;
					}
					break;

				default:
					break;
			}
    	}
    	if (( xOK ==1) && ( yOK == 1))
    	{
			haendlers = eval(haendlers + 1);
			//alert (myOrt);
			
            if (myEmail != "")
            {
                if (myHomepage2 != "")
                {
                    //alles da
                    naviAdresse = myAdresse + ", " + myPLZ + " " + myOrt;
                    naviAdresse = naviAdresse.replace(/ /g, "_");
                    //naviAdresse = myOrt;
                    dummy = "<span style='color: black'><strong>" + myName + "</strong><br>" + myPLZ + 
                    " " + myOrt + "<br>" + myAdresse + "<br><br>" +
                    "<a href='mailto:" + myEmail + "'>" + myEmail + "</a>" +
                    "<br>" + 
                    "<input type='button' value=' Navigation ' onclick=navi2('" + naviAdresse + "')>" +
                    "<a href='" + myHomepage2 + "' target='_blank'>" + myHomepage2 + "</a><br><br>" +
                    "</span>";
                }
                else
                {
                    //Email da
                    naviAdresse = myAdresse + ", " + myPLZ + " " + myOrt;
                    naviAdresse = naviAdresse.replace(/ /g, "_");
                    //naviAdresse = myOrt;
                    dummy = "<span style='color: black'><strong>" + myName + "</strong><br>" + myPLZ + 
                    " " + myOrt + "<br>" + myAdresse + "<br><br>" +
                    "<a href='mailto:" + myEmail + "'>" + myEmail + "</a><br><br>" +
                    "<input type='button' value=' Navigation ' onclick=navi2('" + naviAdresse + "')>" +
                    "</span>";
                }
            }
            else    
            {
                if (myHomepage2 != "")
                {
                    //Homepage da
                    naviAdresse = myAdresse + ", " + myPLZ + " " + myOrt;
                    naviAdresse = naviAdresse.replace(/ /g, "_");
                    //naviAdresse = myOrt;
                    dummy = "<span style='color: black'><strong>" + myName + "</strong><br>" + myPLZ + 
                    " " + myOrt + "<br>" + myAdresse + "<br><br>" +
                    "<br>" + 
                    "<a href='" + myHomepage2 + "' target='_blank'>" + myHomepage2 + "</a><br><br>" +
                    "<input type='button' value=' Navigation ' onclick=navi2('" + naviAdresse + "')>" +
                    "</span>";
                }
                else
                {
                    //nichts da
                    naviAdresse = myAdresse + ", " + myPLZ + " " + myOrt;
                    naviAdresse = naviAdresse.replace(/ /g, "_");
                    //naviAdresse = myOrt;
                    dummy = "<span style='color: black'><strong>" + myName + "</strong><br>" + myPLZ + 
                    " " + myOrt + "<br>" + myAdresse + "<br><br>" +
                    "<input type='button' value=' Navigation ' onclick=navi2('" + naviAdresse + "')>" +
                    "</span>";
                }
            }
            /*    
			dummy = "<span style='color: black'><strong>" + myName + "</strong><br>" + myPLZ + 
            " " + myOrt + "<br>" + myAdresse + "<br><br>" +
            "<a href='mailto:" + myEmail + "'>" + myEmail + "</a>" +
            "<br>" + 
            myHomepage + 
            "</span>";
            */
            //alert (dummy);
			marker_list.push({ latLng:[myLaenge, myBreite], data: dummy, options:{icon: "marker/marker_green.png"}});
		}
		else
		{
			//alert ("Ort->" + myOrt + " ist nicht drin");
		}
    }
	//alert (haendlers);
	zeigeHaendler();
}

function navi2(myOrt) {

	myOrt = myOrt.replace(/_/g, " ");
	//alert (myOrt);

	$("#zeigeroute").gmap3({
	  getroute:{
	    options:{
	        origin: [kx, ky],
	        destination: myOrt,
	        travelMode: google.maps.DirectionsTravelMode.DRIVING
	    },
	    callback: function(results){
	      if (!results) return;
	      $(this).gmap3({
	        map:{
	          options:{
	            zoom: 13, 
	            center: [48.72934, 8.14399]
	          }
	        },
	        directionsrenderer:{
	          options:{
	            directions:results
	          }
	        }
	      });
	    }
	  }
	});
  	jQT.goTo("#route", 'slideleft');
}

function zeigeHaendler() {

	marker_list.push({ latLng:[kx, ky], data: "<span style='color: black'>Ihr Standort</span>", options:{icon: "marker/standort.png"}});
/*
marker_list.push({ latLng:[xu, yu], data: "unten links", options:{icon: "marker/ul.png"}});
marker_list.push({ latLng:[xu, yo], data: "oben links", options:{icon: "marker/ol.png"}});
marker_list.push({ latLng:[xo, yo], data: "oben rechts", options:{icon: "marker/or.png"}});
marker_list.push({ latLng:[xo, yu], data: "unten rechts", options:{icon: "marker/ur.png"}});
*/

	$("#m_plz").gmap3({
	  map:
	  {
	    options:
	    {
	  		    center:[kx,ky],
	      		zoom: zoom
	    }
	  },
	  marker:{
	    values: marker_list,
	    options:{
	      draggable: false
	    },
	    events:{
	      mouseover: function(marker, event, context){
	        var map = $(this).gmap3("get"),
	          infowindow = $(this).gmap3({get:{name:"infowindow"}});
	        if (infowindow){
	          infowindow.open(map, marker);
	          infowindow.setContent(context.data);
	        } else {
	          $(this).gmap3({
	            infowindow:{
	              anchor:marker,
	              options:{content: context.data}
	            }
	          });
	        }
	      },
	      mouseout: function(){
	        var infowindow = $(this).gmap3({get:{name:"infowindow"}});
	        if (infowindow){
	          infowindow.close();
	        }
	      }
	    }
	  }
	});

  	jQT.goTo("#standorte_plz", 'slideleft');
}

function getScript(url, callback) {

   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   script.onreadystatechange = callback;
   script.onload = callback;

   document.getElementsByTagName('head')[0].appendChild(script);
   //alert (document.head);
   
}


function teste() {

	//Define user data provided by kooaba
	var access_key = "39f8ed9043b16dcec1c0cbd7b95e5b792c6d5a42";
	var secret_key = "519015fa6c550007b88ef5c5bcd4d8c97bc2acc0";
	var group_id = "2376";
	
	
	//Query image
	var filename = "jako_test.jpg";
	
	//Load image
	var img = file_get_contents(filename); 
	
	//Connection data. Hostname, port number, and path
	//var host = "search.kooaba.com";
	var host = "https://search.kooaba.com";
	var port = "80";
	var path = "/queries.xml";
	var content_type = "multipart/form-data";

	//Define timezone for RFC 2616 standards
	date_default_timezone_set('GMT');
	
	//Get current time in RFC 2616 format
	var thisDate = date("D, d M Y H:i:s T", time());

	//Define boundary for multipart message
	var boundary = uniqid();
	
	//Construct message body first as it is needed for the authentication
	var body  = "--" + boundary + "\r\n";
	body = body + 'Content-Disposition: form-data; name="query[file]"; filename="' + filename + '"' + "\r\n";
	body = body + 'Content-Transfer-Encoding: binary' + "\r\n";
	body = body + 'Content-Type: image/jpeg' + "\r\n\r\n";
	body = body + img + "\r\n";
	//Group part begin
	body = body + "--" + boundary + "\r\n";
	body = body + 'Content-Disposition: form-data; name="query[group_ids][]"'+"\r\n\r\n";
	body = body + group_id + "\r\n";
	//Group part end
	//To query multiple groups, append additional group parts (each with a single group ID)
	body = body + "--" + boundary + "--\r\n";
	

	//Create the string to sign
	var string_to_sign = secret_key + "\n\n" +
		"POST" + "\n" +
		md5(body) + "\n" +
		content_type + "\n" +
		thisDate + "\n" +
		path;

	//Create signature
	var signature = base64_encode( sha1(string_to_sign, true) );
	var auth = "KWS" + " " + access_key + ":" + signature;
	
	
	//Define HTTP message header
	var header  = "Content-Type: " + content_type + "; boundary=" + boundary +"\r\n";
	header = header + "Host: " + host + "\r\n";
	header = header + "Date: " + thisDate + "\r\n";
	header = header + "Authorization: " + auth + "\r\n";
	header = header + "Content-Length: " + strlen(body) + "\r\n";

 	//alert ("Host->" + host); 
 	//alert ("port->" + port); 
 	//alert ("header->" + header); 
 	//alert ("body->" + body); 


	if (window.XMLHttpRequest)
	{
		xhr = new XMLHttpRequest();		
		xhr.open("POST", host, true);

		//Send the proper header information along with the request
		xhr.setRequestHeader("Content-Type", content_type + "; boundary=" + boundary);
		xhr.setRequestHeader("Host", host);
		xhr.setRequestHeader("Authorization", auth);
		xhr.setRequestHeader("Content-Length", strlen(body));
		xhr.onreadystatechange = datenAusgeben;
		xhr.send(body);
	}
	else
	{
		alert ("Es konnte kein Request-Objekt geladen werden!");
	}

}

function xyAusgabe(position) {

	var element =  'Latitude: '           + position.coords.latitude              + '\n' +
	'Longitude: '          + position.coords.longitude             + '\n' +
	'Altitude: '           + position.coords.altitude              + '\n' +
	'Accuracy: '           + position.coords.accuracy              + '\n' +
	'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '\n' +
	'Heading: '            + position.coords.heading               + '\n' +
	'Speed: '              + position.coords.speed                 + '\n' +
	'Timestamp: '          + new Date(position.timestamp)          + '\n';

    kx = position.coords.latitude;
    ky = position.coords.longitude;

}

function xyError(error) {
        //alert('code: '    + error.code    + '\n' +
        //      'message: ' + error.message + '\n');
        //zoro
		alert ("Sie haben keine Geolocalisation aktiviert." + '\n' +
				"Bitte haken Sie die Option unter 'Einstellungen/Standort & Sicherheit/Drahtlosnetzwerke' an");
}

function reachableCallback(reachability) {
  // There is no consistency on the format of reachability

  var networkState = reachability.code || reachability;
  var states = {};
  states[NetworkStatus.NOT_REACHABLE]                      = 'No network connection';
  states[NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK] = 'Carrier data connection';
  states[NetworkStatus.REACHABLE_VIA_WIFI_NETWORK]         = 'WiFi connection';
  if (networkState != 0) online = true;
  
  alert (online);
}

function zeigeUmkreisStandorte(werte) {

    var dummy = land + "," + plz + "," + ort + "," + strasse;

    switch (sprache)
    {
    	case "de":
		    standort = "Ihr Standort";
    		break;
    	default:
		    standort = "Your location";
    		break;
    }

	
	$(welcheKarte).gmap3({
	  map:
	  {
	    options:
	    {
	  		    center:[kx,ky],
	      		zoom: 7
	    }
	  },
	  marker:{
	    values:[
	      {latLng:[kx, ky], data: standort, options:{icon: "marker/standort.png"}},
	      {address:dummy, data: dummy, options:{icon: "marker/marker_green.png"}}
	    ],
	    options:{
	      draggable: false
	    },
	    events:{
	      mouseover: function(marker, event, context){
	        var map = $(this).gmap3("get"),
	          infowindow = $(this).gmap3({get:{name:"infowindow"}});
	        if (infowindow){
	          infowindow.open(map, marker);
	          infowindow.setContent(context.data);
	        } else {
	          $(this).gmap3({
	            infowindow:{
	              anchor:marker,
	              options:{content: context.data}
	            }
	          });
	        }
	      },
	      mouseout: function(){
	        var infowindow = $(this).gmap3({get:{name:"infowindow"}});
	        if (infowindow){
	          infowindow.close();
	        }
	      }
	    }
	  }
	});

	$(welcheKarte)
  		.width("320px")
  		.height("460px")
  		.gmap3({trigger:"resize"}
  	);
  
  	jQT.goTo(standortseite, 'slideleft');
}
    
    
function zeigestandorte(land, plz, ort, strasse) {

    var dummy = land + "," + plz + "," + ort + "," + strasse;

    switch (sprache)
    {
    	case "de":
		    standort = "Ihr Standort";
    		break;
    	default:
		    standort = "Your location";
    		break;
    }
	
	$(welcheKarte).gmap3({
	  map:
	  {
	    options:
	    {
	  		    center:[kx,ky],
	      		zoom: 7
	    }
	  },
	  marker:{
	    values:[
	      {latLng:[kx, ky], data: standort, options:{icon: "marker/standort.png"}},
	      {address:dummy, data: dummy, options:{icon: "marker/marker_green.png"}}
	    ],
	    options:{
	      draggable: false
	    },
	    events:{
	      mouseover: function(marker, event, context){
	        var map = $(this).gmap3("get"),
	          infowindow = $(this).gmap3({get:{name:"infowindow"}});
	        if (infowindow){
	          infowindow.open(map, marker);
	          infowindow.setContent(context.data);
	        } else {
	          $(this).gmap3({
	            infowindow:{
	              anchor:marker,
	              options:{content: context.data}
	            }
	          });
	        }
	      },
	      mouseout: function(){
	        var infowindow = $(this).gmap3({get:{name:"infowindow"}});
	        if (infowindow){
	          infowindow.close();
	        }
	      }
	    }
	  }
	});

	$(welcheKarte)
  		.width("320px")
  		.height("460px")
  		.gmap3({trigger:"resize"}
  	);
  
  	jQT.goTo(standortseite, 'slideleft');
}
    

function video1() {
	window.location.href="http://www.youtube.com/watch?v=ESxQkDHD9Qs"
}
    
function mytel(nr) {
    window.location.href = 'tel:' + nr;
}
    
function resetSuche() {
	mywhere = "";
	jQT.goTo('#suchen1', 'slideleft');
}


function ajax() {
	if (zwei == 1) {zwei = 0; return;}



$("#ajax").load(
	"http://www.reinke.de/ajax.php",
	{
		ajaxpost: "post()-Daten (POST)"
		},
		function (responseText, textStatus, XMLHttpRequest){
			alert(
			responseText + ", " +
			textStatus + ", " +
			XMLHttpRequest
		);
	}
);




/*	
	$("#ajax").load("http://www.reinke.de/ajax.php");
*/

	jQT.goTo('#ajaxcontent', 'slideleft');
	zwei = 1;
}

function starteWheel(db, thema) {

	aWheel = thema;
	
	if (wheel_an == 0)
	{	
		SpinningWheel.addSlot(db, 'left');
	
		SpinningWheel.setCancelAction(cancel);
		SpinningWheel.setDoneAction(done);
		
		wheel_an = 1;
		SpinningWheel.open();
	}
	else
	{
		//wheel schon an
	}
}

function done() {
	var results = SpinningWheel.getSelectedValues();
	//alert('values:' + results.values.join(', ') + ' - keys: ' + results.keys.join(', '));
	//alert("!" + results.values.join(', ') + "!");

	switch (aWheel)
	{
		case "umkreis":
			var wahl = String(results.values.join(', '));
			wahl = wahl.replace(/&nbsp;/g, "");
			document.getElementById("db_umkreissuche").innerHTML = wahl;
			wahl = wahl.replace(/km/g, "");
			ermittleUmkreisStandorte (wahl);
			break;
		
		case "laender":
			switch (sprache)
			{
				case "de":
					document.getElementById("db_waehleland").innerHTML = results.values.join(', ');
					document.getElementById("suchtabelle").style.visibility = "visible";
					break;
				default:
					document.getElementById("country").innerHTML = results.values.join(', ');
					document.getElementById("searchtable").style.visibility = "visible";
					break;
			}
			break;

		case "plz":
			var wahl = String(results.values.join(', '));
			wahl = wahl.replace(/&nbsp;/g, "");
			
			var pos;
			var rest;
			
			pos = wahl.indexOf("#");

			rest = wahl.substr(pos + 1, wahl.length);
			wahl = wahl.substr(0, pos);
						
			pos = wahl.indexOf(">");
			var plz = wahl.substr(0, pos);
			wahl = wahl.substr(pos + 1, wahl.length);
			
			pos = wahl.indexOf(">");
			var ort = wahl.substr(0, pos);
			wahl = wahl.substr(pos + 1, wahl.length);

			var name = wahl;
			//pos = wahl.indexOf(">");
			//var name = wahl.substr(0, pos);
			//wahl = wahl.substr(pos + 1, pos);
			
			pos = rest.indexOf(">");
			var strasse = rest.substr(0, pos);
			rest = rest.substr(pos + 1, rest.length);

			pos = rest.indexOf(">");
			var email = rest.substr(0, pos);
			rest = rest.substr(pos + 1, rest.length);

			pos = rest.indexOf(">");
			var homepage = rest.substr(0, pos);
			rest = rest.substr(pos + 1, rest.length);

			pos = rest.indexOf(">");
			var telefon = rest.substr(0, pos);
			rest = rest.substr(pos + 1, rest.length);


			switch (window.location.hash)
			{
				case "#haendler":
					document.getElementById("db_name_de").innerText = name;
					document.getElementById("db_ort_de").innerText = ort;
					document.getElementById("db_plz_de").innerText = plz;
					document.getElementById("db_strasse_de").innerText = strasse;
					document.getElementById("db_email_de").innerText = email;
					document.getElementById("db_homepage_de").innerText = homepage;
					document.getElementById("db_telefon_de").innerText = telefon;

					document.getElementById("ergebnis").style.visibility = "visible";
					break;

				default:
					break;
			}
			break;

		case "ort":
			var wahl = String(results.values.join(', '));
			wahl = wahl.replace(/&nbsp;/g, "");
			
			var pos;
			var rest;
			
			pos = wahl.indexOf("#");

			rest = wahl.substr(pos + 1, wahl.length);
			wahl = wahl.substr(0, pos);
						
			pos = wahl.indexOf(">");
			var ort = wahl.substr(0, pos);
			wahl = wahl.substr(pos + 1, wahl.length);

			pos = wahl.indexOf(">");
			var plz = wahl.substr(0, pos);
			wahl = wahl.substr(pos + 1, wahl.length);
			
			var name = wahl;
			//pos = wahl.indexOf(">");
			//var name = wahl.substr(0, pos);
			//wahl = wahl.substr(pos + 1, pos);
			
			pos = rest.indexOf(">");
			var strasse = rest.substr(0, pos);
			rest = rest.substr(pos + 1, rest.length);

			pos = rest.indexOf(">");
			var email = rest.substr(0, pos);
			rest = rest.substr(pos + 1, rest.length);

			pos = rest.indexOf(">");
			var homepage = rest.substr(0, pos);
			rest = rest.substr(pos + 1, rest.length);

			pos = rest.indexOf(">");
			var telefon = rest.substr(0, pos);
			rest = rest.substr(pos + 1, rest.length);

			switch (window.location.hash)
			{
				case "#haendler":
					document.getElementById("db_name_de").innerText = name;
					document.getElementById("db_ort_de").innerText = ort;
					document.getElementById("db_plz_de").innerText = plz;
					document.getElementById("db_strasse_de").innerText = strasse;
					document.getElementById("db_email_de").innerText = email;
					document.getElementById("db_homepage_de").innerText = homepage;
					document.getElementById("db_telefon_de").innerText = telefon;

					document.getElementById("ergebnis").style.visibility = "visible";
					break;

				case "#dealer":
					document.getElementById("result").style.visibility = "visible";
					break;
				default:
					break;
			}
			break;
	}
	
	SpinningWheel.close();
	wheel_an = 0;
}

function cancel() {

	SpinningWheel.close();
	wheel_an = 0;
}

function sprachenliste() {
	
    publicSQL.tablePath = webpfad + "db/";
	var sql = "select sprache from interface where interface.sprache = '" + asprache + "'";
    //alert (sql);
	publicSQL.query(sql, "holeinterface");
	//alert (publicSQL.errorNumber);
}

function navisprache() {

	var pos;
	sprache = navigator.language;
  	pos = sprache.indexOf("-"); 
   	if (sprache.indexOf("-") >= 0)
   	{
		sprache = sprache.substr(0, pos);	
   	}
	//aktiver Code z.B. de, en, fr, nl
	acode = sprache;
}


function setzemarkt(amarkt) {
	mymarkt = amarkt;
	//alert (mymarkt);
	jQT.goTo("#aufnehmen", 'slideleft');
}

function buildinterface(acode) {

    publicSQL.tablePath = webpfad + "db/";
    //alert (publicSQL.tablePath);

    if ( acode == "")
    	acode = "en";
    
	var sql = "select * from interface where code = '" + acode + "'";
	//alert (sql);

	publicSQL.query(sql, "holeinterface");
	//alert (publicSQL.errorNumber);
	
}

function holeinterface(t) {

	var feld = "";
	var codeCC = 0;

  	//Records
  	//alert (t.length-1);
  	//Felder
  	//alert (t[0].length);

	acode = acode.replace(/'/g, "");

/*	
	//wo steht der Ländercode in der ptf?
	for (var i=0; i<1; i++)
	{
		for (var ii=0; ii<t[0].length; ii++)
		{
			if (t[0][ii] == "code")
				codeCC = ii;
		}
    }
*/

	for (var i=1; i<t.length; i++) {
		//alert ("i->" + i + "#" + t[i][0] + "\n" + t[i]);

			for (var ii=1; ii<t[0].length; ii++) {
				feld = "db_" + t[0][ii];
	
	            //alert ("Feld->" + feld + "\n" + t[i][ii] + "\n" + t[i]);
				switch (feld)
				{
					case "db_plzeingabe":
						plzeingabe = t[i][ii];
						break;
					case "db_ortseingabe":
						ortseingabe = t[i][ii];
						break;
					case "db_abbrechen":
						break;
					case "db_auswahl":
						break;
					case "db_code":
						break;
					case "db_sprache":
						break;
					case "db_meldung1":
						break;
					case "db_meldung2":
						break;
					default:
						//alert (t[i][ii]);
						labeln(feld, t[i][ii]);
				}
    	}
    }

	document.getElementById("los").style.visibility = "visible";
	//alert ("ja");
}

function labeln(feld, label) {
	try
	{
	  	//alert ("Feld-" + feld + "----" + label);
        document.getElementById(feld).innerText = label;
	}
	catch(err)
	{
	  	//alert (feld + " ist nicht da!");
	}
 }

function jako_http(seite) {

    switch (adevice)
    {
        case "android_":
            var dummy = '<iframe src="' + seite + '" style="width:200px; height: 200px; border:none;" name="website" scrolling="auto" frameborder="0"></iframe>';

            document.getElementById("jakohtml").innerHTML = dummy;
            //alert (document.getElementById("jakohtml").innerHTML);

            jQT.goTo('#jakoanzeige', 'slideleft');
            break;

        default:
            window.location.href = seite;
            break;
    }

}


function haendler_plz_suche(sql) {

//$('#haendler').append('<div id="warten" style="position: absolute; top: 100px; left: 100px; background-color:#C800000; visibility: visible;"><img src="waiting.gif"></div>');
//document.getElementById("warten").style.zIndex=100;

//alert ($(window).width());
//alert ($(window).height());
	

	switch (window.location.hash)
	{
		case "#haendler":
		    publicSQL.tablePath = webpfad + "db/";
			publicSQL.query(sql, "plzDB_DE");
			break;
		default:
			break;
	}
	//alert (publicSQL.errorNumber);

//$('#warten').remove();
}

function plzDB_DE(t) {

  	var dummy = {};
	
  	//alert (t.length-1);

	var suche = document.Formular_DE.plz.value;

	var aktplz = "";
	var z = 1;
	for (var i=1; i<t.length; i++) {
    	aktplz = String(t[i][2]);
    	//alert ("aktplz->" + aktplz + "\n" + "suche->" + suche + "\n" + "index->" + aktplz.indexOf(suche) ); 
    	if (aktplz.indexOf(suche) == 0)
    	{
    		//alert ("gefunden:" + aktplz);
    		//alert (t[i][2] + "&nbsp;>&nbsp;" + t[i][3] + "&nbsp;>&nbsp;" + t[i][0]);
    		dummy[z] =  t[i][2] + "&nbsp;>&nbsp;" + t[i][3] + "&nbsp;>&nbsp;" + t[i][0] + 
    		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + 
    		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#" + 
    		t[i][1] + "&nbsp;>&nbsp;" + t[i][4] + "&nbsp;>&nbsp;" + t[i][5] + "&nbsp;>&nbsp;" + t[i][6] + "&nbsp;>&nbsp;" + t[i][7];
    		z = z + 1;
    	}
	}
	//alert ("z->" + z);
	if (z > 0)
		starteWheel(dummy, "plz");
	else
	{
		//navigator.notification.vibrate(200);
	}
}


function umkreis(sql) {

	//alert (sql);
    publicSQL.tablePath = webpfad + "db/";	
	publicSQL.query(sql, "umkreisDB");
	//alert (publicSQL.errorNumber);

}

function umkreisDB(t) {

  	var dummy = {};
  	
  	//alert (t.length-1);
	for (var i=1; i<t.length; i++) {
    	//alert (t[i]);
    	dummy[i] =  t[i];
	}
	starteWheel(dummy, "umkreis");
}

function deutschlandOrt(sql) {

    publicSQL.tablePath = webpfad + "db/";	
	publicSQL.query(sql, "ortDB");
	//alert (publicSQL.errorNumber);

}


function ortDB(t) {

  	var dummy = {};
  	
  	//alert (t.length-1);
	var suche = document.Formular_DE.ort.value;
	suche = suche.toLowerCase();

	var aktort = "";
	var z = 1;
	for (var i=1; i<t.length; i++) {
    	aktort = String(t[i][3]);
    	aktort = aktort.toLowerCase();
    	if (aktort.indexOf(suche) == 0)
    	{
    		//alert (t[i][2] + "&nbsp;>&nbsp;" + t[i][3] + "&nbsp;>&nbsp;" + t[i][0]);
    		dummy[z] =  t[i][3] + "&nbsp;>&nbsp;" + t[i][2] + "&nbsp;>&nbsp;" + t[i][0] + 
    		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + 
    		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#" + 
    		t[i][1] + "&nbsp;>&nbsp;" + t[i][4] + "&nbsp;>&nbsp;" + t[i][5] + "&nbsp;>&nbsp;" + t[i][6] + "&nbsp;>&nbsp;" + t[i][7];
    		z = z + 1;
    	}
	}

	if (z > 0)
		starteWheel(dummy, "ort");
	else
	{
		//navigator.notification.vibrate(200);
	}
}


function zeigeLaender() {

    publicSQL.tablePath = webpfad + "db/";

	var sql = "select DISTINCT rest.Land FROM rest";

	publicSQL.query(sql, "LaenderlisteDB");
	//alert (publicSQL.errorNumber);

}


function LaenderlisteDB(t) {

	var dummy = {};

  	//alert (t.length-1);

	dummy[0] = 'Deutschland';
	//alert (dummy[0]);
	
	for (var i = 1; i <= t.length-1; i++) {
    	dummy[i] =  t[i][0];
    	//alert (dummy[i]);
	} 	
	starteWheel(dummy, "laender");

}

function zeigemarkt() {

	if (mymarkt != "")
	{
		jQT.goTo("#aufnehmen", 'slideleft');
		return;
	}

	if (marktliste == 1)
	{
		jQT.goTo("#markt", 'slideleft');
		return;
	}

    publicSQL.tablePath = webpfad + "db/";
	
	var sql = "select katalog, code from region";

	publicSQL.query(sql, "startezeigemarkt");
	//alert (publicSQL.errorNumber);
	marktliste = 1;
	jQT.goTo("#markt", 'slideleft');
}

function startezeigemarkt(t) {

	var dummy = '<table border=0 width="320px">';
	var dummy2;
	var dummy3;
	var asprache;
	var pos;
		
  	//Records
  	//alert (t.length-1);
  	//Felder
  	//alert (t[0].length);
	
	for (var i=1; i<t.length; i++) {
		dummy3 = String(t[i]);

	  	pos = dummy3.indexOf(",");

		asprache = dummy3.substr(0, pos);   	
		acode = "'" + dummy3.substr(pos+1, dummy3.length) +"'";   	

		dummy2 = '<tr><td><a href="#" class="jButton" onclick="setzemarkt(' + acode + ')" style="font-weight: normal; text-align: left; height: 22px">&nbsp;' + asprache + '</a></td></tr>';

		dummy = dummy + dummy2;
		
		dummy = dummy + '<tr><th height="20px"></th></tr>';	
   	}

	dummy = dummy + '</table>';
	
	$('#marktliste').append(dummy);
    
}

function zeigesprachen() {

	if (sprachliste == 1)
		return;
		
    publicSQL.tablePath = webpfad + "db/";
	
	var sql = "select sprache, code from interface";
	publicSQL.query(sql, "startezeigesprachen");
	//alert (publicSQL.errorNumber);
}


function startezeigesprachen(t) {

	var dummy = '<table border=0 width="320px">';
	var dummy2;
	var dummy3;
	var asprache;
	var pos;
		
  	//Records
  	//alert (t.length-1);
  	//Felder
  	//alert (t[0].length);
	
	for (var i=1; i<t.length; i++) {
		dummy3 = String(t[i]);

	  	pos = dummy3.indexOf(",");

		asprache = dummy3.substr(0, pos);   	
		acode = "'" + dummy3.substr(pos+1, dummy3.length) +"'";   	

		dummy2 = '<tr><td><a href="#de" class="jButton" onclick="buildinterface(' + acode + ')" style="font-weight: normal; text-align: left; height: 22px">&nbsp;' + asprache + '</a></td></tr>';

		dummy = dummy + dummy2;
		
		dummy = dummy + '<tr><th height="20px"></th></tr>';	
   	}

	dummy = dummy + '</table>';
	
	$('#sprachliste').append(dummy);
	
	//Neuer Markt?
	//mymarkt = "";
	
	sprachliste = 1;
    
}

function myBack() {

	jQT.goTo("#de", 'slideleft');
}

/*
function Fehlerbehandlung(meldung, url, zeile) {

   //var txt = "Es ist ein Fehler aufgetreten! Das macht aber nichts...\n\n";
   var txt = "";
   txt += "Meldung: " + meldung + "\n";
   txt += "URL: " + url + "\n";
   txt += "Zeile: " + zeile + "\n";
   txt += "Element: z_" + ele;
   //alert (txt)
   //document.getElementById('meldung').innerHTML = txt;
   return true;
}
*/

var php_js;

//_____________________________________________________________________________________________________________________________
function date_default_timezone_set (tz) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: timezone_abbreviations_list
  // %        note 1: Uses global: php_js to store the default timezone
  // *     example 1: date_default_timezone_set('unknown');
  // *     returns 1: 'unknown'
  var tal = {},
    abbr = '',
    i = 0;

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  // END REDUNDANT
  // PHP verifies that the timezone is valid and also sets this.php_js.currentTimezoneOffset and this.php_js.currentTimezoneDST if so
  tal = this.timezone_abbreviations_list();

  for (abbr in tal) {
    for (i = 0; i < tal[abbr].length; i++) {
      if (tal[abbr][i].timezone_id === tz) {
        this.php_js.default_timezone = tz;
        return true;
      }
    }
  }
  return false;
}


//_____________________________________________________________________________________________________________________________
function file_get_contents (url, flags, context, offset, maxLen) {
  // Read the entire file into a string
  //
  // version: 906.111
  // discuss at: http://phpjs.org/functions/file_get_contents
  // +   original by: Legaev Andrey
  // +      input by: Jani Hartikainen
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   input by: Raphael (Ao) RUDLER
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain without modifications.
  // %        note 2: Synchronous by default (as in PHP) so may lock up browser. Can
  // %        note 2: get async by setting a custom "phpjs.async" property to true and "notification" for an
  // %        note 2: optional callback (both as context params, with responseText, and other JS-specific
  // %        note 2: request properties available via 'this'). Note that file_get_contents() will not return the text
  // %        note 2: in such a case (use this.responseText within the callback). Or, consider using
  // %        note 2: jQuery's: $('#divId').load('http://url') instead.
  // %        note 3: The context argument is only implemented for http, and only partially (see below for
  // %        note 3: "Presently unimplemented HTTP context options"); also the arguments passed to
  // %        note 3: notification are incomplete
  // *     example 1: file_get_contents('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
  // *     returns 1: '123'
  // Note: could also be made to optionally add to global $http_response_header as per http://php.net/manual/en/reserved.variables.httpresponseheader.php
  var tmp, headers = [],
    newTmp = [],
    k = 0,
    i = 0,
    href = '',
    pathPos = -1,
    flagNames = 0,
    content = null,
    http_stream = false;
  var func = function (value) {
    return value.substring(1) !== '';
  };

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  var ini = this.php_js.ini;
  context = context || this.php_js.default_streams_context || null;

  if (!flags) {
    flags = 0;
  }
  var OPTS = {
    FILE_USE_INCLUDE_PATH: 1,
    FILE_TEXT: 32,
    FILE_BINARY: 64
  };
  if (typeof flags === 'number') { // Allow for a single string or an array of string flags
    flagNames = flags;
  } else {
    flags = [].concat(flags);
    for (i = 0; i < flags.length; i++) {
      if (OPTS[flags[i]]) {
        flagNames = flagNames | OPTS[flags[i]];
      }
    }
  }

  if (flagNames & OPTS.FILE_BINARY && (flagNames & OPTS.FILE_TEXT)) { // These flags shouldn't be together
    throw 'You cannot pass both FILE_BINARY and FILE_TEXT to file_get_contents()';
  }

  if ((flagNames & OPTS.FILE_USE_INCLUDE_PATH) && ini.include_path && ini.include_path.local_value) {
    var slash = ini.include_path.local_value.indexOf('/') !== -1 ? '/' : '\\';
    url = ini.include_path.local_value + slash + url;
  } else if (!/^(https?|file):/.test(url)) { // Allow references within or below the same directory (should fix to allow other relative references or root reference; could make dependent on parse_url())
    href = this.window.location.href;
    pathPos = url.indexOf('/') === 0 ? href.indexOf('/', 8) - 1 : href.lastIndexOf('/');
    url = href.slice(0, pathPos + 1) + url;
  }

  if (context) {
    var http_options = context.stream_options && context.stream_options.http;
    http_stream = !! http_options;
  }

  if (!context || http_stream) {
    var req = this.window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
    if (!req) {
      throw new Error('XMLHttpRequest not supported');
    }

    var method = http_stream ? http_options.method : 'GET';
    var async = !! (context && context.stream_params && context.stream_params['phpjs.async']);

    if (ini['phpjs.ajaxBypassCache'] && ini['phpjs.ajaxBypassCache'].local_value) {
      url += (url.match(/\?/) == null ? "?" : "&") + (new Date()).getTime(); // Give optional means of forcing bypass of cache
    }

    req.open(method, url, async);
    if (async) {
      var notification = context.stream_params.notification;
      if (typeof notification === 'function') {
        // Fix: make work with req.addEventListener if available: https://developer.mozilla.org/En/Using_XMLHttpRequest
        if (0 && req.addEventListener) { // Unimplemented so don't allow to get here
/*
          req.addEventListener('progress', updateProgress, false);
          req.addEventListener('load', transferComplete, false);
          req.addEventListener('error', transferFailed, false);
          req.addEventListener('abort', transferCanceled, false);
          */
        } else {
          req.onreadystatechange = function (aEvt) { // aEvt has stopPropagation(), preventDefault(); see https://developer.mozilla.org/en/NsIDOMEvent
            // Other XMLHttpRequest properties: multipart, responseXML, status, statusText, upload, withCredentials
/*
  PHP Constants:
  STREAM_NOTIFY_RESOLVE   1       A remote address required for this stream has been resolved, or the resolution failed. See severity  for an indication of which happened.
  STREAM_NOTIFY_CONNECT   2     A connection with an external resource has been established.
  STREAM_NOTIFY_AUTH_REQUIRED 3     Additional authorization is required to access the specified resource. Typical issued with severity level of STREAM_NOTIFY_SEVERITY_ERR.
  STREAM_NOTIFY_MIME_TYPE_IS  4     The mime-type of resource has been identified, refer to message for a description of the discovered type.
  STREAM_NOTIFY_FILE_SIZE_IS  5     The size of the resource has been discovered.
  STREAM_NOTIFY_REDIRECTED    6     The external resource has redirected the stream to an alternate location. Refer to message .
  STREAM_NOTIFY_PROGRESS  7     Indicates current progress of the stream transfer in bytes_transferred and possibly bytes_max as well.
  STREAM_NOTIFY_COMPLETED 8     There is no more data available on the stream.
  STREAM_NOTIFY_FAILURE   9     A generic error occurred on the stream, consult message and message_code for details.
  STREAM_NOTIFY_AUTH_RESULT   10     Authorization has been completed (with or without success).

  STREAM_NOTIFY_SEVERITY_INFO 0     Normal, non-error related, notification.
  STREAM_NOTIFY_SEVERITY_WARN 1     Non critical error condition. Processing may continue.
  STREAM_NOTIFY_SEVERITY_ERR  2     A critical error occurred. Processing cannot continue.
  */
            var objContext = {
              responseText: req.responseText,
              responseXML: req.responseXML,
              status: req.status,
              statusText: req.statusText,
              readyState: req.readyState,
              evt: aEvt
            }; // properties are not available in PHP, but offered on notification via 'this' for convenience
            // notification args: notification_code, severity, message, message_code, bytes_transferred, bytes_max (all int's except string 'message')
            // Need to add message, etc.
            var bytes_transferred;
            switch (req.readyState) {
            case 0:
              //     UNINITIALIZED     open() has not been called yet.
              notification.call(objContext, 0, 0, '', 0, 0, 0);
              break;
            case 1:
              //     LOADING     send() has not been called yet.
              notification.call(objContext, 0, 0, '', 0, 0, 0);
              break;
            case 2:
              //     LOADED     send() has been called, and headers and status are available.
              notification.call(objContext, 0, 0, '', 0, 0, 0);
              break;
            case 3:
              //     INTERACTIVE     Downloading; responseText holds partial data.
              bytes_transferred = req.responseText.length * 2; // One character is two bytes
              notification.call(objContext, 7, 0, '', 0, bytes_transferred, 0);
              break;
            case 4:
              //     COMPLETED     The operation is complete.
              if (req.status >= 200 && req.status < 400) {
                bytes_transferred = req.responseText.length * 2; // One character is two bytes
                notification.call(objContext, 8, 0, '', req.status, bytes_transferred, 0);
              } else if (req.status === 403) { // Fix: These two are finished except for message
                notification.call(objContext, 10, 2, '', req.status, 0, 0);
              } else { // Errors
                notification.call(objContext, 9, 2, '', req.status, 0, 0);
              }
              break;
            default:
              throw 'Unrecognized ready state for file_get_contents()';
            }
          }
        }
      }
    }

    if (http_stream) {
      var sendHeaders = http_options.header && http_options.header.split(/\r?\n/);
      var userAgentSent = false;
      for (i = 0; i < sendHeaders.length; i++) {
        var sendHeader = sendHeaders[i];
        var breakPos = sendHeader.search(/:\s*/);
        var sendHeaderName = sendHeader.substring(0, breakPos);
        req.setRequestHeader(sendHeaderName, sendHeader.substring(breakPos + 1));
        if (sendHeaderName === 'User-Agent') {
          userAgentSent = true;
        }
      }
      if (!userAgentSent) {
        var user_agent = http_options.user_agent || (ini.user_agent && ini.user_agent.local_value);
        if (user_agent) {
          req.setRequestHeader('User-Agent', user_agent);
        }
      }
      content = http_options.content || null;
/*
      // Presently unimplemented HTTP context options
      var request_fulluri = http_options.request_fulluri || false; // When set to TRUE, the entire URI will be used when constructing the request. (i.e. GET http://www.example.com/path/to/file.html HTTP/1.0). While this is a non-standard request format, some proxy servers require it.
      var max_redirects = http_options.max_redirects || 20; // The max number of redirects to follow. Value 1 or less means that no redirects are followed.
      var protocol_version = http_options.protocol_version || 1.0; // HTTP protocol version
      var timeout = http_options.timeout || (ini.default_socket_timeout && ini.default_socket_timeout.local_value); // Read timeout in seconds, specified by a float
      var ignore_errors = http_options.ignore_errors || false; // Fetch the content even on failure status codes.
      */
    }

    if (flagNames & OPTS.FILE_TEXT) { // Overrides how encoding is treated (regardless of what is returned from the server)
      var content_type = 'text/html';
      if (http_options && http_options['phpjs.override']) { // Fix: Could allow for non-HTTP as well
        content_type = http_options['phpjs.override']; // We use this, e.g., in gettext-related functions if character set
        //   overridden earlier by bind_textdomain_codeset()
      } else {
        var encoding = (ini['unicode.stream_encoding'] && ini['unicode.stream_encoding'].local_value) || 'UTF-8';
        if (http_options && http_options.header && (/^content-type:/im).test(http_options.header)) { // We'll assume a content-type expects its own specified encoding if present
          content_type = http_options.header.match(/^content-type:\s*(.*)$/im)[1]; // We let any header encoding stand
        }
        if (!(/;\s*charset=/).test(content_type)) { // If no encoding
          content_type += '; charset=' + encoding;
        }
      }
      req.overrideMimeType(content_type);
    }
    // Default is FILE_BINARY, but for binary, we apparently deviate from PHP in requiring the flag, since many if not
    //     most people will also want a way to have it be auto-converted into native JavaScript text instead
    else if (flagNames & OPTS.FILE_BINARY) { // Trick at https://developer.mozilla.org/En/Using_XMLHttpRequest to get binary
      req.overrideMimeType('text/plain; charset=x-user-defined');
      // Getting an individual byte then requires:
      // responseText.charCodeAt(x) & 0xFF; // throw away high-order byte (f7) where x is 0 to responseText.length-1 (see notes in our substr())
    }

    if (http_options && http_options['phpjs.sendAsBinary']) { // For content sent in a POST or PUT request (use with file_put_contents()?)
      req.sendAsBinary(content); // In Firefox, only available FF3+
    } else {
      req.send(content);
    }

    tmp = req.getAllResponseHeaders();
    if (tmp) {
      tmp = tmp.split('\n');
      for (k = 0; k < tmp.length; k++) {
        if (func(tmp[k])) {
          newTmp.push(tmp[k]);
        }
      }
      tmp = newTmp;
      for (i = 0; i < tmp.length; i++) {
        headers[i] = tmp[i];
      }
      this.$http_response_header = headers; // see http://php.net/manual/en/reserved.variables.httpresponseheader.php
    }

    if (offset || maxLen) {
      if (maxLen) {
        return req.responseText.substr(offset || 0, maxLen);
      }
      return req.responseText.substr(offset);
    }
    return req.responseText;
  }
  return false;
}


function time () {
  // http://kevin.vanzonneveld.net
  // +   original by: GeekFG (http://geekfg.blogspot.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: metjay
  // +   improved by: HKM
  // *     example 1: timeStamp = time();
  // *     results 1: timeStamp > 1000000000 && timeStamp < 2000000000
  return Math.floor(new Date().getTime() / 1000);
}


//_____________________________________________________________________________________________________________________________
function date (format, timestamp) {
  // http://kevin.vanzonneveld.net
  // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
  // +      parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: MeEtc (http://yass.meetcweb.com)
  // +   improved by: Brad Touesnard
  // +   improved by: Tim Wiel
  // +   improved by: Bryan Elliott
  //
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: David Randall
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // +  derived from: gettimeofday
  // +      input by: majak
  // +   bugfixed by: majak
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Alex
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // +   improved by: Thomas Beaucourt (http://www.webapp.fr)
  // +   improved by: JT
  // +   improved by: Theriault
  // +   improved by: Rafa? Kukawski (http://blog.kukawski.pl)
  // +   bugfixed by: omid (http://phpjs.org/functions/380:380#comment_137122)
  // +      input by: Martin
  // +      input by: Alex Wilson
  // +   bugfixed by: Chris (http://www.devotis.nl/)
  // %        note 1: Uses global: php_js to store the default timezone
  // %        note 2: Although the function potentially allows timezone info (see notes), it currently does not set
  // %        note 2: per a timezone specified by date_default_timezone_set(). Implementers might use
  // %        note 2: this.php_js.currentTimezoneOffset and this.php_js.currentTimezoneDST set by that function
  // %        note 2: in order to adjust the dates in this function (or our other date functions!) accordingly
  // *     example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
  // *     returns 1: '09:09:40 m is month'
  // *     example 2: date('F j, Y, g:i a', 1062462400);
  // *     returns 2: 'September 2, 2003, 2:26 am'
  // *     example 3: date('Y W o', 1062462400);
  // *     returns 3: '2003 36 2003'
  // *     example 4: x = date('Y m d', (new Date()).getTime()/1000);
  // *     example 4: (x+'').length == 10 // 2009 01 09
  // *     returns 4: true
  // *     example 5: date('W', 1104534000);
  // *     returns 5: '53'
  // *     example 6: date('B t', 1104534000);
  // *     returns 6: '999 31'
  // *     example 7: date('W U', 1293750000.82); // 2010-12-31
  // *     returns 7: '52 1293750000'
  // *     example 8: date('W', 1293836400); // 2011-01-01
  // *     returns 8: '52'
  // *     example 9: date('W Y-m-d', 1293974054); // 2011-01-02
  // *     returns 9: '52 2011-01-02'
  
    var that = this,
      jsdate,
      f,
      formatChr = /\\?([a-z])/gi,
      formatChrCb,
      // Keep this here (works, but for code commented-out
      // below for file size reasons)
      //, tal= [],
      _pad = function (n, c) {
        n = n.toString();
        return n.length < c ? _pad('0' + n, c, '0') : n;
      },
      txt_words = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  formatChrCb = function (t, s) {
    return f[t] ? f[t]() : s;
  };
  f = {
    // Day
    d: function () { // Day of month w/leading 0; 01..31
      return _pad(f.j(), 2);
    },
    D: function () { // Shorthand day name; Mon...Sun
      return f.l().slice(0, 3);
    },
    j: function () { // Day of month; 1..31
      return jsdate.getDate();
    },
    l: function () { // Full day name; Monday...Sunday
      return txt_words[f.w()] + 'day';
    },
    N: function () { // ISO-8601 day of week; 1[Mon]..7[Sun]
      return f.w() || 7;
    },
    S: function () { // Ordinal suffix for day of month; st, nd, rd, th
      var j = f.j();
      return j < 4 | j > 20 && (['st', 'nd', 'rd'][j % 10 - 1] || 'th');
    },
    w: function () { // Day of week; 0[Sun]..6[Sat]
      return jsdate.getDay();
    },
    z: function () { // Day of year; 0..365
      var a = new Date(f.Y(), f.n() - 1, f.j()),
        b = new Date(f.Y(), 0, 1);
      return Math.round((a - b) / 864e5);
    },

    // Week
    W: function () { // ISO-8601 week number
      var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3),
        b = new Date(a.getFullYear(), 0, 4);
      return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
    },

    // Month
    F: function () { // Full month name; January...December
      return txt_words[6 + f.n()];
    },
    m: function () { // Month w/leading 0; 01...12
      return _pad(f.n(), 2);
    },
    M: function () { // Shorthand month name; Jan...Dec
      return f.F().slice(0, 3);
    },
    n: function () { // Month; 1...12
      return jsdate.getMonth() + 1;
    },
    t: function () { // Days in month; 28...31
      return (new Date(f.Y(), f.n(), 0)).getDate();
    },

    // Year
    L: function () { // Is leap year?; 0 or 1
      var j = f.Y();
      return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
    },
    o: function () { // ISO-8601 year
      var n = f.n(),
        W = f.W(),
        Y = f.Y();
      return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
    },
    Y: function () { // Full year; e.g. 1980...2010
      return jsdate.getFullYear();
    },
    y: function () { // Last two digits of year; 00...99
      return f.Y().toString().slice(-2);
    },

    // Time
    a: function () { // am or pm
      return jsdate.getHours() > 11 ? "pm" : "am";
    },
    A: function () { // AM or PM
      return f.a().toUpperCase();
    },
    B: function () { // Swatch Internet time; 000..999
      var H = jsdate.getUTCHours() * 36e2,
        // Hours
        i = jsdate.getUTCMinutes() * 60,
        // Minutes
        s = jsdate.getUTCSeconds(); // Seconds
      return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
    },
    g: function () { // 12-Hours; 1..12
      return f.G() % 12 || 12;
    },
    G: function () { // 24-Hours; 0..23
      return jsdate.getHours();
    },
    h: function () { // 12-Hours w/leading 0; 01..12
      return _pad(f.g(), 2);
    },
    H: function () { // 24-Hours w/leading 0; 00..23
      return _pad(f.G(), 2);
    },
    i: function () { // Minutes w/leading 0; 00..59
      return _pad(jsdate.getMinutes(), 2);
    },
    s: function () { // Seconds w/leading 0; 00..59
      return _pad(jsdate.getSeconds(), 2);
    },
    u: function () { // Microseconds; 000000-999000
      return _pad(jsdate.getMilliseconds() * 1000, 6);
    },

    // Timezone
    e: function () { // Timezone identifier; e.g. Atlantic/Azores, ...
      // The following works, but requires inclusion of the very large
      // timezone_abbreviations_list() function.
/*              return that.date_default_timezone_get();
*/
      throw 'Not supported (see source code of date() for timezone on how to add support)';
    },
    I: function () { // DST observed?; 0 or 1
      // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
      // If they are not equal, then DST is observed.
      var a = new Date(f.Y(), 0),
        // Jan 1
        c = Date.UTC(f.Y(), 0),
        // Jan 1 UTC
        b = new Date(f.Y(), 6),
        // Jul 1
        d = Date.UTC(f.Y(), 6); // Jul 1 UTC
      return ((a - c) !== (b - d)) ? 1 : 0;
    },
    O: function () { // Difference to GMT in hour format; e.g. +0200
      var tzo = jsdate.getTimezoneOffset(),
        a = Math.abs(tzo);
      return (tzo > 0 ? "-" : "+") + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
    },
    P: function () { // Difference to GMT w/colon; e.g. +02:00
      var O = f.O();
      return (O.substr(0, 3) + ":" + O.substr(3, 2));
    },
    T: function () { // Timezone abbreviation; e.g. EST, MDT, ...
      // The following works, but requires inclusion of the very
      // large timezone_abbreviations_list() function.
/*              var abbr = '', i = 0, os = 0, default = 0;
      if (!tal.length) {
        tal = that.timezone_abbreviations_list();
      }
      if (that.php_js && that.php_js.default_timezone) {
        default = that.php_js.default_timezone;
        for (abbr in tal) {
          for (i=0; i < tal[abbr].length; i++) {
            if (tal[abbr][i].timezone_id === default) {
              return abbr.toUpperCase();
            }
          }
        }
      }
      for (abbr in tal) {
        for (i = 0; i < tal[abbr].length; i++) {
          os = -jsdate.getTimezoneOffset() * 60;
          if (tal[abbr][i].offset === os) {
            return abbr.toUpperCase();
          }
        }
      }
*/
      return 'UTC';
    },
    Z: function () { // Timezone offset in seconds (-43200...50400)
      return -jsdate.getTimezoneOffset() * 60;
    },

    // Full Date/Time
    c: function () { // ISO-8601 date.
      return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
    },
    r: function () { // RFC 2822
      return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
    },
    U: function () { // Seconds since UNIX epoch
      return jsdate / 1000 | 0;
    }
  };
  this.date = function (format, timestamp) {
    that = this;
    jsdate = (timestamp === undefined ? new Date() : // Not provided
      (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
      new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
    );
    return format.replace(formatChr, formatChrCb);
  };
  return this.date(format, timestamp);
}


//_____________________________________________________________________________________________________________________________
function uniqid (prefix, more_entropy) {
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    revised by: Kankrelune (http://www.webfaktory.info/)
  // %        note 1: Uses an internal counter (in php_js global) to avoid collision
  // *     example 1: uniqid();
  // *     returns 1: 'a30285b160c14'
  // *     example 2: uniqid('foo');
  // *     returns 2: 'fooa30285b1cd361'
  // *     example 3: uniqid('bar', true);
  // *     returns 3: 'bara20285b23dfd1.31879087'
  if (typeof prefix == 'undefined') {
    prefix = "";
  }

  var retId;
  var formatSeed = function (seed, reqWidth) {
    seed = parseInt(seed, 10).toString(16); // to hex str
    if (reqWidth < seed.length) { // so long we split
      return seed.slice(seed.length - reqWidth);
    }
    if (reqWidth > seed.length) { // so short we pad
      return Array(1 + (reqWidth - seed.length)).join('0') + seed;
    }
    return seed;
  };

  // BEGIN REDUNDANT
  if (!this.php_js) {
    this.php_js = {};
  }
  // END REDUNDANT
  if (!this.php_js.uniqidSeed) { // init seed with big random int
    this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
  }
  this.php_js.uniqidSeed++;

  retId = prefix; // start with prefix, add current milliseconds hex string
  retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
  retId += formatSeed(this.php_js.uniqidSeed, 5); // add seed hex string
  if (more_entropy) {
    // for more entropy we add a float lower to 10
    retId += (Math.random() * 10).toFixed(8).toString();
  }

  return retId;
}

//_____________________________________________________________________________________________________________________________
function md5 (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // + namespaced by: Michael White (http://getsprink.com)
  // +    tweaked by: Jack
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // -    depends on: utf8_encode
  // *     example 1: md5('Kevin van Zonneveld');
  // *     returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'
  var xl;

  var rotateLeft = function (lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  };


  var addUnsigned = function (lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      } else {
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
    } else {
      return (lResult ^ lX8 ^ lY8);
    }
  };

  var _F = function (x, y, z) {
    return (x & y) | ((~x) & z);
  };
  var _G = function (x, y, z) {
    return (x & z) | (y & (~z));
  };
  var _H = function (x, y, z) {
    return (x ^ y ^ z);
  };
  var _I = function (x, y, z) {
    return (y ^ (x | (~z)));
  };

  var _FF = function (a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var _GG = function (a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var _HH = function (a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var _II = function (a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var convertToWordArray = function (str) {
    var lWordCount;
    var lMessageLength = str.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = new Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  };

  var wordToHex = function (lValue) {
    var wordToHexValue = "",
      wordToHexValue_temp = "",
      lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      wordToHexValue_temp = "0" + lByte.toString(16);
      wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
    }
    return wordToHexValue;
  };

  var x = [],
    k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
    S12 = 12,
    S13 = 17,
    S14 = 22,
    S21 = 5,
    S22 = 9,
    S23 = 14,
    S24 = 20,
    S31 = 4,
    S32 = 11,
    S33 = 16,
    S34 = 23,
    S41 = 6,
    S42 = 10,
    S43 = 15,
    S44 = 21;

  str = this.utf8_encode(str);
  x = convertToWordArray(str);
  a = 0x67452301;
  b = 0xEFCDAB89;
  c = 0x98BADCFE;
  d = 0x10325476;

  xl = x.length;
  for (k = 0; k < xl; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
    d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
    c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
    b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
    a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
    d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
    c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
    b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
    a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
    d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
    c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
    b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
    a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
    d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
    c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
    b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
    a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
    d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
    c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
    b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
    a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
    d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
    b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
    a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
    d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
    c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
    b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
    a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
    d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
    c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
    b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
    a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
    d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
    c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
    b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
    a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
    d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
    c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
    b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
    a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
    d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
    c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
    b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
    a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
    d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
    c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
    b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
    a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
    d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
    c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
    b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
    a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
    d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
    c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
    b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
    a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
    d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
    c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
    b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
    a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
    d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
    c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
    b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }

  var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);

  return temp.toLowerCase();
}


//_____________________________________________________________________________________________________________________________
function utf8_encode (argString) {
  // http://kevin.vanzonneveld.net
  // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: sowberry
  // +    tweaked by: Jack
  // +   bugfixed by: Onno Marsman
  // +   improved by: Yves Sucaet
  // +   bugfixed by: Onno Marsman
  // +   bugfixed by: Ulrich
  // +   bugfixed by: Rafal Kukawski
  // +   improved by: kirilloid
  // *     example 1: utf8_encode('Kevin van Zonneveld');
  // *     returns 1: 'Kevin van Zonneveld'

  if (argString === null || typeof argString === "undefined") {
    return "";
  }

  var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  var utftext = '',
    start, end, stringl = 0;

  start = end = 0;
  stringl = string.length;
  for (var n = 0; n < stringl; n++) {
    var c1 = string.charCodeAt(n);
    var enc = null;

    if (c1 < 128) {
      end++;
    } else if (c1 > 127 && c1 < 2048) {
      enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
    } else {
      enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
    }
    if (enc !== null) {
      if (end > start) {
        utftext += string.slice(start, end);
      }
      utftext += enc;
      start = end = n + 1;
    }
  }

  if (end > start) {
    utftext += string.slice(start, stringl);
  }

  return utftext;
}


//_____________________________________________________________________________________________________________________________
function base64_encode (data) {
  // http://kevin.vanzonneveld.net
  // +   original by: Tyler Akins (http://rumkin.com)
  // +   improved by: Bayron Guevara
  // +   improved by: Thunder.m
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Pellentesque Malesuada
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Rafa? Kukawski (http://kukawski.pl)
  // *     example 1: base64_encode('Kevin van Zonneveld');
  // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
  // mozilla has this native
  // - but breaks in 2.0.0.12!
  //if (typeof this.window['btoa'] == 'function') {
  //    return btoa(data);
  //}
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    enc = "",
    tmp_arr = [];

  if (!data) {
    return data;
  }

  do { // pack three octets into four hexets
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);

    bits = o1 << 16 | o2 << 8 | o3;

    h1 = bits >> 18 & 0x3f;
    h2 = bits >> 12 & 0x3f;
    h3 = bits >> 6 & 0x3f;
    h4 = bits & 0x3f;

    // use hexets to index into b64, and append result to encoded string
    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);

  enc = tmp_arr.join('');

  var r = data.length % 3;

  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);

}

//_____________________________________________________________________________________________________________________________
function sha1 (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // + namespaced by: Michael White (http://getsprink.com)
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // -    depends on: utf8_encode
  // *     example 1: sha1('Kevin van Zonneveld');
  // *     returns 1: '54916d2e62f65b3afa6e192e6a601cdbe5cb5897'
  var rotate_left = function (n, s) {
    var t4 = (n << s) | (n >>> (32 - s));
    return t4;
  };

/*var lsb_hex = function (val) { // Not in use; needed?
    var str="";
    var i;
    var vh;
    var vl;

    for ( i=0; i<=6; i+=2 ) {
      vh = (val>>>(i*4+4))&0x0f;
      vl = (val>>>(i*4))&0x0f;
      str += vh.toString(16) + vl.toString(16);
    }
    return str;
  };*/

  var cvt_hex = function (val) {
    var str = "";
    var i;
    var v;

    for (i = 7; i >= 0; i--) {
      v = (val >>> (i * 4)) & 0x0f;
      str += v.toString(16);
    }
    return str;
  };

  var blockstart;
  var i, j;
  var W = new Array(80);
  var H0 = 0x67452301;
  var H1 = 0xEFCDAB89;
  var H2 = 0x98BADCFE;
  var H3 = 0x10325476;
  var H4 = 0xC3D2E1F0;
  var A, B, C, D, E;
  var temp;

  str = this.utf8_encode(str);
  var str_len = str.length;

  var word_array = [];
  for (i = 0; i < str_len - 3; i += 4) {
    j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
    word_array.push(j);
  }

  switch (str_len % 4) {
  case 0:
    i = 0x080000000;
    break;
  case 1:
    i = str.charCodeAt(str_len - 1) << 24 | 0x0800000;
    break;
  case 2:
    i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 0x08000;
    break;
  case 3:
    i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) << 8 | 0x80;
    break;
  }

  word_array.push(i);

  while ((word_array.length % 16) != 14) {
    word_array.push(0);
  }

  word_array.push(str_len >>> 29);
  word_array.push((str_len << 3) & 0x0ffffffff);

  for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
    for (i = 0; i < 16; i++) {
      W[i] = word_array[blockstart + i];
    }
    for (i = 16; i <= 79; i++) {
      W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
    }


    A = H0;
    B = H1;
    C = H2;
    D = H3;
    E = H4;

    for (i = 0; i <= 19; i++) {
      temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    for (i = 20; i <= 39; i++) {
      temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    for (i = 40; i <= 59; i++) {
      temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    for (i = 60; i <= 79; i++) {
      temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    H0 = (H0 + A) & 0x0ffffffff;
    H1 = (H1 + B) & 0x0ffffffff;
    H2 = (H2 + C) & 0x0ffffffff;
    H3 = (H3 + D) & 0x0ffffffff;
    H4 = (H4 + E) & 0x0ffffffff;
  }

  temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
  return temp.toLowerCase();
}

//_____________________________________________________________________________________________________________________________
function strlen (string) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Sakimori
  // +      input by: Kirk Strobeck
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +    revised by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: May look like overkill, but in order to be truly faithful to handling all Unicode
  // %        note 1: characters and to this function in PHP which does not count the number of bytes
  // %        note 1: but counts the number of characters, something like this is really necessary.
  // *     example 1: strlen('Kevin van Zonneveld');
  // *     returns 1: 19
  // *     example 2: strlen('A\ud87e\udc04Z');
  // *     returns 2: 3
  var str = string + '';
  var i = 0,
    chr = '',
    lgth = 0;

  if (!this.php_js || !this.php_js.ini || !this.php_js.ini['unicode.semantics'] || this.php_js.ini['unicode.semantics'].local_value.toLowerCase() !== 'on') {
    return string.length;
  }

  var getWholeChar = function (str, i) {
    var code = str.charCodeAt(i);
    var next = '',
      prev = '';
    if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
      if (str.length <= (i + 1)) {
        throw 'High surrogate without following low surrogate';
      }
      next = str.charCodeAt(i + 1);
      if (0xDC00 > next || next > 0xDFFF) {
        throw 'High surrogate without following low surrogate';
      }
      return str.charAt(i) + str.charAt(i + 1);
    } else if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
      if (i === 0) {
        throw 'Low surrogate without preceding high surrogate';
      }
      prev = str.charCodeAt(i - 1);
      if (0xD800 > prev || prev > 0xDBFF) { //(could change last hex to 0xDB7F to treat high private surrogates as single characters)
        throw 'Low surrogate without preceding high surrogate';
      }
      return false; // We can pass over low surrogates now as the second component in a pair which we have already processed
    }
    return str.charAt(i);
  };

  for (i = 0, lgth = 0; i < str.length; i++) {
    if ((chr = getWholeChar(str, i)) === false) {
      continue;
    } // Adapt this line at the top of any loop, passing in the whole string and the current iteration and returning a variable to represent the individual character; purpose is to treat the first part of a surrogate pair as the whole character and then ignore the second part
    lgth++;
  }
  return lgth;
}


//_____________________________________________________________________________________________________________________________
function print_r (array, return_val) {
  // http://kevin.vanzonneveld.net
  // +   original by: Michael White (http://getsprink.com)
  // +   improved by: Ben Bryan
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +      improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // -    depends on: echo
  // *     example 1: print_r(1, true);
  // *     returns 1: 1
  var output = '',
    pad_char = ' ',
    pad_val = 4,
    d = this.window.document,
    getFuncName = function (fn) {
      var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
      if (!name) {
        return '(Anonymous)';
      }
      return name[1];
    },
    repeat_char = function (len, pad_char) {
      var str = '';
      for (var i = 0; i < len; i++) {
        str += pad_char;
      }
      return str;
    },
    formatArray = function (obj, cur_depth, pad_val, pad_char) {
      if (cur_depth > 0) {
        cur_depth++;
      }

      var base_pad = repeat_char(pad_val * cur_depth, pad_char);
      var thick_pad = repeat_char(pad_val * (cur_depth + 1), pad_char);
      var str = '';

      if (typeof obj === 'object' && obj !== null && obj.constructor && getFuncName(obj.constructor) !== 'PHPJS_Resource') {
        str += 'Array\n' + base_pad + '(\n';
        for (var key in obj) {
          if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
            str += thick_pad + '[' + key + '] => ' + formatArray(obj[key], cur_depth + 1, pad_val, pad_char);
          }
          else {
            str += thick_pad + '[' + key + '] => ' + obj[key] + '\n';
          }
        }
        str += base_pad + ')\n';
      }
      else if (obj === null || obj === undefined) {
        str = '';
      }
      else { // for our "resource" class
        str = obj.toString();
      }

      return str;
    };

  output = formatArray(array, 0, pad_val, pad_char);

  if (return_val !== true) {
    if (d.body) {
      this.echo(output);
    }
    else {
      try {
        d = XULDocument; // We're in XUL, so appending as plain text won't work; trigger an error out of XUL
        this.echo('<pre xmlns="http://www.w3.org/1999/xhtml" style="white-space:pre;">' + output + '</pre>');
      } catch (e) {
        this.echo(output); // Outputting as plain text may work in some plain XML
      }
    }
    return true;
  }
  return output;
}

function timezone_abbreviations_list () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +      input by: ChaosNo1
  // +    revised by: Theriault
  // +    improved by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Based on timezonemap.h from PHP 5.3
  // *     example 1: var list = timezone_abbreviations_list()
  // *     example 1: list['acst'][0].timezone_id
  // *     returns 1: 'America/Porto_Acre'
  var list = {},
    i = 0,
    j = 0,
    len = 0,
    jlen = 0,
    indice = '',
    curr = '',
    currSub = '',
    currSubPrefix = '',
    timezone_id = '',
    tzo = 0,
    dst = false;

  // BEGIN STATIC
  try { // We can't try to access on window, since it might not exist in some environments, and if we use "this.window"
    //    we risk adding another copy if different window objects are associated with the namespaced object
    php_js_shared; // Will be private static variable in namespaced version or global in non-namespaced
    //   version since we wish to share this across all instances
  } catch (e) {
    php_js_shared = {};
  }

  // An array of arrays. The index of each array is the relative
  // abbreviation from the abbreviations array below. Each sub array
  // consists of 2 to 4 values. The first value will be DST. The
  // second value is the index of the value in the offsets array.
  // The third value is the timezone ID if applicable. Null is
  // returned if their is no value. The fourth value is the index
  // of the prefix to use for the timezone ID if applicable.
  if (!php_js_shared.tz_abbrs) { // This should really be static, but we can at least avoid rebuilding the array each time
    php_js_shared.tz_abbrs = [
      [
        [1, 14, "Porto_Acre", 9],
        [1, 14, "Eirunepe", 9],
        [1, 14, "Rio_Branco", 9],
        [1, 14, "Acre", 15]
      ],
      [
        [0, 11, "Porto_Acre", 9],
        [0, 11, "Eirunepe", 9],
        [0, 11, "Rio_Branco", 9],
        [0, 11, "Acre", 15]
      ],
      [
        [1, 25, "Goose_Bay", 9],
        [1, 25, "Pangnirtung", 9]
      ],
      [
        [1, 22, "Halifax", 9],
        [1, 22, "Barbados", 9],
        [1, 22, "Blanc-Sablon", 9],
        [1, 22, "Glace_Bay", 9],
        [1, 22, "Goose_Bay", 9],
        [1, 22, "Martinique", 9],
        [1, 22, "Moncton", 9],
        [1, 22, "Pangnirtung", 9],
        [1, 22, "Thule", 9],
        [1, 22, "Bermuda", 13],
        [1, 22, "Atlantic", 16],
        [1, 51, "Baghdad", 12]
      ],
      [
        [0, 52, "Kabul", 12]
      ],
      [
        [1, 6, "Anchorage", 9],
        [1, 6, "Alaska"]
      ],
      [
        [0, 4, "Anchorage", 9],
        [0, 4, "Adak", 9],
        [0, 4, "Atka", 9],
        [0, 4, "Alaska"],
        [0, 4, "Aleutian"]
      ],
      [
        [1, 7, "Anchorage", 9],
        [1, 7, "Juneau", 9],
        [1, 7, "Nome", 9],
        [1, 7, "Yakutat", 9],
        [1, 7, "Alaska"]
      ],
      [
        [0, 6, "Anchorage", 9],
        [0, 6, "Juneau", 9],
        [0, 6, "Nome", 9],
        [0, 6, "Yakutat", 9],
        [0, 6, "Alaska"]
      ],
      [
        [1, 57, "Aqtobe", 12]
      ],
      [
        [0, 51, "Aqtobe", 12],
        [0, 54, "Aqtobe", 12],
        [0, 57, "Aqtobe", 12]
      ],
      [
        [1, 59, "Almaty", 12]
      ],
      [
        [0, 54, "Almaty", 12],
        [0, 57, "Almaty", 12]
      ],
      [
        [1, 51, "Yerevan", 12],
        [1, 54, "Yerevan", 12],
        [1, 22, "Boa_Vista", 9],
        [1, 22, "Campo_Grande", 9],
        [1, 22, "Cuiaba", 9],
        [1, 22, "Manaus", 9],
        [1, 22, "Porto_Velho", 9],
        [1, 22, "West", 15]
      ],
      [
        [0, 47, "Yerevan", 12],
        [0, 51, "Yerevan", 12],
        [0, 14, "Boa_Vista", 9],
        [0, 14, "Campo_Grande", 9],
        [0, 14, "Cuiaba", 9],
        [0, 14, "Manaus", 9],
        [0, 14, "Porto_Velho", 9],
        [0, 14, "West", 15],
        [0, 32, "Amsterdam", 18]
      ],
      [
        [1, 76, "Anadyr", 12],
        [1, 79, "Anadyr", 12],
        [1, 81, "Anadyr", 12]
      ],
      [
        [0, 74, "Anadyr", 12],
        [0, 76, "Anadyr", 12],
        [0, 79, "Anadyr", 12]
      ],
      [
        [0, 13, "Curacao", 9],
        [0, 13, "Aruba", 9]
      ],
      [
        [1, 22, "Halifax", 9],
        [1, 22, "Blanc-Sablon", 9],
        [1, 22, "Glace_Bay", 9],
        [1, 22, "Moncton", 9],
        [1, 22, "Pangnirtung", 9],
        [1, 22, "Puerto_Rico", 9],
        [1, 22, "Atlantic", 16]
      ],
      [
        [1, 54, "Aqtau", 12],
        [1, 57, "Aqtau", 12],
        [1, 57, "Aqtobe", 12]
      ],
      [
        [0, 51, "Aqtau", 12],
        [0, 54, "Aqtau", 12],
        [0, 54, "Aqtobe", 12]
      ],
      [
        [1, 22, "Buenos_Aires", 9],
        [1, 25, "Buenos_Aires", 9],
        [1, 22, "Buenos_Aires", 2],
        [1, 22, "Catamarca", 2],
        [1, 22, "ComodRivadavia", 2],
        [1, 22, "Cordoba", 2],
        [1, 22, "Jujuy", 2],
        [1, 22, "La_Rioja", 2],
        [1, 22, "Mendoza", 2],
        [1, 22, "Rio_Gallegos", 2],
        [1, 22, "San_Juan", 2],
        [1, 22, "Tucuman", 2],
        [1, 22, "Ushuaia", 2],
        [1, 22, "Catamarca", 9],
        [1, 22, "Cordoba", 9],
        [1, 22, "Jujuy", 9],
        [1, 22, "Mendoza", 9],
        [1, 22, "Rosario", 9],
        [1, 22, "Palmer", 10],
        [1, 25, "Buenos_Aires", 2],
        [1, 25, "Catamarca", 2],
        [1, 25, "ComodRivadavia", 2],
        [1, 25, "Cordoba", 2],
        [1, 25, "Jujuy", 2],
        [1, 25, "La_Rioja", 2],
        [1, 25, "Mendoza", 2],
        [1, 25, "Rio_Gallegos", 2],
        [1, 25, "San_Juan", 2],
        [1, 25, "Tucuman", 2],
        [1, 25, "Ushuaia", 2],
        [1, 25, "Catamarca", 9],
        [1, 25, "Cordoba", 9],
        [1, 25, "Jujuy", 9],
        [1, 25, "Mendoza", 9],
        [1, 25, "Rosario", 9],
        [1, 25, "Palmer", 10]
      ],
      [
        [0, 22, "Buenos_Aires", 9],
        [0, 14, "Buenos_Aires", 9],
        [0, 22, "Buenos_Aires", 2],
        [0, 22, "Catamarca", 2],
        [0, 22, "ComodRivadavia", 2],
        [0, 22, "Cordoba", 2],
        [0, 22, "Jujuy", 2],
        [0, 22, "La_Rioja", 2],
        [0, 22, "Mendoza", 2],
        [0, 22, "Rio_Gallegos", 2],
        [0, 22, "San_Juan", 2],
        [0, 22, "Tucuman", 2],
        [0, 22, "Ushuaia", 2],
        [0, 22, "Catamarca", 9],
        [0, 22, "Cordoba", 9],
        [0, 22, "Jujuy", 9],
        [0, 22, "Mendoza", 9],
        [0, 22, "Rosario", 9],
        [0, 22, "Palmer", 10],
        [0, 14, "Buenos_Aires", 2],
        [0, 14, "Catamarca", 2],
        [0, 14, "ComodRivadavia", 2],
        [0, 14, "Cordoba", 2],
        [0, 14, "Jujuy", 2],
        [0, 14, "La_Rioja", 2],
        [0, 14, "Mendoza", 2],
        [0, 14, "Rio_Gallegos", 2],
        [0, 14, "San_Juan", 2],
        [0, 14, "Tucuman", 2],
        [0, 14, "Ushuaia", 2],
        [0, 14, "Catamarca", 9],
        [0, 14, "Cordoba", 9],
        [0, 14, "Jujuy", 9],
        [0, 14, "Mendoza", 9],
        [0, 14, "Rosario", 9],
        [0, 14, "Palmer", 10]
      ],
      [
        [1, 54, "Ashkhabad", 12],
        [1, 57, "Ashkhabad", 12],
        [1, 54, "Ashgabat", 12],
        [1, 57, "Ashgabat", 12]
      ],
      [
        [0, 51, "Ashkhabad", 12],
        [0, 54, "Ashkhabad", 12],
        [0, 51, "Ashgabat", 12],
        [0, 54, "Ashgabat", 12]
      ],
      [
        [0, 47, "Riyadh", 12],
        [0, 14, "Anguilla", 9],
        [0, 14, "Antigua", 9],
        [0, 14, "Aruba", 9],
        [0, 14, "Barbados", 9],
        [0, 14, "Blanc-Sablon", 9],
        [0, 14, "Curacao", 9],
        [0, 14, "Dominica", 9],
        [0, 14, "Glace_Bay", 9],
        [0, 14, "Goose_Bay", 9],
        [0, 14, "Grenada", 9],
        [0, 14, "Guadeloupe", 9],
        [0, 14, "Halifax", 9],
        [0, 14, "Martinique", 9],
        [0, 14, "Miquelon", 9],
        [0, 14, "Moncton", 9],
        [0, 14, "Montserrat", 9],
        [0, 14, "Pangnirtung", 9],
        [0, 14, "Port_of_Spain", 9],
        [0, 14, "Puerto_Rico", 9],
        [0, 14, "Santo_Domingo", 9],
        [0, 14, "St_Kitts", 9],
        [0, 14, "St_Lucia", 9],
        [0, 14, "St_Thomas", 9],
        [0, 14, "St_Vincent", 9],
        [0, 14, "Thule", 9],
        [0, 14, "Tortola", 9],
        [0, 14, "Virgin", 9],
        [0, 14, "Bermuda", 13],
        [0, 14, "Atlantic", 16],
        [0, 47, "Aden", 12],
        [0, 47, "Baghdad", 12],
        [0, 47, "Bahrain", 12],
        [0, 47, "Kuwait", 12],
        [0, 47, "Qatar", 12]
      ],
      [
        [1, 22, "Halifax", 9],
        [1, 22, "Blanc-Sablon", 9],
        [1, 22, "Glace_Bay", 9],
        [1, 22, "Moncton", 9],
        [1, 22, "Pangnirtung", 9],
        [1, 22, "Puerto_Rico", 9],
        [1, 22, "Atlantic", 16]
      ],
      [
        [1, 31, "Azores", 13]
      ],
      [
        [1, 28, "Azores", 13],
        [1, 31, "Azores", 13]
      ],
      [
        [0, 28, "Azores", 13],
        [0, 25, "Azores", 13]
      ],
      [
        [1, 51, "Baku", 12],
        [1, 54, "Baku", 12]
      ],
      [
        [0, 47, "Baku", 12],
        [0, 51, "Baku", 12]
      ],
      [
        [1, 51, "Baku", 12],
        [1, 54, "Baku", 12]
      ],
      [
        [0, 47, "Baku", 12],
        [0, 51, "Baku", 12]
      ],
      [
        [1, 42, "London", 18],
        [1, 42, "Belfast", 18],
        [1, 42, "Gibraltar", 18],
        [1, 42, "Guernsey", 18],
        [1, 42, "Isle_of_Man", 18],
        [1, 42, "Jersey", 18],
        [1, 42, "GB"],
        [1, 42, "GB-Eire"]
      ],
      [
        [1, 4, "Adak", 9],
        [1, 4, "Atka", 9],
        [1, 4, "Nome", 9],
        [1, 4, "Aleutian"],
        [0, 57, "Dacca", 12],
        [0, 57, "Dhaka", 12]
      ],
      [
        [0, 43, "Mogadishu"],
        [0, 43, "Kampala"],
        [0, 43, "Nairobi"]
      ],
      [
        [0, 46, "Nairobi"],
        [0, 46, "Dar_es_Salaam"],
        [0, 46, "Kampala"]
      ],
      [
        [0, 15, "Barbados", 9],
        [0, 27, "Banjul"],
        [0, 41, "Tiraspol", 18],
        [0, 41, "Chisinau", 18]
      ],
      [
        [0, 63, "Brunei", 12],
        [0, 65, "Brunei", 12]
      ],
      [
        [1, 66, "Kuching", 12]
      ],
      [
        [0, 63, "Kuching", 12],
        [0, 65, "Kuching", 12]
      ],
      [
        [1, 19, "La_Paz", 9]
      ],
      [
        [0, 14, "La_Paz", 9]
      ],
      [
        [1, 25, "Sao_Paulo", 9],
        [1, 25, "Araguaina", 9],
        [1, 25, "Bahia", 9],
        [1, 25, "Belem", 9],
        [1, 25, "Fortaleza", 9],
        [1, 25, "Maceio", 9],
        [1, 25, "Recife", 9],
        [1, 25, "East", 15]
      ],
      [
        [0, 22, "Sao_Paulo", 9],
        [0, 22, "Araguaina", 9],
        [0, 22, "Bahia", 9],
        [0, 22, "Belem", 9],
        [0, 22, "Fortaleza", 9],
        [0, 22, "Maceio", 9],
        [0, 22, "Recife", 9],
        [0, 22, "East", 15]
      ],
      [
        [0, 35, "London", 18],
        [1, 35, "London", 18],
        [0, 2, "Adak", 9],
        [0, 2, "Atka", 9],
        [0, 2, "Nome", 9],
        [0, 2, "Midway", 21],
        [0, 2, "Pago_Pago", 21],
        [0, 2, "Samoa", 21],
        [0, 2, "Aleutian"],
        [0, 2, "Samoa"],
        [0, 35, "Belfast", 18],
        [0, 35, "Guernsey", 18],
        [0, 35, "Isle_of_Man", 18],
        [0, 35, "Jersey", 18],
        [0, 35, "GB"],
        [0, 35, "GB-Eire"],
        [1, 35, "Eire"],
        [1, 35, "Belfast", 18],
        [1, 35, "Dublin", 18],
        [1, 35, "Gibraltar", 18],
        [1, 35, "Guernsey", 18],
        [1, 35, "Isle_of_Man", 18],
        [1, 35, "Jersey", 18],
        [1, 35, "GB"],
        [1, 35, "GB-Eire"]
      ],
      [
        [0, 57, "Thimbu", 12],
        [0, 57, "Thimphu", 12]
      ],
      [
        [0, 58, "Calcutta", 12],
        [0, 58, "Dacca", 12],
        [0, 58, "Dhaka", 12],
        [0, 58, "Rangoon", 12]
      ],
      [
        [0, 28, "Canary", 13]
      ],
      [
        [1, 6, "Anchorage", 9],
        [1, 6, "Alaska"]
      ],
      [
        [0, 70, "Adelaide", 14],
        [1, 47, "Gaborone"],
        [1, 47, "Khartoum"]
      ],
      [
        [0, 4, "Anchorage", 9],
        [0, 4, "Alaska"],
        [0, 42, "Khartoum"],
        [0, 42, "Blantyre"],
        [0, 42, "Gaborone"],
        [0, 42, "Harare"],
        [0, 42, "Kigali"],
        [0, 42, "Lusaka"],
        [0, 42, "Maputo"],
        [0, 42, "Windhoek"]
      ],
      [
        [1, 6, "Anchorage", 9],
        [1, 6, "Alaska"]
      ],
      [
        [1, 14, "Rankin_Inlet", 9]
      ],
      [
        [1, 11, "Chicago", 9],
        [1, 14, "Havana", 9],
        [1, 14, "Cuba"],
        [1, 11, "Atikokan", 9],
        [1, 11, "Belize", 9],
        [1, 11, "Cambridge_Bay", 9],
        [1, 11, "Cancun", 9],
        [1, 11, "Chihuahua", 9],
        [1, 11, "Coral_Harbour", 9],
        [1, 11, "Costa_Rica", 9],
        [1, 11, "El_Salvador", 9],
        [1, 11, "Fort_Wayne", 9],
        [1, 11, "Guatemala", 9],
        [1, 11, "Indianapolis", 4],
        [1, 11, "Knox", 4],
        [1, 11, "Marengo", 4],
        [1, 11, "Petersburg", 4],
        [1, 11, "Vevay", 4],
        [1, 11, "Vincennes", 4],
        [1, 11, "Winamac", 4],
        [1, 11, "Indianapolis", 9],
        [1, 11, "Iqaluit", 9],
        [1, 11, "Louisville", 6],
        [1, 11, "Monticello", 6],
        [1, 11, "Knox_IN", 9],
        [1, 11, "Louisville", 9],
        [1, 11, "Managua", 9],
        [1, 11, "Menominee", 9],
        [1, 11, "Merida", 9],
        [1, 11, "Mexico_City", 9],
        [1, 11, "Monterrey", 9],
        [1, 11, "Center", 8],
        [1, 11, "New_Salem", 8],
        [1, 11, "Pangnirtung", 9],
        [1, 11, "Rainy_River", 9],
        [1, 11, "Rankin_Inlet", 9],
        [1, 11, "Tegucigalpa", 9],
        [1, 11, "Winnipeg", 9],
        [1, 11, "Central", 16],
        [1, 11, "CST6CDT"],
        [1, 11, "General", 20],
        [1, 11, "Central"],
        [1, 11, "East-Indiana"],
        [1, 11, "Indiana-Starke"],
        [1, 69, "Shanghai", 12],
        [1, 69, "Chongqing", 12],
        [1, 69, "Chungking", 12],
        [1, 69, "Harbin", 12],
        [1, 69, "Kashgar", 12],
        [1, 69, "Taipei", 12],
        [1, 69, "Urumqi", 12],
        [1, 69, "PRC"],
        [1, 69, "ROC"]
      ],
      [
        [1, 47, "Berlin", 18],
        [1, 47, "CET"]
      ],
      [
        [1, 42, "Berlin", 18],
        [1, 47, "Kaliningrad", 18],
        [1, 42, "Algiers"],
        [1, 42, "Ceuta"],
        [1, 42, "Tripoli"],
        [1, 42, "Tunis"],
        [1, 42, "Longyearbyen", 11],
        [1, 42, "Jan_Mayen", 13],
        [1, 42, "CET"],
        [1, 42, "Amsterdam", 18],
        [1, 42, "Andorra", 18],
        [1, 42, "Athens", 18],
        [1, 42, "Belgrade", 18],
        [1, 42, "Bratislava", 18],
        [1, 42, "Brussels", 18],
        [1, 42, "Budapest", 18],
        [1, 42, "Chisinau", 18],
        [1, 42, "Copenhagen", 18],
        [1, 42, "Gibraltar", 18],
        [1, 42, "Kaliningrad", 18],
        [1, 42, "Kiev", 18],
        [1, 42, "Lisbon", 18],
        [1, 42, "Ljubljana", 18],
        [1, 42, "Luxembourg", 18],
        [1, 42, "Madrid", 18],
        [1, 42, "Malta", 18],
        [1, 42, "Minsk", 18],
        [1, 42, "Monaco", 18],
        [1, 42, "Oslo", 18],
        [1, 42, "Paris", 18],
        [1, 42, "Podgorica", 18],
        [1, 42, "Prague", 18],
        [1, 42, "Riga", 18],
        [1, 42, "Rome", 18],
        [1, 42, "San_Marino", 18],
        [1, 42, "Sarajevo", 18],
        [1, 42, "Simferopol", 18],
        [1, 42, "Skopje", 18],
        [1, 42, "Sofia", 18],
        [1, 42, "Stockholm", 18],
        [1, 42, "Tallinn", 18],
        [1, 42, "Tirane", 18],
        [1, 42, "Tiraspol", 18],
        [1, 42, "Uzhgorod", 18],
        [1, 42, "Vaduz", 18],
        [1, 42, "Vatican", 18],
        [1, 42, "Vienna", 18],
        [1, 42, "Vilnius", 18],
        [1, 42, "Warsaw", 18],
        [1, 42, "Zagreb", 18],
        [1, 42, "Zaporozhye", 18],
        [1, 42, "Zurich", 18],
        [1, 42, "Libya"],
        [1, 42, "Poland"],
        [1, 42, "Portugal"],
        [1, 42, "WET"]
      ],
      [
        [0, 35, "Berlin", 18],
        [0, 35, "Algiers"],
        [0, 35, "Casablanca"],
        [0, 35, "Ceuta"],
        [0, 35, "Tripoli"],
        [0, 35, "Tunis"],
        [0, 35, "Longyearbyen", 11],
        [0, 35, "Jan_Mayen", 13],
        [0, 35, "CET"],
        [0, 35, "Amsterdam", 18],
        [0, 35, "Andorra", 18],
        [0, 35, "Athens", 18],
        [0, 35, "Belgrade", 18],
        [0, 35, "Bratislava", 18],
        [0, 35, "Brussels", 18],
        [0, 35, "Budapest", 18],
        [0, 35, "Chisinau", 18],
        [0, 35, "Copenhagen", 18],
        [0, 35, "Gibraltar", 18],
        [0, 35, "Kaliningrad", 18],
        [0, 35, "Kiev", 18],
        [0, 35, "Lisbon", 18],
        [0, 35, "Ljubljana", 18],
        [0, 35, "Luxembourg", 18],
        [0, 35, "Madrid", 18],
        [0, 35, "Malta", 18],
        [0, 35, "Minsk", 18],
        [0, 35, "Monaco", 18],
        [0, 35, "Oslo", 18],
        [0, 35, "Paris", 18],
        [0, 35, "Podgorica", 18],
        [0, 35, "Prague", 18],
        [0, 35, "Riga", 18],
        [0, 35, "Rome", 18],
        [0, 35, "San_Marino", 18],
        [0, 35, "Sarajevo", 18],
        [0, 35, "Simferopol", 18],
        [0, 35, "Skopje", 18],
        [0, 35, "Sofia", 18],
        [0, 35, "Stockholm", 18],
        [0, 35, "Tallinn", 18],
        [0, 35, "Tirane", 18],
        [0, 35, "Tiraspol", 18],
        [0, 35, "Uzhgorod", 18],
        [0, 35, "Vaduz", 18],
        [0, 35, "Vatican", 18],
        [0, 35, "Vienna", 18],
        [0, 35, "Vilnius", 18],
        [0, 35, "Warsaw", 18],
        [0, 35, "Zagreb", 18],
        [0, 35, "Zaporozhye", 18],
        [0, 35, "Zurich", 18],
        [0, 35, "Libya"],
        [0, 35, "Poland"],
        [0, 35, "Portugal"],
        [0, 35, "WET"],
        [0, 42, "Kaliningrad", 18]
      ],
      [
        [1, 28, "Scoresbysund", 9]
      ],
      [
        [0, 25, "Scoresbysund", 9]
      ],
      [
        [1, 80, "Chatham", 21],
        [1, 80, "NZ-CHAT"]
      ],
      [
        [0, 78, "Chatham", 21],
        [0, 78, "NZ-CHAT"]
      ],
      [
        [0, 67, "Harbin", 12],
        [0, 69, "Harbin", 12]
      ],
      [
        [1, 10, "Belize", 9]
      ],
      [
        [1, 72, "Choibalsan", 12]
      ],
      [
        [0, 69, "Choibalsan", 12]
      ],
      [
        [0, 65, "Dili", 12],
        [0, 65, "Makassar", 12],
        [0, 65, "Pontianak", 12],
        [0, 65, "Ujung_Pandang", 12]
      ],
      [
        [0, 69, "Sakhalin", 12]
      ],
      [
        [1, 5, "Rarotonga", 21]
      ],
      [
        [0, 4, "Rarotonga", 21]
      ],
      [
        [1, 22, "Santiago", 9],
        [1, 14, "Santiago", 9],
        [1, 22, "Palmer", 10],
        [1, 22, "Continental", 17],
        [1, 14, "Continental", 17]
      ],
      [
        [0, 14, "Santiago", 9],
        [0, 11, "Santiago", 9],
        [0, 14, "Palmer", 10],
        [0, 14, "Continental", 17],
        [0, 11, "Continental", 17]
      ],
      [
        [1, 14, "Bogota", 9]
      ],
      [
        [0, 11, "Bogota", 9]
      ],
      [
        [1, 11, "Chicago", 9],
        [1, 11, "Atikokan", 9],
        [1, 11, "Coral_Harbour", 9],
        [1, 11, "Fort_Wayne", 9],
        [1, 11, "Indianapolis", 4],
        [1, 11, "Knox", 4],
        [1, 11, "Marengo", 4],
        [1, 11, "Petersburg", 4],
        [1, 11, "Vevay", 4],
        [1, 11, "Vincennes", 4],
        [1, 11, "Winamac", 4],
        [1, 11, "Indianapolis", 9],
        [1, 11, "Louisville", 6],
        [1, 11, "Monticello", 6],
        [1, 11, "Knox_IN", 9],
        [1, 11, "Louisville", 9],
        [1, 11, "Menominee", 9],
        [1, 11, "Rainy_River", 9],
        [1, 11, "Rankin_Inlet", 9],
        [1, 11, "Winnipeg", 9],
        [1, 11, "Central", 16],
        [1, 11, "CST6CDT"],
        [1, 11, "Central"],
        [1, 11, "East-Indiana"],
        [1, 11, "Indiana-Starke"]
      ],
      [
        [0, 9, "Chicago", 9],
        [0, 11, "Havana", 9],
        [0, 11, "Cuba"],
        [0, 9, "Atikokan", 9],
        [0, 9, "Belize", 9],
        [0, 9, "Cambridge_Bay", 9],
        [0, 9, "Cancun", 9],
        [0, 9, "Chihuahua", 9],
        [0, 9, "Coral_Harbour", 9],
        [0, 9, "Costa_Rica", 9],
        [0, 9, "Detroit", 9],
        [0, 9, "El_Salvador", 9],
        [0, 9, "Fort_Wayne", 9],
        [0, 9, "Guatemala", 9],
        [0, 9, "Hermosillo", 9],
        [0, 9, "Indianapolis", 4],
        [0, 9, "Knox", 4],
        [0, 9, "Marengo", 4],
        [0, 9, "Petersburg", 4],
        [0, 9, "Vevay", 4],
        [0, 9, "Vincennes", 4],
        [0, 9, "Winamac", 4],
        [0, 9, "Indianapolis", 9],
        [0, 9, "Iqaluit", 9],
        [0, 9, "Louisville", 6],
        [0, 9, "Monticello", 6],
        [0, 9, "Knox_IN", 9],
        [0, 9, "Louisville", 9],
        [0, 9, "Managua", 9],
        [0, 9, "Mazatlan", 9],
        [0, 9, "Menominee", 9],
        [0, 9, "Merida", 9],
        [0, 9, "Mexico_City", 9],
        [0, 9, "Monterrey", 9],
        [0, 9, "Center", 8],
        [0, 9, "New_Salem", 8],
        [0, 9, "Pangnirtung", 9],
        [0, 9, "Rainy_River", 9],
        [0, 9, "Rankin_Inlet", 9],
        [0, 9, "Regina", 9],
        [0, 9, "Swift_Current", 9],
        [0, 9, "Tegucigalpa", 9],
        [0, 9, "Winnipeg", 9],
        [0, 9, "Central", 16],
        [0, 9, "East-Saskatchewan", 16],
        [0, 9, "Saskatchewan", 16],
        [0, 9, "CST6CDT"],
        [0, 9, "BajaSur", 20],
        [0, 9, "General", 20],
        [0, 9, "Central"],
        [0, 9, "East-Indiana"],
        [0, 9, "Indiana-Starke"],
        [0, 9, "Michigan"],
        [0, 65, "Chongqing", 12],
        [0, 65, "Chungking", 12],
        [0, 65, "Harbin", 12],
        [0, 65, "Kashgar", 12],
        [0, 65, "Macao", 12],
        [0, 65, "Macau", 12],
        [0, 65, "Shanghai", 12],
        [0, 65, "Taipei", 12],
        [0, 65, "Urumqi", 12],
        [0, 65, "PRC"],
        [0, 65, "ROC"],
        [0, 70, "Jayapura", 12],
        [0, 70, "Adelaide", 14],
        [0, 70, "Broken_Hill", 14],
        [0, 70, "Darwin", 14],
        [0, 70, "North", 14],
        [0, 70, "South", 14],
        [0, 70, "Yancowinna", 14],
        [1, 73, "Adelaide", 14],
        [1, 73, "Broken_Hill", 14],
        [1, 73, "Darwin", 14],
        [1, 73, "North", 14],
        [1, 73, "South", 14],
        [1, 73, "Yancowinna", 14]
      ],
      [
        [1, 28, "Cape_Verde", 13]
      ],
      [
        [0, 28, "Cape_Verde", 13],
        [0, 25, "Cape_Verde", 13]
      ],
      [
        [0, 68, "Eucla", 14],
        [1, 71, "Eucla", 14]
      ],
      [
        [1, 11, "Chicago", 9],
        [1, 11, "Atikokan", 9],
        [1, 11, "Coral_Harbour", 9],
        [1, 11, "Fort_Wayne", 9],
        [1, 11, "Indianapolis", 4],
        [1, 11, "Knox", 4],
        [1, 11, "Marengo", 4],
        [1, 11, "Petersburg", 4],
        [1, 11, "Vevay", 4],
        [1, 11, "Vincennes", 4],
        [1, 11, "Winamac", 4],
        [1, 11, "Indianapolis", 9],
        [1, 11, "Louisville", 6],
        [1, 11, "Monticello", 6],
        [1, 11, "Knox_IN", 9],
        [1, 11, "Louisville", 9],
        [1, 11, "Menominee", 9],
        [1, 11, "Mexico_City", 9],
        [1, 11, "Rainy_River", 9],
        [1, 11, "Rankin_Inlet", 9],
        [1, 11, "Winnipeg", 9],
        [1, 11, "Central", 16],
        [1, 11, "CST6CDT"],
        [1, 11, "General", 20],
        [1, 11, "Central"],
        [1, 11, "East-Indiana"],
        [1, 11, "Indiana-Starke"]
      ],
      [
        [0, 72, "Guam", 21],
        [0, 72, "Saipan", 21]
      ],
      [
        [0, 57, "Dacca", 12],
        [0, 57, "Dhaka", 12]
      ],
      [
        [0, 59, "Davis", 10]
      ],
      [
        [0, 72, "DumontDUrville", 10]
      ],
      [
        [1, 57, "Dushanbe", 12],
        [1, 59, "Dushanbe", 12]
      ],
      [
        [0, 54, "Dushanbe", 12],
        [0, 57, "Dushanbe", 12]
      ],
      [
        [1, 11, "EasterIsland", 17],
        [1, 9, "EasterIsland", 17],
        [1, 11, "Easter", 21],
        [1, 9, "Easter", 21]
      ],
      [
        [0, 9, "EasterIsland", 17],
        [0, 8, "EasterIsland", 17],
        [0, 9, "Easter", 21],
        [0, 8, "Easter", 21],
        [1, 51, "Antananarivo", 19]
      ],
      [
        [0, 47, "Khartoum"],
        [0, 47, "Addis_Ababa"],
        [0, 47, "Asmara"],
        [0, 47, "Asmera"],
        [0, 47, "Dar_es_Salaam"],
        [0, 47, "Djibouti"],
        [0, 47, "Kampala"],
        [0, 47, "Mogadishu"],
        [0, 47, "Nairobi"],
        [0, 47, "Antananarivo", 19],
        [0, 47, "Comoro", 19],
        [0, 47, "Mayotte", 19]
      ],
      [
        [0, 11, "Guayaquil", 9],
        [0, 11, "Galapagos", 21]
      ],
      [
        [1, 22, "Iqaluit", 9]
      ],
      [
        [1, 14, "New_York", 9],
        [1, 14, "Cancun", 9],
        [1, 14, "Detroit", 9],
        [1, 14, "Fort_Wayne", 9],
        [1, 14, "Grand_Turk", 9],
        [1, 14, "Indianapolis", 4],
        [1, 14, "Marengo", 4],
        [1, 14, "Vevay", 4],
        [1, 14, "Vincennes", 4],
        [1, 14, "Winamac", 4],
        [1, 14, "Indianapolis", 9],
        [1, 14, "Iqaluit", 9],
        [1, 14, "Jamaica", 9],
        [1, 14, "Louisville", 6],
        [1, 14, "Monticello", 6],
        [1, 14, "Louisville", 9],
        [1, 14, "Montreal", 9],
        [1, 14, "Nassau", 9],
        [1, 14, "Nipigon", 9],
        [1, 14, "Pangnirtung", 9],
        [1, 14, "Port-au-Prince", 9],
        [1, 14, "Santo_Domingo", 9],
        [1, 14, "Thunder_Bay", 9],
        [1, 14, "Toronto", 9],
        [1, 14, "Eastern", 16],
        [1, 14, "EST"],
        [1, 14, "EST5EDT"],
        [1, 14, "Jamaica"],
        [1, 14, "East-Indiana"],
        [1, 14, "Eastern"],
        [1, 14, "Michigan"]
      ],
      [
        [1, 47, "Helsinki", 18],
        [1, 47, "Cairo"],
        [1, 47, "Amman", 12],
        [1, 47, "Beirut", 12],
        [1, 47, "Damascus", 12],
        [1, 47, "Gaza", 12],
        [1, 47, "Istanbul", 12],
        [1, 47, "Nicosia", 12],
        [1, 47, "EET"],
        [1, 47, "Egypt"],
        [1, 47, "Athens", 18],
        [1, 47, "Bucharest", 18],
        [1, 47, "Chisinau", 18],
        [1, 47, "Istanbul", 18],
        [1, 47, "Kaliningrad", 18],
        [1, 47, "Kiev", 18],
        [1, 47, "Mariehamn", 18],
        [1, 47, "Minsk", 18],
        [1, 47, "Moscow", 18],
        [1, 47, "Nicosia", 18],
        [1, 47, "Riga", 18],
        [1, 47, "Simferopol", 18],
        [1, 47, "Sofia", 18],
        [1, 47, "Tallinn", 18],
        [1, 47, "Tiraspol", 18],
        [1, 47, "Uzhgorod", 18],
        [1, 47, "Vilnius", 18],
        [1, 47, "Warsaw", 18],
        [1, 47, "Zaporozhye", 18],
        [1, 47, "Poland"],
        [1, 47, "Turkey"],
        [1, 47, "W-SU"]
      ],
      [
        [0, 42, "Helsinki", 18],
        [1, 47, "Gaza", 12],
        [0, 42, "Cairo"],
        [0, 42, "Tripoli"],
        [0, 42, "Amman", 12],
        [0, 42, "Beirut", 12],
        [0, 42, "Damascus", 12],
        [0, 42, "Gaza", 12],
        [0, 42, "Istanbul", 12],
        [0, 42, "Nicosia", 12],
        [0, 42, "EET"],
        [0, 42, "Egypt"],
        [0, 42, "Athens", 18],
        [0, 42, "Bucharest", 18],
        [0, 42, "Chisinau", 18],
        [0, 42, "Istanbul", 18],
        [0, 42, "Kaliningrad", 18],
        [0, 42, "Kiev", 18],
        [0, 42, "Mariehamn", 18],
        [0, 42, "Minsk", 18],
        [0, 42, "Moscow", 18],
        [0, 42, "Nicosia", 18],
        [0, 42, "Riga", 18],
        [0, 42, "Simferopol", 18],
        [0, 42, "Sofia", 18],
        [0, 42, "Tallinn", 18],
        [0, 42, "Tiraspol", 18],
        [0, 42, "Uzhgorod", 18],
        [0, 42, "Vilnius", 18],
        [0, 42, "Warsaw", 18],
        [0, 42, "Zaporozhye", 18],
        [0, 42, "Libya"],
        [0, 42, "Poland"],
        [0, 42, "Turkey"],
        [0, 42, "W-SU"]
      ],
      [
        [1, 31, "Scoresbysund", 9]
      ],
      [
        [0, 28, "Scoresbysund", 9]
      ],
      [
        [1, 13, "Santo_Domingo", 9]
      ],
      [
        [0, 69, "Jayapura", 12]
      ],
      [
        [1, 14, "New_York", 9],
        [1, 14, "Detroit", 9],
        [1, 14, "Iqaluit", 9],
        [1, 14, "Montreal", 9],
        [1, 14, "Nipigon", 9],
        [1, 14, "Thunder_Bay", 9],
        [1, 14, "Toronto", 9],
        [1, 14, "Eastern", 16],
        [1, 14, "EST"],
        [1, 14, "EST5EDT"],
        [1, 14, "Eastern"],
        [1, 14, "Michigan"]
      ],
      [
        [0, 11, "New_York", 9],
        [0, 11, "Antigua", 9],
        [0, 11, "Atikokan", 9],
        [0, 11, "Cambridge_Bay", 9],
        [0, 11, "Cancun", 9],
        [0, 11, "Cayman", 9],
        [0, 11, "Chicago", 9],
        [0, 11, "Coral_Harbour", 9],
        [0, 11, "Detroit", 9],
        [0, 11, "Fort_Wayne", 9],
        [0, 11, "Grand_Turk", 9],
        [0, 11, "Indianapolis", 4],
        [0, 11, "Knox", 4],
        [0, 11, "Marengo", 4],
        [0, 11, "Petersburg", 4],
        [0, 11, "Vevay", 4],
        [0, 11, "Vincennes", 4],
        [0, 11, "Winamac", 4],
        [0, 11, "Indianapolis", 9],
        [0, 11, "Iqaluit", 9],
        [0, 11, "Jamaica", 9],
        [0, 11, "Louisville", 6],
        [0, 11, "Monticello", 6],
        [0, 11, "Knox_IN", 9],
        [0, 11, "Louisville", 9],
        [0, 11, "Managua", 9],
        [0, 11, "Menominee", 9],
        [0, 11, "Merida", 9],
        [0, 11, "Montreal", 9],
        [0, 11, "Nassau", 9],
        [0, 11, "Nipigon", 9],
        [0, 11, "Panama", 9],
        [0, 11, "Pangnirtung", 9],
        [0, 11, "Port-au-Prince", 9],
        [0, 11, "Rankin_Inlet", 9],
        [0, 11, "Santo_Domingo", 9],
        [0, 11, "Thunder_Bay", 9],
        [0, 11, "Toronto", 9],
        [0, 11, "Eastern", 16],
        [0, 11, "EST"],
        [0, 11, "EST5EDT"],
        [0, 11, "Jamaica"],
        [0, 11, "Central"],
        [0, 11, "East-Indiana"],
        [0, 11, "Eastern"],
        [0, 11, "Indiana-Starke"],
        [0, 11, "Michigan"],
        [0, 72, "ACT", 14],
        [0, 72, "Brisbane", 14],
        [0, 72, "Canberra", 14],
        [0, 72, "Currie", 14],
        [0, 72, "Hobart", 14],
        [0, 72, "Lindeman", 14],
        [0, 72, "Melbourne", 14],
        [0, 72, "NSW", 14],
        [0, 72, "Queensland", 14],
        [0, 72, "Sydney", 14],
        [0, 72, "Tasmania", 14],
        [0, 72, "Victoria", 14],
        [1, 74, "Melbourne", 14],
        [1, 74, "ACT", 14],
        [1, 74, "Brisbane", 14],
        [1, 74, "Canberra", 14],
        [1, 74, "Currie", 14],
        [1, 74, "Hobart", 14],
        [1, 74, "Lindeman", 14],
        [1, 74, "NSW", 14],
        [1, 74, "Queensland", 14],
        [1, 74, "Sydney", 14],
        [1, 74, "Tasmania", 14],
        [1, 74, "Victoria", 14]
      ],
      [
        [1, 14, "New_York", 9],
        [1, 14, "Detroit", 9],
        [1, 14, "Iqaluit", 9],
        [1, 14, "Montreal", 9],
        [1, 14, "Nipigon", 9],
        [1, 14, "Thunder_Bay", 9],
        [1, 14, "Toronto", 9],
        [1, 14, "Eastern", 16],
        [1, 14, "EST"],
        [1, 14, "EST5EDT"],
        [1, 14, "Eastern"],
        [1, 14, "Michigan"]
      ],
      [
        [1, 79, "Fiji", 21]
      ],
      [
        [0, 76, "Fiji", 21]
      ],
      [
        [1, 22, "Stanley", 13],
        [1, 25, "Stanley", 13]
      ],
      [
        [0, 22, "Stanley", 13],
        [0, 14, "Stanley", 13]
      ],
      [
        [1, 28, "Noronha", 9],
        [1, 28, "DeNoronha", 15]
      ],
      [
        [0, 25, "Noronha", 9],
        [0, 25, "DeNoronha", 15]
      ],
      [
        [0, 51, "Aqtau", 12],
        [0, 54, "Aqtau", 12]
      ],
      [
        [1, 57, "Bishkek", 12],
        [1, 59, "Bishkek", 12]
      ],
      [
        [0, 54, "Bishkek", 12],
        [0, 57, "Bishkek", 12]
      ],
      [
        [0, 9, "Galapagos", 21]
      ],
      [
        [0, 6, "Gambier", 21]
      ],
      [
        [0, 16, "Guyana", 9]
      ],
      [
        [1, 51, "Tbilisi", 12],
        [1, 54, "Tbilisi", 12]
      ],
      [
        [0, 47, "Tbilisi", 12],
        [0, 51, "Tbilisi", 12]
      ],
      [
        [0, 22, "Cayenne", 9],
        [0, 14, "Cayenne", 9]
      ],
      [
        [1, 33, "Accra"]
      ],
      [
        [0, 31, "Abidjan"],
        [0, 31, "Accra"],
        [0, 31, "Bamako"],
        [0, 31, "Banjul"],
        [0, 31, "Bissau"],
        [0, 31, "Conakry"],
        [0, 31, "Dakar"],
        [0, 31, "Freetown"],
        [0, 31, "Malabo"],
        [0, 31, "Monrovia"],
        [0, 31, "Niamey"],
        [0, 31, "Nouakchott"],
        [0, 31, "Ouagadougou"],
        [0, 31, "Porto-Novo"],
        [0, 31, "Sao_Tome"],
        [0, 31, "Timbuktu"],
        [0, 31, "Danmarkshavn", 9],
        [0, 31, "Reykjavik", 13],
        [0, 31, "St_Helena", 13],
        [0, 31, "Eire"],
        [0, 31, "Belfast", 18],
        [0, 31, "Dublin", 18],
        [0, 31, "Gibraltar", 18],
        [0, 31, "Guernsey", 18],
        [0, 31, "Isle_of_Man", 18],
        [0, 31, "Jersey", 18],
        [0, 31, "London", 18],
        [0, 31, "GB"],
        [0, 31, "GB-Eire"],
        [0, 31, "Iceland"]
      ],
      [
        [0, 51, "Dubai", 12],
        [0, 51, "Bahrain", 12],
        [0, 51, "Muscat", 12],
        [0, 51, "Qatar", 12]
      ],
      [
        [0, 22, "Guyana", 9],
        [0, 16, "Guyana", 9],
        [0, 14, "Guyana", 9]
      ],
      [
        [1, 6, "Adak", 9],
        [1, 6, "Atka", 9],
        [1, 6, "Aleutian"]
      ],
      [
        [0, 4, "Adak", 9],
        [0, 4, "Atka", 9],
        [0, 4, "Aleutian"]
      ],
      [
        [1, 5, "Honolulu", 21],
        [1, 5, "HST"],
        [1, 5, "Hawaii"]
      ],
      [
        [1, 69, "Hong_Kong", 12],
        [1, 69, "Hongkong"]
      ],
      [
        [0, 65, "Hong_Kong", 12],
        [0, 65, "Hongkong"]
      ],
      [
        [1, 65, "Hovd", 12]
      ],
      [
        [0, 57, "Hovd", 12],
        [0, 59, "Hovd", 12]
      ],
      [
        [1, 5, "Honolulu", 21],
        [1, 5, "HST"],
        [1, 5, "Hawaii"]
      ],
      [
        [0, 4, "Honolulu", 21],
        [0, 3, "Honolulu", 21],
        [0, 4, "HST"],
        [0, 4, "Hawaii"],
        [0, 3, "HST"],
        [0, 3, "Hawaii"]
      ],
      [
        [1, 5, "Honolulu", 21],
        [1, 5, "HST"],
        [1, 5, "Hawaii"]
      ],
      [
        [0, 59, "Bangkok", 12],
        [0, 59, "Phnom_Penh", 12],
        [0, 59, "Saigon", 12],
        [0, 59, "Vientiane", 12],
        [0, 65, "Phnom_Penh", 12],
        [0, 65, "Saigon", 12],
        [0, 65, "Vientiane", 12]
      ],
      [
        [1, 51, "Jerusalem", 12],
        [1, 51, "Tel_Aviv", 12],
        [1, 51, "Israel"]
      ],
      [
        [1, 47, "Jerusalem", 12],
        [1, 47, "Gaza", 12],
        [1, 47, "Tel_Aviv", 12],
        [1, 47, "Israel"]
      ],
      [
        [1, 57, "Colombo", 12]
      ],
      [
        [0, 54, "Chagos", 19],
        [0, 57, "Chagos", 19]
      ],
      [
        [1, 52, "Tehran", 12],
        [1, 54, "Tehran", 12],
        [1, 52, "Iran"],
        [1, 54, "Iran"]
      ],
      [
        [1, 65, "Irkutsk", 12],
        [1, 69, "Irkutsk", 12]
      ],
      [
        [0, 59, "Irkutsk", 12],
        [0, 65, "Irkutsk", 12]
      ],
      [
        [0, 49, "Tehran", 12],
        [0, 51, "Tehran", 12],
        [0, 49, "Iran"],
        [0, 51, "Iran"]
      ],
      [
        [1, 31, "Reykjavik", 13],
        [1, 31, "Iceland"]
      ],
      [
        [0, 42, "Jerusalem", 12],
        [0, 28, "Reykjavik", 13],
        [0, 28, "Iceland"],
        [0, 55, "Calcutta", 12],
        [0, 55, "Colombo", 12],
        [0, 55, "Dacca", 12],
        [0, 55, "Dhaka", 12],
        [0, 55, "Karachi", 12],
        [0, 55, "Katmandu", 12],
        [0, 55, "Thimbu", 12],
        [0, 55, "Thimphu", 12],
        [1, 34, "Eire"],
        [1, 34, "Dublin", 18],
        [1, 58, "Calcutta", 12],
        [1, 58, "Colombo", 12],
        [1, 58, "Karachi", 12],
        [0, 35, "Eire"],
        [0, 35, "Dublin", 18],
        [1, 35, "Eire"],
        [1, 35, "Dublin", 18],
        [0, 42, "Gaza", 12],
        [0, 42, "Tel_Aviv", 12],
        [0, 42, "Israel"]
      ],
      [
        [0, 62, "Jakarta", 12]
      ],
      [
        [1, 72, "Tokyo", 12],
        [1, 72, "Japan"]
      ],
      [
        [0, 69, "Tokyo", 12],
        [0, 69, "Dili", 12],
        [0, 69, "Jakarta", 12],
        [0, 69, "Kuala_Lumpur", 12],
        [0, 69, "Kuching", 12],
        [0, 69, "Makassar", 12],
        [0, 69, "Manila", 12],
        [0, 69, "Pontianak", 12],
        [0, 69, "Rangoon", 12],
        [0, 69, "Sakhalin", 12],
        [0, 69, "Singapore", 12],
        [0, 69, "Ujung_Pandang", 12],
        [0, 69, "Japan"],
        [0, 69, "Nauru", 21],
        [0, 69, "Singapore"]
      ],
      [
        [0, 54, "Karachi", 12]
      ],
      [
        [0, 54, "Kashgar", 12],
        [0, 55, "Kashgar", 12]
      ],
      [
        [1, 69, "Seoul", 12],
        [1, 72, "Seoul", 12],
        [1, 69, "ROK"],
        [1, 72, "ROK"]
      ],
      [
        [1, 57, "Bishkek", 12]
      ],
      [
        [0, 54, "Bishkek", 12],
        [0, 57, "Bishkek", 12]
      ],
      [
        [1, 57, "Qyzylorda", 12]
      ],
      [
        [0, 51, "Qyzylorda", 12],
        [0, 54, "Qyzylorda", 12],
        [0, 57, "Qyzylorda", 12]
      ],
      [
        [0, 38, "Vilnius", 18]
      ],
      [
        [0, 74, "Kosrae", 21],
        [0, 76, "Kosrae", 21]
      ],
      [
        [1, 59, "Krasnoyarsk", 12],
        [1, 65, "Krasnoyarsk", 12]
      ],
      [
        [0, 57, "Krasnoyarsk", 12],
        [0, 59, "Krasnoyarsk", 12]
      ],
      [
        [0, 65, "Seoul", 12],
        [0, 67, "Seoul", 12],
        [0, 69, "Seoul", 12],
        [0, 65, "Pyongyang", 12],
        [0, 65, "ROK"],
        [0, 67, "Pyongyang", 12],
        [0, 67, "ROK"],
        [0, 69, "Pyongyang", 12],
        [0, 69, "ROK"]
      ],
      [
        [1, 47, "Samara", 18],
        [1, 51, "Samara", 18],
        [1, 54, "Samara", 18]
      ],
      [
        [0, 47, "Samara", 18],
        [0, 51, "Samara", 18]
      ],
      [
        [0, 0, "Kwajalein", 21],
        [0, 0, "Kwajalein"]
      ],
      [
        [0, 73, "Lord_Howe", 14],
        [1, 74, "Lord_Howe", 14],
        [1, 75, "Lord_Howe", 14],
        [0, 73, "LHI", 14],
        [1, 74, "LHI", 14],
        [1, 75, "LHI", 14]
      ],
      [
        [0, 4, "Kiritimati", 21],
        [0, 81, "Kiritimati", 21]
      ],
      [
        [0, 57, "Colombo", 12],
        [0, 58, "Colombo", 12]
      ],
      [
        [0, 59, "Chongqing", 12],
        [0, 59, "Chungking", 12]
      ],
      [
        [0, 29, "Monrovia"]
      ],
      [
        [1, 45, "Riga", 18]
      ],
      [
        [1, 35, "Madeira", 13]
      ],
      [
        [1, 31, "Madeira", 13]
      ],
      [
        [0, 28, "Madeira", 13]
      ],
      [
        [1, 74, "Magadan", 12],
        [1, 76, "Magadan", 12]
      ],
      [
        [0, 72, "Magadan", 12],
        [0, 74, "Magadan", 12]
      ],
      [
        [1, 62, "Singapore", 12],
        [1, 62, "Kuala_Lumpur", 12],
        [1, 62, "Singapore"]
      ],
      [
        [0, 59, "Singapore", 12],
        [0, 62, "Singapore", 12],
        [0, 63, "Singapore", 12],
        [0, 59, "Kuala_Lumpur", 12],
        [0, 59, "Singapore"],
        [0, 62, "Kuala_Lumpur", 12],
        [0, 62, "Singapore"],
        [0, 63, "Kuala_Lumpur", 12],
        [0, 63, "Singapore"]
      ],
      [
        [0, 5, "Marquesas", 21]
      ],
      [
        [0, 57, "Mawson", 10]
      ],
      [
        [1, 11, "Cambridge_Bay", 9],
        [1, 11, "Yellowknife", 9]
      ],
      [
        [1, 53, "Moscow", 18],
        [1, 53, "W-SU"]
      ],
      [
        [1, 9, "Denver", 9],
        [1, 9, "Boise", 9],
        [1, 9, "Cambridge_Bay", 9],
        [1, 9, "Chihuahua", 9],
        [1, 9, "Edmonton", 9],
        [1, 9, "Hermosillo", 9],
        [1, 9, "Inuvik", 9],
        [1, 9, "Mazatlan", 9],
        [1, 9, "Center", 8],
        [1, 9, "New_Salem", 8],
        [1, 9, "Phoenix", 9],
        [1, 9, "Regina", 9],
        [1, 9, "Shiprock", 9],
        [1, 9, "Swift_Current", 9],
        [1, 9, "Yellowknife", 9],
        [1, 9, "East-Saskatchewan", 16],
        [1, 9, "Mountain", 16],
        [1, 9, "Saskatchewan", 16],
        [1, 9, "BajaSur", 20],
        [1, 9, "MST"],
        [1, 9, "MST7MDT"],
        [1, 9, "Navajo"],
        [1, 9, "Arizona"],
        [1, 9, "Mountain"]
      ],
      [
        [1, 42, "MET"]
      ],
      [
        [0, 35, "MET"]
      ],
      [
        [0, 76, "Kwajalein", 21],
        [0, 76, "Kwajalein"],
        [0, 76, "Majuro", 21]
      ],
      [
        [0, 44, "Moscow", 18],
        [0, 58, "Rangoon", 12],
        [0, 64, "Makassar", 12],
        [0, 64, "Ujung_Pandang", 12],
        [0, 44, "W-SU"]
      ],
      [
        [1, 69, "Macao", 12],
        [1, 69, "Macau", 12]
      ],
      [
        [0, 65, "Macao", 12],
        [0, 65, "Macau", 12]
      ],
      [
        [1, 9, "Denver", 9],
        [1, 9, "Boise", 9],
        [1, 9, "Cambridge_Bay", 9],
        [1, 9, "Edmonton", 9],
        [1, 9, "Center", 8],
        [1, 9, "New_Salem", 8],
        [1, 9, "Regina", 9],
        [1, 9, "Shiprock", 9],
        [1, 9, "Swift_Current", 9],
        [1, 9, "Yellowknife", 9],
        [1, 9, "East-Saskatchewan", 16],
        [1, 9, "Mountain", 16],
        [1, 9, "Saskatchewan", 16],
        [1, 9, "MST"],
        [1, 9, "MST7MDT"],
        [1, 9, "Navajo"],
        [1, 9, "Mountain"],
        [0, 72, "Saipan", 21]
      ],
      [
        [1, 51, "Moscow", 18],
        [1, 54, "Moscow", 18],
        [1, 51, "Chisinau", 18],
        [1, 51, "Kaliningrad", 18],
        [1, 51, "Kiev", 18],
        [1, 51, "Minsk", 18],
        [1, 51, "Riga", 18],
        [1, 51, "Simferopol", 18],
        [1, 51, "Tallinn", 18],
        [1, 51, "Tiraspol", 18],
        [1, 51, "Uzhgorod", 18],
        [1, 51, "Vilnius", 18],
        [1, 51, "Zaporozhye", 18],
        [1, 51, "W-SU"],
        [1, 54, "W-SU"]
      ],
      [
        [0, 47, "Moscow", 18],
        [0, 47, "Chisinau", 18],
        [0, 47, "Kaliningrad", 18],
        [0, 47, "Kiev", 18],
        [0, 47, "Minsk", 18],
        [0, 47, "Riga", 18],
        [0, 47, "Simferopol", 18],
        [0, 47, "Tallinn", 18],
        [0, 47, "Tiraspol", 18],
        [0, 47, "Uzhgorod", 18],
        [0, 47, "Vilnius", 18],
        [0, 47, "Zaporozhye", 18],
        [0, 47, "W-SU"]
      ],
      [
        [0, 8, "Denver", 9],
        [0, 8, "Boise", 9],
        [0, 8, "Cambridge_Bay", 9],
        [0, 8, "Chihuahua", 9],
        [0, 8, "Dawson_Creek", 9],
        [0, 8, "Edmonton", 9],
        [0, 8, "Ensenada", 9],
        [0, 8, "Hermosillo", 9],
        [0, 8, "Inuvik", 9],
        [0, 8, "Mazatlan", 9],
        [0, 8, "Mexico_City", 9],
        [0, 8, "Center", 8],
        [0, 8, "New_Salem", 8],
        [0, 8, "Phoenix", 9],
        [0, 8, "Regina", 9],
        [0, 8, "Shiprock", 9],
        [0, 8, "Swift_Current", 9],
        [0, 8, "Tijuana", 9],
        [0, 8, "Yellowknife", 9],
        [0, 8, "East-Saskatchewan", 16],
        [0, 8, "Mountain", 16],
        [0, 8, "Saskatchewan", 16],
        [0, 8, "BajaNorte", 20],
        [0, 8, "BajaSur", 20],
        [0, 8, "General", 20],
        [0, 8, "MST"],
        [0, 8, "MST7MDT"],
        [0, 8, "Navajo"],
        [0, 8, "Arizona"],
        [0, 8, "Mountain"],
        [1, 50, "Moscow", 18],
        [1, 50, "W-SU"]
      ],
      [
        [0, 51, "Mauritius", 19]
      ],
      [
        [0, 54, "Maldives", 19]
      ],
      [
        [1, 9, "Denver", 9],
        [1, 9, "Boise", 9],
        [1, 9, "Cambridge_Bay", 9],
        [1, 9, "Edmonton", 9],
        [1, 9, "Center", 8],
        [1, 9, "New_Salem", 8],
        [1, 9, "Phoenix", 9],
        [1, 9, "Regina", 9],
        [1, 9, "Shiprock", 9],
        [1, 9, "Swift_Current", 9],
        [1, 9, "Yellowknife", 9],
        [1, 9, "East-Saskatchewan", 16],
        [1, 9, "Mountain", 16],
        [1, 9, "Saskatchewan", 16],
        [1, 9, "MST"],
        [1, 9, "MST7MDT"],
        [1, 9, "Navajo"],
        [1, 9, "Arizona"],
        [1, 9, "Mountain"]
      ],
      [
        [0, 65, "Kuala_Lumpur", 12],
        [0, 65, "Kuching", 12]
      ],
      [
        [1, 76, "Noumea", 21]
      ],
      [
        [0, 74, "Noumea", 21]
      ],
      [
        [1, 26, "St_Johns", 9],
        [1, 26, "Newfoundland", 16]
      ],
      [
        [1, 24, "St_Johns", 9],
        [1, 23, "St_Johns", 9],
        [1, 4, "Midway", 21],
        [1, 24, "Goose_Bay", 9],
        [1, 24, "Newfoundland", 16],
        [1, 23, "Goose_Bay", 9],
        [1, 23, "Newfoundland", 16]
      ],
      [
        [0, 21, "Paramaribo", 9]
      ],
      [
        [1, 37, "Amsterdam", 18]
      ],
      [
        [0, 33, "Amsterdam", 18]
      ],
      [
        [0, 75, "Norfolk", 21]
      ],
      [
        [1, 59, "Novosibirsk", 12],
        [1, 65, "Novosibirsk", 12]
      ],
      [
        [0, 57, "Novosibirsk", 12],
        [0, 59, "Novosibirsk", 12]
      ],
      [
        [1, 24, "St_Johns", 9],
        [1, 4, "Adak", 9],
        [1, 4, "Atka", 9],
        [1, 4, "Nome", 9],
        [1, 4, "Aleutian"],
        [1, 24, "Goose_Bay", 9],
        [1, 24, "Newfoundland", 16],
        [0, 56, "Katmandu", 12]
      ],
      [
        [0, 75, "Nauru", 21],
        [0, 76, "Nauru", 21]
      ],
      [
        [0, 21, "St_Johns", 9],
        [0, 20, "St_Johns", 9],
        [0, 21, "Goose_Bay", 9],
        [0, 21, "Newfoundland", 16],
        [0, 20, "Goose_Bay", 9],
        [0, 20, "Newfoundland", 16],
        [0, 2, "Adak", 9],
        [0, 2, "Atka", 9],
        [0, 2, "Nome", 9],
        [0, 2, "Midway", 21],
        [0, 2, "Pago_Pago", 21],
        [0, 2, "Samoa", 21],
        [0, 2, "Aleutian"],
        [0, 2, "Samoa"],
        [1, 36, "Amsterdam", 18]
      ],
      [
        [0, 2, "Niue", 21],
        [0, 1, "Niue", 21]
      ],
      [
        [1, 24, "St_Johns", 9],
        [1, 4, "Adak", 9],
        [1, 4, "Atka", 9],
        [1, 4, "Nome", 9],
        [1, 4, "Aleutian"],
        [1, 24, "Goose_Bay", 9],
        [1, 24, "Newfoundland", 16]
      ],
      [
        [1, 79, "Auckland", 21],
        [1, 79, "McMurdo", 10],
        [1, 79, "South_Pole", 10],
        [1, 79, "NZ"]
      ],
      [
        [0, 75, "Auckland", 21],
        [0, 75, "NZ"]
      ],
      [
        [0, 76, "Auckland", 21],
        [1, 76, "Auckland", 21],
        [1, 77, "Auckland", 21],
        [0, 76, "McMurdo", 10],
        [0, 76, "South_Pole", 10],
        [0, 76, "NZ"],
        [1, 76, "NZ"],
        [1, 77, "NZ"]
      ],
      [
        [1, 57, "Omsk", 12],
        [1, 59, "Omsk", 12]
      ],
      [
        [0, 54, "Omsk", 12],
        [0, 57, "Omsk", 12]
      ],
      [
        [1, 54, "Oral", 12]
      ],
      [
        [0, 51, "Oral", 12],
        [0, 54, "Oral", 12]
      ],
      [
        [1, 9, "Inuvik", 9]
      ],
      [
        [1, 8, "Los_Angeles", 9],
        [1, 8, "Boise", 9],
        [1, 8, "Dawson", 9],
        [1, 8, "Dawson_Creek", 9],
        [1, 8, "Ensenada", 9],
        [1, 8, "Inuvik", 9],
        [1, 8, "Juneau", 9],
        [1, 8, "Tijuana", 9],
        [1, 8, "Vancouver", 9],
        [1, 8, "Whitehorse", 9],
        [1, 8, "Pacific", 16],
        [1, 8, "Yukon", 16],
        [1, 8, "BajaNorte", 20],
        [1, 8, "PST8PDT"],
        [1, 8, "Pacific"],
        [1, 8, "Pacific-New"]
      ],
      [
        [1, 14, "Lima", 9]
      ],
      [
        [1, 76, "Kamchatka", 12],
        [1, 79, "Kamchatka", 12]
      ],
      [
        [0, 74, "Kamchatka", 12],
        [0, 76, "Kamchatka", 12]
      ],
      [
        [0, 11, "Lima", 9]
      ],
      [
        [0, 2, "Enderbury", 21],
        [0, 79, "Enderbury", 21]
      ],
      [
        [1, 69, "Manila", 12]
      ],
      [
        [0, 65, "Manila", 12]
      ],
      [
        [1, 57, "Karachi", 12]
      ],
      [
        [0, 54, "Karachi", 12]
      ],
      [
        [1, 25, "Miquelon", 9]
      ],
      [
        [0, 22, "Miquelon", 9]
      ],
      [
        [0, 18, "Paramaribo", 9],
        [0, 17, "Paramaribo", 9],
        [0, 61, "Pontianak", 12],
        [0, 72, "DumontDUrville", 10]
      ],
      [
        [1, 8, "Los_Angeles", 9],
        [1, 8, "Dawson_Creek", 9],
        [1, 8, "Ensenada", 9],
        [1, 8, "Inuvik", 9],
        [1, 8, "Juneau", 9],
        [1, 8, "Tijuana", 9],
        [1, 8, "Vancouver", 9],
        [1, 8, "Pacific", 16],
        [1, 8, "BajaNorte", 20],
        [1, 8, "PST8PDT"],
        [1, 8, "Pacific"],
        [1, 8, "Pacific-New"]
      ],
      [
        [0, 7, "Los_Angeles", 9],
        [0, 7, "Boise", 9],
        [0, 7, "Dawson", 9],
        [0, 7, "Dawson_Creek", 9],
        [0, 7, "Ensenada", 9],
        [0, 7, "Hermosillo", 9],
        [0, 7, "Inuvik", 9],
        [0, 7, "Juneau", 9],
        [0, 7, "Mazatlan", 9],
        [0, 7, "Tijuana", 9],
        [0, 7, "Vancouver", 9],
        [0, 7, "Whitehorse", 9],
        [0, 7, "Pacific", 16],
        [0, 7, "Yukon", 16],
        [0, 7, "BajaNorte", 20],
        [0, 7, "BajaSur", 20],
        [0, 7, "Pitcairn", 21],
        [0, 7, "PST8PDT"],
        [0, 7, "Pacific"],
        [0, 7, "Pacific-New"]
      ],
      [
        [1, 8, "Los_Angeles", 9],
        [1, 8, "Dawson_Creek", 9],
        [1, 8, "Ensenada", 9],
        [1, 8, "Inuvik", 9],
        [1, 8, "Juneau", 9],
        [1, 8, "Tijuana", 9],
        [1, 8, "Vancouver", 9],
        [1, 8, "Pacific", 16],
        [1, 8, "BajaNorte", 20],
        [1, 8, "PST8PDT"],
        [1, 8, "Pacific"],
        [1, 8, "Pacific-New"]
      ],
      [
        [1, 22, "Asuncion", 9]
      ],
      [
        [0, 22, "Asuncion", 9],
        [0, 14, "Asuncion", 9]
      ],
      [
        [1, 59, "Qyzylorda", 12]
      ],
      [
        [0, 54, "Qyzylorda", 12],
        [0, 57, "Qyzylorda", 12]
      ],
      [
        [0, 51, "Reunion", 19]
      ],
      [
        [0, 39, "Riga", 18]
      ],
      [
        [0, 22, "Rothera", 10]
      ],
      [
        [1, 74, "Sakhalin", 12],
        [1, 76, "Sakhalin", 12]
      ],
      [
        [0, 72, "Sakhalin", 12],
        [0, 74, "Sakhalin", 12]
      ],
      [
        [1, 57, "Samarkand", 12],
        [1, 54, "Samara", 18]
      ],
      [
        [0, 51, "Samarkand", 12],
        [0, 54, "Samarkand", 12],
        [0, 1, "Apia", 21],
        [0, 1, "Pago_Pago", 21],
        [0, 1, "Samoa", 21],
        [0, 1, "Samoa"],
        [0, 47, "Samara", 18],
        [0, 51, "Samara", 18]
      ],
      [
        [1, 47, "Johannesburg"],
        [0, 42, "Johannesburg"],
        [1, 47, "Maseru"],
        [1, 47, "Windhoek"],
        [0, 42, "Maseru"],
        [0, 42, "Mbabane"],
        [0, 42, "Windhoek"]
      ],
      [
        [0, 74, "Guadalcanal", 21]
      ],
      [
        [0, 51, "Mahe", 19]
      ],
      [
        [0, 63, "Singapore", 12],
        [0, 65, "Singapore", 12],
        [0, 63, "Singapore"],
        [0, 65, "Singapore"]
      ],
      [
        [1, 57, "Aqtau", 12]
      ],
      [
        [0, 54, "Aqtau", 12],
        [0, 57, "Aqtau", 12]
      ],
      [
        [1, 30, "Freetown"],
        [1, 35, "Freetown"]
      ],
      [
        [0, 60, "Saigon", 12],
        [0, 12, "Santiago", 9],
        [0, 12, "Continental", 17],
        [0, 60, "Phnom_Penh", 12],
        [0, 60, "Vientiane", 12]
      ],
      [
        [0, 22, "Paramaribo", 9],
        [0, 21, "Paramaribo", 9]
      ],
      [
        [0, 2, "Samoa", 21],
        [0, 2, "Midway", 21],
        [0, 2, "Pago_Pago", 21],
        [0, 2, "Samoa"]
      ],
      [
        [0, 47, "Volgograd", 18],
        [0, 51, "Volgograd", 18]
      ],
      [
        [1, 54, "Yekaterinburg", 12],
        [1, 57, "Yekaterinburg", 12]
      ],
      [
        [0, 51, "Yekaterinburg", 12],
        [0, 54, "Yekaterinburg", 12]
      ],
      [
        [0, 47, "Syowa", 10]
      ],
      [
        [0, 4, "Tahiti", 21]
      ],
      [
        [1, 59, "Samarkand", 12],
        [1, 57, "Tashkent", 12],
        [1, 59, "Tashkent", 12]
      ],
      [
        [0, 57, "Samarkand", 12],
        [0, 54, "Tashkent", 12],
        [0, 57, "Tashkent", 12]
      ],
      [
        [1, 51, "Tbilisi", 12],
        [1, 54, "Tbilisi", 12]
      ],
      [
        [0, 47, "Tbilisi", 12],
        [0, 51, "Tbilisi", 12]
      ],
      [
        [0, 54, "Kerguelen", 19]
      ],
      [
        [0, 54, "Dushanbe", 12]
      ],
      [
        [0, 65, "Dili", 12],
        [0, 69, "Dili", 12]
      ],
      [
        [0, 48, "Tehran", 12],
        [0, 48, "Iran"],
        [0, 51, "Ashgabat", 12],
        [0, 51, "Ashkhabad", 12],
        [0, 54, "Ashgabat", 12],
        [0, 54, "Ashkhabad", 12],
        [0, 40, "Tallinn", 18]
      ],
      [
        [1, 81, "Tongatapu", 21]
      ],
      [
        [0, 79, "Tongatapu", 21]
      ],
      [
        [1, 51, "Istanbul", 18],
        [1, 51, "Istanbul", 12],
        [1, 51, "Turkey"]
      ],
      [
        [0, 47, "Istanbul", 18],
        [0, 47, "Istanbul", 12],
        [0, 47, "Turkey"]
      ],
      [
        [0, 47, "Volgograd", 18]
      ],
      [
        [1, 69, "Ulaanbaatar", 12],
        [1, 69, "Ulan_Bator", 12]
      ],
      [
        [0, 59, "Ulaanbaatar", 12],
        [0, 65, "Ulaanbaatar", 12],
        [0, 59, "Choibalsan", 12],
        [0, 59, "Ulan_Bator", 12],
        [0, 65, "Choibalsan", 12],
        [0, 65, "Ulan_Bator", 12]
      ],
      [
        [1, 54, "Oral", 12],
        [1, 57, "Oral", 12]
      ],
      [
        [0, 51, "Oral", 12],
        [0, 54, "Oral", 12],
        [0, 57, "Oral", 12]
      ],
      [
        [0, 57, "Urumqi", 12]
      ],
      [
        [1, 22, "Montevideo", 9],
        [1, 24, "Montevideo", 9]
      ],
      [
        [1, 25, "Montevideo", 9]
      ],
      [
        [0, 22, "Montevideo", 9],
        [0, 21, "Montevideo", 9]
      ],
      [
        [1, 57, "Samarkand", 12],
        [1, 57, "Tashkent", 12]
      ],
      [
        [0, 54, "Samarkand", 12],
        [0, 54, "Tashkent", 12]
      ],
      [
        [0, 14, "Caracas", 9],
        [0, 13, "Caracas", 9]
      ],
      [
        [1, 72, "Vladivostok", 12]
      ],
      [
        [0, 69, "Vladivostok", 12],
        [1, 74, "Vladivostok", 12]
      ],
      [
        [0, 69, "Vladivostok", 12],
        [0, 72, "Vladivostok", 12]
      ],
      [
        [1, 51, "Volgograd", 18],
        [1, 54, "Volgograd", 18]
      ],
      [
        [0, 47, "Volgograd", 18],
        [0, 51, "Volgograd", 18]
      ],
      [
        [0, 57, "Vostok", 10]
      ],
      [
        [1, 76, "Efate", 21]
      ],
      [
        [0, 74, "Efate", 21]
      ],
      [
        [1, 22, "Mendoza", 9],
        [1, 22, "Jujuy", 2],
        [1, 22, "Mendoza", 2],
        [1, 22, "Jujuy", 9]
      ],
      [
        [0, 14, "Mendoza", 9],
        [0, 14, "Catamarca", 2],
        [0, 14, "ComodRivadavia", 2],
        [0, 14, "Cordoba", 2],
        [0, 14, "Jujuy", 2],
        [0, 14, "La_Rioja", 2],
        [0, 14, "Mendoza", 2],
        [0, 14, "Rio_Gallegos", 2],
        [0, 14, "San_Juan", 2],
        [0, 14, "Tucuman", 2],
        [0, 14, "Ushuaia", 2],
        [0, 14, "Catamarca", 9],
        [0, 14, "Cordoba", 9],
        [0, 14, "Jujuy", 9],
        [0, 14, "Rosario", 9]
      ],
      [
        [1, 42, "Windhoek"],
        [1, 42, "Ndjamena"]
      ],
      [
        [0, 28, "Dakar"],
        [0, 28, "Bamako"],
        [0, 28, "Banjul"],
        [0, 28, "Bissau"],
        [0, 28, "Conakry"],
        [0, 28, "El_Aaiun"],
        [0, 28, "Freetown"],
        [0, 28, "Niamey"],
        [0, 28, "Nouakchott"],
        [0, 28, "Timbuktu"],
        [0, 31, "Freetown"],
        [0, 35, "Brazzaville"],
        [0, 35, "Bangui"],
        [0, 35, "Douala"],
        [0, 35, "Lagos"],
        [0, 35, "Libreville"],
        [0, 35, "Luanda"],
        [0, 35, "Malabo"],
        [0, 35, "Ndjamena"],
        [0, 35, "Niamey"],
        [0, 35, "Porto-Novo"],
        [0, 35, "Windhoek"]
      ],
      [
        [1, 42, "Lisbon", 18],
        [1, 42, "Madrid", 18],
        [1, 42, "Monaco", 18],
        [1, 42, "Paris", 18],
        [1, 42, "Portugal"],
        [1, 42, "WET"]
      ],
      [
        [1, 35, "Paris", 18],
        [1, 35, "Algiers"],
        [1, 35, "Casablanca"],
        [1, 35, "Ceuta"],
        [1, 35, "Canary", 13],
        [1, 35, "Faeroe", 13],
        [1, 35, "Faroe", 13],
        [1, 35, "Madeira", 13],
        [1, 35, "Brussels", 18],
        [1, 35, "Lisbon", 18],
        [1, 35, "Luxembourg", 18],
        [1, 35, "Madrid", 18],
        [1, 35, "Monaco", 18],
        [1, 35, "Portugal"],
        [1, 35, "WET"],
        [1, 42, "Luxembourg", 18]
      ],
      [
        [0, 31, "Paris", 18],
        [0, 31, "Algiers"],
        [0, 31, "Casablanca"],
        [0, 31, "Ceuta"],
        [0, 31, "El_Aaiun"],
        [0, 31, "Azores", 13],
        [0, 31, "Canary", 13],
        [0, 31, "Faeroe", 13],
        [0, 31, "Faroe", 13],
        [0, 31, "Madeira", 13],
        [0, 31, "Brussels", 18],
        [0, 31, "Lisbon", 18],
        [0, 31, "Luxembourg", 18],
        [0, 31, "Madrid", 18],
        [0, 31, "Monaco", 18],
        [0, 31, "Portugal"],
        [0, 31, "WET"],
        [0, 35, "Luxembourg", 18]
      ],
      [
        [1, 25, "Godthab", 9],
        [1, 25, "Danmarkshavn", 9]
      ],
      [
        [0, 22, "Godthab", 9],
        [0, 22, "Danmarkshavn", 9]
      ],
      [
        [0, 59, "Jakarta", 12],
        [0, 63, "Jakarta", 12],
        [0, 65, "Jakarta", 12],
        [0, 59, "Pontianak", 12],
        [0, 63, "Pontianak", 12],
        [0, 65, "Pontianak", 12]
      ],
      [
        [0, 65, "Perth", 14],
        [1, 69, "Perth", 14],
        [0, 2, "Apia", 21],
        [0, 65, "Casey", 10],
        [0, 65, "West", 14],
        [1, 69, "West", 14]
      ],
      [
        [1, 69, "Yakutsk", 12],
        [1, 72, "Yakutsk", 12]
      ],
      [
        [0, 65, "Yakutsk", 12],
        [0, 69, "Yakutsk", 12]
      ],
      [
        [1, 8, "Dawson", 9],
        [1, 8, "Whitehorse", 9],
        [1, 8, "Yukon", 16]
      ],
      [
        [1, 7, "Dawson", 9],
        [1, 7, "Whitehorse", 9],
        [1, 7, "Yakutat", 9],
        [1, 7, "Yukon", 16]
      ],
      [
        [1, 57, "Yekaterinburg", 12]
      ],
      [
        [0, 54, "Yekaterinburg", 12]
      ],
      [
        [1, 51, "Yerevan", 12],
        [1, 54, "Yerevan", 12]
      ],
      [
        [0, 47, "Yerevan", 12],
        [0, 51, "Yerevan", 12]
      ],
      [
        [1, 7, "Dawson", 9],
        [1, 7, "Whitehorse", 9],
        [1, 7, "Yakutat", 9],
        [1, 7, "Yukon", 16]
      ],
      [
        [0, 6, "Anchorage", 9],
        [0, 6, "Dawson", 9],
        [0, 6, "Juneau", 9],
        [0, 6, "Nome", 9],
        [0, 6, "Whitehorse", 9],
        [0, 6, "Yakutat", 9],
        [0, 6, "Yukon", 16],
        [0, 6, "Alaska"]
      ],
      [
        [1, 7, "Dawson", 9],
        [1, 7, "Whitehorse", 9],
        [1, 7, "Yakutat", 9],
        [1, 7, "Yukon", 16]
      ],
      [
        [0, 35]
      ],
      [
        [0, 42]
      ],
      [
        [0, 47]
      ],
      [
        [0, 51]
      ],
      [
        [0, 54]
      ],
      [
        [0, 57]
      ],
      [
        [0, 59]
      ],
      [
        [0, 65]
      ],
      [
        [0, 69]
      ],
      [
        [0, 72]
      ],
      [
        [0, 74]
      ],
      [
        [0, 76]
      ],
      [
        [0, 28]
      ],
      [
        [0, 25]
      ],
      [
        [0, 22]
      ],
      [
        [0, 14]
      ],
      [
        [0, 11]
      ],
      [
        [0, 9]
      ],
      [
        [0, 8]
      ],
      [
        [0, 31, "UTC"]
      ],
      [
        [0, 7]
      ],
      [
        [0, 6]
      ],
      [
        [0, 4]
      ],
      [
        [0, 2]
      ],
      [
        [0, 0]
      ],
      [
        [0, 31, "Davis", 10],
        [0, 31, "DumontDUrville", 10]
      ],
      [
        [0, 31]
      ]
    ];
  }

  if (!php_js_shared.tz_abbreviations) {
    php_js_shared.tz_abbreviations = ["acst", "act", "addt", "adt", "aft", "ahdt", "ahst", "akdt", "akst", "aktst", "aktt", "almst", "almt", "amst", "amt", "anast", "anat", "ant", "apt", "aqtst", "aqtt", "arst", "art", "ashst", "asht", "ast", "awt", "azomt", "azost", "azot", "azst", "azt", "bakst", "bakt", "bdst", "bdt", "beat", "beaut", "bmt", "bnt", "bortst", "bort", "bost", "bot", "brst", "brt", "bst", "btt", "burt", "cant", "capt", "cast", "cat", "cawt", "cddt", "cdt", "cemt", "cest", "cet", "cgst", "cgt", "chadt", "chast", "chat", "chdt", "chost", "chot", "cit", "cjt", "ckhst", "ckt", "clst", "clt", "cost", "cot", "cpt", "cst", "cvst", "cvt", "cwst", "cwt", "chst", "dact", "davt", "ddut", "dusst", "dust", "easst", "east", "eat", "ect", "eddt", "edt", "eest", "eet", "egst", "egt", "ehdt", "eit", "ept", "est", "ewt", "fjst", "fjt", "fkst", "fkt", "fnst", "fnt", "fort", "frust", "frut", "galt", "gamt", "gbgt", "gest", "get", "gft", "ghst", "gmt", "gst", "gyt", "hadt", "hast", "hdt", "hkst", "hkt", "hovst", "hovt", "hpt", "hst", "hwt", "ict", "iddt", "idt", "ihst", "iot", "irdt", "irkst", "irkt", "irst", "isst", "ist", "javt", "jdt", "jst", "kart", "kast", "kdt", "kgst", "kgt", "kizst", "kizt", "kmt", "kost", "krast", "krat", "kst", "kuyst", "kuyt", "kwat", "lhst", "lint", "lkt", "lont", "lrt", "lst", "madmt", "madst", "madt", "magst", "magt", "malst", "malt", "mart", "mawt", "mddt", "mdst", "mdt", "mest", "met", "mht", "mmt", "most", "mot", "mpt", "msd", "msk", "mst", "mut", "mvt", "mwt", "myt", "ncst", "nct", "nddt", "ndt", "negt", "nest", "net", "nft", "novst", "novt", "npt", "nrt", "nst", "nut", "nwt", "nzdt", "nzmt", "nzst", "omsst", "omst", "orast", "orat", "pddt", "pdt", "pest", "petst", "pett", "pet", "phot", "phst", "pht", "pkst", "pkt", "pmdt", "pmst", "pmt", "ppt", "pst", "pwt", "pyst", "pyt", "qyzst", "qyzt", "ret", "rmt", "rott", "sakst", "sakt", "samst", "samt", "sast", "sbt", "sct", "sgt", "shest", "shet", "slst", "smt", "srt", "sst", "stat", "svest", "svet", "syot", "taht", "tasst", "tast", "tbist", "tbit", "tft", "tjt", "tlt", "tmt", "tost", "tot", "trst", "trt", "tsat", "ulast", "ulat", "urast", "urat", "urut", "uyhst", "uyst", "uyt", "uzst", "uzt", "vet", "vlasst", "vlast", "vlat", "volst", "volt", "vost", "vust", "vut", "warst", "wart", "wast", "wat", "wemt", "west", "wet", "wgst", "wgt", "wit", "wst", "yakst", "yakt", "yddt", "ydt", "yekst", "yekt", "yerst", "yert", "ypt", "yst", "ywt", "a", "b", "c", "d", "e", "f", "g", "h", "i", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "utc", "u", "v", "w", "x", "y", "zzz", "z"];
  }

  if (!php_js_shared.tz_offsets) {
    php_js_shared.tz_offsets = [-43200, -41400, -39600, -37800, -36000, -34200, -32400, -28800, -25200, -21600, -19800, -18000, -16966, -16200, -14400, -14308, -13500, -13252, -13236, -12756, -12652, -12600, -10800, -9052, -9000, -7200, -5400, -3996, -3600, -2670, -1200, 0, 1172, 1200, 2079, 3600, 4772, 4800, 5736, 5784, 5940, 6264, 7200, 9000, 9048, 9384, 9885, 10800, 12344, 12600, 12648, 14400, 16200, 16248, 18000, 19800, 20700, 21600, 23400, 25200, 25580, 26240, 26400, 27000, 28656, 28800, 30000, 30600, 31500, 32400, 34200, 35100, 36000, 37800, 39600, 41400, 43200, 45000, 45900, 46800, 49500, 50400];
  }

  if (!php_js_shared.tz_prefixes) {
    php_js_shared.tz_prefixes = ['Africa', 'America', 'America/Argentina', 'America', 'America/Indiana', 'America', 'America/Kentucky', 'America', 'America/North_Dakota', 'America', 'Antarctica', 'Arctic', 'Asia', 'Atlantic', 'Australia', 'Brazil', 'Canada', 'Chile', 'Europe', 'Indian', 'Mexico', 'Pacific'];
  }
  // END STATIC

  //var dtz = this.date_default_timezone_get();
  for (i = 0, len = php_js_shared.tz_abbrs.length; i < len; i++) {
    indice = php_js_shared.tz_abbreviations[i];
    curr = php_js_shared.tz_abbrs[i];
    list[indice] = [];
    for (j = 0, jlen = curr.length; j < jlen; j++) {
      currSub = curr[j];
      currSubPrefix = (currSub[3] ? php_js_shared.tz_prefixes[currSub[3]] + '/' : '');
      timezone_id = currSub[2] ? (currSubPrefix + currSub[2]) : null;
      tzo = php_js_shared.tz_offsets[currSub[1]];
      dst = !! currSub[0];
      list[indice].push({
        'dst': dst,
        'offset': tzo,
        'timezone_id': timezone_id
      });
      // if (dtz === timezone_id) { // Apply this within date functions
      //     this.php_js.currentTimezoneOffset = tzo;
      //     this.php_js.currentTimezoneDST = dst;
      // }
    }
  }

  return list;
}

