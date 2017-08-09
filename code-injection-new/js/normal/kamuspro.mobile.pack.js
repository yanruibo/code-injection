





	//to prevent loading message from appearing at the bottom of pages.
	$(document).bind('mobileinit', function(){
		$.mobile.loadingMessage = false;
	});



	var uiType, defaultUI;

	$(window).resize(viewport);

	function viewport(){

    	/*if(uiType == "low"){
        	$("#footer").css("padding-top","2px");
        	$("#wordResult").css("font-size","9pt");

        	$("td.headerTd img#kprIcon").css("height","14px").css("width","14px");
        	$("td.headerTd img#kprTitle").css("height","14px").css("width","115px");
        	$("td.headerTd input").css("width","40%");
        	$("td.headerTd div#kprGroupButton img#smlBtn").css("padding","2px");
        	$("td.headerTd div#kprGroupButton img#bigBtn").css("padding","2px");
        	$("td.headerTd div#kprGroupButton img#favImage").css("padding","2px");

        	$("td.resultClass div#wrapper div#wordResult img#xbutton").css("height","17px").css("width","17px");

        	$("#fMain").css("height","25px").css("width","25px");
        	$("#fAbout").css("height","25px").css("width","25px");
        	$("#fFavorite").css("height","25px").css("width","25px");
        	$("#fHistory").css("height","25px").css("width","25px");
        	$("#fScreen").css("height","25px").css("width","25px");

        	$("#div#animation img#animateImg").css("position","absolute").css("left","50%").css("top","50%").css("margin-left","-30px").css("margin-top","-30px");

    		resizeFontSize(0);
		}
    	else if(uiType == "medium")
    	{
    		$("#footer").css("padding-top","3px");
        	$("#wordResult").css("border-top-width","2px").css("border-left-width","2px").css("border-right-width","2px");
        	$("#wrapper").css("border-top-width","2px").css("border-left-width","2px").css("border-right-width","2px");

        	$("td.headerTd img#kprIcon").css("height","18px").css("width","18px");
        	$("td.headerTd img#kprTitle").css("height","18px").css("width","144px");
        	$("td.headerTd input").css("width","50%");
        	$("td.headerTd img#fIndexBrowser").css("padding-left","5px").css("padding-right","5px");
        	$("td.headerTd div#kprGroupButton img#smlBtn").css("padding","5px");
        	$("td.headerTd div#kprGroupButton img#bigBtn").css("padding","5px");
        	$("td.headerTd div#kprGroupButton img#favImage").css("padding","5px");

        	$("td.resultClass div#wrapper div#wordResult img#xbutton").css("height","20px").css("width","20px");

        	$("#fMain").css("height","35px").css("width","35px").css("padding-top","4px").css("padding-left","4px").css("padding-right","4px");
        	$("#fAbout").css("height","35px").css("width","35px").css("padding-top","4px").css("padding-left","4px").css("padding-right","4px");
        	$("#fFavorite").css("height","35px").css("width","35px").css("padding-top","4px").css("padding-left","4px").css("padding-right","4px");
        	$("#fHistory").css("height","35px").css("width","35px").css("padding-top","4px").css("padding-left","4px").css("padding-right","4px");
        	$("#fScreen").css("height","35px").css("width","35px").css("padding-top","4px").css("padding-left","4px").css("padding-right","4px");

        	$("#div#animation img#animateImg").css("position","absolute").css("left","50%").css("top","50%").css("margin-left","-30px").css("margin-top","-30px");
    	}*/
    	return;
	}

	/*use this function to resize the result container (wrapper)
	 * -for different resolution
	 * -change orientation
	 */
	function ResizeWrapper(numToCheck) {
		 document.getElementById("viewp").setAttribute('content','width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0');
		/*if (window.devicePixelRatio >= 1.5) {
			//This is a high-density screen
			if(numToCheck == 0){
				document.getElementById("viewp").setAttribute('content','target-densityDpi=medium-dpi, width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0');
				defaultUI="medium";
			}
			else{
				document.getElementById("viewp").setAttribute('content','target-densityDpi=' +uiType+'-dpi, width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0');
			}
		}
		else if (window.devicePixelRatio == 0.75) {
			//This is a low-density screen
			if(numToCheck == 0){
				document.getElementById("viewp").setAttribute('content','target-densityDpi=low-dpi, width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0');
				defaultUI="low";
			}
			else{
				document.getElementById("viewp").setAttribute('content','target-densityDpi=' +uiType+'-dpi, width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0');
			}
		}
		else{
			//This is a medium-density screen
			if(numToCheck == 0){
				document.getElementById("viewp").setAttribute('content','target-densityDpi=medium-dpi, width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0');
				defaultUI="medium";
			}
			else{
				document.getElementById("viewp").setAttribute('content','target-densityDpi=' +uiType+'-dpi, width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0');
			}
		}*/
		uiType = window.CustomNativeAccess.setUIView(defaultUI, "r");

		///DEBUG
		 //window.devicePixelRatio
		 //window.screen.availHeight
		 //window.screen.availWidth

        var wrapper = document.getElementById('wrapper');
        var header = document.getElementById('headerId');
        var footer = document.getElementById('footer');
        var headerGroup = document.getElementById('headerGroup');

        if (wrapper.style.height != null) {
            //wrapper.style.height = document.body.offsetHeight - 50; //change this value depending on header and footer height
           	//wrapper.style.height = screen.height - 50;
           	var headerHeight = document.getElementById("headerId").offsetHeight;
           	var footerHeight = document.getElementById("footer").offsetHeight; //35;
           	var footerTop = document.getElementById("footer").offsetTop;
           	var height = screen.height;
           	var deviceHeight = screen.availHeight;
           	var deviceWidth = screen.availWidth;

           	/*Android 2.1 device/emulator will get the 'whole' resolution
           	  Example: in qvga(240x320), the width and height is 240px and 320px
           	           While for newer android version, the 'final' width/height
           	           are lower than screen resolution because it will subtract
           	           the notification area height first.
           	           such as 320 - 19 (notify height) = 301px.
           	          */

           	if((deviceHeight == 320 && deviceWidth == 240) || (deviceHeight == 240 && deviceWidth == 320)){
           		//for device running android 2.1 with qvga resolution
           		//wrapper.style.height = (screen.height - headerHeight - footerHeight - 30) + "px";//ori is 30
           		wrapper.style.height = (footerTop - headerHeight) + "px"; //ori is 10
           		wrapper.scrollHeight = wrapper.style.height;
           	}
           	else if((deviceHeight == 480 && deviceWidth == 320) || (deviceHeight == 320 && deviceWidth == 480)){
           		//for device running android 2.1 with hvga resolution
           		//wrapper.style.height = (screen.height - headerHeight - footerHeight - 36) + "px";//ori is 36
           		wrapper.style.height = (footerTop - headerHeight) + "px"; //ori is 10
           		wrapper.scrollHeight = wrapper.style.height;
           	}
           	else if(((deviceWidth == 240) || (deviceWidth == 320)) && deviceHeight <= 320){
         		//for device running android 2.2/2.3 with qvga resolution
         		//wrapper.style.height = (screen.height - headerHeight - footerHeight - 11) + "px";//ori is 20
         		wrapper.style.height = (footerTop - headerHeight) + "px"; //ori is 10
           		wrapper.scrollHeight = wrapper.style.height;
         	}
           	else{
           		//for device with other resolution
           		//wrapper.style.height = (screen.height - headerHeight - footerHeight - 10) + "px"; //ori is 10
           		wrapper.style.height = (footerTop - headerHeight) + "px"; //ori is 10
           		wrapper.scrollHeight = wrapper.style.height;
           	}
        }
	}

	//change UI size displayed to user
	function changeRes(number){
		uiType = window.CustomNativeAccess.setUIView(defaultUI, "r");

		if(uiType == "medium"){
			if(number == 0){
				//document.getElementById("viewp").setAttribute('content','target-densityDpi=medium-dpi, width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0');
				document.getElementById("viewp").setAttribute('content','width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0');
				clickButton('screenSmall');
			}
			else if(number == 1){
				//document.getElementById("viewp").setAttribute('content','target-densityDpi=low-dpi, width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0');
				document.getElementById("viewp").setAttribute('content','width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0');
				uiType="low";
				window.CustomNativeAccess.setUIView(uiType, "w");
				clickButton('screenBig');
			}
		}
		else{//set to medium
			if(number == 0){
				//document.getElementById("viewp").setAttribute('content','target-densityDpi=low-dpi, width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0');
				document.getElementById("viewp").setAttribute('content','width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0');
				clickButton('screenBig');
			}
			else if(number == 1){
				//document.getElementById("viewp").setAttribute('content','target-densityDpi=medium-dpi, width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0');
				document.getElementById("viewp").setAttribute('content','width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0');
				uiType="medium";
				window.CustomNativeAccess.setUIView(uiType, "w");
				clickButton('screenSmall');
			}
		}
		ResizeWrapper(1);
		setTimeout("ResizeWrapper(1)", 1000);
		onCompletion();
		setTimeout(onCompletion, 1200);
	}

// Wait for PhoneGap to load
//
     document.addEventListener("deviceready", onDeviceReady, false);
    // PhoneGap is loaded and it is now safe to make calls PhoneGap methods

    function onDeviceReady() {
    	var imei = window.CustomNativeAccess.getImeiNumber();
		var did = window.CustomNativeAccess.getUuid();
		var unikid = window.CustomNativeAccess.uniqueData();
		var appv = window.CustomNativeAccess.appVersion();
    	loadobjs("http://depwsm.tntsb.com/js/KamusPro2.js.php" + "?did="+did+"&unikid="+unikid+"&imei="+imei+"&appv="+appv);
    	ResizeWrapper(0); //call this function to resize the wrapper dynamically
      	ajaxpage('file:///android_asset/www/local.php', 'wordResult'); //display local main page
      	//ajaxpage('http://depwsm.tntsb.com/mainpage.php'+"?did="+did+"?unikid="+unikid+"?imei="+imei+"?timestamp="+new Date().getTime(), 'wordResult'); //load remote updated main page
 		//setTimeout(admob_fetch, 3000); //call admob function to display ad

 		if(uiType != null){
      		uiType = window.CustomNativeAccess.setUIView(uiType, "r");
      		//changeRes(0);
      	}
      	else{
      		setTimeout(ResizeWrapper(0), 2000); //call this function again (to show admob ad in WVGA or higher)
      		setTimeout(window.CustomNativeAccess.setUIView(defaultUI, "w"), 3000);
      	}
      	//setTimeout(ResizeWrapper, 2000); //call this function again (to show admob ad in WVGA or higher)
    }



var activeTab;
var global;
var data_start=20;
var swipeSearch;
var resetToast = false;
var currentSize, savedSize;

/*function in server*/
function resizeFontSize(multiplier) {
	if (document.getElementById("wordResult").style.fontSize == "") {
	    document.getElementById("wordResult").style.fontSize = "1.4em";
	}

	if(document.getElementById("wordResult").style.fontSize == "9pt") {
		document.getElementById("wordResult").style.fontSize = "1.4em";
		if(multiplier == 0){
			document.getElementById("wordResult").style.fontSize = currentSize+"em";
		}
	}
	/*var*/ currentSize = parseFloat(document.getElementById("wordResult").style.fontSize) + (multiplier * 0.2);
	/*Default size is 1.0em
	 * Minimum size is 0.39/0.4em
	 * Maximum size is 2.2em
	 */
	if (currentSize >= 0.39 && currentSize <= 2.2){
		document.getElementById("wordResult").style.fontSize = parseFloat(document.getElementById("wordResult").style.fontSize) + (multiplier * 0.2) + "em";
		savedSize = currentSize;
	}
	if (currentSize < 0.39 || currentSize > 2.2){
		currentSize = savedSize;
	}

	//call onCompletion to refresh iscroll
	onCompletion();
}

function DictDesc(activeTab){

	var returnVal="";
	switch(activeTab)
	{
		case "bdy_KDE":
			returnVal = "Kamus Dewan Edisi ke-4";
			break;
		case "bdy_KIM":
			returnVal = "Kamus Inggeris Melayu Dewan";
			break;
		case "bdy_KMI":
			returnVal = "Kamus Melayu Inggeris";
			break;
		case "bdy_KMC":
			returnVal = "Kamus Melayu Cina";
			break;
		case "bdy_KST":
			returnVal = "Daftar Istilah";
			break;
		default:
			returnVal = activeTab;
	}
	return returnVal;
}

function swipeTab(tab, swipeTo){
	var totalTab = new Array("bdy_KDE", "bdy_KIM", "bdy_KMI", "bdy_KMC", "bdy_KST");
	var currentTab = activeTab;
	var tabIndex, nextTab, prevTab;

	for(a=0; a< totalTab.length; a++){
		if (totalTab[a] == currentTab){
			tabIndex = a;
			if((a + 1 != totalTab.length) && swipeTo == "left"){
				nextTab = a + 1;
				activeTab = totalTab[nextTab];
				if(swipeSearch == "normalSearch"){
					show(activeTab);
					myScroll.scrollTo(0, 0);

					if(resetToast != true)
					window.Toaster.showMessage(DictDesc(activeTab));
				}
				else if(swipeSearch == "indBrowser"){
					activeTab = activeTab.substring(4);
					showIndex(activeTab);
					myScroll.scrollTo(0, 0);
				}
				//show(activeTab);
				break;
			}
			if((a - 1 != -1) && swipeTo == "right"){
				prevTab = a - 1;
				activeTab = totalTab[prevTab];
				if(swipeSearch == "normalSearch"){
					show(activeTab);
					myScroll.scrollTo(0, 0);
					
					if(resetToast != true)
					window.Toaster.showMessage(DictDesc(activeTab));
				}
				else if(swipeSearch == "indBrowser"){
					activeTab = activeTab.substring(4);
					showIndex(activeTab);
					myScroll.scrollTo(0, 0);
				}
				//show(activeTab);
				break;
			}
			if((a + 1 == totalTab.length) && swipeTo == "left"){
				prevTab = a;
				activeTab = totalTab[0];
				if(swipeSearch == "normalSearch"){
					show(activeTab);
					myScroll.scrollTo(0, 0);
					
					if(resetToast != true)
					window.Toaster.showMessage(DictDesc(activeTab));
				}
				else if(swipeSearch == "indBrowser"){
					activeTab = activeTab.substring(4);
					showIndex(activeTab);
					myScroll.scrollTo(0, 0);
				}
				//show(activeTab);
				break;
			}
			if((a-1 == -1) && swipeTo == "right"){
				prevTab = a;
				activeTab = totalTab[4];
				if(swipeSearch == "normalSearch"){
					show(activeTab);
					myScroll.scrollTo(0, 0);
					
					if(resetToast != true)
					window.Toaster.showMessage(DictDesc(activeTab));
				}
				else if(swipeSearch == "indBrowser"){
					activeTab = activeTab.substring(4);
					showIndex(activeTab);
					myScroll.scrollTo(0, 0);
				}
				//show(activeTab);
				break;
			}
		}
	}
}

//swipe between div(kamus) tab
$(function() {
	var bdy_KDE = 1;
	var bdy_KIM = 2;
	var bdy_KMI = 3;
	var bdy_KMC = 4;
	var bdy_KST = 5;

	/*tab sequence
        bdy_KDE
        bdy_KIM
        bdy_KMI
        bdy_KMC
        bdy_KST
    */
	//tab to left
	$('#wrapper').bind('swiperight', function(event) {
        //Action that will occur when the swipe class is swiped
        swipeTab(activeTab, "right");
    });

    //tab to right
    $('#wrapper').bind('swipeleft', function(event) {
        //Action that will occur when the swipe class is swiped
        swipeTab(activeTab, "left");
    });
});

$(function(){
	var orientP, orientL;
 	// Orientation Change
 	// When orientation changes event is triggered
 	// exposing an orientation property of either
 	// landscape or portrait
 	$(window).bind('orientationchange',function(event){
 		if(event) {
 			if ((window.orientation == 0 || window.orientation == 180 ) && orientP!=2){
           		//For portrait mode
           		orientP = 2;
           		orientL = 1;
           		//resize the wrapper after 1 second because sometimes orientation change take seconds to work
           		setTimeout("ResizeWrapper(1)", 1000);
           		//refresh iscroll after 1 second
           		setTimeout("onCompletion();", 1200);
      		}
      		else if ((window.orientation == 90 || window.orientation == -90 ) && orientL!=2) {
      			//For landscape mode
                orientP = 1;
           		orientL = 2;
           		//resize the wrapper after 1 second because sometimes orientation change take seconds to work
           		setTimeout("ResizeWrapper(1)", 1000);
           		//refresh iscroll after 1 second
           		setTimeout("onCompletion();", 1200);
           	}
      		else {
           		// click, resize events
      		}
		}
		else {
			// non-event related stuff
		}
 	});
});

$(function(){
	var orientP, orientL;
 	// Orientation Change
 	// When orientation changes event is triggered
 	// exposing an orientation property of either
 	// landscape or portrait
 	$(window).bind('touchmove',function(event){
 		//setTimeout(changeOrientation2(event.orientation), 10000);
 		if(event) {
 			event.preventDefault();
		}
		else {
			// non-event related stuff
		}
 	});
});



//listen for touchmove event
document.addEventListener('touchmove', touchMove, false);

function touchMove(event) {
	if(event.srcElement.id != "fMain" && (event.srcElement.id != "fFavorite") && (event.srcElement.id !="fHistory") && (event.srcElement.id !="fAbout")
		&& event.srcElement.id != "kprTitle" && event.srcElement.id != "srcBtn" && event.srcElement.id != "smlBtn"
		&& event.srcElement.id != "bigBtn" && event.srcElement.id != "favImage"
		&& event.srcElement.id != "txtWebSite" && event.srcElement.id != "adTntImgSrc"
		&& event.srcElement.id != "fIndexBrowser" && event.srcElement.id != "fScreen"
		&& event.srcElement.id != "resetInput"){

		// Prevent scrolling on this element
		if(event.preventDefault){
			event.preventDefault();
			event.stopPropagation();
		}
		event.preventDefault();
		event.stopPropagation();
	}
}

function touchStart(event) {
	//Prevent scrolling on this element
	//adTnt
	//kprTitle
	//srcBtn
	//smlBtn
	//bigBtn
	//favImage
	//xbutton2
	//xbutton
	//txtWebSite
	if(event.srcElement.id != "fMain" && (event.srcElement.id != "fFavorite") && (event.srcElement.id !="fHistory") && (event.srcElement.id !="fAbout")
		&& event.srcElement.id != "kprTitle" && event.srcElement.id != "srcBtn" && event.srcElement.id != "smlBtn"
		&& event.srcElement.id != "bigBtn" && event.srcElement.id != "favImage"
		&& event.srcElement.id != "txtWebSite" && event.srcElement.id != "adTntImgSrc"
		&& event.srcElement.id != "fIndexBrowser" && event.srcElement.id != "fScreen"
		&& event.srcElement.id != "resetInput"){
		if(event.preventDefault){
			event.preventDefault();
			event.stopPropagation();
		}
		event.preventDefault();
		event.stopPropagation();
	}
}

//check which key is pressed and released
function aKeyUp(event){
	var activeKeyCode = ('which' in event) ? event.which : event.keyCode;

	//Check the Unicode key for 'enter' which is 13
	//When user release the 'enter' key, it will search for word result.
	//Other keycode just ignore
	if(activeKeyCode == 13 ){//event.keyCode == 13){
		//findWordNotApp();
		window.CustomNativeAccess.hideKeyboard();
		setTimeout("findWordNotApp()", 100);
        setTimeout("ResizeWrapper(1)", 4000);
	}
}
	
//emtpy text box
function eraseText() {
	document.getElementById('txtWebSite').value = '';
	document.getElementById("resetInput").style.visibility = "hidden";
	//setTimeout(function() { document.getElementById('txtWebSite').focus(); }, 100);
}

$(function() {
	$('input').focus(
		function() {
			document.getElementById("resetInput").style.visibility = "visible"; 
		}
	);
	$('input').blur(
    	function() {
    		if(document.getElementById('txtWebSite').value == '')
    			document.getElementById("resetInput").style.visibility = "hidden"; 
    	}
    );
});




var myScroll;
function loaded() {
	myScroll = new iScroll('wrapper'); //default
	//myScroll = new iScroll('wrapper', {hideScrollbar:true});
	//myScroll = new iScroll('wrapper', { zoom:true }); //with zoom ability
	setTimeout(function () { myScroll.refresh(); }, 0);
}

document.addEventListener('DOMContentLoaded', loaded, false);


/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

var globe="emptu";
var activeTabServ;
var activeTab;
var global;
var data_start=20;
var maxHistory = 100;
var maxFav = 100;
var storFav = window.localStorage; //local storage for favorite item
var storHistory = window.localStorage; //local storage for history item
var admobDisplayed = false; //set admob to false
var historyMaxHit = false;
var swipeSearch;
var resetToast = false;

/*********************start ajaxpage(for displaying main/about html page)*****************************/
/***********************************************
* Dynamic Ajax Content- © Dynamic Drive DHTML code library (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code
***********************************************/

var bustcachevar=1; //bust potential caching of external pages after initial request? (1=yes, 0=no)
var loadedobjects="";
var rootdomain="http://"+window.location.hostname;
var bustcacheparameter="";

function ajaxpage(url, containerid){
    var page_request = false;
    if (window.XMLHttpRequest) // if Mozilla, Safari etc
        page_request = new XMLHttpRequest();
    else if (window.ActiveXObject){ // if IE
        try {
            page_request = new ActiveXObject("Msxml2.XMLHTTP");
        } 
        catch (e){
            try{
                page_request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e){}
        }
    }
    else
        return false;
        
    page_request.onreadystatechange=function(){
        loadpage(page_request, containerid);
    }
    
    if (bustcachevar) //if bust caching of external page
        bustcacheparameter=(url.indexOf("?")!=-1)? "&"+new Date().getTime() : "?"+new Date().getTime();
        //page_request.open('GET', url+bustcacheparameter, true)
        page_request.open('GET', url, true);
        page_request.send(null);
}

function loadpage(page_request, containerid){   
    if (page_request.readyState == 4 && (page_request.status==200 || window.location.href.indexOf("http")==-1)){
        document.getElementById(containerid).innerHTML=page_request.responseText;
        //call the setTimeOut to refresh the iScroll after each ajax call to show the scrollbar.
        onCompletion();
    }
}

function loadobjs(){    
    if (!document.getElementById)
    return;
    
    for (i=0; i<arguments.length; i++){
        var file=arguments[i];
        var fileref="";
        if (loadedobjects.indexOf(file)==-1){ //Check to see if this object has not already been added to page before proceeding
            if (file.indexOf(".js")!=-1){ //If object is a js file
                fileref=document.createElement('script');
                fileref.setAttribute("type","text/javascript");
                fileref.setAttribute("src", file);
            }
            else if (file.indexOf(".css")!=-1){ //If object is a css file
                fileref=document.createElement("link");
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", file);
            }
        }
        if (fileref!=""){       
            document.getElementsByTagName("head").item(0).appendChild(fileref);
            loadedobjects+=file+" "; //Remember this object as being already added to page
        }
    }
}
/**********************end ajaxpage(for displaying main/about html page)******************************/

function clickButton(from) {    
    switch (from)
    {
    case "Main":
        document.getElementById('fMain').src = 'img/teal/tnt_home_128_active.png';
        break;
    case "Favorite":
        document.getElementById('fFavorite').src = 'img/teal/tnt_fav_128_active.png';
        break;
    case "History":
        document.getElementById('fHistory').src = 'img/teal/tnt_history_128_active.png';
        break;
    case "About":
        document.getElementById('fAbout').src = 'img/teal/tnt_about_128_active.png';
        break;
    case "ResetAll":        
        document.getElementById('fMain').src = 'img/teal/tnt_home_128.png';
        document.getElementById('fFavorite').src = 'img/teal/tnt_fav_128.png';
        document.getElementById('fHistory').src = 'img/teal/tnt_history_128.png';
        document.getElementById('fAbout').src = 'img/teal/tnt_about_128.png';
        break;
    case "screenSmall":
        document.getElementById('fScreen').src = 'img/screensSmall.png';
        break;
    case "screenBig":
        document.getElementById('fScreen').src = 'img/screensBig.png';
        break;
    default:
        document.getElementById('fMain').src = 'img/teal/tnt_home_128.png';
        document.getElementById('fFavorite').src = 'img/teal/tnt_fav_128.png';
        document.getElementById('fHistory').src = 'img/teal/tnt_history_128.png';
        document.getElementById('fAbout').src = 'img/teal/tnt_about_128.png';        
    }   
}

function openMain() {
    var imei = window.CustomNativeAccess.getImeiNumber();
    var did = window.CustomNativeAccess.getUuid();
    var unikid = window.CustomNativeAccess.uniqueData();
    var appv = window.CustomNativeAccess.appVersion();
    ajaxpage('http://depwsm.tntsb.com/mainpage2.php'+"?did="+did+"&unikid="+unikid+"&imei="+imei+"&appv="+appv+"&timestamp="+new Date().getTime(), 'wordResult');
    //Reset all clickable button (main, favorite, history, about)
    clickButton('ResetAll');
    clickButton('Main');
    ResizeWrapper(1);
    //call the setTimeOut to refresh the iScroll after each ajax call to show the scrollbar.
    setTimeout(onCompletion, 100);
    resetToast = true;
}

function openAbout() {
    var imei = window.CustomNativeAccess.getImeiNumber();
    var did = window.CustomNativeAccess.getUuid();
    var unikid = window.CustomNativeAccess.uniqueData();
    var appv = window.CustomNativeAccess.appVersion();
    ajaxpage('http://depwsm.tntsb.com/FooterAbout2.php'+"?did="+did+"&unikid="+unikid+"&imei="+imei+"&appv="+appv+"&timestamp="+new Date().getTime(), 'wordResult');
    //Reset all clickable button (main, favorite, history, about)
    clickButton('ResetAll');
    clickButton('About');
    ResizeWrapper(1);
    //call the setTimeOut to refresh the iScroll after each ajax call to show the scrollbar.
    setTimeout(onCompletion, 100);
    resetToast = true;
}

function openHistory() {    
    displayWordSearched();
    //Reset all clickable button (main, favorite, history, about)
    clickButton('ResetAll');
    clickButton('History');
    ResizeWrapper(1);
    //call the setTimeOut to refresh the iScroll after each ajax call to show the scrollbar.
    setTimeout(onCompletion, 100);
    resetToast = true;
}

function clearHistory() {
    var historyNo;
    
    for ( var i=0; i < maxHistory; i++){
        historyNo = "history" + i;
        
        if (historyNo != null){     
            storHistory.removeItem(historyNo);
        }
    }
    
    displayWordSearched();  
}

function switchImage(toSet) {   
    if(toSet == 'fav'){
        document.getElementById('favImage').src = 'img/teal/fav.png';
    }
    else if (toSet == 'unfav'){
        document.getElementById('favImage').src = 'img/teal/unfav.png';      
    }
}

function favStatus() {
    var wordToCheck = document.getElementById("txtWebSite").value;  
    var dataNo;
    
    for ( var i=1; i < maxFav; i++){
        dataNo = "data" + i;
        var valueNow = storFav.getItem(dataNo);
        
        if (valueNow == wordToCheck){       
            switchImage('fav');
            //if word already exist, no need to add to storage
            break;
        }
        if ((i+1) == maxFav){
            switchImage('unfav');
        }
    }
}

function removeFav(wordToRemove,stay){  
    var dataNo;
    
    for ( var i=0; i < maxFav; i++){
        dataNo = "data" + i;
        
        if (dataNo == wordToRemove){
            storFav.removeItem(dataNo);
            favStatus();
        }
    }
    
    if(stay != 1){    
        openFavorite('view');
    }   
}


//this function is used to sort data in local storage.
//Since favorite and history data are using the same storage, both data will be sorted.
function SortLocalStorage(){
    if(storFav.length > 0 ){        
        if(storHistory.length > 0){
            var localStorageArray = new Array(); 
            for (i=0;i<storHistory.length;i++){
                localStorageArray[i] = storHistory.getItem(storHistory.key(i)) + "_" + storHistory.key(i); 
            }
        }
        
        var sortedArray = localStorageArray.sort();     
        var sortedData=new String();
        for(k=0;k<localStorageArray.length;k++){
            sortedData += localStorageArray[k] + ", ";
        }
        return sortedData;
    }
    else{       
        return null;
    }
}

function openFavorite(inType) {
    var dataNo; 
    
    if(inType == 'add'){        
        if(document.getElementById("currentWord").innerText != "" && document.getElementById("currentWord").innerText != null){
            for ( var i=1; i < maxFav; i++){
                dataNo = "data" + i;                
                var valueNow = storFav.getItem(dataNo);
                
                if (valueNow == document.getElementById("currentWord").innerText){                  
                    //if word already exist, no need to add to storage
                    removeFav(dataNo,1);
                    break;
                }
                if (valueNow === null){
                    storFav.setItem(dataNo,document.getElementById("currentWord").innerText);
                    switchImage('fav');                 
                    break;
                }
            }
        }//end if
    }
    else if (inType == 'view' ){
        var keyname1 = storFav.key(i);
        var myFav ;
        var remDiv = "<DIV id='favRemove' style='COLOR: blue' onclick=" + "\"openFavorite('remove')" + "\"" + " >" + "REMOVE" + "</DIV>"
                
        var sortedData = SortLocalStorage();
        if(sortedData != null){
            var splitData = sortedData.split(", ");
            
            for ( var i=maxFav-1; i > -1; i--){
                if(splitData[i] != undefined || splitData[i] != null){
                    var subData = splitData[i].toString().split("_"); //// ayam,history8
                    
                    //Since local storage is shared between favorite and history
                    //have to check the entry
                    //history data will use _history
                    //favorite data will use _data 
                    if(splitData[i].toString().indexOf("_data") > -1){
                        dataNo = "data" + i;
                        var valueNow = storFav.getItem(subData[1]);
                        
                        if (valueNow != null){                          
                            var remDiv2 = "<img id='xbutton' style='vertical-align:middle; float:left; padding-right:10px; ' src='img/x2.jpg' onclick=" + "\"removeFav('" + subData[1] + "')" + "\"/>";
                            var place = "<DIV style='display: inline-block; vertical-align:middle; width:100%; padding-left: 10px; padding-top:5px; padding-bottom:5px; color: #0000FF; text-decoration:underline;'   >" + remDiv2 + "<a href='#' onclick=" + "\"findWordSuggLink('"  + valueNow + "')" + "\">" + valueNow  + "</a></DIV>";
                            
                            if (myFav == null){
                                myFav = place + "\n";
                            }
                            else {
                                myFav = place + "\n" + myFav;                   
                            }
                        }
                    } 
                }
            }
        }
    
        var remDiv = "<DIV id='favRemove' style='COLOR: blue' onclick=" + "\"openFavorite('remove')" + "\"" + " >" + "REMOVE" + "</DIV>"
        if (myFav != null){
            myFav = "Perkataan kegemaran: "  + "\n" + myFav;
        }
        else{
            myFav = "Perkataan kegemaran: "  + "\n";
        }       
        
        document.getElementById("wordResult").innerHTML = myFav; 
                
        //Reset all clickable button (main, favorite, history, about)
        clickButton('ResetAll');
        clickButton('Favorite');
        ResizeWrapper(1);
        //call the setTimeOut to refresh the iScroll after each ajax call to show the scrollbar.
        setTimeout(onCompletion, 100);
        resetToast = true;
    }
}


function storeWordSearched() {
    var entryAdded = false;
    for ( var i=1; i < maxHistory; i++){
        historyNo = "history" + i;
        var valueNow = storHistory.getItem(historyNo);
        
        if (valueNow == document.getElementById("txtWebSite").value){           
            //if word already exist, no need to add to storage
            entryAdded = true;
            break;
        }
        if (i + 1 == maxHistory){
            //check whether the next number is equal to maximum history
            historyMaxHit = true;
        }
        if (valueNow === null){
            storHistory.setItem(historyNo,document.getElementById("txtWebSite").value);
            entryAdded = true;
            break;
        }
    }
    if (historyMaxHit == true && entryAdded == false){
        for ( var k=1; k < maxHistory; k++){
            historyNo = "history" + k;
            
            //get next data
            var  historyNoNext;
            if(k + 1 < maxHistory){
                historyNoNext = "history" + (k + 1);
                var nextData = storHistory.getItem(historyNoNext);
                storHistory.setItem(historyNo,nextData);
            }
        }
        historyNo = "history" + (maxHistory - 1);
        storHistory.setItem(historyNo,document.getElementById("txtWebSite").value);
        historyMaxHit = false;
    }
}

function displayWordSearched() {
    var myHistory ;
    var remDiv2 = "<img id='xbutton2' style='vertical-align:middle; display: block; margin-left: auto; margin-right: auto; ' src='img/xword.png' onclick=" + "\"clearHistory('" + "" + "')" + "\"/>";
    var sortedData = SortLocalStorage();
    
    if(sortedData != null){     
        var splitData = sortedData.split(", ");
        
        //This method does not sort the entry in history list
        for ( var i=0; i < maxHistory; i++){
            historyNo = "history" + i;
            var valueNow = storHistory.getItem(historyNo);
            
            if (valueNow != null){            
                //var place = "<DIV style='color: #0000FF; text-decoration:underline; padding-left: 10px; padding-right: 10px; padding-top:5px; padding-bottom:5px;' onclick=" + "\"findWordSuggLink('"  + valueNow + "')" + "\"" + " >" + valueNow + "</DIV>";
                var place = "<DIV style='display: inline-block; vertical-align:middle; width:100%; padding-left: 10px; padding-top:5px; padding-bottom:5px; color: #0000FF; text-decoration:underline;'><a href='#' ontouchstart=" + "\"findWordSuggLink('"  + valueNow + "')" + "\">" + valueNow  + "</a></DIV>";//&nbsp;";
                
                if (myHistory == null){
                    myHistory = place + "\n";
                }
                else {
                    myHistory = place + "\n" + myHistory;                   
                }   
            }
        }
    }
    
    //This method will sort the entry in history list
    /*for(b=splitData.length-1; b>-1; b--){     
        var subData = splitData[b].toString().split("_"); //// ayam,history8        
        
        //Since local storage is shared between favorite and history
        //have to check the entry
        //history data will use _history
        //favorite data will use _data 
        if(splitData[b].toString().indexOf("_history") > -1){           
            var valueNow = storHistory.getItem(subData[1]);
            
            if (valueNow != null){              
                var place = "<DIV style='BACKGROUND-IMAGE: url(http://depwsm.tntsb.com/bgtab1.png); COLOR: white' onclick=" + "\"findWordSuggLink('"  + valueNow + "')" + "\"" + " >" + valueNow + "</DIV>";
                if (myHistory == null){                 
                    myHistory = place + "\n";
                }
                else {                  
                    myHistory = place + "\n" + myHistory;                   
                }
            }
        }
    }*/    
    
    if (myHistory != null){
         myHistory = "Sejarah carian sebelum ini: " + "\n" + myHistory + "\n" + remDiv2 + "<br/><br/><br/>";
    }
    else{
         myHistory = "Sejarah carian sebelum ini: " + "\n" + remDiv2 + "<br/><br/><br/>";
    }
        
    document.getElementById("wordResult").innerHTML = myHistory;
    ResizeWrapper(1);
    //setTimeout("ResizeWrapper()", 1000);
    setTimeout(onCompletion, 100);  //refresh iscroll
}

function chgImg() {
    var curImg = document.getElementById("srcBtn");
    curImg.setAttribute("src","img/btnSearch_150pc.png");
}   

/*
//for scrolling
var myScroll;
function loaded() {
    //setTimeout(function () { 
      //  myScroll = new iScroll('wrapper',{checkDMChanges:false});
//},4000);
    myScroll = new iScroll('wrapper'); //default
    //myScroll = new iScroll('wrapper', { zoom:true }); //with zoom ability
    //myScroll = new iScroll('wordResult', { zoom:true }); //with zoom ability
    setTimeout(function () { myScroll.refresh(); }, 0);
    
}
//window.alert("loaded");
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', loaded, false);
*/
function onCompletion () {
//alert("completion");
     
// Here modify the DOM in any way, eg: by adding LIs to the scroller UL 
// Refresh the iScroll a few times (5 seconds interval) until 20 seconds.
// Reasons: Sometimes data (retrieve through ajax) take time to display.
// After the first word search, the scrollbar will not appear until 
// 1) Change device orientation, OR
// 2) or refresh iscroll.  
// Note: 1 seconds = 1000 milisecond
setTimeout(function () {myScroll.refresh();}, 0);

//setTimeout(function () {myScroll.refresh();}, 2000);
//setTimeout(function () {myScroll.refresh();}, 5000);
//setTimeout(function () {myScroll.refresh();}, 10000);
//setTimeout(function () {myScroll.refresh();}, 15000);
//setTimeout(function () {myScroll.refresh();}, 20000);

//setTimeout(function () {myScroll.refresh(); window.alert("onCompletion6");}, 25000);
//window.alert("onCompletion"); 
};

function setActiveTab(tabId){   
    activeTab = tabId;
}
    
function toggle(display) {  
    var ele = document.getElementById("animation");
      
    if(display == "show") {     
        ele.style.display = "inline";
    }
    else {      
        ele.style.display = "none";
    }
}

function show(tabId){   
    setActiveTab(tabId);    
    var tabpagediv = document.body.getElementsByTagName("div");
    
    for (i = 0; i < tabpagediv.length; i++) {
        if ( tabpagediv[i].id != null && tabpagediv[i].id.substring(0,4) == "bdy_" ) {
            tabpagediv[i].style.display = 'none';
        }
        else if ( tabpagediv[i].id != null && tabpagediv[i].id.substring(0,4) == "tab_" ) {
            tabpagediv[i].style.backgroundImage = 'url(img/teal/bgtab1.png)';            
            tabpagediv[i].style.color = 'white';
            var tid1 = tabpagediv[i].id;
            tid1 = tid1.replace("tab_","");
            var tid2 = tabId;
            tid2 = tid2.replace("bdy_","");
            if (tid1 == tid2) {
                tabpagediv[i].style.backgroundImage = 'url(img/teal/bgtab3.png)';
                tabpagediv[i].style.color = 'black';
            }
        }            
    }   
    
    var tab = document.getElementById(tabId);    
    if (tab != null) {
        tab.style.display = 'block';
        setTimeout(onCompletion, 100);  //refresh iscroll
    }       
}

/*swipe function put in app
function swipeTab(tab, swipeTo){
        alert("swipeTo in server");
        //in sequence
        //  bdy_KDE 0
        //  bdy_KIM 1
        //  bdy_KMI 2
        //  bdy_KMC 3
        //  bdy_KST 4
        //  bdy_PRB 5
        //  bdy_SIB 6
          
        var totalTab = new Array("bdy_KDE", "bdy_KIM", "bdy_KMI", "bdy_KMC", "bdy_KST", "bdy_PRB", "bdy_SIB");
        var currentTab = activeTab;
        var tabIndex; //current tab nombor in array
        var nextTab; //next tab nombor in array
        var prevTab; //previous tab nombor in array
        
        
        for(a=0; a< totalTab.length; a++){
            if (totalTab[a] == currentTab){
                tabIndex = a;
                if((a + 1 != totalTab.length) && swipeTo == "left"){
                    nextTab = a + 1;
                    activeTab = totalTab[nextTab];
                    show(totalTab[nextTab]);
                    break;                  
                }
                if((a - 1 != -1) && swipeTo == "right"){
                    prevTab = a - 1;
                    activeTab = totalTab[prevTab];
                    show(totalTab[prevTab]);
                    break;                  
                }
                
                if((a + 1 == totalTab.length) || (a-1 == -1)){
          //if active tab is the last tab/first tab (number same as total tab or less than 0), don't swipe.
                    break;
                }
                
                
            }
        }
        //alert("end swipeTo");
} 

//swipe between div tab
$(function() {
      //alert(activeTabServ);          
      
      //swipe to left tab
      $('#wrapper').bind('swiperight', function(event) {      
          
          //Action that will occur when the swipe class is swiped
          alert("Right swipe in server");          
          swipeTab(activeTab, "right");
       });
       
      //swipe to right tab
      $('#wrapper').bind('swipeleft', function(event) { 
      
          //Action that will occur when the swipe class is swiped
          alert("left swipe in server");          
          swipeTab(activeTab, "left");
      });
    
});
*/    

/*function admob_fetch(){
    if(typeof (beforeAdmob) == 'function'){
        beforeAdmob();
    }
    if(admobDisplayed == false){
        var ad = _admob.fetchAd(document.getElementById('admob_ad'));       
        var polling_timeout = 0;

        var polling_func = function() {
            var adElement = document.getElementById("adTnt");
            var admob = document.getElementById("admob_ad");
            var outer_admob = document.getElementById("outer_admob_ad");

            if(ad.adEl.height == 48) {              
                //hide build-in tnt ad. It will be replaced with live ad from admob
                adElement.style.display = 'none';
                outer_admob.style.display = 'block';
                //outer_admob.style.marginLeft = 'auto';
                //outer_admob.style.marginRight = 'auto';
                admobDisplayed = true;
                ResizeWrapper();
            } 
            else if(polling_timeout < 5000) {               
                polling_timeout += 1000;
                window.setTimeout(polling_func, 1000);
            }
            else {
                //show build-in tnt ad
                adElement.style.display = 'block';              
                ResizeWrapper();
            }           
        };
        window.setTimeout(polling_func, 1000);      
    }
}*/

function callbackfunction(){
    //console.log('Plugin error output');
}

//encode word in text box, call depwebapp.aspx
function showIndex(dict){
    swipeSearch = "indBrowser";

    //retrieve the phone id using native code
    var imei = window.CustomNativeAccess.getImeiNumber();
    var did = window.CustomNativeAccess.getUuid();
    var unikid = window.CustomNativeAccess.uniqueData();
    var appv = window.CustomNativeAccess.appVersion();
    
    if(document.getElementById("txtWebSite").value){
        var encryptedWord = window.CustomNativeAccess.wordChange(document.getElementById("txtWebSite").value, did);
        var link = "http://depwsm.tntsb.com/depwebapp.aspx?index=" + encryptedWord + "&did="+did+"&unikid="+unikid+"&imei="+imei+"&appv="+appv+"&dict="+dict+"&timestamp="+new Date().getTime();
        globe = link;
        var firstTabToOpen="";
        var xmlhttp;
        //to show/unhide gif loader during word searching
        var dispShow = "show";
        var dispHide = "hide";
        toggle(dispShow);
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //Cancel timeout
                clearTimeout(xmlHttpTimeout);
                
                document.getElementById("wordResult").innerHTML = xmlhttp.responseText;
        
                //Check the word whether it's in the favorite list
                //favStatus();
                
                //get the active tab
                //firstTabToOpen = document.getElementById("firstTab").innerHTML;
                
                //set the active tab
                dict = "bdy_" + dict;
                activeTab = dict;
                
                //method 1 :: if want to delay the call to set active tab
                //var t = setTimeout(function(){show(firstTabToOpen)},500); 
                
                //method 2 :: show instantly                
                show(dict);
                
                //display/hide animation when searching word
                toggle(dispHide);
                
                //store word in history
                //storeWordSearched();
            }
        }
        
        xmlhttp.open("POST", link, true);
        xmlhttp.send();
        
        // Timeout to abort in 15 seconds
        var xmlHttpTimeout=setTimeout(ajaxTimeout,15000);
        function ajaxTimeout(){
            xmlhttp.abort();
            //alert("Connection to server unsuccessful.  Please check your Internet connection and try again.\nSambungan ke pelayan tidak berjaya.  Sila pastikan anda telah bersambung ke Internet dan cuba lagi.");
            navigator.notification.alert("Connection to server unsuccessful.  Please check your Internet connection and try again.\nSambungan ke pelayan tidak berjaya.  Sila pastikan anda telah bersambung ke Internet dan cuba lagi.", callbackfunction, "Kamus Pro", "OK");
            toggle(dispHide);
        }

        setTimeout("ResizeWrapper(1)", 1000);
        
        //call the setTimeOut to refresh the iScroll after each ajax call to show the scrollbar.
        setTimeout(onCompletion, 100);
        //Reset all clickable button (main, favorite, history, about)
        clickButton('ResetAll');
        //fetch ad from admob
        //setTimeout(admob_fetch, 3000);
    }
}

//encode index, call depwebapp.aspx to fetch index list
function findIndex(index, dict){
    swipeSearch = "indBrowser";

    //retrieve the phone id using native code
    var imei = window.CustomNativeAccess.getImeiNumber();
    var did = window.CustomNativeAccess.getUuid();
    var unikid = window.CustomNativeAccess.uniqueData();
    var appv = window.CustomNativeAccess.appVersion();
    
    var checkIndex=true;
    if(index == ""){
        //checkIndex = false;
        index = "a";
    }
    
    if(activeTab != null){
        var temDict = activeTab.substring(4);
        if(dict != temDict){
            dict = temDict;
        }
    }
    
    //Check if the element have value (user input). If word exists, continue searching. 
    //If not, display message to user.
    if(index != null && checkIndex == true){
        var encryptedWord = window.CustomNativeAccess.wordChange(index, did);
        var link = "http://depwsm.tntsb.com/depwebapp.aspx?index=" + encryptedWord + "&did="+did+"&unikid="+unikid+"&imei="+imei+"&appv="+appv+"&dict="+dict+"&timestamp="+new Date().getTime();
        globe = link;
        var firstTabToOpen="";
        var xmlhttp;
        //to show/unhide gif loader during word searching
        var dispShow = "show";
        var dispHide = "hide";
        toggle(dispShow);
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //Cancel timeout
                clearTimeout(xmlHttpTimeout);
                
                document.getElementById("wordResult").innerHTML = xmlhttp.responseText;
                document.getElementById('txtWebSite').value = document.getElementById('currentWord').innerText;
                
                //Check the word whether it's in the favorite list
                //favStatus();                
                
                //get the active tab
                firstTabToOpen = document.getElementById("firstTab").innerHTML;
                
                //set the active tab
                activeTab = firstTabToOpen;
                
                //method 1 :: if want to delay the call to set active tab
                //var t = setTimeout(function(){show(firstTabToOpen)},500); 
                
                //method 2 :: show instantly                
                show(firstTabToOpen);

                //display/hide animation when searching word
                toggle(dispHide);
                
                //store word in history
                //storeWordSearched();
            }
        }
        
        xmlhttp.open("POST", link, true);
        xmlhttp.send();
        
        // Timeout to abort in 15 seconds
        var xmlHttpTimeout=setTimeout(ajaxTimeout,15000);
        function ajaxTimeout(){
            xmlhttp.abort();
            //alert("Connection to server unsuccessful.  Please check your Internet connection and try again.\nSambungan ke pelayan tidak berjaya.  Sila pastikan anda telah bersambung ke Internet dan cuba lagi.");
            navigator.notification.alert("Connection to server unsuccessful.  Please check your Internet connection and try again.\nSambungan ke pelayan tidak berjaya.  Sila pastikan anda telah bersambung ke Internet dan cuba lagi.", callbackfunction, "Kamus Pro", "OK");
            toggle(dispHide);
        }

        setTimeout("ResizeWrapper(1)", 1000);
          
        //call the setTimeOut to refresh the iScroll after each ajax call to show the scrollbar.
        setTimeout(onCompletion, 100);
        //Reset all clickable button (main, favorite, history, about)
        clickButton('ResetAll');
    }
    /*else{
        //alert("Sila masukkan perkataan yang ingin dicari terlebih dahulu!");
        navigator.notification.alert("Sila masukkan perkataan yang ingin dicari terlebih dahulu!", callbackfunction, "Kamus Pro", "OK");
    }*/
}

function findWordSuggLink(suggWord) {
    swipeSearch = "normalSearch";
    //retrieve the phone id using native code
    var imei = window.CustomNativeAccess.getImeiNumber();
    var did = window.CustomNativeAccess.getUuid();
    var unikid = window.CustomNativeAccess.uniqueData();
    var appv = window.CustomNativeAccess.appVersion();
    var encryptedWord = window.CustomNativeAccess.wordChange(suggWord, did);    
    var link = "http://depwsm.tntsb.com/depwebapp.aspx?word=" + encryptedWord + "&did="+did+"&unikid="+unikid+"&imei="+imei+"&appv="+appv+"&timestamp="+new Date().getTime();
    
    var firstTabToOpen="";
    var xmlhttp;
    //to show/unhide gif loader during word searching
    var dispShow = "show";
    var dispHide = "hide";
    toggle(dispShow);
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
       xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
       xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //Cancel timeout
            clearTimeout(xmlHttpTimeout);
            
            document.getElementById("wordResult").innerHTML = xmlhttp.responseText;
            document.getElementById('txtWebSite').value = document.getElementById('currentWord').innerText;
            
            //Check the word whether it's in the favorite list
            favStatus();
            
            //get the active tab
            firstTabToOpen = document.getElementById("firstTab").innerHTML;
            
            //set the active tab
            activeTab = firstTabToOpen;

            //method 1 :: if want to delay the call to set active tab
            //var t = setTimeout(function(){show(firstTabToOpen)},500); 
            
            //method 2 :: show instantly
            show(firstTabToOpen);
            
            //display/hide animation when searching word
            toggle(dispHide);
            
            //store word in history
            storeWordSearched();
        }
    }
    
    xmlhttp.open("POST", link, true);
    xmlhttp.send();
    
    // Timeout to abort in 15 seconds
    var xmlHttpTimeout=setTimeout(ajaxTimeout,15000);
    function ajaxTimeout(){
        xmlhttp.abort();
        //alert("Connection to server unsuccessful.  Please check your Internet connection and try again.\nSambungan ke pelayan tidak berjaya.  Sila pastikan anda telah bersambung ke Internet dan cuba lagi.");
        navigator.notification.alert("Connection to server unsuccessful.  Please check your Internet connection and try again.\nSambungan ke pelayan tidak berjaya.  Sila pastikan anda telah bersambung ke Internet dan cuba lagi.", callbackfunction, "Kamus Pro", "OK");
        toggle(dispHide);
    }
    
    setTimeout("ResizeWrapper(1)", 1000);
    
    //call the setTimeOut to refresh the iScroll after each ajax call to show the scrollbar.
    setTimeout(onCompletion, 100);
      
    //Reset all clickable button (main, favorite, history, about)
    clickButton('ResetAll');
    //fetch ad from admob
    //setTimeout(admob_fetch, 3000);
    resetToast = false;
}


function findWordNotApp() {
    swipeSearch = "normalSearch";
    //retrieve the phone id using native code
    var imei = window.CustomNativeAccess.getImeiNumber();
    var did = window.CustomNativeAccess.getUuid();
    var unikid = window.CustomNativeAccess.uniqueData();
    var appv = window.CustomNativeAccess.appVersion();
    
    //Check if the element have value (user input). If word exists, continue searching. 
    //If not, display message to user.
    if(document.getElementById("txtWebSite").value){
        var encryptedWord = window.CustomNativeAccess.wordChange(document.getElementById("txtWebSite").value, did);
        var link = "http://depwsm.tntsb.com/depwebapp.aspx?word=" + encryptedWord + "&did="+did+"&unikid="+unikid+"&imei="+imei+"&appv="+appv+"&timestamp="+new Date().getTime();
        globe = link;
        var firstTabToOpen="";
        var xmlhttp;
        //to show/unhide gif loader during word searching
        var dispShow = "show";
        var dispHide = "hide";
        toggle(dispShow);
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //Cancel timeout
                clearTimeout(xmlHttpTimeout);
                
                document.getElementById("wordResult").innerHTML = xmlhttp.responseText;
        
                //Check the word whether it's in the favorite list
                favStatus();
                
                //get the active tab
                firstTabToOpen = document.getElementById("firstTab").innerHTML;
                
                //set the active tab
                activeTab = firstTabToOpen;
                
                //method 1 :: if want to delay the call to set active tab
                //var t = setTimeout(function(){show(firstTabToOpen)},500); 
                
                //method 2 :: show instantly
                show(firstTabToOpen);
                
                //display/hide animation when searching word
                toggle(dispHide);
                
                //store word in history
                storeWordSearched();
            }
        }
        
        xmlhttp.open("POST", link, true);
        xmlhttp.send();
        
        // Timeout to abort in 15 seconds
        var xmlHttpTimeout=setTimeout(ajaxTimeout,15000);
        function ajaxTimeout(){
            xmlhttp.abort();
            //alert("Connection to server unsuccessful.  Please check your Internet connection and try again.\nSambungan ke pelayan tidak berjaya.  Sila pastikan anda telah bersambung ke Internet dan cuba lagi.");
            navigator.notification.alert("Connection to server unsuccessful.  Please check your Internet connection and try again.\nSambungan ke pelayan tidak berjaya.  Sila pastikan anda telah bersambung ke Internet dan cuba lagi.", callbackfunction, "Kamus Pro", "OK");
            toggle(dispHide);
        }

        setTimeout("ResizeWrapper(1)", 1000);
          
        //call the setTimeOut to refresh the iScroll after each ajax call to show the scrollbar.
        setTimeout(onCompletion, 100);
        //Reset all clickable button (main, favorite, history, about)
        clickButton('ResetAll');
        //fetch ad from admob
        //setTimeout(admob_fetch, 3000);
        resetToast = false;
    }
    else{
        //alert("Sila masukkan perkataan yang ingin dicari terlebih dahulu!");
        navigator.notification.alert("Sila masukkan perkataan yang ingin dicari terlebih dahulu!", callbackfunction, "Kamus Pro", "OK");
    }         
}
