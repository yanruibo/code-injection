






	// Google TAGS
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-23786988-2']);
	_gaq.push(['_trackPageview']);
   	var dfciGmapReady=false; 
        var dfciDocReady=false;
        var dfciInitDone=false;
        var dfciGmapReadyTimeout = null;
        function dfciTestGMapReady() {
		try {
			DFCIUtil.info('Test GMap charge par Timeout');
			var fakeVar = new google.maps.LatLng(0.0, 0.0);
                        dfciGmapReady=true;
			DFCIUtil.info('GMap charge par Timeout');
			dfciInit();
		} catch (e) {
			dfciGmapReadyTimeout = window.setTimeout(dfciTestGMapReady, 3000);
			DFCIUtil.info('GMap non encore charge test dans 100ms');
		}
        }
        function dfciGMapReadyCallback() {
		DFCIUtil.info('GMap charge, notifie par callback');
		window.clearTimeout(dfciGmapReadyTimeout);
		dfciGmapReady=true;
		dfciInit();
	}
   	function dfciInit(){
		DFCIUtil.info('dfciInit : DocReady ' + dfciDocReady + ' GmapReady ' + dfciGmapReady + ' InitDone ' +dfciInitDone);
 		if (dfciDocReady && dfciGmapReady && !dfciInitDone) {
			dfciInitDone=true;
        	 	myInitMap();
			LazyLoad.load(['http://www.google-analytics.com/ga.js'], function(){});
      		} 
   	};
    $(document).ready(function() {
        try {
	$('#home').css('display','');
	$('#dfciSearch').css('display','');
	$('#noJavascript').css('display','none');
	if (preInitDFCI()) {
        	dfciGmapReadyTimeout = window.setTimeout(dfciTestGMapReady, 3000);
   		LazyLoad.load(['http://maps.google.com/maps/api/js?v3.4&sensor=true&callback=dfciGMapReadyCallback',
                      'js/lambert.js',
                      'js/gmap.js'], function(){$(document).ready(function(){dfciDocReady=true;dfciInit();});});
	}
        } catch (e) {
            alert('Error ' + e.message);
        }
    });








	// Google TAGS
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-23786988-2']);
	_gaq.push(['_trackPageview']);
	var initialUrl = window.location.href;
	function dfciReloadOnError() {
		if (window.location.href == initialUrl) {
			window.location.reload();
		} else {
			window.location.href=initialUrl;
		}
	}

	var nbTentatives=0;
   	var dfciGmapReady=false; 
        var dfciDocReady=false;
        var dfciInitDone=false;
        var dfciGmapReadyTimeout = null;
        function dfciTestGMapReady() {
		try {
			DFCIUtil.info('Test GMap charge par Timeout');
			var fakeVar = new google.maps.LatLng(0.0, 0.0);
                        dfciGmapReady=true;
			DFCIUtil.info('GMap charge par Timeout');
			dfciInit();
		} catch (e) {
			nbTentatives++;
			if (nbTentatives > 10) {
				if (confirm("Connexion reseau absente\nRecharger ?")) {
					dfciReloadOnError();
				} else {
					nbTentatives=0;
				}
			} 
			dfciGmapReadyTimeout = window.setTimeout(dfciTestGMapReady, 3000);
			DFCIUtil.info('GMap non encore charge test dans 3s');
		}
        }
        function dfciGMapReadyCallback() {
		DFCIUtil.info('GMap charge, notifie par callback');
		window.clearTimeout(dfciGmapReadyTimeout);
		dfciGmapReady=true;
		dfciInit();
	}
   	function dfciInit(){
		DFCIUtil.info('dfciInit : DocReady ' + dfciDocReady + ' GmapReady ' + dfciGmapReady + ' InitDone ' +dfciInitDone);
 		if (dfciDocReady && dfciGmapReady && !dfciInitDone) {
			dfciInitDone=true;
        	 	myInitMap();
			LazyLoad.load(['http://m.dfci-carto.fr/js/dynamic.js','http://www.google-analytics.com/ga.js'], function(){});
      		} 
   	};
    $(document).ready(function() {
        try {
	$('#home').css('display','');
	$('#dfciSearch').css('display','');
	$('#noJavascript').css('display','none');
	if (preInitDFCI()) {
        	dfciGmapReadyTimeout = window.setTimeout(dfciTestGMapReady, 3000);
           	document.addEventListener("resume", function(){
           		if (!dfciInitDone) {
           			dfciReloadOnError();
           		}
           	}, false);
   		LazyLoad.load(['http://maps.google.com/maps/api/js?v3.4&sensor=true&callback=dfciGMapReadyCallback',
                      'js/lambert.js',
                      'js/gmap.js'], function(){$(document).ready(function(){dfciDocReady=true;dfciInit();});});
	}
        } catch (e) {
            alert('Error ' + e.message);
        }
    });


<!--//--><![CDATA[//><!--
    window.onload= function() {
        Geoportal.load(
            // div's ID:
            'viewerDiv',
            // API's keys:
            ['7524084458707515066'],
            {// map's center :
                // longitude:
                lon:2.731525,
                // latitude:
                lat:45.833333
            }
        );
    };
    //--><!]]>

  <!-- -->
  






   	var dfcicallbackcpt=0;
   	function dfcicallback(){
      		if (dfcicallbackcpt==1) {
        	 	myInitMap();
      		}
      		dfcicallbackcpt++;
   	};
    $(document).ready(function() {
        try {
	preInitDFCI();
   	LazyLoad.loadOnce(['http://maps.google.com/maps/api/js?v3.4&sensor=true&callback=dfcicallback',
                      'js/lambert.js',
                      'js/gmap.js'], function(){$(document).ready(dfcicallback);});
        } catch (e) {
            alert('Error ' + e.message);
        }
    });


   function DFCILazyLoad() {
   }



var DFCI_LOG_ENABLED = false;
try {
   window.console.log('Test du logger');
   DFCI_LOG_ENABLED = true;    
} catch (e) {
}
function browserDetector() {
	var deviceIphone = "iphone";
	var deviceIpod = "ipod";
	var deviceS60 = "series60";
	var deviceSymbian = "symbian";
	var engineWebKit = "webkit";
	var deviceAndroid = "android";
	var deviceBB = "blackberry";
	var devicePalm = "palm";
	var deviceWinMob = "windows ce";
	var ie = "msie";
	
	var uagent = navigator.userAgent.toLowerCase();
	if ((typeof uagent == 'undefined') || uagent == null) {
		uagent="Unknown";
	}
	this.isIEWindows = function () {
		var msie = uagent.search(ie) > -1;
		return msie && !this.isIphone() && !this.isS60() && !this.isAndroidWebKit() 
				&& !this.isBB() && !this.isPalm() && !this.isWindowsCE();
	};
	this.isIphone = function() {
		return uagent.search(deviceIphone) > -1;
	};
	this.isS60 = function()
	{
	   if (uagent.search(engineWebKit) > -1)
	   {
	     if ((uagent.search(deviceS60) > -1 || 
	          uagent.search(deviceSymbian) > -1))
	        return true;
	     else
	        return false;
	   }
	   else
	      return false;
	};
	this.isAndroidWebKit = function() {
		return uagent.search(deviceAndroid) > -1 && uagent.search(engineWebKit) > -1;
	};
	this.isBB = function() {
		return uagent.search(deviceBB) > -1;
	};
	this.isPalm = function() {
		return uagent.search(devicePalm) > -1;
	};
	this.isWindowsCE = function() {
		return uagent.search(deviceWinMob) > -1;
	};
	this.info = function(s) {
		if (DFCI_LOG_ENABLED) {
			window.console.log(s);
		}
	};
}
var DFCIUtil = new browserDetector();




var DFCI_LOG_ENABLED = false;
try {
   window.console.log('Test du logger');
   DFCI_LOG_ENABLED = true;    
} catch (e) {
}
function browserDetector() {
	var deviceIphone = "iphone";
	var deviceIpod = "ipod";
	var deviceS60 = "series60";
	var deviceSymbian = "symbian";
	var engineWebKit = "webkit";
	var deviceAndroid = "android";
	var deviceBB = "blackberry";
	var devicePalm = "palm";
	var deviceWinMob = "windows ce";
	var ie = "msie";
	
	var uagent = navigator.userAgent.toLowerCase();
	if ((typeof uagent == 'undefined') || uagent == null) {
		uagent="Unknown";
	}
	this.isIEWindows = function () {
		var msie = uagent.search(ie) > -1;
		return msie && !this.isIphone() && !this.isS60() && !this.isAndroidWebKit() 
				&& !this.isBB() && !this.isPalm() && !this.isWindowsCE();
	};
	this.isIphone = function() {
		return uagent.search(deviceIphone) > -1;
	};
	this.isS60 = function()
	{
	   if (uagent.search(engineWebKit) > -1)
	   {
	     if ((uagent.search(deviceS60) > -1 || 
	          uagent.search(deviceSymbian) > -1))
	        return true;
	     else
	        return false;
	   }
	   else
	      return false;
	};
	this.isAndroidWebKit = function() {
		return uagent.search(deviceAndroid) > -1 && uagent.search(engineWebKit) > -1;
	};
	this.isBB = function() {
		return uagent.search(deviceBB) > -1;
	};
	this.isPalm = function() {
		return uagent.search(devicePalm) > -1;
	};
	this.isWindowsCE = function() {
		return uagent.search(deviceWinMob) > -1;
	};
	this.info = function(s) {
		if (DFCI_LOG_ENABLED) {
			window.console.log(s);
		}
	};
}
var DFCIUtil = new browserDetector();
var DFCIController = function(dfciMap, myapp) {
	var app = null;
	var map = dfciMap;
    var marker = new google.maps.Marker({
    });
    var myCurrentLocation = null;

    this.setApp = function (myApp) {
    	app = myApp;
    };
    
	this.setTitle = function(title) {
		$("#dfciTitle").html(title);
	};
	this.gotoDfci = function(dfciCoord) {
		app.gotoDfci(dfciCoord);
	};
	this.setMapType = function(type) {
		app.setMapType(type);
	};
	this.initGeoLoc = function() {
	    if (navigator.geolocation) {
	        var watchId = navigator.geolocation.watchPosition(myLocation,
	                                                          errorOnMyLocation,
	                                                          {enableHighAccuracy:true, maximumAge: 10000});
	    }
	};
	this.switchCarroyage = function() {
		app.switchCarroyage();
	} ;
	this.getMapSize = function() {
		return {width: $(window).width(), height: $(window).height() - 
		      (10 + $('#dfciMainHeader').height() 
		    	      + ($('#dfciMainFooter').height()))}; 
 
	};
    function getCurrentPos() {
    	navigator.geolocation.getCurrentPosition(successCallback);
    };
    function myLocation(position) {
    	try {
    		if (myCurrentLocation == null) {
    			myCurrentLocation = position;
    			gotoMyCurrentPos();
    		} else {
    			myCurrentLocation = position;
    		}
    		marker.setMap(map);
    		marker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    	} catch (ignore) {
    	}
    };
    var errorAlreadyShown = false;
    function errorOnMyLocation(e) {
    	if (!errorAlreadyShown) {
        	alert('Geolocalisation de votre position impossible.');
        	errorAlreadyShown = true;
    	}
    };

    this.setMyCurrentPos = function () {
 	    errorAlreadyShown=false;
    	gotoMyCurrentPos();
    };
    function gotoMyCurrentPos() {
    	if(myCurrentLocation != null && map!=null) {
        	map.setCenter(new google.maps.LatLng(myCurrentLocation.coords.latitude, myCurrentLocation.coords.longitude));
        	if (map.getZoom() < 10) {
        		map.setZoom(13);
        	}
    	}
    };
	
};

function fitToScreenDFCI(map) {
	var headerHeight = $('#dfciMainHeader').height();
	var footerHeight = $('#dfciMainFooter').height();
	var windowHeight = $(window).height();
	DFCIUtil.info("fitToScreen start Window.height " + windowHeight + " H " + headerHeight + " F " + footerHeight);
	$('[data-role=content]').height(windowHeight - (10 + headerHeight + footerHeight));
        if (map != null) {
		google.maps.event.trigger(map, 'resize');				
        } 
	DFCIUtil.info("fitToScreen end");
}

function preInitDFCI() {
	// Bug Fix jquery for inline select
	$("#dfciMainFooter > div").css("width", "auto");
	$("#dfciMainFooter > div").css("display", "inline");
	/*$("#dfciMainFooter > div").css("position", "absolute");*/
	fitToScreenDFCI(null);
	DFCIUtil.info("Screen.height "+ window.screen.height);
	if (DFCIUtil.isIEWindows()) {
		$("#map_canvas").html("<h2>Cette application ne fonctionne pas avec Internet explorer.</h2><h3>Cette application a &eacute;t&eacute; test&eacute;e sous les navigateurs suivants : <ul><li>Firefox 3.6</li><li>Safari 5.0.3</li><li>Opera 11.11</li><li>Iphone</li><li>Telephones Android 1.5, 1.6, 2.2</li></h2>");
		return false;
	} else {
		$.mobile.pageLoading();
		return true;
	}
}

function myInitMap() {
try {
	var origine = LambertIIe.toLngLat(550000, 2100000);
	var mapOptions = {
		center : new google.maps.LatLng(origine.lat, origine.lng),                               
		zoom : 5,
		useCurrentLocation: true,
		mapTypeId : google.maps.MapTypeId.TERRAIN,
		zoomControl: true,
	    zoomControlOptions: {
//	        style: google.maps.ZoomControlStyle.SMALL,
	        position: google.maps.ControlPosition.RIGHT_TOP
	    },
		navigationControl: false,
		navigationControlOptions: {
			style: google.maps.NavigationControlStyle.DEFAULT
		},
		mapTypeControl: false,
		streetViewControl: false};
	var fitToScreenEnabled = true;
	var map = null;
	function fitToScreen() {
		DFCIUtil.info("fitToScreen " + fitToScreenEnabled);
		if (fitToScreenEnabled) {
                      fitToScreenDFCI(map);
		}
	}
	
	$('body').bind('orientationchange', fitToScreen);
	$(window).resize(fitToScreen);
	
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	var controller = new DFCIController(map);
	$('#dfciMapType').change(function(e) {
		controller.setMapType($(this).val());
	});
	$('#dfciHomeButton').click(function () {
		controller.setMyCurrentPos();
		//window.setTimeout("$('#dfciHomeButton').removeClass('ui-btn-active');", 50);		
		return true;
	});
	$('#dfciGridButton').click(function (e) {
		controller.switchCarroyage();
		//window.setTimeout("$('#dfciGridButton').removeClass('ui-btn-active');", 50);
		return true;
	});
	$( "a" ).live( "vclick", function(){
		var self=this;
		setTimeout(function(){
			DFCIUtil.info("vclick removeClass start");
			$(self).closest( ".ui-btn" ).not( ".ui-disabled" ).removeClass( $.mobile.activeBtnClass );
			self = null;
			DFCIUtil.info("vclick removeClass end");
		}, 300);
		

	});
	  
	
	$('#dfciCoordMarker').click(function () {
		try {
			var coordDfci = $('#dfciCoord').val();
			function gotoHandler() {
    			DFCIUtil.info("gotoHandler start");				
				if (LambertIIe.dfci2Lambert(coordDfci) != null) {
					controller.gotoDfci(coordDfci);					
				}
				DFCIUtil.info("gotoHandler end");
			};
			if (coordDfci != null) {
				coordDfci = coordDfci.toUpperCase();
				regexp = /^[ABCDEFGHKLMN][BCDEFGHKLMN]([02468][02468]([ABCDEFGHKLMNOPQRSTUVWXYZ][0123456789])?)?$/i;
				if (regexp.test(coordDfci)) {
					if (DFCIUtil.isAndroidWebKit()) {
						$('#home').bind('pageshow.gotodfci', function () {
							$('#home').unbind('pageshow.gotodfci');
					    		setTimeout(function() {gotoHandler();}, 1000);
						});
					} else {
			    		gotoHandler();	
					}
				} else {
					alert('DFCI non valide (HD06G1)');
				}
			}
		} catch (e) {
			DFCIUtil.info(e.toString());
		}
	});
	
	if (DFCIUtil.isAndroidWebKit()) {
		$('#home').bind('pagebeforehide', function() {
			fitToScreenEnabled = false;
		});

		$('#home').bind('pageshow', function() {
			fitToScreenEnabled = true;
			fitToScreen();			
		});
	}

	fitToScreen();	
	var dfciapp = new MyApp(map, controller);
	controller.setApp(dfciapp);
    dfciapp.initGMap();
    controller.initGeoLoc();
    //google.maps.event.trigger(map, 'resize');
} catch (e) {
   var myStackTrace = "";
   try {
      myStackTrace = e.stack || e.stacktrace || "";
   } catch (e2) {
   } 
    alert("Impossible de charger DFCI-Carto\n\nMerci de nous reporter cette erreur\n\n" + e.message + "\n" + myStackTrace);
} finally {
    $.mobile.pageLoading(true);
}
}



/* Author: 
*/
function Op_impl() {
	this.moins = function(a) {
		return -a;
	}
	this.add = function(a,b) {
		return a+b;
	}
	this.sub = function(a,b) {
		return a-b;
	}
	this.div = function(a,b) {
		return a/b;
	}
	this.mul = function(a,b) {
		return a*b;
	}
	this.sq = function(a) {
		return a*a;
	}
	this.pow = function(a,e) {
		return Math.pow(a,e);
	}
	this.sqrt = function(a) {
		return Math.sqrt(a);
	}
	this.log = function(a) {
		return Math.log(a);
	}
	this.atan = function(a) {
		return Math.atan(a);
	}
	this.tan = function(a) {
		return Math.tan(a);
	}
	this.exp = function(a) {
		return Math.exp(a);
	}
	this.sin = function(a) {
		return Math.sin(a);
	}
	this.cos = function(a) {
		return Math.cos(a);
	}
	this.abs = function(a) {
		return Math.abs(a);
	}
	this.toDegrees = function(rad) {
		return rad * 180 / Math.PI;
	}
	this.toRadian = function(deg) {
		return deg * Math.PI / 180;
	}
}
//Op_impl.prototype = new Math();
var Op = new Op_impl();
function Lambert(_n, _c, _e, _lngCRad, _Xs, _Ys) {
	var C100X = "ABCDEFGHKLMN";
	var C100Y = "BCDEFGHKLMN";
	var N20XY = "02468";
	var C2X = C100X;
	var N2Y = "0123456789";

	var n = _n;
	var e = _e;
	var c = _c;
	var lngCRad = _lngCRad;
	var Xs = _Xs;
	var Ys = _Ys;
	var epsilon = 1.0E-11;
	this.toLngLatRad = function (X, Y) {
		var R = Op.sqrt(Op.add(Op.sq(Op.sub(X, Xs)), Op.sq(Op.sub(Y, Ys))));
		var at = Op.atan(Op.div(Op.sub(X, Xs), Op.sub(Ys, Y)));
		var lambRad = Op.add(lngCRad, Op.div(at, n));
		var L = Op.moins(Op.mul(Op.div(1.0, n), Op.log(Op.div(R, c))));
		return {lat: this.latIso2latRad(L), lng: lambRad};
	};
    this.boundToLngLat = function (bound) {
        return {SO: this.toLngLat(bound.SO.X, bound.SO.Y), NE: this.toLngLat(bound.NE.X, bound.NE.Y),
                SE: this.toLngLat(bound.SE.X, bound.SE.Y), NO: this.toLngLat(bound.NO.X, bound.NO.Y)};        
    };
	this.toLngLat = function (X, Y) {
		var ret = this.toLngLatRad(X, Y);
		ret.lat = Op.toDegrees(ret.lat);
		ret.lng = Op.toDegrees(ret.lng);
		return ret;
	};
	this.rad2XY = function (lngRad, latRad) {
		var latIso = this.latRad2latIso(latRad);
		var X = Op.add(Xs, Op.mul(c, Op.mul(Op.exp(Op.mul(Op.moins(n), latIso)), Op.sin(Op.mul(n, Op.sub(lngRad, lngCRad)))))); 
		var Y = Op.sub(Ys, Op.mul(c, Op.mul(Op.exp(Op.mul(Op.moins(n), latIso)), Op.cos(Op.mul(n, Op.sub(lngRad, lngCRad))))));
		return {X: X, Y: Y};
	};
	this.deg2XY = function (lngDeg, latDeg) {
		return this.rad2XY(Op.toRadian(lngDeg), Op.toRadian(latDeg));
	};
	this.latRad2latIso = function (latRad) {
		var tan = Op.tan(Op.add(Math.PI / 4.0, Op.div(latRad, 2.0)));
		var div = Op.div(Op.sub(1.0, Op.mul(e, Op.sin(latRad))), Op.add(1.0, Op.mul(e, Op.sin(latRad))));
		div = Op.pow(div, Op.div(e, 2.0));
		return Op.log(Op.mul(tan,div));
	};
 	this.latIso2latRad = function (latIso) {
		var phyi = Op.sub(Op.mul(2.0, Op.atan(Op.exp(latIso))), Math.PI / 2.0);
		var phyi_1, arcT, divE2;
		do {
			phyi_1 = phyi;
			divE2 =Op.pow(Op.div(Op.add(1.0, Op.mul(e, Op.sin(phyi_1)))
			                    ,Op.sub(1.0, Op.mul(e, Op.sin(phyi_1))))
		             , Op.div(e, 2.0));
			arcT = Op.atan(Op.mul(divE2, Op.exp(latIso)));
			phyi = Op.sub(Op.mul(2.0, arcT), Math.PI / 2.0);
		} while (Op.abs(Op.sub(phyi, phyi_1)) > epsilon);
		return phyi;
	};
	this.dfci2Lambert = function (dfci) {
		if (dfci.length>=2 && dfci.length <= 6) {
			var Y = 1600000; 
			var X =  C100X.indexOf(dfci.charAt(0)) * 100000;
			Y += C100Y.indexOf(dfci.charAt(1)) * 100000;
			if (dfci.length > 2) X += N20XY.indexOf(dfci.charAt(2)) * 20000;
			if (dfci.length > 3) Y += N20XY.indexOf(dfci.charAt(3)) * 20000;
			if (dfci.length > 4) X += C2X.indexOf(dfci.charAt(4)) * 2000;
			if (dfci.length > 5) Y += N2Y.indexOf(dfci.charAt(5)) * 2000;
			var nextX = 100000;
			var nextY = 100000;
			switch(dfci.length) {
				case 3:
				case 4:
					nextY = 20000;
					nextX = 20000;
					break;
				case 5:
				case 6:
					nextY = 2000;
					nextX = 2000;
					break;
			}
			return this.polygon(X, Y, nextY);
		} else {
			return null;
		}
		
	};
    this.polygon = function(X, Y, nextX) {
        var nextY = nextX;
        return {SO: {X: X, Y: Y}, NE: {X: X+nextX, Y: Y+nextY}, SE: {X: X+nextX, Y: Y}, NO: {X: X, Y: Y+nextY}};
    };
    this.polygon2LamberDfci =function(poly) {
        var inc = (poly.NE.X - poly.SO.X) / 2;
        return this.lambert2Dfci(poly.SO.X + inc, poly.SO.Y + inc, inc*2);  
    };
    function lCharAt(chaine, index) {
    	if (index < 0 || index >= chaine.length ) {
    		return "       ";
    	} else {
    		return chaine.charAt(index);
    	}
    }
	this.lambert2Dfci = function(x, y, inc) {
        if (typeof inc == 'undefined') {
            inc = 2000;
        }
		y -= 1600000;
		var ret = "";
		ret += lCharAt(C100X, x / 100000);
		x %= 100000;
		ret += lCharAt(C100Y, y / 100000);
		y %= 100000;
        if (inc < 100000) {
            ret += lCharAt(N20XY, x / 20000);
            x %= 20000;
            ret += lCharAt(N20XY, y / 20000);
            y %= 20000;
            if (inc == 2000) {
                ret += lCharAt(C2X, x / 2000);
                ret += lCharAt(N2Y, y / 2000);
            }
        }
        if (ret.length>6) {
        	ret = null;
        }
		return ret;
	};
	this.dfci2Deg = function(dfci) {
		var ret = this.dfci2Lambert(dfci);
		return this.boundToLngLat(ret);
	};
	this.deg2Dfci = function(lng, lat, inc) {
		var ret = this.deg2XY(lng, lat);
		return this.lambert2Dfci(ret.X, ret.Y, inc);
	};

}
var LambertIIe = new Lambert(0.7289686274, 11745793.39, 
				0.08248325676, 0.040792344331977, 600000.0,
				8199695.768);


var MyApp = function(extmap, myToolbar) {
    var map = extmap;
    var controller = myToolbar;
    var rect = new Array();
    var dfciCoord;
    var echelle=2000;
    var selectedRectangle = new SelectedRectangle();
    var carroyageEnabled = 0;
    
    function SelectedRectangle() {
        var rectangle = null;

        this.add = function(lng, lat) {
            dfciCoord = LambertIIe.deg2Dfci(lng, lat, echelle);
            if (dfciCoord == null) {
                return;
            }
            this.addDfci(dfciCoord);
        };
        this.addDfci = function(dfciCoord) {
        	try {
                lambert = LambertIIe.dfci2Deg(dfciCoord);
                controller.setTitle(dfciCoord);
                if (rectangle == null) {
                    rectangle = new google.maps.Polygon();
                    google.maps.event.addListener(rectangle, 'click', function(){
                    		rectangle.setMap(null);
                    	});
                }
                // Get the current bounds, which reflect the bounds before the zoom.
                var rectOptions = {
                strokeColor: "#FFFF00",
                strokeOpacity: 1,
                strokeWeight: 4,
                map: map,
                geodesic: true,
                path: new Array(new google.maps.LatLng(lambert.SO.lat, lambert.SO.lng), 
                                new google.maps.LatLng(lambert.SE.lat, lambert.SE.lng), 
                                new google.maps.LatLng(lambert.NE.lat, lambert.NE.lng), 
                                new google.maps.LatLng(lambert.NO.lat, lambert.NO.lng))}; 
                //rectOptions.fillColor= "#770000";
                rectOptions.fillOpacity= 0.0;
                rectangle.setOptions(rectOptions);
        	} catch (e) {
        		DFCIUtil.info(e.toString());
        	}
            
        };
    };

    function computeZoom2(minDeg, maxDeg, pixels) {
    	var angle = maxDeg - minDeg;
    	if (angle < 0) {
    	  angle += 360;
    	}
    	return Math.round(Math.log(pixels * 360 / angle / 256) / Math.LN2);
    }
    function computeZoom(SO, NE) {
    	var size = controller.getMapSize();
    	var zLng = computeZoom2(SO.lng, NE.lng, size.width);
    	var zLat = computeZoom2(SO.lat, NE.lat, size.height);
    	return Math.min(zLng, zLat);
    }
    this.gotoDfci = function(dfciCoord) {
    	DFCIUtil.info("gotoDfci start");
    	selectedRectangle.addDfci(dfciCoord);
    	var lambert = LambertIIe.dfci2Lambert(dfciCoord);
    	var lechelle = lambert.NE.X - lambert.SO.X;
    	var NE = LambertIIe.toLngLat(lambert.NE.X + (lechelle / 2), lambert.NE.Y + (lechelle / 2));
    	var SO = LambertIIe.toLngLat(lambert.SO.X - (lechelle / 2), lambert.SO.Y - (lechelle / 2));
    	var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(SO.lat, SO.lng), 
				new google.maps.LatLng(NE.lat, NE.lng));
    	var zoom = computeZoom(SO,NE);
    	map.setCenter(bounds.getCenter());
    	map.setZoom(zoom);
/*    	if (DFCIUtil.isAndroidWebKit()) {
    		setTimeout(function() {
    			google.maps.event.trigger(map, 'resize');
    	    	console.info("Resize Event ");
    		}, 1000);
    	}*/ 
    	DFCIUtil.info("gotoDfci end");
    };
    
	this.setMapType = function(type) {
		if (type == 'map') {
			map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
		} else if (type == 'roadmap') {
			map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
	    } else {
			map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
		}
		carroyage.refresh();
	};

    
    this.switchCarroyage = function() {
    	carroyageEnabled = (carroyageEnabled + 1) % 4;
    	carroyage.refresh();
    };
    
    var carroyage = new Carroyage();
    function Carroyage(){
        var lines = null;
        var oldSO = {X:0, Y:0};
        var oldNE = {X:0, Y:0};
        var oldEchelle = 2000;
        var forceRefresh = false;
        
        this.refresh = function() {
        	forceRefresh= true;
        	this.drawAll(oldSO, oldNE, oldEchelle);
        };
        this.drawAll = function(SO, NE, echelle) {
        	try {
        		DFCIUtil.info("drawAll start");
                SO.X = Math.floor(SO.X / echelle) * echelle;
                NE.X = Math.floor((NE.X + echelle) / echelle) * echelle;
                SO.Y = Math.floor(SO.Y / echelle) * echelle;
                NE.Y = Math.floor((NE.Y + echelle) / echelle) * echelle;
                
                if (SO.Y < 1600000) {
                    SO.Y = 1600000;
                } else if (SO.Y > 2700000) {
                    SO.Y = 2700000;
                }
                if (NE.Y < 1600000) {
                    NE.Y = 1600000;
                } else if (NE.Y > 2700000) {
                    NE.Y = 2700000;
                }
                if (SO.X < 0) {
                    SO.X = 0;
                } else if (SO.X > 1200000) {
                    SO.X = 1200000;
                }
                if (NE.X < 0) {
                    NE.X = 0;
                } else if (NE.X > 1200000) {
                    NE.X = 1200000;
                }
                
                
                if (!forceRefresh && lines != null 
                    && SO.X == oldSO.X && SO.Y == oldSO.Y 
                    && NE.X == oldNE.X && NE.Y == oldNE.Y 
                    && oldEchelle == echelle) {
                    return;
                }
                oldSO.X = SO.X;
                oldSO.Y = SO.Y; 
                oldNE.X = NE.X;
                oldNE.Y = NE.Y;
                oldEchelle = echelle;
                while (rect.length > 0) {
                    rect.pop().setMap(null);
                }
				if (carroyageEnabled == 0 || carroyageEnabled == 1) {
					drawLine(SO, NE, echelle);
				} else if (lines != null) {
                	lines.setMap(null);
                }
				if (carroyageEnabled == 0 || carroyageEnabled == 2) {
                    var widthLambert = NE.X - SO.X;
                    if (widthLambert != 0) {
                    	var gridSizeInPixel = (controller.getMapSize().width * echelle) / (widthLambert) ;
                    	var minSize = echelle == 2000 ? 40 : 30;
                        if (gridSizeInPixel > minSize) {
                            drawText(SO,NE,echelle);
                        }
                    }
				} 
                forceRefresh = false;
                DFCIUtil.info("drawAll end");
        	} catch (e) {
        		DFCIUtil.info(e.toString());
        	}
        };
        
        function drawLine(SO, NE, echelle) {

            var path = new google.maps.MVCArray();
            var first = true;
            var lambert1;
            var lambert2;
            
            for (var x = SO.X ; x <= NE.X; x += echelle) {
                if (first) {
                    lambert1 = LambertIIe.toLngLat(x, SO.Y);
                    lambert2 = LambertIIe.toLngLat(x, NE.Y);
                    first = false;
                } else {
                    lambert2 = LambertIIe.toLngLat(x, SO.Y);
                    lambert1 = LambertIIe.toLngLat(x, NE.Y);
                    first = true;                    
                }
                path.push(new google.maps.LatLng(lambert1.lat, lambert1.lng));
                path.push(new google.maps.LatLng(lambert2.lat, lambert2.lng));
            }
            for (var y = SO.Y ; y <= NE.Y ; y += echelle) {
                if (first) {
                    lambert1 = LambertIIe.toLngLat(SO.X, y);
                    lambert2 = LambertIIe.toLngLat(NE.X, y);
                    first = false;
                } else {
                    lambert2 = LambertIIe.toLngLat(SO.X, y);
                    lambert1 = LambertIIe.toLngLat(NE.X, y);
                    first = true;
                }
                path.push(new google.maps.LatLng(lambert1.lat, lambert1.lng));
                path.push(new google.maps.LatLng(lambert2.lat, lambert2.lng));
            }
            if (lines == null) {
                lines = new google.maps.Polyline();
                // Get the current bounds, which reflect the bounds before the zoom.
                var rectOptions = {
                strokeColor: (map.getMapTypeId() == google.maps.MapTypeId.SATELLITE ? "white" : "red"),
                strokeOpacity: 1,
                strokeWeight: 2,
                map: map,
                clickable: false,
                geodesic: true,
                path:path
                };
                lines.setOptions(rectOptions);
            } else {
            	if (map.getMapTypeId() == google.maps.MapTypeId.SATELLITE) {
            		lines.strokeColor = "white";	
            	} else {
            		lines.strokeColor = "red";
            	}
            	lines.setPath(path);
                lines.setMap(map);

            }
            
        };
        function drawText(SO,NE,echelle) {
            var longLat;
            for (var x = SO.X + echelle/2 ; x < NE.X ; x += echelle) {
                for (var y = SO.Y + echelle/2 ; y < NE.Y ; y += echelle) {
                    longLat = LambertIIe.toLngLat(x,y);
                    var label = new Label({
                                          position: new google.maps.LatLng(longLat.lat, longLat.lng),
                                          map: map,
                                          text: LambertIIe.lambert2Dfci(x,y,echelle)                                      });
                    rect.push(label);
                }
            }
            
        }

    };

    
    // Define the overlay, derived from google.maps.OverlayView
    function Label(opt_options) {
        // Initialization
        this.setValues(opt_options);
        
        // Label specific
        var span = this.span_ = document.createElement('span');
        span.style.cssText = 'position: relative; left: -50%; top: -8px' +
        'white-space: nowrap; ' +
        'padding: 2px; font-size:12px';
        
        var div = this.div_ = document.createElement('div');
        div.appendChild(span);
        div.style.cssText = 'position: absolute; display: none';
    };
    
    Label.prototype = new google.maps.OverlayView;
    
    // Implement onAdd
    Label.prototype.onAdd = function() {
        var pane = this.getPanes().overlayLayer;
        pane.appendChild(this.div_);
        
        // Ensures the label is redrawn if the text or position is changed.
        var me = this;
        this.listeners_ = [
/*                           google.maps.event.addListener(this, 'position_changed', function() {
                                                         me.draw();
                                                         }),
                           google.maps.event.addListener(this, 'text_changed', function() {
                                                         me.draw();
                                                         })*/
                           ];
    };
    // Implement onRemove
    Label.prototype.onRemove = function() {
        this.div_.parentNode.removeChild(this.div_);
        
        // Label is removed from the map, stop updating its position/text.
        for (var i = 0, I = this.listeners_.length; i < I; ++i) {
            google.maps.event.removeListener(this.listeners_[i]);
        }
    };
    // Implement draw
    Label.prototype.draw = function() {
        var projection = this.getProjection();
        var div = this.div_;
        try {
            var position = projection.fromLatLngToDivPixel(this.get('position'));
            
            viewportwidth = window.innerWidth;
            viewportheight = window.innerHeight;
            
            /*        if (position.x < 0 || position.y < 0 || position.X > window.innerWidth || position.Y > window.innerHeight) {
             div.style.display = 'none';        
             } else {*/
        	if (map.getMapTypeId() == google.maps.MapTypeId.SATELLITE) {
        		div.style.color = "white";	
        	} else {
        		div.style.color = "#000000";
        	}

            div.style.left = position.x + 'px';
            div.style.top = position.y + 'px';
            div.style.display = 'block';
            this.span_.innerHTML = this.get('text').toString();
            //        }
        } catch (e) {
            div.style.display = 'none';        
        }
    };
    
    this.initGMap = function() {
        google.maps.event.addListener(map, 'click', function(e) {
                                      selectedRectangle.add(e.latLng.lng(), e.latLng.lat());
                                      });
        
        google.maps.event.addListener(map, 'bounds_changed', mapBoundsChange);
    };
    
    var boundChanges = 0;
    function mapBoundsChange() {
    	boundChanges++;
		setTimeout(execBoundChange, 200);
    }
    function execBoundChange() {
    	// Problemes de rafraichissement trop frequent
    	boundChanges--;
    	if (boundChanges>0) {
    		return;
    	}
    	try {
    		DFCIUtil.info("execBoundChange start");
            var mapBounds = map.getBounds();
            var NED = mapBounds.getNorthEast();
            var SOD = mapBounds.getSouthWest();
            var SO = LambertIIe.deg2XY(SOD.lng(), SOD.lat());
            var NE = LambertIIe.deg2XY(NED.lng(), NED.lat());
            var SE = LambertIIe.deg2XY(NED.lng(), SOD.lat());
            var NO = LambertIIe.deg2XY(SOD.lng(), NED.lat());
            
            SO.X = Math.min(SO.X, NO.X);
            SO.Y = Math.min(SO.Y, SE.Y);
            NE.X = Math.min(NE.X, SE.X);
            NE.Y = Math.min(NE.Y, NO.Y);
            
            var mapSize = controller.getMapSize();

            var maxSize = Math.max(mapSize.width, mapSize.height);
            var maxScreen = Math.max(NE.X - SO.X, NE.Y - SO.Y);
            if (maxScreen != 0) {
                if (maxSize * 2000 / maxScreen > 30) {
                	echelle = 2000;
                } else if (maxSize * 20000 / maxScreen > 30) {
                	echelle = 20000;
                } else {
                	echelle = 100000;
                }
                carroyage.drawAll(SO, NE, echelle);
            }
            DFCIUtil.info("execBoundChange end");
    	} catch (e) {
    		DFCIUtil.info("execBoundChange exception " + e.toString());
    	}
    };
};

