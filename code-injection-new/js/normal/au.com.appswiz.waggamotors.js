




            document.addEventListener("deviceready", function(cordova) {
            	// first time starting the app, write the version info to the local storage
			    if (!window.localStorage.getItem("coreVersion")) {
			        $.get("version.xml", function (data) {
			            var version = xml2jsno(data);
			            $("body").find("#appVersion").html(version.appVersion);
	            		$("body").find("#coreVersion").html(version.coreVersion);
	            		$("body").find("#configVersion").html(window.localStorage.getItem("configVersion"));
	            		$("body").find("#appId").html(appInfo.appId);
	            		$("body").find("#testMode").html(appInfo.test_mode);
			        });
			    }
            	// window.plugins.updater.getAppInfo (function (appInfo) {
            	// 	$("body").find("#appVersion").html(appInfo.appVersion);
            	// 	$("body").find("#coreVersion").html(window.localStorage.getItem("coreVersion"));
            	// 	$("body").find("#configVersion").html(window.localStorage.getItem("configVersion"));
            	// 	$("body").find("#appId").html(appInfo.appId);
            	// 	$("body").find("#testMode").html(appInfo.test_mode);
            	// });
            });
		

$.getScript("cordova.js", function(){
    console.log("Added android version of cordova.js");
});

$.getScript("plugins/org.apache.cordova.thirdparty/CalendarPlugin.js", function(){
    console.log("Added android plugin CalendarPlugin");
});

$.getScript("plugins/org.apache.cordova.thirdparty/datePickerPlugin.js", function(){
    console.log("Added android plugin datePickerPlugin");
});

$.getScript("plugins/org.apache.cordova.thirdparty/EmailComposer.js", function(){
    console.log("Added android plugin EmailComposer");
});

$.getScript("plugins/org.apache.cordova.thirdparty/PushNotification.js", function(){
    console.log("Added android plugin PushNotification");
});

$.getScript("plugins/org.apache.cordova.thirdparty/video.js", function(){
    console.log("Added VideoPlayer for Cordova plugin");
});

$.getScript("plugins/com.appswiz.hybridfactory.updater/Updater.js", function(){
    console.log("Added android plugin Updater");
});



                function addCorrectCss() {
                    /*  Interrogate the URL to pull out any parameters */
                    var url = purl();
                    var IN_PREVIEW_MODE = url.param('preview_mode') ? true : false;//used to load the preview css
                    var USE_PREVIEW_CSS = url.param('preview_css') ? true : false;
                    var NATIVE_MODE = url.param('native_mode') ? true : false;
                    var CLEAR_CACHE = url.param('clear_cache') ? true : false;
                    var appId;
                    if (url.param('appId')){//use the one pass in as the querystring
                        appId = url.param('appId');
                    }
            
                    var cssPath = "assets/css/screen.css";
                    
                    if (!NATIVE_MODE && appId ) {
                        // running in a browser
                        if (IN_PREVIEW_MODE) {
                            cssPath = "apps/" + appId + "/preview/screen.css";
                        }
                        else {
                            cssPath = "apps/" + appId + "/screen.css";
                        }
                    }
                    
                    if (CLEAR_CACHE) {
                                cssPath += '?' + Math.floor(Math.random()*1048576);
                    }

                    document.write('<link rel="stylesheet" type="text/css" media="all" href="' + cssPath + '" />');
                }

                addCorrectCss();

            

    function user_details_before_show(e) {
        user_details_load(e.sender.id);
    }

    // loading and saving user details to the local storage ========================================================
    function user_details_load(form) {
        $(form).find("input").each(function () {
            this.value = window.localStorage.getItem(this.name);
        });
    }

    function user_details_save(form) {
        var validator = $(form).kendoValidator().data("kendoValidator");
        if (validator.validate()) {
            $(form).find("input").each(function () {
                window.localStorage.setItem(this.name, this.value);
            });
            AW5.app.navigate("#:back");
        }
    }

    function user_details_clear(form) {
        $(form).find("input").each(function () {
            this.value = "";
            window.localStorage.removeItem(this.name);
        }); 
    }

 /*
    function user_details_load() {
        $('#user-details').kendoValidator().data("kendoValidator");
        $("#user-details input").each(function () {
            this.value = window.localStorage.getItem(this.id);
        });
    }
*/
    
/*
    function user_details_save() {
        $("#user-details input").each(function () {
            window.localStorage.setItem(this.id, this.value);
        });
    }
*/

/*
    function user_details_clear() {
        $("#user-details input").each(function () {
            this.value = "";
            //window.localStorage.removeItem(this.id);
        }); 
    }
*/
    
    //==============================================================================================================

      
            // file protocol indicates phonegap
            var ON_DEVICE = (document.location.protocol == "file:");
        










            window.onerror = function(msg, url, lineNumber){
                console.log("js error: " + msg + " @ " + url + " line: " + lineNumber);
            }

            // show the initial loading dialog
            $("#loadingPopup").dialog({
                modal: true,
                resizable: false,
                dialogClass: 'ui-loading-dialog'
                }).siblings('div.ui-dialog-titlebar').remove();

            var GLOBAL_STORAGE = [];
            var LOAD_LOCAL_CONFIG = false;  // If true, overrides all other configuration settings and loads defined localConfigFile. Should always be false in production.
            var localConfigFile   = 'default.xml'; // will be loaded instead of dynamic remote config file
            var LOAD_BY_DNS = true; // Should always be true in production.
            var LOAD_BY_APP_ID = true;
            var url = purl();
            var dns = "";
            var flurryApiKey;
            var appVersion;
            var appId;

            var SHARING_ENABLED;
            var FACEBOOK_ENABLED;
            var TWITTER_ENABLED;
            var APP_STORE_URL; //= "https://itunes.apple.com/au/app/appswiz-mobile/id458023316?mt=8";
            var GOOGLE_PLAY_URL; // = "https://play.google.com/store/apps/details?id=au.com.appswiz";
            var FACEBOOK_APP_ID; // = "706636192734553";
            var FACEBOOK_SECRET_KEY; // = "d6656f55a4cdd2db50c218c973b0a925";
            var TWITTER_CONSUMER_KEY; //= "5FcXemjiSAcXVC9euHlvM7nsP";
            var TWITTER_CONSUMER_SECRET; // = "yy7rEhB4ZnyGogOhkdezliaVgXLvgSEPOjSosQJGyIvsAoqC9X";

            // force ios or android
            var forcePlatform;
            if(url.param('platform')) {
                forcePlatform = url.param('platform');
            }

            // specify view to anchor to
            var hasInitView;
            if(url.param('hasInitView')) {
                hasInitView = url.param('hasInitView');
            }

            // Id of target app to load
            var appId;

            /*  Interrogate the URL to pull out any parameters */
            if (url.param('appId')){//use the one pass in as the querystring
                appId = url.param('appId');
                LOAD_BY_APP_ID = true;
            }
            else if (LOAD_BY_DNS){
                //alert(url.attr('host'));
                dns = url.attr('host').split('.')[0];
                //alert(dns);
            }

            // If true, fetches configuration from DEV server, else retrieve from PROD
            var IS_TEST = url.param('test') ? true : false;
            var IS_STAGING = url.param('staging') ? true : false;
            // flag that indicates the config.xml is ready
            var CONFIG_READY = false;
            // flag that indicates the webapp is ready
            var APP_READY = false;
            
            /* ===========================================
             App Configuration
            =============================================*/
            
            // Domains to get configuration data
            var PROD_WEBSERVICE_PATH = "https://www.appswiz.com/mobileservice/mobileappservice.asmx";
            var DEV_WEBSERVICE_PATH = "http://test.appswiz.com/mobileservice/mobileappservice.asmx";
            var STAGING_WEBSERVICE_PATH =  "http://staging.appswiz.com/mobileservice/mobileappservice.asmx";

            var webserviceUrl;

            function configWebserviceUrl (test_mode, staging_mode) {
                if(test_mode){
                    webserviceUrl = DEV_WEBSERVICE_PATH;
                }
                else if (staging_mode){
                    webserviceUrl = STAGING_WEBSERVICE_PATH;
                }
                else {
                    webserviceUrl =  PROD_WEBSERVICE_PATH ;
                }
            }

            
            // running on a browser - start the app as the web app will be up to date
            if (!ON_DEVICE) {
                console.log("Running web app from a browser - update check skipped.");
                configWebserviceUrl (IS_TEST, IS_STAGING);
                GetAppConfiguration(window.appId, function (xml) {
                    init (xml);
                });
            }

            // when cordova is initialized and the device is ready
            document.addEventListener("deviceready", function(cordova) {
                console.log("Device ready, starting the app...");
                
                // get rid of the native splash screen
                if(ON_DEVICE) {
                    navigator.splashscreen.hide();    
                }
                
                window.plugins.updater.checkForUpdate();
             
                // navigator.splashscreen.show();//default this to show in case of a full page reload
                /*
                // Facebook plugin
                if (facebookAppId) {
                    alert(facebookAppId);
                    FB.init({ appId: facebookAppId, nativeInterface: CDV.FB, useCachedDialogs: false });
                }
                */
               // alert(window.plugins.twitter);
                // window.plugins.twitter.isTwitterAvailable(function(r){
                //     alert("twitter available? " + r);
                // });  
                // }
                                
                document.addEventListener("backbutton", function(e) {
                    if (!AW5.app || $(AW5.app.view().element).hasClass("app-initial-view")) {
                        // e.preventDefault();
                        navigator.app.exitApp();
                    }
                    else {
                        AW5.app.navigate("#:back");
                    }
                    // for android testing, deregisters from GCM
                    // if (app.view().id === "#dashboard1-1" && pushToken) {
                    //     window.localStorage.removeItem("APN_Token");
                    //     window.plugins.pushNotification.unregister(successHandler, errorHandler);
                    //     // navigator.app.exitApp();
                    // }
                    // else navigator.app.backHistory();
                }, false);

            }, false );

            // initializes the app
            function init (config) {
                var $config = $(config);
                //set up google mapping js
                var googleApiKey = $config.find("googleApiKey").text();
                if (!googleApiKey){//default to appswiz googleApiKey
                    googleApiKey = 'AIzaSyCEUjs8RBpAQHBhl10ykUlmZAl3rXhNkA4';
                }
                var mapsApi = document.createElement('script');
                mapsApi.type = "text/javascript";
                mapsApi.src = "https://maps.googleapis.com/maps/api/js?sensor=true&v=3&libraries=geometry&callback=initializeMapping&key=" + googleApiKey;
                document.body.appendChild(mapsApi);
                
                flurryApiKey = $config.find("flurryApiKey").text();
                if (flurryApiKey) {
                    var versionName = "unknown";
                    if (!ON_DEVICE) {
                        versionName = "mobile web";
                    }
                    else {
                        if (kendo.support.mobileOS.android) versionName = "android";
                        else if (kendo.support.mobileOS.ios) versionName = "ios";
                    }
                    FlurryAgent.setAppVersion(versionName);
                    FlurryAgent.startSession(flurryApiKey);
                    console.log(String.format("Flurry session started - apiKey: {0}, enviroment: {1}, version: {2}", flurryApiKey, versionName, appVersion));
                }
                else console.log("flurryApiKey not found - usage of this app will not be tracked");

                // App Initializes
                AW5.initializeApp($config, forcePlatform, hasInitView);

                /* Push Notification registration *
                ------------------------------------- */
                if (ON_DEVICE && window.plugins.pushNotification) {
                    // already registered with the provider, but not with APN yet
                    if (window.localStorage.getItem("APN_Token") && window.localStorage.getItem("APN_unregistered")) {
                        onRegistrationSuccess(window.localStorage.getItem("APN_Token"));
                    }
                    else {
                        if (kendo.support.mobileOS.android) {
                            window.plugins.pushNotification.register(successHandler, onRegistrationFailed, {"senderID": PROJECT_ID, "ecb": "onNotificationGCM"});
                        
                        } else {
                            window.plugins.pushNotification.register(onRegistrationSuccess, onRegistrationFailed, {"badge":"true", "sound":"true", "alert":"true", "ecb":"onNotificationAPN"});
                        }
                    }
                }

                SHARING_ENABLED = $config.attr("sharingEnabled");
                FACEBOOK_ENABLED = $config.attr("facebookable");
                TWITTER_ENABLED = $config.attr("tweetable");
                APP_STORE_URL = $config.find("appStoreUrl").text();
                GOOGLE_PLAY_URL = $config.find("googlePlayUrl").text();

                if (SHARING_ENABLED != "true") {
                    $(".app-share-button").hide();
                }

                if (TWITTER_ENABLED === "true") {
                    TWITTER_CONSUMER_KEY = $config.find("twitter consumerKey").text();
                    TWITTER_CONSUMER_SECRET = $config.find("twitter consumerSecret").text();
                }
                else {
                    $(".social-sharing.twitter").hide();
                }

                if (FACEBOOK_ENABLED === "true") {
                    FACEBOOK_APP_ID = $config.find("facebook appId").text();
                    FACEBOOK_SECRET_KEY = $config.find("facebook secretKey").text();

                    if (ON_DEVICE && kendo.support.mobileOS.ios) {
                        FB.Event.subscribe('auth.login', function(response) {
                           //alert('auth.login event');
                           });
        
                        FB.Event.subscribe('auth.logout', function(response) {
                                          // alert('auth.logout event');
                                           });
                        
                        FB.Event.subscribe('auth.sessionChange', function(response) {
                                          // alert('auth.sessionChange event');
                                           });
                        
                        FB.Event.subscribe('auth.statusChange', function(response) {
                                           //alert('auth.statusChange event');
                                           });
                        FB.init({ appId: FACEBOOK_APP_ID, nativeInterface: CDV.FB, useCachedDialogs: false });
                    }
                }
                else {
                    $(".social-sharing.facebook").hide();
                }

                $(".futuredatevalidator").kendoValidator({
                    rules: {
                        dateValidation: function (e) {
                            var currentDate = new Date().getTime();
                            var selectedDate = Date.parse($(e).val());
                            if (selectedDate <= currentDate) {
                                $(e).val("");
                                return false;
                            }
                            return true;
                        }
                    },
                    messages: {
                        required      : "Please select a date",
                        dateValidation: "Selected date cannot be in the past"
                    }
                });

                $(".pastdatevalidator").kendoValidator({
                    rules: {
                        dateValidation: function (e) {
                            var currentDate = new Date().getTime();
                            var selectedDate = Date.parse($(e).val());
                            if (selectedDate >= currentDate) {
                                $(e).val("");
                                return false;
                            }
                            return true;
                        }
                    },
                    messages: {
                        required      : "Please select a date",
                        dateValidation: "Selected date cannot be in the future"
                    }
                });

                console.log("App is now ready");
                $("#loadingPopup").dialog("close");
            }

            if(!ON_DEVICE && !kendo.support.touch) {
                $(window).scroll(function(){
                    $('.overlay-pop-up-wrapper').addClass('active');
                    var scroll = $(this).data('scroll');

                    if(scroll) {
                        clearTimeout(scroll);
                    }

                    $(this).data('scroll', setTimeout(function(){ $('.overlay-pop-up-wrapper').removeClass('active'); }, 5500));

                });
            }

            function emailCallback(result){
                if (result == 0){
                    //do nothing
                }
                else if (result == 1){
                    showAlert("Email saved as a draft", null, "Email Saved", "OK");
                }
                else if (result == 2){
                    showAlert("Email sent successfully", null, "Email Sent", "OK");
                }
                else{
                    showAlert("Email not sent, please try again", null, "Email Not Sent", "OK");
                }
                return result;
            }
            
            // Flurry stuff ===========================================================================================
            var EMAIL_SENT = "1";
            var IMAGE_CLICKED = "2";
            var STREAMED_AUDIO = "3";
            var NAVIGATED_TO_WEBSITE = "4";
            var REQUEST_SENT = "5";
            var CALL_INITIATED = "6";
            var OPENED_MAP = "7";
            var SMS_INITIATED = "8";
            var OPENED_MODULE = "9";
            function logInteraction(module, moduleId, description, eventTypeId) {
                logInteraction (module, moduleId, description, eventTypeId, false);
            }

            function logInteraction (module, moduleId, description, eventTypeId, timed) {
                if (flurryApiKey) {
                    try{
                        console.log('Logging interaction: ' + module + ' | ' + moduleId + ' | ' + description);
                        var eventParams = {
                            moduleId: moduleId
                        };
                        FlurryAgent.logEvent(eventTypeId.toString(), eventParams, timed);
                    }
                    catch (err){
                        console.log(err.message);
                    }
                }
            }

            /* In App Link
            --------------------------------------------- */
            
            function openInAppURL(url, module, moduleId) {
                var $this = $(this);
                var targetUrl = $this.data('url');
                var isLink = false;

                // check if no url has been found and set url to href
                if( targetUrl === undefined ) { 
                    // check for kendo button links
                    if(url !== undefined && url.target !== undefined && url.target.data) {
                        targetUrl = url.target.data('url'); 
                    }
                    else {
                        targetUrl = $this.attr('href');
                    }
                }

                 if(targetUrl === undefined) { 
                     targetUrl = url;               
                 }
                 else{
                     isLink = true;
                 }

                if(targetUrl) {
                    var ref = window.open(targetUrl, '_blank', 'location=no,enableViewportScale=yes,suppressesIncrementalRendering=no');

                    if (ref) {
                        ref.addEventListener("loadstart", function(browser){
                            //TODO: insert loading css into inappbrowser: ref.insertCSS(details, callback);
                            
                            //http://cordova.apache.org/docs/en/2.9.0/cordova_inappbrowser_inappbrowser.md.html#addEventListener
                        });

                        ref.addEventListener("loadstop", function(browser){

                        });

                        ref.addEventListener("loaderror", function(browser){
                           
                            console.log(browser.message);
                            //showAlert('There was an problem loading this web page. Please try again later.', null, "Page Load Error", "OK");
                        });
                    }

                    if (isLink == true){
                        return false;
                    }
                    else {
                        if (module) logInteraction(module, moduleId, "Opened url", 4);
                        return ref;
                    }    
                }
            }
            
            $('body').on('click', '.in-app-link', openInAppURL);
            
            $('body').on('click', '.in-app-map-link', function(){
                var location = $(this).data('location');
                openMapLocation(location);
            });

            function inAppPhoneCall(phoneNumber) {
                if(!phoneNumber && $(this).data('phone-num') ) {
                    phoneNumber = $(this).data('phone-num');
                }
                if(ON_DEVICE && phoneNumber) {
                    window.open("tel:" + phoneNumber);
                }
            }

            // Launch Native Email Composer
            function buttonLinkNavigate(e) {
                AW5.app.navigate($(e.button).data('link'));
            }

            function composeNativeEmailWith(email, moduleId, eventName){
                 if(ON_DEVICE && window.plugins.emailComposer) {
                    console.log('using email plugin');
                    window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                        if (result == 2){
                            logInteraction(eventName, moduleId, "Sent email", 1);
                        }
                    },
                    "", "", [email], [], [], true, null);
                }
                else {
                    window.location.href = "mailto:" + email;
                    logInteraction(eventName, moduleId, "Clicked email link", 1);
                }
            }

            // Launch Native Email Composer
            function composeNativeEmail(e) {
                console.log('composeNativeEmail called.');
                var email;
                if(e && e.button) {
                    email = e.button.data('email');
                }
                else {
                    email = $(this).data('email');
                }
                console.log("email: " + email);
                if(kendo.support.mobileOS && window.plugins.emailComposer) {
                    console.log('using email plugin');
                    window.plugins.emailComposer.showEmailComposerWithCallback(emailCallback, "", "", [email], [], [], true, null);
                }
                else {
                    window.location.href = "mailto:" + email;
                }
            }
            
            function openMapLocation(location) {
                app.showLoading();
                
                if ( !location || !location.length ) return;
                
                $("#map-view .map-content").gmap3({
                    getlatlng: {
                        address:  location,
                        callback: function(results) {
                            if ( !results ) return;
                            $(this).gmap3({
                                map: {
                                    options: { zoom: 14, center: results[0].geometry.location }
                                },
                                marker: {
                                    latLng: results[0].geometry.location,
                                }
                            });
                            app.navigate('#map-view');
                            app.hideLoading();
                        }
                    }
                });

                app.hideLoading();

            }

            function removeLoadingImg(img) {
                $(img).siblings('.img-loading').hide();
            }
            
            function toggleDropDownWidget() {
                $(this).closest('.drop-down-widget').toggleClass('active');
            }
            
            function openPDFLink(e) {
                var url = e.item.data('url');
                if (kendo.support.mobileOS.android) {
                    url = "http://docs.google.com/viewer?url=" + url;
                }
                openInAppURL(url);
            }

            /* Camera Functions  */

            function takePhotos(callbackfn){
                navigator.device.capture.captureImage(callbackfn, onCameraCaptureError, {highRes: false});
            }

            // Called if something bad happens.
            // 
            function onCameraCaptureError(error) {
                var msg;
                switch (error.code) {
                    case CaptureError.CAPTURE_NO_MEDIA_FILES:
                        msg = 'Image capture has been cancelled';
                        break;

                    case CaptureError.CAPTURE_NOT_SUPPORTED:
                        msg = 'Image capture is not supported in this device';
                        break;
                    default:
                        msg = 'An error occurred during capture: ' + error.code;
                        break;
                }

                navigator.notification.alert(msg, null, 'Image Capture');
            }

            function shouldRotateToOrientation(interfaceOrientation) {
                return (1 === interfaceOrientation); // support portrait only
            }
                
            function showAlert(message, callback, title, buttons){
                if (navigator && navigator.notification && navigator.notification.alert){
                    navigator.notification.alert(message, callback, title, buttons);
                }
                else{
                    alert(message);
                }
            }

            function initializeMapping(){
                var gmap3 = document.createElement('script');
                gmap3.type = "text/javascript";
                gmap3.src = "js/gmap3.js";
                document.body.appendChild(gmap3);

                var marker = document.createElement('script');
                marker.type = "text/javascript";
                marker.src = "js/geolocationmarker.js";
                document.body.appendChild(marker);
            }

            /*
            var GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=au.com.appswiz";
            var APP_STORE_URL = "https://itunes.apple.com/au/app/appswiz-mobile/id458023316?mt=8";
            */

            function shareFacebook() {
                doAppShare("facebook");
            }

            function shareTwitter() {
                doAppShare("twitter");
            }

            function shareEmail() {
                doAppShare("email");
            }

            function shareSMS() {
                doAppShare("sms");
            }

            function doAppShare(type) {
                if (SHARING_ENABLED === "true") {
                    var shareUrl = (kendo.support.mobileOS.ios ? APP_STORE_URL : GOOGLE_PLAY_URL);
                    //swap URLs if empty
                    if (shareUrl.length == 0) {
                        var shareUrl = (kendo.support.mobileOS.ios ? GOOGLE_PLAY_URL : APP_STORE_URL);
                    }

                    var shareMessage = "I have downloaded this app from:" + shareUrl;

                    if (type === "facebook") {
                        if(FACEBOOK_ENABLED === "true") {
                            postToFacebook(null, shareUrl, null, null, "Check this app out!");
                        }
                        else {
                            var href="http://m.facebook.com/sharer.php?u=" + shareUrl;
                            openInAppURL(href);
                        }
                    }

                    else if (type === "twitter") {
                        if(TWITTER_ENABLED === "true") {
                            tweet("Check this app out:", shareUrl);
                        }
                        else {
                            var href="https://twitter.com/intent/tweet?url=" + encodeURIComponent(shareUrl)
                            + "&text=" + encodeURIComponent("Check this app out:");
                            openInAppURL(href);
                        }
                    }

                    else if (type === "email") {
                        if(kendo.support.mobileOS && window.plugins.emailComposer) {
                            window.plugins.emailComposer.showEmailComposerWithCallback(function(){}, "Check this app out", shareMessage, [], [], [], false, null);
                        }
                        else {
                            document.location.href = "mailto:?subject=Check%20this%20app%20out!&body=" + encodeURI(shareMessage);
                        }
                    }

                    else if (type === "sms") {
                        document.location.href = "sms:?body=" + encodeURI(shareMessage);
                    }
                }
                else {
                    showAlert("Sorry, this feature is not available at this time", null, "Share this App");
                }
            }
            


		 	window.location='index.html';
		

﻿/* String Buffer Object allows for easy and efficient string building */
function StringBuffer() {
    this.__strings__ = new Array;
}

StringBuffer.prototype.append = function (str) {
    this.__strings__.push(str);
}

StringBuffer.prototype.toString = function () {
    return this.__strings__.join("");
}

StringBuffer.prototype.length = function () {
    return this.__strings__.length;
}
/* 
decimal_sep: character used as deciaml separtor, it defaults to '.' when omitted
thousands_sep: char used as thousands separator, it defaults to ',' when omitted
*/
Number.prototype.toMoney = function (decimals, decimal_sep, thousands_sep) {
    var n = this,
        c = isNaN(decimals) ? 2 : Math.abs(decimals), //if decimal is zero we must take it, it means user does not want to show any decimal
        d = decimal_sep || '.', //if no decimal separator is passed we use the dot as default decimal separator (we MUST use a decimal separator)

    /*
    according to [http://stackoverflow.com/questions/411352/how-best-to-determine-if-an-argument-is-not-sent-to-the-javascript-function]
    the fastest way to check for not defined parameter is to use typeof value === 'undefined' 
    rather than doing value === undefined.
    */
         t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, //if you don't want to use a thousands separator you can pass empty string as thousands_sep value

        sign = (n < 0) ? '-' : '',

    //extracting the absolute value of the integer part of the number and converting to string
            i = parseInt(n = Math.abs(n).toFixed(c)) + '',

        j = ((j = i.length) > 3) ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
}

// adjust the provided container to match the content area (window size minus header and footer height)
function adjustHeight(container) {
    var total = $(window).height();
    var height = total - 92; // 92 = total of header and footer height
    $(container).css({
        "height": height + "px",
        "width": $(window).width() + "px"
        });
}

// Maximize the container's size to match the current window
function maximize(container) {
    $(container).css({
        "height": $(window).height() + "px",
        "width": $(window).width() + "px",
    });
}

// Centers all the elements with the class "dead-center" in the container.
// Each element must has its CSS position either relative or absolute, and the dimensions defined
function centerInContainer(container) {
    var windowHeight = $(".content").height();
    var windowWidth = $(".content").width();

    var elements = $(container).find(".dead-center");

    elements.each(function() {
        var height = $(this).actual("height");
        var width = $(this).actual("width");
        var top = windowHeight > height ? (windowHeight - height) / 2 : 0;
        var left = windowWidth > width ? (windowWidth - width) / 2 : 0;

        $(this).css({
            "top": top + "px",
            "left": left + "px",
        });
    });
}


cordova.define("cordova/plugin/videoplayer",
  function(require, exports, module) {
    var exec = require("cordova/exec");
    var VideoPlayer = function () {};

    /**
     * Starts the video player intent
     *
     * @param url           The url to play
     */
    VideoPlayer.prototype.play = function(url) {
        exec(null, null, "VideoPlayer", "playVideo", [url]);
    };

    var videoPlayer = new VideoPlayer();
    module.exports = videoPlayer;
});

if (!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.videoPlayer) {
    window.plugins.videoPlayer = cordova.require("cordova/plugin/videoplayer");
}

