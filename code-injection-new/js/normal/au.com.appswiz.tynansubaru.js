




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

$.getScript("plugins/com.appswiz.hybridfactory.updater/Updater.js", function(){
    console.log("Added android plugin Updater");
});



                function addCorrectCss() {
                    /*  Interrogate the URL to pull out any parameters */
                    var url = purl();
                    var IN_PREVIEW_MODE = url.param('preview_mode') ? true : false;//used to load the preview css
                    var USE_PREVIEW_CSS = url.param('preview_css') ? true : false;
                    var CLEAR_CACHE = url.param('clear_cache') ? true : false;
                    var appId;
                    if (url.param('appId')){//use the one pass in as the querystring
                        appId = url.param('appId');
                    }
            
                    var cssPath = "assets/css/screen.css";
                    
                    if (appId) {
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
            var appId;

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
            
            // flag that indicates the config.xml is ready
            var CONFIG_READY = false;
            // flag that indicates the webapp is ready
            var APP_READY = false;
            
            /* ===========================================
             App Configuration
            =============================================*/
            
            // Domains to get configuration data
            var CONFIG_FILE_PATH   = '/mobileservice/mobileappservice.asmx/GetAppConfiguration?applicationId=';
            var CONFIG_DNS_PATH = '/mobileservice/mobileappservice.asmx/GetAppConfigByDnsPrefix?dns=';
            var PROD_WEBSERVICE_PATH = "https://www.appswiz.com/mobileservice/mobileappservice.asmx";
            var DEV_WEBSERVICE_PATH = "http://test.appswiz.com/mobileservice/mobileappservice.asmx";

            var webserviceUrl;

            function configWebserviceUrl (test_mode) {
                if(test_mode){
                    webserviceUrl = DEV_WEBSERVICE_PATH;
                }
                else {
                    webserviceUrl =  PROD_WEBSERVICE_PATH ;
                }
            }

            
            // running on a browser - start the app as the web app will be up to date
            if (!ON_DEVICE) {
                console.log("Running web app from a browser - update check skipped.");
                configWebserviceUrl (IS_TEST);
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
                    FlurryAgent.setAppVersion($config.find("versions content").text());
                    FlurryAgent.startSession(flurryApiKey);
                    console.log("Flurry session started.");
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

                // checks that this app is tweetable and fackbookable
                if ($config.attr("tweetable") !== "true") {
                    $(".social-sharing.twitter").hide();
                }

                if ($config.attr("facebookable") === "true" && ON_DEVICE && kendo.support.mobileOS.ios) {
                    var facebookAppId = $config.find("facebook appId").text()

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
                    FB.init({ appId: facebookAppId, nativeInterface: CDV.FB, useCachedDialogs: false });
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

            // Debugging
            window.onerror = function(error, url, line) {
                //alert(error + '\n' + 'At Line: ' + line);
            };

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
            }
            
            /* In App Link
            --------------------------------------------- */
            
            function openInAppURL(url) {
                var $this = $(this);
                var targetUrl = $this.data('url');

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
                
                // // check for kendo button links
                // if(url !== undefined && url.target !== undefined) {
                //     targetUrl = url.target.data('url'); 
                // }

                // // check if no url has been found and set url to href
                // if( targetUrl === undefined ) { 
                //     targetUrl = $this.attr('href');
                // }

                 if(targetUrl === undefined) { 
                     targetUrl = url;               
                 }

                if(targetUrl) {
                    window.open(targetUrl, '_blank', 'location=no,enableViewportScale=yes,suppressesIncrementalRendering=no');
                    return false;
                }
            }
            $('body').on('click', '.in-app-link', openInAppURL);
           // $('body').on('click', '.email-link', composeNativeEmail);

            
            
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

            function composeNativeEmailWith(email){
                 if(kendo.support.mobileOS && window.plugins.emailComposer) {
                    console.log('using email plugin');
                    window.plugins.emailComposer.showEmailComposerWithCallback(emailCallback, "", "", [email], [], [], true, null);
                }
                else {
                    window.location.href = "mailto:" + email;
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

