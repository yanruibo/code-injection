




		$(document).bind('mobileinit', function() {
			$.mobile.page.prototype.options.addBackBtn = false;
			$.mobile.defaultPageTransition="none";
		});
	



var userId, nickname, useremail, password, telephone, userWay, userPoints, picture, userRanking, isCheckedIn;
var fbId, fbNickname, fbEmail;
var userDataArray, hallArray, rankingListArray, friendArray;
var stadionLat, stadionLon;
var hallId, nearHall, hallDistanceFromHome, gameId, homeTeam, awayTeam, pointsForStadion;
var time, checkInDay, actualDay;

var goToRankingList = 'no', refreshRanking = 'no', fromOwnStatistik = 'no', goToFriendFinder = 'no';
var infoNoStadionGame;

var actualUserId;
//var gaPlugin;
var devicePlatform;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).bind('ready', function() {
	console.log("jquery " + new Date().getTime());
	
	document.addEventListener("deviceready", onDeviceReady, false);
	document.addEventListener("pause", onPause, false);
	document.addEventListener("resume", onResume, false);
});

function onDeviceReady() {
	$.mobile.showPageLoadingMsg();

	console.log("Phonegap - onDeviceReady " + new Date().getTime());
	
	//gaPlugin = window.plugins.gaPlugin;
    //gaPlugin.init(gaInit, gaError, "UA-426574-24", 10);
	//gaPlugin.trackEvent(gaInit, gaError, "KAC Check-In App", "App-Start", "event", 1); // Kategorie, Aktion, Label
	
	//document.addEventListener("pause", onPause, false);
	//document.addEventListener("resume", onResume, false);
	
	devicePlatform = device.platform; // String - iOS or Android
	
	if (devicePlatform == "iOS") {$(".backgroundPrices").css({"background":"#e30614 url('images/grafics/gewinne_ios.jpg') no-repeat", "background-size":"100% 100%"});}
	else {$(".backgroundPrices").css({"background":"#e30614 url('images/grafics/gewinne.jpg') no-repeat", "background-size":"100% 100%"});}
	
	/*
	window.localStorage.setItem("Name_KAC_APP", "Martina");
	window.localStorage.setItem("Passwort_KAC_APP", "a");
	window.localStorage.setItem("Email_KAC_APP", "a@a.at");
	window.localStorage.setItem("FbId_KAC_APP", "empty");
	
	//test - test@test.at - test123
	*/
	
	checkForInternet();
	watchGeolocation(); 
	
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	
	if (dd < 10) {dd = '0' + dd;} 
	if (mm < 10) {mm = '0' + mm;} 
	
	actualDay = yyyy + '-' + mm + '-' + dd;
	//console.log("actual day " + actualDay);
	
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
	
	navigator.splashscreen.hide();
	
	//console.log(window.localStorage.getItem("Name_KAC_APP") + " & FB " + window.localStorage.getItem("FbId_KAC_APP"));
}

function onResume() {	
	//console.log("App in the front - " + devicePlatform);  
	
	$('#iconGps').attr('src', 'images/icons/iconGpsOff.png');
	
	watchGeolocation();
	
	if (navigator.connection.type == Connection.NONE) { 
		$.mobile.changePage('#Page1');
		
		$('#login_form').hide();
		$('#page1Header').hide();
		$('#logged_in').hide();
		$('#infoInternet').show();
	}

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	
	if (dd < 10) {dd = '0' + dd;} 
	if (mm < 10) {mm = '0' + mm;} 
	
	var now = yyyy + '-' + mm + '-' + dd;
	
	if (now != actualDay) {
		actualDay = now;
		//console.log("now != actualDay - Update DB Data - actual day " + actualDay);
		getDbData();
	}
}

function onPause() {	
	//console.log("App in the background - stop watch Geo");
	
	navigator.geolocation.clearWatch(watchHighAccuracy);
	navigator.geolocation.clearWatch(watchLowAccuracy);
	
	//friendArray = [];
}

function checkForInternet(button) {	
	//console.log("Check for Internet");
	
	if (navigator.connection.type != Connection.NONE) { 
		$('#infoInternet').hide();
		startAppData();
	}
	else {
		if (button != 1) {
			navigator.notification.alert('Du benötigst eine Verbindung zum Internet, um die App nutzen zu können!', alertDismissed, 'Keine Internetverbindung', 'OK');
		}
	
		$.mobile.changePage('#Page1');
		
		$('#login_form').hide();
		$('#page1Header').hide();
		$('#logged_in').hide();
		$('#infoInternet').show();
		
		$.mobile.hidePageLoadingMsg();
	}
}

function startAppData() {
	getAllHalls();
	
	checkInDay = window.localStorage.getItem("CheckInDay_KAC_APP");
	
	console.log("Nickname " + window.localStorage.getItem("Name_KAC_APP"));
	
	if (!window.cordova) {
		console.log("!window.cordova");
		var appId = prompt("Enter FB Application ID", "");
		facebookConnectPlugin.browserInit(appId);
	}
	
	
	//window.localStorage.clear();
	//if ((window.localStorage.getItem("Name_KAC_APP")) != null && (window.localStorage.getItem("Passwort_KAC_APP")) != null && (window.localStorage.getItem("Email_KAC_APP")) != null) {
	if ((window.localStorage.getItem("Name_KAC_APP")) != null && (window.localStorage.getItem("Email_KAC_APP")) != null) {
		nickname = window.localStorage.getItem("Name_KAC_APP");
		password = window.localStorage.getItem("Passwort_KAC_APP");
		useremail = window.localStorage.getItem("Email_KAC_APP");
		fbId = window.localStorage.getItem("FbId_KAC_APP");
		
		if (fbId != "empty") {
			fbId = fbId;
			fbNickname = nickname;
			fbEmail = useremail;

			console.log("now to FBLogin");
			
			FBLogin();
		}
		else {
			console.log("now to getDbData");
			
			getDbData();
		}
	}
	else{
		$.mobile.hidePageLoadingMsg();
		
		$('#login_form').show();
		$('#page1Header').hide();
		$('#logged_in').hide();
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//<!-- Facebook -->	
function facebookLoginButton() {
	//gaPlugin.trackEvent( gaInit, gaError, "KAC Check-In App", "Mit Facebook anmelden", "event", 1); // Kategorie, Aktion, Label

	console.log("facebookLoginButton");
	
	$.mobile.showPageLoadingMsg();
	
	// FB.getLoginStatus(function(response) {
	facebookConnectPlugin.getLoginStatus(function (response) {
		console.log("getLoginStatus");
		
		if (response.status == 'connected'){
			console.log('FB already logged in');
			checkIfNewFbUser();
		}
		else if (response.status === 'not_authorized') {
			$.mobile.hidePageLoadingMsg();
			console.log("Logged in to FB but has not authenticated the app");
		}
		else {
			$.mobile.hidePageLoadingMsg();
			FBLogin();
		}
	});
}

function FBLogin() {
	console.log("Start FBLogin");
	
	$.mobile.showPageLoadingMsg();
	
	facebookConnectPlugin.login(["email"],
		function (response) {
			if (response.status == 'connected') {
				//console.log('FB now logged in ' + JSON.stringify(response));
				console.log('FB now logged in');
				
				facebookConnectPlugin.api( "me/?fields=id,email,name", [],
					function (response) {
						fbId = response.id;
						fbEmail = response.email;
						fbNickname = response.name;
						
						var fbImageLink = "http://graph.facebook.com/" + fbId + "/picture";
					
						checkIfNewFbUser();
					}
				); 
			}
			else {
				console.log('FB login not worked');
				
				$.mobile.hidePageLoadingMsg();
				
				$.mobile.changePage('#Page1');
				$('#login_form').show();
				$('#page1Header').hide();
				$('#logged_in').hide();
			}
		},
		function (response) {
			console.log("Error " + JSON.stringify(response));
		}
	);
}

function checkIfNewFbUser() {
	console.log("checkIfNewFbUser " + fbId + " & FB " + fbNickname);
	
	$.ajax({
		type: "POST",
		url: "http://secure.webwerk.at/kac-check-in/checkFbUser.php",
		data: ({
			'fbId': fbId,
			'fbNickname': fbNickname,
			'fbEmail': fbEmail 
		}),
		cache: false,
		dataType: "json",
		success: function (result) {
			if (result == "0") {
				console.log("neuer FB Nutzer");
				
				nickname = fbNickname;
				useremail = fbEmail;
				password = "";
				
				window.localStorage.setItem("Name_KAC_APP", nickname);
				window.localStorage.setItem("Email_KAC_APP", useremail);
				window.localStorage.setItem("Passwort_KAC_APP", password);
				window.localStorage.setItem("FbId_KAC_APP", fbId);
			}
			else {
				console.log("FB Nutzer vorhanden");
				
				var fbUserDataArray = [];
				$.each(result, function(i,item){		
					fbUserDataArray.push([
						item.userNickname,
						item.userEmail
					]); 
				});	
				
				nickname = fbUserDataArray[0][0];
				useremail = fbUserDataArray[0][1];
			}
			
			//$.mobile.hidePageLoadingMsg();
			
			getDbData();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest.responseText);
			console.log(XMLHttpRequest.statusText);
			console.log(textStatus);
			console.log(errorThrown);
				
			//navigator.notification.alert('Probleme bei der Serververbindung!', alertDismissed, 'Information', 'OK');
			$.mobile.hidePageLoadingMsg();
		}
	});
}

/*
function testPostFB(){
	var nameText = nickname + " Test 123";
	var postText = "Test - Post Text!";
	
	console.log("testPostFB " + nearHall);
	
	var params = {
		method: 'feed',
		name: nameText,
		//link: 'https://developers.facebook.com/docs/reference/dialogs/',
		link: 'http://www.kac.at/check-in-app/',
		picture: 'http://secure.webwerk.at/kac-check-in/fbPostIcon.png',
		caption: nearHall,
		description: postText
	};
	
	facebookConnectPlugin.showDialog(params,
		function (response) {console.log(JSON.stringify(response));},
		function (response) {console.log(JSON.stringify(response));}
	);
}
*/

function postToMyFbWall() {
	var nameText = nickname + " hat mit der KAC Check-In App powered by Hirter Bier eingecheckt.";
	var postText = "Der EC-KAC und Hirter wünschen viel Spaß beim Spiel " + homeTeam + " vs. " + awayTeam + "!";
	
	var params = {
		method: 'feed',
		name: nameText,
		link: 'http://www.kac.at/check-in-app/',
		picture: 'http://secure.webwerk.at/kac-check-in/fbPostIcon.png',
		caption: nearHall,
		description: postText
	};

	facebookConnectPlugin.showDialog(params,
		function (response) {
			console.log("Success " + JSON.stringify(response));
		},
		function (response) {
			console.log("Error " + JSON.stringify(response));
		}
	);
}

function postOnFriendsWall(friendFbId) {
	var nameText = nickname + " hat mit der KAC Check-In App powered by Hirter Bier eingecheckt.";
	var postText = "Wie wär's, wenn du dich mit " + nickname + " in der Drittelpause auf ein köstliches Hirter Bier triffst?";
	
	var params = {
		method: 'feed',
		to: friendFbId.toString(),
		name: nameText,
		//link: 'https://developers.facebook.com/docs/reference/dialogs/',
		link: 'http://www.kac.at/check-in-app/',
		picture: 'http://secure.webwerk.at/kac-check-in/fbPostIcon.png',
		caption: nearHall,
		description: postText
	};
	
	facebookConnectPlugin.showDialog(params,
		function (response) {
			console.log("Success " + JSON.stringify(response));
		},
		function (response) {
			console.log("Error " + JSON.stringify(response));
		}
	);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//<!-- Geolocation -->	
var lat, lon, accuracy;
var latOld, lonOld, accuracyOld;
var latHigh, lonHigh, accuracyHigh;
var latLow, lonLow, accuracyLow;
var watchHighAccuracy = null, watchLowAccuracy = null;

var errorNrGeoHigh, errorNrGeoLow;

var geoStartTime, geoStartTimeHigh, geoStartTimeLow;
var textGeoInfo;
var countTrysHighGPS;
var searchForGPS;

var isGpsActive;
var maxDistanceMeter;

function watchGeolocation() {
	console.log("Start Geo");
	
	isGpsActive = "yes";
	searchForGPS = "yes";
	
	lat = undefined, lon = undefined, accuracy = undefined;
	latOld = undefined, lonOld = undefined, accuracyOld = undefined;
	latHigh = undefined, lonHigh = undefined, accuracyHigh = undefined;
	latLow = undefined, lonLow = undefined, accuracyLow = undefined;
	
	errorNrGeoHigh = undefined, errorNrGeoLow = undefined;
	
	textGeoInfo = "";
	
	countTrysHighGPS = 1;
	
	geoStartTimeHigh = new Date().getTime();

	navigator.geolocation.clearWatch(watchHighAccuracy);
	
	watchHighAccuracy = navigator.geolocation.watchPosition(
		onSuccessGeoHigh, 
		errorGeoHighAccuracy, 
		{maximumAge: 0, timeout: 10000, enableHighAccuracy: true});
}

function errorGeoHighAccuracy(error) { 
	var geoEndTime = new Date().getTime() - geoStartTimeHigh;
	
	//console.log("High-Geo Error " + geoEndTime + "ms " + error.code);
	
	geoStartTimeHigh = new Date().getTime();
	
	errorNrGeoHigh = error.code;
	
	if (errorNrGeoHigh == 2){
		searchForGPS = "no";
		
		//console.log("Geo watchLowAccuracy");
		
		geoStartTimeLow = new Date().getTime();
		
		navigator.geolocation.clearWatch(watchHighAccuracy);
		
		navigator.geolocation.clearWatch(watchLowAccuracy);
		watchLowAccuracy = navigator.geolocation.watchPosition(
			onSuccessGeoLow,
			errorGeoLowAccuracy, 
			{maximumAge: 0, timeout: 10000, enableHighAccuracy: false});
	}
	else if(errorNrGeoHigh == 3) {
		geoStartTimeLow = new Date().getTime();
		
		navigator.geolocation.clearWatch(watchLowAccuracy);
		watchLowAccuracy = navigator.geolocation.watchPosition(
			onSuccessGeoLow, 
			errorGeoLowAccuracy, 
			{maximumAge: 0, timeout: 10000, enableHighAccuracy: false});
		
		if (countTrysHighGPS <= 5) {
			searchForGPS = "yes";
			
			geoStartTimeHigh = new Date().getTime();
			
			//console.log("Geo High Versuch Nr " + countTrysHighGPS);
			
			navigator.geolocation.clearWatch(watchHighAccuracy);
			watchHighAccuracy = navigator.geolocation.watchPosition(
				onSuccessGeoHigh, 
				errorGeoHighAccuracy, 
				{maximumAge: 0, timeout: 60000, enableHighAccuracy: true});
		}
		else {
			searchForGPS = "no";
			
			navigator.geolocation.clearWatch(watchHighAccuracy);
		}
		
		countTrysHighGPS ++;
	}
	else {
		isGpsActive = "no";
		searchForGPS = "no";
		
		$('#iconGps').attr('src', 'images/icons/iconGpsOff.png');
		textGeoInfo = "Aktiviere bitte die Ortungsdienste auf deinem Smartphone, um der App das Orten deines Standorts zu erlauben!";
	}
}

function errorGeoLowAccuracy(error) { 
	var geoEndTime = new Date().getTime() - geoStartTimeLow;
	
	//console.log("Low-Geo Error " + geoEndTime + "ms " + error.code);
	
	geoStartTimeLow = new Date().getTime();
	
	errorNrGeoLow = error.code;
	
	if (errorNrGeoHigh == 1 && errorNrGeoLow == 1) {
		isGpsActive = "no";
		
		//console.log("Geo-Error High & Low 1");
		
		$('#iconGps').attr('src', 'images/icons/iconGpsOff.png');
		textGeoInfo = "Aktiviere bitte die Ortungsdienste auf deinem Smartphone, um der App das Orten deines Standorts zu erlauben!";
	}
	else if (errorNrGeoHigh == 2 && errorNrGeoLow == 3 && accuracy == undefined) {
		isGpsActive = "no";
		
		//console.log("Geo-Error High 2 & Low 3 & keine Daten");
		
		$('#iconGps').attr('src', 'images/icons/iconGpsOff.png');
		textGeoInfo = "Aktiviere bitte die Ortungsdienste auf deinem Smartphone, um der App das Orten deines Standorts zu erlauben!";
	}
	else if (errorNrGeoHigh == 3 && errorNrGeoLow == 3 && accuracy == undefined) {
		isGpsActive = "no";
		
		//console.log("Geo-Error High 3 & Low 3 & keine Daten");
		
		$('#iconGps').attr('src', 'images/icons/iconGpsOff.png');
		textGeoInfo = "Aktiviere bitte die Ortungsdienste auf deinem Smartphone, um der App das Orten deines Standorts zu erlauben!";
	}
}

function onSuccessGeoHigh(position) {
	isGpsActive = "yes";
	
	var geoEndTime = new Date().getTime() - geoStartTimeHigh;
	
	latHigh = (position.coords.latitude).toFixed(6);
	lonHigh = (position.coords.longitude).toFixed(6);
	accuracyHigh = (position.coords.accuracy).toFixed(0);
	
	accuracyHigh = parseFloat(accuracyHigh);
	
	//console.log("Geo High " + geoEndTime + "ms " + accuracyHigh + "m " + latHigh + " & " + lonHigh);
	
	geoStartTimeHigh = new Date().getTime();
	
	navigator.geolocation.clearWatch(watchLowAccuracy);
	accuracyLow = undefined;
	
	compareValues();
}

function onSuccessGeoLow(position) {
	isGpsActive = "yes";
	
	var geoEndTime = new Date().getTime() - geoStartTimeLow;
	
	latLow = (position.coords.latitude).toFixed(6);
	lonLow = (position.coords.longitude).toFixed(6);
	accuracyLow = (position.coords.accuracy).toFixed(0);
	
	accuracyLow = parseFloat(accuracyLow);
	
	//console.log("Geo Low " + geoEndTime + "ms " + accuracyLow + "m " + latLow + " & " + lonLow);
	
	geoStartTimeLow = new Date().getTime();
	
	compareValues();
}

function compareValues() {	
	//console.log("Compare Geo - accuracyOld " + accuracyOld);
	
	accuracyOld = parseFloat(accuracyOld);
	
	if (accuracyHigh == undefined) {
		//console.log("Take Geo-Low");
		
		$('#iconGps').attr('src', 'images/icons/iconGpsOn.png');
		
		if (accuracyOld <= accuracyLow) {
			lat = latOld;
			lon = lonOld;
			accuracy = accuracyOld;
		}
		else {
			lat = latLow;
			lon = lonLow;
			accuracy = accuracyLow;
		}
	}
	else if (accuracyLow == undefined) {
		//console.log("Take Geo-High");
		
		$('#iconGps').attr('src', 'images/icons/iconGpsOn.png');
		
		if (accuracyOld <= accuracyHigh) {
			lat = latOld;
			lon = lonOld;
			accuracy = accuracyOld;
		}
		else {
			lat = latHigh;
			lon = lonHigh;
			accuracy = accuracyHigh;
		}
	}
	else {
		//console.log("Geo High & Low defined");
		
		$('#iconGps').attr('src', 'images/icons/iconGpsOn.png');
		
		if (accuracyHigh < accuracyLow) {
			lat = latHigh;
			lon = lonHigh;
			accuracy = accuracyHigh;
		}
		else {
			lat = latLow;
			lon = lonLow;
			accuracy = accuracyLow;
		}
		
		accuracy = parseFloat(accuracy);
		
		if (accuracyOld <= accuracy) {
			lat = latOld;
			lon = lonOld;
			accuracy = accuracyOld;
		}
		else {
			//console.log("Geo take new");
		}
	}
	
	accuracy = parseFloat(accuracy);
	
	maxDistanceMeter = 100 + (accuracy/4);
	
	latOld = lat;
	lonOld = lon;
	accuracyOld = accuracy;
	
	if (errorNrGeoHigh == 2) {
		if (accuracy > 100) { // wenn über Wlan
			textGeoInfo = "Aktiviere bitte dein GPS oder WLAN um genauere Standortdaten zu erhalten. \nAktuell sind die Daten auf " + accuracy + "m genau.";
		}
		else {
			textGeoInfo = "Aktuell sind deine Standortdaten auf " + accuracy + "m genau.";
		}
	}
	else if (errorNrGeoHigh == 3 && accuracyHigh == undefined && searchForGPS == "yes") {
		if (accuracy > 100) {
			textGeoInfo = "GPS-Daten sind aktuell auf " + accuracy + "m genau. \nGPS Signal wird noch gesucht.";
		}
		else {
			textGeoInfo = "GPS-Daten sind aktuell auf " + accuracy + "m genau.";
		}
	}
	else {
		textGeoInfo = "GPS-Daten sind aktuell auf " + accuracy + "m genau.";
	}
	
	//console.log("Lat & Lon " + lat + " " + lon + " Accuracy " + accuracy + " - Geo maxDistanceMeter " + maxDistanceMeter + "m");
}

function openDetailsGps() {
	console.log("Geo Accuracy " + accuracy + " isGpsActive " + isGpsActive);
	
	if (textGeoInfo == "" && isGpsActive == "yes") { 		
		$('#iconGps').attr('src', 'images/icons/iconGpsOff.png');
		
		navigator.notification.alert("Es wird noch nach Positionsdaten gesucht.", alertDismissed, 'Suchen nach Positionsdaten', 'OK');
	}
	else {
		if (accuracy == undefined && isGpsActive == "no") {
			$('#iconGps').attr('src', 'images/icons/iconGpsOff.png');
			
			navigator.notification.alert("Aktiviere bitte die Ortungsdienste auf deinem Smartphone, um der App das Orten deines Standorts zu erlauben!", alertDismissed, 'Ortungsdienste aktivieren', 'OK');
			
			watchGeolocation();
		}
		else {
			$('#iconGps').attr('src', 'images/icons/iconGpsOn.png');
			
			navigator.notification.alert(textGeoInfo, alertDismissed, 'Information', 'OK');
		}
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//<!-- get Data -->	
function getAllHalls() {
	console.log('start_halls '+ new Date().getTime());
	
	$.ajax({
		type: "POST",
		url: "http://secure.webwerk.at/kac-check-in/getHalls.php",
		data: ({}),
		cache: false,
		dataType: "json",
		success: function (result) {
			hallArray = [];
			$.each(result, function(i,item){		
				hallArray.push([
					item.hallId,
					item.hallName,
					parseFloat(item.hallLatitude),
					parseFloat(item.hallLongitude),
					parseFloat(item.distanceFromHome),
					parseFloat(item.pointsForStadion),
				]); 
			});
			
			console.log('end_halls '+ new Date().getTime());
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest.responseText);
			console.log(XMLHttpRequest.statusText);
			console.log(textStatus);
			console.log(errorThrown);
				
			//navigator.notification.alert('Probleme bei der Serververbindung!', alertDismissed, 'Information', 'OK');
		}
	});
}

// get User Data
function getDbData(){
	time = new Date().getTime();
	console.log('start_userdata '+ time);
	
	$.mobile.showPageLoadingMsg();
	
	$.ajax({
		type: "POST",
		url: "http://secure.webwerk.at/kac-check-in/getUserdata.php?" + time + "",
		data: ({
			'nickname': nickname,
			'useremail': useremail,
			'actualDay': actualDay,
			'passwort': password
		}),
		cache: false,
		dataType: "json",
		success: function (result) {
			if (result == "0") {
				console.log("Kein DB-Eintrag oder falsche Daten!");

				document.login.name.focus();
				
				$('#infoLogin').show();
				$('#infoLoginText').html("Du hast deine Daten leider falsch eingegeben!");
				
				$('#login_form').show();
				$('#page1Header').hide();
				$('#logged_in').hide();
				
				$.mobile.hidePageLoadingMsg();
			}
			else if (result == "wrongPW") {
				console.log("PW falsch eingegeben!");
				
				document.login.password.focus();
				
				$('#infoLogin').show();
				$('#infoLoginText').html("Du hast dein Passwort leider falsch eingegeben!");
				
				$('#login_form').show();
				$('#page1Header').hide();
				$('#logged_in').hide();
				
				$.mobile.hidePageLoadingMsg();
			}
			else {
				$('#infoLogin').hide();
				
				console.log("DB-Eintrag vorhanden!");
				
				//gaPlugin.trackEvent(gaInit, gaError, "KAC Check-In App", "Anmeldung ohne Facebook", "event", 1);
				
				userDataArray = [];
				$.each(result, function(i,item){		
					userDataArray.push([
						item.userId,
						item.userNickname,
						item.userPassword,
						item.userEmail,
						item.userTelephone,
						item.userPicture,
						parseFloat(item.userPoints),
						parseFloat(item.userWay),
						item.userCheckedIn,
						item.checkedInGame,
						item.checkedInHall,
						item.fbId,
						item.homeTeam,
						item.awayTeam
					]); 
				});	
				
				userId = userDataArray[0][0];
				nickname = userDataArray[0][1];
				password = userDataArray[0][2];
				
				fbId = userDataArray[0][11];
				
				//console.log("FbId " + fbId);
				
				window.localStorage.setItem("Name_KAC_APP", nickname);
				window.localStorage.setItem("Email_KAC_APP", useremail);
				window.localStorage.setItem("Passwort_KAC_APP", password);
				window.localStorage.setItem("FbId_KAC_APP", fbId);
				
				useremail = userDataArray[0][3]; // jetzt klein geschreiben
				telephone = userDataArray[0][4];
				
				if (fbId != "empty") {
					var string = "/picture";
					
					if (userDataArray[0][5].search(string) == -1){ // dann wurde neues Bild auf den Server hochgeladen
						picture = "http://secure.webwerk.at/kac-check-in/pictures/" + userDataArray[0][5];
					}
					else {
						picture= "http://graph.facebook.com/" + userDataArray[0][5];
					}
				}
				else {
					picture = "http://secure.webwerk.at/kac-check-in/pictures/" + userDataArray[0][5];
				}
				
				userPoints = userDataArray[0][6];
				userWay = userDataArray[0][7];
				isCheckedIn = userDataArray[0][8];
				
				//console.log("ID " + userDataArray[0][0] + " " + userWay + "km - " + userPoints + " isCheckedIn " + isCheckedIn);
				
				if (isCheckedIn == "yes"){
					checkInDay = actualDay;
					gameId = userDataArray[0][9];
					hallId = userDataArray[0][10];
					homeTeam = userDataArray[0][12];
					awayTeam = userDataArray[0][13];
				}
				else {
					checkInDay = "2000-01-01";
				}
				
				$.mobile.hidePageLoadingMsg();
				
				getRanking();
				getFriends();
			}
			
			time = new Date().getTime();
			console.log('end_userdata '+ time);
			
			//navigator.notification.alert('Erfolgreich angemeldet!', alertDismissed, 'Anmeldung', 'OK');
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest.responseText);
			console.log(XMLHttpRequest.statusText);
			console.log(textStatus);
			console.log(errorThrown);
				
			$.mobile.hidePageLoadingMsg();
			
			navigator.notification.alert('Bei deiner Anmeldung ist leider ein Fehler aufgetreten, bitte versuche es erneut!', alertDismissed, 'Anmeldung', 'OK');
			
			$('#login_form').show();
			$('#page1Header').hide();
			$('#logged_in').hide();
		}
	});
}

function getRanking() { // get Ranking of all Users
	$.mobile.showPageLoadingMsg();
	
	time = new Date().getTime();
	console.log('start_ranking '+ time);
	
	if (isNaN(userWay) == true) { // when the App starts and the User was never checked in
		userWay = 0;
		userRanking = "-";
		userPoints = 0;
		//console.log("userWas isNaN");
	}
	
	$.ajax({ 
		type: "POST",
		url: "http://secure.webwerk.at/kac-check-in/getRanking.php?"+ time +"", // timestamp because iOS ignores the cache false!!!
		data: ({}),
		cache: false,
		dataType: "json",
		success: function (result) {
			rankingListArray = [];
			$.each(result, function(i,item){		
				rankingListArray.push([
					item.userId,
					item.userName,
					parseFloat(item.userWay),
					parseFloat(item.userPoints)
				]); 
			});	
			
			//console.log("actual User ID " + userId + " UserWay " + userWay + " User Points " + userPoints);
			//console.log(rankingListArray.length);
			
			if (refreshRanking == 'yes') { // when the page is refreshed (after checkIn)
				//console.log("refresh ranking");
				
				for (var i=0; i<rankingListArray.length; i++) {
					console.log("id " + rankingListArray[i][0] + " username " + rankingListArray[i][1] + " way " + rankingListArray[i][2]);
					
					if (rankingListArray[i][0] == userId) {
						userRanking = i + 1;
						//console.log ("Übereinstimmung bei Rating und aktueller UserId");
					}
				}
				
				$.mobile.changePage('#Page1');
							
				$(".personalPoints").html(userPoints); 
				$(".personalWay").html(userWay); 
				$(".personalRanking").html(userRanking + ".");
				//console.log("UserRanking " + userRanking);
				
				$('#login_form').hide();
				$('#page1Header').show();
				$('#logged_in').show();
				
				checkInDay = actualDay;
				window.localStorage.setItem("CheckInDay_KAC_APP", checkInDay);
				
				refreshRanking = 'no';
				
				$.mobile.hidePageLoadingMsg();
			}
			else if (goToRankingList == 'yes') { // when the ranking list is open (after toRankinglist)
				//console.log("go to rankinglist");
				
				$.mobile.changePage('#Rating');
			
				$('#ratingList').html("");
				
				for (var i=0; i<rankingListArray.length; i++) {
					
					entry = "<li class=\"listPlace\" data-icon=\"redArrowRight\"><a href=\"#\" onClick=\"javascript:getCheckIns(' " + rankingListArray[i][0] + " ', ' " + rankingListArray[i][1] + " ', ' " + rankingListArray[i][3] + " ');\"><span class=\"listText\"> &nbsp;" + rankingListArray[i][1] + "</span><span class=\"customCountBubble\">" + rankingListArray[i][3]  + "</span></a></li>";
					$('#ratingList').append(entry);
					
					if (rankingListArray[i][0] == userId) {
						userRanking = i + 1;
						//userWay = rankingListArray[i][2];
					}
				}
				
				$('#ratingList').listview('refresh');
				
				$(".personalPoints").html(userPoints); 
				$(".personalWay").html(userWay); 
				$(".personalRanking").html(userRanking + ".");
				
				goToRankingList = 'no';
				
				$.mobile.hidePageLoadingMsg();
			}
			else { // when App is started (after getDbData)
				//console.log("get ranking when app starts");
				
				for (var i=0; i<rankingListArray.length; i++) {
					if (rankingListArray[i][0] == userId) {
						userRanking = i + 1;
					}
				}
				
				if (userRanking == undefined) {
					userRanking = "-";
					userWay = 0;
					userPoints = 0;
				}
						
				$(".personalName").html(nickname);
						
				$(".divOwnImage").html("<img src=" + picture + " class=\"profilImage\"><div align=\"right\" style=\"position:absolute; bottom:-2px; right:1px; width: 50%\"><img src=\"images/grafics/KAC-Logo.png\" width=\"100%\"/></div>");
				
				$(".personalPoints").html(userPoints); 
				$(".personalWay").html(userWay);
				$(".personalRanking").html(userRanking + ".");
				
				$('#login_form').hide();
				$('#page1Header').show();
				$('#logged_in').show();
				
				$.mobile.hidePageLoadingMsg();
			}
			
			time = new Date().getTime();
			console.log('end_ranking '+ time);

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest.responseText);
			console.log(XMLHttpRequest.statusText);
			console.log(textStatus);
			console.log(errorThrown);
			
			$.mobile.hidePageLoadingMsg();
			
			if (refreshRanking == 'yes') {
				refreshRanking = 'no';
				
				$.mobile.changePage('#Page1');
				
				getDbData();
			}
			else if (goToRankingList == 'yes'){
				navigator.notification.alert('Beim Erstellen der Rangliste ist ein Fehler aufgetreten, bitte versuche es erneut!', alertDismissed, 'Fehler bei Rangliste', 'OK');
			}
			else {
				navigator.notification.alert('Bei deiner Anmeldung ist leider ein Fehler aufgetreten, bitte versuche es erneut!', alertDismissed, 'Anmeldung', 'OK');
			
				$('#login_form').show();
				$('#page1Header').hide();
				$('#logged_in').hide();
			}
		}
	});
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//<!-- Forms --> 
function checkLoginForm() { 
	nickname = document.login.name.value
	useremail = document.login.email.value.toLowerCase();
	password = document.login.password.value;
	
	// wenn mit Facebook einchecken gewählt wurde - dann nur auf E-Mail & Passwort überprüfen - Datenauslesen
	
	if ((nickname == 0) && (password == 0) && (useremail == 0)) {
		navigator.notification.alert('Alle Felder müssen ausgefüllt werden!', alertDismissed, 'Daten eingeben!', 'OK');
		return false;
	}
	else if (nickname == 0) {
		navigator.notification.alert('Bitte deinen Namen eingeben!', alertDismissed, 'Namen fehlt!', 'OK');
		document.login.name.focus();
		return false;
	}	
	else if (useremail == 0) {
		navigator.notification.alert('Bitte deine E-Mail-Adresse eingeben!', alertDismissed, 'E-Mail-Adresse fehlt!', 'OK');
		document.login.email.focus();
		return false;
	} 
	else if (password == 0) {
		navigator.notification.alert('Bitte dein Passwort eingeben!', alertDismissed, 'Passwort fehlt!', 'OK');
		document.login.password.focus();
		return false;
	}
	else {
		getDbData();
	}
};

// add new User
var newUser = "no";

function registerNewUser() {
	//gaPlugin.trackEvent( gaInit, gaError, "KAC Check-In App", "Neu Registrieren", "event", 1); // Kategorie, Aktion, Label
	
	console.log("add new User");
	
	newUser = "yes";
	
	$('#infoLogin').hide();
	
	$.mobile.changePage('#changeData');
	
	document.changeDataForm.nameNew.value = "";
	document.changeDataForm.emailNew.value = "";
	document.changeDataForm.telephone.value = "";
	document.changeDataForm.passwordNew.value = "";
	document.changeDataForm.passwordNew2.value = "";
	
	$('#emailNew').textinput('enable');
	
	$('#backToStatistik').hide();
	$('#backToPage1').show();
	
	$('#changeOrNewData').html('&nbsp; Registrierung');
	
	$('#changePassword').show();
	$('#passwordNew').attr("placeholder", 'Dein PASSWORT');
	$('#passwordNew2').attr("placeholder", 'PASSWORT bestätigen');
	
	$('#checkWithOldPassword').hide();
	$('#deleteUserAccount').hide();
}

// change User Data
function changeData() {
	console.log("change UserData");
	
	$.mobile.changePage('#changeData');
	
	if (fbId != "empty") {
		$('#changePassword').hide();
		$('#checkWithOldPassword').hide();
	}
	else {
		$('#changePassword').show();
		$('#checkWithOldPassword').show();
	}
	
	$('#emailNew').textinput('disable');
	
	$('#backToStatistik').show();
	$('#backToPage1').hide();
	
	$('#changeOrNewData').html('&nbsp; Daten ändern');
	
	$('#passwordNew').attr("placeholder", 'Neues PASSWORT');
	$('#passwordNew2').attr("placeholder", 'Neues PASSWORT bestätigen');
	
	$('#deleteUserAccount').show();
	
	document.changeDataForm.nameNew.value = nickname;
	document.changeDataForm.emailNew.value = useremail;
	document.changeDataForm.telephone.value = telephone;
}

var withPicture = "no";

function saveChangedData(){
	console.log("save new or changed User Data");
	
	var newNickname = document.changeDataForm.nameNew.value;
	var newUseremail = document.changeDataForm.emailNew.value.toLowerCase();
	var newTelephone = document.changeDataForm.telephone.value;
	var newPassword = document.changeDataForm.passwordNew.value;
	
	if (newUser == "yes") { // add new User
		//console.log("new User");
	
		var newPassword2 = document.changeDataForm.passwordNew2.value;
	
		if (newNickname == 0 && newUseremail == 0 && newPassword == 0 && newPassword2 == 0) {
			navigator.notification.alert('Bitte alle Daten eingeben!', alertDismissed, 'Daten eingeben!', 'OK');
			return false;
		}
		else if (newNickname == 0) {
			navigator.notification.alert('Bitte deinen Nickname eingeben!', alertDismissed, 'Nickname fehlt!', 'OK');
			document.changeDataForm.nameNew.focus();
			return false;
		}
		else if (newUseremail == 0) {
			navigator.notification.alert('Bitte deine E-Mail-Adresse eingeben!', alertDismissed, 'E-Mail-Adresse fehlt!', 'OK');
			document.changeDataForm.emailNew.focus();
			return false;
		}
		else if (newPassword == 0) {
			navigator.notification.alert('Bitte dein Passwort eingeben!', alertDismissed, 'Passwort fehlt!', 'OK');
			document.changeDataForm.passwordNew.focus();
			return false;
		}
		else if (newPassword != 0 && newPassword.length < 6) {
			navigator.notification.alert('Passwort muss mindestens 6 Zeichen lang sein!', alertDismissed, 'Passwort zu kurz!', 'OK');
			document.changeDataForm.passwordNew.focus();
			return false;
		}
		else if (newPassword != newPassword2) {
			navigator.notification.alert('Die zwei Passwörter müssen übereinstimmen bitte neu eingeben!', alertDismissed, 'Falsche Passwörter!', 'OK');
			document.changeDataForm.passwordNew.focus();
			return false;
		}
		else {
			$('#buttonSaveUserInfos').addClass('ui-disabled');
			
			nickname = newNickname;
			useremail = newUseremail;
			telephone = newTelephone; 
			password = newPassword;
			fbId = "empty";
			
			window.localStorage.setItem("Name_KAC_APP", nickname);
			window.localStorage.setItem("Email_KAC_APP", useremail);
			window.localStorage.setItem("Passwort_KAC_APP", password);
			window.localStorage.setItem("FbId_KAC_APP", "empty");
		
			$.mobile.showPageLoadingMsg();
			
			time = new Date().getTime();
			console.log('start_addUserData '+ time); 
			
			if (withPicture == "no") {
				$.ajax({
					type: "POST",
					//url: "http://secure.webwerk.at/kac-check-in/saveNewUserData.php",
					url: "http://secure.webwerk.at/kac-check-in/saveNewUserDataNoDuplicateMail.php",
					data: ({
						'userNewNickname': nickname,
						'userNewEmail': useremail,
						'userNewTelephone': telephone,
						'userNewPassword': password,
						'userNewPicture': "noPicture",
					}),
					cache: false,
					dataType: "json",
					success: function (result) {
						//console.log("Result " + result);
						
						if (result != '0') {
							newUser = "no";

							userId = result;
						
							document.changeDataForm.nameNew.value = "";
							document.changeDataForm.emailNew.value = "";
							document.changeDataForm.telephone.value = "";
							document.changeDataForm.passwordNew.value = "";
							document.changeDataForm.passwordNew2.value = "";
							document.changeDataForm.passwordOld.value = "";
							
							$('#buttonSaveUserInfos').removeClass('ui-disabled');
							
							$.mobile.changePage('#Page1');
							
							$(".personalName").html(nickname);
							
							$(".personalWay").html("0");
							$(".personalRanking").html("-.");
							
							$(".startPageInfoUnit").show();
							
							
							picture = "http://secure.webwerk.at/kac-check-in/pictures/app_default-profilbild.jpg";
		
							$(".divOwnImage").html("<img src=" + picture + " class=\"profilImage\"><div align=\"right\" style=\"position:absolute; bottom:-2px; right:1px; width:50%\"><img src=\"images/grafics/KAC-Logo.png\" width=\"100%\"/></div>"); //$(".ownImage").html("");
							
							$('#login_form').hide();
							$('#page1Header').show();
							$('#logged_in').show();
							
							$.mobile.hidePageLoadingMsg();
							
							messageSuccessLogin();
						}
						else {
							$('#buttonSaveUserInfos').removeClass('ui-disabled');
							
							$.mobile.hidePageLoadingMsg();
							
							messageDuplicateEmail();
						}
						
						time = new Date().getTime();
						console.log('end_addUserData '+ time);
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log(XMLHttpRequest.responseText);
						console.log(XMLHttpRequest.statusText);
						console.log(textStatus);
						console.log(errorThrown);
						
						messageProblemLogin();
						
						$.mobile.hidePageLoadingMsg();
						
						$('#buttonSaveUserInfos').removeClass('ui-disabled');
					}
				});
			}
			else {
				sendWithImage();
			}
		}
	}
	else { // change User Data
		console.log("change User Data");
		
		if (fbId != "empty") {  
			passwordOld = "";
		}
		else {
			passwordOld = document.changeDataForm.passwordOld.value;
		}
		
		if (newNickname != 0) {
			nickname = newNickname;
		}
		
		if (newUseremail != 0) {
			useremail = newUseremail;
		}
		
		if (newTelephone != 0) {
			telephone = newTelephone; 
		}
		
		if (newPassword != 0) {
			if (newPassword.length < 6) {
				navigator.notification.alert('Passwort muss mindestens 6 Zeichen lang sein!', alertDismissed, 'Passwort zu kurz!', 'OK');
				document.changeDataForm.passwordNew.focus();
			}
			else {
				if (newPassword == document.changeDataForm.passwordNew2.value) {
					changedPassword = document.changeDataForm.passwordNew2.value;
				}
				else {
					$('#passwordNew2').attr("placeholder", 'Passwort bestätigen!');

					document.changeDataForm.passwordNew2.focus();
				}
			}
		}
		
		if (passwordOld == password) {
			if (newPassword != 0) {
				password = newPassword;
			}
			else {
				password = passwordOld;
			}
			
			$.mobile.showPageLoadingMsg();
			
			time = new Date().getTime();
			console.log('start_changeData '+ time); 
			
			window.localStorage.setItem("Name_KAC_APP", nickname);
			window.localStorage.setItem("Email_KAC_APP", useremail);
			window.localStorage.setItem("Passwort_KAC_APP", password);
			
			$('#buttonSaveUserInfos').addClass('ui-disabled');
			
			if (withPicture == "no") {
				$.ajax({
					type: "POST",
					url: "http://secure.webwerk.at/kac-check-in/saveUserDataChanges.php",
					data: ({
						'userId': userId,
						'userNewNickname': nickname,
						'userNewEmail': useremail,
						'userNewTelephone': telephone,
						'userNewPassword': password,
						'userNewPicture': picture,
					}),
					cache: false,
					dataType: "json",
					success: function (result) {
						document.changeDataForm.nameNew.value = "";
						document.changeDataForm.emailNew.value = "";
						document.changeDataForm.telephone.value = "";
						document.changeDataForm.passwordNew.value = "";
						document.changeDataForm.passwordNew2.value = "";
						document.changeDataForm.passwordOld.value = "";
						
						$('#buttonSaveUserInfos').removeClass('ui-disabled');
						
						$.mobile.changePage('#Page1');
						
						$('#login_form').hide();
						$('#page1Header').show();
						$('#logged_in').show();
						
						$(".personalName").html(nickname);
						
						$.mobile.hidePageLoadingMsg();
						
						messageSuccessChangeData();
						
						time = new Date().getTime();
						console.log('end_changeData '+ time);
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log(XMLHttpRequest.responseText);
						console.log(XMLHttpRequest.statusText);
						console.log(textStatus);
						console.log(errorThrown);
							
						$.mobile.hidePageLoadingMsg();
						
						messageProblemChangeData();
						
						$('#buttonSaveUserInfos').removeClass('ui-disabled');
					}
				});
			}
			else {
				sendWithImage();
			} 
		}
		else {
			$('#passwordNew2').attr("placeholder", 'Passwort eingeben!');
			
			document.changeDataForm.passwordOld.focus();
		}
	}
}

var pictureSource, destinationType;

function getFoto() {
	withPicture = "yes";

	navigator.camera.getPicture(onSuccess, errorPhoto, {
		quality:50, 
		targetWidth: 1280,
		destinationType:destinationType.FILE_URI,
		sourceType: pictureSource.PHOTOLIBRARY,
		encodingType: Camera.EncodingType.JPEG
	});
}

var imageInfo;

function onSuccess(imageURI) {
    var image = document.getElementById('choosenPhoto');
    image.src = imageURI;
	imageInfo = imageURI;
	
	$('#imageDiv').show();
	
	console.log("Foto aufgenommen!");
	//console.log("imageInfo " + imageInfo);
}

function errorPhoto(message) {
	//console.log("Fehler beim Aufnehmen eines Fotos: " + message + "\n");
	
	navigator.notification.alert('Das Hinzufügen deines Foto war nicht erfolgreich!', alertDismissed, 'Foto Upload fehlgeschlagen', 'OK');
	
	withPicture = "no";
	
	$('#imageDiv').hide();
}

var newPicture;

function sendWithImage() {
	//console.log("imageInfo " + imageInfo);
	
	$.mobile.showPageLoadingMsg();
	
	time = new Date().getTime();
	console.log("start_sendWithImage"  + time);
	
	var options = new FileUploadOptions();
	options.fileKey = "bildKey";
	options.fileName = imageInfo.substr(imageInfo.lastIndexOf('/') + 1);
	options.mimeType = "image/jpeg";

	newPicture = options.fileName;
	
	var params = {};
	
	params.userNewNickname = nickname;
	params.userNewEmail = useremail;
	params.userNewTelephone = telephone;
	params.userNewPassword = password;
	params.userNewPicture = "";

	var ft = new FileTransfer();
	
	if (newUser == "yes") { // add new User
		options.params = params;
		
		//ft.upload(imageInfo, "http://secure.webwerk.at/kac-check-in/saveNewUserData.php",  OnUploadSuccess, errorUpload, options);
		ft.upload(imageInfo, "http://secure.webwerk.at/kac-check-in/saveNewUserDataNoDuplicateMail.php",  OnUploadSuccess, errorUpload, options);
	}
	else {
		params.userId = userId;
		
		options.params = params;
		
		ft.upload(imageInfo, "http://secure.webwerk.at/kac-check-in/saveUserDataChanges.php",  OnUploadSuccess, errorUpload, options);	
	}
}

function OnUploadSuccess(result) {
	//console.log("Code = " + result.responseCode);
    //console.log("Response = " + result.response); // insert ID
    //console.log("Sent Bytes = " + result.bytesSent);

	if (newUser == "yes") {
		if (result.response != '0') {
			picture = "http://secure.webwerk.at/kac-check-in/pictures/" + newPicture;
	
			document.changeDataForm.nameNew.value = "";
			document.changeDataForm.emailNew.value = "";
			document.changeDataForm.telephone.value = "";
			document.changeDataForm.passwordNew.value = "";
			document.changeDataForm.passwordNew2.value = "";
			document.changeDataForm.passwordOld.value = "";
			
			var image = document.getElementById('choosenPhoto');
			image.src = "";
			
			$('#imageDiv').hide();
			
			$('#buttonSaveUserInfos').removeClass('ui-disabled');
			
			$.mobile.changePage('#Page1');
			
			$(".personalName").html("");
	
			messageSuccessLogin();
		
			userId = result.response;
			
			$(".personalName").html(nickname);
			
			$(".personalWay").html("0");
			$(".personalRanking").html("-.");
			
			$(".startPageInfoUnit").show();
			
			
			$(".divOwnImage").html("<img src=" + picture + " class=\"profilImage\"><div align=\"right\" style=\"position:absolute; bottom:-2px; right:1px; width:50%\"><img src=\"images/grafics/KAC-Logo.png\" width=\"100%\"/></div>");
			//$(".divOwnImage").html("<img src=" + picture + " class=\"profilImage\">"); //$(".ownImage").html("");
			
			$('#login_form').hide();
			$('#page1Header').show();
			$('#logged_in').show();
	
		}
		else {
			$('#buttonSaveUserInfos').removeClass('ui-disabled');
			
			messageDuplicateEmail();
		}
	}
	else {
		picture = "http://secure.webwerk.at/kac-check-in/pictures/" + newPicture;
	
		document.changeDataForm.nameNew.value = "";
		document.changeDataForm.emailNew.value = "";
		document.changeDataForm.telephone.value = "";
		document.changeDataForm.passwordNew.value = "";
		document.changeDataForm.passwordNew2.value = "";
		document.changeDataForm.passwordOld.value = "";
		
		var image = document.getElementById('choosenPhoto');
		image.src = "";
		
		$('#imageDiv').hide();
		
		$('#buttonSaveUserInfos').removeClass('ui-disabled');
		
		$.mobile.changePage('#Page1');
		
		$(".personalName").html("");
		
		navigator.notification.alert('Das Ändern deiner Daten war erfolgreich!', alertDismissed, 'Datenänderung war erfolgreich', 'OK');
		
		$(".personalName").html(nickname);
		$(".divOwnImage").html("<img src=" + picture + " class=\"profilImage\"><div align=\"right\" style=\"position:absolute; bottom:-2px; right:1px; width: 50%\"><img src=\"images/grafics/KAC-Logo.png\" width=\"100%\"/></div>");
		//$(".divOwnImage").html("<img src=" + picture + " class=\"profilImage\">");
		
		$('#login_form').hide();
		$('#page1Header').show();
		$('#logged_in').show();
	}
	
	$.mobile.hidePageLoadingMsg();
	
	time = new Date().getTime();
	console.log("end_sendWithImage " + time);
	
	/*
	picture = "http://secure.webwerk.at/kac-check-in/pictures/" + newPicture;
	
	document.changeDataForm.nameNew.value = "";
	document.changeDataForm.emailNew.value = "";
	document.changeDataForm.telephone.value = "";
	document.changeDataForm.passwordNew.value = "";
	document.changeDataForm.passwordNew2.value = "";
	document.changeDataForm.passwordOld.value = "";
	
	var image = document.getElementById('choosenPhoto');
    image.src = "";
	
	$('#imageDiv').hide();
	
	$('#buttonSaveUserInfos').removeClass('ui-disabled');
	
	$.mobile.changePage('#Page1');
	
	$(".personalName").html("");
	
	if (newUser == "yes") {
		messageSuccessLogin();
		
		userId = result.response;
		
		$(".personalName").html(nickname);
		
		$(".personalWay").html("0");
		$(".personalRanking").html("-.");
		
		$(".startPageInfoUnit").show();
		
		
		$(".divOwnImage").html("<img src=" + picture + " class=\"profilImage\"><div align=\"right\" style=\"position:absolute; bottom:-2px; right:1px; width:50%\"><img src=\"images/grafics/KAC-Logo.png\" width=\"100%\"/></div>");
		//$(".divOwnImage").html("<img src=" + picture + " class=\"profilImage\">"); //$(".ownImage").html("");
	}
	else {
		navigator.notification.alert('Das Ändern deiner Daten war erfolgreich!', alertDismissed, 'Datenänderung war erfolgreich', 'OK');
		
		$(".personalName").html(nickname);
		$(".divOwnImage").html("<img src=" + picture + " class=\"profilImage\"><div align=\"right\" style=\"position:absolute; bottom:-2px; right:1px; width: 50%\"><img src=\"images/grafics/KAC-Logo.png\" width=\"100%\"/></div>");
		//$(".divOwnImage").html("<img src=" + picture + " class=\"profilImage\">");
	}
	
	$('#login_form').hide();
	$('#page1Header').show();
	$('#logged_in').show();
	
	$.mobile.hidePageLoadingMsg();
	
	time = new Date().getTime();
	console.log("end_sendWithImage " + time);
	*/
}

function errorUpload(error) {
	//console.log("Error - http_status = " + error.http_status + "\n");
	//console.log("Errorcode = " + error.code + "\n");
	//console.log("Upload error source " + error.source + "\n");
    //console.log("Upload error target " + error.target + "\n");
    
	navigator.notification.alert('Upload des Fotos war nicht erfolgreich!', alertDismissed, 'Foto Upload fehlgeschlagen', 'OK');
	
	withPicture = "no";
	
	$('#imageDiv').html("");
	$('#imageDiv').hide();
	
	$.mobile.hidePageLoadingMsg();
	
	if (newUser == "yes") { 
		messageProblemLogin();
	}
	else {
		messageProblemChangeData();
	}
	
	$('#buttonSaveUserInfos').removeClass('ui-disabled');
}

function messageDuplicateEmail() {
	navigator.notification.alert('Diese E-Mail Adresse ist bereits in der KAC Check-In App registriert. Bei Problemen melde dich bitte bei appdeveloper@webwerk.at', alertDismissed, 'Registrierung fehlgeschlagen', 'OK');
}

function messageSuccessLogin() {
	navigator.notification.alert('Deine Registrierung war erfolgreich, viel Spaß mit der Check-In App wünschen der EC-KAC und Hirter Bier!', alertDismissed, 'Willkommen', 'OK');
}

function messageProblemLogin() {
	navigator.notification.alert('Deine Registrierung war leider nicht erfolgreich, bitte versuche es erneut!', alertDismissed, 'Registrierung fehlgeschlagen', 'OK');
}

function messageSuccessChangeData() {
	navigator.notification.alert('Das Ändern deiner Daten war erfolgreich!', alertDismissed, 'Datenänderung war erfolgreich', 'OK');
}

function messageProblemChangeData() {
	navigator.notification.alert('Das Ändern deiner Daten war leider nicht erfolgreich!', alertDismissed, 'Datenänderung fehlgeschlagen', 'OK');
}

function deleteAccount() {
	navigator.notification.confirm('Willst du die KAC Check-In App powered by Hirter Bier mit all deinen Check-Ins wirklich löschen?', deleteCallback, 'Account wirklich löschen?', ['Ja','Nein']);
}

function deleteCallback(buttonIndex) {
	if(buttonIndex == 1){ 
		$.mobile.showPageLoadingMsg();
		
		time = new Date().getTime();
		console.log('start_deleteAccount '+ time);
		
		$.ajax({
			type: "POST",
			url: "http://secure.webwerk.at/kac-check-in/deleteAccount.php",
			data: ({
				'userId': userId,
			}),
			cache: false,
			dataType: "json",
			success: function (result) {
				
				deleteAllVariables();
		
				$.mobile.changePage('#Page1');
				
				document.login.name.value = "";
				document.login.email.value = "";
				document.login.password.value = "";
				
				$('#login_form').show();
				$('#page1Header').hide();
				$('#logged_in').hide();
				
				//navigator.notification.confirm('Dein Account bei der KAC Check-In App powered by Hirter Bier wurde erfolgreich gelöscht!', alertDismissed, 'Account erfolgreich gelöscht', 'OK');
				navigator.notification.alert('Dein Account bei der KAC Check-In App powered by Hirter Bier wurde erfolgreich gelöscht!', alertDismissed, 'Account erfolgreich gelöscht', 'OK');
				
				$.mobile.hidePageLoadingMsg();
				
				time = new Date().getTime();
				console.log('end_deleteAccount '+ time);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest.responseText);
				console.log(XMLHttpRequest.statusText);
				console.log(textStatus);
				console.log(errorThrown);
				
				//navigator.notification.confirm('Das Löschen deiner Daten war leider nicht erfolgreich, bitte versuche es erneut!', alertDismissed, 'Löschen fehlgeschlagen', 'OK');
				navigator.notification.alert('Das Löschen deiner Daten war leider nicht erfolgreich, bitte versuche es erneut!', alertDismissed, 'Löschen fehlgeschlagen', 'OK');
				
				$.mobile.hidePageLoadingMsg();
			}
		});
	}
	else {
		$.mobile.changePage('#Statistik');
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//<!-- Check-In --> 
function checkActualAccuracy() {
	//console.log("checkActualAccuracy");
	
	//if (textGeoInfo == "") { 
	if (textGeoInfo == "" && isGpsActive == "yes") { 
		$('#iconGps').attr('src', 'images/icons/iconGpsOff.png');
		
		navigator.notification.alert("Es wird noch nach Positionsdaten gesucht.", alertDismissed, 'Suchen nach Positionsdaten', 'OK');
		
		//watchGeolocation();
	}
	else {
		// if (accuracy == undefined) {
		if (accuracy == undefined && isGpsActive == "no") {
			$('#iconGps').attr('src', 'images/icons/iconGpsOff.png');
			
			navigator.notification.alert("Aktiviere bitte die Ortungsdienste auf deinem Smartphone, um der App das Orten deines Standorts zu erlauben!", alertDismissed, 'Ortungsdienste aktivieren', 'OK');
			
			watchGeolocation();
		}
		else {
			$('#iconGps').attr('src', 'images/icons/iconGpsOn.png');
			
			toCheckIn();
		}
	}
}

function toCheckIn() {
	//gaPlugin.trackEvent( gaInit, gaError, "KAC Check-In App", "Check-In", userId, 1); // Kategorie, Aktion, Label
	
	console.log("checkInDay " + checkInDay);

	if (checkInDay == actualDay) {
		navigator.notification.alert('Du hast bereits eingecheckt. Der EC-KAC und Hirter Bier wünschen dir nochmals ein schönes KAC-Spiel!', alertDismissed, 'Check-In bereits erfolgt', 'OK');
	}
	else {
		//console.log("nicht eingecheckt");
		
		$.mobile.showPageLoadingMsg();
		
		var pi = Math.PI;
		var earthRadius = 6371; // km
			
		var latPosRad = lat*(pi/180);
		var lonPosRad = lon*(pi/180);
		
		var count = 0;
		//console.log(hallArray.length);
		
		for (var i=0; i<hallArray.length; i++) { 
			stadionLat = hallArray[i][2];
			stadionLon = hallArray[i][3];
			
			var stadionLatRad = stadionLat*(pi/180);
			var stadionLonRad = stadionLon*(pi/180);
			
			var distance = (Math.acos(Math.sin(stadionLatRad)*Math.sin(latPosRad) + Math.cos(stadionLatRad)*Math.cos(latPosRad) *
				Math.cos(lonPosRad-stadionLonRad)) * earthRadius).toFixed(3); // in km
							
			var distanceMeter = distance*1000;
			
			if (distanceMeter > maxDistanceMeter) {
				count++;
				
				if (count == hallArray.length) {
					//console.log("Kein Stadion in der Nähe");
					
					$.mobile.changePage('#PageCheckIn');
	
					$('#showCheckInStadion').hide();
					$('#showinfoNoStadionGame').show();
					
					if (accuracy > 1000) {
						$('#noStadionGame').html('Kein Stadion zum Einchecken in der Nähe! </br> Dies kann an deinen Standortdaten liegen. Bitte aktiviere GPS oder WLAN um genauere Daten zu erhalten.'); 
					}
					else {
						$('#noStadionGame').html('Kein Stadion zum Einchecken in der Nähe!'); 
					}

					$("input[type='checkbox']").checkboxradio('disable');
					$("input[type='checkbox']").checkboxradio("refresh");
					
					$('#buttonCheckIn').addClass('ui-disabled');
					
					$.mobile.hidePageLoadingMsg();
				}
			}
			else {
				nearHall = hallArray[i][1];
				pointsForStadion = hallArray[i][5];
				
				hallId = hallArray[i][0];
				hallDistanceFromHome = hallArray[i][4];
				
				time = new Date().getTime();
				console.log('start_checkForGame '+ time);
				
				
				$.ajax({
					type: "POST",
					url: "http://secure.webwerk.at/kac-check-in/checkForGame.php?" + time + "",
					data: ({
						'hallId': hallId,
					}),
					cache: false,
					dataType: "json",
					success: function (result) {
						$.mobile.changePage('#PageCheckIn');
				
						$("#showCheckInStadion").show();
						
						if (pointsForStadion > 1) {
							$("#pointOrPoints").html(" Punkte");
						}
						else {
							$("#pointOrPoints").html(" Punkt");
						}
						
						$(".stadion").html(nearHall);
						$("#pointsForStadion").html(pointsForStadion);
						
						if (result == "0") {
							//console.log("Es findet kein Spiel statt!");
			
							$('#showinfoNoStadionGame').show();
							$('#noStadionGame').html('Das Einchecken ist derzeit leider nicht möglich, weil in dem Eisstadion, in dem du dich befindet jetzt kein KAC-Spiel stattfindet!'); 
							
							$("input[type='checkbox']").checkboxradio('disable');
							$("input[type='checkbox']").checkboxradio("refresh");
							
							$('#buttonCheckIn').addClass('ui-disabled');
							
							$.mobile.hidePageLoadingMsg();
						}
						else {
							//console.log("Spiel findet statt!");
							
							if (fbId == "empty") { 
								$("input[type='checkbox']").checkboxradio('disable');
							}
							else {
								$("input[type='checkbox']").checkboxradio('enable');
							}
							
							$("input[type='checkbox']").checkboxradio("refresh");
							
							$.each(result, function(i,item){		
								gameId = item.gameId;
								homeTeam = item.homeTeam;
								awayTeam = item.awayTeam;
							});	
							
							//console.log(userId + " - " + gameId + " - " + hallId);
							
							$.mobile.changePage('#PageCheckIn');
			
							$('#noStadionGame').html();
							$('#showinfoNoStadionGame').hide(); 
							
							$('#buttonCheckIn').removeClass('ui-disabled');
							
							$.mobile.hidePageLoadingMsg();
						}
						
						time = new Date().getTime();
						console.log('end_checkForGame '+ time);
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log(XMLHttpRequest.responseText);
						console.log(XMLHttpRequest.statusText);
						console.log(textStatus);
						console.log(errorThrown);
						
						$.mobile.hidePageLoadingMsg();
					}
				});
			}
		}
	}
}

function checkIn() { // wird bei Klick auf Button "Einchecken" ausgeführt
	if (checkInDay == actualDay) {
		navigator.notification.alert('Du hast bereits eingecheckt. Der EC-KAC und Hirter Bier wünschen dir nochmals ein schönes KAC-Spiel!', alertDismissed, 'Check-In bereits erfolgt', 'OK');
	
		//console.log("checkInDay " + checkInDay + " actualDay " + actualDay);
		
		$.mobile.changePage('#Page1');
		
		$('#login_form').hide();
		$('#page1Header').show();
		$('#logged_in').show();
	}
	else {
		time = new Date().getTime();
		console.log('start_saveCheckIn '+ time);
	
		$.ajax({
			type: "POST",
			url: "http://secure.webwerk.at/kac-check-in/saveCheckIn.php?" + time + "",
			data: ({
				'userId': userId,
				'gameId': gameId,
				'hallId': hallId,
				'distance': hallDistanceFromHome,
				'points': pointsForStadion 
			}),
			async: false,
			cache: false,
			dataType: "json",
			success: function (result) {
				if (result != "0") { // if result is 0 - then twice Check-In - then the Check-In isn't inserted in the DB
					var actualWayRanking = [];
					$.each(result, function(i,item){		
						actualWayRanking.push([
							item.way,
							item.points
						]);
					});	
					
					userWay = actualWayRanking[0][0];
					userPoints = actualWayRanking[0][1];
				}
				
				//gaPlugin.trackEvent( gaInit, gaError, "KAC Check-In App", "Erfolgreicher Check-In", userId, 1); // Kategorie, Aktion, Label
				
				if (document.getElementById('facebook').checked) {
					//gaPlugin.trackEvent( gaInit, gaError, "KAC Check-In App", "Facebook Post von Check-In", userId, 1); // Kategorie, Aktion, Label
					
					postToMyFbWall();
				}
				
				navigator.notification.alert('Gratulation, dein Check-In war erfolgreich! Der EC-KAC und Hirter Bier wünschen dir viel Spaß.', alertDismissed, 'Check-In erfolgreich', 'OK');
				
				$("input[type='checkbox']").attr("checked",false).checkboxradio("refresh");
				
				time = new Date().getTime();
				console.log('end_saveCheckIn '+ time);
				
				refreshRanking = 'yes';
				getRanking();
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest.responseText);
				console.log(XMLHttpRequest.statusText);
				console.log(textStatus);
				console.log(errorThrown);
					
				navigator.notification.alert('Leider war dein Check-In nicht erfolgreich! Bitte versuche es erneut.', alertDismissed, 'Check-In fehlgeschlagen', 'OK');
			}
		});
		
		return userWay;
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//<!-- Friend-Finder -->
function toFriendFinder() {
	if (fbId == "empty") {
		//console.log("not possible - not logged in with FB");
		navigator.notification.alert('Um deine Freunde zu finden musst du dich über Facebook anmelden!', alertDismissed, 'Facebook Anmeldung erforderlich', 'OK');
	}
	else {
		$.mobile.showPageLoadingMsg();
		
		//gaPlugin.trackEvent( gaInit, gaError, "KAC Check-In App", "Friend-Finder", userId, 1); // Kategorie, Aktion, Label
		
		goToFriendFinder = 'yes';
		getFriends();
	}
}

// get Friends
var fbFriends;

function getFriends() {
	time = new Date().getTime();
	console.log('start_getFriends '+ time);
	
	if (fbId != "empty"){
		//FB.api('/me/friends', //{ fields: 'id' },  
		//facebookConnectPlugin.api('me/friends?fields=id,email,name', ["user_friends"],
		facebookConnectPlugin.api('me/friends?fields=id', ["user_friends"],
			function(response) {
				var friends = response.data;
				var index = 0;
				
				fbFriends = "";
				
				for (var k=0; k<friends.length; k++) {
					var friend = friends[k];
					fbFriends += friend.id + ",";
					index++;
				}
				
				fbFriends += ")";				
				
				if (index == friends.length) {
					$.ajax({
						type: "POST",
						url: "http://secure.webwerk.at/kac-check-in/getFriends.php?" + time + "",
						data: ({
							'userId': userId,
							'fbFriends': fbFriends
						}),
						cache: false,
						dataType: "json",
						success: function (result) {
							friendArray = [];
							
							time = new Date().getTime();
							console.log('end_getFriends '+ time);
							
							if (result == "0") {
								console.log("no Friends");
							}
							else {
								$.each(result, function(i,item){		
									friendArray.push([
										item.friendId,
										item.friendFbId,
										item.friendName,
										item.friendMail,
										item.friendTelephone,
										item.friendPicture
									]); 
								});
								
								if (goToFriendFinder == 'yes') {
									getCheckedInFriends();
									goToFriendFinder = 'no';
								}
							}
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							console.log(XMLHttpRequest.responseText);
							console.log(XMLHttpRequest.statusText);
							console.log(textStatus);
							console.log(errorThrown);
							//console.log("Problem Find Friends");
							
							navigator.notification.alert('Bei deiner Anmeldung ist leider ein Fehler aufgetreten, bitte versuche es erneut!', alertDismissed, 'Anmeldung', 'OK');
							
							$('#login_form').show();
							$('#page1Header').hide();
							$('#logged_in').hide();
						}
					});

				}
			}
		);

	}
	else {
		console.log("Friends only when logged in with FB");
	}
}

function getCheckedInFriends() {	
	var fbKacFriends = "";
	
	for(var k=0; k<friendArray.length; k++) {
		fbKacFriends += friendArray[k][0] + ","; // User ID is saved
	}
	
	fbKacFriends += ")";
	
	var checkedInFriends = [];

	if (checkInDay == actualDay) {
		time = new Date().getTime();
		console.log('start_FriendFinder '+ time);
		//console.log(userId + " - " + isCheckedIn);
		//console.log("GameID " + gameId + " HallID " + hallId);
		//console.log(fbKacFriends + " Friends");
		
		$.ajax({
			type: "POST",
			url: "http://secure.webwerk.at/kac-check-in/getCheckedInFriends.php?" + time + "", // durchsuchen nach Freunden der userId & ob diese Freunde bei dem Spiel & Halle eingecheckt sind
			data: ({
				'userId': userId,
				'gameId': gameId,
				'hallId': hallId,
				'fbKacFriends': fbKacFriends,
			}),
			cache: false,
			dataType: "json",
			success: function (result) {
				for(var k=0; k<hallArray.length; k++) {
					if (hallArray[k][0] == hallId) {
						nearHall = hallArray[k][1];
					}
				}
				
				$.mobile.changePage('#FriendFinder');
				
				$("#friendFinderFirstLine").show();
				$('#noFriendsHere').hide();
				
				$('#nearFriends').append("");
				$('#nearFriends').listview('refresh');
					
				$(".stadion").html(nearHall);
				
				time = new Date().getTime();
				console.log('end_FriendFinder '+ time);
				
				if (result == "0") {
					entry = "<li>Keine Freunde in der Nähe!</li>";
					
					$('#nearFriends').append(entry);
				}
				else {
					checkedInFriends = [];
					$.each(result, function(i,item){		
						checkedInFriends.push([
							item.checkedInFriendName,
							item.checkedInFriendMail,
							item.checkedInFriendTelephone,
							item.checkedInFriendPicture,
							item.checkedInFriendFbId,
						]); 
					});	
					
					//console.log(checkedInFriends.length + " checked in Friends");
					
					var friendList = '';
					$("#nearFriends").html(friendList);
					
					var friendPicture;
					
					var string = "/picture";
					
					for (var i=0; i<checkedInFriends.length; i++) {
						if (checkedInFriends[i][3].search(string) == -1){ // dann wurde neues Bild auf den Server hochgeladen
							friendPicture = "http://secure.webwerk.at/kac-check-in/pictures/" + checkedInFriends[0][3];
						}
						else {
							friendPicture = checkedInFriends[i][3].replace("?type=large", "?width=100&height=100");
							friendPicture = "http://graph.facebook.com/" + friendPicture;
						}
						
						entry = "<li class=\"friendList\">" + 
							"<div class=\"friendFinderImage\"><img width=\"100%\" style=\"border-radius: 11px;\" src=\"" + friendPicture + "\"></div>" +
							"<div style=\"margin-left: 3.8em;\">" + checkedInFriends[i][0] +
								"</br>" + 
								"<div style=\"text-align: right; height: 2em;\">";
						
						if(checkedInFriends[i][2] != "") {
							entry += 	"<a data-role=\"button\" style=\"text-decoration: none;\" data-inline=\"true\" href=\"tel:" + checkedInFriends[i][2] + "\" \" \"><img src=\"images/icons/button_phone.png\" height=\"100%\">&nbsp;&nbsp;&nbsp;&nbsp;</a>" +
										"<a data-role=\"button\" style=\"text-decoration: none;\" data-inline=\"true\" href=\"sms:" + checkedInFriends[i][2] + "\" \"><img src=\"images/icons/button_sms.png\" height=\"100%\">&nbsp;&nbsp;&nbsp;&nbsp;</a>"; 
						}
						
						entry +=		"<a data-role=\"button\" style=\"text-decoration: none;\" data-inline=\"true\" href=\"#\" onClick=\"javascript:postOnFriendsWall('" + checkedInFriends[i][4] + "');\"><img src=\"images/icons/button_facebook.png\" height=\"100%\"></a>" +
									"</div>" +
								"</div>" +
							"</li>";
							
						$('#nearFriends').append(entry);
					}
				}
				
				$('#nearFriends').listview('refresh');
				
				$.mobile.hidePageLoadingMsg();
				
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest.responseText);
				console.log(XMLHttpRequest.statusText);
				console.log(textStatus);
				console.log(errorThrown);
					
				$.mobile.hidePageLoadingMsg();
			}
		});
	}
	else {
		$.mobile.changePage('#FriendFinder');
		$("#friendFinderFirstLine").hide();
		$("#noFriendsHere").show();
		$.mobile.hidePageLoadingMsg();
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//<!-- Statistik -->
function toStatistik() {
	//gaPlugin.trackEvent( gaInit, gaError, "KAC Check-In App", "Meine Seite", userId, 1); // Kategorie, Aktion, Label
	
	fromOwnStatistik = "yes";
	
	getCheckIns(userId);
}

function getCheckIns(actualUserId,atcualUserName,actualUserPoints) {
	$.mobile.showPageLoadingMsg();
	
	time = new Date().getTime();
	console.log('start_checkIns '+ time);

	//console.log(actualUserId + " & " + atcualUserName + " & " + actualUserPoints + " - fromOwnStatistik " + fromOwnStatistik);

	$.ajax({
		type: "POST",
		url: "http://secure.webwerk.at/kac-check-in/getCheckIns.php?" + time + "",
		data: ({
			'userId': actualUserId,
		}),
		cache: false,
		dataType: "json",
		success: function (result) {
			if (result != '0') {
				var gameResult = "";
				
				if(fromOwnStatistik == "yes") {
					$.mobile.changePage('#Statistik');
					
					$("#ownCollapsible").html("");
					$('#ownCollapsible').append('<div id="collapsibleSetOwnRanking" data-role="collapsible-set" data-corners=\"false\" data-collapsed-icon=\"redArrowDown\" data-expanded-icon=\"redArrowUp\" class=\"visitedStadionsList collapsibleRow\"></div>');
					
					$.each(result, function(i,item){	
						var count = 0;
						var listentry = "";						
						
						$.each(item, function(j,item2) {
							count++;
							
							//clickedUserPoints += parseFloat(item2.pointsForStadion);
							//clickedUserWay += parseFloat(item2.distanceFromHome);
							
							if (item2.result != "") {gameResult = " - " + item2.result;}
							else {gameResult = "";}
							
							listentry += "<li style=\"background-image: url('images/grafics/backgroundListDark.png');\">" + item2.gameDate + " - " + item2.homeTeam + " vs. " + item2.awayTeam + gameResult + "</li>";
						});	
						
						entry = "<div id=\"collapsibleOwnRanking\" data-role=\"collapsible\">" +
									"<h3>" + i + "<span class=\"customCountBubble\">" + count + "x</span></h3>" +
									"<ul data-role=\"listview\" style=\"font-size: 14px;\">" +
										listentry + 
									"</ul>" + 
								"</div>";
							
						$("#collapsibleSetOwnRanking").append(entry);
					});	
					
					$('#ownCollapsible').trigger('create');
					
					$(".personalName").html(nickname);
					$(".personalPoints").html(userPoints); 
					$(".personalWay").html(userWay);
					$(".personalRanking").html();
					
					$.mobile.hidePageLoadingMsg();
					
					time = new Date().getTime();
					console.log('end_checkIns '+ time);
					
					fromOwnStatistik = "no";
				}
				else {
					$.mobile.changePage('#rankingInfos');
					
					$(".clickedUserPoints").html("");
					$(".clickedUserWay").html("");
					$("#clickedUserName").html("&nbsp;" + atcualUserName);
					
					//var clickedUserPoints = actualUserPoints;
					var clickedUserWay = 0;
					
					$("#rankingCollapsible").html("");
					$('#rankingCollapsible').append('<div id="collapsibleSetRanking" data-corners=\"false\" data-role="collapsible-set" data-collapsed-icon=\"redArrowDown\" data-expanded-icon=\"redArrowUp\" class=\"visitedStadionsList collapsibleRow\"></div>');

					$.each(result, function(i,item){	
						var count = 0;
						var listentry = "";						
						
						$.each(item, function(j,item2) {
							count++;
						
							//clickedUserPoints += parseFloat(item2.pointsForStadion);
							clickedUserWay += parseFloat(item2.distanceFromHome);
							
							if (item2.result != "") {
								gameResult = " - " + item2.result;
							}
							else {
								gameResult = "";
							}
							
							listentry += "<li style=\"background-image: url('images/grafics/backgroundListDark.png');\">" + item2.gameDate + " - " + item2.homeTeam + " vs. " + item2.awayTeam + gameResult + "</li>";
						});	
						
						entry = "<div id=\"collapsibleRanking\" data-role=\"collapsible\">" +
									// "<h3>" + i + "<span class=\"customCountBubble\">" + count + "0x</span></h3>" +
									"<h3>" + i + "<span class=\"customCountBubble\">" + count + "x</span></h3>" +
									"<ul data-role=\"listview\" style=\"font-size: 14px;\">" +
										listentry + 
									"</ul>" + 
								"</div>";
							
						$("#collapsibleSetRanking").append(entry);
					});	
					
					$(".clickedUserPoints").html(actualUserPoints);
					$(".clickedUserWay").html(clickedUserWay);
					
					$('#rankingCollapsible').trigger('create');
					
					$.mobile.hidePageLoadingMsg();
					
					time = new Date().getTime();
					console.log('end_checkIns '+ time);
				}
			}
			else {
				if(fromOwnStatistik == "yes") { 
					$.mobile.changePage('#Statistik');
					
					$(".personalName").html(nickname);
					
					$(".personalPoints").html("0"); 
					$(".personalWay").html("0");
					$(".personalRanking").html("-.");
					
					$.mobile.hidePageLoadingMsg();
					
					$("#ownCollapsible").html("Noch keine Check-Ins!");
					
					fromOwnStatistik = "no";
				}
				else {
					$.mobile.changePage('#rankingInfos');
					
					$("#clickedUserName").html("&nbsp;" + atcualUserName);
					
					$.mobile.hidePageLoadingMsg();
					
					$("#rankingCollapsible").html("Noch keine Check-Ins!");
				}
				
				time = new Date().getTime();
				console.log('end_checkIns '+ time);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest.responseText);
			console.log(XMLHttpRequest.statusText);
			console.log(textStatus);
			console.log(errorThrown);
			
			$.mobile.hidePageLoadingMsg();
		}
	});
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//<!-- Ranking List -->
function toRankingList() { 
	//gaPlugin.trackEvent( gaInit, gaError, "KAC Check-In App", "Rangliste", userId, 1); // Kategorie, Aktion, Label
	
	goToRankingList = 'yes';
	getRanking();	
}

function toRankingListFriend() {
	if (fbId == "empty") {
		navigator.notification.alert('Für diese Funktion musst du dich über Facebook anmelden!', alertDismissed, 'Facebook Anmeldung erforderlich', 'OK');
		
		$('#ButtonFriendRanking').removeClass('ui-btn-active', 'ui-state-persist');
		$('#ButtonRanking').addClass('ui-btn-active', 'ui-state-persist');
	}
	else {
		$.mobile.showPageLoadingMsg();
		$.mobile.changePage('#FriendRating');
		
		$('#ratingListFriend').html("");
		
		//console.log("Users: " + rankingListArray.length + " & Friends: " + friendArray.length);
	
		for (var i=0; i<rankingListArray.length; i++) {
			if(userId == rankingListArray[i][0]) {
				entry = "<li class=\"listPlace\" data-icon=\"redArrowRight\"><a href=\"#\" onClick=\"javascript:getCheckIns(' " + rankingListArray[i][0] + " ', ' " + rankingListArray[i][1] + " ', ' " + rankingListArray[i][3] + " ');\"><span class=\"listText\"> &nbsp;" + rankingListArray[i][1] + "</span><span class=\"customCountBubble\">" + rankingListArray[i][3]  + "</span></a></li>";
				$('#ratingListFriend').append(entry);
			}
			else {
				for (var j=0; j<friendArray.length; j++) {
					if (rankingListArray[i][0] == friendArray[j][0]) {
						entry = "<li class=\"listPlace\" data-icon=\"redArrowRight\"><a href=\"#\" onClick=\"javascript:getCheckIns(' " + rankingListArray[i][0] + " ', ' " + rankingListArray[i][1] + " ', ' " + rankingListArray[i][3] + " ');\"><span class=\"listText\"> &nbsp;" + rankingListArray[i][1] + "</span><span class=\"customCountBubble\">" + rankingListArray[i][3]  + "</span></a></li>";
						$('#ratingListFriend').append(entry);
					}
				}
			}
		}
		
		$('#ratingListFriend').listview('refresh');
	}
	
	$.mobile.hidePageLoadingMsg();
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//<!-- Change Pages  -->
function toEntranceRequirements() {
	$.mobile.changePage('#entranceRequirements');
	
	if (devicePlatform == "iOS") {$(".appleText").show();}
	else {$(".appleText").hide();}
}

function toPricePage() {
	//gaPlugin.trackEvent( gaInit, gaError, "KAC Check-In App", "Gewinne", userId, 1); // Kategorie, Aktion, Label
	
	$.mobile.changePage('#pagePrices');
}

function toInfoPage() {
	//gaPlugin.trackEvent( gaInit, gaError, "KAC Check-In App", "Infos", userId, 1); // Kategorie, Aktion, Label
	
	$.mobile.changePage('#infoPage');
	
	if (devicePlatform == "iOS") {$(".appleText").show();}
	else {$(".appleText").hide();}
}

function toHelpPage() {
	//gaPlugin.trackEvent( gaInit, gaError, "KAC Check-In App", "Hilfe", userId, 1); // Kategorie, Aktion, Label
	
	$.mobile.changePage('#helpPage');
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//<!-- playing Schedule  -->
function toPlayingSchedule() {
	//gaPlugin.trackEvent( gaInit, gaError, "KAC Check-In App", "Spielplan", userId, 1); // Kategorie, Aktion, Label
	
	$.mobile.showPageLoadingMsg();
	
	time = new Date().getTime();
	console.log('start_getGames '+ time);
	
	$.ajax({
		type: "POST",
		url: "http://secure.webwerk.at/kac-check-in/getGames.php?" + time + "",
		data: ({
			'userId': actualUserId,
		}),
		cache: false,
		dataType: "json",
		success: function (result) {	
			$.mobile.changePage('#playingSchedule');
			$('#gamesList').html("");
			
			var resultText = ""
			
			$.each(result, function(i,item){ 
				
				if(item.result != "") {resultText = item.result;}
				else {resultText = "";}
				
				entry = "<li style=\"text-align: center;\">" +
							"<span style=\"font-family: openSans; font-size:0.9em;\">" + 
								item.gameDate + 
							"</span>" + 
							"</br>" + 
							"<span style=\"font-family: openSansSemibold; color: #bb2921; font-size: 0.9em; margin-left: -0.7em; margin-right: -0.7em;\">" + 
								item.homeTeam + "<span style=\"color: black; font-family:openSansExtraBold;\"> vs </span>" + item.awayTeam + 
							"</span>" + 
							"</br>" + 
							"<span style=\"font-family: openSansSemibold; color: black; font-size: 0.9em;\">" + 
							resultText +
							"</span>" + 
						"</li>";
						
				$('#gamesList').append(entry);
			});
			
			$('#gamesList').listview('refresh');
				
			time = new Date().getTime();
			console.log('end_getGames '+ time);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest.responseText);
			console.log(XMLHttpRequest.statusText);
			console.log(textStatus);
			console.log(errorThrown);
				
			navigator.notification.alert('Beim Abrufen des Spielplanes ist leider ein Fehler aufgetreten. Bitte versuche es erneut.', alertDismissed, 'Information', 'OK');
			
			$.mobile.hidePageLoadingMsg();
		}
	});
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//<!-- Google Analytics -->
/*	
function gaInit(result){
	console.log("Google Analytics Result " + result);
}

function gaError(error){
	console.log("Google Analytics Error " + error);
}
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function backToPage1() {
	$.mobile.changePage('#Page1');
	$('#login_form').hide();
	$('#page1Header').show();
	$('#logged_in').show();
	$('#infoInternet').hide();
	
	 $('.collapsibleRow').each(function() {
		var coll = $(this);
		coll.trigger('collapse'); 
	});
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//<!-- Logout -->
function logout() {
	navigator.notification.confirm('Willst du dich wirklich von der Check-In App powered by Hirter Bier abmelden?', logoutCallback, 'Wirklich Abmelden?', ['Ja','Nein']);
}

function logoutCallback(buttonIndex) {
	if(buttonIndex == 1){
		//gaPlugin.trackEvent( gaInit, gaError, "KAC Check-In App", "LogOut", userId, 1); // Kategorie, Aktion, Label
		
		deleteAllVariables();
		
		$.mobile.changePage('#Page1');
		$('#login_form').show();
		
		document.login.name.value = "";
		document.login.email.value = "";
		document.login.password.value = "";
		
		facebookConnectPlugin.logout(function(response) {
			console.log('know you are logged out');
		});
		
		$('#page1Header').hide();
		$('#logged_in').hide();
		$('#infoInternet').hide();
	}
}

function deleteAllVariables() {
	userId = "";
	nickname = "";
	useremail = "";
	password = "";
	telephone = "";
	userWay = "";
	userPoints = ""
	picture = "";
	userRanking = "";
	
	userDataArray = [];
	
	stadionLat = 0;
	stadionLon = 0;
	
	hallId = "";
	nearHall = "";
	hallDistanceFromHome = "";
	gameId = "";
	
	checkInDay = "";
	isCheckedIn = "no";
	
	goToRankingList = 'no';
	refreshRanking = 'no';
	
	newUser = "no";
	withPicture = "no";
	
	window.localStorage.clear();
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//<!-- Callback für custom notification -->
function alertDismissed() {}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
