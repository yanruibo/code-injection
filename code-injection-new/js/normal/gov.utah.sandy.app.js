







	// this is all set up because we need the device to be ready before
	// setting up the jqmobile stuff because some of the settings for jqm
	// depend on the type of device
	document.addEventListener(
		'deviceready',
		function () {
			app.initialize();
			//push.initialize();
			$(document).one("mobileinit", function () {
				$('body').css('visibility', '');
			});
			$.getScript('assets/js/jquery.mobile-1.2.0.min.js');
		},
		false
	);



var PushNotification = function() {
};


// Call this to register for push notifications. Content of [options] depends on whether we are working with APNS (iOS) or GCM (Android)
PushNotification.prototype.register = function(successCallback, errorCallback, options) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("PushNotification.register failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.register failure: success callback parameter must be a function");
        return
    }

	cordova.exec(successCallback, errorCallback, "PushPlugin", "register", [options]);
};

// Call this to unregister for push notifications
PushNotification.prototype.unregister = function(successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("PushNotification.unregister failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.unregister failure: success callback parameter must be a function");
        return
    }

     cordova.exec(successCallback, errorCallback, "PushPlugin", "unregister", []);
};
 
 
// Call this to set the application icon badge
PushNotification.prototype.setApplicationIconBadgeNumber = function(successCallback, errorCallback, badge) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("PushNotification.setApplicationIconBadgeNumber failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.setApplicationIconBadgeNumber failure: success callback parameter must be a function");
        return
    }

    cordova.exec(successCallback, successCallback, "PushPlugin", "setApplicationIconBadgeNumber", [{badge: badge}]);
};

//-------------------------------------------------------------------

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.pushNotification) {
    window.plugins.pushNotification = new PushNotification();
}


var pushNotification;

function onDeviceReady() {

	pushNotification = window.plugins.pushNotification;
	if (device.platform === 'android' || device.platform === 'Android') {
		//if (!localStorage.pushregistered == "true") {
			pushNotification.register(successHandler, errorHandler, {"senderID":"476774979025","ecb":"onNotificationGCM"}); // prod: 476774979025 test: 103866695116
		//}
	} else {
		// always register with iOS
		// http://devgirl.org/2012/10/19/tutorial-apple-push-notifications-with-phonegap-part-1/
		pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});
	}
}

// handle APNS notifications for iOS
function onNotificationAPN(event) {
	if (event.alert) {
		$("#push-notifications div[data-role='content']").html(event.alert);
		$.mobile.changePage($('#push-notifications'), {});
	}

	if (event.sound) {
		var snd = new Media(event.sound);
		snd.play();
	}

	if (event.badge) {
		pushNotification.setApplicationIconBadgeNumber(successHandler, event.badge);
	}
}

// handle GCM notifications for Android
function onNotificationGCM(e) {
	switch( e.event )
	{
		case 'registered':
		if ( e.regid.length > 0 )
		{
			var d = new Date();
			var timezone = d.getTimezoneOffset();
			$.ajax({
				url: "https://sandy.utah.gov/mobile/phonegap/push",
				type: "POST",
				dataType: "json",
				data: {
					'mode':'register',
					'appid':'1',			// 1 production, 2 test
					'token':e.regid,
					'timezone':timezone,
					'model':device.model,
					'platform':device.platform,
					'version':device.version
				}}).done(function(response) {
					if (response.error == '') {
						localStorage.pushregistered = "true";
						localStorage.pushregistrationtoken = e.regid;
					} else {
						if (app.debug) alert(response.error);
					}
				}).fail(function(jqXHR, textStatus, errorThrown){
					if (app.debug) alert('Failed to register for push notifications: '+textStatus+' : '+errorThrown);
				});
		}
		break;

		case 'message':
			alert(e.payload.message);
			//$("#push-notifications div[data-role='content']").html(e.payload.message);
			//$.mobile.changePage($('#push-notifications'), {});
		break;

		case 'error':
			if (app.debug) alert('push notifications: case error');
		break;

		default:
			// Unknown, an event was received and we do not know what it is
		break;
	}
}
// for ios
function tokenHandler (result) {
	var d = new Date()
	var timezone = d.getTimezoneOffset();
	$.ajax({
		url: "https://sandy.utah.gov/mobile/phonegap/push",
		type: "POST",
		dataType: "json",
		data: {
			'mode':'register',
			'appid':'1',
			'token':result,
			'timezone':timezone,
			'model':device.model,
			'platform':device.platform,
			'version':device.version
		}}).done(function(response) {
			if (response.error == '') {
				// all ok
				localStorage.pushregistrationtoken = result;
			} else {
				if (app.debug) alert(response.error);
			}
		}).fail(function(jqXHR, textStatus, errorThrown){
			if (app.debug) alert('Failed to register for push notifications: '+textStatus+' : '+errorThrown);
		});
}

function successHandler (result) {
	
}

function errorHandler (error) {

}

document.addEventListener('deviceready', onDeviceReady, true);

var app = {
	
	debug: false,
	calendarLinks: [],
	userEmail: '',
	// Google Maps stuff
	mapLoaded: false,
	map: null,
	marker: null,
	watchProcess: null,
	map2: null,
	marker2: null,
	watchProcess2: null,
	map3: null,
	marker3: null,
	watchProcess3: null,
	// default position
	latitude: 40.59732,
	longitude: -111.870793,
	findPopup: true,

	directoryCity: null,
	directoryRestaurants: null,
	directoryFastFood: null,
	directorySkiResorts: null,
	
	ajaxcache: 3600, // cache in seconds
	
    // Application Constructor
    initialize: function() {
		
		document.addEventListener("pause", this.onPause, false);
		document.addEventListener("resume", this.onResume, false);
		// load Google Maps here async
		$.getScript("http://maps.google.com/maps/api/js?sensor=true&callback=init_map", function() {
			
		});
		
		if (localStorage.notificationsChanged == "true") {
			app.saveSettings();
		}

		if (device.platform == 'android' || device.platform == 'Android') {
			if (localStorage.camera == "true") {
				if (app.debug) alert('Load camera (camera killed): '+localStorage.camera);
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.onFileSystemSuccess, this.onFileSystemFail);
			}
		}
		
		// add all the back buttons to ios apps
		$(document).on('pageinit', '#home', function(event) {
			if (device.platform == 'android' || device.platform == 'Android') {
				
			} else {
				$(".ios-back").each(function(index) {
					var title = $(this).attr("data-title");
					$(this).prepend('<div data-role="header" data-position="fixed"><h1>'+title+'</h1></div>');
					$(this).attr('data-add-back-btn', 'true');
				});
			}
		});
		$(document).on('pageshow', '#home', function(event) {
			if (device.platform == 'android' || device.platform == 'Android') {
				if (localStorage.camera == "true") {
					localStorage.camera = "false";
					$.mobile.changePage($('#service'), {});
				}
			}
		});

		$(document).on('pageshow', '#news', function() {
			app.showNews();
		});
		// don't remove this - used to "clear" previous news story
		$(document).on('pagebeforeshow', '#news-single', function(event) {
			$("#news-single div[data-role='content']").html('');
		});
		$(document).on('pageshow', '#news-single', function(event) {
			app.showNewsSingle();
		});
		$(document).on('pageshow', '#calendar', function(event) {
			app.showCalendar();
		});
		$(document).on('pagebeforeshow', '#calendar-single', function(event) {
			$("#calendar-single div[data-role='content']").html('');
		});
		$(document).on('pageshow', '#calendar-single', function(event) {
			app.showCalendarSingle();
		});
		$(document).on('pageshow', '#directory-city', function(event) {
			app.showCityDirectory();
		});
		$(document).on('pageinit', '#contact', function(event) {
			app.initPageContact();
		});
		$(document).on('pageshow', '#directory-fastfood', function(event) {
			app.showFastFood();
		});
		$(document).on('pageshow', '#directory-restaurants', function(event) {
			app.showRestaurants();
		});
		$(document).on('pageshow', '#directory-ski-resorts', function(event) {
			app.showSkiResorts();	
		});
		$(document).on('pageshow', '#social-media', function(event) {
			app.showSocialMedia();
		});
		$(document).on('pagebeforeshow', '#directory-single', function(event) {
			$("#directory-single div[data-role='content']").html('');
		});
		$(document).on('pageshow', '#directory-single', function(event) {
			app.showDirectorySingle();
		});
		$(document).on('pageinit', '#service', function(event) {
			app.initPageService();
		});
		$(document).on('pageshow', '#service', function(event) {
			if ($('#service-use-location').is(':checked')) {

				$('#map_preview_container').show();
				if (app.map) {
					if (app.findPopup) {
						if (app.watchProcess == null) {
							app.watchProcess = navigator.geolocation.watchPosition(app.found_location, app.handle_errors, {enableHighAccuracy:true, maximumAge:30000, timeout:27000});
						}
					} else {
						var myLatLng = new google.maps.LatLng(app.latitude, app.longitude);
						google.maps.event.trigger(app.map,'resize');
						app.marker.setPosition(myLatLng);
						app.map.setCenter(myLatLng);
					}
				} else {
					app.createServiceMap();
				}

			} else {
				$('#map_preview_container').hide();
				if (app.map) {
					app.watchProcess = app.stop_watchlocation(app.watchProcess);
				}
			}
		
			if ($('#service-uid').val() == '29200') {
				$('#map-container').hide();
				$('#service-address-container').show();
			} else {
				$('#map-container').show();
				$('#service-address-container').hide();
			}
		});
		$(document).on('pagehide', '#service', function(event) {
			app.watchProcess = app.stop_watchlocation(app.watchProcess);
		});
		$(document).on('pageinit', '#page-map', function(event) {
			$("#map-get-current-location").click(function() {
				if (app.mapLoaded)
				{
					app.findPopup = true;
					//if (app.watchProcess2 == null) {
						app.watchProcess2 = navigator.geolocation.watchPosition(app.found_location2, app.handle_errors, {enableHighAccuracy:true, maximumAge:30000, timeout:27000});
					//}
					google.maps.event.trigger(app.map2,'resize');
				}
			});
		});
		$(document).on('pageshow', '#page-map', function(event) {
			if (app.map2) {
				app.watchProcess = app.stop_watchlocation(app.watchProcess);
				if (app.findPopup) {
					if (app.watchProcess2 == null) {
						app.watchProcess2 = navigator.geolocation.watchPosition(app.found_location2, app.handle_errors, {enableHighAccuracy:true, maximumAge:30000, timeout:27000});
					}
				}
			} else {
				app.createPageMap();
			}
		});
		$(document).on('pagehide', '#page-map', function(event) {
			app.watchProcess2 = app.stop_watchlocation(app.watchProcess2);
		});
		$(document).on('pageinit', '#photo', function(event) {
			app.initPagePhoto();
		});
		$(document).on('pageinit', '#current-location-map', function(event) {
			$("#go-to-current-location").click(function() {
				if (app.mapLoaded)
				{
					google.maps.event.trigger(app.map3,'resize');
				}
			});
		});
		$(document).on('pageshow', '#current-location-map', function(event) {
			if (app.map3) {
				app.watchProcess3 = navigator.geolocation.watchPosition(app.found_location3, app.handle_errors, {enableHighAccuracy:true, maximumAge:30000, timeout:27000});
			} else {
				app.createBusinessMap();
			}
		});
		$(document).on('pagehide', '#current-location-map', function(event) {
			app.watchProcess3 = app.stop_watchlocation(app.watchProcess3);
		});
		$(document).on('pageinit', '#settings', function(event) {
			/*
			 * This has problems in ios with the checkboxes
			 * 
			$(".settings-notification").bind("change", function(event, ui) {
				var checkBoxArray = new Array();
				$('.settings-notification').each(function(i,e){
					if ($(this).prop('checked')) {s
						checkBoxArray.push($(this).val());
					}
				});
				localStorage.notificationsValues = checkBoxArray.join(',');
				if (app.debug) alert('Changing notification values: '+localStorage.notificationsValues);
				localStorage.notificationsChanged = "true";
			});
			*/
		});
		$(document).on('pageshow', '#settings', function(e, data) {
			$(".settings-notification").checkboxradio();
			if (localStorage.notificationsValues === undefined) {
				$("#checkbox-1").prop("checked", true).checkboxradio("refresh");
			} else {
				if (app.debug) alert('Checking boxes according to notification values: '+localStorage.notificationsValues);
				var notifications = localStorage.notificationsValues;
				var checkBoxArray = notifications.split(",");
				for (var i = 0; i < checkBoxArray.length; i++)
				{ 
					$("#checkbox-"+checkBoxArray[i]).attr("checked",true).checkboxradio("refresh");
				}
			}
			if (app.debug) {
				$("#settings-debug").html("Token: "+localStorage.pushregistrationtoken);
			}
		});

    },
	
	saveSettings: function() {
		var checkBoxArray = new Array();
		$('.settings-notification').each(function(i,e){
			if ($(this).prop('checked')) {
				checkBoxArray.push($(this).val());
			}
		});
		if (localStorage.notificationsValues !== checkBoxArray.join(',')) {
			localStorage.notificationsValues = checkBoxArray.join(',');
			localStorage.notificationsChanged = "true";
			if (app.debug) alert('Changing notification values: '+localStorage.notificationsValues);
		}
		if (localStorage.notificationsChanged === "true") {
			
			if (localStorage.pushregistrationtoken) {
				$.ajax({
					url: "https://sandy.utah.gov/mobile/phonegap/push",
					type: "POST",
					dataType: "json",
					data: {
						'mode':'tags',
						'token':localStorage.pushregistrationtoken,
						'tags':localStorage.notificationsValues,
						'platform':device.platform
					}}).done(function(response) {
						if (response.error == '') {
							if(app.debug) alert('all ok');
							localStorage.notificationsChanged = "false"
						} else {
							if(app.debug) alert('Failed to add tags: ' + response.error);
						}
					}).fail(function(jqXHR, textStatus, errorThrown){
						if(app.debug) alert('Failed to add tags (Sandy server) : '+textStatus+' : '+errorThrown);
					});
			} else {
				if(app.debug) alert('localStorage.pushregistrationtoken is not true!');
			}
		} else {
			if(app.debug) alert('localStorage.notificationsChanged is not true!');
		}
	},
	
	onPause: function() {
		//if (mapLoaded) {
			if (app.watchProcess !== null)
			{
				app.watchProcess = app.stop_watchlocation(app.watchProcess);
				localStorage.watchProcess = "true";
			}
			if (app.watchProcess2 !== null)
			{
				app.watchProcess2 = app.stop_watchlocation(app.watchProcess2);
				localStorage.watchProcess2 = "true";
			}
			if (app.watchProcess3 !== null)
			{
				app.watchProcess3 = app.stop_watchlocation(app.watchProcess3);
				localStorage.watchProcess3 = "true";
			}
		//}
	},
	
	onResume: function() {
		if (app.mapLoaded) {
			if (localStorage.watchProcess === "true") {
				app.watchProcess = navigator.geolocation.watchPosition(app.found_location, app.handle_errors, {enableHighAccuracy:true, maximumAge:30000, timeout:27000});
				localStorage.watchProcess = "false";
			}
			if (localStorage.watchProcess2 === "true") {
				app.watchProcess2 = navigator.geolocation.watchPosition(app.found_location2, app.handle_errors, {enableHighAccuracy:true, maximumAge:30000, timeout:27000});
				localStorage.watchProcess2 = "false";
			}
			if (localStorage.watchProcess3 === "true") {
				app.watchProcess3 = navigator.geolocation.watchPosition(app.found_location3, app.handle_errors, {enableHighAccuracy:true, maximumAge:30000, timeout:27000});
				localStorage.watchProcess3 = "false";
			}
		}
	},
	
	showNews: function()  {
		var currentData = $.trim($("#news div[data-role='content']").html());
		if (!currentData || currentData === '<p>Failed to get news. Check network connection.</p>' || (localStorage.cacheNews && (Math.floor(Date.now() / 1000) - localStorage.cacheNews) > app.ajaxcache))
		{
			$("#news div[data-role='content']").html('');
			app.showLoading();
			$.ajax({
				url: "http://sandy.utah.gov/mobile/phonegap/ajax.html",
				type: "GET",
				dataType: "jsonp",
				timeout : 10000,
				data: {
					"ajax":"news"
				}}).done(function(data) {
					var news = '<ul data-role="listview">';
					for (var i= 0; i < data.length; i++) {
						// external url
						if (data[i].type == 2) {
							news +=
								'<li data-icon="false"><a href="#" onclick="window.open(encodeURI(\''+data[i].ext_url+'\'), \'_system\', \'location=yes,enableViewportScale=yes\');"><p><strong>'+data[i].title+'</strong></p>'+
									'<p>Posted: '+app.timeConverter(data[i].datetime)+'</p>'+
									'<p>'+data[i].teaser+'</p>'+
								'</a></li>';
						// internal page
						} else if (data[i].type == 1) {
							news +=
								'<li data-icon="false"><a href="#" onclick="window.open(encodeURI(\'http://sandy.utah.gov/index.php?id='+data[i].page+'\'), \'_system\', \'location=yes,enableViewportScale=yes\');"><p><strong>'+data[i].title+'</strong></p>'+
									'<p>Posted: '+app.timeConverter(data[i].datetime)+'</p>'+
									'<p>'+data[i].teaser+'</p>'+
								'</a></li>';
						} else {
							news +=
								'<li data-icon="false"><a href="#news-single" onClick="localStorage.newsID='+data[i].uid+
									'"><p><strong>'+data[i].title+'</strong></p>'+
									'<p>Posted: '+app.timeConverter(data[i].datetime)+'</p>'+
									'<p>'+data[i].teaser+'</p>'+
								'</a></li>';
						}
					}
					news += '</ul>';
					$("#news div[data-role='content']").html(news).trigger('create');
				}).fail(function(){
					$("#news div[data-role='content']").html('<p>Failed to get news. Check network connection.</p>');
				}).always(function(){
					app.hideLoading();
					localStorage.cacheNews = Math.floor(Date.now() / 1000);
				});
		}
	},
	
	showNewsSingle: function() {
		this.showLoading();
		$.ajax({
			url: "http://sandy.utah.gov/mobile/phonegap/news-article.html?tx_ttnews%5Btt_news%5D="+localStorage.newsID,
			type: "GET",
			dataType: "html",
			timeout : 10000
		}).done(function(data) {
			$("#news-single div[data-role='content']").html(data);
			$('#news-single a[href^="http"]').each(function() {
				var href = $(this).attr('href');
				$(this).attr('onclick', "window.open(encodeURI('"+href+"'), '_system', 'location=yes,enableViewportScale=yes');")
					   .attr('href','#');
			  });
		}).fail(function(){
			$("#news-single div[data-role='content']").html('<p>Failed to get news. Check network connection.</p>');
		}).always(function(){
			app.hideLoading();
		});
	},
	
	showCalendar: function() {
	
		var currentData = $.trim($("#calendar div[data-role='content']").html());
		if (!currentData || currentData === '<p>Failed to get calendar. Check network connection.</p>' || (localStorage.cacheCalendar && (Math.floor(Date.now() / 1000) - localStorage.cacheCalendar) > app.ajaxcache))
		{
			this.showLoading();
			app.calendarLinks = [];
			$.ajax({
				url: "http://sandy.utah.gov/mobile/phonegap/ajax.html",
				type: "GET",
				dataType: "jsonp",
				data: {
					"ajax":"calendar"
				}}).done(function(data) {
					var calendar = '<ul data-role="listview">';
					var pageBreak = '';
					var currentDate = '';
					var htmlOutput = '';
					var xmlDoc = $.parseXML(data);
					var xml = $(xmlDoc);
					xml.find('event').each(function(i){

						currentDate = $(this).find("date").text();
						if (currentDate !== pageBreak) {
							htmlOutput += '<li data-role="list-divider">'+currentDate+'</li>';
							pageBreak = currentDate;
						}
						var link = $(this).find("link").text();
						app.calendarLinks.push(link);
						if (link.indexOf("http://sandy.utah.gov/calendar/event/cal/event/tx_cal_phpicalendar") > -1) {
							htmlOutput += '<li data-icon="false"><a href="#calendar-single" onClick="localStorage.calendarLink='+i+'"><p><strong>'
									+$(this).find("title").text()+'</strong>';
						} else {
							htmlOutput += '<li data-icon="false"><a href="#" onclick="window.open(encodeURI(\''+link+'\'), \'_system\', \'location=yes,enableViewportScale=yes\');"><p><strong>'
									+$(this).find("title").text()+'</strong>';
						}
						if ($(this).find("time").text() !== '') {
							htmlOutput += '<br />'+$(this).find("time").text();
						}
						htmlOutput += '</p></a></li>';
					});
					calendar += htmlOutput+'</ul>';
					$("#calendar div[data-role='content']").html(calendar).trigger('create');
				}).fail(function(){
					$("#calendar div[data-role='content']").html('<p>Failed to get calendar. Check network connection.</p>');
				}).always(function(){
					app.hideLoading();
					localStorage.cacheCalendar = Math.floor(Date.now() / 1000);
				});
		}
	},
	
	showCalendarSingle: function() {
		this.showLoading();
		$.ajax({
			url: app.calendarLinks[localStorage.calendarLink],
			type: "GET",
			dataType: "html",
			timeout : 10000
		}).done(function(data) {
			$("#calendar-single div[data-role='content']").html(data);
			$("#calendar-event img").attr('src','http://sandy.utah.gov/'+$("#calendar-event img").attr('src'));
			$('#calendar-event a[href^="http"]').each(function() {
				var href = $(this).attr('href');
				$(this).attr('onclick', "window.open(encodeURI('"+href+"'), '_system', 'location=yes,enableViewportScale=yes');")
					   .attr('href','#');
			  });
		}).fail(function(){
			$("#calendar-single div[data-role='content']").html('<p>Failed to get event. Check network connection?</p>');
		}).always(function(){
			app.hideLoading();
		});
	},
	
	showCityDirectory: function() {
		var currentData = $.trim($("#directory-city div[data-role='content']").html());
		if (!currentData || currentData == '<p>Failed to get city directory. Check network connection?</p>' || (localStorage.cacheCityDirectory && (Math.floor(Date.now() / 1000) - localStorage.cacheCityDirectory) > app.ajaxcache))
		{
			this.showLoading();
			$.ajax({
				url: "http://sandy.utah.gov/mobile/phonegap/ajax.html",
				type: "GET",
				dataType: "jsonp",
				timeout : 10000,
				data: {
					"ajax":"directory-city"
				}
			}).done(function(data) {
				app.directoryCity = data;
				var listing = '<ul data-role="listview" data-filter="true">';
				for (var i = 0; i < data.length; i++){
					listing += '<li data-icon="false"><a href="#directory-single" onClick="localStorage.cityID='+i+';localStorage.database=\'city\'">'+data[i].company+'</a></li>';
				}
				listing += '</ul>';
				$("#directory-city div[data-role='content']").html(listing).trigger("create");

			}).fail(function(){
				$("#directory-city div[data-role='content']").html('<p>Failed to get city directory. Check network connection?</p>');
			}).always(function(){
				app.hideLoading();
				localStorage.cacheCityDirectory = Math.floor(Date.now() / 1000);
			});
		}
	},
	
	showFastFood: function() {
		var currentData = $.trim($("#directory-fastfood div[data-role='content']").html());
		if (!currentData || currentData == '<p>Failed to get fast food list. Check network connection?</p>' || (localStorage.cacheFastFood && (Math.floor(Date.now() / 1000) - localStorage.cacheFastFood) > app.ajaxcache))
		{
			this.showLoading();
			$.ajax({
				url: "http://sandy.utah.gov/mobile/phonegap/ajax.html",
				type: "GET",
				dataType: "jsonp",
				data: {
					"ajax":"directory-fastfood"
				}}).done(function(data) {
					app.directoryFastFood = data;
					var pageBreak = '';
					var listing = '<ul data-role="listview" data-filter="true">';
					for (var i= 0; i < data.length; i++) {
						if (data[i].grp_title != pageBreak) {
							pageBreak = data[i].grp_title;
							listing += '<li data-role="list-divider">'+pageBreak+'</li>';
						}
						listing += '<li data-icon="false" data-filtertext="'+data[i].grp_title+' '+data[i].company+'"><a href="#directory-single" onClick="localStorage.fastfoodID='+i+';localStorage.database=\'fast food\'"><p><strong>'+data[i].company+'</strong></p>';
						if (data[i].address != '') {
							listing += '<p>'+data[i].address+'</p>';
						}
						listing += '</a></li>';
					}
					listing += '</ul>';
					$("#directory-fastfood div[data-role='content']").html(listing).trigger("create");
				}).fail(function(){
					$("#directory-fastfood div[data-role='content']").html('<p>Failed to get fast food list. Check network connection?</p>');
				}).always(function(){
					app.hideLoading();
					localStorage.cacheFastFood = Math.floor(Date.now() / 1000);
				});
		}
	},

	showRestaurants: function() {
		var currentData = $.trim($("#directory-restaurants div[data-role='content']").html());
		if (!currentData || currentData == '<p>Failed to get restaurants. Check network connection?</p>' || (localStorage.cacheRestaurants && (Math.floor(Date.now() / 1000) - localStorage.cacheRestaurants) > app.ajaxcache))
		{
			this.showLoading();

			$.ajax({
				url: "http://sandy.utah.gov/mobile/phonegap/ajax.html",
				type: "GET",
				dataType: "jsonp",
				timeout : 10000,
				data: {
					"ajax":"directory-restaurants"
				}
			}).done(function(data) {

				app.directoryRestaurants = data;

				var pageBreak = '';
				var listing = '<ul data-role="listview" data-filter="true">';
				for (var i= 0; i < data.length; i++) {
					if (data[i].grp_title != pageBreak) {
						pageBreak = data[i].grp_title;
						listing += '<li data-role="list-divider">'+pageBreak+'</li>';
					}
					listing += '<li data-icon="false" data-filtertext="'+data[i].grp_title+' '+data[i].company+'"><a href="#directory-single" onClick="localStorage.restaurantID='+i+';localStorage.database=\'restaurants\'"><p><strong>'+data[i].company+'</strong></p>';
					if (data[i].address != '') {
						listing += '<p>'+data[i].address+'</p>';
					}
					listing += '</a></li>';
				}
				listing += '</ul>';
				$("#directory-restaurants div[data-role='content']").html(listing).trigger("create");

			}).fail(function(){
				$("#directory-restaurants div[data-role='content']").html('<p>Failed to get restaurants. Check network connection?</p>').trigger("create");
			}).always(function(){
				app.hideLoading();
				localStorage.cacheRestaurants = Math.floor(Date.now() / 1000);
			});
		}
	},
	
	showSkiResorts: function() {
		var currentData = $.trim($("#directory-ski-resorts div[data-role='content']").html());
		if (!currentData || currentData === '<p>Failed to get ski resorts. Check network connection?</p>' || (localStorage.cacheSkiResorts && (Math.floor(Date.now() / 1000) - localStorage.cacheSkiResorts) > app.ajaxcache))
		{
			this.showLoading();
			$.ajax({
				url: "http://sandy.utah.gov/mobile/phonegap/ajax.html",
				type: "GET",
				dataType: "jsonp",
				timeout : 10000,
				data: {
					"ajax":"directory-ski-resorts"
				}
			}).done(function(data) {
				app.directorySkiResorts = data;
				var listing = '<ul data-role="listview">';
				for (var i = 0; i < data.length; i++){
					listing += '<li data-icon="false"><a href="#directory-single" onClick="localStorage.skiResortID='+i+';localStorage.database=\'ski resorts\'"><p><strong>'+data[i].company+'</strong>';
					if (data[i].address != '') {
						listing += '<br /><span style="font-weight: normal;">'+data[i].address+'</span>';
					}
					listing += '</p></a></li>';
				}
				listing += '</ul>';
				$("#directory-ski-resorts div[data-role='content']").html(listing).trigger("create");

			}).fail(function(){
				$("#directory-ski-resorts div[data-role='content']").html('<p>Failed to get ski resorts. Check network connection?</p>');
			}).always(function(){
				app.hideLoading();
				localStorage.cacheSkiResorts = Math.floor(Date.now() / 1000);
			});
		}
	},
	
	showSocialMedia: function() {
		var currentData = $.trim($("#social-media div[data-role='content']").html());
		if (!currentData || currentData === '<p>Failed to get social media. Check network connection.</p>' || (localStorage.cacheSocialMedia && (Math.floor(Date.now() / 1000) - localStorage.cacheSocialMedia) > app.ajaxcache))
		{
			this.showLoading();
			$.ajax({
				url: "http://sandy.utah.gov/mobile/phonegap/ajax.html",
				type: "GET",
				dataType: "jsonp",
				timeout : 10000,
				data: {
					"ajax":"social-media"
				}
			}).done(function(data) {
				var listing = '<ul data-role="listview">';
				for (var i = 0; i < data.length; i++){
					listing += '<li data-icon="false"><a href="#" onclick="window.open(encodeURI(\''+data[i].social_link+'\'), \'_system\', \'location=yes,enableViewportScale=yes\');"><img src="'+data[i].social_icon+'" />';
					listing += '<h3>'+data[i].social_title+'</h3><p class="social-media">'+data[i].social_description+'</p>';
					listing += '</a></li>';
				}
				listing += '</ul>';
				$("#social-media div[data-role='content']").html(listing).trigger("create");

			}).fail(function(){
				$("#social-media div[data-role='content']").html('<p>Failed to get social media. Check network connection.</p>');
			}).always(function(){
				app.hideLoading();
				localStorage.cacheSocialMedia = Math.floor(Date.now() / 1000);
			});
		}
	},
	
	showDirectorySingle: function() {
		var data;

		switch(localStorage.database)
		{
			case "city":
				data = app.directoryCity[localStorage.cityID];
			break;

			case "restaurants":
				data = app.directoryRestaurants[localStorage.restaurantID];
			break;

			case "fast food":
				data = app.directoryFastFood[localStorage.fastfoodID];
			break;

			case "ski resorts":
				data = app.directorySkiResorts[localStorage.skiResortID];
			break;

			default:
				data = '';
			break;
		}

		if (data)
		{
			var output = '<h3>'+data.company+'</h3>';
			if (data.description != '' && data.description != null && data.description != 'null') {
				output += '<p>'+data.description+'</p>';
			}
			if (data.address != '') {
				var googleMapsLink = data.address+', '+data.city+', '+data.region;
				output += '<p><a href="#" onclick="window.open(encodeURI(\''+app.formatMapURL(googleMapsLink)+'\'), \'_system\', \'location=yes,enableViewportScale=yes\');" data-role="button" data-icon="map-marker">'+data.address+', '+data.city+', '+data.region+', '+data.zip+'</a></p>';	
			}
			if (data.phone != '') {
				output += '<p><a href="tel:'+data.phone+'" data-role="button" data-icon="phone">'+data.phone+'</a></p>';
			}
			if (data.www != '') {
				output += '<p><a href="#" onclick="window.open(encodeURI(\''+data.www+'\'), \'_system\', \'location=yes,enableViewportScale=yes\');" data-role="button" data-icon="globe">'+data.www+'</a></p>';
			}
			if (data.module_sys_dmail_html == '1') {
				output += '<p><a href="#contact" data-role="button" data-icon="envelope-alt" onClick="localStorage.contactuid='+data.uid+'">Email</a></p>';
			}

			$("#directory-single div[data-role='content']").html(output).trigger("create");
		} else {
			$("#directory-single div[data-role='content']").html('<p>Can\'t find record in database.</p>');
		}
	},
	
	initPageContact: function() {
		$('#contact-email').val(app.userEmail);
		$("#contact-submit-button").on('click', function(e) {
			e.preventDefault();
			if ($('#contact-message').val()=='') {
				$('#contact-message').css("background-color","red");
				alert("Please enter a message.");
			} else {
				$('#contact-message').css("background-color","");
				if ($('#contact-email').val()=='') {
					var r = confirm("You did not enter an email address. You do not have to enter an email address, but if you do not, we have no way of responding to you directly. Click OK to continue or CANCEL to enter an email address.");
					if (r == true) {
						app.sendMail();
					}
				} else {
					app.sendMail();
				}
			}
		});
	},
	
	sendMail: function() {
		var email = $('#contact-email').val();
		var uid = localStorage.contactuid;
		var message = $('#contact-message').val();
		$.ajax({
			url: "https://sandy.utah.gov/mobile/phonegap/ajax/secure.html",
			type: "POST",
			dataType: "json",
			data: {
				"ajax":"contact",
				"email":email,
				"uid":uid,
				"message":message
			}}).done(function(data) {
				$('#contact-message').val('');
				alert(data.data);
			}).fail(function(jqXHR, textStatus, errorThrown){
				alert('Failed to send message: '+textStatus+' : '+errorThrown);
			});
	},
	
	initPageService: function() {
		$('#map_preview').on("tap", function() { 
			$.mobile.changePage($('#page-map'), {});
		});

		$('#service-use-location').change(function() {
			if (this.checked) {
				$('#map_preview_container').show();
				if (app.map) {
					if (app.findPopup) {
						if (app.watchProcess == null) {
							app.watchProcess = navigator.geolocation.watchPosition(app.found_location, app.handle_errors, {enableHighAccuracy:true, maximumAge:30000, timeout:27000});
						}
					} else {
						var myLatLng = new google.maps.LatLng(app.latitude, app.longitude);
						google.maps.event.trigger(app.map,'resize');
						app.marker.setPosition(myLatLng);
						app.map.setCenter(myLatLng);
					}
				} else {
					app.createServiceMap();
				}

			} else {
				$('#map_preview_container').hide();
				if (app.map) {
					app.watchProcess = app.stop_watchlocation(app.watchProcess);
				}
			}
		});

		$('#service-uid').change(function() {
			if ($(this).val() == '29200') {
				$('#map-container').hide();
				$('#service-address-container').show();
				//$('#service-use-location').prop('checked',false).checkboxradio('refresh');
			} else {
				$('#map-container').show();
				$('#service-address-container').hide();
				//$('#service-use-location').prop('checked',true).checkboxradio('refresh');
			}
		});

		//$("#service-submit").on('touchend', function(e) {
		$("#service-form").on('submit', function(e) {
			e.preventDefault();
			var uid = $('#service-uid').val();
			var serviceaddress = $('#service-address').val();
			if (!uid) {
				alert('Please select a problem type.');
			} else if (uid == '29200' && !serviceaddress) {
				alert('Please enter a street address.');
			} else {
				$('#popupText').html('Sending report to Sandy City...&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;');
				$("#popupDialog").popup("open");
				var comments = $('#service-comments').val();
				var name = $('#service-name').val();
				var phone = $('#service-phone').val();
				var email = $('#service-email').val();
				var imageURI = $('#photoupload').val();
				if (imageURI.length > 0) {
					var options = new FileUploadOptions();
					options.fileKey="file";
					options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1+'.jpg');
					options.mimeType="image/jpeg";

					var params = new Object();
					params.uid = uid;
					params.comments = comments;
					params.name = name;
					params.phone = phone;
					params.email = email;
					params.address = serviceaddress;
					if ($('#service-use-location').is(':checked')) {
						params.latitude = app.latitude;
						params.longitude = app.longitude;
					} else {
						params.latitude = '';
						params.longitude = '';
					}

					params.ajax = "servicerequest";

					options.params = params;

					var ft = new FileTransfer();
					ft.upload(
						imageURI,
						"https://sandy.utah.gov/mobile/phonegap/ajax/secure.html",
						function(response){
							// need to parse json response
							var res = JSON && JSON.parse(response.response) || $.parseJSON(response.response);
							if (res.data == 'ok') {
								app.resetServiceRequest();
								$('#popupText').html('Thank you. We will respond to your service request as soon as possible.');
							} else {
								$('#popupText').html(res.data);
							}
						},
						function(error){
							switch(error.code)
							{
								case error.FILE_NOT_FOUND_ERR: $('#popupText').html("Error: file not found");
								break;

								case error.INVALID_URL_ERR: $('#popupText').html("Error: invalid url");
								break;

								case error.CONNECTION_ERR: $('#popupText').html("Error: connection error");
								break;
								
								case error.ABORT_ERR: $('#popupText').html("Error: abort error");
								break;

								default: alert("unknown error: "+error.code);
								break;
							}
						},
						options,
						true // this is for ssl? But it seems this is only for self-signed cert problems.
							 // http://stackoverflow.com/questions/8522729/phonegap-filetransfer-upload-fails-on-android?s=a6ddda99-17bc-4194-88a9-58dae9ad7c5b
					);
				} else {
					// no photo to upload
					var localLatitude = '';
					var localLongitude = '';
					if ($('#service-use-location').is(':checked')) {
						localLatitude = app.latitude;
						localLongitude = app.longitude;
					}
					$.ajax({
						url: "https://sandy.utah.gov/mobile/phonegap/ajax/secure.html",
						type: "POST",
						dataType: "json",
						data: {
							"uid":uid,
							"comments":comments,
							"name":name,
							"phone":phone,
							"email":email,
							"latitude":localLatitude,
							"longitude":localLongitude,
							"address":serviceaddress,
							"ajax":"servicerequest"
						}}).done(function(res) {
							// we don't need to convert to json because jquery does it for us. See dataType above.
							if (res.data == 'ok') {
								app.resetServiceRequest();
								$('#popupText').html('Thank you. We will respond to your service request as soon as possible.');
							} else {
								$('#popupText').html(res.data);
							}
						}).fail(function(jqXHR, textStatus, errorThrown){
							$('#popupText').html('Failed to send message: '+textStatus+' : '+errorThrown);
						});
				}
			}
		});

		$("#popupClose").on('touchend', function(e) {
			e.preventDefault();
			$('#popupDialog').popup("close");
		});
	},
	
	resetServiceRequest: function() {
		$('#service-uid').val('').selectmenu('refresh', true);
		$('#map-container').show();
		$('#service-address-container').hide();
		$('#service-comments').val('');
		$('#service-name').val('');
		$('#service-phone').val('');
		$('#service-email').val('');
		$('#service-address').val('');
		$('#photouploadimg').attr('src', 'assets/img/add_photo.jpg');
		$('#photoupload').val('');
		navigator.geolocation.getCurrentPosition(
			function(position) {
				app.latitude = position.coords.latitude;
				app.longitude = position.coords.longitude;
				var myLatLng = new google.maps.LatLng(app.latitude, app.longitude);
				app.marker2.setPosition(myLatLng);
				app.map2.setCenter(myLatLng);
				app.marker.setPosition(myLatLng);
				app.map.setCenter(myLatLng);
			},
			function(error) {
				if (app.debug)
				alert('failed to get location: '+error.message);
			}
		);
	},
	
	createServiceMap: function() {
		if (app.mapLoaded) {
			var myLatLng = new google.maps.LatLng(40.59732, -111.870793);
			var mapOptions = {
				zoom: 17,
				center: myLatLng,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				mapTypeControl : false,
				zoomControl: false,
				streetViewControl: false
			};
			app.map = new google.maps.Map(document.getElementById("map_preview"), mapOptions);
			app.marker = new google.maps.Marker({
				position: myLatLng,
				map: app.map,
				optimized: false,
				title: 'Location'
			});
			google.maps.event.addListener(app.map, 'resize', function(event) {
				var newLatLng = new google.maps.LatLng(app.latitude, app.longitude);
				app.marker.setPosition(newLatLng);
				app.map.setCenter(newLatLng);
			});
			google.maps.event.trigger(app.map,'resize');
			if (app.findPopup) {
				if (app.watchProcess == null) {
					app.watchProcess = navigator.geolocation.watchPosition(app.found_location, app.handle_errors, {enableHighAccuracy:true, maximumAge:30000, timeout:27000});
				}
			}
		} else {
			alert('Map not loaded. Check network connection.');
			$.getScript("http://maps.google.com/maps/api/js?sensor=true&callback=init_mapService", function() {

			});
		}
	},
	
	found_location: function(position) {
		app.latitude = position.coords.latitude;
		app.longitude = position.coords.longitude;
		var myLatLng = new google.maps.LatLng(app.latitude, app.longitude);
		google.maps.event.trigger(app.map,'resize');
		app.marker.setPosition(myLatLng);
		app.map.setCenter(myLatLng);
	},
	
	found_location2: function(position) {
		app.latitude = position.coords.latitude;
		app.longitude = position.coords.longitude;
		google.maps.event.trigger(app.map2,'resize');
	},

	found_location3: function(position) {
		app.latitude = position.coords.latitude;
		app.longitude = position.coords.longitude;
		google.maps.event.trigger(app.map3,'resize');
	},

	stop_watchlocation: function(watch_process) {
		navigator.geolocation.clearWatch(watch_process);
		return null;
	},
			
	clearMarkers: function() {
		app.marker.setMap(null);
		app.marker2.setMap(null);
		app.marker3.setMap(null);
    },

	handle_errors: function(error) {
		if (app.debug) {
			switch(error.code)
			{
				case error.PERMISSION_DENIED: alert("user did not share geolocation data");
				break;

				case error.POSITION_UNAVAILABLE: alert("could not detect current position");
				break;

				case error.TIMEOUT: alert("retrieving position timedout");
				break;

				default: alert("unknown error: "+error.code);
				break;
			}
		}
	},
	
	createPageMap: function() {

		if (app.mapLoaded)
		{
			var myLatLng = new google.maps.LatLng(app.latitude, app.longitude);
			var mapOptions = {
				zoom: 17,
				center: myLatLng,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				mapTypeControl : true,
				zoomControl: true,
				zoomControlOptions: {
					/* style: google.maps.ZoomControlStyle.SMALL */
					position: google.maps.ControlPosition.TOP_LEFT
				},
				streetViewControl: false
			};
			app.map2 = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
			app.marker2 = new google.maps.Marker({
				position: myLatLng,
				map: app.map2,
				optimized: false,
				title: 'Location',
				draggable: true
			});
			/*
			google.maps.event.addListener(marker2, 'drag', function() {
				latitude = marker2.getPosition().lng();
				longitude = marker2.getPosition().lat();
				marker.setPosition(marker2.getPosition());
			});
			*/
			google.maps.event.addListener(app.marker2, 'dragend', function() {
				app.watchProcess2 = app.stop_watchlocation(app.watchProcess2);
				app.findPopup = false;
				app.latitude = app.marker2.getPosition().lat();
				app.longitude = app.marker2.getPosition().lng();
			});

			google.maps.event.addListener(app.map2, 'click', function(event) {
				app.watchProcess2 = app.stop_watchlocation(app.watchProcess2);
				app.findPopup = false;
				if (app.debug)
				alert(event.latLng.toString());
				app.latitude = event.latLng.lat();
				app.longitude = event.latLng.lng();
				app.marker2.setPosition(event.latLng);

			});

			google.maps.event.addListener(app.map2, 'resize', function(event) {
				var newLatLng = new google.maps.LatLng(app.latitude, app.longitude);
				app.map2.setCenter(newLatLng);
				app.marker2.setPosition(newLatLng);
			});
			
			// start watching position
			app.watchProcess2 = navigator.geolocation.watchPosition(app.found_location2, app.handle_errors, {enableHighAccuracy:true, maximumAge:30000, timeout:27000});
			
		}
	},
	
	createBusinessMap: function() {
		if (app.mapLoaded) {
			var myLatLng = new google.maps.LatLng(app.latitude, app.longitude);
			var mapOptions = {
				zoom: 17,
				center: myLatLng,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				mapTypeControl : true,
				zoomControl: true,
				zoomControlOptions: {
					/* style: google.maps.ZoomControlStyle.SMALL */
					position: google.maps.ControlPosition.TOP_LEFT
				},
				streetViewControl: false
			};
			app.map3 = new google.maps.Map(document.getElementById("current-location-map-canvas"), mapOptions);
			app.marker3 = new google.maps.Marker({
				position: myLatLng,
				map: app.map3,
				optimized: false,
				title: 'Location'
			});
			google.maps.event.addListener(app.map3, 'resize', function(event) {
				var newLatLng = new google.maps.LatLng(app.latitude, app.longitude);
				app.marker3.setPosition(newLatLng);
				app.map3.setCenter(newLatLng);
			});
			google.maps.event.trigger(app.map3,'resize');

			if (app.watchProcess3 == null) {
				app.watchProcess3 = navigator.geolocation.watchPosition(app.found_location3, app.handle_errors, {enableHighAccuracy:true, maximumAge:30000, timeout:27000});
			}

			var infowindow;

			var myIcons = [];

			var myMarkers = [];

			myIcons['fastfood'] = new google.maps.MarkerImage(
				'http://sandy.utah.gov/fileadmin/downloads/admin/google_maps/icons/fastfood.png',
				new google.maps.Size(32, 37),
				null,
				new google.maps.Point(16, 34)
			);

			myIcons['restaurant'] = new google.maps.MarkerImage(
				'http://sandy.utah.gov/fileadmin/downloads/admin/google_maps/icons/restaurant.png',
				new google.maps.Size(32, 37),
				null,
				new google.maps.Point(16, 34)
			);

			$.ajax({
				url: "http://sandy.utah.gov/mobile/phonegap/ajax.html",
				type: "GET",
				dataType: "jsonp",
				data: {
					"ajax":"directory-fastfood"
				}}).done(function(data) {
					for (var i= 0; i < data.length; i++) {
						var place = data[i];
						var markerX = new google.maps.Marker({
							position: new google.maps.LatLng(place.tx_rggooglemap_lat, place.tx_rggooglemap_lng),
							map: app.map3,
							icon: myIcons['fastfood']
						});

						myMarkers[place.uid] = markerX;

						(function(i, markerX, place) {
						  google.maps.event.addListener(markerX, 'click', function() {
							if (!infowindow) {
							  infowindow = new google.maps.InfoWindow();
							}
							var googleMapsLink = place.address+', '+place.city+', '+place.region;
							infowindow.setContent(place.company+'<br />'+place.address+'<br />'+place.city+', '+place.region+' '+place.zip+'<br />'+place.phone+'<br />'+'<a href="#" onclick="window.open(encodeURI(\''+app.formatMapURL(googleMapsLink)+'\'), \'_system\', \'location=yes,enableViewportScale=yes\');">Directions</a>');
							infowindow.open(app.map3, markerX);
						  });
						})(i, markerX, place);
								  }

				}).fail(function(){
					// don't worry about it
				});

			$.ajax({
				url: "http://sandy.utah.gov/mobile/phonegap/ajax.html",
				type: "GET",
				dataType: "jsonp",
				data: {
					"ajax":"directory-restaurants"
				}}).done(function(data) {
					for (var i= 0; i < data.length; i++) {
						var place = data[i];
						var markerX = new google.maps.Marker({
							position: new google.maps.LatLng(place.tx_rggooglemap_lat, place.tx_rggooglemap_lng),
							map: app.map3,
							icon: myIcons['restaurant']
						});

						myMarkers[place.uid] = markerX;

						(function(i, markerX, place) {
						  google.maps.event.addListener(markerX, 'click', function() {
							if (!infowindow) {
							  infowindow = new google.maps.InfoWindow();
							}
							var googleMapsLink = place.address+', '+place.city+', '+place.region;
							infowindow.setContent(place.company+'<br />'+place.address+'<br />'+place.city+', '+place.region+' '+place.zip+'<br />'+place.phone+'<br />'+'<a href="#" onclick="window.open(encodeURI(\''+app.formatMapURL(googleMapsLink)+'\'), \'_system\', \'location=yes,enableViewportScale=yes\');">Directions</a>');
							infowindow.open(app.map3, markerX);
						  });
						})(i, markerX, place);
								  }

				}).fail(function(){
					// don't worry about it
				});
		} else {
			alert('Map not loaded. Check network connection.');
			$.getScript("http://maps.google.com/maps/api/js?sensor=true&callback=init_mapBusiness", function() {

			});
		}
	},
	
	// Phonegap/Cordova stuff
	// from http://docs.phonegap.com/en/1.7.0/cordova_camera_camera.md.html
	initPagePhoto: function() {
		$('.send-image').click(function () {
			// save everything in case the camera intent crashes...sheesh...
			localStorage.camera = "true";
			if (app.debug) alert('Saving camera setting: '+localStorage.camera);
			localStorage.serviceUID = $('#service-uid').val();
			if ($('#service-use-location').is(':checked')) {
				localStorage.serviceUseLocation = "true";
			} else {
				localStorage.serviceUseLocation = "false";
			}
			localStorage.serviceComments = $('#service-comments').val();
			localStorage.serviceName = $('#service-name').val();
			localStorage.servicePhone = $('#service-phone').val();
			localStorage.serviceEmail = $('#service-email').val();
			app.cameraSendImage($(this).val());
		}); 
	},
	
	cameraSendImage: function(source) {
		
		$('.ui-dialog').dialog('close');
		source = (source == 'library') ? navigator.camera.PictureSourceType.PHOTOLIBRARY : navigator.camera.PictureSourceType.CAMERA;
		navigator.camera.getPicture(app.onPhotoURISuccess, app.onPhotoURIFail,{
			quality: 65,
			targetWidth: 1000,
			targetHeight: 1000,
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: source,
			encodingType: Camera.EncodingType.JPEG,
			correctOrientation : true
		});
	},
	
	onPhotoURISuccess: function(imageURI) {
		localStorage.camera = "false";
		if (app.debug) alert(imageURI);
		$('#photouploadimg').attr('src', imageURI);
		$('#photoupload').val(imageURI);
	},
	onPhotoURIFail: function(message) {
		localStorage.camera = "false";
		alert('Error: ' + message);
	},

	timeConverter: function(UNIX_timestamp){
		var a = new Date(UNIX_timestamp*1000);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var day = days[a.getDay()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var minutes;
		if (min < 10) {
			minutes = '0' +min.toString();
		} else {
			minutes = min.toString();
		}
		//var sec = a.getSeconds();
		var ampm;
		if (hour < 12) {
			ampm = 'am';
		} else {
			ampm = 'pm';
		}
		if (hour == 0 || hour == 12) {
			hour = 12;
		} else {
			hour = hour % 12;
		}
		var time = day+'. '+month+' '+date+', '+year+' '+hour+':'+minutes+' '+ampm;
		return time;
	},
	
	formatMapURL: function(url) {
		if (device.platform == 'android' || device.platform == 'Android') {
			return 'geo:0,0?q='+urlencode(url);
		} else {
			return 'http://maps.google.com/maps?q='+urlencode(url);
		}
	},
	
	showLoading: function()
	{
		$.mobile.loading('show', {		
			text: 'Loading',
			textVisible: true,
			theme: 'a',
			textonly: false,
			html: ''
		});
	},
	hideLoading: function()
	{
		$.mobile.loading('hide');
	},
	
	/* This is used because Android keeps force closing the camera */
	onFileSystemSuccess: function(fileSystem) {
		var tempDirectory = new DirectoryEntry("cache", fileSystem.root.fullPath + '/Android/data/org.apache.cordova.example/cache'); // gov.utah.sandy.app
		var directoryReader = tempDirectory.createReader();
		directoryReader.readEntries(app.onReadEntriesSuccess,app.onReadEntriesFail);
	},

	onFileSystemFail: function(error) {
		//alert("Failed to list directory contents: " + error.code);
	},

	onReadEntriesSuccess: function(entries) {
		var i;
		var image;
		for (i=0; i<entries.length; i++) {
			image = entries[i].fullPath;
		}
		$('#photouploadimg').attr('src', image);
		$('#photoupload').val(image);
		if (localStorage.serviceUID) $('#service-uid').val(localStorage.serviceUID);
		if (localStorage.serviceUseLocation == "true") {
			$('#service-use-location').attr('checked', true);
		} else {
			$('#service-use-location').attr('checked', false);
		}
		if (localStorage.serviceComments) $('#service-comments').val(localStorage.serviceComments);
		if (localStorage.serviceName) $('#service-name').val(localStorage.serviceName);
		if (localStorage.servicePhone) $('#service-phone').val(localStorage.servicePhone);
		if (localStorage.serviceEmail) $('#service-email').val(localStorage.serviceEmail);

	},

	onReadEntriesFail: function(error) {
		alert("Failed to list directory contents part 2: " + error.code);
	},
	
};

// show google map on service page
function init_map() {
	app.mapLoaded = true;
}
function init_mapService() {
	app.mapLoaded = true;
	app.createServiceMap();
}
function init_mapBusiness() {
	app.mapLoaded = true;
	app.createBusinessMap();
}

// discuss at: http://phpjs.org/functions/urlencode
function urlencode (str) {
	str = (str + '').toString();
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
    replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}
// http://studiokoi.com/blog/article/typechecking_arrays_in_javascript
function isArray(a)
{
	return Object.prototype.toString.apply(a) === '[object Array]';
}

$(document).bind("mobileinit", function() {
       $.mobile.defaultPageTransition = 'none';
	   $.mobile.pushStateEnabled = false;
       //$.mobile.page.prototype.options.addBackBtn = true;
       $.mobile.useFastClick  = false;
});
