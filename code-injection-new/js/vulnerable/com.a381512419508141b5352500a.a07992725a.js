

		


	if (typeof  jt_set_frame_size2 !== 'function') {
		var jt_set_frame_size2 = jt_set_frame_size;
		var isExpanded = false;
		var jt_set_frame_size = function(x, y, width, height, transition, callback) {
			jt_set_frame_size2(x, y, width, height, transition, callback);
			
			if (!isExpanded) {
                isExpanded = true;
                Tracking.startInteraction();
            } else {
                isExpanded = false;
                Tracking.stopInteraction();
            }
            JtVwCb.setSize(x, y, width, height,isExpanded);
		}
	}
	
	if (typeof TrayController === 'function') {
		var initialTouchStart = TrayController.prototype.touchstart;
		TrayController.prototype.touchstart = function () {
			Tracking.startInteraction();
			return initialTouchStart.apply(this, arguments);
		};
		
		var initialTouchEnd = TrayController.prototype.touchend;
        TrayController.prototype.touchend = function () {
            Tracking.stopInteraction();
            return initialTouchEnd.apply(this, arguments);
        };
	}
	


_accel = {}
_accel.x = 0;
_accel.y = 0;
_accel.z = 0;

function gotAccel(x, y, z){	
	_accel.x = x;	
	_accel.y = y;	
	_accel.z = z;
}

// use the var syntax eventually for namespace purposes

callbackStashCounter = 0;
callbackStash = {};

submitCallbackForExecution = function(callback) {
    var id = 'RaptorCB-' + (callbackStashCounter++);
    callbackStash[id] = callback;
    return id;
};

executeCallback = function(id) {
        if (id != null) {
            var callback = callbackStash[id];
            if (callback === null) {
                delete callbackStash[id];
                return 'executeCallback: id[' + id + '] received but callback entry does not exist';
            } else {
                if (typeof callback === 'function') {
                	callback();
                    delete callbackStash[id];
                    return 'executeCallback: Success';
                } else {
                    try {
                        eval(callback);
                    } catch(e) {
                        return 'executeCallback: Exception thrown: ' + e;
                    } finally {
                        delete callbackStash[id];
                    }
					
                    return 'executeCallback: Success';
                }
            }
        }
        return 'executeCallback: Invalid callback ID';
    }

var AdDevice = new Object();
AdDevice.transitions = {
        None          : 0,
        FlipFromLeft  : 1,
        FlipFromRight : 2,
        CurlUp        : 3,
        CurlDown      : 4
    };

AdDevice.getCurrentAcceleration = function (successCallback, errorCallback, options) {
	if (typeof successCallback == "function") {
		successCallback(_accel);	
	}
}

AdDevice.watchAcceleration = function (successCallback, errorCallback, options) {  
	var frequency = (options != undefined)? options.frequency : 10000;
	Accel.start(frequency);
	return setInterval(function() {
		AdDevice.getCurrentAcceleration(successCallback, errorCallback, options);
		}, frequency); 
}

AdDevice.clearWatch =  function (watchId) {	
	Accel.stop();	
	clearInterval(watchId);
}

AdDevice.beginAdInteraction = function () {
	Tracking.startInteraction();
}

AdDevice.endAdInteraction = function () {
	Tracking.stopInteraction();
}

AdDevice.expandTo = function (width, height, callback, transition, options) {
    var id = submitCallbackForExecution(callback);
    if (typeof transition !== 'number') {
        transition = AdDevice.transitions[transition];
        if (typeof transition === 'undefined') {
            transition = AdDevice.transitions.None;
        }
    }
    JtVwCb.expandTo(width, height, id, transition, options);
	AdDevice.beginAdInteraction();
}

AdDevice.restoreToBanner = function (callback, transition, options) {
    var id = submitCallbackForExecution(callback);
    if (typeof transition !== 'number') {
        transition = AdDevice.transitions[transition];
        if (typeof transition === 'undefined') {
            transition = AdDevice.transitions.None;
        }
    }
	JtVwCb.restoreToBanner(id, transition, options);
	AdDevice.endAdInteraction();
}

AdDevice.openUri = function(uri, contentType, options) {
	// TODO: do something
	// Tells the SDK to navigate to a specific URL and "do the right thing" with it.  
	// Since normally clicking on a link will be intercepted by the SDK, you'd use this 
	// function if you want to supply hints.  What hints, you say?  Well, contentType 
	// helps control what type of player will be chosen (or which external app will be used).  
	// This is particularly useful if the URI points to an URL-shortened URL and you want 
	// to tell the SDK what type of data will be at the other end of the redirect before the 
	// redirect is followed.  
	// (valid types are "youtube", "video", "uri", "tel", "itunes", "map")  
	// In this case, options is a JSON structure.  I think the only interesting option 
	// is fullscreen, as in {fullscreen: true}.
	JtVwCb.openURI(uri, contentType, options);
}

AdDevice.getScreenSize = function () {
	var response = JtVwCb.getScreenSize();
	var result = JSON.parse(response);
	return result;
}

function initORMMA() {
    var ormma = window.ormma = {};
    
    // CONSTANTS ///////////////////////////////////////////////////////////////
    
    var STATES = ormma.STATES = {
        UNKNOWN     :'unknown',
        DEFAULT     :'default',
        RESIZED     :'resized',
        EXPANDED    :'expanded',
        HIDDEN      :'hidden'
    };
    
    // just a subset of all ormma events
    var EVENTS = ormma.EVENTS = {
        ERROR               :'error',
        INFO                :'info',
        STATECHANGE         :'stateChange'
    };
    
    // PRIVATE PROPERTIES (sdk controlled) //////////////////////////////////////////////////////
    
    var state = STATES.UNKNOWN;
    
    var screenSize = null;
    
    var ready = false;
    
    var listeners = {};
    
    var EventListeners = function(event) {
        this.event = event;
        this.count = 0;
        var listeners = {};
        
        this.add = function(func) {
            var id = String(func);
            if (!listeners[id]) {
            	listeners[id] = func;
                this.count++;
                // if (this.count == 1) ormmaview.activate(event);
            }
        };
        this.remove = function(func) {
            var id = String(func);
            if (listeners[id]) {
            	listeners[id] = null;
                delete listeners[id];
                this.count--;
                // if (this.count == 0) ormmaview.deactivate(event);
                return true;
            } else {
            	return false;
            }
        };
        this.removeAll = function() { for (var id in listeners) this.remove(listeners[id]); };
        this.broadcast = function(args) { for (var id in listeners) listeners[id].apply({}, args); };
        this.toString = function() {
            var out = [event,':'];
            for (var id in listeners) out.push('|',id,'|');
            return out.join('');
        };
    };
    
    var contains = function(value, array) {
        for (var i in array) if (array[i] == value) return true;
        return false;
    };
    
    var broadcastEvent = function() {
        var args = new Array(arguments.length);
        for (var i = 0; i < arguments.length; i++) args[i] = arguments[i];
        var event = args.shift();
        if (listeners[event]) listeners[event].broadcast(args);
    }

    ormma.addEventListener = function(event, listener) {
        if (!event || !listener) {
            broadcastEvent(EVENTS.ERROR, 'Both event and listener are required.', 'addEventListener');
        } else if (!contains(event, EVENTS)) {
			broadcastEvent(EVENTS.ERROR, 'Unknown event: ' + event, 'addEventListener');
        } else {
            if (!listeners[event]) listeners[event] = new EventListeners(event);
            listeners[event].add(listener);
        }
    };

    ormma.removeEventListener = function(event, listener) {
        if (!event) {
            broadcastEvent(EVENTS.ERROR, 'Must specify an event.', 'removeEventListener');
        } 
        else {
            if (listener && (!listeners[event] || !listeners[event].remove(listener))) {
                broadcastEvent(EVENTS.ERROR, 'Listener not currently registered for event', 'removeEventListener');
                return;  
            } 
            else if (listeners[event]){
                listeners[event].removeAll();
            }
            
            if (listeners[event] && listeners[event].count == 0) {
                listeners[event] = null;
                delete listeners[event];
            }
        }
    };

   
    // todo: get the screen size via the bridge.
    // todo: presumably this is initialized once via javascript rather than
    // todo: invoked every time
    ormma.getScreenSize = function() { // return {width: 480, height: 320};
    	return AdDevice.getScreenSize();
    };
        
    // do nothing :-)
    ormma.getExpandProperties = function () { return {}; };
    // do nothing :-)
    ormma.setExpandProperties = function (props) { } ;
        
    // in a fully ORMMA compliant implementation this would be explicitly sent by the SDK whenever the
    // ad expands or contracts.  In our implementation, we want to support the ORMMA syntax for adding
    // and removing listeners but we only need the STATECHANGE event to be sent in response to an ORMMA
    // request to change state.
    ormma.runORMMAExpandCallbacks = function () { 
        state = STATES.EXPANDED;
        broadcastEvent(EVENTS.STATECHANGE, state);
    }
    ormma.runORMMACollapseCallbacks = function () { 
        state = STATES.DEFAULT;
        broadcastEvent(EVENTS.STATECHANGE, state);
    }
        
    ormma.expand = function(dimensions, URL) {
        // extract x,y,width,height from dimensions and pass off to 
        // AdDevice expander
        var width = dimensions.width;
        var height = dimensions.height;
        // todo: the callback here can be a noop because eventually the event triggering will
        // todo: automatically invoke the appropriate callbacks.
        AdDevice.expandTo(width, height, function() { ormma.runORMMAExpandCallbacks(); });
    };
        
    ormma.close = function() {
        AdDevice.restoreToBanner(function() { ormma.runORMMACollapseCallbacks();});
    };
        
    ormma.open = function(url, controls) {
        // TODO: handle controls
        AdDevice.openUri(url);
    };
    
    ormma.getViewable = function() {
    	return true;
    }
    
    ormma.hide = function() {
    	JtVwCb.hideWidget();
    }
        
    ormma.playVideo = function(url, properties) {
        // TODO: handle properties
        AdDevice.openUri(url);
    };

}

window.onload = initORMMA();







	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            

	                        
         $(document).ready(function() {
	//	 alert("1");
             document.addEventListener("deviceready",onDeviceReadyCheckNetwork,false);
         });
    
         function onDeviceReadyCheckNetwork() {
		// alert("2");
        var networkState = navigator.network.connection.type;
if (networkState===Connection.UNKNOWN){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }
	else if (networkState===Connection.NONE){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }

         }
     



	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyVideoPlayer,false);
         });
    
         function onDeviceReadyVideoPlayer() {
            $("a.open-plugin-videoplayer").click(function() {
                 var vidGoUrl = $(this).attr("data-vidurl");
	             window.plugins.videoPlayer.play(vidGoUrl);
                 return false;
             });
         }
     
    
        $(document).ready(function() {
                          $('#youtubevideos').youTubeChannel({ 
                                                             userName: 'fun+bathroom', 
                                                             channel: "uploads", 
                                                             hideAuthor: true,
                                                             numberToDisplay: 30,
                                                             linksInNewWindow: true
                                                             //other options
                                                             //loadingText: "Loading...",                    
                                                             },"android");
                          });            
        

function ActivityIndicator()
{

};

ActivityIndicator.prototype.show = function(message)
{
    PhoneGap.exec('ActivityIndicatorCommand.show', message);

};

ActivityIndicator.prototype.updateMessage = function(message)
{
    PhoneGap.exec('ActivityIndicatorCommand.updateMessage', message);
    
};

ActivityIndicator.prototype.hide = function()
{
    PhoneGap.exec('ActivityIndicatorCommand.hide');


};

ActivityIndicator.install = function()
{
    if(!window.plugins)
    {
        window.plugins = {};	
    }

    window.plugins.activityIndicator = new ActivityIndicator();
    return window.plugins.activityIndicator;
};

PhoneGap.addConstructor(ActivityIndicator.install);






                
                var childBrowser;
                
                function getUrlVars() {
                    var vars = {};
                    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                                                             vars[key] = value;
                                                             });
                    return vars;
                }
                
                function onBodyLoad()
                {
                    document.addEventListener("deviceready",onDeviceReady,false);
                }
                /* When this function is called, PhoneGap has been initialized and is ready to roll */
           /*     function onDeviceReady()
                {
                    var goUrl = getUrlVars()["goUrl"];
					goUrl=decodeURIComponent(goUrl);
                    redirectUrl="index.html";
                    
            try {
                        //both of these should work...
                        //window.plugins.childBrowser.showWebPage(url);
                        alert(goUrl);
                        window.plugins.childBrowser.showWebPage(goUrl);
                    }
                    catch (err)
                    {
                        alert(err);
                    }
					
                    window.location = redirectUrl
                
				}*/
                function onDeviceReady() {
                    
                    var root = this;
                    cb = window.plugins.childBrowser;
                    
                    var goUrl = getUrlVars()["goUrl"];
					goUrl=decodeURIComponent(goUrl);
                    redirectUrl="index.html";                    
                    if(cb != null) {
                        
                        cb.onLocationChange = function(loc){ root.locChanged(loc); };
                        cb.onClose = function(){root.onCloseBrowser(); };
                        cb.onOpenExternal = function(){root.onOpenExternal(); };
                        cb.showWebPage(goUrl);
                                    }
                }
                
                function onCloseBrowser() {
                    console.log("onCloseBrowser!");
                    window.location = redirectUrl
                }
                
                function locChanged(loc) {
                    console.log("locChanged!");
                }
                
                function onOpenExternal() {
                    alert("onOpenExternal!");
                }                
                






	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            

	                        
         $(document).ready(function() {
	//	 alert("1");
             document.addEventListener("deviceready",onDeviceReadyCheckNetwork,false);
         });
    
         function onDeviceReadyCheckNetwork() {
		// alert("2");
        var networkState = navigator.network.connection.type;
if (networkState===Connection.UNKNOWN){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }
	else if (networkState===Connection.NONE){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }

         }
     

              
function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}
   	                
   	                $(document).ready(function() {
                        rssReader();
                    });

                function  rssReader() {
                    $("#main-content").html("<p>Please wait...</p>");
                    var RSS = "http://best-android-apps.mobi/3070&offerwall=1";
                    //var RSS = "http://best-android-apps.mobi/3070";
                    console.log("EVERBADGE URL: "+RSS);
                    var entries = [];
                    var selectedEntry = "";
                          $.get(RSS, {}, function(res, code) {
                                    //console.log("EVERBADGE RETURN CODE: " + code);
                             if(code == "success") {
                                    //console.log(res)
                                 var xml = $(res);
                                    
                                     var content = xml.find("#main");
  							     $("#main-content").html(content);$("td a.appTitle").each(function(index) {
                                     var goUrl = $(this).attr("href");
                                     $(this).addClass("open-external-browser");
                                     $(this).attr("data-gourl",goUrl);
                                 });
                                 $("td.thumbBox a").each(function(index) {
                                     var goUrl = $(this).attr("href");
                                     $(this).addClass("open-external-browser");
                                     $(this).attr("data-gourl",goUrl);
                                 });
                             } else {
                                  $("#main-content").html("<p>Could not get data, please try again.</p>");
                             }
                         });
                }
                
                









	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            


function numbermificate(str) {
    return str.replace(/[^0-9\.]+/g, '');
}

function addCommas(nStr)
{
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function resetCalculator()
{
$('#billAmount').val('');
$('#tipPercent').val('15');
$('#noPeople').val('1');
 $('#tipAmount').val('');
  $('#totalWithTip').val('');
  $('#eachPersonPays').val('');
}


function calculateTip()
{
  var billAmount = parseFloat(numbermificate($('#billAmount').val()));
  if (isNaN(billAmount)) billAmount = 0.0;
  $('#billAmount').val(addCommas(roundNumber(billAmount,2)));

  var tipPercent = parseFloat(numbermificate($('#tipPercent').val()));
  if (isNaN(tipPercent)) tipPercent = 0.0;
  $('#tipPercent').val(tipPercent);

  var noPeople = parseInt(numbermificate($('#noPeople').val()));
  if (isNaN(noPeople)) noPeople = 1;
  if (noPeople < 1) noPeople = 1;
  $('#noPeople').val(noPeople);

  var tipAmount = 0;
  var totalWithTip = 0;
  var eachPersonPays = 0;

  tipAmount = (tipPercent / 100) * billAmount;
  totalWithTip = tipAmount + billAmount;
  eachPersonPays = totalWithTip / noPeople;


  $('#tipAmount').val(addCommas(roundNumber(tipAmount,2)));
  $('#totalWithTip').val(addCommas(roundNumber(totalWithTip,2)));
  $('#eachPersonPays').val(addCommas(roundNumber(eachPersonPays,2)));
}







	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            


            var pictureSource;   // picture source
            var destinationType; // sets the format of returned value
            var destinationTypeData;
            var albumButton;
            var libraryButton;
            var cameraButton;
            var resetButton;
                    
            function OnBodyLoadCamera() {
                //console.log("BODY LOADED");
                document.addEventListener("deviceready",onDeviceReadyCamera,false);
                $("#select-photo-wrapper").show();
            }

                    
            function onDeviceReadyCamera() {
                console.log("DEVICE READY");
                pictureSource=navigator.camera.PictureSourceType;
                destinationType=navigator.camera.DestinationType;
                    
                albumButton = document.getElementById("select-photo-album-button");
                cameraButton = document.getElementById("take-photo-button");
                resetButton = document.getElementById("send-photo-reset");
                destinationTypeData = destinationType.FILE_URI;
                //destinationTypeData = destinationType.FILE_URI;
                                
                $("#send-photo-submit").click(function() {
                    console.log("SEND VIA WEBINTENT");
                    var extras = {};
                    extras[WebIntent.EXTRA_SUBJECT] = "Photo Entry Number 2 Time";
                    extras[WebIntent.EXTRA_TEXT] = $("textarea#emailPhotoMessage").val();
                    extras[WebIntent.EXTRA_STREAM] = $("#emailPhotoLocation").val();
                    extras[WebIntent.EXTRA_EMAIL] = "support@apps-xtreme.com";
                    window.plugins.webintent.startActivity({
                       action: WebIntent.ACTION_SEND,
                       type: 'image/jpeg',
                       extras: extras
                    },
                    function() {
                        //$("#photo-container").html("<p><strong>Photo sent! Thankyou!</stong></p>");
                        $("#photo-container").html("");
                        navigator.notification.alert("Photo is being sent. Thank you!", false, "Sending...", "Close");
                        $("textarea#emailPhotoMessage").val("");
                        $("#emailPhotoLocation").val("");
                        $("#send-photo-submit-container").hide();
                        $("#select-photo-wrapper").show();
                    },
                    function() {
                        $("#photo-container").html("<p><strong>Sorry - failed to send Photo. Please try again.</stong></p>");
                        //alert("Failed to send email via Android Intent");
                    }
                    );
                    return false;
                });
                $("#send-photo-submit-container").hide();
                
                albumButton.addEventListener("click", getFromAlbum, false);
                            
                cameraButton.addEventListener("click", takeFromCamera, false);
                resetButton.addEventListener("click", resetForm, false);
            }
                            
            function emailComposerCb() {
                $("#photo-container").html("");
                    $("textarea#emailPhotoMessage").val("");
                    $("#emailPhotoLocation").val("");
                    $("#send-photo-submit-container").hide();
                    $("#select-photo-wrapper").show();
                    navigator.notification.alert("Photo sent. Thank you!", false, "Sent", "Close");
            }
                            
            function resetForm() {
                navigator.notification.confirm("Reset the Form?", function(button) {
   	                if(parseInt(button) == 1) {
                        $("textarea#emailPhotoMessage").val("");
                        $("#emailPhotoLocation").val("");
                        $("#send-photo-submit-container").hide();
                        $("#select-photo-wrapper").show();
   	                }
                }, "Reset the Form?","OK,Cancel")
            }
                            
            function getFromLibrary() {
                //alert("GET FROM LIBRARY");
                getPhoto(pictureSource.PHOTOLIBRARY);
                return false;
            }
                            
            function getFromAlbum() {
                //alert("GET FROM ALBUM");
                getPhoto(pictureSource.SAVEDPHOTOALBUM);
                return false;
            }
                            
            function takeFromCamera() {
                console.log("TAKE A PHOTO");
                capturePhoto();
                return false;
            }
                           
            function capturePhoto() {
                // Take picture using device camera and retrieve image as a URI
                navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 49, destinationType: destinationTypeData });
            }
                   
            function getPhoto(source) {
                // Retrieve image file location from specified source
                //console.log("GET PHOTO FROM " + source);
                navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 49, 
                destinationType: destinationTypeData,
                sourceType: source });
            }
                    
            function onPhotoURISuccess(imageData) {
                console.log("PHOTO URI: " + imageData);
                var imageURI;
                imageURI = imageData;
                $("#emailPhotoLocation").val(imageURI);
                $("#photo-container").html('<img src="'+imageURI+'" style="width:90%;display:block;margin-left:auto;margin-right:auto;" id="photo-to-send" />');
                    
                $("#send-photo-submit-container").show();
                $("#select-photo-wrapper").hide();
            }
                    
            function onFail(message) {
                $("#photo-container").html("<p><strong>Sorry - failed to get Photo ("+message+"). Please try again.</stong></p>");
                console.log("GET PHOTO Failed because: " + message);
                $("#select-photo-wrapper").show();
            }
        






	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            



   	        var scanButton;
        	var resultSpan;

   	 function onLoad() {

   	    scanButton = document.getElementById("scan-button");
        resultSpan = document.getElementById("scan-result");
   	                document.addEventListener("deviceready", onDeviceReadyBarcodeScanner, false);
//         if( navigator.userAgent.match(/Android/i) ) {
//              onDeviceReadyBarcodeScanner();
//     } else if (typeof navigator.device == "undefined"){
//             document.addEventListener("deviceready", onDeviceReadyBarcodeScanner, false);
//     } else {
//              onDeviceReadyBarcodeScanner();
//     } 
    }

    // Cordova is loaded and it is now safe to make calls Cordova methods
    //
    function onDeviceReadyBarcodeScanner() {
        // Now safe to use the Cordova API
   	                console.log("BARCODE SCANNER ONDEVICEREADY");
    scanButton.addEventListener("click", clickScan, false);
    }



function clickScan() {
    window.plugins.barcodeScanner.scan(scannerSuccess, scannerFailure);
}


//------------------------------------------------------------------------------
function scannerSuccess(result) {
   	if(result.cancelled == false) {
   	    $("#touch-to-scan").hide();
   	    $("#post-scan-container").show();
   	    var returnedText = result.text;
   	    var scannedFormat = result.format;
   	    resultSpan.innerHTML = replaceURLWithHTML(returnedText);
   	                
   	    $("#post-scan").click(function() {
            $("#post-scan-container").hide();
   	        $("#touch-to-scan").show();
   	        resultSpan.innerHTML = "";
   	        return false;
        });
   	}
}

//------------------------------------------------------------------------------
function scannerFailure(message) {
    //console.log("scannerFailure: message: " + message)
    resultSpan.innerText = "failed to Scan: " + message;
}

function replaceURLWithHTML(text) {
    var expUrl = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var expImg = /(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:jpg|gif|png))(?:\?([^#]*))?(?:#(.*))?/ig;

    if(text.match(expUrl)) {
        //is URL format
        if(text.match(expImg)) {
            //is link to image
            return text.replace(expUrl,'<img src="$1">'); 
        } else { 
            window.plugins.childBrowser.openExternal(text);
            return text.replace(expUrl,'<a href="$1" class="open-external-browser" data-gourl="$1">$1</a>'); 
         
        }
    } else {
        return text;
    } 
}

    
    






	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            

	                        
         $(document).ready(function() {
	//	 alert("1");
             document.addEventListener("deviceready",onDeviceReadyCheckNetwork,false);
         });
    
         function onDeviceReadyCheckNetwork() {
		// alert("2");
        var networkState = navigator.network.connection.type;
if (networkState===Connection.UNKNOWN){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }
	else if (networkState===Connection.NONE){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }

         }
     
   
               
              function onBodyLoad() { 

    if( navigator.userAgent.match(/Android/i) ) {
             userLoc();
    } else if (typeof navigator.device == "undefined"){
            document.addEventListener("deviceready", userLoc, false);
    } else {
             userLoc();
    } 
}
               
                function  staticLoc() {
				
                    //EDIT THESE LINES
                    //Title of the blog
                    var TITLE = "#2 Deals";
                    //RSS url
                    var RSS = "https://api.groupon.com/v2/deals.xml?postal_code=&client_id=340499e6fcbec24b891fb3f1ca84e013b2f1bdce";

		//alert(RSS);
                    //Stores entries
                    var entries = [];
                    var selectedEntry = "";
                 //   alert("1");
                    //listen for detail links
                    $(".contentLink").live("click", function() {
                                           selectedEntry = $(this).data("entryid");
                                           });
            //   alert("2");
                    //Listen for main page
                //    $("#mainPage").live("pageinit", function() {
                                        //alert("3");
                                        //Set the title
                                        
                                 //  alert("4");
                                        $.get(RSS, {}, function(res, code) {
                                         //     alert("5");
                                              var xml = $(res);
                                              var items = xml.find("deal");
                                              $.each(items, function(i, v) {
                                                     entry = {
                                                     title:$(v).find("announcementTitle").text(), 
                                                     link:$(v).find("dealUrl").text(), 
                                                     description:$.trim($(v).find("pitchHtml").text())
                                                     };
                                                     entries.push(entry);
                                                     });
                                              
                                              //now draw the list
                                              var s = '';
                                              var replacement='img src="http:';
                                              $.each(entries, function(i, v) {
										//	  alert("item");
                                                     var cleanDesc=v.description;
													 var link=v.link;
													 cleanDesc=cleanDesc.replace(/<p><\/li>/gi, "</li>");
													 cleanDesc=cleanDesc.replace(/_self/gi, "_blank");
cleanDesc=cleanDesc.replace(/<p> <\/li>/gi, "</li>");
cleanDesc=cleanDesc.replace(/<p>  <\/li>/gi, "</li>");
cleanDesc=cleanDesc.replace(/<ul>/gi, "<p>");
cleanDesc=cleanDesc.replace(/<\/ul>/gi, "</p>");
cleanDesc=cleanDesc.replace(/<li>/gi, " - ");
cleanDesc=cleanDesc.replace(/<\/li>/gi, "</br>");
cleanDesc=cleanDesc.replace(/<p>/gi, "<p style=\"white-space:normal\">");
cleanDesc=cleanDesc.replace(/<h4>/gi, "<h4 style=\"white-space:normal\">");
cleanDesc=cleanDesc.replace(/<li>/gi, "<li style=\"white-space:normal\">");
cleanDesc=cleanDesc.replace(/<ul>/gi, "<ul data-inset=\"true\" style=\"white-space:normal\">");		   
							   s += '<li style="white-space:normal"><p style="white-space:normal"><h3><a style="white-space:normal" href="' + link + '" rel="external">' + v.title + '</a></h3><br>' + cleanDesc + '</p></li>';});
							//	alert("6");
                                             // $("#linksList").append(s);
											 document.getElementById('linksList').innerHTML = s;
                                              $("#linksList").listview("refresh");
                                              });
                                  // document.getElementById('pageLoading').innerHTML = "";
                                //        });
                    

                   // document.addEventListener("deviceready", userLoc, false);
                }


function userLoc() {
staticLoc();
navigator.geolocation.getCurrentPosition(rssReaderUserLoc);
}

  function  rssReaderUserLoc(position) {
  var latitude=position.coords.latitude;
var longitude=position.coords.longitude;
//alert(latitude + " " + longitude);
   //   latitude=40.7142;
   //   longitude=-74.0064;
                    
                    //EDIT THESE LINES
                    //Title of the blog
                    var TITLE = "#2 Deals";
                    //RSS url
                    var RSS = "https://api.groupon.com/v2/deals.xml?lat=" + latitude + "&lng=" + longitude + "&client_id=340499e6fcbec24b891fb3f1ca84e013b2f1bdce";

//		alert(RSS);
                    //Stores entries
                    var entries = [];
                    var selectedEntry = "";
  //                  alert("1");
                    //listen for detail links
                    $(".contentLink").live("click", function() {
                                           selectedEntry = $(this).data("entryid");
                                           });
    //           alert("2");
                    //Listen for main page
                   //$("#mainPage").live("pageinit", function() {
      //                              alert("3");
                                        //Set the title
                                        
        //                          alert("4");
                                        $.get(RSS, {}, function(res, code) {
          //                                    alert("5");
                                              var xml = $(res);
                                              var items = xml.find("deal");
                                              $.each(items, function(i, v) {
                                                     entry = {
                                                     title:$(v).find("announcementTitle").text(), 
                                                     link:$(v).find("dealUrl").text(), 
                                                     description:$.trim($(v).find("pitchHtml").text())
                                                     };
                                                     entries.push(entry);
                                                     });
                                              
                                              //now draw the list
                                              var s = '';
                                              var replacement='img src="http:';
                                              $.each(entries, function(i, v) {
										//	  alert("item");
                                                     var cleanDesc=v.description;
													 var link=v.link;
													 cleanDesc=cleanDesc.replace(/<p><\/li>/gi, "</li>");
													 cleanDesc=cleanDesc.replace(/_self/gi, "_blank");
cleanDesc=cleanDesc.replace(/<p> <\/li>/gi, "</li>");
cleanDesc=cleanDesc.replace(/<p>  <\/li>/gi, "</li>");
cleanDesc=cleanDesc.replace(/<ul>/gi, "<p>");
cleanDesc=cleanDesc.replace(/<\/ul>/gi, "</p>");
cleanDesc=cleanDesc.replace(/<li>/gi, " - ");
cleanDesc=cleanDesc.replace(/<\/li>/gi, "</br>");
cleanDesc=cleanDesc.replace(/<p>/gi, "<p style=\"white-space:normal\">");
cleanDesc=cleanDesc.replace(/<h4>/gi, "<h4 style=\"white-space:normal\">");
cleanDesc=cleanDesc.replace(/<li>/gi, "<li style=\"white-space:normal\">");
cleanDesc=cleanDesc.replace(/<ul>/gi, "<ul data-inset=\"true\" style=\"white-space:normal\">");		   
							   s += '<li style="white-space:normal"><p style="white-space:normal"><h3><a style="white-space:normal" href="' + link + '" rel="external">' + v.title + '</a></h3><br>' + cleanDesc + '</p></li>';});
			//					alert("6");
                                             $("#linksListUser").append(s);
                                             $("#linksListUser").listview("refresh");
              //                               alert(s);
                                              });
                //                       alert("7");
                                    //    });
                    

                    
                
//document.getElementById('linksListUser').innerHTML = s;
//document.getElementById('pageLoadingUser').innerHTML = "";
											 
}

                


/**
 * Phonegap Web Intent plugin
 * Copyright (c) Boris Smus 2010
 *
 */
var WebIntent = function() { 

};

WebIntent.ACTION_SEND = "android.intent.action.SEND";
WebIntent.ACTION_VIEW= "android.intent.action.VIEW";
WebIntent.EXTRA_TEXT = "android.intent.extra.TEXT";
WebIntent.EXTRA_SUBJECT = "android.intent.extra.SUBJECT";
WebIntent.EXTRA_STREAM = "android.intent.extra.STREAM";
WebIntent.EXTRA_EMAIL = "android.intent.extra.EMAIL";

WebIntent.prototype.startActivity = function(params, success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'startActivity', [params]);
};

WebIntent.prototype.hasExtra = function(params, success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'hasExtra', [params]);
};

WebIntent.prototype.getUri = function(success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'getUri', []);
};

WebIntent.prototype.getExtra = function(params, success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'getExtra', [params]);
};


WebIntent.prototype.onNewIntent = function(callback) {
	return cordova.exec(function(args) {
		callback(args);
    }, function(args) {
    }, 'WebIntent', 'onNewIntent', []);
};

WebIntent.prototype.sendBroadcast = function(params, success, fail) {
    return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'sendBroadcast', [params]);
};

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.webintent) {
    window.plugins.webintent = new WebIntent();
}


//PhoneGap.addConstructor(function() {
//	PhoneGap.addPlugin('webintent', new WebIntent());
//});







	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            

		                
    $(document).ready(function() {
    document.body.addEventListener('touchmove', function(e) {
                    e.preventDefault();
                }, false);/*
if(screen.height>550){
        $("body").css("background","url(\"Default.png\")");
        $("body").css("backgroundSize","100% 100%");
        $(".ui-page").css("background","url(\"Default.png\")");
        $(".ui-page").css("backgroundImage","url(\"Default.png\")");
        $(".ui-page").css("backgroundSize","100% 100%");
        }
        else{
        $("body").css("background","url(\"Default.png\")");
        $("body").css("backgroundSize","100% 100%");
        $(".ui-page").css("background","url(\"Default.png\")");
        $(".ui-page").css("backgroundImage","url(\"Default.png\")");
        $(".ui-page").css("backgroundSize","100% 100%");
        }*/
    });
    






	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            


function find_payment(PR, IN, TE, PE) {
var PAY
try {
	IN = IN / (PE * 100)

	PAY = (PR * IN) / (1 - Math.pow(1 + IN, -(TE * PE)))
	PAY = PAY.toFixed(2)
	if (PAY == "NaN"){
		throw "ErrorNaN"
	}
}
catch(error) {
PAY = "Ooops."
}

document.getElementById("payment").value = PAY

}

function find_principle(PA, IN, TE, PE){
var PR
try {
	IN = IN / (PE * 100)

	PR = PA / IN * (1 - Math.pow(1 + IN, -(TE * PE)))
	PR = PR.toFixed(2)

	if (PR == "NaN"){
			throw "ErrorNaN"
	}
}
catch(error){
	PR = "Ooops."
}

document.getElementById("principle").value = PR

}





                
                var pictureSource;   // picture source
                var destinationType; // sets the format of returned value 
                
                
                function onBodyLoad()
                {
                    document.addEventListener("deviceready",onDeviceReady,false);
                }
                
                /* When this function is called, PhoneGap has been initialized and is ready to roll */
                function onDeviceReady()
                {
                    phoneGapReady.innerHTML = "PhoneGap is Ready";
                    
                }
                
                function checkConnection() {
                    var networkState = navigator.network.connection.type;
                    
                    var states = {};
                    states[Connection.UNKNOWN]  = 'Unknown connection';
                    states[Connection.ETHERNET] = 'Ethernet connection';
                    states[Connection.WIFI]     = 'WiFi connection';
                    states[Connection.CELL_2G]  = 'Cell 2G connection';
                    states[Connection.CELL_3G]  = 'Cell 3G connection';
                    states[Connection.CELL_4G]  = 'Cell 4G connection';
                    states[Connection.NONE]     = 'No network connection';
                    
                    alert('Connection type: ' + states[networkState]);
                }

                
                






	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            

	                        
         $(document).ready(function() {
	//	 alert("1");
             document.addEventListener("deviceready",onDeviceReadyCheckNetwork,false);
         });
    
         function onDeviceReadyCheckNetwork() {
		// alert("2");
        var networkState = navigator.network.connection.type;
if (networkState===Connection.UNKNOWN){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }
	else if (networkState===Connection.NONE){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }

         }
     

function onBodyLoad() { 
    if( navigator.userAgent.match(/Android/i) ) {
             onDeviceReadyEvents();
    } else if (typeof navigator.device == "undefined"){
            document.addEventListener("deviceready", onDeviceReadyEvents, false);
    } else {
             onDeviceReadyEvents();
    } 
}

function onDeviceReadyEvents() {
//alert("deviceready");
navigator.geolocation.getCurrentPosition(rssReader);
}

function rssReader(position){

var latitude=position.coords.latitude;
var longitude=position.coords.longitude;
                    
                    //EDIT THESE LINES

                    //RSS url
                    var RSS = "http://www.eventbrite.com/directoryxml/?lat=" + latitude + "&lng=" + longitude;
                    //alert(RSS);
                    //Stores entries
                    var entries = [];
                    var selectedEntry = "";
                    //alert("1");
                    //listen for detail links
                    $(".contentLink").live("click", function() {
                                           selectedEntry = $(this).data("entryid");
                                           });
                    //alert("2");
                    //Listen for main page
                  //  $("#mainPage").live("pageinit", function() {
                                        //alert("3");
                                        //Set the title
                                        
                                        //alert("4");
                                        $.get(RSS, {}, function(res, code) {
                                              //alert("5");
                                              var xml = $(res);
                                              var items = xml.find("item");
                                              $.each(items, function(i, v) {
                                                     entry = {
                                                     title:$(v).find("title").text(), 
                                                     link:$(v).find("link").text(), 
                                                     description:$.trim($(v).find("description").text())
                                                     };
                                                     entries.push(entry);
                                                     });
                                              
                                              //now draw the list
                                              var s = '';
                                              $.each(entries, function(i, v) {
                                                     //alert('entry');
                                                     s += '<li><p><h3><a href="#contentPage" class="contentLink" data-entryid="'+i+'">' + v.title + '</a></h3><br>' + v.description + '</p></li>';
                                                     });
                                              $("#linksList").append(s);
                                              $("#linksList").listview("refresh");
                                              });
                                        
                                 //       });
                    
                    //Listen for the content page to load
                    $("#contentPage").live("pageshow", function(prepage) {
                                           //Set the title
                                           $("h1", this).text(entries[selectedEntry].title);
                                           var desc=entries[selectedEntry].description;
                                           desc=(desc.replace(/href/gi, "span"));
                                           var link=entries[selectedEntry].link;
                                           var contentHTML = "";
                                           contentHTML += desc;contentHTML += '<p/><a rel="external" href="'+ link + '">Read More</a>';  $("#entryText",this).html(contentHTML);
                                           });
                    
                }
                
                
                
                
onBodyLoad();




$(document).ready(function(){
	$("#submit").click(function(){	

	//specify where to post
	var postTo="http://skybuilder.net/cf/process.php?appId=16491868334f5efe416da432.66391647";
	
	//get the info to post
	var field0Val=$("#field0").val();var field1Val=$("#field1").val();var field2Val=$("#field2").val();var field3Val=$("#field3").val();

//post
$.post(postTo, { field0: field0Val,field1: field1Val,field2: field2Val,field3: field3Val } );

//change submit button to thank you
document.getElementById('sendEmail').innerHTML = "<p>Thank for your submission.</p>";

		return false;
	});						   
});
 






	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            






	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            

	                        
         $(document).ready(function() {
	//	 alert("1");
             document.addEventListener("deviceready",onDeviceReadyCheckNetwork,false);
         });
    
         function onDeviceReadyCheckNetwork() {
		// alert("2");
        var networkState = navigator.network.connection.type;
if (networkState===Connection.UNKNOWN){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }
	else if (networkState===Connection.NONE){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }

         }
     
   
                function  rssReader() {
                   // alert("rssReader");
                    
                    //EDIT THESE LINES
                    //Title of the blog
                   //RSS url
                    var RSS = "http://api.flickr.com/services/feeds/photos_public.gne?tags=restroom&format=rss2";
                    //Stores entries
                    var entries = [];
                    var selectedEntry = "";
                    //alert("1");
                    //listen for detail links
                    $(".contentLink").live("click", function() {
                                           selectedEntry = $(this).data("entryid");
                                           });
                    //alert("2");
                    //Listen for main page
                    $("#mainPage").live("pageinit", function() {
                                        //alert("3");
                                        //Set the title
                                        
                                        //alert("4");
                                        $.get(RSS, {}, function(res, code) {
                                              //alert("5");
                                              var xml = $(res);
                                              var items = xml.find("item");
                                              $.each(items, function(i, v) {
                                                     entry = {
                                                     title:$(v).find("title").text(), 
                                                     link:$(v).find("link").text(), 
                                                     description:$.trim($(v).find("description").text())
                                                     };
                                                     entries.push(entry);
                                                     });
                                              
											    var pulledTitle='';
												var pulledDescription='';
                                                     var halfLength=1;
													 var cleanTitle='';
													 var imageSource='';
											  
                                              //now draw the list
                                              var s = '';
                                        $.each(entries, function(i, v) {
											pulledTitle=v.title;
                                            halfLength=pulledTitle.length/2;
											cleanTitle=pulledTitle.slice(halfLength);
											pulledDescription=v.description;
											imageSource=pulledDescription.match(/http:\/\/farm(.+?)jpg/gi);   
                                                     s += '<li style="white-space:normal"><center><h2 style="white-space:normal">' + cleanTitle + '</h2></center><p style="white-space:normal"><img src="' + imageSource + '"></p></li>';
                                                     });
                                              $("#linksList").append(s);
                                              $("#linksList").listview("refresh");
                                              });
                                        
                                        });
                    
                    //Listen for the content page to load
                    $("#contentPage").live("pageshow", function(prepage) {
                                           //Set the title
                                           $("h1", this).text(entries[selectedEntry].title);
                                          var desc=entries[selectedEntry].description;
                                      desc=(desc.replace(/href/gi, "span"));
                                           var link=entries[selectedEntry].link;
                                           var contentHTML = "";
                                           contentHTML += desc;contentHTML += '<p/><a rel="external" href="'+ link + '">Read More</a>';$("#entryText",this).html(contentHTML);
                                           });
                    
                }
                
                

                
rssReader();






	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            

	                        
         $(document).ready(function() {
	//	 alert("1");
             document.addEventListener("deviceready",onDeviceReadyCheckNetwork,false);
         });
    
         function onDeviceReadyCheckNetwork() {
		// alert("2");
        var networkState = navigator.network.connection.type;
if (networkState===Connection.UNKNOWN){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }
	else if (networkState===Connection.NONE){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }

         }
     

              
                function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}
                
                function  rssReader() {
				$.mobile.showPageLoadingMsg();
                   // alert("rssReader");
                    

                    //RSS url
                    var RSS = "http://news.google.com/news?q=fun+bathroom+celebrities+movies+music+tv+video+funny&output=rss&num=100";

			//		alert(RSS);
                    //Stores entries
                    var entries = [];
                    var selectedEntry = "";
                //    alert("1");
                    //listen for detail links
                    $(".contentLink").live("click", function() {
                                           selectedEntry = $(this).data("entryid");
                                           });
                 //   alert("2");
                 //Listen for main page
                    $("#mainPage").live("pageinit", function() {
                                        //alert("3");
                                        //Set the title
                                        
                               //         alert("4");
                                        $.get(RSS, {}, function(res, code) {
                                    //          alert("5");
                                              var xml = $(res);
                                              var items = xml.find("item");
                                              $.each(items, function(i, v) {
                                                     entry = {
                                                     title:$(v).find("title").text(), 
                                                     link:$(v).find("link").text(), 
                                                     description:$.trim($(v).find("description").text())
                                                     };
                                                     entries.push(entry);
                                                     });
                                              
                                               //now draw the list
                                              var s = '';
                                            var articleTitle;
                                             var titleHalves;
                                              var articleLink;
                                              var articleDate;
                                              var articleBody;
                                              var articleImage;
                                              var articleSource;
                                              var scraped;
                                              var imgSrc;
                                              $.each(entries, function(i, v) {
                                      //manipulate results into correct format
                                      //get title
                                     articleTitle=v.title;
                               titleHalves = articleTitle.split(" - ");
          articleTitle = titleHalves[0];
          //get article date
           articleDate = v.pubDate;
            //get to just the text of the article body - strip everything else
            articleBody=v.description;
            articleBody=(articleBody.replace(/<b>/gi, ""));
            articleBody=(articleBody.replace(/<\/b>/gi, ""));
            articleBody=(articleBody.replace(/<\/font>/gi, "..."));
            scraped=(articleBody.match(/<br \/><font size="-1">(.+?)\.\.\./gi));
            articleSource=scraped[0];
            articleSource=(articleSource.replace(/<font color="#6f6f6f">/gi, ""));
            articleSource=(articleSource.replace(/<br \/><font size="-1">/gi, ""));
            articleSource=(articleSource.replace(/\.\.\./gi, ""));
            articleBody=scraped[1];
            articleBody=(articleBody.replace(/<br \/><font size="-1">/gi, ""));
            //get image if it exists
           scraped=(v.description.match(/src="(.+?)"/gi));
          if (scraped != null) {
          imgSrc=scraped[0];
          imgSrc=(imgSrc.replace(/src="/gi, ""));
          articleImage = '<p style="white-space:normal;word-wrap: break-word;"><img src="http:' + imgSrc + '></p>';
            } else {
                articleImage = '';
            }articleLink=v.link;
				 s += '<li style="white-space:normal;word-wrap: break-word;">' + articleImage + '<h2 style="white-space:normal;word-wrap: break-word;">' + articleTitle + '</h2><p style="white-space:normal;word-wrap: break-word;">' + articleSource + ' - ' + articleBody + '</p><p><a rel="external" href="' + articleLink + '" data-gourl="'+ articleLink + '" class="open-external-browser">Read More</a></p></li>';});
                                              $("#linksList").append(s);
                                              $("#linksList").listview("refresh");
                                              });
                                        
                                        });
                    
                    //Listen for the content page to load
                    $("#contentPage").live("pageshow", function(prepage) {
                                           //Set the title
                                           $("h1", this).text(entries[selectedEntry].title);
                                           var replacement='img src="http:';
                                          var desc=entries[selectedEntry].description;
                                      desc=(desc.replace(/href/gi, "span"));
                                           desc=(desc.replace(/img src=\"/gi, replacement));
                                           var link=entries[selectedEntry].link;
                                           var contentHTML = "";
                                           contentHTML += desc;contentHTML += '<p/><a rel="external" href="'+ link + '" data-gourl="'+ link + '" class="open-external-browser">Read More</a>';$("#entryText",this).html(contentHTML);
                                           });
                    
                }
                
                $.mobile.hidePageLoadingMsg();

                
rssReader();






	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            

	                        
         $(document).ready(function() {
	//	 alert("1");
             document.addEventListener("deviceready",onDeviceReadyCheckNetwork,false);
         });
    
         function onDeviceReadyCheckNetwork() {
		// alert("2");
        var networkState = navigator.network.connection.type;
if (networkState===Connection.UNKNOWN){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }
	else if (networkState===Connection.NONE){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }

         }
     

              


              
                
                function  rssReader() {
                   // alert("rssReader");
                    

                    //RSS url
					var RSS="http://www.eventbrite.com/directoryxml/?q=fun+bathroom+celebrities+movies+music+tv+video+funny";
                    //Stores entries
                    var entries = [];
                    var selectedEntry = "";
                    //alert("1");
                    //listen for detail links
                    $(".contentLink").live("click", function() {
                                           selectedEntry = $(this).data("entryid");
                                           });
                    //alert("2");
                    //Listen for main page
                    $("#mainPage").live("pageinit", function() {
                                        //alert("3");
                                        //Set the title
                                        
                                        //alert("4");
                                        $.get(RSS, {}, function(res, code) {
                                              //alert("5");
                                              var xml = $(res);
                                              var items = xml.find("item");
											  //alert(items);
                                              $.each(items, function(i, v) {
                                                     entry = {
                                                     title:$(v).find("title").text(),
                                                     link:$(v).find("guid").text(),
													 titleagain:$(v).find("title").text(),
                                                     description:$.trim($(v).find("description").text())
                                                     };
													 
                                                     entries.push(entry);
                                                     });
                                              
                                              //now draw the list
                                              var s = '';
                                              $.each(entries, function(i, v) {
                                                     //alert(v.titleagain);
                                                     s += '<li><p><h3><a href="#contentPage" class="contentLink" data-entryid="'+i+'">Title: ' + v.titleagain + '</a></h3><br>' + v.description + '</p></li>';
                                                     });
                                              $("#linksList").append(s);
                                              $("#linksList").listview("refresh");
                                              });
                                        
                                        });
                    
                    //Listen for the content page to load
                    $("#contentPage").live("pageshow", function(prepage) {
                                           //Set the title
                                           $("h1", this).text(entries[selectedEntry].title);
                                           var desc=entries[selectedEntry].description;
                                           desc=(desc.replace(/href/gi, "span"));
                                           var link=entries[selectedEntry].link;
                                           var contentHTML = "";
                                           contentHTML += desc + '<br>' + link;contentHTML += '<p/><a rel="external" href="'+ link + '">Read More</a>';  $("#entryText",this).html(contentHTML);
                                           });
                    
                }
                
                
                
                
rssReader();






	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            

	                        
         $(document).ready(function() {
	//	 alert("1");
             document.addEventListener("deviceready",onDeviceReadyCheckNetwork,false);
         });
    
         function onDeviceReadyCheckNetwork() {
		// alert("2");
        var networkState = navigator.network.connection.type;
if (networkState===Connection.UNKNOWN){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }
	else if (networkState===Connection.NONE){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }

         }
     

function initialize(){

	  var location=geoip_city();;
	  rssReader(location);
	  }


              
                
                function  rssReader(location) {
                   // alert("rssReader");
                    
                    //EDIT THESE LINES
                    //Title of the blog
                    var TITLE = "#2 Local";
                    //RSS url
                    var RSS = "http://news.google.com/news?q=" + location + "&output=rss";
                    //Stores entries
                    var entries = [];
                    var selectedEntry = "";
                    //alert("1");
                    //listen for detail links
                    $(".contentLink").live("click", function() {
                                           selectedEntry = $(this).data("entryid");
                                           });
                    //alert("2");
                    //Listen for main page
                    $("#mainPage").live("pageinit", function() {
                                        //alert("3");
                                        //Set the title
                                        
                                        //alert("4");
                                        $.get(RSS, {}, function(res, code) {
                                              //alert("5");
                                              var xml = $(res);
                                              var items = xml.find("item");
                                              $.each(items, function(i, v) {
                                                     entry = {
                                                     title:$(v).find("title").text(), 
                                                     link:$(v).find("link").text(), 
                                                     description:$.trim($(v).find("description").text())
                                                     };
                                                     entries.push(entry);
                                                     });
                                              
                                             //now draw the list
                                              var s = '';
                                            var articleTitle;
                                             var titleHalves;
                                              var articleLink;
                                              var articleDate;
                                              var articleBody;
                                              var articleImage;
                                              var articleSource;
                                              var scraped;
                                              var imgSrc;
                                              $.each(entries, function(i, v) {
                                      //manipulate results into correct format
                                      //get title
                                     articleTitle=v.title;
                               titleHalves = articleTitle.split(" - ");
          articleTitle = titleHalves[0];
          //get article date
           articleDate = v.pubDate;
            //get to just the text of the article body - strip everything else
            articleBody=v.description;
            articleBody=(articleBody.replace(/<b>/gi, ""));
            articleBody=(articleBody.replace(/<\/b>/gi, ""));
            articleBody=(articleBody.replace(/<\/font>/gi, "..."));
            scraped=(articleBody.match(/<br \/><font size="-1">(.+?)\.\.\./gi));
            articleSource=scraped[0];
            articleSource=(articleSource.replace(/<font color="#6f6f6f">/gi, ""));
            articleSource=(articleSource.replace(/<br \/><font size="-1">/gi, ""));
            articleSource=(articleSource.replace(/\.\.\./gi, ""));
            articleBody=scraped[1];
            articleBody=(articleBody.replace(/<br \/><font size="-1">/gi, ""));
            //get image if it exists
           scraped=(v.description.match(/src="(.+?)"/gi));
          if (scraped != null) {
          imgSrc=scraped[0];
          imgSrc=(imgSrc.replace(/src="/gi, ""));
          articleImage = '<p style="white-space:normal;word-wrap: break-word;"><img src="http:' + imgSrc + '></p>';
            } else {
                articleImage = '';
            }articleLink=v.link;
				 s += '<li style="white-space:normal;word-wrap: break-word;">' + articleImage + '<h2 style="white-space:normal;word-wrap: break-word;">' + articleTitle + '</h2><p style="white-space:normal;word-wrap: break-word;">' + articleSource + ' - ' + articleBody + '</p><p><a rel="external" href="' + articleLink + '" data-gourl="'+ articleLink + '" class="open-external-browser">Read More</a></p></li>';});
                                              $("#linksList").append(s);
                                              $("#linksList").listview("refresh");
                                              });
                                        
                                        });
                    
                    //Listen for the content page to load
                    $("#contentPage").live("pageshow", function(prepage) {
                                           //Set the title
                                           $("h1", this).text(entries[selectedEntry].title);
                                           var replacement='img src="http:';
                                          var desc=entries[selectedEntry].description;
                                      desc=(desc.replace(/href/gi, "span"));
                                           desc=(desc.replace(/img src=\"/gi, replacement));
                                           var link=entries[selectedEntry].link;
                                           var contentHTML = "";
                                           contentHTML += desc;contentHTML += '<p/><a rel="external" href="'+ link + '" data-gourl="'+ link + '" class="open-external-browser">Read More</a>';$("#entryText",this).html(contentHTML);
                                           });
                    
                }
                
                

                
initialize();