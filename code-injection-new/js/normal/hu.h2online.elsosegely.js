





























			app.initialize();
        














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


// running mode DEV/PROD
var runningMode = "PROD";
var defib_photo = "";
var pictureSource;   // picture source
var destinationType;
var pushNotification;
var alert;
//NO MODIFICATION ALLOWED START (JUST MOFIFY runningMode!!!)
var logIt = 0;
var testflightlog = 0;
//NO MODIFICATION ALLOWED END
var media;
var testflight;
window.onerror = function(message, url, lineNumber) {
	if(runningMode == "DEV") {
		//alert("JS Error: " + message + " in " + url + " at line " + lineNumber);
	}
	logDisplay("JS Error: " + message + " in " + url + " at line " + lineNumber);
}

$("form").submit(function() {
	return false;
});
function logDisplay(str) {
	if (logIt == 1) {
		console.log(str);
	}

	if (device.platform == "iOS" && testflightlog == 1) {
		testflight.remoteLog(function() {
		}, function() {
		}, str);
	}

}

var viewstack;
var windowcontroller;
var gaPlugin;
var webViewPlugin;
var navBar = null;
var analytics = null;
var iabClose = null;
var ref = null;
var oldPlatform = false;
var pickerView;
var banner;
var dataBackupPlugin;
var screenDelay = 0;
var currentTab = null;
var heightOfScreen;
var tabBarPlugin;
var teszt_nev;
var telszam;
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
		document.addEventListener('resume', this.onResume, false);

	},
	//resume Event Handler
	//
	//The event fires when an application is retrieved from the background.
	onResume: function() {

		
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicity call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		if (runningMode == "PROD") {
			testflightlog = 0;
			logIt = 0;
		}
		var self = this;
		if (device.platform == "Android" || device.platform == "android" || (device.platform == "iOS" && parseFloat(device.version) < 8)) {
			Class.refactor(Moobile.ScrollView, {
				options: {
					scroller: 'IScroll'
				}
			});
		}
		
		
		

		if (db == null) {
			logDisplay("OPEN DB!!!!!!!!!!!!!!!!!!!!");
			if (device.platform == "iOS") {
				db = window.sqlitePlugin.openDatabase({name: "firstaid_db", bgType: 1});
			}
			else {
				db = window.openDatabase("firstaid_db", "1.0", "FirstAid DB", 1000000);
			}
		}
		//reScheduleInjectionNotifications();
		
		initLang(function() { 
			logDisplay("Initlang ok, start loading...");
                       //alert("intilang "+device.platform);
			registerPushNotification();
			banner = window.plugins.BannerPlugin;
			if (device.platform == "iOS") {
				heightOfScreen = window.innerHeight;
				banner.createWebView(0, heightOfScreen - 99, window.innerWidth, 50);
			}
			else {
				banner.createWebView(0, 0, screen.width, 50);
			}
			//windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.About(), new Moobile.ViewTransition.None);
			if (device.platform == "Android") {
				if (device.version.search('2.') == 0) {
					oldPlatform = true;
				}
				document.addEventListener("backbutton", function(e) {
                                    
					viewstack.popViewController();
				}, true);
				
			}
			initDBAndSetViewstack();

                        
		});
		/* Analytics */
		analytics = navigator.analytics;
		if(runningMode == "DEV") { //TESZT
			analytics.setTrackingId('UA-1802008-37');
		} else {
			analytics.setTrackingId('UA-1802008-33');
		}

	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		console.log('Received Event: ' + id);
	}
};
function initDBAndSetViewstack() { 
	ActivityIndicator.show("Betöltés...");
	if (device.platform == "iOS") {
		if (storage.getItem("inditasok") == null) {
			storage.setItem("inditasok", 1);
		} else {
			storage.setItem("inditasok", parseInt(storage.getItem("inditasok"))+1);
		}
		if (device.platform == "iOS") {
			if (parseInt(storage.getItem("inditasok"))%15==0) {
			navigator.notification.confirm(
				    '', // message
				    function onConfirm(buttonIndex) {
				        if (buttonIndex == 3) {
				        	window.open('https://itunes.apple.com/hu/app/webbeteg/id768734559?mt=8', '_blank');
				        }
				    },            // callback to invoke with index of button pressed
				    'Töltse le legújabb alkalmazásunkat is!',           // title
				    ['Köszönöm, nem','Később', 'Megnézem']     // buttonLabels
				);
			}	
		}
	}
	viewstack = new Moobile.ViewControllerStack;
	windowcontroller = new Moobile.WindowController();
	var restSettings = {
		"url": Localization.trans("FIRSTAID_RES_REST_URL") + "/api",
		"error": function(req, status, ex)
		{
			logDisplay("REST error: " + JSON.stringify(req, null, 4) + " " + " ,status: " + JSON.stringify(status, null, 4));
		},
		"success": function() {
			logDisplay("TOKEN REST OK");
		},
		"synchronous": true,
		user: Localization.trans("FIRSTAID_RES_REST_USER"),
		password: Localization.trans("FIRSTAID_RES_REST_PWD"),
		timeout: 3000
	};
	var restClient = new RestClient(restSettings);
	logDisplay("nofirst: " + storage.getItem('nofirst'));
	if (storage.getItem('nofirst') == null) {
		
                            
					logDisplay("success creating DB tables");
					storage.setItem('nofirst', true);
					/* Verziószám beállít */
					var networkState = navigator.connection.type;
					logDisplay(networkState);
					if (networkState != Connection.NONE && networkState != Connection.UNKNOWN) {
						restClient.get({path: "es_settings", success: function(data) {
							
								storage.setItem("version_number", data[0].version);
							}, error: this.syncError});
						sync = new DBSync(restClient, db);
					} else {
						logDisplay("NO NETWORK CONNECTION!");
						storage.setItem("version_number", 0);
						var restSettingsLocal = {
							"url": "data",
							"error": function(req, status, ex)
							{
								logDisplay("REST error: " + JSON.stringify(req, null, 4) + " " + " ,status: " + JSON.stringify(status, null, 4));
							},
							"success": function() {
								logDisplay("REST LOCAL SUCCESS");
							},
							"synchronous": true,
							user: Localization.trans("FIRSTAID_RES_REST_USER"),
							password: Localization.trans("FIRSTAID_RES_REST_PWD"),
							timeout: 3000
						};
						var restClientLocal = new RestClient(restSettingsLocal);
						sync = new DBSync(restClientLocal, db, true);
					}

					sync.copyTable("es_diak", "", function() {
                                              
                                                sync.copyTable("es_diak_valaszok", "", function() {
                                                    sync.copyTable("es_korhazkereso", "", function() {
                                                        sync.copyTable("es_defibrillatorkereso", "", function() {
                                                            sync.copyTable("es_test_quest", "test=4", function() {
                                                                sync.copyTable("es_test_answer", "", function() {
                                                                    sync.copyTable("es_settings", "", function() {
                                                                        sync.copyTable("es_helyzetek", "", function() {
                                                                        	db.transaction(function(tx) {
                                                                                var sqlQuery = "SELECT tesztszoveg, telszam FROM es_settings limit 1";
                                                                                logDisplay(sqlQuery);
                                                                                tx.executeSql(sqlQuery, [],
                                                                                    function(tx, results) {                    
                                                                                        var len = results.rows.length; 
                                                                                            teszt_nev = results.rows.item(0).tesztszoveg;
                                                                                            telszam = results.rows.item(0).telszam;
                                                                                    }, self.errorCB);
                                                                            }, self.errorCB);
                                                                        	createAndShowTabBar();
                                                                        	
                                                                            viewstack = new Moobile.ViewControllerStack;
                                                                            windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Situations(), new Moobile.ViewTransition.None);
                                                                            
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
						

					


				});

	}
	else {
		/* Nem első indítás, verzió elenőrzés */
		
		logDisplay("Localization.language: " + Localization.language);
		//alert(Localization.language);
		restClient.get({path: "es_settings", success: function(data) {
//				alert(storage.getItem("version_number")+"--"+data[0].value);
			logDisplay(storage.getItem("version_number")+"--"+data[0].version);
				if (parseInt(storage.getItem("version_number")) < parseInt(data[0].version) || storage.getItem("sync_lang") != Localization.language) {
					/* Server verzió nagyobb, sync */
					//alert(data[0].value);
					logDisplay("sync datas nofirst");
					var sync = new DBSync(restClient, db);
					sync.copyTable("es_diak", "", function() {
                                              createAndShowTabBar();
                                                sync.copyTable("es_diak_valaszok", "", function() {
                                                    sync.copyTable("es_korhazkereso", "", function() {
                                                        sync.copyTable("es_defibrillatorkereso", "", function() {
                                                            sync.copyTable("es_test_quest", "test=4", function() {
                                                                sync.copyTable("es_test_answer", "", function() {
                                                                    sync.copyTable("es_settings", "", function() {
                                                                        sync.copyTable("es_helyzetek", "", function() {
                                                                        	storage.setItem("version_number", data[0].version);
                                                                        	storage.setItem("sync_lang", Localization.language);
                                                                            viewstack = new Moobile.ViewControllerStack;
                                                                            windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Situations(), new Moobile.ViewTransition.None);
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
						

					});


				}
				else {
					logDisplay("init root viewcontroller");
					createAndShowTabBar();
					viewstack = new Moobile.ViewControllerStack;
					windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Situations(), new Moobile.ViewTransition.None);
						
				}
				db.transaction(function(tx) {
                    var sqlQuery = "SELECT tesztszoveg, telszam FROM es_settings limit 1";
                    logDisplay(sqlQuery);
                    tx.executeSql(sqlQuery, [],
                        function(tx, results) {                    
                            var len = results.rows.length; 
                                teszt_nev = results.rows.item(0).tesztszoveg;
                                telszam = results.rows.item(0).telszam;
                        }, self.errorCB);
                }, self.errorCB);
			}, error: function(req, status, ex) {
				logDisplay("get db version failed");
				logDisplay("init root viewcontroller");
				viewstack = new Moobile.ViewControllerStack;
                                windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Situations(), new Moobile.ViewTransition.None);					
			}});
	}
}




//COMMON FUNCTIONS



/* Tab change android */
function tabchange(tab) {
	switch (tab) {
		case "situations":
			viewstack = new Moobile.ViewControllerStack;
			windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Situations(), new Moobile.ViewTransition.None);
			break;
		case "revivification":
			viewstack = new Moobile.ViewControllerStack;
			windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Revivification(), new Moobile.ViewTransition.None);
			break;
		case "emergency":
			viewstack = new Moobile.ViewControllerStack;
			windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Emergency(), new Moobile.ViewTransition.None);
			break;
		case "more":
			viewstack = new Moobile.ViewControllerStack;
			windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.More(), new Moobile.ViewTransition.None);
			break;
		default:
			break;
	}

}

// PLUGIN METHODS
// TABBAR
var tabBar;
function createAndShowTabBar() {
	ActivityIndicator.hide();
	if (device.platform == 'android' || device.platform == 'Android') {

		logDisplay("TABBAR!!!!");
		tabBarPlugin = window.plugins.TabBarPlugin;
		var options = {
			titlesAsString: "null",
			paramsAsString: "situations;revivification;emergency;more",
			callbackName: 'tabchange',
			buttonSize: '59,6',
			buttonTextSize: '14,true',
			isFullScreen: true,
			backgroundColor: '13.103.127',
			selectionColor: '255.255.255',
			textColor: '0.0.0'
		}
		tabBarPlugin.showTabBar(null, null, options);/*
		viewstack = new Moobile.ViewControllerStack;
        windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Situations(), new Moobile.ViewTransition.None);
        */
	} else {
		$(".window .window-content-wrapper").height($(".window .window-content-wrapper").height() - 93);
		tabBar = window.plugins.tabBar;
		// Initializating TabBar

		/*
		 * tabBarTintColorRgba: tab háttér szín
		 */
		if (parseFloat(device.version) >= parseFloat("7")) {
			tabBar.create({selectedImageTintColorRgba: "4,153,221,255", tintColorRgba: "4,153,221,255", tabBarTintColorRgba: "247,247,247,255", textColorRgba: "4,153,221,255"});
		} else {
			tabBar.create({selectedImageTintColorRgba: "4,153,221,255", tintColorRgba: "242,242,242,255", textColorRgba: "4,153,221,255"});
		}
		tabBar.createItem(
				"situations",
				Localization.trans("FIRSTAID_RES_0005"),
				"m2.png",
				"m2_active.png",
				"4,153,221,255",
				{"onSelect": function() {
						if (parseInt(new Date().getTime() - screenDelay) > 300) {
							viewstack = new Moobile.ViewControllerStack;
							navBar.setTitle(Localization.trans("FIRSTAID_RES_0005"));
							windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Situations(), new Moobile.ViewTransition.None);
							//currentTab = "home";
							screenDelay = new Date().getTime();
						}
						navBar.hideLeftButton();
					}
				}

		);
		tabBar.createItem(
				"diagnostics",
				Localization.trans("FIRSTAID_RES_0007"),
				"m1.png",
				"m1_active.png",
				"145,145,145,255",
				{"onSelect": function() {
						if (parseInt(new Date().getTime() - screenDelay) > 300) {
							viewstack = new Moobile.ViewControllerStack;
							navBar.setTitle(Localization.trans("FIRSTAID_RES_0007"));
							windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Diagnostics(), new Moobile.ViewTransition.None);
							//currentTab = "diary";
							screenDelay = new Date().getTime();
						}
						navBar.hideLeftButton();
					}
				}
		);
		tabBar.createItem(
				"revivification",
				Localization.trans("FIRSTAID_RES_0009"),
				"m3.png",
				"m3_active.png",
				"145,145,145,255",
				{"onSelect": function() {
						if (parseInt(new Date().getTime() - screenDelay) > 300) {
							viewstack = new Moobile.ViewControllerStack;
							navBar.setTitle(Localization.trans("FIRSTAID_RES_0009"));
							windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Revivification(), new Moobile.ViewTransition.None);
							//currentTab = "catalog";
							screenDelay = new Date().getTime();
						}
						navBar.hideLeftButton();
					}
				}
		);
		tabBar.createItem(
				"emergency",
				Localization.trans("FIRSTAID_RES_0010"),
				"m4.png",
				"m4_active.png",
				"145,145,145,255",
				{"onSelect": function() {
						if (parseInt(new Date().getTime() - screenDelay) > 300) {
							viewstack = new Moobile.ViewControllerStack;
							navBar.setTitle(Localization.trans("FIRSTAID_RES_0010"));
							windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Emergency(), new Moobile.ViewTransition.None);
							//currentTab = "more";
							screenDelay = new Date().getTime();
						}
						navBar.hideLeftButton();
					}
				}
		);
		tabBar.createItem(
				"more",
				Localization.trans("FIRSTAID_RES_0013"),
				"m5.png",
				"m5_active.png",
				"145,145,145,255",
				{"onSelect": function() {
						if (parseInt(new Date().getTime() - screenDelay) > 300) {
							viewstack = new Moobile.ViewControllerStack;
							navBar.setTitle(Localization.trans("FIRSTAID_RES_0013"));
							windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.More(), new Moobile.ViewTransition.None);
							//currentTab = "more";
							screenDelay = new Date().getTime();
						}
						navBar.hideLeftButton();
					}
				}
		);
		// Compile the TabBar
		tabBar.show();
		tabBar.showItems("situations", "diagnostics", "revivification", "emergency", "more");
		//tabBar.selectItem("situations");

		createAndShowNavBar();
	}
}
function createAndShowNavBar() {

	navBar = window.plugins.NavigationBar;
	navBar.create();
	navBar.setTitle(Localization.trans("FIRSTAID_RES_0005"));
	navBar.setupLeftButton(Localization.trans("FIRSTAID_RES_0031"), null, function() {
		viewstack.popViewController();
	});
	
	navBar.setupRightButton(Localization.trans("FIRSTAID_RES_0076"), null, function() {
		viewstack.pushViewController(new ViewController.SendDefib(), new Moobile.ViewTransition.None);
	});
	navBar.setLeftButtonEnabled(true);
	navBar.setRightButtonEnabled(true);
	navBar.hideLeftButton();
	navBar.hideRightButton();
	navBar.show();
}


var show_map = 0;
function showMap(x, y, title_str, gps_X, gps_Y, height, offsetTop) {
    $(".view-layout-vertical:not(.hidden) ." + title_str).css("height",height);
	var myLocation = new google.maps.LatLng(gps_X, gps_Y);
	var targetLocation = new google.maps.LatLng(x, y);	
    map  = new google.maps.Map($(".view-layout-vertical:not(.hidden) ." + title_str)[0], {
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: myLocation,
		streetViewControl: false,
		mapTypeControl: false,
		zoom: 15,
		scaleControl: true,
		zoomControl: false
    }); 
    var bounds = new google.maps.LatLngBounds ();
	bounds.extend (myLocation);
	bounds.extend (targetLocation);
	map.fitBounds (bounds);
    var marker = new google.maps.Marker({
	    position: myLocation,
	    map: map,
	    title: 'Jelenlegi pozíció',
	    icon: getMarkerImage("green"),
  	});
    var marker = new google.maps.Marker({
	    position: targetLocation,
	    map: map,
	    title: 'Eredmény',
  	});  	
}
var icons = new Array();

function getMarkerImage(iconColor) {
   if ((typeof(iconColor)=="undefined") || (iconColor==null)) { 
      iconColor = "red"; 
   }
   if (!icons[iconColor]) {
      icons[iconColor] = {
        url: "http://labs.google.com/ridefinder/images/mm_20_"+ iconColor +".png",
        // This marker is 20 pixels wide by 32 pixels tall.
        size: new google.maps.Size(12, 20),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0,0),
        // The anchor for this image is the base of the flagpole at 0,32.
        anchor: new google.maps.Point(6, 20)};
   } 
   return icons[iconColor];
}

/*
 * Fotós cucc
 * */

function capturePhoto() {
	// Take picture using device camera and retrieve image as base64-encoded string
	
	navigator.camera.getPicture(onPhotoDataSuccess, onFail1, { quality: 70,
	    destinationType: Camera.DestinationType.DATA_URL
	});
	
	}

	function onFail1(message) {
		alert('Failed because: ' + message);
	}

	function onPhotoDataSuccess(imageData) {
	//logDisplay(imageData);
		
		defib_photo = imageData;
		$(".photo-button").html(Localization.trans("FIRSTAID_RES_0078"));
		
	}
	function onPhotoURISuccess(imageURI) {
		
		defib_photo = imageURI;
		$(".photo-button").html(Localization.trans("FIRSTAID_RES_0078"));
		
	    }

	    // A button will call this function
	    //
	    function getPhoto(source) {
	      // Retrieve image file location from specified source
	      navigator.camera.getPicture(onPhotoURISuccess, onFail1, { quality: 50, 
	        destinationType: Camera.DestinationType.DATA_URL,
	        sourceType: source });
	    }
function removeAccent(word) {
	var strAccents = word.split('');
	var strAccentsOut = new Array();
	var strAccentsLen = strAccents.length;
	var accents = 'öüóőúéáű';
	var accentsOut = "ouooueau";
	for (var y = 0; y < strAccentsLen; y++) {
		if (accents.indexOf(strAccents[y]) != -1) {
			strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
		} else
			strAccentsOut[y] = strAccents[y];
	}
	strAccentsOut = strAccentsOut.join('');
	return strAccentsOut.toLowerCase();
}
function closeAlert() {
	alert.hideAnimated();
}



var storage = window.localStorage;
var controllerClass;
var listController;
var infoController;
var ViewController = {
	Component: {},
	Event: {}
};
var eventTime = 0;
var switcherName = "";
var db = null;
var currentBanner;
var eventTime = 0;
var switcherName = "";
ViewController.MainViewController = new Class({
	Extends: Moobile.ViewController,
	sync: null,
	iosBackButton: false,
	navBarTitle: '',
	restClient: null,
	activityIndicator: null,
	screenName: null,
	alertBox: null,
	banerZone: null,
	loadView: function() {
		var restSettings = {
			"url": Localization.trans("FIRSTAID_RES_REST_URL") + "/api",
			"error": function(req, status, ex)
			{
				logDisplay("REST error: " + JSON.stringify(req, null, 4) + " " + " ,status: " + JSON.stringify(status, null, 4));
			},
			"success": function() {
				logDisplay("TOKEN REST OK");
			},
			"synchronous": true,
			user: Localization.trans("FIRSTAID_RES_REST_USER"),
			password: Localization.trans("FIRSTAID_RES_REST_PWD")

		};

		this.restClient = new RestClient(restSettings);

		this.sync = new DBSync(this.restClient, db);
		//this.sync.initFileSystem();
		this.activityIndicator = new Moobile.ActivityIndicator();
		this.view.addChildComponent(this.activityIndicator);
		this.activityIndicator.hide();

		if (this.screenName != null) {
			this.logScreen(this.screenName);
		}
		
		
	},
	viewDidBecomeReady: function() {
                Localization.apply_to_current_html();
		this.parent();		
	},
	viewWillEnter: function() {
		var self = this;
		var networkState = navigator.connection.type;

		if (this.screenName != null && networkState != Connection.NONE && networkState != Connection.UNKNOWN) {
			if (this.screenName.search("helyzetek") != -1) {
				this.getBannerByZone("helyzetek");
			} else {
				this.getBannerByZone(this.screenName);
			}
			
		} else {
			banner.hideWebView();
		}
		

		this.parent();
	},
	showBannerPage: function(url) {
		var self = this;
		logDisplay(url);
		if (url != "about:blank") {
			window.open(url, '_blank', 'location=yes');
			self.logEvent("banner", "click", '{"url":"' + url + '"}', 1);
		}

	},
	getBannerByZone: function(zone_name) {
		var self = this;
		logDisplay("BANNER GET"); 
		self.restClient.get({
			path: "banners?zone=" + zone_name,
			success: function(data) {
				logDisplay("get banner OK");
				logDisplay(JSON.encode(data));
				for (var k = 0; k < data.length; k++) {
					currentBanner = data[k].text;
					banner.hideWebView();
					banner.loadUrl(data[k].text, self.bound("showBannerPage"), "false", data[k].height);
					self.logEvent("banner", "view", '{"banner_id":"' + data[k].id + '"}', 1);
					banner.showWebView();
				}
			},
			error: function(error) {
				logDisplay(error);
				logDisplay("REST error code: " + error.status);
				if (error.status == 404) {
					banner.hideWebView();
				}
			}
		});
	},
	logScreen: function(screenName) {
		//alert(device.platform + "/" +screenName);
		
		if (typeof analytics != "undefined") {
			analytics.sendAppView(device.platform + "/" + screenName, function() {
				logDisplay("Analytics SCREEN DONE");
			}, function() {
				logDisplay("Analytics SCREEN ERROR");
			});
		}
	},
	logEvent: function(category, action, label, value) {/*
		if (typeof analytics != "undefined") {
			analytics.sendEvent(category, action, label, value,
					function() {
						logDisplay("Analytics EVENT DONE");
					}, function() {
				logDisplay("Analytics EVENT ERROR");
			});
		}*/
	},
	destroy: function() {
		logDisplay("view destroy");
		this.parent();
	},
	viewWillLeave: function() {
		logDisplay("viewWillLeave");
		this.parent();
	},
	backToPrevView: function() {
		viewstack.popViewController();
	},
	showMessage: function(message, title, buttonname) {
		if (typeof buttonname == "undefined") {
			buttonname = Localization.trans("FIRSTAID_RES_0002");
		}
		navigator.notification.alert(
				message, // message
				function() {
				}, // callback
				title, // title
				buttonname                  // buttonName
				);
	},
	showError: function(message) {
		navigator.notification.alert(
				message, // message
				function() {
				}, // callback
				Localization.trans("FIRSTAID_RES_0001"), // title
				Localization.trans("FIRSTAID_RES_0002")                 // buttonName
				);
	},
	errorCB: function(err) {
		logDisplay("SQL ERROR " + err.code + " : " + err.message);
	},
	getTime: function() {
		var self = this;
		return Math.round((new Date()).getTime() / 1000);
	},
	numberFormat: function(number, decimals, dec_point, thousands_sep) {

		number = (number + '')
				.replace(/[^0-9+\-Ee.]/g, '');
		var n = !isFinite(+number) ? 0 : +number,
				prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
				sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
				dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
				s = '',
				toFixedFix = function(n, prec) {
					var k = Math.pow(10, prec);
					return '' + (Math.round(n * k) / k)
							.toFixed(prec);
				};
		// Fix for IE parseFloat(0.55).toFixed(0) = 0;
		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
				.split('.');
		if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		}
		if ((s[1] || '')
				.length < prec) {
			s[1] = s[1] || '';
			s[1] += new Array(prec - s[1].length + 1)
					.join('0');
		}
		return s.join(dec);
	}
});




ViewController.SendDefib = new Class({
    Extends: ViewController.MainViewController,
    
    send_button: null,
    photo_button: null,
    loadView: function() {
        this.view = Moobile.View.at('templates/send-defib.html');
        this.screenName = "bekuldes";
        this.send_button = this.view.getChildComponent('send-button');
    	this.send_button.addEvent('tap', this.bound('sendMessage'));
        this.send_button.setLabel(Localization.trans("FIRSTAID_RES_0042"));
        this.photo_button = this.view.getChildComponent('photo-button');
    	this.photo_button.addEvent('tap', this.bound('takePhoto'));
        this.photo_button.setLabel(Localization.trans("FIRSTAID_RES_0075"));
        this.parent();
    },
    viewDidLoad: function() {
        this.parent();
    },
    viewDidBecomeReady: function() {
        this.parent();
    },
    viewWillEnter: function() {
    	if (device.platform == "iOS") {
    		navBar.hideRightButton();
    	}
        this.parent();
    },
    sendMessage: function() {
    	if ($(".name").val() == "" || $(".telepules").val() == "" || $(".iranyitoszam").val() == "" ||  $(".cim").val() == "" ||  $(".hely").val() == "" ||  $(".elerhetoseg").val() == "" ||  $(".bekuldo_nev").val() == "") {
    		alert(Localization.trans("FIRSTAID_RES_0089"));
    	} else {
    	$.ajax({
            
            url: Localization.trans("FIRSTAID_RES_REST_URL")+'/mobile/send_defib',
            type: 'POST',
            data: $("#bekuld-form").serialize(),
            cache: false,
            success: function(data) { 
                            if (data){
                         	   
                         	   $.ajax({

                         			url: Localization.trans("FIRSTAID_RES_REST_URL")+'/mobile/save_picture',
                         			type: 'POST',
                         			data: 'filename='+data+'.jpg&image_data='+defib_photo+'&id='+data,
                         			cache: false,
                         			success: function(data) {
                         				
                     	   				navigator.notification.alert(
                     	   					Localization.trans("FIRSTAID_RES_0050"),  // message
                                        function(){
                     	   						$("#bekuld-form input[type=text], #bekuld-form input[type=email], #bekuld-form input[type=number]").val("");
                     	   					viewstack.pushViewController(new ViewController.More(), new Moobile.ViewTransition.None);
                                        },         // callback
                                        Localization.trans("FIRSTAID_RES_0051"),            // title
                                        Localization.trans("FIRSTAID_RES_0002")                  // buttonName
                     	   				); 
                     	   				
                         			},
                         			beforeSend: function(xhr){
                         			xhr.setRequestHeader('Securitycode','elsosegelymobil');
                         			xhr.setRequestHeader('Passkey','wbelsosegely2012');
                         			},
                         			error:function(xhr,ajaxOptions, thrownError){
                         			
                         			}

                         			});
                                            
                         	   
                                            
                            }
                            
            },
            beforeSend: function(xhr){
                            xhr.setRequestHeader('Securitycode','elsosegelymobil');
                            xhr.setRequestHeader('Passkey','wbelsosegely2012');
            },
            error:function(xhr,ajaxOptions, thrownError){
                
                            
            }});
    	}
    },
    takePhoto: function() {
    	
    	capturePhoto();
    },
    destroy: function() {
    	
        this.parent();
    }
});







ViewController.SituationView = new Class({
    Extends: ViewController.MainViewController,
    answers_list: null,
    options: {
	celoldal: null,
	helyzet_nev: ""
    },
    loadView: function() {
        this.view = Moobile.View.at('templates/situation-view.html');
        this.screenName = "helyzetek/"+this.options.helyzet_nev;
        if (device.platform == "iOS") {
        	navBar.showLeftButton();
        }        
        this.answers_list = this.view.getChildComponent('answers-list');
        this.answers_list.addEvent('select', this.bound('onListSelect'));
        
        this.parent();
    },
    viewDidLoad: function() {
        this.parent();
    },
    viewDidBecomeReady: function() {
        
        this.parent();
    },
    viewWillEnter: function() {
    	
        this.answers_list.clearSelectedItem();
        this.getTargetPage(this.options.celoldal);
        this.parent();
    },
    getTargetPage: function(id) {
        db.transaction(function(tx) {
            var sqlQuery = "SELECT cim, szoveg, kep, hangfile FROM es_diak WHERE id = "+id+" LIMIT 1";
            logDisplay(sqlQuery);
            tx.executeSql(sqlQuery, [],
                function(tx, results) {                      
                    $(".situation-view .helyzetek-cim").html(results.rows.item(0).cim);
                    $(".situation-view .situation-content").html(results.rows.item(0).szoveg);
                    $(".situation-view .situation-image").html('<img src="'+results.rows.item(0).kep.replace('png','jpg')+'" />');
                    if (results.rows.item(0).hangfile){
                    	
                    	snd = new Media("/www/"+results.rows.item(i).hangfile,
                    	        // success callback
                    	        function () {
                    	            alert("playAudio():Audio Success");
                    	        },
                    	        // error callback
                    	        function (err) {
                    	            alert("playAudio():Audio Error: " + err);
                    	        }
                    	    );
                    	//snd.play();
                    	
                    	}else{
                    	//stopSound();
                    	}
                    //alert(results.rows.item(0).kep);
                }, self.errorCB);
        }, self.errorCB);
        this.getAnswers(id);
    },
    getAnswers: function(id) {
        var self = this;
        self.answers_list.removeAllItems();
        db.transaction(function(tx) {
            var sqlQuery = "SELECT szoveg, celoldal, linkstilus FROM es_diak_valaszok WHERE dia_id = "+id+" order by sorrend asc";
            logDisplay(sqlQuery);
            tx.executeSql(sqlQuery, [],
                function(tx, results) {                    
                    var len = results.rows.length;
                    for (var i = 0; i < len; i++) {
                        var listItem = new Moobile.ListItem([], {
                            styleName: "custom", 
                            className: "answer-list-item button-"+results.rows.item(i).linkstilus
                        }, results.rows.item(i).celoldal);
                        listItem.setLabel(results.rows.item(i).szoveg);                        
                        self.answers_list.addItem(listItem);
                    }
                }, self.errorCB);
        }, self.errorCB);
    },
    onListSelect: function(item) {
    	var self = this;
        logDisplay("selected: " + item.getName());
        switch(parseInt(item.getName())) {			
            case -1: viewstack.pushViewController(new ViewController.SearchDefib(), new Moobile.ViewTransition.None);
                break;
            case -2: viewstack.pushViewController(new ViewController.Emergency(), new Moobile.ViewTransition.None);
                break;
            case -3: viewstack.pushViewController(new ViewController.Situations(), new Moobile.ViewTransition.None);
                break;
            case -4: viewstack.pushViewController(new ViewController.Situations(), new Moobile.ViewTransition.None);
                break;
            case -5: viewstack.pushViewController(new ViewController.Revivification(), new Moobile.ViewTransition.None);
                break;
            default: viewstack.pushViewController(new ViewController.SituationView({celoldal: item.getName(), helyzet_nev: self.options.helyzet_nev}), new Moobile.ViewTransition.None);
				break;
        } 
        
    },
    destroy: function() {
    	 
        this.parent();
    }
});








ViewController.WriteUs = new Class({
    Extends: ViewController.MainViewController,
    list: null,
    send_button: null,
    loadView: function() {
        this.view = Moobile.View.at('templates/write-us.html');
        this.screenName = "contact-form";
        this.search_hospital_button = this.view.getChildComponent('send-button');
    	this.search_hospital_button.addEvent('tap', this.bound('sendMessage'));
        this.search_hospital_button.setLabel(Localization.trans("FIRSTAID_RES_0042"));
        this.parent();
    },
    viewDidLoad: function() {
        this.parent();
    },
    viewDidBecomeReady: function() {
        this.parent();
    },
    viewWillEnter: function() {
    	
        this.parent();
    },
    sendMessage: function() {
    	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test($(".user-email").val())) {
        	$.ajax({
                
                url: Localization.trans("FIRSTAID_RES_REST_URL")+'/mobile/send_mail',
                type: 'POST',
                data: 'email='+$(".user-email").val()+'&helyzet='+$(".helyzet").val()+'&javaslat='+$(".javaslat").val()+'&hasznos='+$(".hasznos").val()+'&device='+device.name+" - "+device.platform+" "+device.version,
                cache: false,
                success: function(data) { 
                                if (data="OK"){
                                                
                             	   
                             	   				navigator.notification.alert(
                             	   				Localization.trans("FIRSTAID_RES_0050"),  // message
                                                function(){
                             	   					$(".write-us-view input[type=text], .write-us-view textarea").val()
                             	   					viewstack.popViewController(); 
                                                },         // callback
                                                Localization.trans("FIRSTAID_RES_0051"),            // title
                                                Localization.trans("FIRSTAID_RES_0002")                  // buttonName
                             	   				); 
                                                
                                }
                },
                beforeSend: function(xhr){
                                xhr.setRequestHeader('Securitycode','elsosegelymobil');
                                xhr.setRequestHeader('Passkey','wbelsosegely2012');
                },
                error:function(xhr,ajaxOptions, thrownError){
                    
                                
                }
                
        		});
        } else {
        	self.showMessage(Localization.trans("FIRSTAID_RES_0049"), Localization.trans("FIRSTAID_RES_0029"));
        }
    },
    destroy: function() {
        this.parent();
    }
});







ViewController.More = new Class({
    Extends: ViewController.MainViewController,
    list: null,
    loadView: function() {
        this.view = Moobile.View.at('templates/more.html');
        this.screenName = "tovabbiak";
        this.list = this.view.getChildComponent('more-list');
        this.list.addEvent('select', this.bound('onListSelect'));
        this.parent();
    },
    viewDidLoad: function() {
        this.parent();
    },
    viewDidBecomeReady: function() {
        var listItem = null;
        listItem = new Moobile.ListItem([], {
            styleName: "custom", 
            className: "more-list-item situation-list-item"
        }, "keresok");
        listItem.setLabel(Localization.trans("FIRSTAID_RES_0014"));
        listItem.setImage("images/keresok@2x.png");
        this.list.addItem(listItem);
        if (device.platform == "Android") {
            listItem = new Moobile.ListItem([], {
                styleName: "custom", 
                className: "more-list-item situation-list-item"
            }, "diagnosztika");
            listItem.setLabel(Localization.trans("FIRSTAID_RES_0007"));
            listItem.setImage("images/diagnosztika_tovabbi.png");
            this.list.addItem(listItem);
        }
        listItem = new Moobile.ListItem([], {
            styleName: "custom", 
            className: "more-list-item situation-list-item"
        }, "teszt");
        
        //listItem.setLabel(Localization.trans("FIRSTAID_RES_0015"));
        listItem.setLabel(teszt_nev);
        listItem.setImage("images/teszt@2x.png");
        this.list.addItem(listItem);
        
        listItem = new Moobile.ListItem([], {
            styleName: "custom", 
            className: "more-list-item situation-list-item"
        }, "videok");
        listItem.setLabel(Localization.trans("FIRSTAID_RES_0016"));
        listItem.setImage("images/es_videok@2x.png");
        this.list.addItem(listItem);
        
        
        listItem = new Moobile.ListItem([], {
            styleName: "custom", 
            className: "more-list-item situation-list-item"
        }, "altalanos");
        listItem.setLabel(Localization.trans("FIRSTAID_RES_0017"));
        listItem.setImage("images/altalanos@2x.png");
        this.list.addItem(listItem);
        
        listItem = new Moobile.ListItem([], {
            styleName: "custom", 
            className: "more-list-item situation-list-item"
        }, "irjon");
        listItem.setLabel(Localization.trans("FIRSTAID_RES_0018"));
        listItem.setImage("images/sugo-ikon@2x.png");
        this.list.addItem(listItem);
        
        
        listItem = new Moobile.ListItem([], {
            styleName: "custom", 
            className: "more-list-item situation-list-item"
        }, "ertekeles");
        listItem.setLabel(Localization.trans("FIRSTAID_RES_0019"));
        listItem.setImage("images/ertekel@2x.png");
        this.list.addItem(listItem);
        
        listItem = new Moobile.ListItem([], {
            styleName: "custom", 
            className: "more-list-item situation-list-item"
        }, "megosztas");
        listItem.setLabel(Localization.trans("FIRSTAID_RES_0020"));
        listItem.setImage("images/megosztas@2x.png");
        this.list.addItem(listItem);
        
        listItem = new Moobile.ListItem([], {
            styleName: "custom", 
            className: "more-list-item situation-list-item"
        }, "sugo");
        listItem.setLabel(Localization.trans("FIRSTAID_RES_0021"));
        listItem.setImage("images/sugo@2x.png");
        this.list.addItem(listItem);
        
        
        this.parent();
    },
    viewWillEnter: function() {
    	if (device.platform == "iOS") {
        	navBar.hideLeftButton();
        }
    	this.list.clearSelectedItem();
        this.parent();
    },
    onListSelect: function(item) {
        logDisplay("selected: " + item.getName());
        var self = this;
        switch(item.getName()) {
            case "teszt":
                viewstack.pushViewController(new ViewController.Test(), new Moobile.ViewTransition.None);
                break;
            case "diagnosztika":
                viewstack.pushViewController(new ViewController.Diagnostics(), new Moobile.ViewTransition.None);
                break;
            case "keresok":
                viewstack.pushViewController(new ViewController.Search(), new Moobile.ViewTransition.None);
                break;  
            case "videok":
            	self.logScreen("link_kamaszpanasz");
            	window.open('http://www.kamaszpanasz.hu/hirek/pedagogus-segedanyag/4502/elsosegely-video', '_blank');
                break;      
            case "altalanos":
            	self.logScreen("link_webbeteg");
            	window.open('http://www.webbeteg.hu/cikkek/elsosegely/177/veszhelyzet---altalanos-tennivalok', '_blank');
                break;  
            case "irjon":
                viewstack.pushViewController(new ViewController.WriteUs(), new Moobile.ViewTransition.None);
                break;      
            case "ertekeles":
            	self.logScreen("link_market_ertekeles");
            	if (device.platform == "Android") {
            		window.open('https://play.google.com/store/apps/details?id=hu.h2online.elsosegely', '_blank');
            	} else {
            		window.open('https://itunes.apple.com/hu/app/elsosegely-mit-kell-tennem/id552900421?mt=8', '_blank');
            	}            	
                break;
            case "megosztas":
            	self.logScreen("megosztas");
            	window.plugins.socialsharing.share(Localization.trans("FIRSTAID_RES_0052"), Localization.trans("FIRSTAID_RES_0053"));
            	break;
            case "sugo":
                viewstack.pushViewController(new ViewController.Help(), new Moobile.ViewTransition.None);
                break;  	
        }
    },
    destroy: function() {
        this.parent();
    }
});







ViewController.Search = new Class({
    Extends: ViewController.MainViewController,
    search_defib_button: null,
    search_hospital_button: null,
    loadView: function() {
        this.view = Moobile.View.at('templates/search.html');
        this.screenName = "keresok";
        this.search_hospital_button = this.view.getChildComponent('search-hospital-button');
	this.search_hospital_button.addEvent('tap', this.bound('searchHospital'));
        this.search_hospital_button.setLabel(Localization.trans("FIRSTAID_RES_0034"));
        this.search_defib_button = this.view.getChildComponent('search-defib-button');
	this.search_defib_button.addEvent('tap', this.bound('searchDefib'));
        this.search_defib_button.setLabel(Localization.trans("FIRSTAID_RES_0034"));
        if (device.platform == "iOS") {
        	navBar.showLeftButton();
        }
        this.parent();
    },
    viewDidLoad: function() {
        this.parent();
    },
    viewDidBecomeReady: function() {
        
        this.parent();
    },
    viewWillEnter: function() {
        this.parent();
    },
    searchHospital: function() {
        viewstack.pushViewController(new ViewController.SearchHospital(), new Moobile.ViewTransition.None);
    },
    searchDefib: function() {
        viewstack.pushViewController(new ViewController.SearchDefib(), new Moobile.ViewTransition.None);
    },
    destroy: function() {
        this.parent();
    }
});







ViewController.SearchDefib = new Class({
    Extends: ViewController.MainViewController,
    send_defib_button: null,
    loadView: function() {
        this.view = Moobile.View.at('templates/search_defib.html');
        this.screenName = "defibrillatorkereso";
        this.parent();
        this.send_defib_button = this.view.getChildComponent('send-defib-button');
    	this.send_defib_button.addEvent('tap', this.bound('sendDefib'));
        this.send_defib_button.setLabel(Localization.trans("FIRSTAID_RES_0076"));
    },
    viewDidLoad: function() {
    	this.parent();
    },
    viewDidBecomeReady: function() {
    	$("body").off("click", ".show-image");
        $("body").on("click", ".show-image", function() {
        	if (parseInt(new Date().getTime() - screenDelay) > 300) {
        		$(".defib-map").css("display", "none");
                $(".defib-keresok-kep").css("display", "block");
                $(".show-on-map").css("display", "block");
                $(this).css("display", "none");
				screenDelay = new Date().getTime();
			}
            
        });
        $("body").off("click", ".show-on-map");
        $("body").on("click", ".show-on-map", function() {
        	if (parseInt(new Date().getTime() - screenDelay) > 300) {
        		$(".defib-map").css("display", "block");
                $(".defib-keresok-kep").css("display", "none");
                $(".show-image").css("display", "block");
                $(this).css("display", "none");
                screenDelay = new Date().getTime();
        	}
        	
        });
    	this.parent();
    },
    viewWillEnter: function() {
    	$(".show-image").hide();
        
        if (device.platform == "iOS") {
            navBar.showLeftButton();
        	navBar.showRightButton();
        }
		
        navigator.geolocation.getCurrentPosition(this.onSuccessLocationDefib, this.onErrorLocation, {
            maximumAge: 15000, 
            timeout: 15000, 
            enableHighAccuracy: true
        });
        this.parent();
    },
    onSuccessLocationDefib: function(position) {
        var controller = this;
        var gps_X = position.coords.latitude;
        var gps_Y = position.coords.longitude;
        logDisplay(gps_X + " " + gps_Y);
        
        db.transaction(function(tx) {
            var sqlQuery = "SELECT * FROM es_defibrillatorkereso";
            logDisplay(sqlQuery);
            tx.executeSql(sqlQuery, [],
                function(tx, results) {                      
                    var len = results.rows.length;
                    var Radius = 6371;
                    var tav = 0;
                    var kozelebbi_cim = "";
                    var kozelebbi_nev = "";
                    var kozelebbi_x = 0;
                    var kozelebbi_y = 0;
                    var kozelebbi_kep = "";
                    logDisplay("OK!");
				
                    for (var i = 0; i < len; i++) {
                        var lat2 = results.rows.item(i).x;
                        var lon2 = results.rows.item(i).y;
                        var tav_uj = Math.acos(Math.sin(gps_X) * Math.sin(lat2) + Math.cos(gps_X) * Math.cos(lat2) * Math.cos(lon2 - gps_Y)) * Radius;
                        if (tav_uj < tav || i == 0) {
                            tav = tav_uj;
                            kozelebbi_cim = results.rows.item(i).iranyitoszam + " " + results.rows.item(i).telepules + ", " + results.rows.item(i).cim + "<br>" + results.rows.item(i).telefon;
                            kozelebbi_nev = results.rows.item(i).hely + " " + results.rows.item(i).elerhetoseg;
                            kozelebbi_x = results.rows.item(i).x;
                            kozelebbi_y = results.rows.item(i).y;
                            kozelebbi_kep = results.rows.item(i).kep_url;
                        }
                    }
                    $(".search-defib-view #t_nev").html('<strong>'+kozelebbi_nev+"</strong>");
                    $(".search-defib-view #t_cimek").html(kozelebbi_cim);
                    if (kozelebbi_kep) {
                    	$(".show-image").show();
                    } else {
                    	$(".show-image").hide();
                    }
                    $(".defib-keresok-kep").attr("src", Localization.trans("FIRSTAID_RES_REST_URL")+"/"+kozelebbi_kep);
                    //alert(Localization.trans("FIRSTAID_RES_REST_URL")+"/"+kozelebbi_kep);

                    showMap(kozelebbi_x, kozelebbi_y, "defib-map", gps_X, gps_Y, 200, $(".window .window-content-wrapper").height()-250);
                }, self.errorCB);
        }, self.errorCB);
		
		
    },
    onErrorLocation: function() {
        var controller = this;
        if (device.platform == "android" || device.platform == "Android") {
								
            navigator.notification.alert(
                Localization.trans("FIRSTAID_RES_0032"), // message
                function() {
                    viewstack.popViewController();
                }, // callback
                Localization.trans("FIRSTAID_RES_0001"), // title
                Localization.trans("FIRSTAID_RES_0002")
                // buttonName
                );
        } else {
            navigator.notification.alert(
                Localization.trans("FIRSTAID_RES_0032"), // message
                function() {
                    viewstack.popViewController();
                }, // callback
                Localization.trans("FIRSTAID_RES_0001"), // title
                Localization.trans("FIRSTAID_RES_0002")
                // buttonName
                );		
        }				


    },
    sendDefib: function() {
    	viewstack.pushViewController(new ViewController.SendDefib(), new Moobile.ViewTransition.None);
    },
    destroy: function() {
        plugin.mapKit.hideMap();
        this.news = {};
        this.news = null;
        this.parent();
    }

});


ViewController.Situations = new Class({
    Extends: ViewController.MainViewController,
    list: null,
    dont_know_list: null,
    loadView: function() {
        this.view = Moobile.View.at('templates/situations.html');
        this.screenName = "helyzetek";
        if (device.platform == "iOS") {
        	navBar.hideLeftButton();
        }
        this.list = this.view.getChildComponent('situations-list');
        this.list.addEvent('select', this.bound('onListSelect'));
        this.dont_know_list = this.view.getChildComponent('dont-know-list');
        this.dont_know_list.addEvent('select', this.bound('onListSelectDontKnow'));
        this.parent();
    },
    viewDidLoad: function() {
        this.parent();
    },
    viewDidBecomeReady: function() {
        var listItem = new Moobile.ListItem([], {
            styleName: "custom", 
            className: "dont-know-list-item button-piros"
        }, "diagnosztika");
        listItem.setLabel(Localization.trans("FIRSTAID_RES_0006"));
        this.dont_know_list.addItem(listItem);
        this.parent();
    },
    viewWillEnter: function() {
    	if (device.platform == "iOS") {
        	navBar.hideLeftButton();
        } 
        /* set list elements */
        this.list.clearSelectedItem();
        this.loadSituations();
        this.parent();
    },
    loadSituations: function() {
        var self = this;
        self.list.removeAllItems();
        db.transaction(function(tx) {
            var sqlQuery = "SELECT id, szoveg, app_image, celoldal FROM es_helyzetek ORDER BY sorrend";
            logDisplay(sqlQuery);
            tx.executeSql(sqlQuery, [],
                function(tx, results) {                    
                    var len = results.rows.length;
                    for (var i = 0; i < len; i++) {
                        var listItem = new Moobile.ListItem([], {
                            styleName: "custom", 
                            className: "situation-list-item"
                        }, results.rows.item(i).celoldal);
                        listItem.setLabel(results.rows.item(i).szoveg.replace('- ',''));
                        listItem.setImage(results.rows.item(i).app_image);
                        self.list.addItem(listItem);
                    }
						
                }, self.errorCB);
        }, self.errorCB);
    },
    onListSelect: function(item) {
    	
        logDisplay("selected: " + item.getName());
        
        viewstack.pushViewController(new ViewController.SituationView({
            celoldal: item.getName(), helyzet_nev: removeAccent(item.getLabel().getText())
            }), new Moobile.ViewTransition.None);
    },
    onListSelectDontKnow: function() {
        viewstack.pushViewController(new ViewController.Diagnostics(), new Moobile.ViewTransition.None);
    },
    destroy: function() {
        this.parent();
    }
});







ViewController.Revivification = new Class({
	Extends: ViewController.MainViewController,
	answers_list: null,
	options: {
		celoldal: 24
	},
	loadView: function() {
		this.view = Moobile.View.at('templates/revivification-view.html');
		this.screenName = "ujraelesztes";
		this.answers_list = this.view.getChildComponent('answers-list');
		this.answers_list.addEvent('select', this.bound('onListSelect'));

		this.parent();
	},
	viewDidLoad: function() {
		this.parent();
	},
	viewDidBecomeReady: function() {

		this.parent();
	},
	viewWillEnter: function() {
		if (device.platform == "iOS") {
			if (this.options.celoldal == 24) {
				navBar.hideLeftButton();
			} else {
				navBar.showLeftButton();
			}
		}
		this.answers_list.clearSelectedItem();
		this.getTargetPage(this.options.celoldal);
		this.parent();
	},
	getTargetPage: function(id) {

		db.transaction(function(tx) {
			var sqlQuery = "SELECT cim, szoveg, kep, hangfile FROM es_diak WHERE id = " + id + " LIMIT 1";
			logDisplay(sqlQuery);
			tx.executeSql(sqlQuery, [],
					function(tx, results) {
						$(".situation-view .helyzetek-cim").html(results.rows.item(0).cim);
						$(".situation-view .situation-content").html(results.rows.item(0).szoveg);
						$(".situation-view .situation-image").html('<img src="' + results.rows.item(0).kep.replace('png', 'jpg') + '" />');

						if (results.rows.item(0).hangfile) {
							if (device.platform == "Android") {
								media = new Media("/android_asset/www/" + results.rows.item(0).hangfile, null, null);
								media.play();
							} else {
								//media = new Media(results.rows.item(0).hangfile,null, null);
								media = new Media(results.rows.item(0).hangfile, null, null);

								media.play({numberOfLoops: 2});
							}
						} else {
							logDisplay(typeof media);
							if (typeof media != "undefined") {
								media.stop();
							}
							//stopSound();
						}
					}, self.errorCB);
		}, self.errorCB);
		this.getAnswers(id);
	},
	getAnswers: function(id) {
		var self = this;
		self.answers_list.removeAllItems();
		db.transaction(function(tx) {
			var sqlQuery = "SELECT szoveg, celoldal, linkstilus FROM es_diak_valaszok WHERE dia_id = " + id + " order by sorrend asc";
			logDisplay(sqlQuery);
			tx.executeSql(sqlQuery, [],
					function(tx, results) {
						var len = results.rows.length;
						for (var i = 0; i < len; i++) {
							var listItem = new Moobile.ListItem([], {
								styleName: "custom",
								className: "answer-list-item button-" + results.rows.item(i).linkstilus
							}, results.rows.item(i).celoldal);
							listItem.setLabel(results.rows.item(i).szoveg);
							self.answers_list.addItem(listItem);
						}
					}, self.errorCB);
		}, self.errorCB);
	},
	onListSelect: function(item) {
		logDisplay("selected: " + item.getName());
		switch (parseInt(item.getName())) {
			case -1:
				viewstack.pushViewController(new ViewController.SearchDefib(), new Moobile.ViewTransition.None);
				break;
			case -2:
				viewstack.pushViewController(new ViewController.Emergency(), new Moobile.ViewTransition.None);
				break;
			case -3:
				viewstack.pushViewController(new ViewController.Situations(), new Moobile.ViewTransition.None);
				break;
			default:
				viewstack.pushViewController(new ViewController.Revivification({celoldal: item.getName()}), new Moobile.ViewTransition.None);
		}

	},
	destroy: function() {
		if (typeof media != "undefined") {
			media.stop();
		}
		this.parent();
	}
});







ViewController.Emergency = new Class({
    Extends: ViewController.MainViewController,
    call_button: null,
    loadView: function() {
        this.view = Moobile.View.at('templates/emergency.html');
        this.screenName = "mentohivas";
        this.call_button = this.view.getChildComponent('call-button');
	this.call_button.addEvent('tap', this.bound('callEmergency'));
        this.call_button.setLabel(Localization.trans("FIRSTAID_RES_0012"));
        this.parent();
    },
    viewDidLoad: function() {
        this.parent();
    },
    viewDidBecomeReady: function() {
        this.parent();
    },
    viewWillEnter: function() {
        
        this.parent();
    },
    callEmergency: function() {
        window.plugins.CallNumber.callNumber(function() { /* success */ }, function() { /* error */ }, telszam);
    },
    destroy: function() {
        this.parent();
    }
});







ViewController.Help = new Class({
    Extends: ViewController.MainViewController,
    loadView: function() {
        this.view = Moobile.View.at('templates/help.html');
        this.screenName = "sugo";
        if (device.platform == "iOS") {
        	navBar.showLeftButton();
        }
        this.parent();
    },
    viewDidLoad: function() {
        this.parent();
    },
    viewDidBecomeReady: function() {
        
        this.parent();
    },
    viewWillEnter: function() {
        this.parent();
    },
    destroy: function() {
        this.parent();
    }
});







ViewController.Test = new Class({
    Extends: ViewController.MainViewController,
    options: {
        holjar: 0,
        sorszam: 1,
        answers: [],
        current_answer: null,
        first: true
    },
    loadView: function() {
        this.view = Moobile.View.at('templates/test.html');
        this.screenName = "tesztoldal";
        
        this.nextButton = this.view.getChildComponent('next-question');
	this.nextButton.addEvent('tap', this.bound('getQuestion'));
	this.nextButton.setLabel(Localization.trans("FIRSTAID_RES_0023"));
        
        this.parent();
    },
    viewDidLoad: function() {
        this.parent();
    },
    viewDidBecomeReady: function() {
        this.parent();
    },
    viewWillEnter: function() {
        $("#tesztlogoszoveg").html($("#tesztlogoszoveg").html()+Localization.trans("FIRSTAID_RES_0027"));
        var self = this;
        $( "body .test-view" ).off( "click", ".radio-answer");
        $( "body .test-view" ).on( "click", ".radio-answer", function() {
            self.options.current_answer = $( this ).val();
            
            $("div.next-question").addClass("next-question-active");
        });
        this.getQuestion();
        this.parent();
    },
    getQuestion: function() {
        var self = this;
        if (self.options.first || self.options.current_answer != null) {        
            if (self.options.current_answer != null) {
                self.checkRight(self.options.current_answer);
            }
            $("div.next-question").removeClass("next-question-active");
            db.transaction(function(tx) {
                var sqlQuery = "SELECT id, question FROM es_test_quest ORDER BY id asc limit "+self.options.holjar+", 1";
                logDisplay(sqlQuery);
                tx.executeSql(sqlQuery, [],
                    function(tx, results) { 
                        var len = results.rows.length;
                        if (len > 0) {                            
                            $("p.question").html(self.options.sorszam+". "+results.rows.item(0).question);
                            self.loadAnswers(results.rows.item(0).id);
                            self.options.holjar++;
                            self.options.sorszam++;
                        } else {
                            self.getCorrectAnswers();
                            
                        }
                    }, self.errorCB);
            }, self.errorCB);
            self.options.current_answer = null;
            self.options.first = false;
        } else {
            self.showMessage(Localization.trans("FIRSTAID_RES_0028"), Localization.trans("FIRSTAID_RES_0029"));
        }
    },
    checkRight: function(id) {
        var self = this;
        db.transaction(function(tx) {
        var sqlQuery = "SELECT id, right, question FROM es_test_answer WHERE id = "+id;
                //alert(sqlQuery);
                tx.executeSql(sqlQuery, [],
                    function(tx, results) { 
                        var len = results.rows.length;
                        if (len > 0) {                        
                            //alert(results.rows.item(0).right);
                            if (results.rows.item(0).right != 1) {
                               // alert("rossz "+self.options.holjar);
                                self.options.answers[self.options.holjar] = id;                
                                //alert(self.options.answers);
                            }
                            
                        }
                    }, self.errorCB);
            }, self.errorCB);
    },
    getCorrectAnswers: function() { 
        var self = this;
        
        var incorrect = 0;
        //alert(self.options.answers);
        $("p.question").html(Localization.trans("FIRSTAID_RES_0024"));
        $("div.answers").html('');
        self.options.answers.forEach(function(entry, key) {
            
            if (entry != "") {                
             //   alert(entry+"-"+key);
            incorrect++;
            db.transaction(function(tx) {
                var sqlQuery = "SELECT es_test_answer.id, answer, right, es_test_quest.question, es_test_answer.question as qid FROM es_test_answer inner join es_test_quest on es_test_answer.question = es_test_quest.id WHERE es_test_answer.id = "+entry+" LIMIT 1";
                //alert("SQL----: "+sqlQuery);
                logDisplay(sqlQuery);
                tx.executeSql(sqlQuery, [],
                    function(tx, results) { 
                        var len = results.rows.length;
                        if (len > 0) {                            
                            $("div.answers").append("<b>"+key+". "+results.rows.item(0).question+'</b><br><br>Az Ön válasza:<br>'+results.rows.item(0).answer+"<br><br><p class='correct-"+entry+"'></p>");                            
                            db.transaction(function(tx) {
                                var sqlQuery = "SELECT answer FROM es_test_answer WHERE es_test_answer.question = "+results.rows.item(0).qid+" AND right = 1 LIMIT 1";
                                //alert("SQL----: "+sqlQuery);
                                logDisplay(sqlQuery);
                                tx.executeSql(sqlQuery, [],
                                    function(tx, results) { 
                                        var len = results.rows.length;
                                        if (len > 0) {                            
                                            $(".correct-"+entry).html('Helyes válasz:<br>'+results.rows.item(0).answer+"<br>");                            
                                        }
                                    }, self.errorCB);
                            }, self.errorCB);
                        }
                    }, self.errorCB);
            }, self.errorCB);
            }
        });
        $("p.question").append('<p class="user-percent">'+Localization.trans("FIRSTAID_RES_0025")+" "+(((incorrect/(self.options.sorszam-1))-1)*-1)*100+Localization.trans("FIRSTAID_RES_0026")+'</p>');
        //alert(incorrect+"/"+(self.options.sorszam-1)+" - "+(((incorrect/(self.options.sorszam-1))-1)*-1)*100+"%");
    },
    loadAnswers: function(id) {
        $("div.answers").html("");
        db.transaction(function(tx) {
            var sqlQuery = "SELECT id, answer, right FROM es_test_answer WHERE question = "+id+" ORDER BY id asc";
            logDisplay(sqlQuery);
            tx.executeSql(sqlQuery, [],
                function(tx, results) {                    
                    var len = results.rows.length;
                    for (var i = 0; i < len; i++) {
                        logDisplay("válasz: "+i);
                        $("div.answers").append('<div class="answer-container"><input class="radio-answer" id="option_'+results.rows.item(i).id+'" type="radio" name="field" value="'+results.rows.item(i).id+'"><label for="option_'+results.rows.item(i).id+'">'+results.rows.item(i).answer+'</label></div>');
                    }
                    
                }, self.errorCB);
        }, self.errorCB);
    },
    destroy: function() {
        this.parent();
    }
});







ViewController.SearchHospital = new Class({
    Extends: ViewController.MainViewController,
    loadView: function() {
        this.view = Moobile.View.at('templates/search_hospital.html');
        this.screenName = "korhazkereso";
        this.parent();
    },
    viewDidLoad: function() {
    	this.parent();
    },
    viewDidBecomeReady: function() {
    	
    	this.parent();
    },
    viewWillEnter: function() {
        
        
        if (device.platform == "iOS") {
            navBar.showLeftButton();
        }
		
        navigator.geolocation.getCurrentPosition(this.onSuccessLocationDefib, this.onErrorLocation, {
            maximumAge: 15000, 
            timeout: 15000, 
            enableHighAccuracy: true
        });
        this.parent();
    },
    onSuccessLocationDefib: function(position) {
        var controller = this;
        var gps_X = position.coords.latitude;
        var gps_Y = position.coords.longitude;
        logDisplay(gps_X + " " + gps_Y);
        
        db.transaction(function(tx) {
            var sqlQuery = "SELECT * FROM es_korhazkereso";
            logDisplay(sqlQuery);
            tx.executeSql(sqlQuery, [],
                function(tx, results) {                      
                    var len = results.rows.length;
                    var Radius = 6371;
                    var tav = 0;
                    var kozelebbi_cim = "";
                    var kozelebbi_nev = "";
                    var kozelebbi_x = 0;
                    var kozelebbi_y = 0;
                    logDisplay("OK!");
				
                    for (var i = 0; i < len; i++) {
                        var lat2 = results.rows.item(i).x;
                        var lon2 = results.rows.item(i).y;
                        var tav_uj = Math.acos(Math.sin(gps_X) * Math.sin(lat2) + Math.cos(gps_X) * Math.cos(lat2) * Math.cos(lon2 - gps_Y)) * Radius;
                        if (tav_uj < tav || i == 0) {
                            tav = tav_uj;
                            kozelebbi_cim = results.rows.item(i).megye + " " + results.rows.item(i).telepules + ", " + results.rows.item(i).cim + "<br>" + results.rows.item(i).telefon;
                            kozelebbi_nev = results.rows.item(i).nev;
                            kozelebbi_x = results.rows.item(i).x;
                            kozelebbi_y = results.rows.item(i).y;
                        }
                    }
                    $(".search-hospital-view #t_nev").html('<strong>'+kozelebbi_nev+"</strong>");
                    $(".search-hospital-view #t_cimek").html(kozelebbi_cim);
                    
                    showMap(kozelebbi_x, kozelebbi_y, "hospital-map", gps_X, gps_Y, 200, $(".window .window-content-wrapper").height()-250);
                }, self.errorCB);
        }, self.errorCB);
		
		
    },
    onErrorLocation: function() {
        var controller = this;
        if (device.platform == "android" || device.platform == "Android") {
								
            navigator.notification.alert(
                Localization.trans("FIRSTAID_RES_0032"), // message
                function() {
                    viewstack.popViewController();
                }, // callback
                Localization.trans("FIRSTAID_RES_0001"), // title
                Localization.trans("FIRSTAID_RES_0002")
                // buttonName
                );
        } else {
            navigator.notification.alert(
                Localization.trans("FIRSTAID_RES_0032"), // message
                function() {
                    viewstack.popViewController();
                }, // callback
                Localization.trans("FIRSTAID_RES_0001"), // title
                Localization.trans("FIRSTAID_RES_0002")
                // buttonName
                );		
        }				


    },
    destroy: function() {
        plugin.mapKit.hideMap();
        this.news = {};
        this.news = null;
        this.parent();
    }

});


ViewController.Diagnostics = new Class({
    Extends: ViewController.MainViewController,
    options: {
        celoldal: 176,
        backbutton: null
    },
    answers_list: null,
    loadView: function() {
        this.view = Moobile.View.at('templates/diagnostics.html');
        this.screenName = "diagnosztika";
        this.answers_list = this.view.getChildComponent('answers-list');
        this.answers_list.addEvent('select', this.bound('onListSelect'));
        if (device.platform == "iOS" && this.options.backbutton == true) {
        	navBar.showLeftButton();
        }
        this.parent();
    },
    viewDidLoad: function() {
        this.parent();
    },
    viewDidBecomeReady: function() {
        this.parent();
    },
    viewWillEnter: function() {
    	if (device.platform == "iOS" && this.options.celoldal == 18) {
        	navBar.hideLeftButton();
        }
        this.getSlide(this.options.celoldal);
        this.parent();
    },
    getSlide: function(id) {
        db.transaction(function(tx) {
            var sqlQuery = "SELECT cim, szoveg, kep FROM es_diak WHERE id = "+id+" LIMIT 1";
            logDisplay(sqlQuery);
            tx.executeSql(sqlQuery, [],
                function(tx, results) {                      
                    $(".situation-view .helyzetek-cim").html(results.rows.item(0).cim);
                    $(".situation-view .situation-content").html(results.rows.item(0).szoveg);
                    $(".situation-view .situation-image").html('<img src="'+results.rows.item(0).kep.replace('png','jpg')+'" />');
                }, self.errorCB);
        }, self.errorCB);
        this.getAnswers(id);
    },
    getAnswers: function(id) {
        var self = this;
        self.answers_list.removeAllItems();
        db.transaction(function(tx) {
            var sqlQuery = "SELECT szoveg, celoldal, linkstilus FROM es_diak_valaszok WHERE dia_id = "+id+" order by sorrend asc";
            logDisplay(sqlQuery);
            tx.executeSql(sqlQuery, [],
                function(tx, results) {                    
                    var len = results.rows.length;
                    for (var i = 0; i < len; i++) {
                        var listItem = new Moobile.ListItem([], {
                            styleName: "custom", 
                            className: "answer-list-item button-"+results.rows.item(i).linkstilus
                        }, results.rows.item(i).celoldal);
                        listItem.setLabel(results.rows.item(i).szoveg);                        
                        self.answers_list.addItem(listItem);
                    }
                }, self.errorCB);
        }, self.errorCB);
    },    
    onListSelect: function(item) {
    	switch(parseInt(item.getName())) {
        case -3: viewstack.pushViewController(new ViewController.Situations(), new Moobile.ViewTransition.None);
            break;
        default: viewstack.pushViewController(new ViewController.Diagnostics({celoldal: item.getName(), backbutton: true}), new Moobile.ViewTransition.None);
    	} 
        
    },
    destroy: function() {
        this.parent();
    }
});









function DBSync(restClient, db, local) {
	// Add object properties like this
	if (typeof local == "undefined") {
		local = false;
	}
	this.local=local;
	this.restClient = restClient;
	this.user = this.restClient.goptions.user;
	this.password = this.restClient.goptions.password;
	this.db = db;
	if (this.local == true) {
		this.syncDomain = "data";
	} else {
		this.syncDomain = Localization.trans("SMILE_RES_REST_URL");
	}
	this.filesToTransfer = null;
}


DBSync.prototype.authentication = function(username, password, successCallBack, error) {
	this.restClient.get({path: "account?user_name=" + username + "&password=" + password, success: successCallBack, error: error ? error : this.error});
};

DBSync.prototype.copyTable = function(table, parameters, successCallback, onlySchema) {
	if (typeof onlySchema == "undefined") {
		onlySchema = false;
	}
	
	logDisplay("copy table: " + table);
	//logDisplay(typeof this);
	var self = this;
	this.restClient.get({
		path: self.local==true?("schema/"+table+".json"):(table + "/schema"),
		success: function(schema) {
			//logDisplay("get schema OK");
			if (onlySchema == false) {
				self.restClient.get({
					path: self.local==true?(Localization.language+"/"+table+".json"):(table + "?" + parameters),
					success: function(data) {
						//logDisplay("get data OK");
						self.db.transaction(function(tx) {
							logDisplay(table + "?" + parameters);
							//logDisplay(schema);
							//logDisplay("drop table");
							tx.executeSql('DROP table if exists ' + schema.table + ';');
							var cols = new Array();
							jQuery.each(schema.columns, function(key, val) {
								cols.push(key + " " + val);
							});
							var createSql = "CREATE TABLE IF NOT EXISTS " + schema.table + " ( " + cols.join(", ") + " )";
							//logDisplay(createSql);
							tx.executeSql(createSql);
							jQuery.each(schema.indexes, function(key, val) {
								tx.executeSql("CREATE INDEX " + key + " ON " + schema.table + " (" + val + ");");
							});
							//logDisplay(data);						
							logDisplay("db inserts (rows: " + data.length + " " + schema.table + ")");
							var insert_str = "INSERT INTO " + schema.table + " ";
							for (var k = 0; k < data.length; k++) {
								var columns = new Array();
								var values = new Array();
								jQuery.each(data[k], function(i, val) {
									columns.push(i);
									values.push(mysqlEscape(val));
								});
								insert_query = insert_str + "( " + columns.join() + " ) VALUES ( '" + values.join("','") + "' );";
								//logDisplay(insert_query);
								tx.executeSql(insert_query);
							}
						}, self.dberror, successCallback ? successCallback : function() {
							logDisplay("success DB transaction");
						});
					},
					error: self.error
				});
			} else {
				self.db.transaction(function(tx) {
					logDisplay(table + "?" + parameters);
					//logDisplay(schema);
					//logDisplay("drop table");
					// TODO: DROP ONLY TABLE IF EMPTY
					tx.executeSql('DROP table if exists ' + schema.table + ';');
					var cols = new Array();
					jQuery.each(schema.columns, function(key, val) {
						cols.push(key + " " + val);
					});
					var createSql = "CREATE TABLE IF NOT EXISTS " + schema.table + " ( " + cols.join(", ") + " )";
					logDisplay(createSql);
					tx.executeSql(createSql);
					jQuery.each(schema.indexes, function(key, val) {
						logDisplay("CREATE INDEX " + key + " ON " + schema.table + " (" + val + ");");
						tx.executeSql("CREATE INDEX " + key + " ON " + schema.table + " (" + val + ");");
					});

				}, self.dberror, successCallback ? successCallback : function() {
					logDisplay("success DB transaction");
				});
			}
		},
		error: self.error});
};


DBSync.prototype.insertOrReplaceDatas = function(table, parameters, successCallback) {
	logDisplay("update table: " + table);
	//logDisplay(typeof this);
	var self = this;
	this.restClient.get({path: table + "?" + parameters, success: function(data) {
			self.db.transaction(function(tx) {
				logDisplay("db insert or replace (rows: " + data.length + " " + table + ")");
				var insert_str = "INSERT OR REPLACE INTO " + table + " ";
				for (var k = 0; k < data.length; k++) {
					var columns = new Array();
					var values = new Array();
					jQuery.each(data[k], function(i, val) {
						columns.push(i);
						values.push(mysqlEscape(val));
					});
					insert_query = insert_str + "( " + columns.join() + " ) VALUES ( '" + values.join("','") + "' );";
					//logDisplay(insert_query);
					tx.executeSql(insert_query);
				}
			}, self.dberror, successCallback ? successCallback : function() {
				logDisplay("success DB transaction");
			});
		}, error: self.error});

};

DBSync.prototype.initFileSystem = function() {
	var self = this;
	var filename = "dummy1.txt";
	window.requestFileSystem(
			LocalFileSystem.PERSISTENT, 0,
			function onFileSystemSuccess(fileSystem) {
				logDisplay("filesystem " + fileSystem.root.toURL());
				//window.localStorage.setItem("filepath", fileSystem.root.toURL());
				fileSystem.root.getFile(
						filename, {create: true, exclusive: false},
				function gotFileEntry(fileEntry) {

					var sPath = fileEntry.toNativeURL().replace(filename, "");
					logDisplay("gotfileentry: " + sPath);
					window.localStorage.setItem("filepath", sPath);
				}, self.fileFail);
			},
			self.fileFail);

};

DBSync.prototype.uploadFiles = function(filenames, params, uploadService, successFunction, errorFunction) {
	logDisplay("uploadFile");
	this.filesToTransfer = filenames;
	this.uploadOneFile(uploadService, params, successFunction, errorFunction);
};
DBSync.prototype.uploadOneFile = function(uploadService, params, successFunction, errorFunction) {
	logDisplay("uploadOneFile");
	var ft = new FileTransfer();
	var self = this;
	if (this.filesToTransfer.length == 0) {
		logDisplay("File transfer (upload) finished!");
		successFunction();
		return;
	}
	var filenameToUpload = this.filesToTransfer.pop();
	var fileURL = window.localStorage.getItem("filepath") + encodeURI(filenameToUpload);
	logDisplay(fileURL);
	var options = new FileUploadOptions();
	options.fileKey = "file";
	options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
	options.params = params;
	logDisplay(options.fileName);
	var headers = {"Authorization": "Basic " + window.btoa(self.user + ":" + self.password)};
	options.headers = headers;

	logDisplay("--------------- UPLOAD FILE " + filenameToUpload + " ------------------");
	ft.upload(fileURL, encodeURI(self.syncDomain) + "/" + uploadService,
			function(r) {
				logDisplay("Code = " + r.responseCode);
				logDisplay("Response = " + r.response);
				logDisplay("Sent = " + r.bytesSent);
				self.uploadOneFile(uploadService, params, successFunction, errorFunction);
			},
			function(error) {
				//logDisplay("download error source " + error.source);
				//logDisplay("download error target " + error.target);
				logDisplay("upload error code: " + error.code);
				//errorFunction(error);

			}, options);

};

DBSync.prototype.downloadFile = function(filenames, successFunction, errorFunction) {
	this.filesToTransfer = filenames;
	this.downloadOneFile(successFunction, errorFunction);
};

DBSync.prototype.downloadOneFile = function(successFunction, errorFunction) {


	var filename = "dummy1.txt";
	var self = this;
	if (this.filesToTransfer.length == 0) {
		logDisplay("File transfer finished!");
		successFunction();
		return;
	}
	var filenameToDownload = this.filesToTransfer.pop();
	var remoteFile = "";
	if (self.syncDomain[self.syncDomain.length - 1] == "/" && filenameToDownload[0] == "/") {
		remoteFile = self.syncDomain + encodeURI(filenameToDownload.substr(1));
	} else {
		remoteFile = self.syncDomain + encodeURI(filenameToDownload);
	}
	if (self.syncDomain[self.syncDomain.length - 1] != "/" && filenameToDownload[0] != "/") {
		remoteFile = self.syncDomain + "/" + encodeURI(filenameToDownload);
	}
	window.requestFileSystem(
			LocalFileSystem.PERSISTENT, 0,
			function onFileSystemSuccess(fileSystem) {
				//logDisplay("--------------------------------------------------");
				fileSystem.root.getFile(
						filename, {create: true, exclusive: false},
				function gotFileEntry(fileEntry) {

					var sPath = fileEntry.fullPath.replace(filename, "");
					if ((device.platform == "Android" || device.platform == "android")) {
						sPath = sPath + "agroassist/";
						window.localStorage.setItem("filepath", fileSystem.root.toURL());
					}
					if (device.platform == "iOS") {
						window.localStorage.setItem("filepath", fileSystem.root.toURL());
					}

					var fileTransfer = new FileTransfer();

					logDisplay(sPath + filenameToDownload);
					fileEntry.remove();
					fileTransfer.download(
							remoteFile,
							window.localStorage.getItem("filepath") + encodeURI(filenameToDownload),
							function(theFile) {
								if (device.platform == "iOS") {
									theFile.setMetadata(self.fileSuccess, self.fileFail, {"com.apple.MobileBackup": 1});
								}
								self.downloadOneFile(successFunction, errorFunction);
							},
							function(error) {
								//logDisplay("download error source " + error.source);
								//logDisplay("download error target " + error.target);
								logDisplay("download error code: " + error.code);
								errorFunction(error);

							}
					);



				}, self.fileFail);
			},
			self.fileFail);
};


DBSync.prototype.fileSuccess = function() {
	logDisplay("file function ok");
};

DBSync.prototype.fileFail = function(evt) {
	logDisplay("error: " + evt.code);
};

DBSync.prototype.error = function(req, status, ex) {
	logDisplay(JSON.stringify(req) + " " + status + " " + ex);
};

DBSync.prototype.dberror = function(err) {
	logDisplay("Error processing SQL: " + err);
};


function checkConnection() {
	var networkState = navigator.connection.type;

	var states = {};
	states[Connection.UNKNOWN] = 'Unknown';
	states[Connection.ETHERNET] = 'Ethernet';
	states[Connection.WIFI] = 'WiFi';
	states[Connection.CELL_2G] = 'Cell';
	states[Connection.CELL_3G] = 'Cell';
	states[Connection.CELL_4G] = 'Cell';
	states[Connection.CELL] = 'Cell';
	states[Connection.NONE] = 'NO';

	return states[networkState];
}

function sqlEscape(stringToEscape) {
	return stringToEscape
			.replace("\\", "\\\\")
			.replace("\'", "\\\'")
			.replace("\"", "\\\"")
			.replace("\n", "\\\n")
			.replace("\r", "\\\r")
			.replace("\x00", "\\\x00")
			.replace("\x1a", "\\\x1a");
}

var Localization;

Localization = (function() {

	function Localization() {
	}

	Localization.initSuccessHandler = null;

	Localization.initialize = function(dictionnary, fallback_language, successhandler) {
		Localization.dictionnary = dictionnary;
		//logDisplay(JSON.encode(Localization.dictionnary));
		Localization.fallback_language = fallback_language;
		Localization.initSuccessHandler = successhandler;
		return navigator.globalization.getPreferredLanguage(Localization.get_preferred_language_callback, Localization.get_preferred_language_error_callback);
	};

	Localization.get_preferred_language_callback = function(language) {
		Localization.language = language.value.substr(0,2);
		Localization.locale = language.value.substr(3,2);
		console.log("Phone language is " + Localization.language);
		console.log("Phone locale is " + Localization.locale);
		if (Localization.language in Localization.dictionnary) {
			console.log("It is supported.");
		} else {
			Localization.language = Localization.fallback_language;
			console.log("It is unsupported, so we chose " + Localization.language + " instead.");
		}
		Localization.initSuccessHandler();
		return Localization.apply_to_current_html();
	};

	Localization.get_preferred_language_error_callback = function() {
		Localization.language = Localization.fallback_language;
		console.log("There was a error determining the language, so we chose " + Localization.language + ".");
		Localization.initSuccessHandler();
		return Localization.apply_to_current_html();
	};

	Localization.apply_to_current_html = function() {
		var key, value, _ref, _results;
		console.log("Localizing HTML file.");
		_ref = Localization.dictionnary[Localization.language];
		_results = [];
		for (key in _ref) {
			value = _ref[key];
			_results.push($(".l10n-" + key).html(value));
		}
		return _results;
	};

	Localization.trans = function(key, parameters) {
		if (typeof parameters=="undefined") {
			parameters=new Array();
		}
		//logDisplay(Localization.language+":"+key);
		if (typeof Localization.language == 'undefined') {
			logDisplay("Localization.language is undefined, init from default lang:" + defaultLang);
			Localization.language = defaultLang;
		}
		var translated_text=Localization.dictionnary[Localization.language][key];
		for (var i = 0; i < parameters.length; i++) {
			translated_text=translated_text.replace("{"+i+"}",parameters[i]);
		}
		return translated_text;
	};

	return Localization;

})();



var defaultLang = "hu";
function initLang(success) {
    logDisplay("initLang");
    Localization.initialize
    (
    // Dictionnary
    {
        "hu": {
            FIRSTAID_RES_REST_USER: "elsosegely",
            FIRSTAID_RES_REST_PWD: "FirstAid",
            FIRSTAID_RES_REST_URL: "http://elsosegely.webbeteg.hu",
            FIRSTAID_RES_GAKEY_PROD:"UA-48636962-9",
            FIRSTAID_RES_GAKEY_DEV:"UA-48636962-6",
            FIRSTAID_RES_0001: "Hiba!", //15
            FIRSTAID_RES_0002: "OK", //10
            FIRSTAID_RES_0003: "Vissza",
            FIRSTAID_RES_0004: "Ha tudja, mi történt, válasszon az alábbi menüből!",
            FIRSTAID_RES_0005: "Helyzetek",
            FIRSTAID_RES_0006: "Nem tudom, mi okozza",
            FIRSTAID_RES_0007: "Diagnosztika",
            FIRSTAID_RES_0008: "Figyelem! Bármilyen hirtelen fellépő komoly panasz, rosszullét esetén forduljon orvoshoz vagy hívjon mentőt! Az alkalmazásban feltüntetett információk nem teljes körűek.",
            FIRSTAID_RES_0009: "Újraélesztés",
            FIRSTAID_RES_0010: "Segélyhívó",
            FIRSTAID_RES_0011: "Mentő hívásakor ezekre a kérdésekre válaszoljon!",
            FIRSTAID_RES_0012: "104 hívása",
            FIRSTAID_RES_0013: "Továbbiak",
            FIRSTAID_RES_0014: "Defibrillátor és kórház kereső",
            FIRSTAID_RES_0015: "Celerus teszt",
            FIRSTAID_RES_0016: "Elsősegély videók",
            FIRSTAID_RES_0017: "Általános tennivalók",
            FIRSTAID_RES_0018: "Írjon nekünk",
            FIRSTAID_RES_0019: "Alkalmazás értékelése",
            FIRSTAID_RES_0020: "Alkalmazás megosztása",
            FIRSTAID_RES_0021: "Súgó",
            FIRSTAID_RES_0022: "Teszt",
            FIRSTAID_RES_0023: "Tovább",
            FIRSTAID_RES_0024: "Köszönjük, hogy kitöltötte tesztünket!",
            FIRSTAID_RES_0025: "Ön",
            FIRSTAID_RES_0026: "%-ot ért el!",
            FIRSTAID_RES_0027: "Elsősegély, sürgősségi betegellátás és munkavédelem",
            FIRSTAID_RES_0028: "Kérjük, jelölje be az egyik válaszlehetőséget!",
            FIRSTAID_RES_0029: "Információ",
            FIRSTAID_RES_0030: "back_button.png",
            FIRSTAID_RES_0031: "Vissza",
            FIRSTAID_RES_0032: "Sikertelen helymeghatározás!",
            FIRSTAID_RES_0033: "Keresők",
            FIRSTAID_RES_0034: "Keresés indítása",
            FIRSTAID_RES_0035: "A defibrillátor-kereső közösségi alkalmazásként működik. A H2Online Kft. nem vállal felelősséget, ha adott pillanatban nem áll rendelkezésre működő készülék.",
            FIRSTAID_RES_0036: "Kórház<span class=\"kek\">kereső</span>",
            FIRSTAID_RES_0037: "Az Önhöz <span class=\"kek\">legközelebbi kórház</span> keresése",
            FIRSTAID_RES_0038: "Defibrillátor<span class=\"kek\">kereső</span>",
            FIRSTAID_RES_0039: "Az Önhöz <span class=\"kek\">legközelebbi defibrillátor</span> keresése",
            FIRSTAID_RES_0040: "Fotó az épületről",
            FIRSTAID_RES_0041: "Mutasd a térképen",
            FIRSTAID_RES_0042: "Küldés",
            FIRSTAID_RES_0043: "Igen",
            FIRSTAID_RES_0044: "Nem",
            FIRSTAID_RES_0045: "Hasznosnak találta az alkalmazást?",
            FIRSTAID_RES_0046: "Milyen helyzetben használta az Elsősegély alkalmazást?",
            FIRSTAID_RES_0047: "Mit javasolna nekünk?",
            FIRSTAID_RES_0048: "Az Ön e-mail címe:",
            FIRSTAID_RES_0049: "Hibás a megadott e-mail cím!",
            FIRSTAID_RES_0050: "Üzenetét továbbítottuk!",
            FIRSTAID_RES_0051: "Köszönjük!",
            FIRSTAID_RES_0052: "Próbáld ki te is ezt az Elsősegély alkalmazást, szerintem nagyon hasznos! http://elsosegely.webbeteg.hu",
            FIRSTAID_RES_0053: "Elsősegély alkalmazás",
            FIRSTAID_RES_0054: "Életmentés első kézből, akár az Ön kezéből!",
            FIRSTAID_RES_0055: "Az Elsősegély alkalmazás egyszerre jelent könnyen felhasználható elsősegélynyújtási tananyagot, továbbá vészhelyzet esetén is egyszerűen, gyorsan elérhető információs bázist a mentők kiérkezéséig eltelt percekben.",
            FIRSTAID_RES_0056: "Az alkalmazás hat alapvető képernyőből áll, melyek az alsó navigációs gombsor segítségével és a továbbiak gomb lenyomásával érhetőek el.",
            FIRSTAID_RES_0057: "Helyzetek: útmutató arra az esetre, ha tudja vagy sejti, mi okozza a vészhelyzetet.",
            FIRSTAID_RES_0058: "Diagnosztika: útmutató arra az esetre, ha nem tudja, mi okozta a rosszullétet.",
            FIRSTAID_RES_0059: "Újraélesztés: újraélesztés lépésről-lépésre.",
            FIRSTAID_RES_0060: "Segélyhívó: hívja gyorsan a mentőket!",
            FIRSTAID_RES_0061: "Keresők: a tartózkodási helyéhez legközelebbi defibrillátor és kórház keresése.",
            FIRSTAID_RES_0062: "Teszt: ellenőrizze elsősegélynyújtási ismereteit!",
            FIRSTAID_RES_0063: "Figyelem! Bármilyen hirtelen fellépő komoly panasz, rosszullét esetén forduljon orvoshoz vagy hívjon mentőt! Az alkalmazásban feltüntetett információk nem teljes körűek.",
            FIRSTAID_RES_0064: "H2Online Kft.",
           	FIRSTAID_RES_0065: "Ügyvezető igazgató:",
       		FIRSTAID_RES_0066: "Komjáthy Krisztina",
       		FIRSTAID_RES_0067: "WEBBeteg főszerkesztő:",
       		FIRSTAID_RES_0068: "Sztankó Péter",
       		FIRSTAID_RES_0069: "Szakmai anyag előállítása:",
       		FIRSTAID_RES_0070: "Marsi Zoltán",
       		FIRSTAID_RES_0071: "Szakmai partner:",
       		FIRSTAID_RES_0072: "Országos Mentőszolgálat",
       		FIRSTAID_RES_0073: "Elérhetőségek:",
       		FIRSTAID_RES_0074: "Cím: 1145 Budapest, Szugló utca 9-15.<br /> Honlap: <a href=\"http://elsosegely.webbeteg.hu/\">http://elsosegely.webbeteg.hu/</a> <br />E-mail: <a href=\"mailto:info@webbeteg.hu\">info@webbeteg.hu</a><br />",
       		FIRSTAID_RES_0075: "Fotó készítése",
       		FIRSTAID_RES_0076: "Beküldés",
       		FIRSTAID_RES_0078: "Fotó csatolva",
       		FIRSTAID_RES_0079: "Intézmény neve*",
       		FIRSTAID_RES_0080: "Megye*",
       		FIRSTAID_RES_0081: "Település*",
       		FIRSTAID_RES_0082: "Irányítószám*",
       		FIRSTAID_RES_0083: "Intézmény pontos címe*",
       		FIRSTAID_RES_0084: "Készülék helye (pl. porta)*",
       		FIRSTAID_RES_0085: "Elérhetőség (pl. non-stop)*",
       		FIRSTAID_RES_0086: "Az Ön neve*",
       		FIRSTAID_RES_0087: "Az Ön e-mail címe",
       		FIRSTAID_RES_0088: "Elsősegély",
       		FIRSTAID_RES_0089: "Kérem, adja meg a csillaggal jelölt adatokat!",
            
        }								
    },
    // Fallback language
    "hu",
    success
    );
}

		/*
		 * Megjelenítés:
		 * js: Localization.trans("iii_elhizas");
		 * html: class="l10n-bmi_osztalyozas"
		 */




/**
 * PUSH NOTIFICATION - START
 */

function registerPushNotification() {

	pushNotification = window.plugins.pushNotification;
	if (device.platform == 'android' || device.platform == 'Android') {
		pushNotification.register(
				logDisplay,
				errorHandler, {
					"senderID": "877563635514",
					"ecb": "onNotificationGCM"
				});
	}
	else {
		pushNotification.register(
				tokenHandler,
				errorHandler, {
					"badge": "true",
					"sound": "true",
					"alert": "true",
					"ecb": "onNotificationAPN"
				});
	}

}

function tokenHandler(result) {
// Your iOS push server needs to know the token before it can push to this device
// here is where you might want to send it the token for later use.
	logDisplay('APN_device_token: ' + result);
	var restSettings = {
		"url": Localization.trans("FIRSTAID_RES_REST_URL") + "/api",
		"error": function(req, status, ex)
		{
			logDisplay("REST error: " + req + " " + status);
		},
		"success": function() {
			logDisplay("TOKEN REST OK");
		},
		user: Localization.trans("FIRSTAID_RES_REST_USER"),
		password: Localization.trans("FIRSTAID_RES_REST_PWD"),
		"synchronous": true};
	var restClient = new RestClient(restSettings);
	restClient.post({"path": "tokens", "model": [{id: result, platform: "ios", application_name: "elsosegely_hu"}]});
}

// iOS
function onNotificationAPN(event) {
	if (event.alert)
	{
		if (!event.hiddenmsg) {
			navigator.notification.alert(null, alertDismissed, event.alert, "OK");
		}
		else {
			var messageContent = event.hiddenmsg;
			navigator.notification.confirm("", function(i) {
				if (i == 1) {
					window.open(messageContent, '_blank', 'location=yes');
				}
			}, event.alert, [Localization.trans("FIRSTAID_RES_0002"), Localization.trans("FIRSTAID_RES_0003")]);
		}
	}

	if (event.sound)
	{
		var snd = new Media(event.sound);
		snd.play();
	}

	if (event.badge)
	{
		pushNotification.setApplicationIconBadgeNumber(null, null, event.badge);
	}
}


// Android
function onNotificationGCM(e) {
	$("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
	switch (e.event)
	{
		case 'registered':
			if (e.regid.length > 0) {
				//alert(e.regid);
// Your GCM push server needs to know the regID before it can push to this device
// here is where you might want to send it the regID for later use.
				console.log("GCM_device_token = " + e.regid);
				var restSettings = {
					"url": Localization.trans("FIRSTAID_RES_REST_URL") + "/api",
					"error": function(req, status, ex)
					{
						logDisplay("REST error: " + JSON.stringify(req, null, 4) + " " + " ,status: " + JSON.stringify(status, null, 4));
					},
					"success": function() {
						logDisplay("TOKEN REST OK");
					},
					user: Localization.trans("FIRSTAID_RES_REST_USER"),
					password: Localization.trans("FIRSTAID_RES_REST_PWD"),
					"synchronous": true};
				var restClient = new RestClient(restSettings);
				restClient.post({"path": "tokens", "model": [{id: e.regid, platform: "android", application_name: "elsosegely_hu"}]});
			}
			break;
		case 'message':
			// if this flag is set, this notification happened while we were in the foreground.
			// you might want to play a sound to get the user's attention, throw up a dialog, etc.
			if (!e.payload.hiddenmsg) {
				navigator.notification.alert("", alertDismissed, e.payload.message, "OK");
			}
			else {
				messageContent = e.payload.hiddenmsg;
				navigator.notification.confirm(e.payload.message, messageCallback, Localization.trans("FIRSTAID_RES_0088"), [Localization.trans("FIRSTAID_RES_0002"), Localization.trans("FIRSTAID_RES_0003")]);
			}

			if (e.foreground)
			{
//				$("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
				// if the notification contains a soundname, play it.
				var my_media = new Media("/android_asset/www/" + e.soundname);
				my_media.play();
			}
			else
			{  // otherwise we were launched because the user touched a notification in the notification tray.
				if (e.coldstart)
				{
//					$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
				}
				else
				{
//					$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
				}
			}

//			$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
//			$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
			break;
		case 'error':
//			$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
			break;
		default:
//			$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
			break;
	}
}

function messageCallback(i) {
	if (i == 1) {
		window.open(messageContent, '_blank', 'location=yes');
	}
}

function errorHandler(error) {
//alert('GCM_error = ' + error);
	logDisplay('GCM_error: ' + error);
}
/**
 * PUSH NOTIFICATION - END
 */



/**
 * padNumber
 * put spaces before a string, final string length will be parameter length
 * 
 */

function padNumber(str, length) {
	str = str.toString();
	while (str.length < length) {
		str = '0' + str;
	}
//logDisplay(str);
	return str;
}

/**
 * partOfAnObject
 * 
 *   
 */


function partOfAnObject(obj) {

	var output = '';
	for (var property in obj) {
		output += property + ': ' + obj[property] + '; ';
	}
	alert(output);
	logDisplay(output);
}

function alertDismissed() {
// do something
}
function showMessage(message, title, buttonname)
{
	navigator.notification.alert(
			message, // message
			alertDismissed, // callback
			title, // title
			buttonname                  // buttonName
			);
}


function showError(message)
{
	navigator.notification.alert(
			message, // message
			alertDismissed, // callback
			Localization.trans("SMILE_RES_0001"), // title
			Localization.trans("SMILE_RES_0002")                 // buttonName
			);
}

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function createSQLdate(date, onlyDate) {
	if (typeof onlyDate == "undefined") {
		onlyDate = false;
	}
	if (onlyDate == true) {
		return date.getFullYear() + "-" + padNumber(parseInt(date.getMonth()) + 1, 2) + "-" + padNumber(date.getDate(), 2);
	} else {
		return date.getFullYear() + "-" + padNumber(parseInt(date.getMonth()) + 1, 2) + "-" + padNumber(date.getDate(), 2) + " " + padNumber(date.getHours(), 2) + ":" + padNumber(date.getMinutes(), 2) + ":" + padNumber(date.getSeconds(), 2);
	}

}

/**
 * create date object from sql date format
 */
function dateFromSqlFormat(date) {
	logDisplay("dateFromSqlFormat: " + date);
	if (date == null) {
		return null;
	}
	var dateTags = date.split("-");
	return new Date(dateTags[0], dateTags[1] - 1, dateTags[2]);
}

/**
 * create date object from sql datetime format
 */
function dateFromSqlDateTime(date) {
	if (date == null) {
		return null;
	}
	var dateSplit = date.split(" ");
	var dateTags = dateSplit[0].split("-");
	var timeTags = dateSplit[1].split(":");
	return new Date(dateTags[0], dateTags[1] - 1, dateTags[2], timeTags[0], timeTags[1]);
}

/**
 * escape for mysql query
 *
 */
function mysqlEscape(str) {
//logDisplay(str.replace("'","''"));
	if (str == null || str == "null" || isNumber(str)) {
		return str;
	}
	return str.replace(/'/g, "''");
}

var hideKeyboard = function() {
	document.activeElement.blur();
	$("input").blur();
	if (device.platform == "Android") {
		SoftKeyboard.hide();
	}
};

function findObjectByAttribute(items, attribute, value) {
	for (var i = 0; i < items.length; i++) {
		if (items[i][attribute] === value) {
			return i;
			return items[i];
		}
	}
	return null;
}

/**
 * style a number with spaces
 */
function numberSpaces(str) {
	str = str.toString();
	logDisplay("numberSpaces");
	var str1 = "";
	var l = 0;
	logDisplay(str.length);
	for (var k = str.length - 1; k >= 0; k--) {
		str1 = str[k] + str1;
		logDisplay(str1);
		l++;
		if (l % 3 == 0) {
			str1 = " " + str1;
		}
	}
	return str1;
}

/**
 * read form values and write them to an object
 */
function getFormValues(form_selector) {
	var values = {};
	$(form_selector + " input[type=text], " + form_selector + " input[type=hidden], " + form_selector + " input[type=password], " + form_selector + " input[type=number], " + form_selector + " input[type=email], " + form_selector + " select, " + form_selector + " textarea").each(function() {
		var name = $(this).attr('name');
		eval("values." + name + "='" + $(this).val() + "'");
	});
	$(form_selector + " input[type=checkbox]").each(function() {
		var name = $(this).attr('name');
		if (this.checked) {
			eval("values." + name + "=1;");
		} else {
			eval("values." + name + "=0;");
		}
	});
	logDisplay(values);
	return values;
}

/**
 * set form values from an object
 */
function setFormValues(values, form_selector) {
	$(form_selector + " input[type=text], " + form_selector + " input[type=password], " + form_selector + " input[type=number], " + form_selector + " input[type=email], " + form_selector + " select").each(function() {
		var name = $(this).attr('name');
		eval("$(this).val(values." + name + ");");
	});
	$(form_selector + " textarea").each(function() {
		var name = $(this).attr('name');
		eval("$(this).html(values." + name + ");");
	});
	$(form_selector + " input[type=checkbox]").each(function() {
		var name = $(this).attr('name');
		if (parseInt(values[name]) == 1) {
			$(this).attr('checked', true);
			$(this).trigger("change");
		} else {
			$(this).attr('checked', false);
		}
	});
}

/**
 * get sql insert/update column- value string from an object
 */
function getSqlString(object, type) {
	var sqlString = "";
	var columns = new Array();
	var values = new Array();
	for (var key in object) {
		if (type == "update") {
			values.push("'" + key + "'='" + mysqlEscape(object[key]) + "'");
		}
		if (type == "insert") {
			values.push("'" + mysqlEscape(object[key]) + "'");
			columns.push("'" + key + "'");
		}

	}
	if (type == "update") {
		sqlString = values.join(",");
	}
	if (type == "insert") {
		sqlString = " ( " + columns.join(",") + " ) VALUES ( " + values.join(",") + " ) ";
	}
	return sqlString;
}


/**
 * Error function for global functions with sql queries
 */
function errorSQL(err) {
	logDisplay("SQL ERROR " + err.code + " : " + err.message);
}

/**
 * restore datas from a json string (for iCloud/Dropbox)
 */

function loadDatasFromJSON(data, successhandler, errorhandler) {
	if (typeof errorhandler == "undefined") {
		errorhandler = errorSQL;
	}
	data = JSON.decode(data);
	logDisplay("restore datas");
	jQuery.each(data.storage_items, function(key, val) {
		if(val != null) {
			storage.setItem(key, val);
			logDisplay("key: " + key + " value: " + val);
		}
		else {
			logDisplay("key: " + key + " value is null, no backup");
		}
	});
	var inserts = new Array();
	jQuery.each(data.db_tables, function(table, val) {
		var insert_strings = {};
		insert_strings.table_name = table;
		insert_strings.statements = new Array();
		var insert_str = "INSERT INTO " + table + " ";
		jQuery.each(val, function(key, datas) {
			var columns = new Array();
			var values = new Array();
			jQuery.each(datas, function(column, value) {
				columns.push(column);
				values.push(mysqlEscape(value));
			});
			insert_strings.statements.push(insert_str + "( " + columns.join() + " ) VALUES ( '" + values.join("','") + "' );");
		});
		//logDisplay(insert_strings);
		inserts.push(insert_strings);
	});

	var n = 0;
	db.transaction(function(tx) {
		for (var i = 0; i < inserts.length; i++) {
			(function f(k) {
				logDisplay("DELETE FROM " + inserts[k].table_name);
				tx.executeSql("DELETE FROM " + inserts[k].table_name, [], function(tx, res) {
					for (var j = 0; j < inserts[k].statements.length; j++) {
						(function f(l) {
							n++;
							var sqlQuery = inserts[k].statements[l];
							logDisplay(sqlQuery);
							tx.executeSql(sqlQuery, [],
									function(tx, results) {
										/*logDisplay("k: "+k+" l: "+l);
										 logDisplay("?k== "+inserts.length+" ?l== "+inserts[k].statements.length);*/
										if (k == inserts.length - 1 && l == inserts[k].statements.length - 1) {
											logDisplay("DATA RESTORE FINISHED");
											successhandler();
										}
									}, errorhandler);
						}(j));
					}
				}, errorhandler);
			}(i));
		}
	}, errorhandler);

}

