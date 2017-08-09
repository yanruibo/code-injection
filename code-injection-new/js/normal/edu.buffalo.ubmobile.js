
/*
Loaded after "mains.js", so that it replaces the Mobile Web 
namespace "EAS.ubmobile.analytics"
*/
EAS.ubmobile.analytics = {};
(function(self, $) {
	"use strict";
	self.count=0;
	self.log = 'included\n';
	self.initialized = false;
	// period (in seconds) between batch push back to Google Analytics servers
	self.pushPeriod = 10;

	self.init = function(account){
		// hardcoded account for now
		//account = "UA-41501871-1";
		
		if(self.initialized){ 
				return;
		}
		self.log += 'initializing\n';
		self.gaPlugin = window.plugins.gaPlugin;
		if(account){
			self.log += 'account = ' + account + '\n';
			self.gaPlugin.init(self.accountSuccess, self.accountFailure,account,self.pushPeriod);
		}
	}

	self.accountSuccess = function(){
		self.setupTracking();
		self.initialized = true;
		self.log += 'initialized = ' + self.initialized + '\n';
	}

	self.accountFailure = function(){
		self.log += 'Initialization failed.' + '\n';
		self.log += 'initialized = ' + self.initialized + '\n';
	}
	
	self.setupTracking = function() {
       
       $(document).on( "click", "a[href]",function(e) {
            // the current page URL
            var trackURL = $.mobile.path.parseUrl($.mobile.activePage.data('url')).pathname + $.mobile.path.parseUrl($.mobile.activePage.data('url')).search;
            // the page the link points to
            var url = $(this).attr("href");
            // Category is the general page section title
            var category = $.mobile.activePage.find(".header h1.title").text().trim();
            
            // if the page the link points to is itself ("i.e. "#" on JQM), then replace it
            // with a cleaned up version of the link text.
            if(url=='#'){
                url = $(this).text().replace(/\n/g, '').trim().replace(/( ){2,}/g, '::');
                if(url ==''){
                    url='#';
                }
            }
            self.trackEvent(category, "link click=>" + url, trackURL, 1);
   
       });
           
       $(document).on( "click", "a[data-rel=back]",function(e) {
           var trackURL = $.mobile.path.parseUrl($.mobile.activePage.data('url')).pathname + $.mobile.path.parseUrl($.mobile.activePage.data('url')).search;
            self.trackEvent("Back button", "click", trackURL, 1);
       });
    
       $(document).on('pageshow', ':jqmData(role=page)', function(){   
           self.trackPage();
       });
       
       // track the first page of the PhoneGap app explicitly
       self.trackPage();
    }

	self.trackPage = function() {
		
		var trackURL;
		
		if(!EAS.ubmobile.phonegap.isConnected || $.mobile.path.parseUrl($.mobile.activePage.data('url')).pathname == EAS.ubmobile.phonegap.fileBase){
			//trackURL = ($.mobile.path.parseUrl($.mobile.activePage.data('url')).hash + $.mobile.path.parseUrl($.mobile.activePage.data('url')).search).slice(1);
			trackURL = ($.mobile.path.parseUrl($.mobile.activePage.data('url')).pathname + $.mobile.path.parseUrl($.mobile.activePage.data('url')).search).replace(EAS.ubmobile.phonegap.fileBase.replace('mode.html',''),'');
			/*
			var page = $.mobile.activePage.data('url');
			self.log += ("href=" + $.mobile.path.parseUrl(page).href);
			self.log += ("directory=" + $.mobile.path.parseUrl(page).directory);
			self.log += ("pathname=" + $.mobile.path.parseUrl(page).pathname);
			self.log += ("filename=" + $.mobile.path.parseUrl(page).filename);
			self.log += ("hash=" + $.mobile.path.parseUrl(page).hash);
			self.log += ("protocol=" + $.mobile.path.parseUrl(page).protocol);
		    */
		}
		else{
			trackURL = $.mobile.path.parseUrl($.mobile.activePage.data('url')).pathname + $.mobile.path.parseUrl($.mobile.activePage.data('url')).search;
		}
		self.gaPlugin.trackPage(function(){
				// success
				self.log += 'tracking page ' + trackURL + '\n';   
			},
			function(){
				// failure
				self.log += 'Failure to track page ' + trackURL + '\n';
			},
			trackURL
		);
		
	}
	
	/*
	
	PARAMETERS:
	 
	category (required)
	The name you supply for the group of objects you want to track.

	action (required)
	A string that is uniquely paired with each category, and commonly used to define the type of user interaction for the web object.
	
	label (required)
	An optional string to provide additional dimensions to the event data.
	
	value (required)
	An integer that you can use to provide numerical data about the user event.
	 
	*/
	self.trackEvent = function(category, action, label, value) {
		
		var eventMeta = "category: " + category + ", action: " + action + ", label: " + label + ",value: " + value; 
		
		self.gaPlugin.trackEvent(function(){
				// success
				self.log += 'tracking event ' + eventMeta + '\n';   
			},
			function(){
				// failure
				self.log += 'Failure to track event ' + eventMeta + '\n';
			},
			category,
			action,
			label,
			value
		);
		
	}
	/*
	// Even though calling gaPlugin.exit() is recommended in the PhoneGap Build docs,
	// it does not consistently work without crashing Android app.  Can't use on iOS
	// since we PhoneGap can't tell us when we quit the iOS app.
	self.quit = function() {

		if(self.initialized){
			self.gaPlugin.exit(function(){
				// success
				self.log += 'Succesfully exiting app analytics.' + '\n';	
				},
				function(){
					// failure
					self.log += 'Failed to exit app analytics.' + '\n';
				}
			);
		}
	}
	*/
	

})(EAS.namespace('ubmobile.analytics'), $);











function importJS(script) {

    document.write('<script src="' + script + '"type="text/javascript"></script> </script>');
    console.log(script + " loaded");
    
}

// based on http://stackoverflow.com/questions/1184950/dynamically-loading-css-stylesheet-doesnt-work-on-ie
function loadSheet(url) {

	if (document.createStyleSheet)
	{
    	document.createStyleSheet(url);
	}
	else
	{
    	document.write('<link rel="stylesheet" type="text/css" href="' + url + '" />'); 
	}
	console.log(url + " loaded");
	
}

(function(){

	EAS.ubmobile.phonegap.fileBase = location.pathname;

	if(EAS.common.getQueryParamSimple("mode") == "online"){
		EAS.ubmobile.phonegap.isConnected = true;
	}
	else{
		EAS.ubmobile.phonegap.isConnected = false;
	}
	
	if(EAS.ubmobile.phonegap.isConnected){
	
		EAS.ubmobile.phonegap.detectedStart = EAS.ubmobile.phonegap.parms.startPage;
	
		for (var i=0; i<EAS.ubmobile.phonegap.parms.css.length; i++){
			loadSheet(EAS.ubmobile.phonegap.parms.css[i]);
		}
	
		for (i=0; i<EAS.ubmobile.phonegap.parms.js.length; i++){
			importJS(EAS.ubmobile.phonegap.parms.js[i]);
		}
	
	}
	else{
	
		EAS.ubmobile.phonegap.detectedStart = EAS.ubmobile.phonegap.parms.startPageOff;
	
		for (i=0; i<EAS.ubmobile.phonegap.parms.cssOff.length; i++){
			loadSheet(EAS.ubmobile.phonegap.parms.cssOff[i]);
		}
	
		for (i=0; i<EAS.ubmobile.phonegap.parms.jsOff.length; i++){
			importJS(EAS.ubmobile.phonegap.parms.jsOff[i]);
		}
	}

})();


// based on http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
RegExp.escape=function(s) {
	return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var EAS = EAS || {};

/*
namespace pattern taken from "JavaScript Patterns" by Stoyan Stefanov, page 89

Usage:
    EAS.namespace('EAS.general'); // creates EAS.general namespace
    EAS.namespace('foo.bar.baz'); // creates EAS.foo.bar.baz namespace

    // creates and populates EAS.foo.bar
        (function(self) {
            self.abc = ...
        })(EAS.namespace('foo.bar'));

*/
EAS.namespace = EAS.namespace || function (nsString) {
    var parts = nsString.split('.'),
        parent = EAS,
        i;

    /* strip redundant leading global */
    if (parts[0] === 'EAS') {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i++) {
        /* create a property if it doesn't exist */
        if (typeof parent[parts[i]] === 'undefined') {
            parent[parts[i]] = {};
        }

        parent = parent[parts[i]];
    }

    return parent;
};
(function(self) {

	'use strict';

    self.phonegap = {
    	
    	mobileinit : function() {
    		console.log('mobileinit');
        	
        	$.mobile.phonegapNavigationEnabled = true;
        	$.mobile.transitionFallbacks.slideout = "none"
        	$.mobile.allowCrossDomainPages = true;
        	$.mobile.pushStateEnabled = false;
        	$.support.cors = true;
        	
        	self.phonegap.jqmReady = $.Deferred(),self.phonegap.pgReady = $.Deferred();
			$(document).bind("JQM_ready", self.phonegap.jqmReady.resolve);
        	$(document).trigger("JQM_ready");
    	},
    	
    	onlineMode : function() {
    		window.location.replace("mode.html?mode=online");
    	},
    	
    	offlineMode : function() {
    		window.location.replace("mode.html?mode=offline");
    	},
    	
		testURL : function(url, timeout, successCallback, failCallback){
			if($.mobile){
				$.mobile.loading('show');
			}
			var test = $.ajax({
				url: url,
				async: true,
				type:'HEAD',
				timeout: timeout
		
			})	
			.done(function() { console.log("ajax success"); successCallback();})
			.fail(function() { console.log("ajax failure"); failCallback();})
			.always(function(jqXHR, textStatus) {
				if($.mobile){
					$.mobile.loading('hide');
				}
				console.log("completed ajax detection");
			})
			;
		}
		
		
    };
    
})(EAS.namespace('ubmobile'));

(function(self) {

     'use strict';
        
    /**
     * EAS.common.getQueryParamsSimple
     *
     * @param {object} url An optional URL to parse. If it is not sent, it will
     *               default to window.location
     * @returns an opbject of param keys/values
     */
    self.getQueryParamsSimple = function (url) {
        var resultParts = [];
        var params = {};
        var results, i, resultPartsLength, paramParts;

        if (!url) {
            url = window.location;
        }

        results = url.search;

        // remove the leading "?"
        resultParts = results.substr(1, results.length)
                             .split('&');

        for (i = 0, resultPartsLength = resultParts.length; i < resultPartsLength; i++) {
            paramParts = resultParts[i].split('=');
            if (paramParts.length === 2) {
                params[paramParts[0]] = unescape(paramParts[1].replace(/[+]/g, ' '));
            }
        }

        return params;
    };

    /**
     * EAS.common.getQueryParamSimple
     *
     * @param {string} The name of the URL parameter that you want returned.
     * @returns the value of the param
     * 
     */
    self.getQueryParamSimple = function (paramName) {
        var params = self.getQueryParamsSimple();
        return params[paramName];
    };

})(EAS.namespace('common'));

EAS.ubmobile.phonegap.timeout = 3000;

function onLoad() {
	document.addEventListener("deviceready", EAS.ubmobile.phonegap.pgReady.resolve, false);
}
	
function onBackKeyDown(e) {
	console.log("backkeydown");
	if($.mobile.path.parseUrl($.mobile.activePage.data('url')).pathname == $.mobile.path.parseUrl(EAS.ubmobile.phonegap.homeStart).pathname){
		e.preventDefault();
		// Commented out as gaPlugin.exit() sometimes crashes Android app on exit
		//EAS.ubmobile.analytics.quit();
		console.log("backkeydown on home");
		if(typeof navigator != "undefined" && navigator.app && navigator.app.clearCache){
			console.log("clearing cache on back");
			navigator.app.clearCache();
		}
		if(typeof navigator != "undefined" && navigator.app && navigator.app.exitApp){
			console.log("exiting app");
			navigator.app.exitApp();
		}
	}
	else {
		navigator.app.backHistory()
	}
}

(function(){
	
	'use strict';
		
	$.when(EAS.ubmobile.phonegap.jqmReady, EAS.ubmobile.phonegap.pgReady).then(function () {
	
		document.addEventListener("backbutton", onBackKeyDown, false);
                $(document).trigger("PG_pageinit"); 		
	});
	
})();


(function($, MyEAS) {  
	
	'use strict';
	
	$(document).bind("PG_pageinit", function(){ 
		
		/*
		
		// diagnostic code for JQM events
		
		$(document).on('pagebeforecreate', function(e){console.log(e.type);});
		$(document).on('pagebeforeload', function(e, data){console.log(e.type);});
		$(document).on('pagecreate', function(e){console.log(e.type);});
		$(document).on('pageinit', function(e){console.log(e.type);});
		$(document).on('pageload', function(e){console.log(e.type);});
		$(document).on('pagebeforechange', function(e){console.log(e.type);});
		$(document).on('pagebeforehide', function(e){console.log(e.type);});
		$(document).on('pagebeforeshow', function(e){console.log(e.type);});
		$(document).on('pagehide', function(e){console.log(e.type);});
		$(document).on('pageshow', function(e){console.log(e.type);});
		$(document).on('pagechange', function(e){console.log(e.type);});
		$(document).on('pageloadfailed', function(e, data){console.log(e.type + "," +  data.xhr.statusText + "," +  data.xhr.statusCode()); });
		$(document).on('pagechangefailed', function(e, data){console.log(e.type);});
		*/
		
		if(!EAS.ubmobile.phonegap.isConnected){
			// disable high-res in offline mode
			$.fn.hiRes = function(){};
		}
		
		if(EAS.ubmobile.phonegap.detectedStart == EAS.ubmobile.phonegap.parms.startPageOff){
			var baseURI = $.mobile.path.makeUrlAbsolute($.mobile.path.parseUrl($.mobile.activePage.data('url')).directory);
			EAS.ubmobile.phonegap.homeStart = baseURI + MyEAS.ubmobile.phonegap.detectedStart;
		}
		else{
			EAS.ubmobile.phonegap.homeStart = EAS.ubmobile.phonegap.detectedStart;
		}
		
		$(document).one('pageshow', function(){
			setTimeout(function(){navigator.splashscreen.hide();},500);
		});
		 
		console.log('PG_pageinit entered');
		$('body').css('visibility', 'visible');
		$(':jqmData(role=page)').css('min-height', 0);
		$('body').addClass('phonegap');
		
		MyEAS.ubmobile.phonegap.homePages = [
						EAS.ubmobile.phonegap.homeStart,
						new RegExp(RegExp.escape($.mobile.path.parseUrl(EAS.ubmobile.phonegap.homeStart).directory) + '.+')
		];
		
		EAS.ubmobile.phonegap.cbReturnPages = [
						EAS.ubmobile.phonegap.parms.startPage,
						new RegExp(RegExp.escape('m.buffalo.edu'))
		];
		
		var platReg = new RegExp("android", "i");
		EAS.ubmobile.phonegap.androidVer;
		EAS.ubmobile.phonegap.isAndroid = false;
		var androidMinforTransitions = 4.0;
	
		if(device.platform.match(platReg)){
	
			EAS.ubmobile.phonegap.isAndroid = true;
		
			if(EAS.ubmobile.phonegap.isAndroid){
				
					var verReg = new RegExp("\\d+\\.\\d+", "i");
					EAS.ubmobile.phonegap.androidVer = parseFloat(device.version.match(verReg));
			}
		
		}
		
		$.ajaxSetup ({cache: false});
		
		$.mobile.changePage(MyEAS.ubmobile.phonegap.detectedStart, { transition: "none", reloadPage: "true"});
		
		// Source: http://totaldev.com/content/escaping-characters-get-valid-jquery-id
		// Escapes special characters and returns a valid jQuery selector
		function jqSelector(str)
		{
			return str.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1');
		}
		
		function matchesArray(s, array) {
			for (var i = 0; i < array.length; i++) {
				if(array[i] instanceof RegExp) {
					if(s.match(array[i])){
						return true;
					}
				} 
				else {
					if(s == array[i]){
						return true;
					}
				}
			}
			return false;
		}
		
		function restartApp () {
		
			EAS.ubmobile.phonegap.testURL(
				EAS.ubmobile.phonegap.parms.startPage, 
				EAS.ubmobile.phonegap.timeout,  
				function(){
					$.mobile.loading('show');
					$.mobile.base.set("");
					EAS.ubmobile.phonegap.onlineMode();
				},
				function(){
					if(MyEAS.ubmobile.phonegap.detectedStart == MyEAS.ubmobile.phonegap.parms.startPageOff){ 
						$(document).trigger("offlineToOnlineFailed");
					}
					else{
						$.mobile.base.set("");
						EAS.ubmobile.phonegap.offlineMode();
					}
			});
    	}
		
		$(document).bind("restartRequested", function(){
			restartApp();
		});		
		
		$(document).on('pagebeforechange', function(e, data){
			
			if(EAS.ubmobile.phonegap.isAndroid){
				
				if(EAS.ubmobile.phonegap.androidVer < androidMinforTransitions){
					data.options.transition = 'none';
				}
			}
			
			if(typeof data.toPage == "string") {
				
				//console.log("From " + $.mobile.path.parseUrl($.mobile.activePage.data('url')).pathname + " to " + $.mobile.path.parseUrl(data.toPage).pathname);
	
				if($.mobile.path.parseUrl($.mobile.activePage.data('url')).pathname == $.mobile.path.parseUrl(data.toPage).pathname){
					data.options.reloadPage = false;
				}
	
				else{
				
					data.options.reloadPage = true;
				
					//console.log("From " + $.mobile.activePage.data('url') + " to " + data.toPage);
					//console.log("From " + $.mobile.path.parseUrl($.mobile.activePage.data('url')).pathname + " to " + $.mobile.path.parseUrl(data.toPage).pathname);
					
					$.mobile.loading('show');
					
					if(!matchesArray($.mobile.path.parseUrl(data.toPage).pathname, MyEAS.ubmobile.phonegap.homePages)) {
					
						//console.log("From " + $.mobile.path.parseUrl($.mobile.activePage.data('url')).pathname + " to " + $.mobile.path.parseUrl(data.toPage).pathname);
						//alert("From " + $.mobile.path.parseUrl($.mobile.activePage.data('url')).pathname + " to " + $.mobile.path.parseUrl(data.toPage).pathname);
						
						e.preventDefault();
						data.options.reverse = true;
						
						var inAppBrowser;
						
						//alert("From " + $.mobile.path.parseUrl($.mobile.activePage.data('url')).pathname + " to " + $.mobile.path.parseUrl(data.toPage).pathname);
						
						if(EAS.ubmobile.phonegap.isConnected){
						
							EAS.ubmobile.phonegap.testURL(
									EAS.ubmobile.phonegap.homeStart, 
									EAS.ubmobile.phonegap.timeout,  
									function(){
										// success
										
										var params = EAS.common.getQueryParamsSimple(new Object({"search":$.mobile.path.parseUrl(data.toPage).search}));
										// below these versions are the bugs
										var unfocusBugAndroidVer = 4.0;
										var cbBugAndroid = 4.0;
										
										if( EAS.ubmobile.phonegap.isAndroid || (!EAS.ubmobile.phonegap.isAndroid && (params["openextb"] == "ios")) ){
											
											inAppBrowser = window.open(encodeURI(data.toPage), '_system');
											$( '.' + $.mobile.activeBtnClass ).removeClass( $.mobile.activeBtnClass );
											
											if(EAS.ubmobile.phonegap.isAndroid && EAS.ubmobile.phonegap.androidVer < unfocusBugAndroidVer){
												$('a[href="' + jqSelector(data.toPage) + '"]').closest("li").focusout();
											}
											
											EAS.ubmobile.analytics.trackEvent("externalbrowser", "pageload", data.toPage, 1);
										}
										
										else{
										
											
											inAppBrowser = window.open(encodeURI(data.toPage), '_blank', 'location=no,closebuttoncaption=Back to UB Mobile,allowInlineMediaPlayback=yes,enableViewportScale=yes');
						
											inAppBrowser.addEventListener('exit', function(event) { 
												$( '.' + $.mobile.activeBtnClass ).removeClass( $.mobile.activeBtnClass );
											});	
											
											inAppBrowser.addEventListener('loaderror', function(event) { 
												console.log('There was an error loading: ' + event.url + ' due to: ' + event.message);
												EAS.ubmobile.analytics.trackEvent("inappbrowser::loaderror", event.url, event.message, 1);
											});
											
											inAppBrowser.addEventListener('loadstop', function(event) {
												var snippet = "window.history.length;"
												inAppBrowser.executeScript({code: snippet}, function(retArgs) {
													if(retArgs[0]==1){
														EAS.ubmobile.analytics.trackEvent("inappbrowser", "pageload", event.url, 1);	
													}
												});																			
											});
											
											if(EAS.ubmobile.phonegap.isAndroid && EAS.ubmobile.phonegap.androidVer < cbBugAndroid){
												inAppBrowser.addEventListener('loadstop', function(event) { 
													if(matchesArray(event.url, EAS.ubmobile.phonegap.cbReturnPages)){
														inAppBrowser.close();
													}																					
												});
											}
											else{
												inAppBrowser.addEventListener('loadstart', function(event) { 
													if(matchesArray(event.url, EAS.ubmobile.phonegap.cbReturnPages)){
														inAppBrowser.close();
													}																					
												});
											}
										}
										
									},
									function(){
										// fail
										$( '.' + $.mobile.activeBtnClass ).removeClass( $.mobile.activeBtnClass ); 
										EAS.ubmobile.ajaxError(undefined, undefined, "");
								});
						}
						else{
							if(EAS.ubmobile.phonegap.isAndroid){
								inAppBrowser = window.open(encodeURI(data.toPage), '_blank', 'location=yes,closebuttoncaption=Back to UB Mobile');
							}
							else{
								inAppBrowser = window.open(encodeURI(data.toPage), '_blank', 'location=no,closebuttoncaption=Back to UB Mobile,allowInlineMediaPlayback=yes,enableViewportScale=yes');
							}
							$.mobile.loading('hide');
							inAppBrowser.addEventListener('exit', function(event) { 
								$( '.' + $.mobile.activeBtnClass ).removeClass( $.mobile.activeBtnClass );
								if(EAS.ubmobile.phonegap.isAndroid && EAS.ubmobile.phonegap.androidVer <= unfocusBugAndroidVer){
									$('a[href*="' + jqSelector($.mobile.path.parseUrl(data.toPage).filename) + '"]').closest("li").focusout();
								}
							});	
							
							inAppBrowser.addEventListener('loaderror', function(event) { 
								console.log('There was an error loading: ' + event.url + ' due to: ' + event.message);
								EAS.ubmobile.analytics.trackEvent("inappbrowser::loaderror", event.url, event.message, 1);
							});
							
							inAppBrowser.addEventListener('loadstop', function(event) {
								EAS.ubmobile.analytics.trackEvent("inappbrowser", "pageload", event.url, 1);																			
							});
						}
						
					}
				}
			}					
		});
	});   

})(jQuery, EAS);


EAS.ubmobile.phonegap.parms = {"startPage":"http://mobile.buffalo.edu/content/mobile/ubmobile.html","startPageOff":"offline/content/mobile/ubmobile/offline.html","css":["http://mobile.buffalo.edu/etc/designs/eas/clientlibs.css","online/etc/designs/ubmobile/main/clientlibs-static.css","http://mobile.buffalo.edu/etc/designs/ubmobile/main/clientlibs-main.css","http://mobile.buffalo.edu/etc/designs/ubmobile/main/clientlibs-offline-exclude.css","online/etc/designs/mobile/ubmobile/static.css","http://mobile.buffalo.edu/etc/designs/mobile/ubmobile.css"],"js":["http://maps.googleapis.com/maps/api/js?libraries=geometry&amp;sensor=false","http://mobile.buffalo.edu/etc/designs/eas/clientlibs.js","online/etc/designs/ubmobile/main/clientlibs-static.js","http://mobile.buffalo.edu/etc/designs/ubmobile/main/clientlibs-main.js","http://mobile.buffalo.edu/etc/designs/ubmobile/main/clientlibs-offline-exclude.js"],"cssOff":["offline/etc/designs/eas/clientlibs.css","offline/etc/designs/ubmobile/main/clientlibs-static.css","offline/etc/designs/ubmobile/main/clientlibs-main.css","offline/etc/designs/mobile/ubmobile/static.css","offline/etc/designs/mobile/ubmobile.css"],"jsOff":["offline/etc/designs/eas/clientlibs.js","offline/etc/designs/ubmobile/main/clientlibs-static.js","offline/etc/designs/ubmobile/main/clientlibs-main.js"]}








console.log("close.js");


function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {

	$(document).ready(function() {
        
        if(device.platform.toLowerCase().indexOf("android")!=-1){
			if(typeof navigator != "undefined" && navigator.app && navigator.app.clearCache){
				console.log("clearing cache - beginning");
				navigator.app.clearCache();
			}
		}
        
        EAS.ubmobile.phonegap.testURL(
        	EAS.ubmobile.phonegap.parms.startPage, 
        	EAS.ubmobile.phonegap.timeout, 
        	EAS.ubmobile.phonegap.onlineMode,
        	EAS.ubmobile.phonegap.offlineMode
        );
        
    });       
}




CQURLInfo = {
    "contextPath": null,
    "requestPath": '\/content\/mobile\/ubmobile\/offline',
    "selectorString": null,
    "selectors": [],
    "extension": 'html',
    "suffix": null,
    "systemId": 'db2e86cc-caae-4a88-ad10-4ae7be8ef739',
    "runModes": 'publish,prod'
};





          if(EAS && EAS.ubmobile && EAS.ubmobile.analytics){
              if(window.cordova && 'UA-42124796-1'){
                  EAS.ubmobile.analytics.init('UA-42124796-1');
              }
              else{
                  if('UA-28140108-7'){
                      EAS.ubmobile.analytics.init('UA-28140108-7');
                  }
              }
          }
      

$('.list .list-style-teaser img:not(.hi-res)').hiRes();


    
    $(document).off("pageinit.restart"); 
    
    var restartFailed = $("#restartFailed"); 
    
    $(document).one('pageinit', function(e, data){    
		
		if(restartFailed.length == 0){
    		restartFailed = $('<div data-role="popup" id="restartFailed" data-history="false" data-overlay-theme="a" data-theme="d" style="max-width:300px;" class="ui-corner-all "><div data-role="header" data-theme="e" class="ui-corner-top"><h1>Offline Mode</h1></div><div data-role="content" data-theme="d" class="ui-corner-bottom ui-content"><h3 class="ui-title">Failed to connect</h3><p>Your attempt to go online failed.  You are still in offline mode.  At any time, try to connect with the button at top right.</p></div></div>');    
        	var confirm = $('<a href="offline.html#" data-role="button" data-rel="back" data-theme="c">Ok</a>');
        	restartFailed.append(confirm)
        	restartFailed.popup();
			restartFailed.trigger('create');
			header = restartFailed.find("div:jqmData(role='header')");
			header.attr("role", "banner");
			header.addClass('ui-header');
			header.addClass('ui-bar-' + header.attr("data-theme"));
			header.find("*:header").addClass('ui-title');
		}        
    
    });
    /*
    $(document).one('pagebeforeshow', function(e, data){
        
    	if(window.cordova && EAS.ubmobile.phonegap.isAndroid && !EAS.ubmobile.phonegap.isConnected){
            $.mobile.activePage.find("li a[href*='campus-maps.html']").closest("li").hide();
		}
		
    	
    });
	*/
    
    $(document).on('pageinit.restart', function(e, data){
		$(document).one('pagebeforeshow', function(e, data){
		
			var sectionHeader = $('<div class="sectionhead section restart-sectionhead"><ul data-role="listview" data-dividertheme="e"><li data-role="list-divider">You are offline.</li></ul></div>').prependTo($.mobile.activePage.find('div .par.parsys'));
			sectionHeader.trigger("create");
			var restartButton = $('<a href="offline.html#" data-theme="e" data-position-to="window" data-role="button" data-inline="true" data-transition="pop" data-icon="arrow-r" data-iconpos="right" class="ui-btn-right restart-button" >Try online</a>').button().appendTo(sectionHeader.find("li"));
			//$.mobile.activePage.find(".restart-button").css("margin-left", "40px");
			restartButton.click(function(){
                console.log("restartRequested triggered");
                EAS.ubmobile.analytics.trackEvent("mode::offline", "click", "Try Online", 1);
                $(document).trigger("restartRequested");
            });
		});
		
	});
	 
	$(document).bind("offlineToOnlineFailed", function(){
    	console.log("restart from offline to online failed");
    	restartFailed.popup('open');
    });
         
        




CQURLInfo = {
    "contextPath": null,
    "requestPath": '\/content\/mobile\/ubmobile\/offline\/emergency-contacts',
    "selectorString": null,
    "selectors": [],
    "extension": 'html',
    "suffix": null,
    "systemId": 'db2e86cc-caae-4a88-ad10-4ae7be8ef739',
    "runModes": 'publish,prod'
};





          if(EAS && EAS.ubmobile && EAS.ubmobile.analytics){
              if(window.cordova && 'UA-42124796-1'){
                  EAS.ubmobile.analytics.init('UA-42124796-1');
              }
              else{
                  if('UA-28140108-7'){
                      EAS.ubmobile.analytics.init('UA-28140108-7');
                  }
              }
          }
      



CQURLInfo = {
    "contextPath": null,
    "requestPath": '\/content\/mobile\/ubmobile\/offline\/connecting-your-mobile-device',
    "selectorString": null,
    "selectors": [],
    "extension": 'html',
    "suffix": null,
    "systemId": 'db2e86cc-caae-4a88-ad10-4ae7be8ef739',
    "runModes": 'publish,prod'
};





          if(EAS && EAS.ubmobile && EAS.ubmobile.analytics){
              if(window.cordova && 'UA-42124796-1'){
                  EAS.ubmobile.analytics.init('UA-42124796-1');
              }
              else{
                  if('UA-28140108-7'){
                      EAS.ubmobile.analytics.init('UA-28140108-7');
                  }
              }
          }
      

$('.list .list-style-teaser img:not(.hi-res)').hiRes();




CQURLInfo = {
    "contextPath": null,
    "requestPath": '\/content\/mobile\/ubmobile\/offline\/important-ub-contacts',
    "selectorString": null,
    "selectors": [],
    "extension": 'html',
    "suffix": null,
    "systemId": 'db2e86cc-caae-4a88-ad10-4ae7be8ef739',
    "runModes": 'publish,prod'
};





          if(EAS && EAS.ubmobile && EAS.ubmobile.analytics){
              if(window.cordova && 'UA-42124796-1'){
                  EAS.ubmobile.analytics.init('UA-42124796-1');
              }
              else{
                  if('UA-28140108-7'){
                      EAS.ubmobile.analytics.init('UA-28140108-7');
                  }
              }
          }
      



CQURLInfo = {
    "contextPath": null,
    "requestPath": '\/content\/mobile\/ubmobile\/offline\/campus-maps',
    "selectorString": null,
    "selectors": [],
    "extension": 'html',
    "suffix": null,
    "systemId": 'db2e86cc-caae-4a88-ad10-4ae7be8ef739',
    "runModes": 'publish,prod'
};





          if(EAS && EAS.ubmobile && EAS.ubmobile.analytics){
              if(window.cordova && 'UA-42124796-1'){
                  EAS.ubmobile.analytics.init('UA-42124796-1');
              }
              else{
                  if('UA-28140108-7'){
                      EAS.ubmobile.analytics.init('UA-28140108-7');
                  }
              }
          }
      

$('.list .list-style-teaser img:not(.hi-res)').hiRes();



    $(document).one('pagebeforeshow', function(e, data){  
        if(window.cordova && !EAS.ubmobile.phonegap.isConnected){
            if(EAS.ubmobile.phonegap.isAndroid){
                $.mobile.activePage.find("li a[href$='pdf']").closest("li").hide();
            }
            else{
                $.mobile.activePage.find("li a[href$='png']").closest("li").hide();
            }
        }	
    });
    




CQURLInfo = {
    "contextPath": null,
    "requestPath": '\/content\/mobile\/ubmobile\/offline\/connecting-your-mobile-device\/connecting-with-android-os',
    "selectorString": null,
    "selectors": [],
    "extension": 'html',
    "suffix": null,
    "systemId": 'db2e86cc-caae-4a88-ad10-4ae7be8ef739',
    "runModes": 'publish,prod'
};





          if(EAS && EAS.ubmobile && EAS.ubmobile.analytics){
              if(window.cordova && 'UA-42124796-1'){
                  EAS.ubmobile.analytics.init('UA-42124796-1');
              }
              else{
                  if('UA-28140108-7'){
                      EAS.ubmobile.analytics.init('UA-28140108-7');
                  }
              }
          }
      



CQURLInfo = {
    "contextPath": null,
    "requestPath": '\/content\/mobile\/ubmobile\/offline\/connecting-your-mobile-device\/connecting-with-apple-ios',
    "selectorString": null,
    "selectors": [],
    "extension": 'html',
    "suffix": null,
    "systemId": 'db2e86cc-caae-4a88-ad10-4ae7be8ef739',
    "runModes": 'publish,prod'
};





          if(EAS && EAS.ubmobile && EAS.ubmobile.analytics){
              if(window.cordova && 'UA-42124796-1'){
                  EAS.ubmobile.analytics.init('UA-42124796-1');
              }
              else{
                  if('UA-28140108-7'){
                      EAS.ubmobile.analytics.init('UA-28140108-7');
                  }
              }
          }
      

var EAS = EAS || {}

/*
namespace pattern taken from "JavaScript Patterns" by Stoyan Stefanov, page 89

Usage:
    EAS.namespace('EAS.general'); // creates EAS.general namespace
    EAS.namespace('foo.bar.baz'); // creates EAS.foo.bar.baz namespace
    
    // creates and populates EAS.foo.bar
   	(function(self) {
   	    self.abc = ... 
   	})(EAS.namespace('foo.bar'));
   	 
*/
EAS.namespace = EAS.namespace || function (nsString) {
    var parts = nsString.split('.'),
        parent = EAS,
        i;

    /* strip redundant leading global */
    if (parts[0] === 'EAS') {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i++) {
        /* create a property if it doesn't exist */
        if (typeof parent[parts[i]] === 'undefined') {
            parent[parts[i]] = {};
        }

        parent = parent[parts[i]];
    }

    return parent;
};
(function(self) {
    "use strict";

    self.general = {
        AJAX_TIMEOUT: 20000, // milliseconds
        ENTER_KEYCODE: 13
    };
    
    self.temporal = {
        // datetime formats used with the dateformat plugin to jQuery
        LONG_DATETIME_FORMAT: 'MMM d, yyyy h:mm a',
        LONG_DATE_FORMAT: 'ddd MMMM d, yyyy',
        BASIC_TIME_FORMAT: 'hh:mm a',

        // common times that we don't want to recompute
        SECONDS_IN_HOUR: 3600, // 60 * 60
        SECONDS_IN_DAY: 86400, // 60 * 60 * 24
        SECONDS_IN_WEEK: 604800, // 60 * 60 * 24 * 7
        SECONDS_IN_MONTH: 2419200 // 60 * 60 * 24 * 28
    };
    
})(EAS.namespace('constants'));
(function(self) {
	"use strict";

	/**
	 * EAS.common.getQueryParams
	 *
	 * @param {object} url An optional URL to parse. If it is not sent, it will
	 *               default to window.location
	 * @returns an opbject of param keys/values
	 */
	self.getQueryParams = function (url) {
		var resultParts = [];
		var params = {};
		var results, i, resultPartsLength, paramParts;

		if (!url) {
			url = window.location;
		}

		results = url.search;

		// remove the leading "?"
		resultParts = results.substr(1, results.length)
		                     .split('&');

        for (i = 0, resultPartsLength = resultParts.length; i < resultPartsLength; i++) {
        	paramParts = resultParts[i].split('=');
            if (paramParts.length === 2) {
                params[paramParts[0]] = unescape(paramParts[1].replace(/[+]/g, ' '));
            }
        }

		return params;
	};

	/**
	 * EAS.common.getQueryParam
	 *
	 * @param {string} The name of the URL parameter that you want returned.
	 * @returns the value of the param
	 * 
	 */
	self.getQueryParam = function (paramName) {
		var params = self.getQueryParams();
		return params[paramName];
	};

	/**
	 * EAS.common.getStartOfWeek
	 *
	 * @param {Date} A Date object (optional -- defaults to current time)
	 * @returns A date object for the beginning of the week. 
	 * 
	 */
        self.getStartOfWeek = function (date) {
	    var startOfWeek, startDay;

	    if (!date) {
	        date = new Date();
	    }

            startDay = date.getDay();
	    startOfWeek = new Date(date - (((startDay + 6) % 7) * EAS.constants.temporal.SECONDS_IN_DAY * 1000));
	    startOfWeek.setHours(0, 0, 0, 0);

	    return startOfWeek;
	};

	/**
	 * EAS.common.getEndOfWeek
	 *
	 * @param {Date} A Date object (optional -- defaults to current time)
	 * @returns A date object for the end of the week. 
	 * 
	 */
        self.getEndOfWeek = function (date) {
	    var startOfWeek, endOfWeek;

	    if (!date) {
	        date = new Date();
	    }

	    startOfWeek = self.getStartOfWeek(date);

	    endOfWeek = new Date(startOfWeek.getTime() + (EAS.constants.temporal.SECONDS_IN_WEEK * 1000));
	    endOfWeek.setHours(0, 0, 0, 0);

	    return endOfWeek;
	};

	/**
	 * EAS.common.getStartOfMonth
	 *
	 * @param {Date} A Date object (optional -- defaults to current time)
	 * @returns A date object for the beginning of the month. 
	 * 
	 */
        self.getStartOfMonth = function (date) {
	    var startOfMonth;

	    if (!date) {
	        date = new Date();
	    }

	    startOfMonth = new Date(date);
	    startOfMonth.setDate(1);
	    startOfMonth.setHours(0, 0, 0, 0);

	    return startOfMonth;
	};

	/**
	 * EAS.common.getEndOfMonth
	 *
	 * @param {Date} A Date object (optional -- defaults to current time)
	 * @returns A date object for the end of the month. 
	 * 
	 */
        self.getEndOfMonth = function (date) {
	    var endOfMonth;

	    if (!date) {
	        date = new Date();
	    }

	    endOfMonth = new Date(date);
	    endOfMonth.setMonth(endOfMonth.getMonth() + 1); // increment the month so the next line works
	    endOfMonth.setDate(0); // should set to end of previous month
	    endOfMonth.setHours(0, 0, 0, 0);

	    return endOfMonth;
	};

})(EAS.namespace('common'));


(function(D,A){var B=new Date(),C=true,F={},E=function(G){F[G]=F[G]||{cacheTimeout:A.constants.temporal.SECONDS_IN_HOUR*1000,peopleCache:{}};
return F[G]
};
D.widget("mobile.personDetail",D.mobile.widget,{options:{modelKey:"default",person:{}},_create:function(){var G=this;
D.extend(G.options,G.element.data("options"));
G.option("model",E(G.options.modelKey))
},_init:function(){var G=this;
this.element.closest("div:jqmData(role=page)").one("pageshow",function(H){var I=A.common.getQueryParam("username");
if(!G.option("person").name&&!G.option("model").currentPerson){G._findPerson()
}else{if(G.options.person.id!==I){G._findPerson()
}else{if(!G.options.person.name){G.option("person",G.option("model").currentPerson);
G.refresh()
}else{G.refresh()
}}}})
},_setOption:function(G,H){D.Widget.prototype._setOption.apply(this,arguments)
},_handlePersonData:function(I){var G=this,H;
if(I&&I[0]&&I[0].name){H=I[0];
G.option("model").currentPerson=H;
G.option("person",G.options.model.currentPerson);
G.refresh()
}else{A.ubmobile.error("Cannot find person.")
}},_findPerson:function(){var G=this,H=A.common.getQueryParam("username");
if(!H){A.ubmobile.error("You need to search for a person.");
return 
}D.ajax({url:this.option("jsonDataUrl"),dataType:"json",data:{query:H,method:"results",qualifier:"username"},timeout:A.constants.general.AJAX_TIMEOUT,beforeSend:A.ubmobile.ajaxBeforeSend,complete:A.ubmobile.ajaxComplete,error:A.ubmobile.ajaxError,success:function(I){G._handlePersonData(I)
}})
},refresh:function(){C=true;
var I=this,J=I.option("person");
I.element.empty();
var H=D('<div class="ub-person-details-header ui-body ui-body-c ui-corner-all"></div>').appendTo(I.element);
var N=D('<a data-transition="slide">').text(J.department).attr("href",I.option("departmentLink")+J.department);
D('<h2 class="ub-person-name"></h2>').text(J.name).appendTo(H);
D('<div class="ub-person-title"></div>').text(J.title).appendTo(H);
D('<div class="ub-person-department"></div>').append(N).appendTo(H);
if(J.address){D('<div class="ub-person-address"></div>').text(J.address).appendTo(H)
}var K={};
if(J.phone){D.each(J.phone.split(";"),function(Q,P){var R=P,O=R.replace(/\D/g,"");
if(!K[O.substr(-7,7)]){var S=D('<ul data-inset="true" class="ub-person-link"><li><a><span class="label">phone</span><span class="text"></span></a></li></ul>');
S.find(".text").text(R);
S.find("a").attr("href","tel:"+O);
S.appendTo(I.element).listview();
K[O]=true
}})
}if(J.pager){var M=D('<ul data-inset="true" class="ub-person-link"><li><a><span class="label">pager</span><span class="text"></span></a></li></ul>');
M.find(".text").text(J.pager);
M.find("a").attr("href","tel:"+J.pager);
M.appendTo(I.element).listview()
}if(J.fax){var L=D('<ul data-inset="true" class="ub-person-link"><li><span class="label">fax</span><span class="text"></span></li></ul>');
L.find(".text").text(J.fax);
L.appendTo(I.element).listview()
}if(J.email){var G=D('<ul data-role="listview" data-inset="true" class="ub-person-link"><li><a><span class="label">email</span><span class="text"></span></a></li></ul>');
G.find(".text").text(J.email);
G.find("a").attr("href","mailto:"+J.email);
G.appendTo(I.element).listview()
}}});
D.widget("mobile.peopleList",D.mobile.widget,{options:{modelKey:"default",emptyResultClass:"no-results"},_create:function(){var H=this;
var G=D('<form data-transition="slide">').appendTo(this.element);
H.element.one("pageshow",function(M){G.attr("action",D.mobile.path.parseUrl(D.mobile.activePage.data("url")).pathname)
});
var J=D('<div class="searcharea ui-bar-a">').appendTo(G);
var L=D('<div class="searchbox people-search-box">').appendTo(J);
var K=D('<input name="people-search-query" id="people-search-query" data-type="search" data-mini="true" placeholder="Find people" />').appendTo(L).textinput();
D('<a href="#" data-transition="slide" data-role="button" data-icon="search" data-iconpos="notext" class="searchbutton people-search-button">Submit</a>').button().appendTo(L);
D('<p class="tip">Search tip: You can search by part or all of a person&rsquo;s name, email or phone number.</p>').appendTo(J);
var I=D('<div data-role="controlgroup" data-type="horizontal" class="filters">').appendTo(J);
D('<a href="#" class="ui-btn-active" data-role="button">Show All</a>').appendTo(I).button().click(function(M){I.find(".ui-btn").removeClass("ui-btn-active");
D(this).addClass("ui-btn-active");
D("ul#people-search-results").children("li").show();
if(!C){A.ubmobile.analytics.trackEvent("people::filter::click",D(this).text(),K.val(),1)
}else{C=false
}});
D('<a href="#" data-role="button">Faculty/Staff</a>').appendTo(I).button().click(function(M){I.find(".ui-btn").removeClass("ui-btn-active");
D(this).addClass("ui-btn-active");
H._filterCode("staff");
if(!C){A.ubmobile.analytics.trackEvent("people::filter::click",D(this).text(),K.val(),1)
}else{C=false
}});
D('<a href="#" data-role="button">Students</a>').appendTo(I).button().click(function(M){I.find(".ui-btn").removeClass("ui-btn-active");
D(this).addClass("ui-btn-active");
H._filterCode("student");
if(!C){A.ubmobile.analytics.trackEvent("people::filter::click",D(this).text(),K.val(),1)
}else{C=false
}});
D.extend(H.options,H.element.data("options"));
H.option("model",E(H.options.modelKey))
},_init:function(){var G=this;
this.element.closest("div:jqmData(role=page)").one("pageshow",function(H){var J=G.element.find("#people-search-query");
var I=A.common.getQueryParam("people-search-query").trim();
J.val(I);
D("#main-people-search-query").val(J.val());
G.findPeople()
})
},_filterCode:function(G){var H=D("#people-search-results");
H.children("li").show();
H.children("li").filter(":not(."+G+")").hide();
H.children(":jqmData(role=list-divider)").show();
H.children(":jqmData(role=list-divider)").each(function(K,J){var L=D(J),I=L.nextAll(":visible").first();
if(I.length===0||(I.jqmData("role")&&I.jqmData("role")==="list-divider")){L.hide()
}})
},_handlePeopleData:function(I){var G=this;
this.element.find("#people-search-results").remove();
if(I.length===0){G.element.addClass(G.option("emptyResultClass"));
G.element.append('<h2 class="no-results-message">No results found</h2>');
G.element.append('<div class="no-results-message">Try entering another search</div>')
}else{G.element.find(".no-results-message").remove();
G.element.removeClass(G.option("emptyResultClass"));
var H=D('<ul id="people-search-results">').appendTo(this.element).listview({autodividers:true,autodividersSelector:function(J){return J.data("person").last_name.substr(0,1)
}});
D.each(I,function(J,K){var N=D("<li>").addClass(K.affiliation).data("person",K).appendTo(H);
var M=D('<a data-transition="slide">').attr("href",G.option("detailPage")+K.id).text(K.name).appendTo(N).click(function(){G.option("model").currentPerson=K;
D("body").one("pagebeforeshow","div:jqmData(role=page)",function(){var O=D("div:jqmData(role=personDetail)");
O.personDetail("option","person",K);
O.personDetail("refresh")
})
});
var L=D('<span class="title-and-dept">').append(D("<strong>").text(K.title)).appendTo(M);
if(K.department){L.append(" - "+K.department)
}});
H.listview("refresh");
this.element.find("div.filters a.ui-btn-active").click()
}},_findPeopleAjax:function(H){var G=this;
D.ajax({url:this.option("jsonDataUrl"),dataType:"json",data:{query:H,method:"results"},timeout:A.constants.general.AJAX_TIMEOUT,beforeSend:A.ubmobile.ajaxBeforeSend,complete:A.ubmobile.ajaxComplete,error:A.ubmobile.ajaxError,success:function(J){var I=G.option("model").peopleCache;
I[H]=J;
setTimeout(function(){delete I[H]
},G.option("model").cacheTimeout);
G._handlePeopleData(J)
}})
},_findPeopleCached:function(H){var G=this.option("model").peopleCache[H];
if(G){this._handlePeopleData(G);
return true
}return false
},_setOption:function(G,H){D.Widget.prototype._setOption.apply(this,arguments)
},validate:function(G){if(!G||typeof G==="undefined"){throw new Error("You must enter a search term.")
}if(G.length<3){throw ("Your search term must be at least three characters.")
}if(G.indexOf("*")!==-1){throw ("Your search term containts illegal characters.")
}},findPeople:function(){var H=A.common.getQueryParam("people-search-query").trim();
try{this.validate(H)
}catch(G){A.ubmobile.error(G);
return 
}if(!this._findPeopleCached(H)){this._findPeopleAjax(H)
}}});
D(document).on("pagecreate",":jqmData(role=page)",function(G){D(G.target).find(":jqmData(role='peopleList')").peopleList();
D(G.target).find(":jqmData(role='personDetail')").personDetail();
D(this).on("click","a.searchbutton.people-search-button",function(H){D(this).closest("form").submit();
H.preventDefault()
})
})
})(jQuery,EAS);
(function(B){var A=0;
B(document).on("change",".navmenu select",function(){if(A>0){return 
}var D=B(this),C=D.val(),E=B.mobile.path.isExternal(C)&&!B.mobile.path.isPermittedCrossDomainRequest(B.mobile.documentUrl,C);
A++;
try{D.val("").change()
}finally{A--
}if(B.mobile.ajaxEnabled&&!E){B.mobile.changePage(C)
}else{window.setTimeout(function(){window.location=C
},1)
}})
})($);
(function(A){var B=window.devicePixelRatio;
if(B>1){A.fn.hiRes=function(){return this.each(function(){var D=A(this);
if(D.is("img")&&!D.hasClass("hi-res")){var E=D.attr("src");
var C=E.match(/\.img\.(\d+)\.(\d+)/);
if(C){D.attr("src",E.replace(/\.img\.(\d+)\.(\d+)/,".img."+Math.floor(C[1]*B)+"."+Math.floor(C[2]*B)));
D.addClass("hi-res")
}else{var C=E.match(/\.img\.(\d+)/);
if(C){D.attr("src",E.replace(/\.img\.(\d+)/,".img."+Math.floor(C[1]*B)));
D.addClass("hi-res")
}}}})
}
}else{A.fn.hiRes=function(){return this
}
}})(jQuery);
(function(A){A.widget("mobile.datebox",A.mobile.widget,{options:{version:"2-1.1.0-2012062302",theme:false,themeDefault:"c",themeHeader:"a",mode:false,centerHoriz:false,centerVert:false,transition:"pop",useAnimation:true,hideInput:false,hideFixedToolbars:false,lockInput:true,enhanceInput:true,zindex:"500",clickEvent:"vclick",clickEventAlt:"click",resizeListener:true,defaultValue:false,dialogEnable:false,dialogForce:false,useModal:false,useInline:false,useInlineBlind:false,useHeader:true,useImmediate:false,useNewStyle:false,useAltIcon:false,overrideStyleClass:false,useButton:true,useFocus:false,useClearButton:false,useCollapsedBut:false,usePlaceholder:false,openCallback:false,openCallbackArgs:[],closeCallback:false,closeCallbackArgs:[],afterToday:false,beforeToday:false,notToday:false,maxDays:false,minDays:false,maxYear:false,minYear:false,blackDates:false,blackDays:false,minHour:false,maxHour:false,minuteStep:1,minuteStepRound:0,rolloverMode:{m:true,d:true,h:true,i:true,s:true},useLang:"default",lang:{"default":{setDateButtonLabel:"Set Date",setTimeButtonLabel:"Set Time",setDurationButtonLabel:"Set Duration",calTodayButtonLabel:"Jump to Today",titleDateDialogLabel:"Set Date",titleTimeDialogLabel:"Set Time",daysOfWeek:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysOfWeekShort:["Su","Mo","Tu","We","Th","Fr","Sa"],monthsOfYear:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsOfYearShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],durationLabel:["Days","Hours","Minutes","Seconds"],durationDays:["Day","Days"],timeFormat:24,headerFormat:"%A, %B %-d, %Y",tooltip:"Open Date Picker",nextMonth:"Next Month",prevMonth:"Previous Month",dateFieldOrder:["m","d","y"],timeFieldOrder:["h","i","a"],slideFieldOrder:["y","m","d"],dateFormat:"%Y-%m-%d",useArabicIndic:false,isRTL:false,calStartDay:0,clearButton:"Clear",durationOrder:["d","h","i","s"],meridiem:["AM","PM"],timeOutput:"%k:%M",durationFormat:"%Dd %DA, %Dl:%DM:%DS"}}},_enhanceDate:function(){A.extend(this._date.prototype,{copy:function(C,B){if(typeof C==="undefined"){C=[0,0,0,0,0,0,0]
}if(typeof B==="undefined"){B=[0,0,0,0,0,0,0]
}while(C.length<7){C.push(0)
}while(B.length<7){B.push(0)
}return new Date(((B[0]>0)?B[0]:this.getFullYear()+C[0]),((B[1]>0)?B[1]:this.getMonth()+C[1]),((B[2]>0)?B[2]:this.getDate()+C[2]),((B[3]>0)?B[3]:this.getHours()+C[3]),((B[4]>0)?B[4]:this.getMinutes()+C[4]),((B[5]>0)?B[5]:this.getSeconds()+C[5]),((B[6]>0)?B[5]:this.getMilliseconds()+C[6]))
},adj:function(C,B){if(typeof B!=="number"){throw new Error("Adjustment value not specified")
}if(typeof C!=="number"){throw new Error("Adjustment type not specified")
}switch(C){case 0:this.setFullYear(this.getFullYear()+B);
break;
case 1:this.setMonth(this.getMonth()+B);
break;
case 2:this.setDate(this.getDate()+B);
break;
case 3:this.setHours(this.getHours()+B);
break;
case 4:this.setMinutes(this.getMinutes()+B);
break;
case 5:this.setSeconds(this.getSeconds()+B);
break;
case 6:this.setMilliseconds(this.getMilliseconds()+B);
break
}return this
},set:function(C,B){switch(C){case 0:this.setFullYear(B);
break;
case 1:this.setMonth(B);
break;
case 2:this.setDate(B);
break;
case 3:this.setHours(B);
break;
case 4:this.setMinutes(B);
break;
case 5:this.setSeconds(B);
break;
case 6:this.setMilliseconds(B);
break
}return this
},get:function(B){switch(B){case 0:return this.getFullYear();
case 1:return this.getMonth();
case 2:return this.getDate();
case 3:return this.getHours();
case 4:return this.getMinutes();
case 5:return this.getSeconds()
}return false
},iso:function(){return String(this.getFullYear())+"-"+((this.getMonth()<9)?"0":"")+String(this.getMonth()+1)+"-"+((this.getDate()<10)?"0":"")+String(this.getDate())
},comp:function(){return parseInt(this.iso().replace(/-/g,""),10)
},getEpoch:function(){return(this.getTime()-this.getMilliseconds())/1000
},getArray:function(){return[this.getFullYear(),this.getMonth(),this.getDate(),this.getHours(),this.getMinutes(),this.getSeconds()]
},setFirstDay:function(B){this.set(2,1).adj(2,(B-this.getDay()));
if(this.get(2)>10){this.adj(2,7)
}return this
},setWeek:function(C,B){if(C===4){return this.set(1,0).set(2,1).setFirstDay(4).adj(2,-3).adj(2,(B-1)*7)
}return this.set(1,0).set(2,1).setFirstDay(C).adj(2,(B-1)*7)
},getWeek:function(D){var C,B;
switch(D){case 0:C=this.copy([0,-1*this.getMonth()]).setFirstDay(0);
return Math.floor((this.getTime()-C.getTime())/604800000)+1;
case 1:C=this.copy([0,-1*this.getMonth()]).setFirstDay(1);
return Math.floor((this.getTime()-C.getTime())/604800000)+1;
case 4:if(this.getMonth()===11&&this.getDate()>28){return 1
}C=this.copy([0,-1*this.getMonth()],true).setFirstDay(4).adj(2,-3);
B=Math.floor((this.getTime()-C.getTime())/604800000)+1;
if(B<1){C=this.copy([-1,-1*this.getMonth()]).setFirstDay(4).adj(2,-3);
return Math.floor((this.getTime()-C.getTime())/604800000)+1
}return B;
default:return 0
}}})
},_event:function(C,D){var B=A(this).data("datebox");
if(!C.isPropagationStopped()){switch(D.method){case"close":B.close();
break;
case"open":B.open();
break;
case"set":A(this).val(D.value);
A(this).trigger("change");
break;
case"doset":if(A.isFunction(B["_"+B.options.mode+"DoSet"])){B["_"+B.options.mode+"DoSet"].apply(B,[])
}else{A(this).trigger("datebox",{method:"set",value:B._formatter(B.__fmt(),B.theDate),date:B.theDate})
}break;
case"dooffset":if(D.type){B._offset(D.type,D.amount,true)
}break;
case"dorefresh":B.refresh();
break;
case"doreset":B.hardreset();
break;
case"doclear":A(this).val("").trigger("change");
break
}}},_hoover:function(B){A(B).toggleClass("ui-btn-up-"+A(B).jqmData("theme")+" ui-btn-down-"+A(B).jqmData("theme"))
},_ord:{"default":function(C){var B=C%10;
if(C>9&&C<21){return"th"
}if(B>3){return"th"
}return["th","st","nd","rd"][B]
}},__:function(C){var D=this.options,B="override"+C.charAt(0).toUpperCase()+C.slice(1);
if(typeof D[B]!=="undefined"){return D[B]
}if(typeof D.lang[D.useLang][C]!=="undefined"){return D.lang[D.useLang][C]
}if(typeof D[D.mode+"lang"][C]!=="undefined"){return D[D.mode+"lang"][C]
}return D.lang["default"][C]
},__fmt:function(){var B=this,C=this.options;
switch(C.mode){case"timebox":case"timeflipbox":return B.__("timeOutput");
case"durationbox":return B.__("durationFormat");
default:return B.__("dateFormat")
}},_zPad:function(B){return((B<10)?"0"+String(B):String(B))
},_dRep:function(C,E){var D=48,B=57,I=1584,H=null,G=null,F="";
if(E===-1){D+=I;
B+=I;
I=-1584
}for(H=0;
H<C.length;
H++){G=C.charCodeAt(H);
if(G>=D&&G<=B){F=F+String.fromCharCode(G+I)
}else{F=F+String.fromCharCode(G)
}}return F
},_doIndic:function(){var B=this;
B.d.intHTML.find("*").each(function(){if(A(this).children().length<1){A(this).text(B._dRep(A(this).text()))
}else{if(A(this).hasClass("ui-datebox-slideday")){A(this).html(B._dRep(A(this).html()))
}}});
B.d.intHTML.find("input").each(function(){A(this).val(B._dRep(A(this).val()))
})
},_parser:{"default":function(B){return false
}},_n:function(C,B){return(C<0)?B:C
},_pa:function(B,C){if(typeof C==="boolean"){return new this._date(B[0],B[1],B[2],0,0,0,0)
}return new this._date(C.getFullYear(),C.getMonth(),C.getDate(),B[0],B[1],B[2],0)
},_makeDate:function(E){E=A.trim(((this.__("useArabicIndic")===true)?this._dRep(E,-1):E));
var B=this,K=this.options,J=B.__fmt(),C=null,G=[],D=null,L=null,I=new B._date(),F={year:-1,mont:-1,date:-1,hour:-1,mins:-1,secs:-1,week:false,wtyp:4,wday:false,yday:false,meri:0},H;
if(typeof K.mode==="undefined"){return I
}if(typeof B._parser[K.mode]!=="undefined"){return B._parser[K.mode].apply(B,[E])
}if(K.mode==="durationbox"){J=J.replace(/%D([a-z])/gi,function(N,M){switch(M){case"d":case"l":case"M":case"S":return"("+N+"|[0-9]+)";
default:return".+?"
}});
J=new RegExp("^"+J+"$");
C=J.exec(E);
D=J.exec(B.__fmt());
if(C===null||C.length!==D.length){if(typeof K.defaultValue==="number"&&K.defaultValue>0){return new B._date((B.initDate.getEpoch()+parseInt(K.defaultValue,10))*1000)
}return new B._date(B.initDate.getTime())
}L=B.initDate.getEpoch();
for(H=0;
H<C.length;
H++){if(D[H].match(/^%Dd$/i)){L=L+(parseInt(C[H],10)*60*60*24)
}if(D[H].match(/^%Dl$/i)){L=L+(parseInt(C[H],10)*60*60)
}if(D[H].match(/^%DM$/i)){L=L+(parseInt(C[H],10)*60)
}if(D[H].match(/^%DS$/i)){L=L+(parseInt(C[H],10))
}}return new B._date((L*1000))
}J=J.replace(/%(0|-)*([a-z])/gi,function(O,M,N){G.push(N);
switch(N){case"p":case"P":case"b":case"B":return"("+O+"|.+?)";
case"H":case"k":case"I":case"l":case"m":case"M":case"S":case"V":case"U":case"u":case"W":case"d":return"("+O+"|"+((M==="-")?"[0-9]{1,2}":"[0-9]{2}")+")";
case"j":return"("+O+"|[0-9]{3})";
case"s":return"("+O+"|[0-9]+)";
case"g":case"y":return"("+O+"|[0-9]{2})";
case"E":case"G":case"Y":return"("+O+"|[0-9]{1,4})";
default:G.pop();
return".+?"
}});
J=new RegExp("^"+J+"$");
C=J.exec(E);
D=J.exec(B.__fmt());
if(C===null||C.length!==D.length){if(K.defaultValue!==false){switch(typeof K.defaultValue){case"object":if(K.defaultValue.length===3){I=B._pa(K.defaultValue,((K.mode==="timebox"||K.mode==="timeflipbox")?I:false))
}break;
case"number":I=new B._date(K.defaultValue*1000);
break;
case"string":if(K.mode==="timebox"||K.mode==="timeflipbox"){L=K.defaultValue.split(":");
if(L.length===3){I=B._pa([L[0],L[1],L[2]],I)
}}else{L=K.defaultValue.split("-");
if(L.length===3){I=B._pa([L[0],L[1]-1,L[2]],false)
}}break
}}if(isNaN(I.getDate())){I=new B._date()
}}else{for(H=1;
H<C.length;
H++){switch(G[H-1]){case"s":return new B._date(parseInt(C[H],10)*1000);
case"Y":case"G":F.year=parseInt(C[H],10);
break;
case"E":F.year=parseInt(C[H],10)-543;
break;
case"y":case"g":if(K.afterToday===true||parseInt(C[H],10)<38){F.year=parseInt("20"+C[H],10)
}else{F.year=parseInt("19"+C[H],10)
}break;
case"m":F.mont=parseInt(C[H],10)-1;
break;
case"d":F.date=parseInt(C[H],10);
break;
case"H":case"k":case"I":case"l":F.hour=parseInt(C[H],10);
break;
case"M":F.mins=parseInt(C[H],10);
break;
case"S":F.secs=parseInt(C[H],10);
break;
case"u":F.wday=parseInt(C[H],10)-1;
break;
case"w":F.wday=parseInt(C[H],10);
break;
case"j":F.yday=parseInt(C[H],10);
break;
case"V":F.week=parseInt(C[H],10);
F.wtyp=4;
break;
case"U":F.week=parseInt(C[H],10);
F.wtyp=0;
break;
case"W":F.week=parseInt(C[H],10);
F.wtyp=1;
break;
case"p":case"P":F.meri=((C[H].toLowerCase()===B.__("meridiem")[0].toLowerCase())?-1:1);
break;
case"b":L=A.inArray(C[H],B.__("monthsOfYearShort"));
if(L>-1){F.mont=L
}break;
case"B":L=A.inArray(C[H],B.__("monthsOfYear"));
if(L>-1){F.mont=L
}break
}}if(F.meri!==0){if(F.meri===-1&&F.hour===12){F.hour=0
}if(F.meri===1&&F.hour!==12){F.hour=F.hour+12
}}I=new B._date(B._n(F.year,1),B._n(F.mont,1),B._n(F.date,1),B._n(F.hour,0),B._n(F.mins,0),B._n(F.secs,0),0);
if(F.year<100&&F.year!==-1){I.setFullYear(F.year)
}if((F.mont>-1&&F.date>-1)||(F.hour>-1&&F.mins>-1&&F.secs>-1)){return I
}if(F.week!==false){I.setWeek(F.wtyp,F.week);
if(F.date>-1){I.setDate(F.date)
}}if(F.yday!==false){I.set(1,0).set(2,1).adj(2,(F.yday-1))
}if(F.wday!==false){I.adj(2,(F.wday-I.getDay()))
}}return I
},_customformat:{"default":function(C,B){return false
}},_formatter:function(D,G){var B=this,C=this.options,F,E={part:[0,0,0,0],tp:0};
if(C.mode==="durationbox"){E.tp=this.theDate.getEpoch()-this.initDate.getEpoch();
E.part[0]=parseInt(E.tp/(60*60*24),10);
E.tp-=(E.part[0]*60*60*24);
E.part[1]=parseInt(E.tp/(60*60),10);
E.tp-=(E.part[1]*60*60);
E.part[2]=parseInt(E.tp/(60),10);
E.tp-=(E.part[2]*60);
E.part[3]=E.tp;
if(!D.match(/%Dd/)){E.part[1]+=(E.part[0]*24)
}if(!D.match(/%Dl/)){E.part[2]+=(E.part[1]*60)
}if(!D.match(/%DM/)){E.part[3]+=(E.part[2]*60)
}}D=D.replace(/%(D|X|0|-)*([1-9a-zA-Z])/g,function(J,I,H){if(I==="X"){if(typeof B._customformat[C.mode]!=="undefined"){return B._customformat[C.mode](H,G)
}return J
}if(I==="D"){switch(H){case"d":return E.part[0];
case"l":return B._zPad(E.part[1]);
case"M":return B._zPad(E.part[2]);
case"S":return B._zPad(E.part[3]);
case"A":return((E.part[0]>1)?B.__("durationDays")[1]:B.__("durationDays")[0]);
default:return J
}}switch(H){case"%":return"%";
case"a":return B.__("daysOfWeekShort")[G.getDay()];
case"A":return B.__("daysOfWeek")[G.getDay()];
case"b":return B.__("monthsOfYearShort")[G.getMonth()];
case"B":return B.__("monthsOfYear")[G.getMonth()];
case"C":return G.getFullYear().toString().substr(0,2);
case"d":return((I==="-")?G.getDate():B._zPad(G.getDate()));
case"H":case"k":return((I==="-")?G.getHours():B._zPad(G.getHours()));
case"I":case"l":return((I==="-")?((G.getHours()===0||G.getHours()===12)?12:((G.getHours()<12)?G.getHours():(G.getHours()-12))):B._zPad(((G.getHours()===0||G.getHours()===12)?12:((G.getHours()<12)?G.getHours():G.getHours()-12))));
case"m":return((I==="-")?G.getMonth()+1:B._zPad(G.getMonth()+1));
case"M":return((I==="-")?G.getMinutes():B._zPad(G.getMinutes()));
case"p":return((G.getHours()<12)?B.__("meridiem")[0].toUpperCase():B.__("meridiem")[1].toUpperCase());
case"P":return((G.getHours()<12)?B.__("meridiem")[0].toLowerCase():B.__("meridiem")[1].toLowerCase());
case"s":return G.getEpoch();
case"S":return((I==="-")?G.getSeconds():B._zPad(G.getSeconds()));
case"u":return((I==="-")?G.getDay()+1:B._zPad(G.getDay()+1));
case"w":return G.getDay();
case"y":return G.getFullYear().toString().substr(2,2);
case"Y":return G.getFullYear();
case"E":return G.getFullYear()+543;
case"V":return((I==="-")?G.getWeek(4):B._zPad(G.getWeek(4)));
case"U":return((I==="-")?G.getWeek(0):B._zPad(G.getWeek(0)));
case"W":return((I==="-")?G.getWeek(1):B._zPad(G.getWeek(1)));
case"o":if(typeof B._ord[C.useLang]!=="undefined"){return B._ord[C.useLang](G.getDate())
}return B._ord["default"](G.getDate());
case"j":F=new Date(G.getFullYear(),0,1);
F=Math.ceil((G-F)/86400000)+1;
return((F<100)?((F<10)?"00":"0"):"")+String(F);
case"G":if(G.getWeek(4)===1&&G.getMonth()>0){return G.getFullYear()+1
}if(G.getWeek(4)>51&&G.getMonth()<11){return G.getFullYear()-1
}return G.getFullYear();
case"g":if(G.getWeek(4)===1&&G.getMonth()>0){return parseInt(G.getFullYear().toString().substr(2,2),10)+1
}if(G.getWeek(4)>51&&G.getMonth()<11){return parseInt(G.getFullYear().toString().substr(2,2),10)-1
}return G.getFullYear().toString().substr(2,2);
default:return J
}});
if(B.__("useArabicIndic")===true){D=B._dRep(D)
}return D
},_btwn:function(C,B,D){return(C>B&&C<D)
},_minStepFix:function(){var D=this.theDate.get(4),E,B=this,C=this.options;
if(C.minuteStep>1&&D%C.minuteStep>0){if(C.minuteStepRound<0){D=D-(D%C.minuteStep)
}else{if(C.minStepRound>0){D=D+(C.minuteStep-(D%C.minuteStep))
}else{if(D%C.minuteStep<C.minuteStep/2){D=D-(D%C.minuteStep)
}else{D=D+(C.minuteStep-(D%C.minuteStep))
}}}B.theDate.setMinutes(D)
}},_offset:function(D,F,C){var B=this,E=this.options,G=false;
D=(D||"").toLowerCase();
if(typeof (C)==="undefined"){C=true
}B.d.input.trigger("datebox",{method:"offset",type:D,amount:F});
if(D!=="a"&&(typeof E.rolloverMode[D]==="undefined"||E.rolloverMode[D]===true)){G=A.inArray(D,["y","m","d","h","i","s"])
}else{switch(D){case"y":G=0;
break;
case"m":if(B._btwn(B.theDate.getMonth()+F,-1,12)){G=1
}break;
case"d":if(B._btwn(B.theDate.getDate()+F,0,(32-B.theDate.copy([0],[0,0,32,13]).getDate()+1))){G=2
}break;
case"h":if(B._btwn(B.theDate.getHours()+F,-1,24)){G=3
}break;
case"i":if(B._btwn(B.theDate.getMinutes()+F,-1,60)){G=4
}break;
case"s":if(B._btwn(B.theDate.getSeconds()+F,-1,60)){G=5
}break;
case"a":B._offset("h",((F>0)?1:-1)*12,false);
break
}}if(G!==false){B.theDate.adj(G,F)
}if(C===true){B.refresh()
}if(E.useImmediate){B.d.input.trigger("datebox",{method:"doset"})
}},_create:function(){A(document).trigger("dateboxcreate");
var B=this,D=A.extend(this.options,(typeof this.element.jqmData("options")!=="undefined")?this.element.jqmData("options"):this._getLongOptions(this.element)),I=(D.theme===false&&typeof (A(this).jqmData("theme"))==="undefined")?((typeof (this.element.parentsUntil(":jqmData(theme)").parent().jqmData("theme"))==="undefined")?D.themeDefault:this.element.parentsUntil(":jqmData(theme)").parent().jqmData("theme")):D.theme,H=D.useAnimation?D.transition:"none",E=D.useNewStyle===false?{input:this.element,wrap:this.element.wrap('<div class="ui-input-datebox ui-shadow-inset ui-corner-all '+(this.element.jqmData("mini")===true?"ui-mini ":"")+"ui-body-"+I+'"></div>').parent(),mainWrap:A("<div>",{"class":"ui-datebox-container ui-overlay-shadow ui-corner-all ui-datebox-hidden "+H+" ui-body-"+I}).css("zIndex",D.zindex),intHTML:false}:{input:this.element,wrap:this.element,mainWrap:A("<div>",{"class":"ui-datebox-container ui-overlay-shadow ui-corner-all ui-datebox-hidden "+H+" ui-body-"+I}).css("zIndex",D.zindex),intHTML:false},C=(typeof window.ontouchstart!=="undefined"),F={eStart:(C?"touchstart":"mousedown")+".datebox",eMove:(C?"touchmove":"mousemove")+".datebox",eEnd:(C?"touchend":"mouseup")+".datebox",eEndA:(C?"mouseup.datebox touchend.datebox touchcancel.datebox touchmove.datebox":"mouseup.datebox"),move:false,start:false,end:false,pos:false,target:false,delta:false,tmp:false},G=(typeof A.mobile.ns!=="undefined")?A.mobile.ns:"";
A.extend(B,{d:E,ns:G,drag:F,touch:C});
if(D.usePlaceholder!==false){if(D.usePlaceholder===true&&B._grabLabel()!==false){B.d.input.attr("placeholder",B._grabLabel())
}if(typeof D.usePlaceholder==="string"){B.d.input.attr("placeholder",D.usePlaceholder)
}}D.theme=I;
B.clearFunc=false;
B.disabled=false;
B.runButton=false;
B._date=window.Date;
B._enhanceDate();
B.initDate=new B._date();
B.theDate=(D.defaultValue)?B._makeDate(D.defaultValue):new B._date();
B.initDone=false;
if(D.useButton===true&&D.useInline===false&&D.useNewStyle===false){B.d.open=A('<a href="#" class="ui-input-clear" title="'+this.__("tooltip")+'">'+this.__("tooltip")+"</a>").on(D.clickEvent,function(J){J.preventDefault();
if(!B.disabled){B.d.input.trigger("datebox",{method:"open"});
B.d.wrap.addClass("ui-focus")
}setTimeout(function(){A(J.target).closest("a").removeClass(A.mobile.activeBtnClass)
},300)
}).appendTo(B.d.wrap).buttonMarkup({icon:"grid",iconpos:"notext",corners:true,shadow:true}).css({"vertical-align":"middle",display:"inline-block"})
}B.d.screen=A("<div>",{"class":"ui-datebox-screen ui-datebox-hidden"+((D.useModal)?" ui-datebox-screen-modal":"")}).css({"z-index":D.zindex-1}).on(D.clickEventAlt,function(J){J.preventDefault();
B.d.input.trigger("datebox",{method:"close"})
});
if(D.enhanceInput===true&&navigator.userAgent.match(/Android/i)){B.inputType="number"
}else{B.inputType="text"
}if(D.hideInput){B.d.wrap.hide()
}A("label[for='"+B.d.input.attr("id")+"']").addClass("ui-input-text").css("verticalAlign","middle");
B.d.wrap.on(D.clickEvent,function(){if(!B.disabled&&(D.noButtonFocusMode||D.focusMode)){B.d.input.trigger("datebox",{method:"open"});
B.d.wrap.addClass("ui-focus");
B.d.input.removeClass("ui-focus")
}});
B.d.input.removeClass("ui-corner-all ui-shadow-inset").bind(B.touch?"touchend":"click",function(J){if(B.disabled===false&&D.useNewStyle===true&&D.useFocus===false){if(((B.touch?J.originalEvent.changedTouches[0].pageX:J.pageX)-J.target.offsetLeft)>(J.target.offsetWidth-20)){B.d.input.trigger("datebox",{method:"open"});
B.d.wrap.addClass("ui-focus")
}}}).focus(function(){if(B.disabled===false&&D.useFocus===true){B.d.input.trigger("datebox",{method:"open"});
B.d.wrap.addClass("ui-focus")
}if(D.useNewStyle===false){B.d.input.removeClass("ui-focus")
}}).blur(function(){B.d.wrap.removeClass("ui-focus");
B.d.input.removeClass("ui-focus")
}).change(function(){B.theDate=B._makeDate(B.d.input.val());
B.refresh()
}).attr("readonly",D.lockInput).on("datebox",B._event);
if(D.useNewStyle===true){B.d.input.addClass("ui-shadow-inset ui-corner-all "+((D.useAltIcon===true)?"ui-icon-datebox-alt":"ui-icon-datebox"));
if(D.overrideStyleClass!==false){B.d.input.addClass(D.overrideStyleClass)
}}if(typeof A.event.special.mousewheel!=="undefined"){B.wheelExists=true
}if(B.d.input.is(":disabled")){B.disable()
}if(D.useInline===true||D.useInlineBlind){B.open()
}A(document).trigger("dateboxaftercreate")
},_build:{"default":function(){this.d.headerText="Error";
this.d.intHTML=A("<div class='ui-body-e'><h2 style='text-align:center'>There is no mode by that name loaded / mode not given</h2></div>")
}},_applyCoords:function(E){var B=E.widget,D=E.widget.options,G={h:A.mobile.activePage.find(".ui-header").jqmData("position"),f:A.mobile.activePage.find(".ui-footer").jqmData("position"),fh:A.mobile.activePage.find(".ui-footer").outerHeight(),hh:A.mobile.activePage.find(".ui-header").outerHeight()},I={x:B.d.wrap.offset().left+(B.d.wrap.outerWidth()/2),y:B.d.wrap.offset().top+(B.d.wrap.outerHeight()/2)},H={w:B.d.mainWrap.outerWidth(),h:B.d.mainWrap.outerHeight()},F={t:A(window).scrollTop(),h:A(window).height(),w:A.mobile.activePage.width(),ah:A(document).height()},C={y:(D.centerVert)?F.t+((F.h/2)-(H.h/2)):I.y-(H.h/2),x:(F.w<400||D.centerHoriz)?(F.w/2)-(H.w/2):I.x-(H.w/2)};
if(D.centerVert===false){if(D.hideFixedToolbars===true&&(typeof G.f!=="undefined"||typeof G.h!=="undefined")){A.mobile.activePage.find(":jqmData(position='fixed')").fixedtoolbar("hide");
G.f=undefined;
G.h=undefined
}if(typeof G.f!=="undefined"){if((C.y+H.h)>(F.h-G.fh-2)){C.y=F.h-G.fh-2-H.h
}}else{if((C.y+H.h)>(F.ah-G.fh-2)){C.y=F.ah-G.fh-2-H.h
}if((F.h+F.t)<(H.h+C.y+2)){C.y=F.h+F.t-H.h-2
}}if(typeof G.h!=="undefined"){if((F.t+G.hh+2)>C.y){C.y=F.t+G.hh+2
}}else{if(G.hh+2>C.y){C.y=G.hh+2
}if(C.y<F.t+2){C.y=F.t+2
}}}B.d.mainWrap.css({position:"absolute",top:C.y,left:C.x})
},_drag:{"default":function(){return false
}},open:function(){var B=this,C=this.options,D="data-"+this.ns,E=C.useAnimation?C.transition:"none";
if(C.useFocus===true&&B.fastReopen===true){B.d.input.blur();
return false
}if(B.clearFunc!==false){clearTimeout(B.clearFunc);
B.clearFunc=false
}if(C.openCallback!==false){if(!A.isFunction(C.openCallback)){if(typeof window[C.openCallback]!=="undefined"){C.openCallback=window[C.openCallback]
}else{C.openCallback=new Function(C.openCallback)
}}if(C.openCallback.apply(B,A.merge([B.theDate],C.openCallbackArgs))===false){return false
}}B.theDate=B._makeDate(B.d.input.val());
B.d.input.blur();
if(typeof B._build[C.mode]==="undefined"){B._build["default"].apply(B,[])
}else{B._build[C.mode].apply(B,[])
}if(typeof B._drag[C.mode]!=="undefined"){B._drag[C.mode].apply(B,[])
}B.d.input.trigger("datebox",{method:"refresh"});
if(B.__("useArabicIndic")===true){B._doIndic()
}if((C.useInline===true||C.useInlineBlind===true)&&B.initDone===false){B.d.mainWrap.append(B.d.intHTML);
B.d.input.parent().parent().append(B.d.mainWrap);
B.d.mainWrap.removeClass("ui-datebox-hidden");
if(C.useInline===true){B.d.mainWrap.addClass("ui-datebox-inline")
}else{B.d.mainWrap.addClass("ui-datebox-inlineblind");
B.d.mainWrap.hide()
}B.initDone=false;
B.d.input.trigger("datebox",{method:"postrefresh"})
}if(C.useImmediate){B.d.input.trigger("datebox",{method:"doset"})
}if(C.useInline){return true
}if(C.useInlineBlind){if(B.initDone){B.d.mainWrap.slideDown()
}else{B.initDone=true
}return true
}if(B.d.intHTML.is(":visible")){return false
}if(C.dialogForce||(C.dialogEnable&&window.width()<400)){B.d.dialogPage=A("<div "+D+"role='dialog' "+D+"theme='"+C.theme+"' ><div "+D+"role='header' "+D+"theme='"+C.themeHeader+"'><h1>"+B.d.headerText+"</h1></div><div "+D+"role='content'></div>").appendTo(A.mobile.pageContainer).page().css("minHeight","0px").addClass(E);
B.d.dialogPage.find(".ui-header").find("a").off("click vclick").on(C.clickEventAlt,function(F){F.preventDefault();
B.d.input.trigger("datebox",{method:"close"})
});
B.d.mainWrap.append(B.d.intHTML).css({marginLeft:"auto",marginRight:"auto"}).removeClass("ui-datebox-hidden");
B.d.dialogPage.find(".ui-content").append(B.d.mainWrap);
B.d.input.trigger("datebox",{method:"postrefresh"});
A.mobile.activePage.off("pagehide.remove");
A.mobile.changePage(B.d.dialogPage,{transition:E})
}else{B.d.dialogPage=false;
B.d.mainWrap.empty();
if(C.useHeader===true){B.d.headHTML=A('<div class="ui-header ui-bar-'+C.themeHeader+'"></div>');
A("<a class='ui-btn-left' href='#'>Close</a>").appendTo(B.d.headHTML).buttonMarkup({theme:C.themeHeader,icon:"delete",iconpos:"notext",corners:true,shadow:true}).on(C.clickEventAlt,function(F){F.preventDefault();
B.d.input.trigger("datebox",{method:"close"})
});
A('<h1 class="ui-title">'+B.d.headerText+"</h1>").appendTo(B.d.headHTML);
B.d.mainWrap.append(B.d.headHTML)
}B.d.mainWrap.append(B.d.intHTML).css("zIndex",C.zindex);
B.d.mainWrap.appendTo(A.mobile.activePage);
B.d.screen.appendTo(A.mobile.activePage);
B.d.input.trigger("datebox",{method:"postrefresh"});
B._applyCoords({widget:B});
if(C.useModal===true){if(C.useAnimation){B.d.screen.fadeIn("slow")
}else{B.d.screen.show()
}}else{setTimeout(function(){B.d.screen.removeClass("ui-datebox-hidden")
},500)
}B.d.mainWrap.addClass("ui-overlay-shadow in").removeClass("ui-datebox-hidden");
A(document).on("orientationchange.datebox",{widget:B},function(F){B._applyCoords(F.data)
});
if(C.resizeListener===true){A(window).on("resize.datebox",{widget:B},function(F){B._applyCoords(F.data)
})
}}},close:function(){var B=this,C=this.options;
if(C.useInlineBlind===true){B.d.mainWrap.slideUp();
return true
}if(C.useInline===true){return true
}if(B.d.dialogPage!==false){A(B.d.dialogPage).dialog("close");
if(!A.mobile.activePage.jqmData("page").options.domCache){A.mobile.activePage.on("pagehide.remove",function(){A(this).remove()
})
}B.d.intHTML.detach().empty();
B.d.mainWrap.detach().empty();
B.d.wrap.removeClass("ui-focus");
B.clearFunc=setTimeout(function(){B.d.dialogPage.empty().remove();
B.clearFunc=false
},1500)
}else{if(C.useModal){if(C.useAnimation){B.d.screen.fadeOut("slow")
}else{B.d.screen.hide()
}}else{B.d.screen.addClass("ui-datebox-hidden")
}B.d.screen.detach();
B.d.mainWrap.addClass("ui-datebox-hidden").removeAttr("style").removeClass("in ui-overlay-shadow").empty().detach();
B.d.intHTML.detach();
B.d.wrap.removeClass("ui-focus");
A(document).off("orientationchange.datebox");
if(C.resizeListener===true){A(window).off("resize.datebox")
}}A(document).off(B.drag.eMove);
A(document).off(B.drag.eEnd);
A(document).off(B.drag.eEndA);
if(C.useFocus){B.fastReopen=true;
setTimeout(function(D){return function(){D.fastReopen=false
}
}(B),300)
}if(C.closeCallback!==false){if(!A.isFunction(C.closeCallback)){if(typeof window[C.closeCallback]!=="undefined"){C.closeCallback=window[C.closeCallback]
}else{C.closeCallback=new Function(C.closeCallback)
}}C.closeCallback.apply(B,A.merge([B.theDate],C.closeCallbackArgs))
}},refresh:function(){if(typeof this._build[this.options.mode]==="undefined"){this._build["default"].apply(this,[])
}else{this._build[this.options.mode].apply(this,[])
}if(this.__("useArabicIndic")===true){this._doIndic()
}this.d.mainWrap.append(this.d.intHTML);
this.d.input.trigger("datebox",{method:"postrefresh"})
},_check:function(){var B=this,C=null,D=this.options;
B.dateOK=true;
if(D.afterToday!==false){C=new B._date();
if(B.theDate<C){B.theDate=C
}}if(D.beforeToday!==false){C=new B._date();
if(B.theDate>C){B.theDate=C
}}if(D.maxDays!==false){C=new B._date();
C.adj(2,D.maxDays);
if(B.theDate>C){B.theDate=C
}}if(D.minDays!==false){C=new B._date();
C.adj(2,-1*D.minDays);
if(B.theDate<C){B.theDate=C
}}if(D.minHour!==false){if(B.theDate.getHours()<D.minHour){B.theDate.setHours(D.minHour)
}}if(D.maxHour!==false){if(B.theDate.getHours()>D.maxHour){B.theDate.setHours(D.maxHour)
}}if(D.maxYear!==false){C=new B._date(D.maxYear,0,1);
C.adj(2,-1);
if(B.theDate>C){B.theDate=C
}}if(D.minYear!==false){C=new B._date(D.minYear,0,1);
if(B.theDate<C){B.theDate=C
}}if(A.inArray(D.mode,["timebox","durationbox","timeflipbox"])>-1){if(D.mode==="timeflipbox"&&D.validHours!==false){if(A.inArray(B.theDate.getHours(),D.validHours)<0){B.dateOK=false
}}}else{if(D.blackDates!==false){if(A.inArray(B.theDate.iso(),D.blackDates)>-1){B.dateOK=false
}}if(D.blackDays!==false){if(A.inArray(B.theDate.getDay(),D.blackDays)>-1){B.dateOK=false
}}}},_grabLabel:function(){var B=this,C=this.options;
if(typeof C.overrideDialogLabel==="undefined"){if(typeof B.d.input.attr("title")!=="undefined"){return B.d.input.attr("title")
}if(B.d.wrap.parent().find("label[for="+B.d.input.attr("id")+"]").text()!==""){return B.d.wrap.parent().find("label[for="+B.d.input.attr("id")+"]").text()
}return false
}return C.overrideDialogLabel
},_makeEl:function(D,C){var B=false,E=false;
E=D.clone();
if(typeof C.attr!=="undefined"){for(B in C.attr){if(C.attr.hasOwnProperty(B)){E.jqmData(B,C.attr[B])
}}}return E
},_getLongOptions:function(E){var F,D={},C,B;
if(A.mobile.ns===""){C="datebox"
}else{C=A.mobile.ns.substr(0,A.mobile.ns.length-1)+"Datebox"
}for(F in E.data()){if(F.substr(0,C.length)===C&&F.length>C.length){B=F.substr(C.length);
B=B.charAt(0).toLowerCase()+B.slice(1);
D[B]=E.data(F)
}}return D
},disable:function(){this.d.input.attr("disabled",true);
this.d.wrap.addClass("ui-disabled").blur();
this.disabled=true;
this.d.input.trigger("datebox",{method:"disable"})
},enable:function(){this.d.input.attr("disabled",false);
this.d.wrap.removeClass("ui-disabled");
this.disabled=false;
this.d.input.trigger("datebox",{method:"enable"})
},_setOption:function(){A.Widget.prototype._setOption.apply(this,arguments);
this.refresh()
}});
A(document).on("pagebeforecreate",function(B){A(":jqmData(role='datebox')",B.target).each(function(){A(this).prop("type","text")
})
});
A(document).on("pagecreate create",function(B){A(document).trigger("dateboxbeforecreate");
A(":jqmData(role='datebox')",B.target).each(function(){if(typeof (A(this).data("datebox"))==="undefined"){A(this).datebox()
}})
})
})(jQuery);
(function(A){A.extend(A.mobile.datebox.prototype.options,{themeDateToday:"a",themeDayHigh:"e",themeDatePick:"a",themeDateHigh:"e",themeDateHighAlt:"e",themeDate:"d",calHighToday:true,calHighPick:true,calShowDays:true,calOnlyMonth:false,calWeekMode:false,calWeekModeDay:1,calWeekHigh:false,calControlGroup:false,calShowWeek:false,calUsePickers:false,calNoHeader:false,useTodayButton:false,useCollapsedBut:false,highDays:false,highDates:false,highDatesAlt:false,enableDates:false});
A.extend(A.mobile.datebox.prototype,{_cal_gen:function(K,I,C,F,G){var M=0,J=0,D=1,H=1,L=[],B=[],E=false;
for(M=0;
M<=5;
M++){if(E===false){B=[];
for(J=0;
J<=6;
J++){if(M===0&&J<K){if(F===true){B.push([I+(J-K)+1,G-1])
}else{B.push(false)
}}else{if(M>3&&D>C){if(F===true){B.push([H,G+1]);
H++
}else{B.push(false)
}E=true
}else{B.push([D,G]);
D++;
if(D>C){E=true
}}}}L.push(B)
}}return L
},_cal_check:function(D,F,E,G){var B=this,C=this.options,H={},I=new this._date(F,E,G,0,0,0,0).getDay();
H.ok=true;
H.iso=F+"-"+B._zPad(E+1)+"-"+B._zPad(G);
H.comp=parseInt(H.iso.replace(/-/g,""),10);
H.theme=C.themeDate;
if(A.isArray(C.enableDates)&&A.inArray(H.iso,C.enableDates)<0){H.ok=false
}else{if(D.checkDates){if((C.afterToday===true&&D.thisDate.comp()>H.comp)||(C.beforeToday===true&&D.thisDate.comp()<H.comp)||(C.notToday===true&&D.thisDate.comp()===H.comp)||(C.maxDays!==false&&D.maxDate.comp()<H.comp)||(C.minDays!==false&&D.minDate.comp()>H.comp)||(A.isArray(C.blackDays)&&A.inArray(I,C.blackDays)>-1)||(A.isArray(C.blackDates)&&A.inArray(H.iso,C.blackDates)>-1)){H.ok=false
}}}if(H.ok){if(C.calHighPick&&G===D.presetDay){H.theme=C.themeDatePick
}else{if(C.calHighToday&&H.comp===D.thisDate.comp()){H.theme=C.themeDateToday
}else{if(A.isArray(C.highDatesAlt)&&(A.inArray(H.iso,C.highDatesAlt)>-1)){H.theme=C.themeDateHighAlt
}else{if(A.isArray(C.highDates)&&(A.inArray(H.iso,C.highDates)>-1)){H.theme=C.themeDateHigh
}else{if(A.isArray(C.highDays)&&(A.inArray(I,C.highDays)>-1)){H.theme=C.themeDayHigh
}}}}}}return H
}});
A.extend(A.mobile.datebox.prototype._build,{calbox:function(){var E=this,J=this.options,H,K=false,G="ui-datebox-",C=false,B=false,I=false,D=false,F=false;
if(typeof E.d.intHTML!=="boolean"){E.d.intHTML.remove()
}E.d.headerText=((E._grabLabel()!==false)?E._grabLabel():E.__("titleDateDialogLabel"));
E.d.intHTML=A("<span>");
A('<div class="'+G+'gridheader"><div class="'+G+'gridlabel"><h4>'+E.__("monthsOfYear")[E.theDate.getMonth()]+" "+E.theDate.getFullYear()+"</h4></div></div>").appendTo(E.d.intHTML);
A("<div class='"+G+"gridplus"+(E.__("isRTL")?"-rtl":"")+"'><a href='#'>"+E.__("nextMonth")+"</a></div>").prependTo(E.d.intHTML.find("."+G+"gridheader")).buttonMarkup({theme:J.themeDate,icon:"arrow-r",inline:true,iconpos:"notext",corners:true,shadow:true}).on(J.clickEventAlt,function(L){L.preventDefault();
if(E.calNext){if(E.theDate.getDate()>28){E.theDate.setDate(1)
}E._offset("m",1)
}});
A("<div class='"+G+"gridminus"+(E.__("isRTL")?"-rtl":"")+"'><a href='#'>"+E.__("prevMonth")+"</a></div>").prependTo(E.d.intHTML.find("."+G+"gridheader")).buttonMarkup({theme:J.themeDate,icon:"arrow-l",inline:true,iconpos:"notext",corners:true,shadow:true}).on(J.clickEventAlt,function(L){L.preventDefault();
if(E.calPrev){if(E.theDate.getDate()>28){E.theDate.setDate(1)
}E._offset("m",-1)
}});
if(J.calNoHeader===true){E.d.intHTML.find("."+G+"gridheader").remove()
}K={today:-1,highlightDay:-1,presetDay:-1,startDay:E.__("calStartDay"),thisDate:new E._date(),maxDate:E.initDate.copy(),minDate:E.initDate.copy(),currentMonth:false,weekMode:0,weekDays:null};
K.start=(E.theDate.copy([0],[0,0,1]).getDay()-E.__("calStartDay")+7)%7;
K.thisMonth=E.theDate.getMonth();
K.thisYear=E.theDate.getFullYear();
K.wk=E.theDate.copy([0],[0,0,1]).adj(2,(-1*K.start)+(E.__("calStartDay")===0?1:0)).getWeek(4);
K.end=32-E.theDate.copy([0],[0,0,32,13]).getDate();
K.lastend=32-E.theDate.copy([0,-1],[0,0,32,13]).getDate();
K.presetDate=E._makeDate(E.d.input.val());
K.thisDateArr=K.thisDate.getArray();
K.theDateArr=E.theDate.getArray();
K.checkDates=(A.inArray(false,[J.afterToday,J.beforeToday,J.notToday,J.maxDays,J.minDays,J.blackDates,J.blackDays])>-1);
E.calNext=true;
E.calPrev=true;
if(K.thisDateArr[0]===K.theDateArr[0]&&K.thisDateArr[1]===K.theDateArr[1]){K.currentMonth=true
}if(K.presetDate.comp()===E.theDate.comp()){K.presetDay=K.presetDate.getDate()
}if(J.afterToday===true&&(K.currentMonth===true||(K.thisDateArr[1]>=K.theDateArr[1]&&K.theDateArr[0]===K.thisDateArr[0]))){E.calPrev=false
}if(J.beforeToday===true&&(K.currentMonth===true||(K.thisDateArr[1]<=K.theDateArr[1]&&K.theDateArr[0]===K.thisDateArr[0]))){E.calNext=false
}if(J.minDays!==false){K.minDate.adj(2,-1*J.minDays);
if(K.theDateArr[0]===K.minDate.getFullYear()&&K.theDateArr[1]<=K.minDate.getMonth()){E.calPrev=false
}}if(J.maxDays!==false){K.maxDate.adj(2,J.maxDays);
if(K.theDateArr[0]===K.maxDate.getFullYear()&&K.theDateArr[1]>=K.maxDate.getMonth()){E.calNext=false
}}if(J.calUsePickers===true){K.picker=A("<div>",{"class":"ui-grid-a ui-datebox-grid",style:"padding-top: 5px; padding-bottom: 5px;"});
K.picker1=A('<div class="ui-block-a"><select name=pickmon"></select></div>').appendTo(K.picker).find("select");
K.picker2=A('<div class="ui-block-b"><select name=pickyar"></select></div>').appendTo(K.picker).find("select");
for(H=0;
H<=11;
H++){K.picker1.append(A('<option value="'+H+'"'+((K.thisMonth===H)?' selected="selected"':"")+">"+E.__("monthsOfYear")[H]+"</option>"))
}for(H=(K.thisYear-6);
H<=K.thisYear+6;
H++){K.picker2.append(A('<option value="'+H+'"'+((K.thisYear===H)?' selected="selected"':"")+">"+H+"</option>"))
}K.picker1.on("change",function(){E.theDate.setMonth(A(this).val());
E.refresh()
});
K.picker2.on("change",function(){E.theDate.setFullYear(A(this).val());
E.refresh()
});
K.picker.find("select").selectmenu({mini:true,nativeMenu:true});
K.picker.appendTo(E.d.intHTML)
}C=A('<div class="'+G+'grid">').appendTo(E.d.intHTML);
if(J.calShowDays){E._cal_days=E.__("daysOfWeekShort").concat(E.__("daysOfWeekShort"));
K.weekDays=A("<div>",{"class":G+"gridrow"}).appendTo(C);
if(E.__("isRTL")===true){K.weekDays.css("direction","rtl")
}if(J.calShowWeek){A("<div>").addClass(G+"griddate "+G+"griddate-empty "+G+"griddate-label").appendTo(K.weekDays)
}for(H=0;
H<=6;
H++){A("<div>"+E._cal_days[(H+K.startDay)%7]+"</div>").addClass(G+"griddate "+G+"griddate-empty "+G+"griddate-label").appendTo(K.weekDays)
}}K.gen=E._cal_gen(K.start,K.lastend,K.end,!J.calOnlyMonth,E.theDate.getMonth());
for(B in K.gen){D=A("<div>",{"class":G+"gridrow"});
if(E.__("isRTL")){D.css("direction","rtl")
}if(J.calShowWeek){A("<div>",{"class":G+"griddate "+G+"griddate-empty"}).text("W"+K.wk).appendTo(D);
K.wk++;
if(K.wk>52&&typeof K.gen[parseInt(B,10)+1]!=="undefined"){K.wk=new Date(K.theDateArr[0],K.theDateArr[1],((E.__("calStartDay")===0)?K.gen[parseInt(B,10)+1][1][0]:K.gen[parseInt(B,10)+1][0][0])).getWeek(4)
}}for(I in K.gen[B]){if(J.calWeekMode){K.weekMode=K.gen[B][J.calWeekModeDay][0]
}if(typeof K.gen[B][I]==="boolean"){A("<div>",{"class":G+"griddate "+G+"griddate-empty"}).appendTo(D)
}else{F=E._cal_check(K,K.theDateArr[0],K.gen[B][I][1],K.gen[B][I][0]);
if(K.gen[B][I][0]){A("<div>"+String(K.gen[B][I][0])+"</div>").addClass(K.thisMonth===K.gen[B][I][1]?(G+"griddate ui-corner-all ui-btn-up-"+F.theme+(F.ok?"":" "+G+"griddate-disable")):(G+"griddate "+G+"griddate-empty")).jqmData("date",((J.calWeekMode)?K.weekMode:K.gen[B][I][0])).jqmData("theme",K.thisMonth===K.gen[B][I][1]?F.theme:"-").jqmData("enabled",F.ok).jqmData("month",K.gen[B][I][1]).appendTo(D)
}}}if(J.calControlGroup===true){D.find(".ui-corner-all").removeClass("ui-corner-all").eq(0).addClass("ui-corner-left").end().last().addClass("ui-corner-right").addClass("ui-controlgroup-last")
}D.appendTo(C)
}if(J.calShowWeek){C.find("."+G+"griddate").addClass(G+"griddate-week")
}if(J.useTodayButton||J.useClearButton){D=A("<div>",{"class":G+"controls"});
if(J.useTodayButton){A('<a href="#">'+E.__("calTodayButtonLabel")+"</a>").appendTo(D).buttonMarkup({theme:J.theme,icon:"check",iconpos:"left",corners:true,shadow:true}).on(J.clickEvent,function(L){L.preventDefault();
E.theDate=new E._date();
E.theDate=new E._date(E.theDate.getFullYear(),E.theDate.getMonth(),E.theDate.getDate(),0,0,0,0);
E.d.input.trigger("datebox",{method:"doset"})
})
}if(J.useClearButton){A('<a href="#">'+E.__("clearButton")+"</a>").appendTo(D).buttonMarkup({theme:J.theme,icon:"delete",iconpos:"left",corners:true,shadow:true}).on(J.clickEventAlt,function(L){L.preventDefault();
E.d.input.val("");
E.d.input.trigger("datebox",{method:"clear"});
E.d.input.trigger("datebox",{method:"close"})
})
}if(J.useCollapsedBut){D.addClass("ui-datebox-collapse")
}D.appendTo(C)
}E.d.intHTML.on(J.clickEventAlt+" vmouseover vmouseout","div."+G+"griddate",function(L){if(L.type===J.clickEventAlt){L.preventDefault();
if(A(this).jqmData("enabled")){E.theDate.set(2,1).set(1,A(this).jqmData("month")).set(2,A(this).jqmData("date"));
E.d.input.trigger("datebox",{method:"set",value:E._formatter(E.__fmt(),E.theDate),date:E.theDate});
E.d.input.trigger("datebox",{method:"close"})
}}else{if(A(this).jqmData("enabled")&&typeof A(this).jqmData("theme")!=="undefined"){if(J.calWeekMode!==false&&J.calWeekHigh===true){A(this).parent().find("div").each(function(){E._hoover(this)
})
}else{E._hoover(this)
}}}});
E.d.intHTML.on("swipeleft",function(){if(E.calNext){E._offset("m",1)
}}).on("swiperight",function(){if(E.calPrev){E._offset("m",-1)
}});
if(E.wheelExists){E.d.intHTML.on("mousewheel",function(M,L){M.preventDefault();
if(L>0&&E.calNext){E.theDate.set(2,1);
E._offset("m",1)
}if(L<0&&E.calPrev){E.theDate.set(2,1);
E._offset("m",-1)
}})
}}})
})(jQuery);
(function(E){var B=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var D=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var C=["January","February","March","April","May","June","July","August","September","October","November","December"];
var A=[];
A.Jan="01";
A.Feb="02";
A.Mar="03";
A.Apr="04";
A.May="05";
A.Jun="06";
A.Jul="07";
A.Aug="08";
A.Sep="09";
A.Oct="10";
A.Nov="11";
A.Dec="12";
E.format=(function(){function I(K){return B[parseInt(K,10)]||K
}function J(L){var K=parseInt(L,10)-1;
return D[K]||L
}function H(L){var K=parseInt(L,10)-1;
return C[K]||L
}var F=function(K){return A[K]||K
};
var G=function(N){var O=N;
var L="";
if(O.indexOf(".")!==-1){var M=O.split(".");
O=M[0];
L=M[1]
}var K=O.split(":");
if(K.length===3){hour=K[0];
minute=K[1];
second=K[2];
return{time:O,hour:hour,minute:minute,second:second,millis:L}
}else{return{time:"",hour:"",minute:"",second:"",millis:""}
}};
return{date:function(Y,X){try{var L=null;
var U=null;
var S=null;
var a=null;
var M=null;
var K=null;
if(typeof Y=="number"){return this.date(new Date(Y),X)
}else{if(typeof Y.getFullYear=="function"){U=Y.getFullYear();
S=Y.getMonth()+1;
a=Y.getDate();
M=Y.getDay();
K=G(Y.toTimeString())
}else{if(Y.search(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?\d{0,3}[-+]?\d{2}:?\d{2}/)!=-1){var Z=Y.split(/[T\+-]/);
U=Z[0];
S=Z[1];
a=Z[2];
K=G(Z[3].split(".")[0]);
L=new Date(U,S-1,a);
M=L.getDay()
}else{var Z=Y.split(" ");
switch(Z.length){case 6:U=Z[5];
S=F(Z[1]);
a=Z[2];
K=G(Z[3]);
L=new Date(U,S-1,a);
M=L.getDay();
break;
case 2:var W=Z[0].split("-");
U=W[0];
S=W[1];
a=W[2];
K=G(Z[1]);
L=new Date(U,S-1,a);
M=L.getDay();
break;
case 7:case 9:case 10:U=Z[3];
S=F(Z[1]);
a=Z[2];
K=G(Z[4]);
L=new Date(U,S-1,a);
M=L.getDay();
break;
case 1:var W=Z[0].split("");
U=W[0]+W[1]+W[2]+W[3];
S=W[5]+W[6];
a=W[8]+W[9];
K=G(W[13]+W[14]+W[15]+W[16]+W[17]+W[18]+W[19]+W[20]);
L=new Date(U,S-1,a);
M=L.getDay();
break;
default:return Y
}}}}var T="";
var P="";
var Q="";
for(var O=0;
O<X.length;
O++){var V=X.charAt(O);
T+=V;
Q="";
switch(T){case"ddd":P+=I(M);
T="";
break;
case"dd":if(X.charAt(O+1)=="d"){break
}if(String(a).length===1){a="0"+a
}P+=a;
T="";
break;
case"d":if(X.charAt(O+1)=="d"){break
}P+=parseInt(a,10);
T="";
break;
case"MMMM":P+=H(S);
T="";
break;
case"MMM":if(X.charAt(O+1)==="M"){break
}P+=J(S);
T="";
break;
case"MM":if(X.charAt(O+1)=="M"){break
}if(String(S).length===1){S="0"+S
}P+=S;
T="";
break;
case"M":if(X.charAt(O+1)=="M"){break
}P+=parseInt(S,10);
T="";
break;
case"yyyy":P+=U;
T="";
break;
case"yy":if(X.charAt(O+1)=="y"&&X.charAt(O+2)=="y"){break
}P+=String(U).slice(-2);
T="";
break;
case"HH":P+=K.hour;
T="";
break;
case"hh":var N=(K.hour==0?12:K.hour<13?K.hour:K.hour-12);
N=String(N).length==1?"0"+N:N;
P+=N;
T="";
break;
case"h":if(X.charAt(O+1)=="h"){break
}var N=(K.hour==0?12:K.hour<13?K.hour:K.hour-12);
P+=parseInt(N,10);
T="";
break;
case"mm":P+=K.minute;
T="";
break;
case"ss":P+=K.second.substring(0,2);
T="";
break;
case"SSS":P+=K.millis.substring(0,3);
T="";
break;
case"a":P+=K.hour>=12?"PM":"AM";
T="";
break;
case" ":P+=V;
T="";
break;
case"/":P+=V;
T="";
break;
case":":P+=V;
T="";
break;
default:if(T.length===2&&T.indexOf("y")!==0&&T!="SS"){P+=T.substring(0,1);
T=T.substring(1,2)
}else{if((T.length===3&&T.indexOf("yyy")===-1)){T=""
}else{Q=T
}}}}P+=Q;
return P
}catch(R){console.log(R);
return Y
}}}
}())
}(jQuery));
jQuery.format.date.defaultShortDateFormat="dd/MM/yyyy";
jQuery.format.date.defaultLongDateFormat="dd/MM/yyyy hh:mm:ss";
jQuery(document).ready(function(){jQuery(".shortDateFormat").each(function(A,B){if(jQuery(B).is(":input")){jQuery(B).val(jQuery.format.date(jQuery(B).val(),jQuery.format.date.defaultShortDateFormat))
}else{jQuery(B).text(jQuery.format.date(jQuery(B).text(),jQuery.format.date.defaultShortDateFormat))
}});
jQuery(".longDateFormat").each(function(A,B){if(jQuery(B).is(":input")){jQuery(B).val(jQuery.format.date(jQuery(B).val(),jQuery.format.date.defaultLongDateFormat))
}else{jQuery(B).text(jQuery.format.date(jQuery(B).text(),jQuery.format.date.defaultLongDateFormat))
}})
});
(function(C,A){var B=new Date(),E={},D=function(F){E[F]=E[F]||{cacheTimeout:A.constants.temporal.SECONDS_IN_HOUR*1000,eventListingsCache:{}};
return E[F]
};
C.widget("mobile.eventDetail",C.mobile.widget,{options:{datetimeFormat:A.constants.temporal.LONG_DATETIME_FORMAT,dateFormat:A.constants.temporal.LONG_DATE_FORMAT,modelKey:"default",event:{}},_create:function(){var F=this;
var G=A.common.getQueryParam("id");
C.extend(F.options,F.element.data("options"));
F.option("model",D(F.options.modelKey));
if(!F.option("event").title&&!F.option("model").currentEvent){if(G){F._fetchEvent(G)
}else{C.mobile.changePage(F.option("missingEventPage"))
}}else{if(!F.options.event.title){F.option("event",F.options.model.currentEvent);
F.refresh()
}else{F.refresh()
}}},_fetchEvent:function(G){var F=this;
var H;
if(G){C.ajax({url:this.option("jsonDataUrl"),dataType:"json",data:{id:G},timeout:A.constants.general.AJAX_TIMEOUT,beforeSend:A.ubmobile.ajaxBeforeSend,complete:A.ubmobile.ajaxComplete,error:A.ubmobile.ajaxError,success:function(I){if(I.length>0){F.option("event",I[0]);
F.options.model.currentEvent=I[0];
F.refresh()
}}})
}},_setOption:function(F,G){C.Widget.prototype._setOption.apply(this,arguments)
},refresh:function(){var J=this.option("event"),I=C('<h2 class="ub-event-title">').html(J.title),L=C('<p class="ub-event-location"></p>').html(J.location).prepend("<b>Location:</b> "),F=C('<p class="ub-event-description"></p>').html(J.description),K=C.format.date(new Date(J.start*1000),this.options.datetimeFormat),G=C.format.date(new Date(J.end*1000),this.options.datetimeFormat),H=C('<p class="ub-event-datetime"></div>').html(K+" to "+G);
this.element.empty();
C('<h2 class="ub-event-title">').html(J.title).appendTo(this.element);
C('<p class="ub-event-start"></p>').html(K).prepend("<b>Starts:</b> ").appendTo(this.element);
if(J.end){C('<p class="ub-event-end"></p>').html(G).prepend("<b>Ends:</b> ").appendTo(this.element)
}if(J.location){C('<p class="ub-event-location"></p>').html(J.location).prepend("<b>Location:</b> ").appendTo(this.element)
}if(J.cost){C('<p class="ub-event-cost"></p>').html(J.cost).prepend("<b>Cost:</b> ").appendTo(this.element)
}if(J.presenter){C('<p class="ub-event-presenter"></p>').html(J.presenter).prepend("<b>Presenter:</b> ").appendTo(this.element)
}C('<p class="ub-event-description"></pv>').html(J.description).appendTo(this.element);
if(J.url){C('<a data-theme="d">Go to event website</a>').attr("href",J.url).appendTo(this.element).button()
}}});
C.widget("mobile.eventList",C.mobile.widget,{options:{dateFormat:A.constants.temporal.LONG_DATE_FORMAT,timeFormat:"h:mm a",startTimestamp:B.setHours(0,0,0,0)/1000,endTimestamp:B.getTime()/1000+A.constants.temporal.SECONDS_IN_DAY,cat:[],modelKey:"default",emptyResultClass:"no-results"},_create:function(){C.extend(this.options,this.element.data("options"));
this.option("model",D(this.options.modelKey));
if(typeof this.option("cat")==="string"){this.option("cat",[this.option("cat")])
}this.option("currentRange","day")
},_init:function(){var F=this;
F.element.closest(":jqmData(role=page)").one("pageshow",function(){if(F.option("useSearchQuery")){var G=A.common.getQueryParam("event-search-query")||C("#event-search-query").val();
F.option("keywords",G);
delete F.options.endTimestamp
}F._createNavMenu()
})
},_createTimeButtons:function(F){var N=this,M=C('<a href="#" data-inline="true" class="ub-day-btn">Day</a>'),K=C('<a href="#" data-inline="true" class="ub-week-btn">Week</a>'),J=C('<a href="#" data-inline="true" class="ub-month-btn">Month</a>'),I=C('<a href="#" data-inline="true" data-iconpos="notext" data-icon="ub-cal" class="ub-cal-btn"></a>'),G=C('<label for="datepicker">Choose a date</label>').hide(),H=C('<input name="datepicker" id="datepicker" type="date">'),L=C('<div class="ub-time-buttons" data-role="controlgroup" data-type="horizontal"></div>');
F.append(L);
L.append(M);
M.button();
M.click(function(){N.option("endTimestamp",N.option("startTimestamp")+A.constants.temporal.SECONDS_IN_DAY);
N.option("currentRange","day");
N.refresh();
A.ubmobile.analytics.trackEvent("events::filter::click",C(this).text(),C.format.date(B,"MM-dd-yyyy"),1)
});
L.append(K);
K.button();
K.click(function(){var O=A.common.getStartOfWeek(new Date(N.option("startTimestamp")*1000));
var P=A.common.getEndOfWeek(O);
N.option("startTimestamp",O.getTime()/1000);
N.option("endTimestamp",P.getTime()/1000);
N.option("currentRange","week");
N.refresh();
A.ubmobile.analytics.trackEvent("events::filter::click",C(this).text(),C.format.date(O,"MM-dd-yyyy")+" to "+C.format.date(P,"MM-dd-yyyy"),1)
});
L.append(J);
J.button();
J.click(function(){var O=A.common.getStartOfMonth(new Date(N.option("startTimestamp")*1000));
var P=A.common.getEndOfMonth(O);
N.option("startTimestamp",O.getTime()/1000);
N.option("endTimestamp",P.getTime()/1000);
N.option("currentRange","month");
N.refresh();
A.ubmobile.analytics.trackEvent("events::filter::click",C(this).text(),C.format.date(O,"MM-yyyy"),1)
});
L.after(G);
L.after(H);
H.on("datebox",function(P,Q){var O=Q.date;
if(Q.method==="set"){O.setHours(0,0,0,0);
N.option("startTimestamp",O.getTime()/1000);
N.option("endTimestamp",N.option("startTimestamp")+A.constants.temporal.SECONDS_IN_DAY);
A.ubmobile.analytics.trackEvent("events::datepicker","set date",N.option("currentRange"),1);
N.option("currentRange","day");
N.refresh()
}});
L.append(I);
I.button();
I.click(function(){H.datebox({mode:"calbox"});
H.closest(".ui-input-datebox").hide();
H.datebox("open");
A.ubmobile.analytics.trackEvent("events::datepicker","click",N.option("currentRange"),1)
});
L.controlgroup();
N._updateTimeButtons()
},_createNavMenu:function(){var G=this,H=C('<a href="#" data-icon="arrow-l" data-iconpos="notext" data-theme="a" class="ui-btn-left ub-previous-btn"></a>').button(),J=C('<a href="#" data-icon="arrow-r" data-iconpos="notext" data-theme="a" class="ui-btn-right ub-next-btn"></a>').button(),I=C('<div class="ui-bar-a ub-events-subheader">');
G.element.closest(":jqmData(role=page)").find(".ub-events-subheader").remove();
G.element.before(I);
if(this.option("useSearchQuery")){var F=C('<form data-transition="slide">').appendTo(I);
G.element.closest(":jqmData(role=page)").on("pageshow",function(){F.attr("action",C.mobile.path.parseUrl(C.mobile.activePage.data("url")).pathname)
});
var L=C('<div class="searcharea ui-bar-a">').appendTo(F);
var K=C('<div class="searchbox event-search-box">').appendTo(L);
C('<input id="event-search-query" name="event-search-query" data-type="search" type="search" data-mini="true" placeholder="Find Events">').appendTo(K).textinput().val(G.option("keywords"));
C('<a href="#" data-transition="slide" data-role="button" data-icon="search" data-iconpos="notext" class="searchbutton event-search-button">Submit</a>').appendTo(K).button().click(function(){F.submit()
})
}else{I.append(H);
H.button();
H.click(function(){var M,N;
switch(G.option("currentRange")){case"week":M=new Date((G.option("startTimestamp")-A.constants.temporal.SECONDS_IN_WEEK)*1000);
N=A.common.getEndOfWeek(M);
break;
case"month":M=new Date(G.option("startTimestamp")*1000);
M=A.common.getStartOfMonth(M.setMonth(M.getMonth()-1));
N=A.common.getEndOfMonth(M);
break;
default:M=new Date((G.option("startTimestamp")-A.constants.temporal.SECONDS_IN_DAY)*1000);
N=new Date(M.getTime()+(A.constants.temporal.SECONDS_IN_DAY*1000));
break
}G.option("startTimestamp",M/1000);
G.option("endTimestamp",N/1000);
G.refresh();
A.ubmobile.analytics.trackEvent("events::filter::click","previous",G.option("currentRange"),1)
});
G._createTimeButtons(I);
I.append(J);
J.button();
J.click(function(){var M,N;
switch(G.option("currentRange")){case"week":M=new Date((G.option("startTimestamp")+A.constants.temporal.SECONDS_IN_WEEK)*1000);
N=A.common.getEndOfWeek(M);
break;
case"month":M=new Date(G.option("startTimestamp")*1000);
M=A.common.getStartOfMonth(M.setMonth(M.getMonth()+1));
N=A.common.getEndOfMonth(M);
break;
default:M=new Date((G.option("startTimestamp")+A.constants.temporal.SECONDS_IN_DAY)*1000);
N=new Date(M.getTime()+(A.constants.temporal.SECONDS_IN_DAY*1000));
break
}G.option("startTimestamp",M/1000);
G.option("endTimestamp",N/1000);
G.refresh();
A.ubmobile.analytics.trackEvent("events::filter::click","next",G.option("currentRange"),1)
})
}},_handleEventData:function(H){var G=C("<ul>"),J={},F=this;
F.element.empty();
H=C.grep(H,function(L,K){return parseInt(L.start,10)>=parseInt(F.option("startTimestamp"),10)||F.option("showLongTermEvents")
});
if(H.length===0){F.element.addClass(F.option("emptyResultClass"));
var I=F.element.closest(":jqmData(role=content)").find("div.ub-time-buttons").find("a.ui-btn-active span.ui-btn-inner span.ui-btn-text").text()||"search";
F.element.append('<h2 class="no-results-message">No events scheduled</h2>');
if(I==="search"){F.element.append(C('<div class="no-results-message">').text("for the "+I.toLowerCase()))
}else{(function(){var K;
if(F.option("currentRange")==="day"){K=" of "+C.format.date(new Date(F.option("startTimestamp")*1000),F.option("dateFormat"))
}else{K=" of "+C.format.date(new Date(F.option("startTimestamp")*1000),F.option("dateFormat"));
K+=" - "+C.format.date(new Date(F.option("endTimestamp")*1000),F.option("dateFormat"))
}F.element.append(C('<div class="no-results-message">').text("for the "+I.toLowerCase()+K))
})()
}}else{F.element.removeClass(F.option("emptyResultClass"));
C.each(H,function(L,O){var K=C.format.date(new Date(O.start*1000),F.option("dateFormat")),N=C.format.date(new Date(O.start*1000),F.option("timeFormat")),M;
var P=C('<a data-transition="slide">').attr("href",F.option("detailPage")+"?id="+O.id);
C('<span class="time">').html(N).appendTo(P);
C("<h3>").html(O.title).appendTo(P);
C("<p>").html(O.location).appendTo(P);
var Q=C("<li>").append(P);
P.click(function(){F.option("model").currentEvent=O;
C("body").one("pagebeforeshow","div:jqmData(role=page)",function(){var R=C("div:jqmData(role=eventDetail)");
R.eventDetail("option","event",O);
R.eventDetail("refresh")
})
});
if(!J[K]){M=C('<li data-role="list-divider"></li>').html(K).appendTo(G);
J[K]=true
}G.append(Q)
});
G.appendTo(F.element);
G.listview()
}},_refreshEventsAjax:function(G){var F=this;
C.ajax({url:this.option("jsonDataUrl"),dataType:"json",data:{start:this.option("startTimestamp"),end:this.option("endTimestamp")||"",cat:this.option("cat"),keywords:this.option("keywords")||""},timeout:A.constants.general.AJAX_TIMEOUT,beforeSend:A.ubmobile.ajaxBeforeSend,complete:A.ubmobile.ajaxComplete,error:A.ubmobile.ajaxError,success:function(I){var H=F.option("model").eventListingsCache;
H[G]=I;
setTimeout(function(){delete H[G]
},F.option("model").cacheTimeout);
F._handleEventData(I)
}})
},_refreshEventsCached:function(G){var F=this.option("model").eventListingsCache[G];
if(F){this._handleEventData(F);
return true
}return false
},_setOption:function(F,H){var G=C.Widget.prototype._setOption.apply(this,arguments);
if(F==="currentRange"){this._updateTimeButtons()
}return G
},_updateTimeButtons:function(){switch(this.option("currentRange")){case"week":this.element.parent().find(".ub-day-btn").removeClass("ui-btn-active");
this.element.parent().find(".ub-week-btn").addClass("ui-btn-active");
this.element.parent().find(".ub-month-btn").removeClass("ui-btn-active");
break;
case"month":this.element.parent().find(".ub-day-btn").removeClass("ui-btn-active");
this.element.parent().find(".ub-week-btn").removeClass("ui-btn-active");
this.element.parent().find(".ub-month-btn").addClass("ui-btn-active");
break;
default:this.element.parent().find(".ub-day-btn").addClass("ui-btn-active");
this.element.parent().find(".ub-week-btn").removeClass("ui-btn-active");
this.element.parent().find(".ub-month-btn").removeClass("ui-btn-active");
break
}},refresh:function(){var F=[this.option("startTimestamp"),this.option("endTimestamp"),this.option("keywords"),this.option("cat")].join("-");
if(!this._refreshEventsCached(F)){this._refreshEventsAjax(F)
}}});
C(document).on("pagecreate",function(G){var F=C(G.target).find(":jqmData(role='eventList')").eventList();
C(G.target).find(":jqmData(role='eventDetail')").eventDetail();
C(document).one("pageshow",function(H){F.eventList("refresh")
})
})
})(jQuery,EAS);
(function(B,A){B(document).on("pageinit","div#datebox:jqmData(role=page)",function(){var C=B("#datebox").find('input:jqmData(role="datebox")');
B("#datebox").on("pageshow",function(){C.datebox("open")
});
C.on("datebox",function(D,E){if(E.method==="set"){(function(){var G=C.data("datebox").theDate.getTime()/1000,F=B.mobile.activePage.find("div:jqmData(role=eventList)");
F.eventList("option","startTimestamp",G);
F.eventList("option","endTimestamp",G+A.constants.temporal.SECONDS_IN_DAY);
F.eventList("option","currentRange","day");
F.eventList("refresh")
})()
}});
B("#date-picker").on("click",function(D){C.datebox("open");
D.preventDefault()
})
})
})(jQuery,EAS);
(function(C,A){var B=new Date(),E={},D=function(F){E[F]=E[F]||{cacheTimeout:A.constants.temporal.SECONDS_IN_HOUR*1000,departmentsCache:{}};
return E[F]
};
C.widget("mobile.departmentDetail",C.mobile.widget,{options:{modelKey:"default",department:{}},_create:function(){var F=this;
var G=A.common.getQueryParam("department_id");
C.extend(F.options,F.element.data("options"));
F.option("model",D(F.options.modelKey));
F.element.addClass("departmentdetail");
if(!F.option("department").book_name&&!F.option("model").currentDepartment){if(G){F.fetchDepartment(G)
}else{C.mobile.changePage(F.option("missingDepartmentPage"))
}}else{if(!F.options.department.book_name){F.option("department",F.options.model.currentDepartment);
F.fetchDepartment()
}else{F.fetchDepartment()
}}},_setOption:function(F,G){C.Widget.prototype._setOption.apply(this,arguments)
},_fetchDepartmentAjax:function(G){var F=this;
C.ajax({url:F.option("jsonDataUrl"),dataType:"json",data:{id:G},timeout:A.constants.general.AJAX_TIMEOUT,beforeSend:A.ubmobile.ajaxBeforeSend,complete:A.ubmobile.ajaxComplete,error:A.ubmobile.ajaxError,success:function(I){var H=F.option("model").departmentsCache;
H[G]=I;
setTimeout(function(){delete H[G]
},F.option("model").cacheTimeout);
F._handleDepartmentData(I)
}})
},_fetchDepartmentCached:function(G){var F=this.option("model").departmentsCache[G];
if(F){this._handleDepartmentData(F);
return true
}return false
},_handleDepartmentData:function(H){var G=this,L=C('<h3 class="title ub-department-name"></h3>').text(H.book_name),J=C("<ul>"),K=function(N,M){G.option("model").currentDepartment=M;
G.option("department",M);
C(document).on("pageshow.departmentDetailBack",function(){if(C.mobile.activePage.find("div:jqmData(role=departmentDetail)").length){C(document).one("click.departmentDetailBack",":jqmData(rel=back)",function(){delete G.option("model").currentDepartment
})
}else{C(document).off("pageshow.departmentDetailBack");
C(document).off("click.departmentDetailBack")
}});
C.mobile.changePage(G.option("detailPage")+M.id,{allowSamePageTransition:true,reloadPage:true,transition:"slide"});
N.preventDefault()
};
G.element.empty();
C('<h2 class="text ub-department-detail">').text(H.long_name).appendTo(G.element);
var F=function(M){var N=C('<p class="text ub-department-detail">');
if(M.label){C('<span class="label">').text(M.label).appendTo(N)
}if(M.link){C('<a data-transition="slide" class="ui-link ub-department-detail">').text(M.text).attr("href",M.link).appendTo(N)
}else{C('<span class="ub-department-detail">').text(M.text).appendTo(N)
}N.appendTo(G.element)
};
if(H.address){F({label:"Address:",text:H.address})
}if(H.phone){F({label:"Phone:",text:H.phone,link:"tel:"+H.phone})
}if(H.fax){F({label:"Fax:",text:H.fax})
}if(H.email){F({label:"Email:",text:H.email,link:"mailto:"+H.email})
}if(H.url){F({label:"Web:",text:H.url,link:H.url})
}if(H.director_name){if(H.director_id){F({label:"Director:",text:H.director_name,link:G.option("personLink")+H.director_id})
}else{F({label:"Director:",text:H.director_name})
}if(H.director_email){F({label:"Email:",text:H.director_email,link:"mailto:"+H.director_email})
}}if(H.children&&H.children.length>0){J.append('<li data-role="list-divider">Sub-Listings</li>');
C.each(H.children,function(N,M){var O=C('<a href="#"></a>').text(M.book_name),P=C("<li></li>").append(O);
O.click(function(Q){K(Q,M)
});
J.append(P)
})
}if(H.related&&H.related.length>0){J.append('<li data-role="list-divider">Related Departments</li>');
C.each(H.related,function(N,M){var O=C('<a href="#"></a>').text(M.book_name),P=C("<li></li>").append(O);
O.click(function(Q){K(Q,M)
});
J.append(P)
})
}J.appendTo(G.element);
try{J.listview()
}catch(I){J.closest("div:jqmData(role=page)").on("pagebeforeshow",function(){J.listview()
})
}},fetchDepartment:function(F){F=F||this.option("department").id;
if(!this._fetchDepartmentCached(F)){this._fetchDepartmentAjax(F)
}}});
C.widget("mobile.departmentList",C.mobile.widget,{options:{modelKey:"default",emptyResultClass:"no-results"},_create:function(){var G=this;
var F=C('<form data-transition="slide">').appendTo(this.element);
var H=C('<div class="searcharea ui-bar-a">').appendTo(F);
var J=C('<div class="searchbox department-search-box">').appendTo(H);
var I=C('<input name="department-search-query" id="department-search-query" data-type="search" data-mini="true" placeholder="Find departments" />').appendTo(J).textinput();
C('<a href="#" data-role="button" data-icon="search" data-iconpos="notext" class="searchbutton department-search-button">Submit</a>').button().appendTo(J);
C.extend(G.options,G.element.data("options"));
G.option("model",D(G.options.modelKey))
},_init:function(){var F=this;
this.element.closest("div:jqmData(role=page)").one("pageshow",function(G){var I=F.element.find("#department-search-query");
var H=A.common.getQueryParam("department-search-query").trim();
I.val(H);
I.closest("form").attr("action",C.mobile.path.parseUrl(C.mobile.activePage.data("url")).pathname);
C("#main-department-search-query").val(I.val());
F.findDepartments()
})
},_handleDepartmentsData:function(I){var F=this,H={};
this.element.find("#departments-search-results").remove();
if(I.length===0){F.element.addClass(F.option("emptyResultClass"));
F.element.append('<h2 class="no-results-message">No results found</h2>');
F.element.append('<div class="no-results-message">Try entering another search</div>')
}else{F.element.find(".no-results-message").remove();
F.element.removeClass(F.option("emptyResultClass"));
var G=C('<ul id="departments-search-results">').appendTo(this.element).listview();
C.each(I,function(J,K){var L=C('<a data-transition="slide">').attr("href",F.option("detailPage")+K.id).text(K.book_name),M=C("<li>").append(L);
L.click(function(){F.option("model").currentDepartment=K;
C("body").one("pagebeforeshow","div:jqmData(role=page)",function(){var N=C("div:jqmData(role=departmentDetail)");
N.departmentDetail("option","department",K);
N.departmentDetail("fetchDepartment")
})
});
G.append(M)
});
G.listview("refresh")
}},_findDepartmentsAjax:function(G){var F=this;
C.ajax({url:F.option("jsonDataUrl"),dataType:"json",data:{q:G},timeout:A.constants.general.AJAX_TIMEOUT,beforeSend:A.ubmobile.ajaxBeforeSend,complete:A.ubmobile.ajaxComplete,error:A.ubmobile.ajaxError,success:function(I){var H=F.option("model").departmentsCache,J=I.results;
H[G]=J;
setTimeout(function(){delete H[G]
},F.option("model").cacheTimeout);
F._handleDepartmentsData(J)
}})
},_findDepartmentsCached:function(G){var F=this.option("model").departmentsCache[G];
if(F){this._handleDepartmentsData(F);
return true
}return false
},_setOption:function(F,G){C.Widget.prototype._setOption.apply(this,arguments)
},validate:function(F){if(!F||typeof F==="undefined"){throw new Error("You must enter a search term.")
}if(F.length<3){throw new Error("Your search term must be at least three characters.")
}if(F.indexOf("*")!==-1){throw new Error("Your search term containts illegal characters.")
}},findDepartments:function(){var G=A.common.getQueryParam("department-search-query").trim();
try{this.validate(G)
}catch(F){A.ubmobile.error(F);
return 
}if(!this._findDepartmentsCached(G)){this._findDepartmentsAjax(G)
}}});
C(document).on("pagecreate",":jqmData(role=page)",function(F){C(F.target).find(":jqmData(role='departmentList')").departmentList();
C(F.target).find(":jqmData(role='departmentDetail')").departmentDetail();
C(this).on("click","a.searchbutton.department-search-button, a.searchbutton.main-department-search-button",function(G){C(this).closest("form").submit();
G.preventDefault()
})
})
})(jQuery,EAS);
window.Modernizr=function(AJ,AI,AH){function H(A){AA.cssText=A
}function G(B,A){return H(prefixes.join(B+";")+(A||""))
}function F(B,A){return typeof B===A
}function U(B,A){return !!~(""+B).indexOf(A)
}function S(B,A){for(var D in B){var C=B[D];
if(!U(C,"-")&&AA[C]!==AH){return A=="pfx"?C:!0
}}return !1
}function Q(B,A,E){for(var D in B){var C=A[B[D]];
if(C!==AH){return E===!1?B[D]:F(C,"function")?C.bind(E||A):C
}}return !1
}function O(B,A,E){var D=B.charAt(0).toUpperCase()+B.slice(1),C=(B+" "+W.join(D+" ")+D).split(" ");
return F(A,"string")||F(A,"undefined")?S(C,A):(C=(B+" "+V.join(D+" ")+D).split(" "),Q(C,A,E))
}var AG="2.6.2",AF={},AE=!0,AD=AI.documentElement,AC="modernizr",AB=AI.createElement(AC),AA=AB.style,Z,Y={}.toString,X="Webkit Moz O ms",W=X.split(" "),V=X.toLowerCase().split(" "),T={},R={},P={},N=[],M=N.slice,K,J={}.hasOwnProperty,I;
!F(J,"undefined")&&!F(J.call,"undefined")?I=function(B,A){return J.call(B,A)
}:I=function(B,A){return A in B&&F(B.constructor.prototype[A],"undefined")
},Function.prototype.bind||(Function.prototype.bind=function(A){var D=this;
if(typeof D!="function"){throw new TypeError
}var C=M.call(arguments,1),B=function(){if(this instanceof B){var E=function(){};
E.prototype=D.prototype;
var c=new E,b=D.apply(c,C.concat(M.call(arguments)));
return Object(b)===b?b:c
}return D.apply(A,C.concat(M.call(arguments)))
};
return B
}),T.backgroundsize=function(){return O("backgroundSize")
};
for(var L in T){I(T,L)&&(K=L.toLowerCase(),AF[K]=T[L](),N.push((AF[K]?"":"no-")+K))
}return AF.addTest=function(B,A){if(typeof B=="object"){for(var C in B){I(B,C)&&AF.addTest(C,B[C])
}}else{B=B.toLowerCase();
if(AF[B]!==AH){return AF
}A=typeof A=="function"?A():A,typeof AE!="undefined"&&AE&&(AD.className+=" "+(A?"":"no-")+B),AF[B]=A
}return AF
},H(""),AB=Z=null,AF._version=AG,AF._domPrefixes=V,AF._cssomPrefixes=W,AF.testProp=function(A){return S([A])
},AF.testAllProps=O,AD.className=AD.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(AE?" js "+N.join(" "):""),AF
}(this,this.document);
(function(A,C){var B=EAS.common.getQueryParams;
EAS.common.getQueryParams=function(){var D;
if(C.mobile.activePage){D=C.mobile.path.parseUrl(C.mobile.activePage.data("url"))
}return B(D)
};
C(document).on("pagebeforeshow",function(){if(C.mobile.activePage.find(".UBPopupDialog").length===0){var D=C('<div data-role="header">');
var F=C('<div class="UBPopupDialog">').append(D).append('<div data-role="content">');
var E=C('<a href="#" data-rel="back" class="ui-btn-right" title="Close">Close</a>').buttonMarkup({corners:true,icon:"delete",iconpos:"notext",shadow:true,iconshadow:true,theme:"b"});
D.append("<h1>").append(E);
C.mobile.activePage.append(F);
F.popup({history:false,positionTo:"window",transition:"slideup",overlayTheme:"a",theme:"e"})
}});
A.getUBPopup=function(){var F=C.mobile.activePage.find(".UBPopupDialog");
var E=F.find(":jqmData(role=header) h1");
var D=F.find(":jqmData(role=content)");
F.popup("close");
E.empty();
D.empty();
F.setHeaderText=function(G){E.text(G)
};
F.appendContent=function(G){D.append(G)
};
F.on("popupbeforeposition",function(){F.closest(":jqmData(role=page)").trigger("pagecreate")
});
return F
};
A.error=function(E){C.mobile.loading("hide");
var D=A.getUBPopup();
D.setHeaderText("Error");
D.appendContent('<p class="text error-content">An error has occurred while loading the page.</p>');
D.appendContent(C('<p class="text error-content">').text(E));
D.popup("open")
};
A.ajaxError=function(F,H,G){C.mobile.loading("hide");
var E=A.getUBPopup();
var D=C('<a href="#" class="offline">').text("Go Offline").button().click(function(I){I.preventDefault();
C.mobile.base.set("");
EAS.ubmobile.analytics.trackEvent("mode::online","click","Go Offline",1);
EAS.ubmobile.phonegap.offlineMode()
});
E.setHeaderText("Error");
E.appendContent('<p class="text error-content">An error has occurred while loading the page.</p>');
E.appendContent(C('<p class="text error-content">').text(G));
E.popup("open");
E.appendContent(D)
};
A.ajaxBeforeSend=function(E,D){C.mobile.loading("show")
};
A.ajaxComplete=function(E,D){if(D==="success"){C.mobile.loading("hide")
}};
C(document).on("pageloadfailed",function(D,E){D.preventDefault();
E.deferred.reject(E.absUrl,E.options);
A.ajaxError(undefined,undefined,E.errorThrown);
window.setTimeout(function(){C.mobile.loading("hide")
},250)
});
jQuery(document).ready(function(){jQuery("meta[name=viewport]").attr("content","width=device-width, minimum-scale=1.0, maximum-scale=1.0");
jQuery("body").get(0).addEventListener("gesturestart",function(){jQuery("meta[name=viewport]").attr("content","device-width, minimum-scale=0.25, maximum-scale=1.6")
},false)
})
})(EAS.namespace("ubmobile"),jQuery);

var EAS = EAS || {}

/*
namespace pattern taken from "JavaScript Patterns" by Stoyan Stefanov, page 89

Usage:
    EAS.namespace('EAS.general'); // creates EAS.general namespace
    EAS.namespace('foo.bar.baz'); // creates EAS.foo.bar.baz namespace
    
    // creates and populates EAS.foo.bar
   	(function(self) {
   	    self.abc = ... 
   	})(EAS.namespace('foo.bar'));
   	 
*/
EAS.namespace = EAS.namespace || function (nsString) {
    var parts = nsString.split('.'),
        parent = EAS,
        i;

    /* strip redundant leading global */
    if (parts[0] === 'EAS') {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i++) {
        /* create a property if it doesn't exist */
        if (typeof parent[parts[i]] === 'undefined') {
            parent[parts[i]] = {};
        }

        parent = parent[parts[i]];
    }

    return parent;
};
(function(self) {
    "use strict";

    self.general = {
        AJAX_TIMEOUT: 20000, // milliseconds
        ENTER_KEYCODE: 13
    };
    
    self.temporal = {
        // datetime formats used with the dateformat plugin to jQuery
        LONG_DATETIME_FORMAT: 'MMM d, yyyy h:mm a',
        LONG_DATE_FORMAT: 'ddd MMMM d, yyyy',
        BASIC_TIME_FORMAT: 'hh:mm a',

        // common times that we don't want to recompute
        SECONDS_IN_HOUR: 3600, // 60 * 60
        SECONDS_IN_DAY: 86400, // 60 * 60 * 24
        SECONDS_IN_WEEK: 604800, // 60 * 60 * 24 * 7
        SECONDS_IN_MONTH: 2419200 // 60 * 60 * 24 * 28
    };
    
})(EAS.namespace('constants'));
(function(self) {
	"use strict";

	/**
	 * EAS.common.getQueryParams
	 *
	 * @param {object} url An optional URL to parse. If it is not sent, it will
	 *               default to window.location
	 * @returns an opbject of param keys/values
	 */
	self.getQueryParams = function (url) {
		var resultParts = [];
		var params = {};
		var results, i, resultPartsLength, paramParts;

		if (!url) {
			url = window.location;
		}

		results = url.search;

		// remove the leading "?"
		resultParts = results.substr(1, results.length)
		                     .split('&');

        for (i = 0, resultPartsLength = resultParts.length; i < resultPartsLength; i++) {
        	paramParts = resultParts[i].split('=');
            if (paramParts.length === 2) {
                params[paramParts[0]] = unescape(paramParts[1].replace(/[+]/g, ' '));
            }
        }

		return params;
	};

	/**
	 * EAS.common.getQueryParam
	 *
	 * @param {string} The name of the URL parameter that you want returned.
	 * @returns the value of the param
	 * 
	 */
	self.getQueryParam = function (paramName) {
		var params = self.getQueryParams();
		return params[paramName];
	};

	/**
	 * EAS.common.getStartOfWeek
	 *
	 * @param {Date} A Date object (optional -- defaults to current time)
	 * @returns A date object for the beginning of the week. 
	 * 
	 */
        self.getStartOfWeek = function (date) {
	    var startOfWeek, startDay;

	    if (!date) {
	        date = new Date();
	    }

            startDay = date.getDay();
	    startOfWeek = new Date(date - (((startDay + 6) % 7) * EAS.constants.temporal.SECONDS_IN_DAY * 1000));
	    startOfWeek.setHours(0, 0, 0, 0);

	    return startOfWeek;
	};

	/**
	 * EAS.common.getEndOfWeek
	 *
	 * @param {Date} A Date object (optional -- defaults to current time)
	 * @returns A date object for the end of the week. 
	 * 
	 */
        self.getEndOfWeek = function (date) {
	    var startOfWeek, endOfWeek;

	    if (!date) {
	        date = new Date();
	    }

	    startOfWeek = self.getStartOfWeek(date);

	    endOfWeek = new Date(startOfWeek.getTime() + (EAS.constants.temporal.SECONDS_IN_WEEK * 1000));
	    endOfWeek.setHours(0, 0, 0, 0);

	    return endOfWeek;
	};

	/**
	 * EAS.common.getStartOfMonth
	 *
	 * @param {Date} A Date object (optional -- defaults to current time)
	 * @returns A date object for the beginning of the month. 
	 * 
	 */
        self.getStartOfMonth = function (date) {
	    var startOfMonth;

	    if (!date) {
	        date = new Date();
	    }

	    startOfMonth = new Date(date);
	    startOfMonth.setDate(1);
	    startOfMonth.setHours(0, 0, 0, 0);

	    return startOfMonth;
	};

	/**
	 * EAS.common.getEndOfMonth
	 *
	 * @param {Date} A Date object (optional -- defaults to current time)
	 * @returns A date object for the end of the month. 
	 * 
	 */
        self.getEndOfMonth = function (date) {
	    var endOfMonth;

	    if (!date) {
	        date = new Date();
	    }

	    endOfMonth = new Date(date);
	    endOfMonth.setMonth(endOfMonth.getMonth() + 1); // increment the month so the next line works
	    endOfMonth.setDate(0); // should set to end of previous month
	    endOfMonth.setHours(0, 0, 0, 0);

	    return endOfMonth;
	};

})(EAS.namespace('common'));


(function(D,A){var B=new Date(),C=true,F={},E=function(G){F[G]=F[G]||{cacheTimeout:A.constants.temporal.SECONDS_IN_HOUR*1000,peopleCache:{}};
return F[G]
};
D.widget("mobile.personDetail",D.mobile.widget,{options:{modelKey:"default",person:{}},_create:function(){var G=this;
D.extend(G.options,G.element.data("options"));
G.option("model",E(G.options.modelKey))
},_init:function(){var G=this;
this.element.closest("div:jqmData(role=page)").one("pageshow",function(H){var I=A.common.getQueryParam("username");
if(!G.option("person").name&&!G.option("model").currentPerson){G._findPerson()
}else{if(G.options.person.id!==I){G._findPerson()
}else{if(!G.options.person.name){G.option("person",G.option("model").currentPerson);
G.refresh()
}else{G.refresh()
}}}})
},_setOption:function(G,H){D.Widget.prototype._setOption.apply(this,arguments)
},_handlePersonData:function(I){var G=this,H;
if(I&&I[0]&&I[0].name){H=I[0];
G.option("model").currentPerson=H;
G.option("person",G.options.model.currentPerson);
G.refresh()
}else{A.ubmobile.error("Cannot find person.")
}},_findPerson:function(){var G=this,H=A.common.getQueryParam("username");
if(!H){A.ubmobile.error("You need to search for a person.");
return 
}D.ajax({url:this.option("jsonDataUrl"),dataType:"json",data:{query:H,method:"results",qualifier:"username"},timeout:A.constants.general.AJAX_TIMEOUT,beforeSend:A.ubmobile.ajaxBeforeSend,complete:A.ubmobile.ajaxComplete,error:A.ubmobile.ajaxError,success:function(I){G._handlePersonData(I)
}})
},refresh:function(){C=true;
var I=this,J=I.option("person");
I.element.empty();
var H=D('<div class="ub-person-details-header ui-body ui-body-c ui-corner-all"></div>').appendTo(I.element);
var N=D('<a data-transition="slide">').text(J.department).attr("href",I.option("departmentLink")+J.department);
D('<h2 class="ub-person-name"></h2>').text(J.name).appendTo(H);
D('<div class="ub-person-title"></div>').text(J.title).appendTo(H);
D('<div class="ub-person-department"></div>').append(N).appendTo(H);
if(J.address){D('<div class="ub-person-address"></div>').text(J.address).appendTo(H)
}var K={};
if(J.phone){D.each(J.phone.split(";"),function(Q,P){var R=P,O=R.replace(/\D/g,"");
if(!K[O.substr(-7,7)]){var S=D('<ul data-inset="true" class="ub-person-link"><li><a><span class="label">phone</span><span class="text"></span></a></li></ul>');
S.find(".text").text(R);
S.find("a").attr("href","tel:"+O);
S.appendTo(I.element).listview();
K[O]=true
}})
}if(J.pager){var M=D('<ul data-inset="true" class="ub-person-link"><li><a><span class="label">pager</span><span class="text"></span></a></li></ul>');
M.find(".text").text(J.pager);
M.find("a").attr("href","tel:"+J.pager);
M.appendTo(I.element).listview()
}if(J.fax){var L=D('<ul data-inset="true" class="ub-person-link"><li><span class="label">fax</span><span class="text"></span></li></ul>');
L.find(".text").text(J.fax);
L.appendTo(I.element).listview()
}if(J.email){var G=D('<ul data-role="listview" data-inset="true" class="ub-person-link"><li><a><span class="label">email</span><span class="text"></span></a></li></ul>');
G.find(".text").text(J.email);
G.find("a").attr("href","mailto:"+J.email);
G.appendTo(I.element).listview()
}}});
D.widget("mobile.peopleList",D.mobile.widget,{options:{modelKey:"default",emptyResultClass:"no-results"},_create:function(){var H=this;
var G=D('<form data-transition="slide">').appendTo(this.element);
H.element.one("pageshow",function(M){G.attr("action",D.mobile.path.parseUrl(D.mobile.activePage.data("url")).pathname)
});
var J=D('<div class="searcharea ui-bar-a">').appendTo(G);
var L=D('<div class="searchbox people-search-box">').appendTo(J);
var K=D('<input name="people-search-query" id="people-search-query" data-type="search" data-mini="true" placeholder="Find people" />').appendTo(L).textinput();
D('<a href="#" data-transition="slide" data-role="button" data-icon="search" data-iconpos="notext" class="searchbutton people-search-button">Submit</a>').button().appendTo(L);
D('<p class="tip">Search tip: You can search by part or all of a person&rsquo;s name, email or phone number.</p>').appendTo(J);
var I=D('<div data-role="controlgroup" data-type="horizontal" class="filters">').appendTo(J);
D('<a href="#" class="ui-btn-active" data-role="button">Show All</a>').appendTo(I).button().click(function(M){I.find(".ui-btn").removeClass("ui-btn-active");
D(this).addClass("ui-btn-active");
D("ul#people-search-results").children("li").show();
if(!C){A.ubmobile.analytics.trackEvent("people::filter::click",D(this).text(),K.val(),1)
}else{C=false
}});
D('<a href="#" data-role="button">Faculty/Staff</a>').appendTo(I).button().click(function(M){I.find(".ui-btn").removeClass("ui-btn-active");
D(this).addClass("ui-btn-active");
H._filterCode("staff");
if(!C){A.ubmobile.analytics.trackEvent("people::filter::click",D(this).text(),K.val(),1)
}else{C=false
}});
D('<a href="#" data-role="button">Students</a>').appendTo(I).button().click(function(M){I.find(".ui-btn").removeClass("ui-btn-active");
D(this).addClass("ui-btn-active");
H._filterCode("student");
if(!C){A.ubmobile.analytics.trackEvent("people::filter::click",D(this).text(),K.val(),1)
}else{C=false
}});
D.extend(H.options,H.element.data("options"));
H.option("model",E(H.options.modelKey))
},_init:function(){var G=this;
this.element.closest("div:jqmData(role=page)").one("pageshow",function(H){var J=G.element.find("#people-search-query");
var I=A.common.getQueryParam("people-search-query").trim();
J.val(I);
D("#main-people-search-query").val(J.val());
G.findPeople()
})
},_filterCode:function(G){var H=D("#people-search-results");
H.children("li").show();
H.children("li").filter(":not(."+G+")").hide();
H.children(":jqmData(role=list-divider)").show();
H.children(":jqmData(role=list-divider)").each(function(K,J){var L=D(J),I=L.nextAll(":visible").first();
if(I.length===0||(I.jqmData("role")&&I.jqmData("role")==="list-divider")){L.hide()
}})
},_handlePeopleData:function(I){var G=this;
this.element.find("#people-search-results").remove();
if(I.length===0){G.element.addClass(G.option("emptyResultClass"));
G.element.append('<h2 class="no-results-message">No results found</h2>');
G.element.append('<div class="no-results-message">Try entering another search</div>')
}else{G.element.find(".no-results-message").remove();
G.element.removeClass(G.option("emptyResultClass"));
var H=D('<ul id="people-search-results">').appendTo(this.element).listview({autodividers:true,autodividersSelector:function(J){return J.data("person").last_name.substr(0,1)
}});
D.each(I,function(J,K){var N=D("<li>").addClass(K.affiliation).data("person",K).appendTo(H);
var M=D('<a data-transition="slide">').attr("href",G.option("detailPage")+K.id).text(K.name).appendTo(N).click(function(){G.option("model").currentPerson=K;
D("body").one("pagebeforeshow","div:jqmData(role=page)",function(){var O=D("div:jqmData(role=personDetail)");
O.personDetail("option","person",K);
O.personDetail("refresh")
})
});
var L=D('<span class="title-and-dept">').append(D("<strong>").text(K.title)).appendTo(M);
if(K.department){L.append(" - "+K.department)
}});
H.listview("refresh");
this.element.find("div.filters a.ui-btn-active").click()
}},_findPeopleAjax:function(H){var G=this;
D.ajax({url:this.option("jsonDataUrl"),dataType:"json",data:{query:H,method:"results"},timeout:A.constants.general.AJAX_TIMEOUT,beforeSend:A.ubmobile.ajaxBeforeSend,complete:A.ubmobile.ajaxComplete,error:A.ubmobile.ajaxError,success:function(J){var I=G.option("model").peopleCache;
I[H]=J;
setTimeout(function(){delete I[H]
},G.option("model").cacheTimeout);
G._handlePeopleData(J)
}})
},_findPeopleCached:function(H){var G=this.option("model").peopleCache[H];
if(G){this._handlePeopleData(G);
return true
}return false
},_setOption:function(G,H){D.Widget.prototype._setOption.apply(this,arguments)
},validate:function(G){if(!G||typeof G==="undefined"){throw new Error("You must enter a search term.")
}if(G.length<3){throw ("Your search term must be at least three characters.")
}if(G.indexOf("*")!==-1){throw ("Your search term containts illegal characters.")
}},findPeople:function(){var H=A.common.getQueryParam("people-search-query").trim();
try{this.validate(H)
}catch(G){A.ubmobile.error(G);
return 
}if(!this._findPeopleCached(H)){this._findPeopleAjax(H)
}}});
D(document).on("pagecreate",":jqmData(role=page)",function(G){D(G.target).find(":jqmData(role='peopleList')").peopleList();
D(G.target).find(":jqmData(role='personDetail')").personDetail();
D(this).on("click","a.searchbutton.people-search-button",function(H){D(this).closest("form").submit();
H.preventDefault()
})
})
})(jQuery,EAS);
(function(B){var A=0;
B(document).on("change",".navmenu select",function(){if(A>0){return 
}var D=B(this),C=D.val(),E=B.mobile.path.isExternal(C)&&!B.mobile.path.isPermittedCrossDomainRequest(B.mobile.documentUrl,C);
A++;
try{D.val("").change()
}finally{A--
}if(B.mobile.ajaxEnabled&&!E){B.mobile.changePage(C)
}else{window.setTimeout(function(){window.location=C
},1)
}})
})($);
(function(A){var B=window.devicePixelRatio;
if(B>1){A.fn.hiRes=function(){return this.each(function(){var D=A(this);
if(D.is("img")&&!D.hasClass("hi-res")){var E=D.attr("src");
var C=E.match(/\.img\.(\d+)\.(\d+)/);
if(C){D.attr("src",E.replace(/\.img\.(\d+)\.(\d+)/,".img."+Math.floor(C[1]*B)+"."+Math.floor(C[2]*B)));
D.addClass("hi-res")
}else{var C=E.match(/\.img\.(\d+)/);
if(C){D.attr("src",E.replace(/\.img\.(\d+)/,".img."+Math.floor(C[1]*B)));
D.addClass("hi-res")
}}}})
}
}else{A.fn.hiRes=function(){return this
}
}})(jQuery);
(function(A){A.widget("mobile.datebox",A.mobile.widget,{options:{version:"2-1.1.0-2012062302",theme:false,themeDefault:"c",themeHeader:"a",mode:false,centerHoriz:false,centerVert:false,transition:"pop",useAnimation:true,hideInput:false,hideFixedToolbars:false,lockInput:true,enhanceInput:true,zindex:"500",clickEvent:"vclick",clickEventAlt:"click",resizeListener:true,defaultValue:false,dialogEnable:false,dialogForce:false,useModal:false,useInline:false,useInlineBlind:false,useHeader:true,useImmediate:false,useNewStyle:false,useAltIcon:false,overrideStyleClass:false,useButton:true,useFocus:false,useClearButton:false,useCollapsedBut:false,usePlaceholder:false,openCallback:false,openCallbackArgs:[],closeCallback:false,closeCallbackArgs:[],afterToday:false,beforeToday:false,notToday:false,maxDays:false,minDays:false,maxYear:false,minYear:false,blackDates:false,blackDays:false,minHour:false,maxHour:false,minuteStep:1,minuteStepRound:0,rolloverMode:{m:true,d:true,h:true,i:true,s:true},useLang:"default",lang:{"default":{setDateButtonLabel:"Set Date",setTimeButtonLabel:"Set Time",setDurationButtonLabel:"Set Duration",calTodayButtonLabel:"Jump to Today",titleDateDialogLabel:"Set Date",titleTimeDialogLabel:"Set Time",daysOfWeek:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysOfWeekShort:["Su","Mo","Tu","We","Th","Fr","Sa"],monthsOfYear:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsOfYearShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],durationLabel:["Days","Hours","Minutes","Seconds"],durationDays:["Day","Days"],timeFormat:24,headerFormat:"%A, %B %-d, %Y",tooltip:"Open Date Picker",nextMonth:"Next Month",prevMonth:"Previous Month",dateFieldOrder:["m","d","y"],timeFieldOrder:["h","i","a"],slideFieldOrder:["y","m","d"],dateFormat:"%Y-%m-%d",useArabicIndic:false,isRTL:false,calStartDay:0,clearButton:"Clear",durationOrder:["d","h","i","s"],meridiem:["AM","PM"],timeOutput:"%k:%M",durationFormat:"%Dd %DA, %Dl:%DM:%DS"}}},_enhanceDate:function(){A.extend(this._date.prototype,{copy:function(C,B){if(typeof C==="undefined"){C=[0,0,0,0,0,0,0]
}if(typeof B==="undefined"){B=[0,0,0,0,0,0,0]
}while(C.length<7){C.push(0)
}while(B.length<7){B.push(0)
}return new Date(((B[0]>0)?B[0]:this.getFullYear()+C[0]),((B[1]>0)?B[1]:this.getMonth()+C[1]),((B[2]>0)?B[2]:this.getDate()+C[2]),((B[3]>0)?B[3]:this.getHours()+C[3]),((B[4]>0)?B[4]:this.getMinutes()+C[4]),((B[5]>0)?B[5]:this.getSeconds()+C[5]),((B[6]>0)?B[5]:this.getMilliseconds()+C[6]))
},adj:function(C,B){if(typeof B!=="number"){throw new Error("Adjustment value not specified")
}if(typeof C!=="number"){throw new Error("Adjustment type not specified")
}switch(C){case 0:this.setFullYear(this.getFullYear()+B);
break;
case 1:this.setMonth(this.getMonth()+B);
break;
case 2:this.setDate(this.getDate()+B);
break;
case 3:this.setHours(this.getHours()+B);
break;
case 4:this.setMinutes(this.getMinutes()+B);
break;
case 5:this.setSeconds(this.getSeconds()+B);
break;
case 6:this.setMilliseconds(this.getMilliseconds()+B);
break
}return this
},set:function(C,B){switch(C){case 0:this.setFullYear(B);
break;
case 1:this.setMonth(B);
break;
case 2:this.setDate(B);
break;
case 3:this.setHours(B);
break;
case 4:this.setMinutes(B);
break;
case 5:this.setSeconds(B);
break;
case 6:this.setMilliseconds(B);
break
}return this
},get:function(B){switch(B){case 0:return this.getFullYear();
case 1:return this.getMonth();
case 2:return this.getDate();
case 3:return this.getHours();
case 4:return this.getMinutes();
case 5:return this.getSeconds()
}return false
},iso:function(){return String(this.getFullYear())+"-"+((this.getMonth()<9)?"0":"")+String(this.getMonth()+1)+"-"+((this.getDate()<10)?"0":"")+String(this.getDate())
},comp:function(){return parseInt(this.iso().replace(/-/g,""),10)
},getEpoch:function(){return(this.getTime()-this.getMilliseconds())/1000
},getArray:function(){return[this.getFullYear(),this.getMonth(),this.getDate(),this.getHours(),this.getMinutes(),this.getSeconds()]
},setFirstDay:function(B){this.set(2,1).adj(2,(B-this.getDay()));
if(this.get(2)>10){this.adj(2,7)
}return this
},setWeek:function(C,B){if(C===4){return this.set(1,0).set(2,1).setFirstDay(4).adj(2,-3).adj(2,(B-1)*7)
}return this.set(1,0).set(2,1).setFirstDay(C).adj(2,(B-1)*7)
},getWeek:function(D){var C,B;
switch(D){case 0:C=this.copy([0,-1*this.getMonth()]).setFirstDay(0);
return Math.floor((this.getTime()-C.getTime())/604800000)+1;
case 1:C=this.copy([0,-1*this.getMonth()]).setFirstDay(1);
return Math.floor((this.getTime()-C.getTime())/604800000)+1;
case 4:if(this.getMonth()===11&&this.getDate()>28){return 1
}C=this.copy([0,-1*this.getMonth()],true).setFirstDay(4).adj(2,-3);
B=Math.floor((this.getTime()-C.getTime())/604800000)+1;
if(B<1){C=this.copy([-1,-1*this.getMonth()]).setFirstDay(4).adj(2,-3);
return Math.floor((this.getTime()-C.getTime())/604800000)+1
}return B;
default:return 0
}}})
},_event:function(C,D){var B=A(this).data("datebox");
if(!C.isPropagationStopped()){switch(D.method){case"close":B.close();
break;
case"open":B.open();
break;
case"set":A(this).val(D.value);
A(this).trigger("change");
break;
case"doset":if(A.isFunction(B["_"+B.options.mode+"DoSet"])){B["_"+B.options.mode+"DoSet"].apply(B,[])
}else{A(this).trigger("datebox",{method:"set",value:B._formatter(B.__fmt(),B.theDate),date:B.theDate})
}break;
case"dooffset":if(D.type){B._offset(D.type,D.amount,true)
}break;
case"dorefresh":B.refresh();
break;
case"doreset":B.hardreset();
break;
case"doclear":A(this).val("").trigger("change");
break
}}},_hoover:function(B){A(B).toggleClass("ui-btn-up-"+A(B).jqmData("theme")+" ui-btn-down-"+A(B).jqmData("theme"))
},_ord:{"default":function(C){var B=C%10;
if(C>9&&C<21){return"th"
}if(B>3){return"th"
}return["th","st","nd","rd"][B]
}},__:function(C){var D=this.options,B="override"+C.charAt(0).toUpperCase()+C.slice(1);
if(typeof D[B]!=="undefined"){return D[B]
}if(typeof D.lang[D.useLang][C]!=="undefined"){return D.lang[D.useLang][C]
}if(typeof D[D.mode+"lang"][C]!=="undefined"){return D[D.mode+"lang"][C]
}return D.lang["default"][C]
},__fmt:function(){var B=this,C=this.options;
switch(C.mode){case"timebox":case"timeflipbox":return B.__("timeOutput");
case"durationbox":return B.__("durationFormat");
default:return B.__("dateFormat")
}},_zPad:function(B){return((B<10)?"0"+String(B):String(B))
},_dRep:function(C,E){var D=48,B=57,I=1584,H=null,G=null,F="";
if(E===-1){D+=I;
B+=I;
I=-1584
}for(H=0;
H<C.length;
H++){G=C.charCodeAt(H);
if(G>=D&&G<=B){F=F+String.fromCharCode(G+I)
}else{F=F+String.fromCharCode(G)
}}return F
},_doIndic:function(){var B=this;
B.d.intHTML.find("*").each(function(){if(A(this).children().length<1){A(this).text(B._dRep(A(this).text()))
}else{if(A(this).hasClass("ui-datebox-slideday")){A(this).html(B._dRep(A(this).html()))
}}});
B.d.intHTML.find("input").each(function(){A(this).val(B._dRep(A(this).val()))
})
},_parser:{"default":function(B){return false
}},_n:function(C,B){return(C<0)?B:C
},_pa:function(B,C){if(typeof C==="boolean"){return new this._date(B[0],B[1],B[2],0,0,0,0)
}return new this._date(C.getFullYear(),C.getMonth(),C.getDate(),B[0],B[1],B[2],0)
},_makeDate:function(E){E=A.trim(((this.__("useArabicIndic")===true)?this._dRep(E,-1):E));
var B=this,K=this.options,J=B.__fmt(),C=null,G=[],D=null,L=null,I=new B._date(),F={year:-1,mont:-1,date:-1,hour:-1,mins:-1,secs:-1,week:false,wtyp:4,wday:false,yday:false,meri:0},H;
if(typeof K.mode==="undefined"){return I
}if(typeof B._parser[K.mode]!=="undefined"){return B._parser[K.mode].apply(B,[E])
}if(K.mode==="durationbox"){J=J.replace(/%D([a-z])/gi,function(N,M){switch(M){case"d":case"l":case"M":case"S":return"("+N+"|[0-9]+)";
default:return".+?"
}});
J=new RegExp("^"+J+"$");
C=J.exec(E);
D=J.exec(B.__fmt());
if(C===null||C.length!==D.length){if(typeof K.defaultValue==="number"&&K.defaultValue>0){return new B._date((B.initDate.getEpoch()+parseInt(K.defaultValue,10))*1000)
}return new B._date(B.initDate.getTime())
}L=B.initDate.getEpoch();
for(H=0;
H<C.length;
H++){if(D[H].match(/^%Dd$/i)){L=L+(parseInt(C[H],10)*60*60*24)
}if(D[H].match(/^%Dl$/i)){L=L+(parseInt(C[H],10)*60*60)
}if(D[H].match(/^%DM$/i)){L=L+(parseInt(C[H],10)*60)
}if(D[H].match(/^%DS$/i)){L=L+(parseInt(C[H],10))
}}return new B._date((L*1000))
}J=J.replace(/%(0|-)*([a-z])/gi,function(O,M,N){G.push(N);
switch(N){case"p":case"P":case"b":case"B":return"("+O+"|.+?)";
case"H":case"k":case"I":case"l":case"m":case"M":case"S":case"V":case"U":case"u":case"W":case"d":return"("+O+"|"+((M==="-")?"[0-9]{1,2}":"[0-9]{2}")+")";
case"j":return"("+O+"|[0-9]{3})";
case"s":return"("+O+"|[0-9]+)";
case"g":case"y":return"("+O+"|[0-9]{2})";
case"E":case"G":case"Y":return"("+O+"|[0-9]{1,4})";
default:G.pop();
return".+?"
}});
J=new RegExp("^"+J+"$");
C=J.exec(E);
D=J.exec(B.__fmt());
if(C===null||C.length!==D.length){if(K.defaultValue!==false){switch(typeof K.defaultValue){case"object":if(K.defaultValue.length===3){I=B._pa(K.defaultValue,((K.mode==="timebox"||K.mode==="timeflipbox")?I:false))
}break;
case"number":I=new B._date(K.defaultValue*1000);
break;
case"string":if(K.mode==="timebox"||K.mode==="timeflipbox"){L=K.defaultValue.split(":");
if(L.length===3){I=B._pa([L[0],L[1],L[2]],I)
}}else{L=K.defaultValue.split("-");
if(L.length===3){I=B._pa([L[0],L[1]-1,L[2]],false)
}}break
}}if(isNaN(I.getDate())){I=new B._date()
}}else{for(H=1;
H<C.length;
H++){switch(G[H-1]){case"s":return new B._date(parseInt(C[H],10)*1000);
case"Y":case"G":F.year=parseInt(C[H],10);
break;
case"E":F.year=parseInt(C[H],10)-543;
break;
case"y":case"g":if(K.afterToday===true||parseInt(C[H],10)<38){F.year=parseInt("20"+C[H],10)
}else{F.year=parseInt("19"+C[H],10)
}break;
case"m":F.mont=parseInt(C[H],10)-1;
break;
case"d":F.date=parseInt(C[H],10);
break;
case"H":case"k":case"I":case"l":F.hour=parseInt(C[H],10);
break;
case"M":F.mins=parseInt(C[H],10);
break;
case"S":F.secs=parseInt(C[H],10);
break;
case"u":F.wday=parseInt(C[H],10)-1;
break;
case"w":F.wday=parseInt(C[H],10);
break;
case"j":F.yday=parseInt(C[H],10);
break;
case"V":F.week=parseInt(C[H],10);
F.wtyp=4;
break;
case"U":F.week=parseInt(C[H],10);
F.wtyp=0;
break;
case"W":F.week=parseInt(C[H],10);
F.wtyp=1;
break;
case"p":case"P":F.meri=((C[H].toLowerCase()===B.__("meridiem")[0].toLowerCase())?-1:1);
break;
case"b":L=A.inArray(C[H],B.__("monthsOfYearShort"));
if(L>-1){F.mont=L
}break;
case"B":L=A.inArray(C[H],B.__("monthsOfYear"));
if(L>-1){F.mont=L
}break
}}if(F.meri!==0){if(F.meri===-1&&F.hour===12){F.hour=0
}if(F.meri===1&&F.hour!==12){F.hour=F.hour+12
}}I=new B._date(B._n(F.year,1),B._n(F.mont,1),B._n(F.date,1),B._n(F.hour,0),B._n(F.mins,0),B._n(F.secs,0),0);
if(F.year<100&&F.year!==-1){I.setFullYear(F.year)
}if((F.mont>-1&&F.date>-1)||(F.hour>-1&&F.mins>-1&&F.secs>-1)){return I
}if(F.week!==false){I.setWeek(F.wtyp,F.week);
if(F.date>-1){I.setDate(F.date)
}}if(F.yday!==false){I.set(1,0).set(2,1).adj(2,(F.yday-1))
}if(F.wday!==false){I.adj(2,(F.wday-I.getDay()))
}}return I
},_customformat:{"default":function(C,B){return false
}},_formatter:function(D,G){var B=this,C=this.options,F,E={part:[0,0,0,0],tp:0};
if(C.mode==="durationbox"){E.tp=this.theDate.getEpoch()-this.initDate.getEpoch();
E.part[0]=parseInt(E.tp/(60*60*24),10);
E.tp-=(E.part[0]*60*60*24);
E.part[1]=parseInt(E.tp/(60*60),10);
E.tp-=(E.part[1]*60*60);
E.part[2]=parseInt(E.tp/(60),10);
E.tp-=(E.part[2]*60);
E.part[3]=E.tp;
if(!D.match(/%Dd/)){E.part[1]+=(E.part[0]*24)
}if(!D.match(/%Dl/)){E.part[2]+=(E.part[1]*60)
}if(!D.match(/%DM/)){E.part[3]+=(E.part[2]*60)
}}D=D.replace(/%(D|X|0|-)*([1-9a-zA-Z])/g,function(J,I,H){if(I==="X"){if(typeof B._customformat[C.mode]!=="undefined"){return B._customformat[C.mode](H,G)
}return J
}if(I==="D"){switch(H){case"d":return E.part[0];
case"l":return B._zPad(E.part[1]);
case"M":return B._zPad(E.part[2]);
case"S":return B._zPad(E.part[3]);
case"A":return((E.part[0]>1)?B.__("durationDays")[1]:B.__("durationDays")[0]);
default:return J
}}switch(H){case"%":return"%";
case"a":return B.__("daysOfWeekShort")[G.getDay()];
case"A":return B.__("daysOfWeek")[G.getDay()];
case"b":return B.__("monthsOfYearShort")[G.getMonth()];
case"B":return B.__("monthsOfYear")[G.getMonth()];
case"C":return G.getFullYear().toString().substr(0,2);
case"d":return((I==="-")?G.getDate():B._zPad(G.getDate()));
case"H":case"k":return((I==="-")?G.getHours():B._zPad(G.getHours()));
case"I":case"l":return((I==="-")?((G.getHours()===0||G.getHours()===12)?12:((G.getHours()<12)?G.getHours():(G.getHours()-12))):B._zPad(((G.getHours()===0||G.getHours()===12)?12:((G.getHours()<12)?G.getHours():G.getHours()-12))));
case"m":return((I==="-")?G.getMonth()+1:B._zPad(G.getMonth()+1));
case"M":return((I==="-")?G.getMinutes():B._zPad(G.getMinutes()));
case"p":return((G.getHours()<12)?B.__("meridiem")[0].toUpperCase():B.__("meridiem")[1].toUpperCase());
case"P":return((G.getHours()<12)?B.__("meridiem")[0].toLowerCase():B.__("meridiem")[1].toLowerCase());
case"s":return G.getEpoch();
case"S":return((I==="-")?G.getSeconds():B._zPad(G.getSeconds()));
case"u":return((I==="-")?G.getDay()+1:B._zPad(G.getDay()+1));
case"w":return G.getDay();
case"y":return G.getFullYear().toString().substr(2,2);
case"Y":return G.getFullYear();
case"E":return G.getFullYear()+543;
case"V":return((I==="-")?G.getWeek(4):B._zPad(G.getWeek(4)));
case"U":return((I==="-")?G.getWeek(0):B._zPad(G.getWeek(0)));
case"W":return((I==="-")?G.getWeek(1):B._zPad(G.getWeek(1)));
case"o":if(typeof B._ord[C.useLang]!=="undefined"){return B._ord[C.useLang](G.getDate())
}return B._ord["default"](G.getDate());
case"j":F=new Date(G.getFullYear(),0,1);
F=Math.ceil((G-F)/86400000)+1;
return((F<100)?((F<10)?"00":"0"):"")+String(F);
case"G":if(G.getWeek(4)===1&&G.getMonth()>0){return G.getFullYear()+1
}if(G.getWeek(4)>51&&G.getMonth()<11){return G.getFullYear()-1
}return G.getFullYear();
case"g":if(G.getWeek(4)===1&&G.getMonth()>0){return parseInt(G.getFullYear().toString().substr(2,2),10)+1
}if(G.getWeek(4)>51&&G.getMonth()<11){return parseInt(G.getFullYear().toString().substr(2,2),10)-1
}return G.getFullYear().toString().substr(2,2);
default:return J
}});
if(B.__("useArabicIndic")===true){D=B._dRep(D)
}return D
},_btwn:function(C,B,D){return(C>B&&C<D)
},_minStepFix:function(){var D=this.theDate.get(4),E,B=this,C=this.options;
if(C.minuteStep>1&&D%C.minuteStep>0){if(C.minuteStepRound<0){D=D-(D%C.minuteStep)
}else{if(C.minStepRound>0){D=D+(C.minuteStep-(D%C.minuteStep))
}else{if(D%C.minuteStep<C.minuteStep/2){D=D-(D%C.minuteStep)
}else{D=D+(C.minuteStep-(D%C.minuteStep))
}}}B.theDate.setMinutes(D)
}},_offset:function(D,F,C){var B=this,E=this.options,G=false;
D=(D||"").toLowerCase();
if(typeof (C)==="undefined"){C=true
}B.d.input.trigger("datebox",{method:"offset",type:D,amount:F});
if(D!=="a"&&(typeof E.rolloverMode[D]==="undefined"||E.rolloverMode[D]===true)){G=A.inArray(D,["y","m","d","h","i","s"])
}else{switch(D){case"y":G=0;
break;
case"m":if(B._btwn(B.theDate.getMonth()+F,-1,12)){G=1
}break;
case"d":if(B._btwn(B.theDate.getDate()+F,0,(32-B.theDate.copy([0],[0,0,32,13]).getDate()+1))){G=2
}break;
case"h":if(B._btwn(B.theDate.getHours()+F,-1,24)){G=3
}break;
case"i":if(B._btwn(B.theDate.getMinutes()+F,-1,60)){G=4
}break;
case"s":if(B._btwn(B.theDate.getSeconds()+F,-1,60)){G=5
}break;
case"a":B._offset("h",((F>0)?1:-1)*12,false);
break
}}if(G!==false){B.theDate.adj(G,F)
}if(C===true){B.refresh()
}if(E.useImmediate){B.d.input.trigger("datebox",{method:"doset"})
}},_create:function(){A(document).trigger("dateboxcreate");
var B=this,D=A.extend(this.options,(typeof this.element.jqmData("options")!=="undefined")?this.element.jqmData("options"):this._getLongOptions(this.element)),I=(D.theme===false&&typeof (A(this).jqmData("theme"))==="undefined")?((typeof (this.element.parentsUntil(":jqmData(theme)").parent().jqmData("theme"))==="undefined")?D.themeDefault:this.element.parentsUntil(":jqmData(theme)").parent().jqmData("theme")):D.theme,H=D.useAnimation?D.transition:"none",E=D.useNewStyle===false?{input:this.element,wrap:this.element.wrap('<div class="ui-input-datebox ui-shadow-inset ui-corner-all '+(this.element.jqmData("mini")===true?"ui-mini ":"")+"ui-body-"+I+'"></div>').parent(),mainWrap:A("<div>",{"class":"ui-datebox-container ui-overlay-shadow ui-corner-all ui-datebox-hidden "+H+" ui-body-"+I}).css("zIndex",D.zindex),intHTML:false}:{input:this.element,wrap:this.element,mainWrap:A("<div>",{"class":"ui-datebox-container ui-overlay-shadow ui-corner-all ui-datebox-hidden "+H+" ui-body-"+I}).css("zIndex",D.zindex),intHTML:false},C=(typeof window.ontouchstart!=="undefined"),F={eStart:(C?"touchstart":"mousedown")+".datebox",eMove:(C?"touchmove":"mousemove")+".datebox",eEnd:(C?"touchend":"mouseup")+".datebox",eEndA:(C?"mouseup.datebox touchend.datebox touchcancel.datebox touchmove.datebox":"mouseup.datebox"),move:false,start:false,end:false,pos:false,target:false,delta:false,tmp:false},G=(typeof A.mobile.ns!=="undefined")?A.mobile.ns:"";
A.extend(B,{d:E,ns:G,drag:F,touch:C});
if(D.usePlaceholder!==false){if(D.usePlaceholder===true&&B._grabLabel()!==false){B.d.input.attr("placeholder",B._grabLabel())
}if(typeof D.usePlaceholder==="string"){B.d.input.attr("placeholder",D.usePlaceholder)
}}D.theme=I;
B.clearFunc=false;
B.disabled=false;
B.runButton=false;
B._date=window.Date;
B._enhanceDate();
B.initDate=new B._date();
B.theDate=(D.defaultValue)?B._makeDate(D.defaultValue):new B._date();
B.initDone=false;
if(D.useButton===true&&D.useInline===false&&D.useNewStyle===false){B.d.open=A('<a href="#" class="ui-input-clear" title="'+this.__("tooltip")+'">'+this.__("tooltip")+"</a>").on(D.clickEvent,function(J){J.preventDefault();
if(!B.disabled){B.d.input.trigger("datebox",{method:"open"});
B.d.wrap.addClass("ui-focus")
}setTimeout(function(){A(J.target).closest("a").removeClass(A.mobile.activeBtnClass)
},300)
}).appendTo(B.d.wrap).buttonMarkup({icon:"grid",iconpos:"notext",corners:true,shadow:true}).css({"vertical-align":"middle",display:"inline-block"})
}B.d.screen=A("<div>",{"class":"ui-datebox-screen ui-datebox-hidden"+((D.useModal)?" ui-datebox-screen-modal":"")}).css({"z-index":D.zindex-1}).on(D.clickEventAlt,function(J){J.preventDefault();
B.d.input.trigger("datebox",{method:"close"})
});
if(D.enhanceInput===true&&navigator.userAgent.match(/Android/i)){B.inputType="number"
}else{B.inputType="text"
}if(D.hideInput){B.d.wrap.hide()
}A("label[for='"+B.d.input.attr("id")+"']").addClass("ui-input-text").css("verticalAlign","middle");
B.d.wrap.on(D.clickEvent,function(){if(!B.disabled&&(D.noButtonFocusMode||D.focusMode)){B.d.input.trigger("datebox",{method:"open"});
B.d.wrap.addClass("ui-focus");
B.d.input.removeClass("ui-focus")
}});
B.d.input.removeClass("ui-corner-all ui-shadow-inset").bind(B.touch?"touchend":"click",function(J){if(B.disabled===false&&D.useNewStyle===true&&D.useFocus===false){if(((B.touch?J.originalEvent.changedTouches[0].pageX:J.pageX)-J.target.offsetLeft)>(J.target.offsetWidth-20)){B.d.input.trigger("datebox",{method:"open"});
B.d.wrap.addClass("ui-focus")
}}}).focus(function(){if(B.disabled===false&&D.useFocus===true){B.d.input.trigger("datebox",{method:"open"});
B.d.wrap.addClass("ui-focus")
}if(D.useNewStyle===false){B.d.input.removeClass("ui-focus")
}}).blur(function(){B.d.wrap.removeClass("ui-focus");
B.d.input.removeClass("ui-focus")
}).change(function(){B.theDate=B._makeDate(B.d.input.val());
B.refresh()
}).attr("readonly",D.lockInput).on("datebox",B._event);
if(D.useNewStyle===true){B.d.input.addClass("ui-shadow-inset ui-corner-all "+((D.useAltIcon===true)?"ui-icon-datebox-alt":"ui-icon-datebox"));
if(D.overrideStyleClass!==false){B.d.input.addClass(D.overrideStyleClass)
}}if(typeof A.event.special.mousewheel!=="undefined"){B.wheelExists=true
}if(B.d.input.is(":disabled")){B.disable()
}if(D.useInline===true||D.useInlineBlind){B.open()
}A(document).trigger("dateboxaftercreate")
},_build:{"default":function(){this.d.headerText="Error";
this.d.intHTML=A("<div class='ui-body-e'><h2 style='text-align:center'>There is no mode by that name loaded / mode not given</h2></div>")
}},_applyCoords:function(E){var B=E.widget,D=E.widget.options,G={h:A.mobile.activePage.find(".ui-header").jqmData("position"),f:A.mobile.activePage.find(".ui-footer").jqmData("position"),fh:A.mobile.activePage.find(".ui-footer").outerHeight(),hh:A.mobile.activePage.find(".ui-header").outerHeight()},I={x:B.d.wrap.offset().left+(B.d.wrap.outerWidth()/2),y:B.d.wrap.offset().top+(B.d.wrap.outerHeight()/2)},H={w:B.d.mainWrap.outerWidth(),h:B.d.mainWrap.outerHeight()},F={t:A(window).scrollTop(),h:A(window).height(),w:A.mobile.activePage.width(),ah:A(document).height()},C={y:(D.centerVert)?F.t+((F.h/2)-(H.h/2)):I.y-(H.h/2),x:(F.w<400||D.centerHoriz)?(F.w/2)-(H.w/2):I.x-(H.w/2)};
if(D.centerVert===false){if(D.hideFixedToolbars===true&&(typeof G.f!=="undefined"||typeof G.h!=="undefined")){A.mobile.activePage.find(":jqmData(position='fixed')").fixedtoolbar("hide");
G.f=undefined;
G.h=undefined
}if(typeof G.f!=="undefined"){if((C.y+H.h)>(F.h-G.fh-2)){C.y=F.h-G.fh-2-H.h
}}else{if((C.y+H.h)>(F.ah-G.fh-2)){C.y=F.ah-G.fh-2-H.h
}if((F.h+F.t)<(H.h+C.y+2)){C.y=F.h+F.t-H.h-2
}}if(typeof G.h!=="undefined"){if((F.t+G.hh+2)>C.y){C.y=F.t+G.hh+2
}}else{if(G.hh+2>C.y){C.y=G.hh+2
}if(C.y<F.t+2){C.y=F.t+2
}}}B.d.mainWrap.css({position:"absolute",top:C.y,left:C.x})
},_drag:{"default":function(){return false
}},open:function(){var B=this,C=this.options,D="data-"+this.ns,E=C.useAnimation?C.transition:"none";
if(C.useFocus===true&&B.fastReopen===true){B.d.input.blur();
return false
}if(B.clearFunc!==false){clearTimeout(B.clearFunc);
B.clearFunc=false
}if(C.openCallback!==false){if(!A.isFunction(C.openCallback)){if(typeof window[C.openCallback]!=="undefined"){C.openCallback=window[C.openCallback]
}else{C.openCallback=new Function(C.openCallback)
}}if(C.openCallback.apply(B,A.merge([B.theDate],C.openCallbackArgs))===false){return false
}}B.theDate=B._makeDate(B.d.input.val());
B.d.input.blur();
if(typeof B._build[C.mode]==="undefined"){B._build["default"].apply(B,[])
}else{B._build[C.mode].apply(B,[])
}if(typeof B._drag[C.mode]!=="undefined"){B._drag[C.mode].apply(B,[])
}B.d.input.trigger("datebox",{method:"refresh"});
if(B.__("useArabicIndic")===true){B._doIndic()
}if((C.useInline===true||C.useInlineBlind===true)&&B.initDone===false){B.d.mainWrap.append(B.d.intHTML);
B.d.input.parent().parent().append(B.d.mainWrap);
B.d.mainWrap.removeClass("ui-datebox-hidden");
if(C.useInline===true){B.d.mainWrap.addClass("ui-datebox-inline")
}else{B.d.mainWrap.addClass("ui-datebox-inlineblind");
B.d.mainWrap.hide()
}B.initDone=false;
B.d.input.trigger("datebox",{method:"postrefresh"})
}if(C.useImmediate){B.d.input.trigger("datebox",{method:"doset"})
}if(C.useInline){return true
}if(C.useInlineBlind){if(B.initDone){B.d.mainWrap.slideDown()
}else{B.initDone=true
}return true
}if(B.d.intHTML.is(":visible")){return false
}if(C.dialogForce||(C.dialogEnable&&window.width()<400)){B.d.dialogPage=A("<div "+D+"role='dialog' "+D+"theme='"+C.theme+"' ><div "+D+"role='header' "+D+"theme='"+C.themeHeader+"'><h1>"+B.d.headerText+"</h1></div><div "+D+"role='content'></div>").appendTo(A.mobile.pageContainer).page().css("minHeight","0px").addClass(E);
B.d.dialogPage.find(".ui-header").find("a").off("click vclick").on(C.clickEventAlt,function(F){F.preventDefault();
B.d.input.trigger("datebox",{method:"close"})
});
B.d.mainWrap.append(B.d.intHTML).css({marginLeft:"auto",marginRight:"auto"}).removeClass("ui-datebox-hidden");
B.d.dialogPage.find(".ui-content").append(B.d.mainWrap);
B.d.input.trigger("datebox",{method:"postrefresh"});
A.mobile.activePage.off("pagehide.remove");
A.mobile.changePage(B.d.dialogPage,{transition:E})
}else{B.d.dialogPage=false;
B.d.mainWrap.empty();
if(C.useHeader===true){B.d.headHTML=A('<div class="ui-header ui-bar-'+C.themeHeader+'"></div>');
A("<a class='ui-btn-left' href='#'>Close</a>").appendTo(B.d.headHTML).buttonMarkup({theme:C.themeHeader,icon:"delete",iconpos:"notext",corners:true,shadow:true}).on(C.clickEventAlt,function(F){F.preventDefault();
B.d.input.trigger("datebox",{method:"close"})
});
A('<h1 class="ui-title">'+B.d.headerText+"</h1>").appendTo(B.d.headHTML);
B.d.mainWrap.append(B.d.headHTML)
}B.d.mainWrap.append(B.d.intHTML).css("zIndex",C.zindex);
B.d.mainWrap.appendTo(A.mobile.activePage);
B.d.screen.appendTo(A.mobile.activePage);
B.d.input.trigger("datebox",{method:"postrefresh"});
B._applyCoords({widget:B});
if(C.useModal===true){if(C.useAnimation){B.d.screen.fadeIn("slow")
}else{B.d.screen.show()
}}else{setTimeout(function(){B.d.screen.removeClass("ui-datebox-hidden")
},500)
}B.d.mainWrap.addClass("ui-overlay-shadow in").removeClass("ui-datebox-hidden");
A(document).on("orientationchange.datebox",{widget:B},function(F){B._applyCoords(F.data)
});
if(C.resizeListener===true){A(window).on("resize.datebox",{widget:B},function(F){B._applyCoords(F.data)
})
}}},close:function(){var B=this,C=this.options;
if(C.useInlineBlind===true){B.d.mainWrap.slideUp();
return true
}if(C.useInline===true){return true
}if(B.d.dialogPage!==false){A(B.d.dialogPage).dialog("close");
if(!A.mobile.activePage.jqmData("page").options.domCache){A.mobile.activePage.on("pagehide.remove",function(){A(this).remove()
})
}B.d.intHTML.detach().empty();
B.d.mainWrap.detach().empty();
B.d.wrap.removeClass("ui-focus");
B.clearFunc=setTimeout(function(){B.d.dialogPage.empty().remove();
B.clearFunc=false
},1500)
}else{if(C.useModal){if(C.useAnimation){B.d.screen.fadeOut("slow")
}else{B.d.screen.hide()
}}else{B.d.screen.addClass("ui-datebox-hidden")
}B.d.screen.detach();
B.d.mainWrap.addClass("ui-datebox-hidden").removeAttr("style").removeClass("in ui-overlay-shadow").empty().detach();
B.d.intHTML.detach();
B.d.wrap.removeClass("ui-focus");
A(document).off("orientationchange.datebox");
if(C.resizeListener===true){A(window).off("resize.datebox")
}}A(document).off(B.drag.eMove);
A(document).off(B.drag.eEnd);
A(document).off(B.drag.eEndA);
if(C.useFocus){B.fastReopen=true;
setTimeout(function(D){return function(){D.fastReopen=false
}
}(B),300)
}if(C.closeCallback!==false){if(!A.isFunction(C.closeCallback)){if(typeof window[C.closeCallback]!=="undefined"){C.closeCallback=window[C.closeCallback]
}else{C.closeCallback=new Function(C.closeCallback)
}}C.closeCallback.apply(B,A.merge([B.theDate],C.closeCallbackArgs))
}},refresh:function(){if(typeof this._build[this.options.mode]==="undefined"){this._build["default"].apply(this,[])
}else{this._build[this.options.mode].apply(this,[])
}if(this.__("useArabicIndic")===true){this._doIndic()
}this.d.mainWrap.append(this.d.intHTML);
this.d.input.trigger("datebox",{method:"postrefresh"})
},_check:function(){var B=this,C=null,D=this.options;
B.dateOK=true;
if(D.afterToday!==false){C=new B._date();
if(B.theDate<C){B.theDate=C
}}if(D.beforeToday!==false){C=new B._date();
if(B.theDate>C){B.theDate=C
}}if(D.maxDays!==false){C=new B._date();
C.adj(2,D.maxDays);
if(B.theDate>C){B.theDate=C
}}if(D.minDays!==false){C=new B._date();
C.adj(2,-1*D.minDays);
if(B.theDate<C){B.theDate=C
}}if(D.minHour!==false){if(B.theDate.getHours()<D.minHour){B.theDate.setHours(D.minHour)
}}if(D.maxHour!==false){if(B.theDate.getHours()>D.maxHour){B.theDate.setHours(D.maxHour)
}}if(D.maxYear!==false){C=new B._date(D.maxYear,0,1);
C.adj(2,-1);
if(B.theDate>C){B.theDate=C
}}if(D.minYear!==false){C=new B._date(D.minYear,0,1);
if(B.theDate<C){B.theDate=C
}}if(A.inArray(D.mode,["timebox","durationbox","timeflipbox"])>-1){if(D.mode==="timeflipbox"&&D.validHours!==false){if(A.inArray(B.theDate.getHours(),D.validHours)<0){B.dateOK=false
}}}else{if(D.blackDates!==false){if(A.inArray(B.theDate.iso(),D.blackDates)>-1){B.dateOK=false
}}if(D.blackDays!==false){if(A.inArray(B.theDate.getDay(),D.blackDays)>-1){B.dateOK=false
}}}},_grabLabel:function(){var B=this,C=this.options;
if(typeof C.overrideDialogLabel==="undefined"){if(typeof B.d.input.attr("title")!=="undefined"){return B.d.input.attr("title")
}if(B.d.wrap.parent().find("label[for="+B.d.input.attr("id")+"]").text()!==""){return B.d.wrap.parent().find("label[for="+B.d.input.attr("id")+"]").text()
}return false
}return C.overrideDialogLabel
},_makeEl:function(D,C){var B=false,E=false;
E=D.clone();
if(typeof C.attr!=="undefined"){for(B in C.attr){if(C.attr.hasOwnProperty(B)){E.jqmData(B,C.attr[B])
}}}return E
},_getLongOptions:function(E){var F,D={},C,B;
if(A.mobile.ns===""){C="datebox"
}else{C=A.mobile.ns.substr(0,A.mobile.ns.length-1)+"Datebox"
}for(F in E.data()){if(F.substr(0,C.length)===C&&F.length>C.length){B=F.substr(C.length);
B=B.charAt(0).toLowerCase()+B.slice(1);
D[B]=E.data(F)
}}return D
},disable:function(){this.d.input.attr("disabled",true);
this.d.wrap.addClass("ui-disabled").blur();
this.disabled=true;
this.d.input.trigger("datebox",{method:"disable"})
},enable:function(){this.d.input.attr("disabled",false);
this.d.wrap.removeClass("ui-disabled");
this.disabled=false;
this.d.input.trigger("datebox",{method:"enable"})
},_setOption:function(){A.Widget.prototype._setOption.apply(this,arguments);
this.refresh()
}});
A(document).on("pagebeforecreate",function(B){A(":jqmData(role='datebox')",B.target).each(function(){A(this).prop("type","text")
})
});
A(document).on("pagecreate create",function(B){A(document).trigger("dateboxbeforecreate");
A(":jqmData(role='datebox')",B.target).each(function(){if(typeof (A(this).data("datebox"))==="undefined"){A(this).datebox()
}})
})
})(jQuery);
(function(A){A.extend(A.mobile.datebox.prototype.options,{themeDateToday:"a",themeDayHigh:"e",themeDatePick:"a",themeDateHigh:"e",themeDateHighAlt:"e",themeDate:"d",calHighToday:true,calHighPick:true,calShowDays:true,calOnlyMonth:false,calWeekMode:false,calWeekModeDay:1,calWeekHigh:false,calControlGroup:false,calShowWeek:false,calUsePickers:false,calNoHeader:false,useTodayButton:false,useCollapsedBut:false,highDays:false,highDates:false,highDatesAlt:false,enableDates:false});
A.extend(A.mobile.datebox.prototype,{_cal_gen:function(K,I,C,F,G){var M=0,J=0,D=1,H=1,L=[],B=[],E=false;
for(M=0;
M<=5;
M++){if(E===false){B=[];
for(J=0;
J<=6;
J++){if(M===0&&J<K){if(F===true){B.push([I+(J-K)+1,G-1])
}else{B.push(false)
}}else{if(M>3&&D>C){if(F===true){B.push([H,G+1]);
H++
}else{B.push(false)
}E=true
}else{B.push([D,G]);
D++;
if(D>C){E=true
}}}}L.push(B)
}}return L
},_cal_check:function(D,F,E,G){var B=this,C=this.options,H={},I=new this._date(F,E,G,0,0,0,0).getDay();
H.ok=true;
H.iso=F+"-"+B._zPad(E+1)+"-"+B._zPad(G);
H.comp=parseInt(H.iso.replace(/-/g,""),10);
H.theme=C.themeDate;
if(A.isArray(C.enableDates)&&A.inArray(H.iso,C.enableDates)<0){H.ok=false
}else{if(D.checkDates){if((C.afterToday===true&&D.thisDate.comp()>H.comp)||(C.beforeToday===true&&D.thisDate.comp()<H.comp)||(C.notToday===true&&D.thisDate.comp()===H.comp)||(C.maxDays!==false&&D.maxDate.comp()<H.comp)||(C.minDays!==false&&D.minDate.comp()>H.comp)||(A.isArray(C.blackDays)&&A.inArray(I,C.blackDays)>-1)||(A.isArray(C.blackDates)&&A.inArray(H.iso,C.blackDates)>-1)){H.ok=false
}}}if(H.ok){if(C.calHighPick&&G===D.presetDay){H.theme=C.themeDatePick
}else{if(C.calHighToday&&H.comp===D.thisDate.comp()){H.theme=C.themeDateToday
}else{if(A.isArray(C.highDatesAlt)&&(A.inArray(H.iso,C.highDatesAlt)>-1)){H.theme=C.themeDateHighAlt
}else{if(A.isArray(C.highDates)&&(A.inArray(H.iso,C.highDates)>-1)){H.theme=C.themeDateHigh
}else{if(A.isArray(C.highDays)&&(A.inArray(I,C.highDays)>-1)){H.theme=C.themeDayHigh
}}}}}}return H
}});
A.extend(A.mobile.datebox.prototype._build,{calbox:function(){var E=this,J=this.options,H,K=false,G="ui-datebox-",C=false,B=false,I=false,D=false,F=false;
if(typeof E.d.intHTML!=="boolean"){E.d.intHTML.remove()
}E.d.headerText=((E._grabLabel()!==false)?E._grabLabel():E.__("titleDateDialogLabel"));
E.d.intHTML=A("<span>");
A('<div class="'+G+'gridheader"><div class="'+G+'gridlabel"><h4>'+E.__("monthsOfYear")[E.theDate.getMonth()]+" "+E.theDate.getFullYear()+"</h4></div></div>").appendTo(E.d.intHTML);
A("<div class='"+G+"gridplus"+(E.__("isRTL")?"-rtl":"")+"'><a href='#'>"+E.__("nextMonth")+"</a></div>").prependTo(E.d.intHTML.find("."+G+"gridheader")).buttonMarkup({theme:J.themeDate,icon:"arrow-r",inline:true,iconpos:"notext",corners:true,shadow:true}).on(J.clickEventAlt,function(L){L.preventDefault();
if(E.calNext){if(E.theDate.getDate()>28){E.theDate.setDate(1)
}E._offset("m",1)
}});
A("<div class='"+G+"gridminus"+(E.__("isRTL")?"-rtl":"")+"'><a href='#'>"+E.__("prevMonth")+"</a></div>").prependTo(E.d.intHTML.find("."+G+"gridheader")).buttonMarkup({theme:J.themeDate,icon:"arrow-l",inline:true,iconpos:"notext",corners:true,shadow:true}).on(J.clickEventAlt,function(L){L.preventDefault();
if(E.calPrev){if(E.theDate.getDate()>28){E.theDate.setDate(1)
}E._offset("m",-1)
}});
if(J.calNoHeader===true){E.d.intHTML.find("."+G+"gridheader").remove()
}K={today:-1,highlightDay:-1,presetDay:-1,startDay:E.__("calStartDay"),thisDate:new E._date(),maxDate:E.initDate.copy(),minDate:E.initDate.copy(),currentMonth:false,weekMode:0,weekDays:null};
K.start=(E.theDate.copy([0],[0,0,1]).getDay()-E.__("calStartDay")+7)%7;
K.thisMonth=E.theDate.getMonth();
K.thisYear=E.theDate.getFullYear();
K.wk=E.theDate.copy([0],[0,0,1]).adj(2,(-1*K.start)+(E.__("calStartDay")===0?1:0)).getWeek(4);
K.end=32-E.theDate.copy([0],[0,0,32,13]).getDate();
K.lastend=32-E.theDate.copy([0,-1],[0,0,32,13]).getDate();
K.presetDate=E._makeDate(E.d.input.val());
K.thisDateArr=K.thisDate.getArray();
K.theDateArr=E.theDate.getArray();
K.checkDates=(A.inArray(false,[J.afterToday,J.beforeToday,J.notToday,J.maxDays,J.minDays,J.blackDates,J.blackDays])>-1);
E.calNext=true;
E.calPrev=true;
if(K.thisDateArr[0]===K.theDateArr[0]&&K.thisDateArr[1]===K.theDateArr[1]){K.currentMonth=true
}if(K.presetDate.comp()===E.theDate.comp()){K.presetDay=K.presetDate.getDate()
}if(J.afterToday===true&&(K.currentMonth===true||(K.thisDateArr[1]>=K.theDateArr[1]&&K.theDateArr[0]===K.thisDateArr[0]))){E.calPrev=false
}if(J.beforeToday===true&&(K.currentMonth===true||(K.thisDateArr[1]<=K.theDateArr[1]&&K.theDateArr[0]===K.thisDateArr[0]))){E.calNext=false
}if(J.minDays!==false){K.minDate.adj(2,-1*J.minDays);
if(K.theDateArr[0]===K.minDate.getFullYear()&&K.theDateArr[1]<=K.minDate.getMonth()){E.calPrev=false
}}if(J.maxDays!==false){K.maxDate.adj(2,J.maxDays);
if(K.theDateArr[0]===K.maxDate.getFullYear()&&K.theDateArr[1]>=K.maxDate.getMonth()){E.calNext=false
}}if(J.calUsePickers===true){K.picker=A("<div>",{"class":"ui-grid-a ui-datebox-grid",style:"padding-top: 5px; padding-bottom: 5px;"});
K.picker1=A('<div class="ui-block-a"><select name=pickmon"></select></div>').appendTo(K.picker).find("select");
K.picker2=A('<div class="ui-block-b"><select name=pickyar"></select></div>').appendTo(K.picker).find("select");
for(H=0;
H<=11;
H++){K.picker1.append(A('<option value="'+H+'"'+((K.thisMonth===H)?' selected="selected"':"")+">"+E.__("monthsOfYear")[H]+"</option>"))
}for(H=(K.thisYear-6);
H<=K.thisYear+6;
H++){K.picker2.append(A('<option value="'+H+'"'+((K.thisYear===H)?' selected="selected"':"")+">"+H+"</option>"))
}K.picker1.on("change",function(){E.theDate.setMonth(A(this).val());
E.refresh()
});
K.picker2.on("change",function(){E.theDate.setFullYear(A(this).val());
E.refresh()
});
K.picker.find("select").selectmenu({mini:true,nativeMenu:true});
K.picker.appendTo(E.d.intHTML)
}C=A('<div class="'+G+'grid">').appendTo(E.d.intHTML);
if(J.calShowDays){E._cal_days=E.__("daysOfWeekShort").concat(E.__("daysOfWeekShort"));
K.weekDays=A("<div>",{"class":G+"gridrow"}).appendTo(C);
if(E.__("isRTL")===true){K.weekDays.css("direction","rtl")
}if(J.calShowWeek){A("<div>").addClass(G+"griddate "+G+"griddate-empty "+G+"griddate-label").appendTo(K.weekDays)
}for(H=0;
H<=6;
H++){A("<div>"+E._cal_days[(H+K.startDay)%7]+"</div>").addClass(G+"griddate "+G+"griddate-empty "+G+"griddate-label").appendTo(K.weekDays)
}}K.gen=E._cal_gen(K.start,K.lastend,K.end,!J.calOnlyMonth,E.theDate.getMonth());
for(B in K.gen){D=A("<div>",{"class":G+"gridrow"});
if(E.__("isRTL")){D.css("direction","rtl")
}if(J.calShowWeek){A("<div>",{"class":G+"griddate "+G+"griddate-empty"}).text("W"+K.wk).appendTo(D);
K.wk++;
if(K.wk>52&&typeof K.gen[parseInt(B,10)+1]!=="undefined"){K.wk=new Date(K.theDateArr[0],K.theDateArr[1],((E.__("calStartDay")===0)?K.gen[parseInt(B,10)+1][1][0]:K.gen[parseInt(B,10)+1][0][0])).getWeek(4)
}}for(I in K.gen[B]){if(J.calWeekMode){K.weekMode=K.gen[B][J.calWeekModeDay][0]
}if(typeof K.gen[B][I]==="boolean"){A("<div>",{"class":G+"griddate "+G+"griddate-empty"}).appendTo(D)
}else{F=E._cal_check(K,K.theDateArr[0],K.gen[B][I][1],K.gen[B][I][0]);
if(K.gen[B][I][0]){A("<div>"+String(K.gen[B][I][0])+"</div>").addClass(K.thisMonth===K.gen[B][I][1]?(G+"griddate ui-corner-all ui-btn-up-"+F.theme+(F.ok?"":" "+G+"griddate-disable")):(G+"griddate "+G+"griddate-empty")).jqmData("date",((J.calWeekMode)?K.weekMode:K.gen[B][I][0])).jqmData("theme",K.thisMonth===K.gen[B][I][1]?F.theme:"-").jqmData("enabled",F.ok).jqmData("month",K.gen[B][I][1]).appendTo(D)
}}}if(J.calControlGroup===true){D.find(".ui-corner-all").removeClass("ui-corner-all").eq(0).addClass("ui-corner-left").end().last().addClass("ui-corner-right").addClass("ui-controlgroup-last")
}D.appendTo(C)
}if(J.calShowWeek){C.find("."+G+"griddate").addClass(G+"griddate-week")
}if(J.useTodayButton||J.useClearButton){D=A("<div>",{"class":G+"controls"});
if(J.useTodayButton){A('<a href="#">'+E.__("calTodayButtonLabel")+"</a>").appendTo(D).buttonMarkup({theme:J.theme,icon:"check",iconpos:"left",corners:true,shadow:true}).on(J.clickEvent,function(L){L.preventDefault();
E.theDate=new E._date();
E.theDate=new E._date(E.theDate.getFullYear(),E.theDate.getMonth(),E.theDate.getDate(),0,0,0,0);
E.d.input.trigger("datebox",{method:"doset"})
})
}if(J.useClearButton){A('<a href="#">'+E.__("clearButton")+"</a>").appendTo(D).buttonMarkup({theme:J.theme,icon:"delete",iconpos:"left",corners:true,shadow:true}).on(J.clickEventAlt,function(L){L.preventDefault();
E.d.input.val("");
E.d.input.trigger("datebox",{method:"clear"});
E.d.input.trigger("datebox",{method:"close"})
})
}if(J.useCollapsedBut){D.addClass("ui-datebox-collapse")
}D.appendTo(C)
}E.d.intHTML.on(J.clickEventAlt+" vmouseover vmouseout","div."+G+"griddate",function(L){if(L.type===J.clickEventAlt){L.preventDefault();
if(A(this).jqmData("enabled")){E.theDate.set(2,1).set(1,A(this).jqmData("month")).set(2,A(this).jqmData("date"));
E.d.input.trigger("datebox",{method:"set",value:E._formatter(E.__fmt(),E.theDate),date:E.theDate});
E.d.input.trigger("datebox",{method:"close"})
}}else{if(A(this).jqmData("enabled")&&typeof A(this).jqmData("theme")!=="undefined"){if(J.calWeekMode!==false&&J.calWeekHigh===true){A(this).parent().find("div").each(function(){E._hoover(this)
})
}else{E._hoover(this)
}}}});
E.d.intHTML.on("swipeleft",function(){if(E.calNext){E._offset("m",1)
}}).on("swiperight",function(){if(E.calPrev){E._offset("m",-1)
}});
if(E.wheelExists){E.d.intHTML.on("mousewheel",function(M,L){M.preventDefault();
if(L>0&&E.calNext){E.theDate.set(2,1);
E._offset("m",1)
}if(L<0&&E.calPrev){E.theDate.set(2,1);
E._offset("m",-1)
}})
}}})
})(jQuery);
(function(E){var B=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var D=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var C=["January","February","March","April","May","June","July","August","September","October","November","December"];
var A=[];
A.Jan="01";
A.Feb="02";
A.Mar="03";
A.Apr="04";
A.May="05";
A.Jun="06";
A.Jul="07";
A.Aug="08";
A.Sep="09";
A.Oct="10";
A.Nov="11";
A.Dec="12";
E.format=(function(){function I(K){return B[parseInt(K,10)]||K
}function J(L){var K=parseInt(L,10)-1;
return D[K]||L
}function H(L){var K=parseInt(L,10)-1;
return C[K]||L
}var F=function(K){return A[K]||K
};
var G=function(N){var O=N;
var L="";
if(O.indexOf(".")!==-1){var M=O.split(".");
O=M[0];
L=M[1]
}var K=O.split(":");
if(K.length===3){hour=K[0];
minute=K[1];
second=K[2];
return{time:O,hour:hour,minute:minute,second:second,millis:L}
}else{return{time:"",hour:"",minute:"",second:"",millis:""}
}};
return{date:function(Y,X){try{var L=null;
var U=null;
var S=null;
var a=null;
var M=null;
var K=null;
if(typeof Y=="number"){return this.date(new Date(Y),X)
}else{if(typeof Y.getFullYear=="function"){U=Y.getFullYear();
S=Y.getMonth()+1;
a=Y.getDate();
M=Y.getDay();
K=G(Y.toTimeString())
}else{if(Y.search(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?\d{0,3}[-+]?\d{2}:?\d{2}/)!=-1){var Z=Y.split(/[T\+-]/);
U=Z[0];
S=Z[1];
a=Z[2];
K=G(Z[3].split(".")[0]);
L=new Date(U,S-1,a);
M=L.getDay()
}else{var Z=Y.split(" ");
switch(Z.length){case 6:U=Z[5];
S=F(Z[1]);
a=Z[2];
K=G(Z[3]);
L=new Date(U,S-1,a);
M=L.getDay();
break;
case 2:var W=Z[0].split("-");
U=W[0];
S=W[1];
a=W[2];
K=G(Z[1]);
L=new Date(U,S-1,a);
M=L.getDay();
break;
case 7:case 9:case 10:U=Z[3];
S=F(Z[1]);
a=Z[2];
K=G(Z[4]);
L=new Date(U,S-1,a);
M=L.getDay();
break;
case 1:var W=Z[0].split("");
U=W[0]+W[1]+W[2]+W[3];
S=W[5]+W[6];
a=W[8]+W[9];
K=G(W[13]+W[14]+W[15]+W[16]+W[17]+W[18]+W[19]+W[20]);
L=new Date(U,S-1,a);
M=L.getDay();
break;
default:return Y
}}}}var T="";
var P="";
var Q="";
for(var O=0;
O<X.length;
O++){var V=X.charAt(O);
T+=V;
Q="";
switch(T){case"ddd":P+=I(M);
T="";
break;
case"dd":if(X.charAt(O+1)=="d"){break
}if(String(a).length===1){a="0"+a
}P+=a;
T="";
break;
case"d":if(X.charAt(O+1)=="d"){break
}P+=parseInt(a,10);
T="";
break;
case"MMMM":P+=H(S);
T="";
break;
case"MMM":if(X.charAt(O+1)==="M"){break
}P+=J(S);
T="";
break;
case"MM":if(X.charAt(O+1)=="M"){break
}if(String(S).length===1){S="0"+S
}P+=S;
T="";
break;
case"M":if(X.charAt(O+1)=="M"){break
}P+=parseInt(S,10);
T="";
break;
case"yyyy":P+=U;
T="";
break;
case"yy":if(X.charAt(O+1)=="y"&&X.charAt(O+2)=="y"){break
}P+=String(U).slice(-2);
T="";
break;
case"HH":P+=K.hour;
T="";
break;
case"hh":var N=(K.hour==0?12:K.hour<13?K.hour:K.hour-12);
N=String(N).length==1?"0"+N:N;
P+=N;
T="";
break;
case"h":if(X.charAt(O+1)=="h"){break
}var N=(K.hour==0?12:K.hour<13?K.hour:K.hour-12);
P+=parseInt(N,10);
T="";
break;
case"mm":P+=K.minute;
T="";
break;
case"ss":P+=K.second.substring(0,2);
T="";
break;
case"SSS":P+=K.millis.substring(0,3);
T="";
break;
case"a":P+=K.hour>=12?"PM":"AM";
T="";
break;
case" ":P+=V;
T="";
break;
case"/":P+=V;
T="";
break;
case":":P+=V;
T="";
break;
default:if(T.length===2&&T.indexOf("y")!==0&&T!="SS"){P+=T.substring(0,1);
T=T.substring(1,2)
}else{if((T.length===3&&T.indexOf("yyy")===-1)){T=""
}else{Q=T
}}}}P+=Q;
return P
}catch(R){console.log(R);
return Y
}}}
}())
}(jQuery));
jQuery.format.date.defaultShortDateFormat="dd/MM/yyyy";
jQuery.format.date.defaultLongDateFormat="dd/MM/yyyy hh:mm:ss";
jQuery(document).ready(function(){jQuery(".shortDateFormat").each(function(A,B){if(jQuery(B).is(":input")){jQuery(B).val(jQuery.format.date(jQuery(B).val(),jQuery.format.date.defaultShortDateFormat))
}else{jQuery(B).text(jQuery.format.date(jQuery(B).text(),jQuery.format.date.defaultShortDateFormat))
}});
jQuery(".longDateFormat").each(function(A,B){if(jQuery(B).is(":input")){jQuery(B).val(jQuery.format.date(jQuery(B).val(),jQuery.format.date.defaultLongDateFormat))
}else{jQuery(B).text(jQuery.format.date(jQuery(B).text(),jQuery.format.date.defaultLongDateFormat))
}})
});
(function(C,A){var B=new Date(),E={},D=function(F){E[F]=E[F]||{cacheTimeout:A.constants.temporal.SECONDS_IN_HOUR*1000,eventListingsCache:{}};
return E[F]
};
C.widget("mobile.eventDetail",C.mobile.widget,{options:{datetimeFormat:A.constants.temporal.LONG_DATETIME_FORMAT,dateFormat:A.constants.temporal.LONG_DATE_FORMAT,modelKey:"default",event:{}},_create:function(){var F=this;
var G=A.common.getQueryParam("id");
C.extend(F.options,F.element.data("options"));
F.option("model",D(F.options.modelKey));
if(!F.option("event").title&&!F.option("model").currentEvent){if(G){F._fetchEvent(G)
}else{C.mobile.changePage(F.option("missingEventPage"))
}}else{if(!F.options.event.title){F.option("event",F.options.model.currentEvent);
F.refresh()
}else{F.refresh()
}}},_fetchEvent:function(G){var F=this;
var H;
if(G){C.ajax({url:this.option("jsonDataUrl"),dataType:"json",data:{id:G},timeout:A.constants.general.AJAX_TIMEOUT,beforeSend:A.ubmobile.ajaxBeforeSend,complete:A.ubmobile.ajaxComplete,error:A.ubmobile.ajaxError,success:function(I){if(I.length>0){F.option("event",I[0]);
F.options.model.currentEvent=I[0];
F.refresh()
}}})
}},_setOption:function(F,G){C.Widget.prototype._setOption.apply(this,arguments)
},refresh:function(){var J=this.option("event"),I=C('<h2 class="ub-event-title">').html(J.title),L=C('<p class="ub-event-location"></p>').html(J.location).prepend("<b>Location:</b> "),F=C('<p class="ub-event-description"></p>').html(J.description),K=C.format.date(new Date(J.start*1000),this.options.datetimeFormat),G=C.format.date(new Date(J.end*1000),this.options.datetimeFormat),H=C('<p class="ub-event-datetime"></div>').html(K+" to "+G);
this.element.empty();
C('<h2 class="ub-event-title">').html(J.title).appendTo(this.element);
C('<p class="ub-event-start"></p>').html(K).prepend("<b>Starts:</b> ").appendTo(this.element);
if(J.end){C('<p class="ub-event-end"></p>').html(G).prepend("<b>Ends:</b> ").appendTo(this.element)
}if(J.location){C('<p class="ub-event-location"></p>').html(J.location).prepend("<b>Location:</b> ").appendTo(this.element)
}if(J.cost){C('<p class="ub-event-cost"></p>').html(J.cost).prepend("<b>Cost:</b> ").appendTo(this.element)
}if(J.presenter){C('<p class="ub-event-presenter"></p>').html(J.presenter).prepend("<b>Presenter:</b> ").appendTo(this.element)
}C('<p class="ub-event-description"></pv>').html(J.description).appendTo(this.element);
if(J.url){C('<a data-theme="d">Go to event website</a>').attr("href",J.url).appendTo(this.element).button()
}}});
C.widget("mobile.eventList",C.mobile.widget,{options:{dateFormat:A.constants.temporal.LONG_DATE_FORMAT,timeFormat:"h:mm a",startTimestamp:B.setHours(0,0,0,0)/1000,endTimestamp:B.getTime()/1000+A.constants.temporal.SECONDS_IN_DAY,cat:[],modelKey:"default",emptyResultClass:"no-results"},_create:function(){C.extend(this.options,this.element.data("options"));
this.option("model",D(this.options.modelKey));
if(typeof this.option("cat")==="string"){this.option("cat",[this.option("cat")])
}this.option("currentRange","day")
},_init:function(){var F=this;
F.element.closest(":jqmData(role=page)").one("pageshow",function(){if(F.option("useSearchQuery")){var G=A.common.getQueryParam("event-search-query")||C("#event-search-query").val();
F.option("keywords",G);
delete F.options.endTimestamp
}F._createNavMenu()
})
},_createTimeButtons:function(F){var N=this,M=C('<a href="#" data-inline="true" class="ub-day-btn">Day</a>'),K=C('<a href="#" data-inline="true" class="ub-week-btn">Week</a>'),J=C('<a href="#" data-inline="true" class="ub-month-btn">Month</a>'),I=C('<a href="#" data-inline="true" data-iconpos="notext" data-icon="ub-cal" class="ub-cal-btn"></a>'),G=C('<label for="datepicker">Choose a date</label>').hide(),H=C('<input name="datepicker" id="datepicker" type="date">'),L=C('<div class="ub-time-buttons" data-role="controlgroup" data-type="horizontal"></div>');
F.append(L);
L.append(M);
M.button();
M.click(function(){N.option("endTimestamp",N.option("startTimestamp")+A.constants.temporal.SECONDS_IN_DAY);
N.option("currentRange","day");
N.refresh();
A.ubmobile.analytics.trackEvent("events::filter::click",C(this).text(),C.format.date(B,"MM-dd-yyyy"),1)
});
L.append(K);
K.button();
K.click(function(){var O=A.common.getStartOfWeek(new Date(N.option("startTimestamp")*1000));
var P=A.common.getEndOfWeek(O);
N.option("startTimestamp",O.getTime()/1000);
N.option("endTimestamp",P.getTime()/1000);
N.option("currentRange","week");
N.refresh();
A.ubmobile.analytics.trackEvent("events::filter::click",C(this).text(),C.format.date(O,"MM-dd-yyyy")+" to "+C.format.date(P,"MM-dd-yyyy"),1)
});
L.append(J);
J.button();
J.click(function(){var O=A.common.getStartOfMonth(new Date(N.option("startTimestamp")*1000));
var P=A.common.getEndOfMonth(O);
N.option("startTimestamp",O.getTime()/1000);
N.option("endTimestamp",P.getTime()/1000);
N.option("currentRange","month");
N.refresh();
A.ubmobile.analytics.trackEvent("events::filter::click",C(this).text(),C.format.date(O,"MM-yyyy"),1)
});
L.after(G);
L.after(H);
H.on("datebox",function(P,Q){var O=Q.date;
if(Q.method==="set"){O.setHours(0,0,0,0);
N.option("startTimestamp",O.getTime()/1000);
N.option("endTimestamp",N.option("startTimestamp")+A.constants.temporal.SECONDS_IN_DAY);
A.ubmobile.analytics.trackEvent("events::datepicker","set date",N.option("currentRange"),1);
N.option("currentRange","day");
N.refresh()
}});
L.append(I);
I.button();
I.click(function(){H.datebox({mode:"calbox"});
H.closest(".ui-input-datebox").hide();
H.datebox("open");
A.ubmobile.analytics.trackEvent("events::datepicker","click",N.option("currentRange"),1)
});
L.controlgroup();
N._updateTimeButtons()
},_createNavMenu:function(){var G=this,H=C('<a href="#" data-icon="arrow-l" data-iconpos="notext" data-theme="a" class="ui-btn-left ub-previous-btn"></a>').button(),J=C('<a href="#" data-icon="arrow-r" data-iconpos="notext" data-theme="a" class="ui-btn-right ub-next-btn"></a>').button(),I=C('<div class="ui-bar-a ub-events-subheader">');
G.element.closest(":jqmData(role=page)").find(".ub-events-subheader").remove();
G.element.before(I);
if(this.option("useSearchQuery")){var F=C('<form data-transition="slide">').appendTo(I);
G.element.closest(":jqmData(role=page)").on("pageshow",function(){F.attr("action",C.mobile.path.parseUrl(C.mobile.activePage.data("url")).pathname)
});
var L=C('<div class="searcharea ui-bar-a">').appendTo(F);
var K=C('<div class="searchbox event-search-box">').appendTo(L);
C('<input id="event-search-query" name="event-search-query" data-type="search" type="search" data-mini="true" placeholder="Find Events">').appendTo(K).textinput().val(G.option("keywords"));
C('<a href="#" data-transition="slide" data-role="button" data-icon="search" data-iconpos="notext" class="searchbutton event-search-button">Submit</a>').appendTo(K).button().click(function(){F.submit()
})
}else{I.append(H);
H.button();
H.click(function(){var M,N;
switch(G.option("currentRange")){case"week":M=new Date((G.option("startTimestamp")-A.constants.temporal.SECONDS_IN_WEEK)*1000);
N=A.common.getEndOfWeek(M);
break;
case"month":M=new Date(G.option("startTimestamp")*1000);
M=A.common.getStartOfMonth(M.setMonth(M.getMonth()-1));
N=A.common.getEndOfMonth(M);
break;
default:M=new Date((G.option("startTimestamp")-A.constants.temporal.SECONDS_IN_DAY)*1000);
N=new Date(M.getTime()+(A.constants.temporal.SECONDS_IN_DAY*1000));
break
}G.option("startTimestamp",M/1000);
G.option("endTimestamp",N/1000);
G.refresh();
A.ubmobile.analytics.trackEvent("events::filter::click","previous",G.option("currentRange"),1)
});
G._createTimeButtons(I);
I.append(J);
J.button();
J.click(function(){var M,N;
switch(G.option("currentRange")){case"week":M=new Date((G.option("startTimestamp")+A.constants.temporal.SECONDS_IN_WEEK)*1000);
N=A.common.getEndOfWeek(M);
break;
case"month":M=new Date(G.option("startTimestamp")*1000);
M=A.common.getStartOfMonth(M.setMonth(M.getMonth()+1));
N=A.common.getEndOfMonth(M);
break;
default:M=new Date((G.option("startTimestamp")+A.constants.temporal.SECONDS_IN_DAY)*1000);
N=new Date(M.getTime()+(A.constants.temporal.SECONDS_IN_DAY*1000));
break
}G.option("startTimestamp",M/1000);
G.option("endTimestamp",N/1000);
G.refresh();
A.ubmobile.analytics.trackEvent("events::filter::click","next",G.option("currentRange"),1)
})
}},_handleEventData:function(H){var G=C("<ul>"),J={},F=this;
F.element.empty();
H=C.grep(H,function(L,K){return parseInt(L.start,10)>=parseInt(F.option("startTimestamp"),10)||F.option("showLongTermEvents")
});
if(H.length===0){F.element.addClass(F.option("emptyResultClass"));
var I=F.element.closest(":jqmData(role=content)").find("div.ub-time-buttons").find("a.ui-btn-active span.ui-btn-inner span.ui-btn-text").text()||"search";
F.element.append('<h2 class="no-results-message">No events scheduled</h2>');
if(I==="search"){F.element.append(C('<div class="no-results-message">').text("for the "+I.toLowerCase()))
}else{(function(){var K;
if(F.option("currentRange")==="day"){K=" of "+C.format.date(new Date(F.option("startTimestamp")*1000),F.option("dateFormat"))
}else{K=" of "+C.format.date(new Date(F.option("startTimestamp")*1000),F.option("dateFormat"));
K+=" - "+C.format.date(new Date(F.option("endTimestamp")*1000),F.option("dateFormat"))
}F.element.append(C('<div class="no-results-message">').text("for the "+I.toLowerCase()+K))
})()
}}else{F.element.removeClass(F.option("emptyResultClass"));
C.each(H,function(L,O){var K=C.format.date(new Date(O.start*1000),F.option("dateFormat")),N=C.format.date(new Date(O.start*1000),F.option("timeFormat")),M;
var P=C('<a data-transition="slide">').attr("href",F.option("detailPage")+"?id="+O.id);
C('<span class="time">').html(N).appendTo(P);
C("<h3>").html(O.title).appendTo(P);
C("<p>").html(O.location).appendTo(P);
var Q=C("<li>").append(P);
P.click(function(){F.option("model").currentEvent=O;
C("body").one("pagebeforeshow","div:jqmData(role=page)",function(){var R=C("div:jqmData(role=eventDetail)");
R.eventDetail("option","event",O);
R.eventDetail("refresh")
})
});
if(!J[K]){M=C('<li data-role="list-divider"></li>').html(K).appendTo(G);
J[K]=true
}G.append(Q)
});
G.appendTo(F.element);
G.listview()
}},_refreshEventsAjax:function(G){var F=this;
C.ajax({url:this.option("jsonDataUrl"),dataType:"json",data:{start:this.option("startTimestamp"),end:this.option("endTimestamp")||"",cat:this.option("cat"),keywords:this.option("keywords")||""},timeout:A.constants.general.AJAX_TIMEOUT,beforeSend:A.ubmobile.ajaxBeforeSend,complete:A.ubmobile.ajaxComplete,error:A.ubmobile.ajaxError,success:function(I){var H=F.option("model").eventListingsCache;
H[G]=I;
setTimeout(function(){delete H[G]
},F.option("model").cacheTimeout);
F._handleEventData(I)
}})
},_refreshEventsCached:function(G){var F=this.option("model").eventListingsCache[G];
if(F){this._handleEventData(F);
return true
}return false
},_setOption:function(F,H){var G=C.Widget.prototype._setOption.apply(this,arguments);
if(F==="currentRange"){this._updateTimeButtons()
}return G
},_updateTimeButtons:function(){switch(this.option("currentRange")){case"week":this.element.parent().find(".ub-day-btn").removeClass("ui-btn-active");
this.element.parent().find(".ub-week-btn").addClass("ui-btn-active");
this.element.parent().find(".ub-month-btn").removeClass("ui-btn-active");
break;
case"month":this.element.parent().find(".ub-day-btn").removeClass("ui-btn-active");
this.element.parent().find(".ub-week-btn").removeClass("ui-btn-active");
this.element.parent().find(".ub-month-btn").addClass("ui-btn-active");
break;
default:this.element.parent().find(".ub-day-btn").addClass("ui-btn-active");
this.element.parent().find(".ub-week-btn").removeClass("ui-btn-active");
this.element.parent().find(".ub-month-btn").removeClass("ui-btn-active");
break
}},refresh:function(){var F=[this.option("startTimestamp"),this.option("endTimestamp"),this.option("keywords"),this.option("cat")].join("-");
if(!this._refreshEventsCached(F)){this._refreshEventsAjax(F)
}}});
C(document).on("pagecreate",function(G){var F=C(G.target).find(":jqmData(role='eventList')").eventList();
C(G.target).find(":jqmData(role='eventDetail')").eventDetail();
C(document).one("pageshow",function(H){F.eventList("refresh")
})
})
})(jQuery,EAS);
(function(B,A){B(document).on("pageinit","div#datebox:jqmData(role=page)",function(){var C=B("#datebox").find('input:jqmData(role="datebox")');
B("#datebox").on("pageshow",function(){C.datebox("open")
});
C.on("datebox",function(D,E){if(E.method==="set"){(function(){var G=C.data("datebox").theDate.getTime()/1000,F=B.mobile.activePage.find("div:jqmData(role=eventList)");
F.eventList("option","startTimestamp",G);
F.eventList("option","endTimestamp",G+A.constants.temporal.SECONDS_IN_DAY);
F.eventList("option","currentRange","day");
F.eventList("refresh")
})()
}});
B("#date-picker").on("click",function(D){C.datebox("open");
D.preventDefault()
})
})
})(jQuery,EAS);
(function(C,A){var B=new Date(),E={},D=function(F){E[F]=E[F]||{cacheTimeout:A.constants.temporal.SECONDS_IN_HOUR*1000,departmentsCache:{}};
return E[F]
};
C.widget("mobile.departmentDetail",C.mobile.widget,{options:{modelKey:"default",department:{}},_create:function(){var F=this;
var G=A.common.getQueryParam("department_id");
C.extend(F.options,F.element.data("options"));
F.option("model",D(F.options.modelKey));
F.element.addClass("departmentdetail");
if(!F.option("department").book_name&&!F.option("model").currentDepartment){if(G){F.fetchDepartment(G)
}else{C.mobile.changePage(F.option("missingDepartmentPage"))
}}else{if(!F.options.department.book_name){F.option("department",F.options.model.currentDepartment);
F.fetchDepartment()
}else{F.fetchDepartment()
}}},_setOption:function(F,G){C.Widget.prototype._setOption.apply(this,arguments)
},_fetchDepartmentAjax:function(G){var F=this;
C.ajax({url:F.option("jsonDataUrl"),dataType:"json",data:{id:G},timeout:A.constants.general.AJAX_TIMEOUT,beforeSend:A.ubmobile.ajaxBeforeSend,complete:A.ubmobile.ajaxComplete,error:A.ubmobile.ajaxError,success:function(I){var H=F.option("model").departmentsCache;
H[G]=I;
setTimeout(function(){delete H[G]
},F.option("model").cacheTimeout);
F._handleDepartmentData(I)
}})
},_fetchDepartmentCached:function(G){var F=this.option("model").departmentsCache[G];
if(F){this._handleDepartmentData(F);
return true
}return false
},_handleDepartmentData:function(H){var G=this,L=C('<h3 class="title ub-department-name"></h3>').text(H.book_name),J=C("<ul>"),K=function(N,M){G.option("model").currentDepartment=M;
G.option("department",M);
C(document).on("pageshow.departmentDetailBack",function(){if(C.mobile.activePage.find("div:jqmData(role=departmentDetail)").length){C(document).one("click.departmentDetailBack",":jqmData(rel=back)",function(){delete G.option("model").currentDepartment
})
}else{C(document).off("pageshow.departmentDetailBack");
C(document).off("click.departmentDetailBack")
}});
C.mobile.changePage(G.option("detailPage")+M.id,{allowSamePageTransition:true,reloadPage:true,transition:"slide"});
N.preventDefault()
};
G.element.empty();
C('<h2 class="text ub-department-detail">').text(H.long_name).appendTo(G.element);
var F=function(M){var N=C('<p class="text ub-department-detail">');
if(M.label){C('<span class="label">').text(M.label).appendTo(N)
}if(M.link){C('<a data-transition="slide" class="ui-link ub-department-detail">').text(M.text).attr("href",M.link).appendTo(N)
}else{C('<span class="ub-department-detail">').text(M.text).appendTo(N)
}N.appendTo(G.element)
};
if(H.address){F({label:"Address:",text:H.address})
}if(H.phone){F({label:"Phone:",text:H.phone,link:"tel:"+H.phone})
}if(H.fax){F({label:"Fax:",text:H.fax})
}if(H.email){F({label:"Email:",text:H.email,link:"mailto:"+H.email})
}if(H.url){F({label:"Web:",text:H.url,link:H.url})
}if(H.director_name){if(H.director_id){F({label:"Director:",text:H.director_name,link:G.option("personLink")+H.director_id})
}else{F({label:"Director:",text:H.director_name})
}if(H.director_email){F({label:"Email:",text:H.director_email,link:"mailto:"+H.director_email})
}}if(H.children&&H.children.length>0){J.append('<li data-role="list-divider">Sub-Listings</li>');
C.each(H.children,function(N,M){var O=C('<a href="#"></a>').text(M.book_name),P=C("<li></li>").append(O);
O.click(function(Q){K(Q,M)
});
J.append(P)
})
}if(H.related&&H.related.length>0){J.append('<li data-role="list-divider">Related Departments</li>');
C.each(H.related,function(N,M){var O=C('<a href="#"></a>').text(M.book_name),P=C("<li></li>").append(O);
O.click(function(Q){K(Q,M)
});
J.append(P)
})
}J.appendTo(G.element);
try{J.listview()
}catch(I){J.closest("div:jqmData(role=page)").on("pagebeforeshow",function(){J.listview()
})
}},fetchDepartment:function(F){F=F||this.option("department").id;
if(!this._fetchDepartmentCached(F)){this._fetchDepartmentAjax(F)
}}});
C.widget("mobile.departmentList",C.mobile.widget,{options:{modelKey:"default",emptyResultClass:"no-results"},_create:function(){var G=this;
var F=C('<form data-transition="slide">').appendTo(this.element);
var H=C('<div class="searcharea ui-bar-a">').appendTo(F);
var J=C('<div class="searchbox department-search-box">').appendTo(H);
var I=C('<input name="department-search-query" id="department-search-query" data-type="search" data-mini="true" placeholder="Find departments" />').appendTo(J).textinput();
C('<a href="#" data-role="button" data-icon="search" data-iconpos="notext" class="searchbutton department-search-button">Submit</a>').button().appendTo(J);
C.extend(G.options,G.element.data("options"));
G.option("model",D(G.options.modelKey))
},_init:function(){var F=this;
this.element.closest("div:jqmData(role=page)").one("pageshow",function(G){var I=F.element.find("#department-search-query");
var H=A.common.getQueryParam("department-search-query").trim();
I.val(H);
I.closest("form").attr("action",C.mobile.path.parseUrl(C.mobile.activePage.data("url")).pathname);
C("#main-department-search-query").val(I.val());
F.findDepartments()
})
},_handleDepartmentsData:function(I){var F=this,H={};
this.element.find("#departments-search-results").remove();
if(I.length===0){F.element.addClass(F.option("emptyResultClass"));
F.element.append('<h2 class="no-results-message">No results found</h2>');
F.element.append('<div class="no-results-message">Try entering another search</div>')
}else{F.element.find(".no-results-message").remove();
F.element.removeClass(F.option("emptyResultClass"));
var G=C('<ul id="departments-search-results">').appendTo(this.element).listview();
C.each(I,function(J,K){var L=C('<a data-transition="slide">').attr("href",F.option("detailPage")+K.id).text(K.book_name),M=C("<li>").append(L);
L.click(function(){F.option("model").currentDepartment=K;
C("body").one("pagebeforeshow","div:jqmData(role=page)",function(){var N=C("div:jqmData(role=departmentDetail)");
N.departmentDetail("option","department",K);
N.departmentDetail("fetchDepartment")
})
});
G.append(M)
});
G.listview("refresh")
}},_findDepartmentsAjax:function(G){var F=this;
C.ajax({url:F.option("jsonDataUrl"),dataType:"json",data:{q:G},timeout:A.constants.general.AJAX_TIMEOUT,beforeSend:A.ubmobile.ajaxBeforeSend,complete:A.ubmobile.ajaxComplete,error:A.ubmobile.ajaxError,success:function(I){var H=F.option("model").departmentsCache,J=I.results;
H[G]=J;
setTimeout(function(){delete H[G]
},F.option("model").cacheTimeout);
F._handleDepartmentsData(J)
}})
},_findDepartmentsCached:function(G){var F=this.option("model").departmentsCache[G];
if(F){this._handleDepartmentsData(F);
return true
}return false
},_setOption:function(F,G){C.Widget.prototype._setOption.apply(this,arguments)
},validate:function(F){if(!F||typeof F==="undefined"){throw new Error("You must enter a search term.")
}if(F.length<3){throw new Error("Your search term must be at least three characters.")
}if(F.indexOf("*")!==-1){throw new Error("Your search term containts illegal characters.")
}},findDepartments:function(){var G=A.common.getQueryParam("department-search-query").trim();
try{this.validate(G)
}catch(F){A.ubmobile.error(F);
return 
}if(!this._findDepartmentsCached(G)){this._findDepartmentsAjax(G)
}}});
C(document).on("pagecreate",":jqmData(role=page)",function(F){C(F.target).find(":jqmData(role='departmentList')").departmentList();
C(F.target).find(":jqmData(role='departmentDetail')").departmentDetail();
C(this).on("click","a.searchbutton.department-search-button, a.searchbutton.main-department-search-button",function(G){C(this).closest("form").submit();
G.preventDefault()
})
})
})(jQuery,EAS);
window.Modernizr=function(AJ,AI,AH){function H(A){AA.cssText=A
}function G(B,A){return H(prefixes.join(B+";")+(A||""))
}function F(B,A){return typeof B===A
}function U(B,A){return !!~(""+B).indexOf(A)
}function S(B,A){for(var D in B){var C=B[D];
if(!U(C,"-")&&AA[C]!==AH){return A=="pfx"?C:!0
}}return !1
}function Q(B,A,E){for(var D in B){var C=A[B[D]];
if(C!==AH){return E===!1?B[D]:F(C,"function")?C.bind(E||A):C
}}return !1
}function O(B,A,E){var D=B.charAt(0).toUpperCase()+B.slice(1),C=(B+" "+W.join(D+" ")+D).split(" ");
return F(A,"string")||F(A,"undefined")?S(C,A):(C=(B+" "+V.join(D+" ")+D).split(" "),Q(C,A,E))
}var AG="2.6.2",AF={},AE=!0,AD=AI.documentElement,AC="modernizr",AB=AI.createElement(AC),AA=AB.style,Z,Y={}.toString,X="Webkit Moz O ms",W=X.split(" "),V=X.toLowerCase().split(" "),T={},R={},P={},N=[],M=N.slice,K,J={}.hasOwnProperty,I;
!F(J,"undefined")&&!F(J.call,"undefined")?I=function(B,A){return J.call(B,A)
}:I=function(B,A){return A in B&&F(B.constructor.prototype[A],"undefined")
},Function.prototype.bind||(Function.prototype.bind=function(A){var D=this;
if(typeof D!="function"){throw new TypeError
}var C=M.call(arguments,1),B=function(){if(this instanceof B){var E=function(){};
E.prototype=D.prototype;
var c=new E,b=D.apply(c,C.concat(M.call(arguments)));
return Object(b)===b?b:c
}return D.apply(A,C.concat(M.call(arguments)))
};
return B
}),T.backgroundsize=function(){return O("backgroundSize")
};
for(var L in T){I(T,L)&&(K=L.toLowerCase(),AF[K]=T[L](),N.push((AF[K]?"":"no-")+K))
}return AF.addTest=function(B,A){if(typeof B=="object"){for(var C in B){I(B,C)&&AF.addTest(C,B[C])
}}else{B=B.toLowerCase();
if(AF[B]!==AH){return AF
}A=typeof A=="function"?A():A,typeof AE!="undefined"&&AE&&(AD.className+=" "+(A?"":"no-")+B),AF[B]=A
}return AF
},H(""),AB=Z=null,AF._version=AG,AF._domPrefixes=V,AF._cssomPrefixes=W,AF.testProp=function(A){return S([A])
},AF.testAllProps=O,AD.className=AD.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(AE?" js "+N.join(" "):""),AF
}(this,this.document);
(function(A,C){var B=EAS.common.getQueryParams;
EAS.common.getQueryParams=function(){var D;
if(C.mobile.activePage){D=C.mobile.path.parseUrl(C.mobile.activePage.data("url"))
}return B(D)
};
C(document).on("pagebeforeshow",function(){if(C.mobile.activePage.find(".UBPopupDialog").length===0){var D=C('<div data-role="header">');
var F=C('<div class="UBPopupDialog">').append(D).append('<div data-role="content">');
var E=C('<a href="#" data-rel="back" class="ui-btn-right" title="Close">Close</a>').buttonMarkup({corners:true,icon:"delete",iconpos:"notext",shadow:true,iconshadow:true,theme:"b"});
D.append("<h1>").append(E);
C.mobile.activePage.append(F);
F.popup({history:false,positionTo:"window",transition:"slideup",overlayTheme:"a",theme:"e"})
}});
A.getUBPopup=function(){var F=C.mobile.activePage.find(".UBPopupDialog");
var E=F.find(":jqmData(role=header) h1");
var D=F.find(":jqmData(role=content)");
F.popup("close");
E.empty();
D.empty();
F.setHeaderText=function(G){E.text(G)
};
F.appendContent=function(G){D.append(G)
};
F.on("popupbeforeposition",function(){F.closest(":jqmData(role=page)").trigger("pagecreate")
});
return F
};
A.error=function(E){C.mobile.loading("hide");
var D=A.getUBPopup();
D.setHeaderText("Error");
D.appendContent('<p class="text error-content">An error has occurred while loading the page.</p>');
D.appendContent(C('<p class="text error-content">').text(E));
D.popup("open")
};
A.ajaxError=function(F,H,G){C.mobile.loading("hide");
var E=A.getUBPopup();
var D=C('<a href="#" class="offline">').text("Go Offline").button().click(function(I){I.preventDefault();
C.mobile.base.set("");
EAS.ubmobile.analytics.trackEvent("mode::online","click","Go Offline",1);
EAS.ubmobile.phonegap.offlineMode()
});
E.setHeaderText("Error");
E.appendContent('<p class="text error-content">An error has occurred while loading the page.</p>');
E.appendContent(C('<p class="text error-content">').text(G));
E.popup("open");
E.appendContent(D)
};
A.ajaxBeforeSend=function(E,D){C.mobile.loading("show")
};
A.ajaxComplete=function(E,D){if(D==="success"){C.mobile.loading("hide")
}};
C(document).on("pageloadfailed",function(D,E){D.preventDefault();
E.deferred.reject(E.absUrl,E.options);
A.ajaxError(undefined,undefined,E.errorThrown);
window.setTimeout(function(){C.mobile.loading("hide")
},250)
});
jQuery(document).ready(function(){jQuery("meta[name=viewport]").attr("content","width=device-width, minimum-scale=1.0, maximum-scale=1.0");
jQuery("body").get(0).addEventListener("gesturestart",function(){jQuery("meta[name=viewport]").attr("content","device-width, minimum-scale=0.25, maximum-scale=1.6")
},false)
})
})(EAS.namespace("ubmobile"),jQuery);
